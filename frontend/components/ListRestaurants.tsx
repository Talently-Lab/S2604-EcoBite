"use client"
import {useEffect, useState} from "react";

import { useFetchRestaurantes } from "@/contexts/restaurantsContext";
import Card from "./Cards";
import { ButtonPrincipal } from "./Button";
import { ecoFriendly } from "./Badges";

interface ListaRestauranteProps {
    filtrarPor?:any[];
    ordenarPor?: string;
    functionActivate: ()=>void;
}

export default function ListaRestaurante({ filtrarPor, ordenarPor,functionActivate }: ListaRestauranteProps) {
    const {restaurants,loading} = useFetchRestaurantes();
    const [restaurantesOrdenados, setRestaurantesOrdenados] = useState<any[]>([]);
    const [paginaActual, setPaginaActual] = useState(1);

    // 1. Función que solo se encarga de saber si un restaurante está abierto AHORA
    function comprobarSiEstaAbierto(aperturaStr: string, cierreStr: string): boolean {
        const ahora = new Date();
        const ahoraMinutos = (ahora.getHours() * 60) + ahora.getMinutes();

        const [hApertura, mApertura] = aperturaStr.split(':').map(Number);
        const [hCierre, mCierre] = cierreStr.split(':').map(Number);

        const apertura = hApertura * 60 + mApertura;
        let cierre = hCierre * 60 + mCierre;

        // Manejo de horarios nocturnos que pasan de las 00:00hs
        if (cierre < apertura) {
            return ahoraMinutos >= apertura || ahoraMinutos <= cierre;
        }

        return ahoraMinutos >= apertura && ahoraMinutos <= cierre;
    }

    useEffect(() => {
        setPaginaActual(1);
        // Si no hay restaurantes cargados aún, salimos temprano
        if (!restaurants || restaurants.length === 0) return;

        let resultado = [...restaurants];

        if (ordenarPor === "nombre") {
            resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }
        else if (ordenarPor === "abierto") {
            resultado.sort((a, b) => {
                const esAbiertoA = comprobarSiEstaAbierto(a.apertura, a.cierre) ? 1 : 0;
                const esAbiertoB = comprobarSiEstaAbierto(b.apertura, b.cierre) ? 1 : 0;
                return esAbiertoB - esAbiertoA;
            });
        }
        else if (ordenarPor === "puntuacion") {
            resultado.sort((a, b) => b.metaDatos.puntuacion - a.metaDatos.puntuacion);
        }

        
        if (filtrarPor?.includes("eco")) {
            resultado = resultado.filter( item => item.metaDatos.BadgesSustentabilidad === "ecoFriendly");
        } else if (filtrarPor?.length && !filtrarPor.includes("todos")) {
        resultado = resultado.filter(item =>
            filtrarPor?.includes(item.metaDatos.cocina) ||
            filtrarPor?.includes(item.metaDatos.tipoEnvase));
    }
        
        // 4. Guardamos la lista ordenada en el estado
        setRestaurantesOrdenados(resultado);

    }, [ordenarPor,filtrarPor, restaurants]);

    const indiceUltimoElemento = paginaActual * 8;
    const indicePrimerElemento = indiceUltimoElemento - 8;
    const localesVisibles = restaurantesOrdenados.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(restaurantesOrdenados.length / 8);

    // Funciones para cambiar de página
    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(prev => prev + 1);
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(prev => prev - 1);
    };

    if (loading) return <div className="w-full min-h-[70vh] flex items-center justify-center cursor-wait"><h2 className="text-title-1 text-ink animate-pulse">Cargando restaurantes...</h2></div>;

    return (
        <>
            {restaurantesOrdenados.length !== 0 ? (
                <>
                    <div className="grid grid-cols-4 grid-rows-2 gap-5.5 w-full">
                        {localesVisibles.map((item) => (
                        <Card key={item.id} id={item.id} urlImagen={item.urlImagen} nombre={item.nombre} dia={item.dia} apertura={item.apertura} cierre={item.cierre}
                        metaDatos={{
                        cocina:item.metaDatos.cocina,
                        BadgesSustentabilidad:item.metaDatos.BadgesSustentabilidad,
                        BadgesAhorro:item.metaDatos.BadgesAhorro,
                        puntuacion:item.metaDatos.puntuacion,
                        tipoEnvase:item.metaDatos.tipoEnvase
                        }} />
                        ))}

                    </div>
                    {totalPaginas > 1 && (
                        <div className="flex items-center gap-4 mt-4">
                            <button
                                onClick={paginaAnterior}
                                disabled={paginaActual === 1}
                                className="px-3 py-1 bg-eco-700 text-white rounded-md text-button hover:bg-eco-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Anterior
                            </button>

                            <span className="text-ink text-body-small">
                                Página {paginaActual} de {totalPaginas}
                            </span>
                            <button
                                onClick={paginaSiguiente}
                                disabled={paginaActual === totalPaginas}
                                className="px-3 py-1 bg-eco-700 text-white rounded-md text-button hover:bg-eco-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-4">
                    <h2 className="text text-title-2">No se encontraron locales con esos filtros</h2>
                    <p>probá quitando algunos filtros</p>
                    <ButtonPrincipal id="eliminarFiltros" text="Limpiar filtros" tamano="w-37" functionActivate={functionActivate}/>
                </div>
            )}
        </>
    )
}