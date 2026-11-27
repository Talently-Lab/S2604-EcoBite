/**
 * Single source of truth for app routes. If a URL changes, change it here.
 */
export const routes = {
  home: "/",
  explore: "/explore",
  restaurantPortal: "/restaurant-portal",
  login: "/login",
  register: "/register",
} as const;

/** Landing section anchors (prefixed with "/" so they work from any page). */
export const landingSections = {
  restaurants: { id: "restaurantes", href: "/#restaurantes", label: "Restaurantes" },
  impact: { id: "impacto", href: "/#impacto", label: "Impacto" },
  pilotZone: { id: "zona-piloto", href: "/#zona-piloto", label: "Zona piloto" },
  partners: { id: "para-restaurantes", href: "/#para-restaurantes", label: "Para restaurantes" },
} as const;
