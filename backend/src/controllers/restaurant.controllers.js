import { getRestaurants } from "../repositories/restaurant.repository.js";

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

