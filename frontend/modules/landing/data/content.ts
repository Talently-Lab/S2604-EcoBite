/**
 * Static landing content. Once a backend/CMS provides it, replace this file
 * with a service without touching the components.
 */

export type RestaurantTag = "plant-based" | "compostable" | "bike";

export type FeaturedRestaurant = {
  slug: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  deliveryTime: string;
  delivery: "Bicicleta" | "Moto eléctrica";
  co2SavedGrams: number;
  image: string;
  imageAlt: string;
  tags: RestaurantTag[];
};

export const restaurantFilters: { value: RestaurantTag | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "plant-based", label: "100% plant-based" },
  { value: "compostable", label: "Envase compostable" },
  { value: "bike", label: "Entrega en bici" },
];

export const featuredRestaurants: FeaturedRestaurant[] = [
  {
    slug: "verde-oliva",
    name: "Verde Oliva",
    cuisine: "Bowls y ensaladas",
    neighborhood: "Palermo",
    deliveryTime: "20–30 min",
    delivery: "Bicicleta",
    co2SavedGrams: 320,
    image: "/images/landing/salad.jpg",
    imageAlt: "Bowl de ensalada fresca con palta, huevo y vegetales de estación",
    tags: ["plant-based", "compostable", "bike"],
  },
  {
    slug: "don-pepe",
    name: "Pizzería Don Pepe",
    cuisine: "Pizza de masa madre",
    neighborhood: "Belgrano",
    deliveryTime: "25–35 min",
    delivery: "Bicicleta",
    co2SavedGrams: 280,
    image: "/images/landing/pizza.jpg",
    imageAlt: "Pizza artesanal recién salida del horno",
    tags: ["compostable", "bike"],
  },
  {
    slug: "raiz-cocina",
    name: "Raíz Cocina",
    cuisine: "Cocina de estación",
    neighborhood: "Recoleta",
    deliveryTime: "30–40 min",
    delivery: "Moto eléctrica",
    co2SavedGrams: 350,
    image: "/images/landing/veggies.jpg",
    imageAlt: "Plato de vegetales coloridos sobre una mesa de madera",
    tags: ["plant-based", "compostable"],
  },
];

export const trustStats = [
  { value: "+150", label: "Locales adheridos", detail: "Pedí como siempre, eligiendo mejor.", icon: "store" },
  { value: "100%", label: "Envases compostables", detail: "Chau plásticos de un solo uso.", icon: "compost" },
  { value: "0 g", label: "CO₂ por envío", detail: "Bici y movilidad eléctrica.", icon: "bike" },
  { value: "1.240 kg", label: "CO₂ evitado este mes", detail: "Impacto medible, pedido a pedido.", icon: "co2" },
] as const;

export const communityImpact = [
  { value: "2,4 t", label: "de CO₂ evitadas por la comunidad" },
  { value: "8.620", label: "envases de un solo uso evitados" },
  { value: "5.100", label: "entregas de bajas emisiones" },
  { value: "12.400", label: "pedidos con impacto positivo" },
];

/** Average used by the estimator (grams of CO₂ avoided per order). */
export const CO2_PER_ORDER_GRAMS = 300;

export const comparisonRows = [
  { topic: "Tu comida llega protegida", others: "Bolsas y envases descartables", ecobite: "Envases biodegradables" },
  { topic: "Elegís cómo llega", others: "Emisiones sin medir", ecobite: "Repartos en bici o eléctricos" },
  { topic: "Sabés qué generás", others: "Sin datos de impacto", ecobite: "CO₂ visible en cada pedido" },
  { topic: "Tu local puede crecer", others: "Comisiones poco claras", ecobite: "Comisiones justas y transparentes" },
];

export type PilotNeighborhood = {
  id: "palermo" | "recoleta" | "belgrano";
  name: string;
  description: string;
};

/** Swatch colors per neighborhood (reusable by a future map). */
export const neighborhoodColors: Record<PilotNeighborhood["id"], { fill: string; stroke: string }> = {
  belgrano: { fill: "#E6F4ED", stroke: "#4CB959" },
  palermo: { fill: "#CFE9D6", stroke: "#2D6A4F" },
  recoleta: { fill: "#FFF0DF", stroke: "#F4A261" },
};

export const pilotNeighborhoods: PilotNeighborhood[] = [
  {
    id: "belgrano",
    name: "Belgrano",
    description: "Pizzerías de barrio, panaderías de masa madre y cocina oriental.",
  },
  {
    id: "palermo",
    name: "Palermo",
    description: "Bowls, cocina plant-based y cafés de especialidad.",
  },
  {
    id: "recoleta",
    name: "Recoleta",
    description: "Bodegones, cocina de estación y menús del día.",
  },
];
