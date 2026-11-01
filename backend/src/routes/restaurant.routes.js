import { Router } from "express";
import { listRestaurantsHandler, getRestaurantDetails,getRestaurantMenuController, updateMyRestaurantProfileController, getMyRestaurantScheduleController, saveMyRestaurantScheduleController } from "../controllers/restaurant.controllers.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRestaurant } from "../middleware/requireRestaurant.js";

const router = Router();

router.get("/", listRestaurantsHandler);
router.get(
  "/me/schedule",
  requireAuth,
  requireRestaurant,
  getMyRestaurantScheduleController
);

router.put(
  "/me/schedule",
  requireAuth,
  requireRestaurant,
  saveMyRestaurantScheduleController
);
router.get("/:id", getRestaurantDetails);
router.get("/:id/menu", getRestaurantMenuController);
router.put(
  "/me/profile",
  requireAuth,
  requireRestaurant,
  updateMyRestaurantProfileController
);


export default router;

