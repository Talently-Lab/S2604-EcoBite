export type Rol = "usuario" | "restaurante";

export type User = {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  rol: Rol | string;
  perfil_completado?: boolean;
};

export type Restaurant = {
  id: number;
  nombre: string;
  direccion?: string | null;
  descripcion?: string | null;
  imagen_url?: string | null;
};

export type Product = {
  id: number;
  restaurante_id: number;
  nombre: string;
  descripcion: string | null;
  precio: number | string;
  imagen_url: string | null;
};

export type MenuResponse = Product[] | { message?: string; menu: Product[] };

export function normalizeMenu(data: MenuResponse): Product[] {
  return Array.isArray(data) ? data : data.menu ?? [];
}

export type RegistrationData = {
  email: string;
  name: string;
  avatar_url: string | null;
};
