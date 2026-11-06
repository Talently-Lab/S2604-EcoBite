export interface cardProps {
    id: string;
    urlImagen: string;
    nombre: string;
    dia: string;
    apertura: string;
    cierre: string;
    metaDatos: {
        cocina: string; // va el plato
        BadgesSustentabilidad: string;
        BadgesAhorro: string;
        puntuacion: number;
        tipoEnvase:string; // nose si deberia ir aca
    };
}

export interface restaurant{
    id: string;
    urlImagen: string;
    nombre: string;
    dia: string;
    apertura: string;
    cierre: string;
    BadgesSustentabilidad: string;
    BadgesAhorro: string;
    puntuacion: number;
    descripcion:string;
    latitud:number;
    longitud:number;
}