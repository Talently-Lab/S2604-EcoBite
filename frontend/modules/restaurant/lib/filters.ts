import type { SortOption } from "../types";

/** Seal filters are exclusive: selecting one replaces every other filter. */
export const ALL_FILTER = "all";
export const ECO_SEAL_FILTER = "eco";

type Option<T extends string = string> = { value: T; label: string };

// Values must match the `cocina` / `tipoEnvase` sent by the backend.
export const cuisineOptions: Option[] = [
  { value: "vegana", label: "Vegana" },
  { value: "vegetariana", label: "Vegetariana" },
  { value: "saludable", label: "Saludable" },
  { value: "parrilla", label: "Parrilla" },
  { value: "pizza", label: "Pizza" },
];

export const packagingOptions: Option[] = [
  { value: "biodegradable", label: "Biodegradable" },
  { value: "compostable", label: "Compostable" },
  { value: "reutilizable", label: "Reutilizable" },
];

export const sealOptions: Option[] = [
  { value: ALL_FILTER, label: "Todos" },
  { value: ECO_SEAL_FILTER, label: "Con sello eco" },
];

export const sortOptions: Option<SortOption>[] = [
  { value: "name", label: "Nombre" },
  { value: "open", label: "Abierto" },
  { value: "rating", label: "Mejor Puntuación" },
];
