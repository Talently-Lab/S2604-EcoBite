"use client"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ButtonPrincipal } from "@/components/Button"
import { InputEmail, InputPassword } from "@/components/Inputs"
import { userLogin } from "@/services/authServices"

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    async function enviarForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !contrasena) {
            return setError("Completá tu email y contraseña");
        }

        setCargando(true);
        try {
            const respuesta = await userLogin({ email, contrasena });
            if (respuesta.success) {
                router.push("/dashboard");
            } else {
                setError(respuesta.error);
            }
        } catch {
            setError("Ocurrió un error inesperado");
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="flex w-full h-[calc(100dvh-235.2px)]">
            <form onSubmit={enviarForm} className="flex flex-col items-center justify-center w-1/2 border-r-2 h-full">
                <div className="flex flex-col gap-4 items-start w-[70%]">
                    <h2 className="text-title-2 font-display">Iniciar Sesión</h2>
                    <span className="text-ink-3 text-label font-sans">Ingresá para confirmar tu pedido</span>

                    {error && <p role="alert" className="text-red-500 text-sm font-sans">{error}</p>}

                    <InputEmail functionActivate={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <InputPassword functionActivate={(e: ChangeEvent<HTMLInputElement>) => setContrasena(e.target.value)} />

                    <Link href="/auth/recuperar" className="text-label font-sans hover:text-eco-700 border-b-2 border-transparent hover:border-eco-700 transition-colors ease-in-out duration-300">
                        ¿Olvidaste tu contraseña?
                    </Link>

                    <ButtonPrincipal
                        id="buttonPrincipal"
                        text={cargando ? "Ingresando..." : "Ingresar"}
                        tamano="w-full"
                        disabled={cargando}
                        functionActivate={()=>{}}
                    />

                    <div className="flex justify-center items-center gap-1 text-label font-sans w-full">
                        <p>¿No tenés cuenta?</p>
                        <Link href="/auth/register" className="hover:text-eco-700 border-b-2 border-transparent hover:border-eco-700 transition-colors ease-in-out duration-300">
                            Registrate
                        </Link>
                    </div>
                </div>
            </form>
            <div className="w-1/2">
                <img src="/img/images.jpg" alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    )
}