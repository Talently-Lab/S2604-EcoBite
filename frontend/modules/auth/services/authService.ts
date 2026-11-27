import { API_URL } from "@/shared/config/env";
import type { ApiResult, LoginData, RegisterData } from "../types";

async function postAuth(
  endpoint: string,
  body: Record<string, unknown>,
  defaultError: string,
): Promise<ApiResult> {
  if (!API_URL) {
    return { success: false, error: "Falta configurar la URL del servidor" };
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // The backend sets the session in an httpOnly cookie.
      credentials: "include",
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      return { success: false, error: json?.message ?? defaultError };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Error de conexión con el servidor" };
  }
}

// The backend API uses Spanish field names (`nombre`, `rol`, `direccion`).
export function registerUser({ name, email, password, role, address }: RegisterData) {
  return postAuth(
    "/auth/register",
    { nombre: name, email, password, rol: role, direccion: address },
    "No pudimos crear la cuenta",
  );
}

export function loginUser({ email, password }: LoginData) {
  return postAuth("/auth/login", { email, password }, "Email o contraseña incorrectos");
}
