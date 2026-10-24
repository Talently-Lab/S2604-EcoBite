import { spawn } from "child_process";

export interface badgesProps {
    id: string,
}

const btn = `font-sans text-footer rounded-pill inline-flex items-center pl-2 pr-2.5 py-1 gap-1.5`;

export function EstadoPendiente({id}:badgesProps){
    return(
        <span className={`${btn} bg-warn-bg text-warn-fg`} >
            Pendiente
        </span>
    )
}

export function EntadoEnPreparacion({id}:badgesProps){
    return(
        <span className={`${btn} bg-co2-bg text-co2-fg`}>
            En preparación
        </span>
    )
}

export function EstadoListo({id}:badgesProps){
    return(
        <span className={`${btn} bg-teal-bg text-teal-fg`}>
            Listo
        </span>
    )
}

export function EstadoEntregado({id}:badgesProps){
    return (
        <span className={`${btn} bg-eco-700 text-white`}>
            Entregado
        </span>
    )
}

export function EstadoCancelado({id}:badgesProps){
    return(
        <span className={`${btn} bg-danger-bg text-danger`}>
            Cancelado
        </span>
    )
}


//sustentabilidad 

export function envaseBiodegradable(){
    return(
        <div className={`${btn} text-eco-fg bg-eco-bg`}>
            <svg className="w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 13c0-6 3-9 10-9 0 7-3 10-9 10"></path><path d="M3 13l6-6"></path></svg>
            Envase 100% biodegradable
        </div>
    )
}

export function entregaSinEmisiones(){
    return (
        <div className={`${btn} text-co2-fg bg-co2-bg `}>
            <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="4" cy="11.5" r="2.5"></circle><circle cx="12" cy="11.5" r="2.5"></circle><path d="M4 11.5l3-6h3l2 6M7 5.5h-1.5"></path></svg>
            Entrega sin emisiones
        </div>
    )
}

export function ecoFriendly(){
    return(
        <div className={`${btn} text-olive-800 bg-olive-cream `}>
            Local eco-friendly
        </div>
    )
}

export function CO2ahorrado({ahorrado}:{ahorrado:string}){
    return(
        <div className={`${btn} text-teal-fg bg-teal-bg `}>
            <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 13c0-6 3-9 10-9 0 7-3 10-9 10" /><path d="M3 13l6-6" /></svg>
            CO₂ ahorrado: {ahorrado}g
        </div>
    )// va a cambiar segun los datos
}