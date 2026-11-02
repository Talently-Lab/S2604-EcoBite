
import db from "../config/db.js";

export async function crearPedido({
  usuarioId,
  restauranteId,
  direccionEntrega,
  productos,
  impactoCO2,
}) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

  
    const ids = [...new Set(productos.map((p) => p.producto_id))];
    const placeholders = ids.map(() => "?").join(",");

    const [productosDB] = await connection.query(
      `SELECT
         p.id,
         p.restaurante_id,
         p.nombre,
         p.precio,
         p.activo,
         p.tipo_envase_id,
         te.nombre AS tipo_envase
       FROM productos p
       INNER JOIN tipos_envase te
         ON te.id = p.tipo_envase_id
       WHERE p.id IN (${placeholders})
       FOR UPDATE`,
      ids
    );

    if (productosDB.length !== ids.length) {
      throw new Error("Uno o más productos no existen");
    }

    const productosMap = new Map(
      productosDB.map((p) => [Number(p.id), p])
    );

    let total = 0;
    const detalles = [];
    const envasesPorTipo = new Map();

    for (const item of productos) {
      const producto = productosMap.get(item.producto_id);

      if (
        !producto ||
        Number(producto.restaurante_id) !== Number(restauranteId)
      ) {
        throw new Error(
          "Todos los productos deben pertenecer al restaurante seleccionado"
        );
      }

      if (!producto.activo) {
        throw new Error(
          `El producto ${producto.nombre} no está disponible`
        );
      }

      const precio = Number(producto.precio);
      const subtotal = Number(
        (precio * item.cantidad).toFixed(2)
      );

      total += subtotal;

      detalles.push({
        producto_id: producto.id,
        cantidad: item.cantidad,
        precio_unitario: precio,
        subtotal,
      });

      const tipoEnvaseId = Number(producto.tipo_envase_id);

      if (!envasesPorTipo.has(tipoEnvaseId)) {
        envasesPorTipo.set(tipoEnvaseId, {
          tipo_envase_id: tipoEnvaseId,
          tipo_envase: producto.tipo_envase,
          cantidad_envases: 0,
          plasticos_evitados_unidades: 0,
        });
      }

      const envase = envasesPorTipo.get(tipoEnvaseId);

      
      envase.cantidad_envases += item.cantidad;
      envase.plasticos_evitados_unidades += item.cantidad;
    }

    total = Number(total.toFixed(2));

    const cantidadTotal = [...envasesPorTipo.values()].reduce(
      (suma, envase) => suma + envase.cantidad_envases,
      0
    );

   
    const [pedidoResult] = await connection.query(
      `INSERT INTO pedidos
       (usuario_id, restaurante_id, direccion_entrega,
        estado_pedido, total_pedido)
       VALUES (?, ?, ?, 'pendiente', ?)`,
      [usuarioId, restauranteId, direccionEntrega, total]
    );

    const pedidoId = pedidoResult.insertId;

  
    for (const detalle of detalles) {
      await connection.query(
        `INSERT INTO detalle_pedidos
         (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [
          pedidoId,
          detalle.producto_id,
          detalle.cantidad,
          detalle.precio_unitario,
          detalle.subtotal,
        ]
      );
    }


    await connection.query(
      `INSERT INTO entregas
       (pedido_id, restaurant_latitude, restaurant_longitude,
        usuario_latitude, usuario_longitude, distancia_km,
        co2_ahorrado_kg, factor_co2_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pedidoId,
        impactoCO2.restaurant_latitude,
        impactoCO2.restaurant_longitude,
        impactoCO2.usuario_latitude,
        impactoCO2.usuario_longitude,
        impactoCO2.distancia_km,
        impactoCO2.co2_ahorrado_kg,
        impactoCO2.factor_co2_id,
      ]
    );


    for (const envase of envasesPorTipo.values()) {
      await connection.query(
        `INSERT INTO envases
         (pedido_id, tipo_envase_id, cantidad_envases,
          plasticos_evitados_unidades)
         VALUES (?, ?, ?, ?)`,
        [
          pedidoId,
          envase.tipo_envase_id,
          envase.cantidad_envases,
          envase.plasticos_evitados_unidades,
        ]
      );
    }

    await connection.commit();

    return {
      id: pedidoId,
      restaurante_id: restauranteId,
      direccion_entrega: direccionEntrega,
      estado_pedido: "pendiente",
      total_pedido: total,
      productos: detalles,
      entrega: impactoCO2,
      envases: [...envasesPorTipo.values()],
      cantidad_total_envases: cantidadTotal,
      plasticos_evitados_unidades: cantidadTotal,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function obtenerPedidosPorUsuario(usuarioId) {
  // 1. Obtener pedidos, productos y entregas.
  const [filas] = await db.query(
    `SELECT
       p.id AS pedido_id,
       p.restaurante_id,
       r.nombre AS restaurante_nombre,
       p.direccion_entrega,
       p.estado_pedido,
       p.total_pedido,
       p.fecha_pedido,

       dp.id AS detalle_id,
       dp.producto_id,
       pr.nombre AS producto_nombre,
       dp.cantidad,
       dp.precio_unitario,
       dp.subtotal,

       e.distancia_km,
       e.co2_ahorrado_kg

     FROM pedidos p
     INNER JOIN restaurantes r
       ON r.id = p.restaurante_id
     LEFT JOIN detalle_pedidos dp
       ON dp.pedido_id = p.id
     LEFT JOIN productos pr
       ON pr.id = dp.producto_id
     LEFT JOIN entregas e
       ON e.pedido_id = p.id

     WHERE p.usuario_id = ?
     ORDER BY p.fecha_pedido DESC, p.id DESC, dp.id ASC`,
    [usuarioId]
  );

  const pedidosMap = new Map();

  for (const fila of filas) {
    if (!pedidosMap.has(fila.pedido_id)) {
      pedidosMap.set(fila.pedido_id, {
        id: fila.pedido_id,
        restaurante_id: fila.restaurante_id,
        restaurante_nombre: fila.restaurante_nombre,
        direccion_entrega: fila.direccion_entrega,
        estado_pedido: fila.estado_pedido,
        total_pedido: Number(fila.total_pedido),
        fecha_pedido: fila.fecha_pedido,
        entrega: {
          distancia_km:
            fila.distancia_km == null
              ? null
              : Number(fila.distancia_km),
          co2_ahorrado_kg:
            fila.co2_ahorrado_kg == null
              ? 0
              : Number(fila.co2_ahorrado_kg),
        },
        productos: [],
        envases: [],
        cantidad_total_envases: 0,
        plasticos_evitados_unidades: 0,
      });
    }

    if (fila.detalle_id != null) {
      pedidosMap.get(fila.pedido_id).productos.push({
        producto_id: fila.producto_id,
        nombre: fila.producto_nombre,
        cantidad: Number(fila.cantidad),
        precio_unitario: Number(fila.precio_unitario),
        subtotal: Number(fila.subtotal),
      });
    }
  }

  const pedidos = Array.from(pedidosMap.values());

  // 2. Consultar envases por separado para no duplicar productos.
  if (pedidos.length > 0) {
    const pedidoIds = pedidos.map((pedido) => pedido.id);
    const placeholders = pedidoIds.map(() => "?").join(",");

    const [filasEnvases] = await db.query(
      `SELECT
         env.pedido_id,
         env.tipo_envase_id,
         te.nombre AS tipo_envase,
         env.cantidad_envases,
         env.plasticos_evitados_unidades
       FROM envases env
       INNER JOIN tipos_envase te
         ON te.id = env.tipo_envase_id
       WHERE env.pedido_id IN (${placeholders})
       ORDER BY env.pedido_id, env.tipo_envase_id`,
      pedidoIds
    );

    const pedidosPorId = new Map(
      pedidos.map((pedido) => [Number(pedido.id), pedido])
    );

    for (const fila of filasEnvases) {
      const pedido = pedidosPorId.get(Number(fila.pedido_id));

      if (!pedido) continue;

      const envase = {
        tipo_envase_id: Number(fila.tipo_envase_id),
        tipo_envase: fila.tipo_envase,
        cantidad_envases: Number(fila.cantidad_envases),
        plasticos_evitados_unidades: Number(
          fila.plasticos_evitados_unidades ?? 0
        ),
      };

      pedido.envases.push(envase);
      pedido.cantidad_total_envases += envase.cantidad_envases;
      pedido.plasticos_evitados_unidades +=
        envase.plasticos_evitados_unidades;
    }
  }

  // 3. Calcular impacto acumulado.
  const impactoTotal = pedidos.reduce(
    (total, pedido) => ({
      co2_ahorrado_kg:
        total.co2_ahorrado_kg + pedido.entrega.co2_ahorrado_kg,
      plasticos_evitados_unidades:
        total.plasticos_evitados_unidades +
        pedido.plasticos_evitados_unidades,
    }),
    {
      co2_ahorrado_kg: 0,
      plasticos_evitados_unidades: 0,
    }
  );

  return {
    impacto_total: {
      pedidos_realizados: pedidos.length,
      co2_ahorrado_kg: Number(
        impactoTotal.co2_ahorrado_kg.toFixed(5)
      ),
      plasticos_evitados_unidades:
        impactoTotal.plasticos_evitados_unidades,
    },
    pedidos,
  };
}

export async function obtenerDetallePedido(pedidoId, usuarioId) {
  // 1. Consultar el pedido, sus productos y su entrega.
  // No se unen envases aquí para evitar duplicar las líneas de productos.
  const [filas] = await db.query(
    `SELECT
       p.id AS pedido_id,
       p.usuario_id,
       p.restaurante_id,
       r.nombre AS restaurante_nombre,
       p.direccion_entrega,
       p.estado_pedido,
       p.total_pedido,
       p.fecha_pedido,

       dp.id AS detalle_id,
       dp.producto_id,
       pr.nombre AS producto_nombre,
       dp.cantidad,
       dp.precio_unitario,
       dp.subtotal,

       e.distancia_km,
       e.co2_ahorrado_kg

     FROM pedidos p
     INNER JOIN restaurantes r
       ON r.id = p.restaurante_id
     LEFT JOIN detalle_pedidos dp
       ON dp.pedido_id = p.id
     LEFT JOIN productos pr
       ON pr.id = dp.producto_id
     LEFT JOIN entregas e
       ON e.pedido_id = p.id

     WHERE p.id = ?
       AND p.usuario_id = ?
     ORDER BY dp.id ASC`,
    [pedidoId, usuarioId]
  );

  if (filas.length === 0) {
    return null;
  }

  const primeraFila = filas[0];

  // 2. Consultar todos los envases del pedido.
  const [filasEnvases] = await db.query(
    `SELECT
       env.tipo_envase_id,
       te.nombre AS tipo_envase,
       env.cantidad_envases,
       env.plasticos_evitados_unidades
     FROM envases env
     INNER JOIN tipos_envase te
       ON te.id = env.tipo_envase_id
     WHERE env.pedido_id = ?
     ORDER BY env.tipo_envase_id`,
    [pedidoId]
  );

  const envases = filasEnvases.map((fila) => ({
    tipo_envase_id: Number(fila.tipo_envase_id),
    tipo_envase: fila.tipo_envase,
    cantidad_envases: Number(fila.cantidad_envases),
    plasticos_evitados_unidades: Number(
      fila.plasticos_evitados_unidades ?? 0
    ),
  }));

  const cantidadTotalEnvases = envases.reduce(
    (total, envase) => total + envase.cantidad_envases,
    0
  );

  const plasticosEvitados = envases.reduce(
    (total, envase) =>
      total + envase.plasticos_evitados_unidades,
    0
  );

  return {
    pedido: {
      id: Number(primeraFila.pedido_id),
      restaurante_id: Number(primeraFila.restaurante_id),
      restaurante_nombre: primeraFila.restaurante_nombre,
      direccion_entrega: primeraFila.direccion_entrega,
      estado_pedido: primeraFila.estado_pedido,
      total_pedido: Number(primeraFila.total_pedido),
      fecha_pedido: primeraFila.fecha_pedido,
    },

    productos: filas
      .filter((fila) => fila.detalle_id != null)
      .map((fila) => ({
        producto_id: Number(fila.producto_id),
        nombre: fila.producto_nombre,
        cantidad: Number(fila.cantidad),
        precio_unitario: Number(fila.precio_unitario),
        subtotal: Number(fila.subtotal),
      })),

    impacto_ambiental: {
      co2_ahorrado_kg:
        primeraFila.co2_ahorrado_kg == null
          ? 0
          : Number(primeraFila.co2_ahorrado_kg),

      distancia_km:
        primeraFila.distancia_km == null
          ? null
          : Number(primeraFila.distancia_km),

      envases,
      cantidad_total_envases: cantidadTotalEnvases,
      plasticos_evitados_unidades: plasticosEvitados,
    },
  };
}



export async function actualizarEstadoPedido({
  pedidoId,
  restauranteId,
  nuevoEstado,
}) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // comprobar que el pedido pertenece al restaurante.
    const [rows] = await connection.query(
      `SELECT id
       FROM pedidos
       WHERE id = ?
         AND restaurante_id = ?
       FOR UPDATE`,
      [pedidoId, restauranteId]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return { notFound: true };
    }

    await connection.query(
      `UPDATE pedidos
       SET estado_pedido = ?
       WHERE id = ?
         AND restaurante_id = ?`,
      [nuevoEstado, pedidoId, restauranteId]
    );

    await connection.commit();

    return {
      pedido: {
        id: Number(pedidoId),
        estado_pedido: nuevoEstado,
      },
    };

  } catch (error) {
    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
}

export async function obtenerPedidosPorRestaurante(restauranteId) {
  const [filas] = await db.query(
    `SELECT
       p.id AS pedido_id,
       p.usuario_id,
       u.nombre AS cliente_nombre,
       p.restaurante_id,
       p.direccion_entrega,
       p.estado_pedido,
       p.total_pedido,
       p.fecha_pedido,

       dp.id AS detalle_id,
       dp.producto_id,
       pr.nombre AS producto_nombre,
       dp.cantidad,
       dp.precio_unitario,
       dp.subtotal,

       e.distancia_km,
       e.co2_ahorrado_kg

     FROM pedidos p
     INNER JOIN users u
       ON u.id = p.usuario_id
     LEFT JOIN detalle_pedidos dp
       ON dp.pedido_id = p.id
     LEFT JOIN productos pr
       ON pr.id = dp.producto_id
     LEFT JOIN entregas e
       ON e.pedido_id = p.id

     WHERE p.restaurante_id = ?
     ORDER BY p.fecha_pedido DESC, p.id DESC, dp.id ASC`,
    [restauranteId]
  );

  const pedidosMap = new Map();

  for (const fila of filas) {
    if (!pedidosMap.has(fila.pedido_id)) {
      pedidosMap.set(fila.pedido_id, {
        id: Number(fila.pedido_id),
        usuario_id: Number(fila.usuario_id),
        cliente_nombre: fila.cliente_nombre,
        restaurante_id: Number(fila.restaurante_id),
        direccion_entrega: fila.direccion_entrega,
        estado_pedido: fila.estado_pedido,
        total_pedido: Number(fila.total_pedido),
        fecha_pedido: fila.fecha_pedido,
        entrega: {
          distancia_km:
            fila.distancia_km == null
              ? null
              : Number(fila.distancia_km),
          co2_ahorrado_kg:
            fila.co2_ahorrado_kg == null
              ? 0
              : Number(fila.co2_ahorrado_kg),
        },
        productos: [],
      });
    }

    if (fila.detalle_id != null) {
      pedidosMap.get(fila.pedido_id).productos.push({
        producto_id: Number(fila.producto_id),
        nombre: fila.producto_nombre,
        cantidad: Number(fila.cantidad),
        precio_unitario: Number(fila.precio_unitario),
        subtotal: Number(fila.subtotal),
      });
    }
  }

  return Array.from(pedidosMap.values());
}