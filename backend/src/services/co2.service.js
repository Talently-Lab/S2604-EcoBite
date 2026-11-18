
import db from "../config/db.js";
import { geocodeAddress } from "./geocoding.service.js";

function calcularDistanciaKm(origen, destino) {
  const radioTierraKm = 6371;
  const radianes = grados => grados * Math.PI / 180;

  const lat1 = radianes(origen.latitud);
  const lat2 = radianes(destino.latitud);
  const deltaLat = radianes(destino.latitud - origen.latitud);
  const deltaLon = radianes(destino.longitud - origen.longitud);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return Number((radioTierraKm * c).toFixed(2));
}

export async function calcularImpactoCO2({
  tipoTransporte,
  direccionEntrega,
  restaurante,
}) {
  if (
    typeof direccionEntrega !== "string" ||
    !direccionEntrega.trim()
  ) {
    throw new Error("La dirección de entrega es obligatoria");
  }

  if (
    !restaurante ||
    restaurante.latitud == null ||
    restaurante.longitud == null
  ) {
    throw new Error("El restaurante no tiene coordenadas válidas");
  }

  const [factores] = await db.query(
    `SELECT
       id,
       tipo_transporte_ecobite,
       tipo_transporte_referencia,
       factor_referencia_kgco2e_km,
       factor_ecobite_kgco2e_km
     FROM factores_co2
     WHERE tipo_transporte_ecobite = ?
       AND activo = TRUE
     LIMIT 1`,
    [tipoTransporte]
  );

  if (factores.length === 0) {
    throw new Error("No existe un factor activo para ese transporte");
  }

  const destino = await geocodeAddress(direccionEntrega.trim());

  if (!destino) {
    throw new Error("No se pudo encontrar la dirección de entrega");
  }

  const distanciaKm = calcularDistanciaKm(
    {
      latitud: Number(restaurante.latitud),
      longitud: Number(restaurante.longitud),
    },
    {
      latitud: Number(destino.latitud),
      longitud: Number(destino.longitud),
    }
  );

  const factor = factores[0];
  const factorReferencia = Number(
    factor.factor_referencia_kgco2e_km
  );
  const factorEcoBite = Number(
    factor.factor_ecobite_kgco2e_km
  );

  const ahorro = Math.max(
    0,
    distanciaKm * (factorReferencia - factorEcoBite)
  );

  return {
    factor_co2_id: factor.id,
    restaurant_latitude: Number(restaurante.latitud),
    restaurant_longitude: Number(restaurante.longitud),
    usuario_latitude: Number(destino.latitud),
    usuario_longitude: Number(destino.longitud),
    distancia_km: distanciaKm,
    co2_ahorrado_kg: Number(ahorro.toFixed(5)),
  };
}
