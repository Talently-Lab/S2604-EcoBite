import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import type { Restaurant } from "@/lib/types";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow focus-within:shadow-md hover:shadow-md">
      <Link href={`/restaurantes/${restaurant.id}`} className="block h-full">
        <SafeImage
          src={restaurant.imagen_url}
          alt=""
          fallbackLabel={restaurant.nombre}
          className="h-40 w-full"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-ink">{restaurant.nombre}</h3>
          {restaurant.direccion && (
            <p className="mt-1 text-base text-muted">{restaurant.direccion}</p>
          )}
          <p className="mt-3 text-base font-semibold text-brand">
            Ver menú<span className="sr-only"> de {restaurant.nombre}</span> →
          </p>
        </div>
      </Link>
    </li>
  );
}
