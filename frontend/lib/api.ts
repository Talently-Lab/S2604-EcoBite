export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function fallbackMessage(status: number): string {
  if (status === 401) return "Tenés que iniciar sesión para continuar.";
  if (status === 403) return "No tenés permiso para hacer esto.";
  if (status === 404) return "No encontramos lo que buscabas.";
  if (status >= 500) return "Algo salió mal de nuestro lado. Probá de nuevo en un rato.";
  return "No pudimos completar la acción. Revisá los datos e intentá de nuevo.";
}

type ApiInit = Omit<RequestInit, "body"> & { json?: unknown };

export async function apiFetch<T>(path: string, init: ApiInit = {}): Promise<T> {
  const { json, headers, ...rest } = init;
  const finalHeaders = new Headers(headers);
  finalHeaders.set("Accept", "application/json");

  let body: string | undefined;
  if (json !== undefined) {
    finalHeaders.set("Content-Type", "application/json");
    body = JSON.stringify(json);
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body,
      credentials: "include",
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(
      0,
      "No pudimos conectarnos con el servidor. Revisá tu conexión e intentá de nuevo.",
    );
  }

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      isRecord(data) && typeof data.message === "string" && data.message
        ? data.message
        : fallbackMessage(response.status);
    throw new ApiError(response.status, message);
  }

  return data as T;
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Ocurrió un error inesperado. Intentá de nuevo.";
}
