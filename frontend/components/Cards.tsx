import { envaseBiodegradable,entregaSinEmisiones,CO2ahorrado,ecoFriendly} from "./Badges";
import { cardProps } from "@/types/restaurant";

const sustentabilidadBadges: Record<string, React.ComponentType<any>> = {
    "biodegradable": envaseBiodegradable,
    "sinEmisiones":entregaSinEmisiones,
    "ecoFriendly":ecoFriendly,
}


function Card({ id, urlImagen, nombre, apertura, cierre, metaDatos }: cardProps){
    const tieneImagen = urlImagen && urlImagen !== "none";

    
    // LÓGICA DE NEGOCIO LOCAL: Calculada en cada render de forma ultra rápida
    const aperturaMinutos = apertura.split(':').map(Number).reduce((h, m) => h * 60 + m);
    const cierreMinutos = cierre.split(':').map(Number).reduce((h, m) => h * 60 + m);
    
    const ahora = new Date();
    const ahoraMinutos = (ahora.getHours() * 60) + ahora.getMinutes();

    const estaAbierto = cierreMinutos < aperturaMinutos
        ? (ahoraMinutos >= aperturaMinutos || ahoraMinutos <= cierreMinutos)
        : (ahoraMinutos >= aperturaMinutos && ahoraMinutos <= cierreMinutos);

    const ComponentSustentabilidad = sustentabilidadBadges[metaDatos.BadgesSustentabilidad];


 return (
        <article 
            id={id} 
            tabIndex={0} 
            // Clases dinámicas: Si está cerrado, le sumamos opacidad y cursor deshabilitado
            className={`relative w-65 h-min-82.5 border-[1.5px] border-line-soft bg-surface rounded-lg overflow-hidden transition-all duration-300 grid grid-rows-[auto_1fr] focus:outline-none focus:ring-3 focus:ring-eco-700
                ${estaAbierto ? 'shadow-sm hover:border-line hover:shadow-md' : 'opacity-65 cursor-not-allowed shadow-none'}`}
        >
            {/* Sección de la Imagen */}
            <div className="w-full h-44 flex items-end py-2.5 px-3.5 bg-cover bg-center"
            style={{ backgroundImage: tieneImagen ? `url('${urlImagen}')` : "linear-gradient(135deg, var(--color-eco-100), var(--color-olive-cream))" }}>
            {!tieneImagen && <span className="font-display font-bold text-[34px] leading-none text-eco-700">V</span>}
            </div>

            <div className="px-4 pb-4 pt-3.5 grid items-start gap-2">
                <div className="pl-0.5">
                    <h4 className="font-display text-title-3 text-ink">{nombre}</h4>
                    <p className="text-sm text-ink-2">
                        {estaAbierto ? metaDatos.cocina : `Abre a las ${apertura}`}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                    {ComponentSustentabilidad && <ComponentSustentabilidad />}
                    <p className="text-sm pl-0.5 text-ink-2">★ {metaDatos.puntuacion} · {"25-23 min"}</p>
                    <CO2ahorrado ahorrado={metaDatos.BadgesAhorro}/>
                </div>
            </div>
        </article>
    );
}

export default Card;