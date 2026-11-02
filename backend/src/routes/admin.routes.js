import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

import {
  getAllRestaurantsController,
  updateRestaurantStatusController,
  updateRestaurantBadgeController
} from "../controllers/admin.controllers.js";

const router = Router();

// Todas las rutas de administración requieren autenticación y rol admin
router.use(requireAuth, requireAdmin);

// Listar todos los restaurantes
router.get("/restaurants", getAllRestaurantsController);

// Desactivar un restaurante
router.patch(
  "/restaurants/:id/deactivate",
    updateRestaurantStatusController
);

router.patch(
  "/restaurants/:id/badge",
  updateRestaurantBadgeController
);

export default router;