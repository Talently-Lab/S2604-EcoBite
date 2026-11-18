"use client";

import { useMemo, useState } from "react";
import { RestaurantCard } from "@/components/RestaurantCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/StatusMessages";
import { inputClass } from "@/components/ui";
import { useApi } from "@/lib/useApi";
import type { Restaurant } from "@/lib/types";

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function RestaurantList() {
  const { state, retry } = useApi<Restaurant[]>("/restaurants");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (state.status !== "success") return [];
    const term = normalize(query.trim());
    if (!term) return state.data;
    return state.data.filter((restaurant) =>
      normalize(`${restaurant.nombre} ${restaurant.direccion ?? ""}`).includes(term),
    );
  }, [state, query]);

  if (state.status === "loading") return <LoadingState label="Cargando restaurantes…" />;
  if (state.status === "error") return <ErrorState message={state.message} onRetry={retry} />;

  if (state.data.length === 0) {
    return (
      <EmptyState title="Todavía no hay restaurantes cargados">
        Volvé a pasar en un rato: pronto vas a ver opciones cerca tuyo.
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-md">
        <label htmlFor="buscar" className="text-base font-semibold text-ink">
          Buscar por nombre o zona
        </label>
        <input
          id="buscar"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ej: pizzería, Centro…"
          className={`${inputClass} mt-1.5`}
        />
      </div>

      <p role="status" className="text-base text-muted">
        {filtered.length === 1 ? "1 restaurante" : `${filtered.length} restaurantes`}
      </p>

      {filtered.length === 0 ? (
        <EmptyState title="No encontramos restaurantes con esa búsqueda">
          Probá con otra palabra o borrá el filtro.
        </EmptyState>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </ul>
      )}
    </div>
  );
}
