export async function geocodeAddress(address) {
  const url = new URL(
    "https://nominatim.openstreetmap.org/search"
  );

  url.searchParams.set("q", address);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ar");

  const response = await fetch(url, {
    headers: {
      "User-Agent": "EcoBite/1.0 (ecobite-app)"
    }
  });

  if (!response.ok) {
    throw new Error("Error al consultar el servicio de geocodificación");
  }

  const data = await response.json();

  if (data.length === 0) {
    return null;
  }

  return {
    latitud: Number(data[0].lat),
    longitud: Number(data[0].lon)
  };
}

