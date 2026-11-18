
import db from "../config/db.js";
import { calcularImpactoCO2 } from "./co2.service.js";
import { crearPedido } from "../repositories/order.repository.js";

export async function crearPedidoService({
  usuarioId,
  restauranteId,
  direccionEntrega,
  tipoTransporte,
  productos,
}) {
  if (!Number.isInteger(Number(restauranteId)) ||
      Number(restauranteId) <= 0) {
    throw new Error("ID de restaurante inválido");
  }

  if (!direccionEntrega?.trim()) {
    throw new Error("La dirección de entrega es obligatoria");
  }

  if (!Array.isArray(productos) || productos.length === 0) {
    throw new Error("El pedido debe contener al menos un producto");
  }

  const productosNormalizados = productos.map((producto) => {
    const productoId = Number(producto.producto_id);
    const cantidad = Number(producto.cantidad);

    if (
      !Number.isInteger(productoId) ||
      productoId <= 0 ||
      !Number.isInteger(cantidad) ||
      cantidad <= 0
    ) {
      throw new Error(
        "Cada producto debe tener un ID válido y una cantidad entera positiva"
      );
    }

    return { producto_id: productoId, cantidad };
  });

  const [restaurantes] = await db.query(
    `SELECT id, latitud, longitud, activo
     FROM restaurantes
     WHERE id = ?
     LIMIT 1`,
    [Number(restauranteId)]
  );

  const restaurante = restaurantes[0];

  if (!restaurante || !restaurante.activo) {
    throw new Error("El restaurante no existe o no está activo");
  }

  const impactoCO2 = await calcularImpactoCO2({
    tipoTransporte,
    direccionEntrega: direccionEntrega.trim(),
    restaurante,
  });

  return crearPedido({
    usuarioId,
    restauranteId: Number(restauranteId),
    direccionEntrega: direccionEntrega.trim(),
    productos: productosNormalizados,
    impactoCO2,
  });
}
