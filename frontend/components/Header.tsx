"use client"
import { useState } from "react";
import { ButtonPrincipal, ButtonSecundario} from "./Button";


function Headers(){
    const [usuarioActivo,setUsuarioActivo] = useState(false);

    function cambiarActivo(){
      const button = document.getElementById("danger") as HTMLButtonElement;
      const disbutt = button.disabled
      console.log(disbutt)
      button.disabled = !disbutt;
    }



    return(
    <header className="flex h-20 w-full items-center gap-10 border-b-[1.5px] border-line px-15 font-sans text-label">
      <a
        href="/"
        className="inline-flex h-9 w-29.5 shrink-0 items-center justify-center rounded-sm border-[1.5px] border-ink"
      >
        Logo ecoBite
      </a>

      <nav className="shrink-0 pl-32.5">
        <ul className="flex items-center gap-8 text-body-small font-bold">
          <li><a href="/explorar">Explorar</a></li>
          <li><a href="">Impacto</a></li>
          <li className="shrink-0">
            <a
              href="/portalRestaurante"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-pill border-[1.5px] border-ink px-4.5"
            >
              Portal Restaurante
            </a>
          </li>
        </ul>
      </nav>

      <div className="ml-auto flex shrink-0 gap-4">
        {usuarioActivo === false && (
          <>
            <ButtonSecundario text="Iniciar sesión" tamano="w-35.5" id="buttonOne" functionActivate={cambiarActivo}/>
            <ButtonPrincipal text="Registrarme" tamano="w-35.5 " id="buttonTwo" functionActivate={cambiarActivo}/>
          </>
        )}
        {usuarioActivo === true && <button className="font-semibold">Mi perfil</button>}
      </div>
    </header>
    )
}

export default Headers;