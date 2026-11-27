"use client";

import { useState } from "react";
import { PrimaryButton } from "@/shared/ui/Button";
import { useRestaurants } from "../context/RestaurantsContext";
import { isOpenNow } from "../lib/openingHours";
import { ALL_FILTER, ECO_SEAL_FILTER } from "../lib/filters";
import type { Restaurant, SortOption } from "../types";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantCardSkeleton } from "./RestaurantCardSkeleton";

const PAGE_SIZE = 8;

type RestaurantListProps = {
  filters?: string[];
  sortBy?: SortOption;
  onClearFilters: () => void;
};

/** Sorts and filters the restaurant list (pure: derived during render, no effect needed). */
function sortAndFilter(restaurants: Restaurant[], sortBy?: SortOption, filters?: string[]): Restaurant[] {
  let result = [...restaurants];

  if (sortBy === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "open") {
    result.sort((a, b) => {
      const isOpenA = isOpenNow(a.openingTime, a.closingTime) ? 1 : 0;
      const isOpenB = isOpenNow(b.openingTime, b.closingTime) ? 1 : 0;
      return isOpenB - isOpenA;
    });
  } else if (sortBy === "rating") {
    result.sort((a, b) => b.metadata.rating - a.metadata.rating);
  }

  if (filters?.includes(ECO_SEAL_FILTER)) {
    result = result.filter((item) => item.metadata.sustainabilityBadge === "ecoFriendly");
  } else if (filters?.length && !filters.includes(ALL_FILTER)) {
    result = result.filter(
      (item) => filters.includes(item.metadata.cuisine) || filters.includes(item.metadata.packagingType),
    );
  }

  return result;
}

export function RestaurantList({ filters, sortBy, onClearFilters }: RestaurantListProps) {
  const { restaurants, loading } = useRestaurants();
  const [currentPage, setCurrentPage] = useState(1);

  // Go back to page 1 whenever the inputs change (adjusting state during render, not in an effect).
  const [previousInputs, setPreviousInputs] = useState({ restaurants, sortBy, filters });
  if (
    previousInputs.restaurants !== restaurants ||
    previousInputs.sortBy !== sortBy ||
    previousInputs.filters !== filters
  ) {
    setPreviousInputs({ restaurants, sortBy, filters });
    setCurrentPage(1);
  }

  const sortedRestaurants = sortAndFilter(restaurants ?? [], sortBy, filters);

  const lastIndex = currentPage * PAGE_SIZE;
  const visibleRestaurants = sortedRestaurants.slice(lastIndex - PAGE_SIZE, lastIndex);
  const totalPages = Math.ceil(sortedRestaurants.length / PAGE_SIZE);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((page) => page - 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center md:grid md:grid-cols-4 md:grid-rows-2 gap-5.5 w-full">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (sortedRestaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-4">
        <h2 className="text text-title-2 max-md:text-[18px] text-center">
          No se encontraron locales con esos filtros
        </h2>
        <p className="text-label text-ink-3 max-md:text-[14px]">probá quitando algunos filtros</p>
        <PrimaryButton id="clearFilters" text="Limpiar filtros" disabled={loading} className="w-37" onClick={onClearFilters} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center md:grid md:grid-cols-4 md:grid-rows-2 gap-5.5 w-full">
        {visibleRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="hidden md:flex items-center gap-4 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-eco-700 text-white rounded-md text-button hover:bg-eco-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <span className="text-ink text-body-small">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-eco-700 text-white rounded-md text-button hover:bg-eco-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}
