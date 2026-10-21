import { getRestaurants, getRestaurantById, getRestaurantMenu } from "../repositories/restaurant.repository.js";

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
 
