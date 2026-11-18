
import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireRestaurant } from "../middleware/requireRestaurant.js";

import {
  createProductController,
  getRestaurantProductsController,
  getMyProductsController,
  getTiposEnvaseController,
  getCategoriasProductoController,
  updateProductController,
  toggleProductStatusController
} from "../controllers/product.controllers.js";

const router = Router();
// Obtener todas las categorías de productos
router.get(
  "/categories",
  getCategoriasProductoController
);
// Obtener los tipos de envase disponibles
router.get(
  "/tipos-envase",
  requireAuth,
  getTiposEnvaseController
);
// Crear un nuevo producto para el restaurante del usuario autenticado
router.post(
  "/",
  requireAuth,
  requireRestaurant,
  createProductController
);
// Obtener los productos del restaurante del usuario autenticado activos y desactivados
router.get(
  "/mine-products",
  requireAuth,
  requireRestaurant,
  getMyProductsController
);
// Obtener los productos de un restaurante por su id (solo activos)
router.get(
  "/restaurant/:id",
  getRestaurantProductsController
);

// Actualizar un producto existente
router.patch(
  "/:id",
  requireAuth,
  requireRestaurant,
  updateProductController
);
// Cambiar el estado de un producto (activo/desactivado)
router.patch(
  "/:id/status",
  requireAuth,
  requireRestaurant,
  toggleProductStatusController
);

export default router;
