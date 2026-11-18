"use client";

import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { EmptyState, ErrorState, LoadingState } from "@/components/StatusMessages";
import { formatPrice } from "@/lib/format";
import { normalizeMenu, type MenuResponse, type Product, type Restaurant } from "@/lib/types";
import { useApi } from "@/lib/useApi";

function MenuItem({ product }: { product: Product }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
      <SafeImage
        src={product.imagen_url}
        alt=""
        fallbackLabel={product.nombre}
        className="h-24 w-24 shrink-0 rounded-xl"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-semibold text-ink">{product.nombre}</h3>
        {product.descripcion && (
          <p className="mt-1 text-base text-muted">{product.descripcion}</p>
        )}
        <p className="mt-auto pt-2 text-lg font-bold text-brand">
          {formatPrice(product.precio)}
        </p>
      </div>
    </li>
  );
}

function Menu({ id }: { id: string }) {
  const { state, retry } = useApi<MenuResponse>(`/restaurants/${id}/menu`);

  if (state.status === "loading") return <LoadingState label="Cargando el menú…" />;
  if (state.status === "error") return <ErrorState message={state.message} onRetry={retry} />;

  const menu = normalizeMenu(state.data);
  if (menu.length === 0) {
    return (
      <EmptyState title="Este restaurante todavía no tiene platos disponibles">
        Volvé a mirar más tarde.
      </EmptyState>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {menu.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export function RestaurantDetail({ id }: { id: string }) {
  const { state, retry } = useApi<Restaurant>(`/restaurants/${id}`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/" className="inline-flex min-h-11 items-center text-base font-semibold text-brand hover:underline">
        ← Volver a los restaurantes
      </Link>

      {state.status === "loading" && <LoadingState label="Cargando el restaurante…" />}

      {state.status === "error" && (
        <div className="mt-4">
          <ErrorState message={state.message} onRetry={retry} />
        </div>
      )}

      {state.status === "success" && (
        <>
          <header className="mt-4 flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface sm:flex-row">
            <SafeImage
              src={state.data.imagen_url}
              alt=""
              fallbackLabel={state.data.nombre}
              className="h-48 w-full sm:h-auto sm:w-64"
            />
            <div className="p-5">
              <h1 className="text-3xl font-bold tracking-tight text-ink">{state.data.nombre}</h1>
              {state.data.direccion && (
                <p className="mt-2 text-base text-muted">{state.data.direccion}</p>
              )}
              {state.data.descripcion && (
                <p className="mt-3 text-base text-ink">{state.data.descripcion}</p>
              )}
            </div>
          </header>

          <section className="mt-8" aria-labelledby="menu-titulo">
            <h2 id="menu-titulo" className="mb-4 text-2xl font-bold text-ink">
              Menú
            </h2>
            <Menu id={id} />
          </section>
        </>
      )}
    </div>
  );
}
