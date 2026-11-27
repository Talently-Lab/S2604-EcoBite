"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getRestaurants } from "../services/restaurantService";
import type { Restaurant } from "../types";

interface RestaurantsContextValue {
  restaurants: Restaurant[];
  loading: boolean;
}

const RestaurantsContext = createContext<RestaurantsContextValue>({
  restaurants: [],
  loading: true,
});

export function RestaurantsProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants()
      .then(setRestaurants)
      .catch((error) => console.error("Error loading restaurants:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RestaurantsContext.Provider value={{ restaurants, loading }}>
      {children}
    </RestaurantsContext.Provider>
  );
}

export function useRestaurants() {
  return useContext(RestaurantsContext);
}
