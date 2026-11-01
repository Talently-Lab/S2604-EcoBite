import { getRestaurants, getRestaurantById, getRestaurantMenu, getRestaurantByUserId, getRestaurantSchedule, saveRestaurantSchedule, updateRestaurantProfile } from "../repositories/restaurant.repository.js";

export async function listRestaurantsHandler(req, res) {
  try{
    const restaurants = await getRestaurants();
    return res.json(restaurants);
  }catch(error){
    console.error(error);
    return res.status(500).json({
      message: "Error al obtener los restaurantes"
    })
  }
}

export async function getRestaurantDetails(req, res) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "ID de restaurante inválido"
      });
    }

    const restaurant = await getRestaurantById(Number(id));

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }

    return res.json(restaurant);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener los detalles del restaurante"
    });
  }
}

export async function getRestaurantMenuController(req, res) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "ID de restaurante inválido"
      });
    }

    const restaurantId = Number(id);

    const restaurant = await getRestaurantById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }

    const menu = await getRestaurantMenu(restaurantId);

    if (menu.length === 0) {
      return res.status(200).json({
        message: "Este restaurante todavía no tiene platos disponibles.",
        menu: []
      });
    }

    return res.json(menu);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener el menú del restaurante"
    });
  }
}
 

const DIAS_SEMANA = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

// get de los horarios del restaurante autenticado
export async function getMyRestaurantScheduleController(req, res) {
  try {
    const restaurant = await getRestaurantByUserId(req.user.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "No se encontró un restaurante asociado a tu cuenta",
      });
    }

    const horarios = await getRestaurantSchedule(restaurant.id);

    return res.status(200).json(horarios);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);

    return res.status(500).json({
      message: "Error al obtener los horarios del restaurante",
    });
  }
}

// crear o actualizar horarios del restaurante autenticado
export async function saveMyRestaurantScheduleController(req, res) {
  try {
    const { horarios } = req.body;

    if (!Array.isArray(horarios) || horarios.length !== 7) {
      return res.status(400).json({
        message: "Debés enviar los horarios de los siete días",
      });
    }

    const diasRecibidos = new Set();

    for (const horario of horarios) {
      const { dia_semana, hora_apertura, hora_cierre } = horario;

      if (
        !Number.isInteger(dia_semana) ||
        dia_semana < 0 ||
        dia_semana > 6 ||
        diasRecibidos.has(dia_semana)
      ) {
        return res.status(400).json({
          message: "Los días deben ser únicos y tener un ID entre 0 y 6",
        });
      }

      diasRecibidos.add(dia_semana);

      const ambasHorasNulas =
        hora_apertura === null && hora_cierre === null;

      const ambasHorasValidas =
        typeof hora_apertura === "string" &&
        typeof hora_cierre === "string" &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(hora_apertura) &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(hora_cierre);

      if (!ambasHorasNulas && !ambasHorasValidas) {
        return res.status(400).json({
          message: `Los horarios de ${DIAS_SEMANA[dia_semana]} deben tener apertura y cierre válidos, o ambos ser null`,
        });
      }
    }

    const restaurant = await getRestaurantByUserId(req.user.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "No se encontró un restaurante asociado a tu cuenta",
      });
    }

    await saveRestaurantSchedule(restaurant.id, horarios);

    const horariosActualizados = await getRestaurantSchedule(
      restaurant.id
    );

    return res.status(200).json({
      message: "Horarios actualizados correctamente",
      horarios: horariosActualizados,
    });
  } catch (error) {
    console.error("Error al guardar los horarios:", error);

    return res.status(500).json({
      message: "Error al guardar los horarios del restaurante",
    });
  }
}


// actualizar perfil del restaurante autenticado
export async function updateMyRestaurantProfileController(req, res) {
  try {
    const { descripcion, imagen_url } = req.body;

    // validar descripcion e imagen 
    if (
      descripcion !== null &&
      typeof descripcion !== "string"
    ) {
      return res.status(400).json({
        message: "La descripción debe ser un texto o null",
      });
    }

    if (imagen_url !== null) {
      if (typeof imagen_url !== "string") {
        return res.status(400).json({
          message: "La imagen debe ser una URL o null",
        });
      }

      try {
        const url = new URL(imagen_url);

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Protocolo inválido");
        }
      } catch {
        return res.status(400).json({
          message: "La URL de la imagen no es válida",
        });
      }
    }

    // buscar el restaurante asociado al usuario autenticado
    const restaurant = await getRestaurantByUserId(req.user.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "No se encontró un restaurante asociado a tu cuenta",
      });
    }

    // actualizar la información del restaurante por su id
    const updatedRestaurant = await updateRestaurantProfile({
      restauranteId: restaurant.id,
      descripcion,
      imagen_url,
    });

    return res.status(200).json({
      message: "Perfil del restaurante actualizado correctamente",
      restaurant: updatedRestaurant,
    });

  } catch (error) {
    console.error("Error al actualizar el perfil:", error);

    return res.status(500).json({
      message: "Error al actualizar el perfil del restaurante",
    });
  }
}