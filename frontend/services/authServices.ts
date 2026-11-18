import type { user } from "@/types/user"

const API_URL = process.env.NEXT_PUBLIC_SERVIDOR_BACKEND

export type ApiResult =
    | { success: true }
    | { success: false; error: string }

type RegisterData = Pick<user, "nombre" | "email" | "contrasena" | "rol">
type LoginData = { email: string; contrasena: string }

async function postAuth(
    endpoint: string,
    datos: Record<string, unknown>,
    errorPorDefecto: string,
    credentials: RequestCredentials = "same-origin"
): Promise<ApiResult> {
    if (!API_URL) {
        return { success: false, error: "Falta configurar la URL del servidor" }
    }

    try {
        const respuesta = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
            credentials,
        })

        const resJson = await respuesta.json().catch(() => null)

        if (!respuesta.ok) {
            return { success: false, error: resJson?.message ?? errorPorDefecto }
        }

        return { success: true }
    } catch {
        return { success: false, error: "Error de conexión con el servidor" }
    }
}

export function userRegister({ nombre, email, contrasena, rol }: RegisterData) {
    return postAuth(
        "/register",
        { nombre, email, password: contrasena, rol },
        "No pudimos crear la cuenta"
    )
}

export function userLogin({ email, contrasena }: LoginData) {
    return postAuth(
        "/login",
        { email, password: contrasena },
        "Email o contraseña incorrectos",
        "include"
    )
}