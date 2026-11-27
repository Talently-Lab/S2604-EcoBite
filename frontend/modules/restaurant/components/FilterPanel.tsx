"use client";

import type { ChangeEvent, FormEvent } from "react";
import { PrimaryButton, TextButton } from "@/shared/ui/Button";
import { cuisineOptions, packagingOptions, sealOptions } from "../lib/filters";

type FilterPanelProps = {
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
};

type CheckboxGroupProps = {
  title: string;
  options: { value: string; label: string }[];
  filters: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function CheckboxGroup({ title, options, filters, onChange }: CheckboxGroupProps) {
  return (
    <div className="mb-4">
      <h4 className="text-label text-ink mb-2">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={filters.includes(option.value)}
              onChange={onChange}
              value={option.value}
            />
            <div className="w-5 h-5 border-2 border-line rounded flex items-center justify-center peer-checked:bg-eco-700 peer-checked:border-eco-700 peer-checked:p-1 transition-colors"></div>
            <span className="text-body-small text-ink-2 group-hover:text-ink transition-colors">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: send the filters to the backend once the endpoint supports them.
  }

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    // An exclusive seal filter is active: checkboxes are locked until filters are cleared.
    if (sealOptions.some((seal) => filters.includes(seal.value))) return;

    onFiltersChange(checked ? [...filters, value] : filters.filter((item) => item !== value));
  };

  return (
    <form className="hidden md:flex flex-col border border-line rounded-sm w-55 h-fit p-5" onSubmit={applyFilters}>
      <h2 className="text-title-3">Filtros</h2>
      <div className="flex flex-col">
        <CheckboxGroup title="Tipo de comida" options={cuisineOptions} filters={filters} onChange={handleCheckbox} />
        <CheckboxGroup title="Tipo de envase" options={packagingOptions} filters={filters} onChange={handleCheckbox} />

        {/* Single choice: picking a seal replaces the other filters. */}
        <div className="mb-5">
          <h4 className="text-label text-ink mb-2">Sello de sustentabilidad</h4>
          <div className="space-y-2">
            {sealOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="seal"
                  className="sr-only peer"
                  onChange={() => onFiltersChange([option.value])}
                  checked={filters.includes(option.value)}
                  value={option.value}
                />
                <div className="w-5 h-5 border-2 border-line rounded-full flex items-center justify-center peer-checked:bg-eco-700 transition-colors">
                  <div className="w-2.5 h-2.5 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full space-y-2">
          <PrimaryButton id="applyFilters" type="submit" text="Aplicar filtros" className="w-full" />
          <TextButton id="clearFiltersPanel" type="button" text="Limpiar filtros" className="w-full" onClick={() => onFiltersChange([])} />
        </div>
      </div>
    </form>
  );
}
