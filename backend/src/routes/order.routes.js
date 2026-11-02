
import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRestaurant } from "../middleware/requireRestaurant.js";
import { createOrderController, getOrderDetailController, updateOrderStatusController, getRestaurantOrdersController } from "../controllers/order.controllers.js";
import { getMyOrdersController } from "../controllers/order-history.controllers.js";

const router = Router();
// Crear un nuevo pedido
router.post("/", requireAuth, createOrderController);

// Obtener los pedidos del usuario autenticado
router.get("/me", requireAuth, getMyOrdersController);

// Obtener los pedidos del restaurante del usuario autenticado
router.get(
  "/restaurant/me",
  requireAuth,
  requireRestaurant,
  getRestaurantOrdersController
);

// Actualizar el estado de un pedido
router.patch(
  "/:id/status",
  requireAuth,
  requireRestaurant,
  updateOrderStatusController
);
// Obtener los detalles de un pedido por su id
router.get("/:id", requireAuth, getOrderDetailController);
export default router;
