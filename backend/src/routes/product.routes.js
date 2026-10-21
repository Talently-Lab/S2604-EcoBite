
import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireRestaurant } from "../middleware/requireRestaurant.js";

import {
  createProductController, getRestaurantProductsController
} from "../controllers/product.controllers.js";

const router = Router();

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
