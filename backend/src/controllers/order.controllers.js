
import { crearPedidoService } from "../services/order.service.js";
import { obtenerDetallePedido, actualizarEstadoPedido, obtenerPedidosPorRestaurante } from "../repositories/order.repository.js";
import { getRestaurantByUserId } from "../repositories/restaurant.repository.js";

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

export async function updateOrderStatusController(req, res) {
  try {
    const pedidoId = Number(req.params.id);
    const { estado_pedido } = req.body;

    if (!Number.isInteger(pedidoId) || pedidoId <= 0) {
      return res.status(400).json({
        message: "ID de pedido inválido",
      });
    }

    const estadosValidos = [
      "pendiente",
      "en preparacion",
      "listo",
      "entregado",
      "cancelado",
    ];

    if (!estadosValidos.includes(estado_pedido)) {
      return res.status(400).json({
        message: "Estado de pedido inválido",
      });
    }

    const restaurante = await getRestaurantByUserId(req.user.id);

    if (!restaurante) {
      return res.status(404).json({
        message: "Restaurante no encontrado",
      });
    }

    const resultado = await actualizarEstadoPedido({
      pedidoId,
      restauranteId: restaurante.id,
      nuevoEstado: estado_pedido,
    });

    if (resultado.notFound) {
      return res.status(404).json({
        message: "Pedido no encontrado en tu restaurante",
      });
    }

    return res.status(200).json({
      message: "Estado del pedido actualizado correctamente",
      pedido: resultado.pedido,
    });
  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error);

    return res.status(500).json({
      message: "Error al actualizar el estado del pedido",
    });
  }
}

export async function getRestaurantOrdersController(req, res) {
  try {
    const restaurante = await getRestaurantByUserId(req.user.id);

    if (!restaurante) {
      return res.status(404).json({
        message: "Restaurante no encontrado",
      });
    }

    const pedidos = await obtenerPedidosPorRestaurante(restaurante.id);

    return res.status(200).json({
      total: pedidos.length,
      pedidos,
    });
  } catch (error) {
    console.error("Error al obtener los pedidos del restaurante:", error);

    return res.status(500).json({
      message: "No se pudieron obtener los pedidos",
    });
  }
}