import { Router } from "express";
import { listRestaurantsHandler, getRestaurantDetails,getRestaurantMenuController  } from "../controllers/restaurant.controllers.js";

const router = Router();

router.get("/", listRestaurantsHandler);
router.get("/:id", getRestaurantDetails);
router.get("/:id/menu", getRestaurantMenuController);

export default router;

