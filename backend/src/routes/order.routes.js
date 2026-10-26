
import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { createOrderController } from "../controllers/order.controllers.js";
import { getMyOrdersController } from "../controllers/order-history.controllers.js";

const router = Router();

router.post("/", requireAuth, createOrderController);
router.get("/me", requireAuth, getMyOrdersController);

export default router;
