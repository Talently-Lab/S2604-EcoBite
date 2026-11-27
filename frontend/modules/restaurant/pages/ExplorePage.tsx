"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "@/shared/config/routes";
import { RestaurantsProvider } from "../context/RestaurantsContext";
import { RestaurantList } from "../components/RestaurantList";
import { FilterPanel } from "../components/FilterPanel";
import { sortOptions } from "../lib/filters";
import type { SortOption } from "../types";

export function ExplorePage() {
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4 items-center px-20 w-full max-md:px-5">
      <div className="flex flex-col w-full py-7 md:space-y-2">
        <div className="hidden md:flex text-body">
          <Link href={routes.home} className="hover:text-eco-700">Inicio</Link>
          <p>/</p>
          <Link href={routes.explore} className="hover:text-eco-700">Explorar</Link>
        </div>
        <h1 className="text-title-1 max-md:text-[26px] max-md:whitespace-nowrap font-display">
          Restaurantes eco-friendly
        </h1>
      </div>

      {/* Mobile filters and sorting */}
      <div className="md:hidden flex">
        <div>
          <button className="w-[40%] h-full"></button>
        </div>
        <div className="relative">
          <select
            name="sort"
            id="sortMobile"
            defaultValue=""
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full h-full appearance-none text-body-small font-sans font-bold py-3.5 px-6 rounded-sm text-center border-3 border-ink"
          >
            <option value="" disabled>Ordenar</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-ink">{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex w-full justify-start gap-10">
        <FilterPanel filters={filters} onFiltersChange={setFilters} />

        <div className="w-full h-full flex flex-col items-center justify-center gap-5.5">
          <div className="border-line bg-eco-700 hidden md:flex justify-between w-full px-5 py-3 rounded-md text-white">
            <h3>24 locales</h3>
            <label htmlFor="sort">
              Ordenar:
              <select name="sort" id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-ink">{option.label}</option>
                ))}
              </select>
            </label>
          </div>
          <RestaurantsProvider>
            <RestaurantList filters={filters} sortBy={sortBy} onClearFilters={() => setFilters([])} />
          </RestaurantsProvider>
        </div>
      </div>
    </div>
  );
}
