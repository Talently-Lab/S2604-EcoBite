
import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { createOrderController, getOrderDetailController } from "../controllers/order.controllers.js";
import { getMyOrdersController } from "../controllers/order-history.controllers.js";

const router = Router();

router.post("/", requireAuth, createOrderController);
router.get("/me", requireAuth, getMyOrdersController);
router.get("/:id", requireAuth, getOrderDetailController);
export default router;
