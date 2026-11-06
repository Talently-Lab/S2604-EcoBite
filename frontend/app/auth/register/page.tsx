"use client"
import { useState, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { InputEco, InputEmail,InputPassword } from "@/components/Inputs"
import { ButtonPrincipal } from "@/components/Button"



export default function Register(){
    const [continuar,setContinuar] = useState(false);
    const [rol, setRol] = useState("cliente");
    const [nombre, setNombre] = useState("");
    const [email, setEmial] = useState("");
    const [contrasena, setCotrasena] = useState("");

    function agregarNombre(e:ChangeEvent<HTMLInputElement>){
        
    }

    function enviarForm(){
        
    }

    return(
        <div className="flex w-full h-[calc(100dvh-235.2px)]">
            <div className="w-1/2">
                <img src="/img/images.jpg" alt="" className="w-full h-full"/>
            </div>
            <form className="flex flex-col items-center justify-center w-1/2 border-l-2 h-full ">
                <div className="flex flex-col gap-3.5 items-start w-[70%]">
                    <h2 className="text-title-2 font-display">Crear cuenta</h2>

                    <div className="w-full flex border-2 border-ink-3  p-1 rounded-pill">
                        <label htmlFor="cliente" className="w-1/2 group cursor-pointer">
                            <input id="cliente" type="radio" name="rol" value="cliente" 
                            checked={rol==="cliente"} 
                            onChange={()=>setRol("cliente")}
                            className="sr-only peer"/>

                            <div className="border-2 border-transparent peer-checked:border-eco-700 peer-checked:bg-eco-700 peer-checked:text-white py-2.25 flex justify-center items-center rounded-pill transition-colors ease-in duration-200">
                                <span className="text-label font-sans ">Soy cliente</span>
                            </div>
                        </label>
                        <label htmlFor="restaurante" className="w-1/2 group cursor-pointer">
                            <input id="restaurante" type="radio" name="rol" value="restaurante" 
                            checked={rol==="restaurante"} 
                            onChange={()=>setRol("restaurante")}
                            className="sr-only peer"/>

                            <div className="border-2 border-transparent peer-checked:border-eco-700 peer-checked:bg-eco-700 peer-checked:text-white py-2.25 flex justify-center items-center rounded-pill transition-colors ease-in duration-200 ">
                                <span className="text-label font-sans ">Soy restaurante</span>
                            </div>
                        </label>
                    </div>

                    <InputEco id="inputNombre" placeHolder="Tu nombre" Label="Nombre" type="text" functionActivate={(e:ChangeEvent<HTMLInputElement>)=> setNombre(e.target.value)}/>
                    <InputEmail functionActivate={(e:ChangeEvent<HTMLInputElement>)=> setEmial(e.target.value)}/>
                    <InputPassword functionActivate={(e:ChangeEvent<HTMLInputElement>)=> setCotrasena(e.target.value)}/>
                    
                    <label className=" flex justify-center items-center gap-2">
                        <input type="checkbox" value="" className="sr-only peer"/>
                        <div className="border-ink border-2 rounded-sm p-2 peer-checked:border-eco-700 peer-checked:bg-eco-700"></div>
                        <span>Acepto término y condiciones</span>
                    </label>
                    
                    <ButtonPrincipal id="buttonPrincipal" text="Crear cuenta" tamano="w-full" functionActivate={()=>setContinuar(true)}/>
                    
                    <div className="flex justify-center items-center gap-1 text-label font-sans w-full">
                        <p>¿Ya tenés cuenta? </p><Link href="/auth/login" className="hover:text-eco-700 border-b-2 border-transparent hover:border-eco-700 transition-colors ease-in-out duration-300" >Iniciá sesión</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}