
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

    // comprobar productos y obtenet sus precios reales.
    const ids = [...new Set(productos.map(p => p.producto_id))];
    const placeholders = ids.map(() => "?").join(",");

    const [productosDB] = await connection.query(
      `SELECT id, restaurante_id, nombre, precio, activo
       FROM productos
       WHERE id IN (${placeholders})
       FOR UPDATE`,
      ids
    );

    if (productosDB.length !== ids.length) {
      throw new Error("Uno o más productos no existen");
    }

    const productosMap = new Map(
      productosDB.map(p => [Number(p.id), p])
    );

    let total = 0;
    let cantidadTotal = 0;
    const detalles = [];

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
        throw new Error(`El producto ${producto.nombre} no está disponible`);
      }

      const precio = Number(producto.precio);
      const subtotal = Number((precio * item.cantidad).toFixed(2));

      total += subtotal;
      cantidadTotal += item.cantidad;

      detalles.push({
        producto_id: producto.id,
        cantidad: item.cantidad,
        precio_unitario: precio,
        subtotal,
      });
    }

    total = Number(total.toFixed(2));

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


    await connection.query(
      `INSERT INTO envases
       (pedido_id, tipo_envase, cantidad_envases_biodegradables,
        plasticos_evitados_unidades)
       VALUES (?, ?, ?, ?)`,
      [pedidoId, "biodegradable", cantidadTotal, cantidadTotal]
    );

    await connection.commit();

    return {
      id: pedidoId,
      restaurante_id: restauranteId,
      direccion_entrega: direccionEntrega,
      estado_pedido: "pendiente",
      total_pedido: total,
      productos: detalles,
      entrega: impactoCO2,
      cantidad_envases_biodegradables: cantidadTotal,
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
        e.co2_ahorrado_kg,

        env.cantidad_envases_biodegradables,
        env.plasticos_evitados_unidades

     FROM pedidos p
     INNER JOIN restaurantes r
       ON r.id = p.restaurante_id
     LEFT JOIN detalle_pedidos dp
       ON dp.pedido_id = p.id
     LEFT JOIN productos pr
       ON pr.id = dp.producto_id
     LEFT JOIN entregas e
       ON e.pedido_id = p.id
     LEFT JOIN envases env
       ON env.pedido_id = p.id

     WHERE p.usuario_id = ?
     ORDER BY p.fecha_pedido DESC, p.id DESC, dp.id ASC`,
    [usuarioId]
  );

  // Agrupar las filas: un pedido puede tener varios productos.
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
          distancia_km: fila.distancia_km == null
            ? null
            : Number(fila.distancia_km),
          co2_ahorrado_kg: fila.co2_ahorrado_kg == null
            ? 0
            : Number(fila.co2_ahorrado_kg),
        },

        cantidad_envases_biodegradables:
          Number(fila.cantidad_envases_biodegradables ?? 0),

        plasticos_evitados_unidades:
          Number(fila.plasticos_evitados_unidades ?? 0),

        productos: [],
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
