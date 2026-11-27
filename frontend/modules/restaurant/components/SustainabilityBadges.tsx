import type { ComponentType } from "react";

const badge = "font-sans text-footer rounded-pill inline-flex items-center pl-2 pr-2.5 py-1 gap-1.5";

export function BiodegradablePackagingBadge() {
  return (
    <div className={`${badge} text-eco-fg bg-eco-bg`}>
      <svg className="w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 13c0-6 3-9 10-9 0 7-3 10-9 10"></path><path d="M3 13l6-6"></path></svg>
      Envase 100% biodegradable
    </div>
  );
}

export function ZeroEmissionDeliveryBadge() {
  return (
    <div className={`${badge} text-co2-fg bg-co2-bg`}>
      <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="4" cy="11.5" r="2.5"></circle><circle cx="12" cy="11.5" r="2.5"></circle><path d="M4 11.5l3-6h3l2 6M7 5.5h-1.5"></path></svg>
      Entrega sin emisiones
    </div>
  );
}

export function EcoFriendlyBadge() {
  return <div className={`${badge} text-olive-800 bg-olive-cream`}>Local eco-friendly</div>;
}

// TODO: the value will come from the order/restaurant data.
export function Co2SavedBadge({ grams }: { grams: string }) {
  return (
    <div className={`${badge} text-teal-fg bg-teal-bg`}>
      <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 13c0-6 3-9 10-9 0 7-3 10-9 10" /><path d="M3 13l6-6" /></svg>
      CO₂ ahorrado: {grams}g
    </div>
  );
}

/** Badge per `sustainabilityBadge` value sent by the backend. */
export const sustainabilityBadges: Record<string, ComponentType> = {
  biodegradable: BiodegradablePackagingBadge,
  sinEmisiones: ZeroEmissionDeliveryBadge,
  ecoFriendly: EcoFriendlyBadge,
};
