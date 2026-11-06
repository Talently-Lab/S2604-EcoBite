"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ButtonPrincipal } from "@/components/Button"
import { InputEmail, InputPassword } from "@/components/Inputs"
import { type ChangeEvent, useState } from "react"
import { userLogin } from "@/services/authServices"

export default function Login() {
    const router = useRouter();
    const [contrasena, setContrasena] = useState("");
    const [email, setEmial] = useState("");
    
    // Estados para controlar el feedback de la interfaz
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // 1. Convertimos la función en async
    async function enviarForm(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setCargando(true);
        setError("");

        // 2. Esperamos la resolución del servicio con await
        const respuesta = await userLogin({ email, contrasena });
        console.log(respuesta)
        setCargando(false);

        if (respuesta.success) {
            // Redirigimos al usuario a la página principal o dashboard si sale bien
            router.push("/dashboard"); 
        } else {
            // Seteamos el error que vino desde el backend para mostrarlo en pantalla
            setError(respuesta.error);
        }
    }

    return (
        <div className="flex w-full h-[calc(100dvh-235.2px)]">
            <form onSubmit={enviarForm} className="flex flex-col items-center justify-center w-1/2 border-r-2 h-full">
                <div className="flex flex-col gap-4 items-start w-[70%]">
                    <h2 className="text-title-2 font-display">Iniciar Sesión</h2>
                    <span className="text-ink-3 text-label font-sans">Ingresá para confirmar tu pedido</span>
                    
                    {/* Renderizado condicional del error si existiera */}
                    {error && <p className="text-red-500 text-sm font-sans">ocurrio un error</p>}

                    <InputEmail functionActivate={(e: ChangeEvent<HTMLInputElement>) => setEmial(e.target.value)} />
                    <InputPassword functionActivate={(e: ChangeEvent<HTMLInputElement>) => setContrasena(e.target.value)} />
                    
                    <Link href="" className="text-label font-sans hover:text-eco-700 border-b-2 border-transparent hover:border-eco-700 transition-colors ease-in-out duration-300">¿Olvidaste tu contraseña?</Link>
                    
                    {/* 3. El botón debe ser de tipo submit para disparar el onSubmit del form */}
                    <ButtonPrincipal 
                        id="buttonPrincipal" 
                        text={cargando ? "Ingresando..." : "Ingresar"} 
                        tamano="w-full" 
                        functionActivate={()=>{}}
                    />
                    
                    <div className="flex justify-center items-center gap-1 text-label font-sans w-full">
                        <p>¿No tenés cuenta? </p>
                        <Link href="/auth/register" className="hover:text-eco-700 border-b-2 border-transparent hover:border-eco-700 transition-colors ease-in-out duration-300 ">Registrate</Link>
                    </div>
                </div>
            </form>
            <div className="w-1/2">
                <img src="/img/images.jpg" alt="" className="w-full h-full" />
            </div>
        </div>
    )
}
