"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { getUser } from "@/services/userServices";
import type { user } from "@/types/user";

interface userContextType {
    user: user | null;
    loading: boolean;
}

const userContext = createContext<userContextType>({
    user: null,
    loading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<user | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser()
            .then(data => setUser(data))
            .catch(error => console.error("Error cargando el usuario:", error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <userContext.Provider value={{ user, loading }}>
            {children}
        </userContext.Provider>
    );
}

export function useUser() {
    return useContext(userContext);
}
