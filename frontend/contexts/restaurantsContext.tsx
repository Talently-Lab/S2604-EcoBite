"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getRestaurants } from "@/services/restaurantsServices";
import { cardProps } from "@/types/restaurant";

// 2. Tipado del Contexto (Ahora 'restaurants' es una lista: cardProps[])
interface restaurantsContextType {
    restaurants: cardProps[]; 
    loading: boolean;
}

// 3. Crear el contexto con un valor inicial limpio
const RestaurantContext = createContext<restaurantsContextType>({
    restaurants: [], //  Empezamos con una lista vacía
    loading: true
});

export function RestaurantProvider({ children }: { children: ReactNode }) {
    // 4. Tipamos el useState para que sepa que guardará una lista de restaurantes
    const [restaurants, setRestaurants] = useState<cardProps[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRestaurants()
            .then(data => {
                setRestaurants(data); 
            })
            .catch(error => console.error("Error cargando restaurantes:", error))
            .finally(() => setLoading(false));
    }, []); 

    return (
        // 5. Compartimos el estado y el loading globalmente
        <RestaurantContext.Provider value={{ restaurants, loading }}>
            {children}
        </RestaurantContext.Provider>
    );
}


// Hook modificado para consumir el estado global
export function useFetchRestaurantes() {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error("useFetchRestaurantes debe usarse dentro de un RestaurantProvider");
    }
    return context; // Devuelve { restaurants, loading } globales
}


