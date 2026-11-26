"use client"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { InputEco, InputEmail, InputPassword } from "@/components/Inputs"
import { ButtonPrincipal } from "@/components/Button"
import { userRegister } from "@/services/authServices"

type Rol = "cliente" | "restaurante"

export default function Register() {
    const router = useRouter();
    const [rol, setRol] = useState<Rol>("cliente");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    async function enviarForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!nombre.trim() || !email.trim() || !contrasena) {
            return setError("Completá todos los campos");
        }
        if (contrasena.length < 8) {
            return setError("La contraseña debe tener al menos 8 caracteres");
        }
        if (!aceptaTerminos) {
            return setError("Tenés que aceptar los términos y condiciones");
        }

        setCargando(true);
        try {
            const respuesta = await userRegister({ nombre: nombre.trim(), email: email.trim(), contrasena, rol });
            if (respuesta.success) {
                router.push("/auth/login");
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
            <div className="relative w-1/2">
                <Image src="/img/images.jpg" alt="" fill sizes="50vw" className="object-cover" />
            </div>
            <form onSubmit={enviarForm} className="flex flex-col items-center justify-center w-1/2 border-l-2 h-full">
                <div className="flex flex-col gap-3.5 items-start w-[70%]">
                    <h2 className="text-title-2 font-display">Crear cuenta</h2>

                    <div className="w-full flex border-2 border-ink-3 p-1 rounded-pill">
                        {(["cliente", "restaurante"] as const).map((opcion) => (
                            <label key={opcion} htmlFor={opcion} className="w-1/2 group cursor-pointer">
                                <input
                                    id={opcion}
                                    type="radio"
                                    name="rol"
                                    value={opcion}
                                    checked={rol === opcion}
                                    onChange={() => setRol(opcion)}
                                    className="sr-only peer"
                                />
                                <div className="border-2 border-transparent peer-checked:border-eco-700 peer-checked:bg-eco-700 peer-checked:text-white py-2.25 flex justify-center items-center rounded-pill transition-colors ease-in duration-200">
                                    <span className="text-label font-sans">
                                        {opcion === "cliente" ? "Soy cliente" : "Soy restaurante"}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>

                    {error && <p role="alert" className="text-red-500 text-sm font-sans">{error}</p>}

                    <InputEco
                        id="inputNombre"
                        placeHolder="Tu nombre"
                        Label="Nombre"
                        type="text"
                        functionActivate={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                    />
                    <InputEmail functionActivate={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <InputPassword functionActivate={(e: ChangeEvent<HTMLInputElement>) => setContrasena(e.target.value)} />

                    <label className="flex justify-center items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={aceptaTerminos}
                            onChange={(e) => setAceptaTerminos(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="border-ink border-2 rounded-sm p-2 peer-checked:border-eco-700 peer-checked:bg-eco-700"></div>
                        <span>Acepto términos y condiciones</span>
                    </label>

                    <ButtonPrincipal
                        id="buttonPrincipal"
                        text={cargando ? "Creando cuenta..." : "Crear cuenta"}
                        tamano="w-full"
                        disabled={cargando}
                        functionActivate={()=>{}}
                    />

                    <div className="flex justify-center items-center gap-1 text-label font-sans w-full">
                        <p>¿Ya tenés cuenta?</p>
                        <Link href="/auth/login" className="hover:text-eco-700 border-b-2 border-transparent hover:border-eco-700 transition-colors ease-in-out duration-300">
                            Iniciá sesión
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}