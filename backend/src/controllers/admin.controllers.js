import {
  getAllRestaurants,
  updateRestaurantStatus,
  updateRestaurantBadge
} from "../repositories/admin.repository.js";

// Listar todos los restaurantes
export async function getAllRestaurantsController(req, res) {
  try {
    const restaurants = await getAllRestaurants();

    return res.status(200).json({
      total: restaurants.length,
      restaurantes: restaurants,
    });
  } catch (error) {
    console.error("Error al obtener todos los restaurantes:", error);

    return res.status(500).json({
      message: "Error al obtener los restaurantes",
    });
  }
}
// Cambiar el estado de un restaurante (activar/desactivar)
export async function updateRestaurantStatusController(req, res) {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "ID de restaurante inválido",
      });
    }

    if (typeof activo !== "boolean") {
      return res.status(400).json({
        message: "El campo activo debe ser true o false",
      });
    }

    const restaurant = await updateRestaurantStatus(
      Number(id),
      activo
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurante no encontrado",
      });
    }

    return res.status(200).json({
      message: activo
        ? "Restaurante activado correctamente"
        : "Restaurante desactivado correctamente",
      restaurante: {
        id: restaurant.id,
        activo: Boolean(restaurant.activo),
      },
    });
  } catch (error) {
    console.error("Error al actualizar el estado del restaurante:", error);

    return res.status(500).json({
      message: "Error al actualizar el estado del restaurante",
    });
  }
}


export async function updateRestaurantBadgeController(req, res) {
  try {
    const { id } = req.params;
    const { badge_sustentabilidad } = req.body;

    // Validar ID
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "ID de restaurante inválido"
      });
    }

    // Validar que se haya enviado el campo
    if (!Object.hasOwn(req.body, "badge_sustentabilidad")) {
      return res.status(400).json({
        message: "Debes enviar badge_sustentabilidad"
      });
    }

    const badgesPermitidos = [
      "SinEmisiones",
      "ecofriendly"
    ];

    // Permitir null para quitar todos los badges
    if (
      badge_sustentabilidad !== null &&
      !Array.isArray(badge_sustentabilidad)
    ) {
      return res.status(400).json({
        message: "Los badges deben enviarse como un arreglo o null"
      });
    }

    if (
      Array.isArray(badge_sustentabilidad) &&
      (
        !badge_sustentabilidad.every((badge) =>
          badgesPermitidos.includes(badge)
        ) ||
        new Set(badge_sustentabilidad).size !== badge_sustentabilidad.length
      )
    ) {
      return res.status(400).json({
        message: "Los badges permitidos son SinEmisiones y ecofriendly"
      });
    }

    const restaurante = await updateRestaurantBadge(
      Number(id),
      badge_sustentabilidad
    );

    if (!restaurante) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }

    return res.status(200).json({
      message: "Badges de sustentabilidad actualizados correctamente",
      restaurante
    });

  } catch (error) {
    console.error("Error al actualizar badges:", error);

    return res.status(500).json({
      message: "Error al actualizar los badges del restaurante"
    });
  }
}