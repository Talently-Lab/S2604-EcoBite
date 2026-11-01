
import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireRestaurant } from "../middleware/requireRestaurant.js";

import {
  createProductController,
  getRestaurantProductsController,
  getTiposEnvaseController,
  getCategoriasProductoController,
} from "../controllers/product.controllers.js";

const router = Router();

router.get(
  "/categories",
  getCategoriasProductoController
);

router.get(
  "/tipos-envase",
  requireAuth,
  getTiposEnvaseController
);

router.post(
  "/",
  requireAuth,
  requireRestaurant,
  createProductController
);


router.get(
  "/restaurant/:id",
  getRestaurantProductsController
);

export default router;
