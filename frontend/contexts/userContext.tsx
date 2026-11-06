import { useState,useEffect,createContext,useContext, type ReactNode} from "react";
import { getUser } from "@/services/userServices";

interface userProps{
    user: [];
    loading:boolean;
}

const userContext = createContext<userProps>({
    user:[],
    loading: true,   
})

export function RestaurantProvider({ children }: { children: ReactNode }) {
    // 4. Tipamos el useState para que sepa que guardará una lista de restaurantes
    const [user, setUser] = useState<>(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser()
            .then(data => {
                setUser(data); 
            })
            .catch(error => console.error("Error cargando restaurantes:", error))
            .finally(() => setLoading(false));
    }, []); 

    return (
        // 5. Compartimos el estado y el loading globalmente
        <userContext.Provider value={{ user, loading }}>
            {children}
        </userContext.Provider>
    );
}

export function useFetchRestaurantes() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("");
    }
    return context; 
}