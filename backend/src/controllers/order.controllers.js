
import { crearPedidoService } from "../services/order.service.js";
import { obtenerDetallePedido } from "../repositories/order.repository.js";

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


export async function getOrderDetailController(req, res) {
  const pedidoId = Number(req.params.id);

  if (!Number.isInteger(pedidoId) || pedidoId <= 0) {
    return res.status(400).json({
      message: "ID de pedido inválido",
    });
  }

  try {
    const pedido = await obtenerDetallePedido(
      pedidoId,
      req.user.id
    );

    if (!pedido) {
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    console.error("Error al consultar el detalle del pedido:", error);

    return res.status(500).json({
      message: "No se pudo obtener el detalle del pedido",
    });
  }
}
