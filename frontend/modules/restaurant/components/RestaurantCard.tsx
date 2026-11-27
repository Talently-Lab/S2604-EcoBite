import type { Restaurant } from "../types";
import { isOpenNow } from "../lib/openingHours";
import { Co2SavedBadge, sustainabilityBadges } from "./SustainabilityBadges";

export function RestaurantCard({ id, imageUrl, name, openingTime, closingTime, metadata }: Restaurant) {
  const hasImage = imageUrl && imageUrl !== "none";
  const isOpen = isOpenNow(openingTime, closingTime);
  const SustainabilityBadge = sustainabilityBadges[metadata.sustainabilityBadge];

  return (
    <article
      id={id}
      tabIndex={0}
      // Closed restaurants are dimmed and not clickable.
      className={`relative w-65 h-min-82.5 border-[1.5px] border-line-soft bg-surface rounded-lg overflow-hidden transition-all duration-300 grid grid-rows-[auto_1fr] focus:outline-none focus:ring-3 focus:ring-eco-700
                ${isOpen ? "shadow-sm hover:border-line hover:shadow-md" : "opacity-65 cursor-not-allowed shadow-none"}`}
    >
      <div
        className="w-full h-44 flex items-end py-2.5 px-3.5 bg-cover bg-center"
        style={{
          backgroundImage: hasImage
            ? `url('${imageUrl}')`
            : "linear-gradient(135deg, var(--color-eco-100), var(--color-olive-cream))",
        }}
      >
        {!hasImage && <span className="font-display font-bold text-[34px] leading-none text-eco-700">V</span>}
      </div>

      <div className="px-4 pb-4 pt-3.5 grid items-start gap-2">
        <div className="pl-0.5">
          <h4 className="font-display text-title-3 text-ink">{name}</h4>
          <p className="text-sm text-ink-2">
            {isOpen ? `cierra a las ${closingTime}` : `Abre a las ${openingTime}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {SustainabilityBadge && <SustainabilityBadge />}
          <p className="text-sm pl-0.5 text-ink-2">★ {metadata.rating} </p>
          <Co2SavedBadge grams={metadata.co2Saved} />
        </div>
      </div>
    </article>
  );
}
