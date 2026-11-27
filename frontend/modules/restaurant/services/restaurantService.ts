import { API_URL } from "@/shared/config/env";
import type { Restaurant } from "../types";

/** Raw restaurant shape returned by the backend API (field names come from the API). */
interface RestaurantApiResponse {
  id: string | number;
  nombre: string;
  urlImagen: string;
  dia?: string;
  apertura?: string;
  cierre?: string;
  cocina: string;
  badgesSustentabilidad: string;
  badgesAhorro?: string;
  puntuacion?: number;
  tipoEnvase?: string;
}

// TODO: agree on the error format with the backend.
export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) throw new Error("Failed to fetch restaurants");

  const data: RestaurantApiResponse[] = await response.json();
  return data.map(toRestaurant);
}

/** Maps the flat API object into the `Restaurant` shape used by the UI. */
function toRestaurant(apiData: RestaurantApiResponse): Restaurant {
  return {
    id: String(apiData.id),
    name: apiData.nombre,
    imageUrl: apiData.urlImagen,
    day: apiData.dia || "No especificado",
    openingTime: apiData.apertura || "--:--",
    closingTime: apiData.cierre || "--:--",
    metadata: {
      cuisine: apiData.cocina,
      sustainabilityBadge: apiData.badgesSustentabilidad,
      co2Saved: apiData.badgesAhorro || "Sin badges",
      rating: apiData.puntuacion || 0,
      packagingType: apiData.tipoEnvase || "Estándar",
    },
  };
}
