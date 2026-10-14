import { Router } from "express";
import { listRestaurantsHandler } from "../controllers/restaurant.controllers.js";

const router = Router();

router.get("/", listRestaurantsHandler);

export default router;

