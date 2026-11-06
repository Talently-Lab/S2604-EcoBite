import {user} from "@/types/user"
import { error } from "console"

export async function userRegister({nombre,email,contrasena,rol}:user){
    const datos = {
        "nombre":nombre,
        "email":email,
        "password":contrasena,
        "rol":rol
    }
    try{
        const respuesta = await fetch(`${process.env.NEXT_PUBLIC_SERVIDOR_BACKEND}/register`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(datos),
        })

        if (!respuesta.ok){
            return{"success":false,error:"error en el servidor"}
        }

        return { "success": true}
    }
    catch(error){
        return {"success": false, "error":"error de red"}
    }
}

export async function userLogin({ email, contrasena }: { email: string, contrasena: string }) {
    const datos = {
        "email": email,
        "password": contrasena,
    }

    try {
        const respuesta = await fetch(`${process.env.NEXT_PUBLIC_SERVIDOR_BACKEND}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
            // MANDATORIO: Para que Express te pueda setear la cookie HTTP-Only en el navegador
            credentials: 'include' 
        })
        
        const resJson = await respuesta.json()

        // Evaluamos 'respuesta.ok' (status 200-299), no 'resJson.ok'
        if (!respuesta.ok) {
            return { "success": false, "error": resJson.message || "Email o contraseña incorrectos" }
        }

        return { "success": true }
    }
    catch (error) {
        return { "success": false, "error": "Error de conexión con el servidor" }
    }
}
