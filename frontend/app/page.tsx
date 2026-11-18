"use client"
import { EntadoEnPreparacion, EstadoCancelado, EstadoEntregado, EstadoListo, EstadoPendiente } from "@/components/Badges";
import { RestaurantProvider } from "@/contexts/restaurantsContext";
import Card from "@/components/Cards";





export default function Home() {

  
  return (
    <div>
      <EstadoPendiente id="idPendiente"/>
      <EstadoCancelado id="idTwo"/>
      <EstadoEntregado id="idTres"/>
      <EntadoEnPreparacion id="idCuatro"/>
      <EstadoListo id="idCinco"/>
      
    </div>
  );
}
