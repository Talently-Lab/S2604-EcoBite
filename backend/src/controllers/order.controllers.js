
import { crearPedidoService } from "../services/order.service.js";

export async function createOrderController(req, res) {
  try {
    const {
      restaurante_id,
      direccion_entrega,
      tipo_transporte,
      productos,
    } = req.body;

    const pedido = await crearPedidoService({
      usuarioId: req.user.id,
      restauranteId: restaurante_id,
      direccionEntrega: direccion_entrega,
      tipoTransporte: tipo_transporte,
      productos,
    });

    return res.status(201).json({
      message: "Pedido creado correctamente",
      pedido,
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error);

    const clientErrors = [
      "ID de restaurante inválido",
      "La dirección de entrega es obligatoria",
      "El pedido debe contener al menos un producto",
      "Cada producto debe tener un ID válido y una cantidad entera positiva",
      "El restaurante no existe o no está activo",
      "No se pudo encontrar la dirección de entrega",
      "No existe un factor activo para ese transporte",
      "Uno o más productos no existen",
    ];

    const status = clientErrors.includes(error.message) ||
      error.message.startsWith("Todos los productos") ||
      error.message.startsWith("El producto ")
      ? 400
      : 500;

    return res.status(status).json({
      message: status === 400
        ? error.message
        : "Error al crear el pedido",
    });
  }
}
