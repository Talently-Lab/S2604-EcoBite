import { cardProps } from '@/types/restaurant';

export async function getRestaurants() {
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_SERVIDOR_BACKEND}/restaurants`);
    if (!respuesta.ok) throw new Error('ocurrio un Error al traer los restaurante');
    const resJson = await respuesta.json()
    const datoLimpios: cardProps[] = resJson.map(transformRestaurantData)
    console.log(datoLimpios)
    return datoLimpios;
} //el error falta definir con el backend


// Pasamos el objeto plano de la API y devolvemos la interfaz con 'metaDatos'
const transformRestaurantData = (apiData: any): cardProps => {
    return {
        // Mantenemos el id como string (si la API lo manda como número, lo convertimos)
        id: String(apiData.id), 
        nombre: apiData.nombre,
        urlImagen: apiData.urlImagen,
        dia: apiData.dia || 'No especificado', // Por si la API no lo envía en este endpoint
        apertura: apiData.apertura || '--:--',
        cierre: apiData.cierre || '--:--',
        metaDatos: {
            cocina: apiData.cocina,
            BadgesSustentabilidad: apiData.badgesSustentabilidad,
            BadgesAhorro: apiData.badgesAhorro || 'Sin badges', // Evitamos que rompa si viene undefined
            puntuacion: apiData.puntuacion || 0,
            tipoEnvase: apiData.tipoEnvase || 'Estándar'
        }
    };
};