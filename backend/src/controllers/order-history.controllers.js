
import {
  obtenerPedidosPorUsuario,
} from "../repositories/order.repository.js";

export async function getMyOrdersController(req, res) {
  try {
    const resultado = await obtenerPedidosPorUsuario(req.user.id);

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al consultar los pedidos:", error);

    return res.status(500).json({
      message: "No se pudieron obtener tus pedidos",
    });
  }
}
