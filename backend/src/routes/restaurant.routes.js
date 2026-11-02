import { Router } from "express";
import { listRestaurantsHandler, getRestaurantDetails,getRestaurantMenuController, updateMyRestaurantProfileController, getMyRestaurantScheduleController, saveMyRestaurantScheduleController } from "../controllers/restaurant.controllers.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRestaurant } from "../middleware/requireRestaurant.js";

const router = Router();
// Obtener la lista de restaurantes activos
router.get("/", listRestaurantsHandler);
// Obtener los horarios del restaurante del usuario autenticado
router.get(
  "/me/schedule",
  requireAuth,
  requireRestaurant,
  getMyRestaurantScheduleController
);
// Guardar los horarios del restaurante del usuario autenticado
router.put(
  "/me/schedule",
  requireAuth,
  requireRestaurant,
  saveMyRestaurantScheduleController
);
// Obtener los detalles del restaurante por su id
router.get("/:id", getRestaurantDetails);

// Obtener el menú del restaurante por su id
router.get("/:id/menu", getRestaurantMenuController);

// Actualizar el perfil del restaurante del usuario autenticado
router.put(
  "/me/profile",
  requireAuth,
  requireRestaurant,
  updateMyRestaurantProfileController
);


export default router;

