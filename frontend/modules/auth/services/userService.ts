import { API_URL } from "@/shared/config/env";
import type { User, UserRole } from "../types";

/** Raw response of `GET /auth/me`. */
interface MeApiResponse {
  id: string | number;
  name: string;
  email: string;
  rol: UserRole;
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch the current user");
  const data: MeApiResponse = await response.json();
  return { id: data.id, name: data.name, email: data.email, role: data.rol };
}
