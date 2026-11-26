"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconCargoBike, IconClock, IconLeaf } from "@/shared/ui/icons";
import { landingSections, routes } from "@/shared/config/routes";
import {
  featuredRestaurants,
  restaurantFilters,
  type FeaturedRestaurant,
  type RestaurantTag,
} from "../data/content";
import { SectionHeading } from "./SectionHeading";

export function FeaturedRestaurants() {
  const [filter, setFilter] = useState<RestaurantTag | "all">("all");
  const visible =
    filter === "all" ? featuredRestaurants : featuredRestaurants.filter((r) => r.tags.includes(filter));

  return (
    <section
      id={landingSections.restaurants.id}
      aria-labelledby="restaurantes-title"
      className="mx-auto max-w-295 px-6 py-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading id="restaurantes-title" title="Tu próximo favorito" highlight="está más cerca." />
        <Link
          href={routes.explore}
          className="inline-flex items-center gap-2 font-semibold text-terracotta hover:text-terracotta-700"
        >
          Ver todos los locales <IconArrowRight size={18} />
        </Link>
      </div>

      <div role="group" aria-label="Filtrar restaurantes" className="mt-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-body-small font-semibold text-ink-3">Descubrí por:</span>
        {restaurantFilters.map((option) => {
          const active = option.value === filter;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={`rounded-pill border px-4 py-2 text-body-small font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-focus ${
                active
                  ? "border-forest-2 bg-mint-pale text-forest"
                  : "border-line-soft bg-white text-ink-2 hover:border-forest-2 hover:text-forest"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((restaurant) => (
          <li key={restaurant.slug}>
            <RestaurantCard restaurant={restaurant} />
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center text-body-small text-ink-3">
        Estamos sumando nuevos sabores cada semana.
      </p>
    </section>
  );
}

function RestaurantCard({ restaurant }: { restaurant: FeaturedRestaurant }) {
  return (
    <article className="group h-full overflow-hidden rounded-[18px] border border-line-soft/60 bg-white shadow-[0_6px_20px_rgba(35,58,41,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(35,58,41,0.11)]">
      <div className="relative h-52 overflow-hidden bg-sage">
        <Image
          src={restaurant.image}
          alt={restaurant.imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-[11px] font-bold tracking-wide text-forest-2 uppercase shadow-sm">
          <IconLeaf size={14} /> Certificado EcoBite
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-title-3 text-forest">{restaurant.name}</h3>
        <p className="text-body-small text-ink-3">
          {restaurant.cuisine} · {restaurant.neighborhood}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-body-small text-ink-2">
          <span className="inline-flex items-center gap-1.5">
            <IconClock size={16} /> {restaurant.deliveryTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-forest-2">
            <IconCargoBike size={16} /> {restaurant.delivery}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line-soft/60 pt-4">
          <span className="rounded-md bg-mint-pale px-2.5 py-1.5 text-label text-forest-2">
            −{restaurant.co2SavedGrams} g CO₂ / pedido
          </span>
          <Link
            href={routes.explore}
            className="inline-flex items-center gap-1 text-label text-terracotta hover:text-terracotta-700"
            aria-label={`Ver menú de ${restaurant.name}`}
          >
            Ver menú <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
