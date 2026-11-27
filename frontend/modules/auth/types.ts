/** Role values expected by the backend. */
export type UserRole = "usuario" | "restaurante";

export interface User {
  id?: string | number;
  name: string;
  role: UserRole;
  email: string;
}

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  /** Required by the backend for restaurant accounts. */
  address?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ApiResult = { success: true } | { success: false; error: string };
