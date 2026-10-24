"use client"
import {RestaurantProvider} from "@/contexts/restaurantsContext";
import ListaRestaurante from "@/components/ListRestaurants";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { ButtonPrincipal, ButtonSecundario, ButtonTexto } from "@/components/Button";

export default function Explorar(){
    const [OrdenarPor, setOrdenarPor] = useState("nombre"); // Valor por defecto para ordenar
    const [FiltrarPor, setFiltrarPor] = useState<any[]>([]);

    function aplicarFiltros(e:SubmitEvent){
        e.preventDefault()
        console.log(FiltrarPor)
    }

    const manejarCheckbox = (e:ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (FiltrarPor.includes("todos")|| FiltrarPor.includes("eco")) return;

        if (checked) {
        // Si se marca, lo agregamos al array manteniendo lo que ya había
        setFiltrarPor([...FiltrarPor, value]);
        } else {
            // Si se desmarca, lo filtramos para quitarlo del array
            setFiltrarPor(FiltrarPor.filter((item) => item !== value));
        }
    };
    
    return(
        <div className="flex flex-col gap-4 items-center px-20 w-full">
            <div className="flex flex-col w-full py-7 space-y-2">
                <div className="flex text-body">
                    <a href="/" className="hover:text-eco-700" >Inicio</a><p>/</p><a href="/explorar" className="hover:text-eco-700">Explorar</a>
                </div>
                <h1 className="text-title-1 font-display">Restaurantes eco-friendly</h1>
            </div>
            
            <div className="flex w-full justify-start gap-10">

                <form className="flex flex-col border border-line rounded-sm w-55 h-fit p-5" onSubmit={aplicarFiltros}>
                    <h2 className="text-title-3">Filtros</h2>
                    <div className="flex flex-col">
                        {/* <!-- CATEGORÍA 1: Checkboxes (Multi-selección) --> */}
                        <div className="mb-4">
                            <h4 className="text-label text-ink mb-2">Tipo de comida</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("vegana")} 
                                    onChange={manejarCheckbox}
                                    value="vegana"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Vegana</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("vegetariana")} 
                                    onChange={manejarCheckbox}
                                    value="vegetariana"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Vegetariana</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("saludable")} 
                                    onChange={manejarCheckbox}
                                    value="saludable"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Saludable</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("parrilla")} 
                                    onChange={manejarCheckbox}
                                    value="parrilla"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Parrilla</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("pizza")} 
                                    onChange={manejarCheckbox}
                                    value="pizza"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Pizza</span>
                                </label>
                            </div>
                        </div>

                        {/* <!-- CATEGORÍA 2: Checkboxes (Multi-selección) --> */}
                        <div className="mb-4">
                            <h4 className="text-label text-ink mb-2">Tipo de envase</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("biodegradable")} 
                                    onChange={manejarCheckbox}
                                    value="biodegradable"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Biodegradable</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("compostable")} 
                                    onChange={manejarCheckbox}
                                    value="compostable"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Compostable</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" 
                                    checked={FiltrarPor.includes("reutilizable")} 
                                    onChange={manejarCheckbox}
                                    value="reutilizable"/>
                                    <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
                                    <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">Reutilizable</span>
                                </label>
                                
                            </div>
                        </div>

                        {/* <!-- CATEGORÍA 3: Radios (Selección ÚNICA usando mismo 'name') --> */}
                        <div className="mb-5">
                            <h4 className="text-label text-ink mb-2">Sello de sustentabilidad</h4>
                            <div className="space-y-2">
                            {/* <!-- Opción Todos --> */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="radio" name="sello" className="sr-only peer"
                                onChange={()=>setFiltrarPor(["todos"])} 
                                checked={FiltrarPor.includes("todos")} 
                                value="todos"/>
                                <div className="w-5 h-5 border-2 border-line rounded-full flex items-center justify-center peer-checked:border-line peer-checked:p-2 peer-checked:bg-eco-700 transition-colors">
                                    <div className="w-2.5 h-2.5 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                </div>
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Todos</span>
                            </label>

                            {/* <!-- Opción Eco --> */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="radio" name="sello" className="sr-only peer" 
                                onChange={()=>setFiltrarPor(["eco"])} 
                                checked={FiltrarPor.includes("eco")} 
                                value="eco"/>
                                <div className="w-5 h-5 border-2 border-line rounded-full flex items-center justify-center peer-checked:border-lines peer-checked:bg-eco-700 transition-colors">
                                    <div className="w-2.5 h-2.5 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                </div>
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Con sello eco</span>
                            </label>
                            </div>
                        </div>
                        <div className="w-full space-y-2">
                            <ButtonPrincipal id="buttonPrincipal" text="Aplicar filtros" tamano="w-full" functionActivate={()=>{}}/>
                            <ButtonTexto id="buttonSecundario" text="Limpiar filtros" tamano="w-full" functionActivate={() => setFiltrarPor([])}/>
                        </div>
                    </div>

                </form>
                <div className="w-full h-full flex flex-col items-center justify-center gap-5.5">
                    <div className="border-line bg-eco-700 flex justify-between w-full px-5 py-3 rounded-md text-white ">
                        <h3>24 locales</h3>
                        <label htmlFor="ordenador">
                            Ordenar:
                            <select name="ordenador" id="ordenador" onChange={(e) => setOrdenarPor(e.target.value)}>
                                <option value="nombre" className="text-ink">Nombre</option>
                                <option value="abierto" className="text-ink">Abierto</option>
                                <option value="puntuacion" className="text-ink">Mejor Puntuación</option>
                            </select>
                        </label>
                        
                    </div>
                    <RestaurantProvider>
                        <ListaRestaurante filtrarPor={FiltrarPor} ordenarPor={OrdenarPor} functionActivate={() => setFiltrarPor([])} />
                    </RestaurantProvider>
                </div>
            </div> 
        </ div>
    )
}