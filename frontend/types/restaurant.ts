export interface cardProps {
    id: string;
    urlImagen: string;
    nombre: string;
    dia: string;
    apertura: string;
    cierre: string;
    metaDatos: {
        cocina: string;
        BadgesSustentabilidad: string;
        BadgesAhorro: string;
        puntuacion: number;
        tipoEnvase:string;
    };
}