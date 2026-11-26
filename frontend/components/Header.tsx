"use client"
import { useState } from "react";
import Link from "next/link";
import { ButtonPrincipal, ButtonSecundario} from "./Button";
import { useRouter } from "next/navigation";



function Headers(){
    const [usuarioActivo] = useState(false);
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const router = useRouter();

    const redirectLogin = () => router.push('/auth/login');
    const redirectRegister = () => router.push('/auth/register');



    return(
    <header className="relative flex h-20 min-w-full items-center gap-10 border-b-[1.5px] border-line md:px-15 px-4 font-sans text-label max-md:justify-between">

        <Link href="/" className="inline-flex h-9 w-29.5 shrink-0 items-center justify-center rounded-sm border-[1.5px] border-ink">
            Logo ecoBite
        </Link>

        <nav className="max-md:hidden shrink-0 pl-32.5">
            <ul className="flex items-center gap-8 text-body-small font-bold">
                <li>
                    <Link href="/explorar">Explorar</Link>
                </li>
                <li>
                    <Link href="">Impacto</Link>
                </li>
                <li className="shrink-0">
                    <Link href="/portalRestaurante" className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-pill border-[1.5px] border-ink px-4.5">Portal Restaurante</Link>
                </li>
            </ul>
        </nav>

        <nav className="max-md:block ">
            {/* menu de hamburguesa */}

            <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="z-50 shrink-0 rounded-md p-2 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-700 md:hidden"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
            >
                {isMenuOpen ? (
                    <svg
                        className="h-6 w-6 stroke-current text-ink"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-6 w-6 stroke-current text-ink"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}
            </button>
        </nav> 
        {/* menu despregable mobile */}
        {isMenuOpen && (
            <div className="absolute left-0 top-full z-40 flex w-full flex-col gap-4 border-b border-line bg-white p-5 shadow-lg animate-fade-in-down md:hidden">
                <nav className="shrink-0">
                    <ul className="flex flex-col gap-3 text-body-small font-bold">
                        <li>
                            <Link href="/explorar" className="block border-b border-ink-3 py-2">Explorar</Link>
                        </li>
                        <li>
                            <Link href="" className="block border-b border-ink-3 py-2">Impacto</Link>
                        </li>
                        <li className="shrink-0">
                            <Link href="/portalRestaurante" className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-sm border-[1.5px] border-ink">Portal Restaurante</Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex flex-col gap-4 border-t-ink-3 pt-4">
                    {usuarioActivo === false && (
                        <>
                            <ButtonSecundario text="Iniciar sesión" tamano="w-full" id="buttonOneMobile" functionActivate={redirectLogin}/>
                            <ButtonPrincipal text="Registrarme" tamano="w-full " id="buttonTwoMobile" functionActivate={redirectRegister}/>
                        </>
                    )}
                    {usuarioActivo === true && <button className="font-semibold">Mi perfil</button>}
                </div>
            </div>
        )}
        
    
        <div className="ml-auto flex shrink-0 gap-4 max-md:hidden">
            {usuarioActivo === false && (
            <>
            
                <ButtonSecundario text="Iniciar sesión" tamano="w-35.5" id="buttonOne" functionActivate={redirectLogin}/>
                <ButtonPrincipal text="Registrarme" tamano="w-35.5 " id="buttonTwo" functionActivate={redirectRegister}/>
            </>
            )}
            {usuarioActivo === true && <button className="font-semibold">Mi perfil</button>}
        </div>

    </header>
    )
}

export default Headers;