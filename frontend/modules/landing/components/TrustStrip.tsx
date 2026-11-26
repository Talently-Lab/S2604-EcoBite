import { IconCargoBike, IconCo2Down, IconCompostBox, IconStorefront } from "@/shared/ui/icons";
import { trustStats } from "../data/content";

const icons = {
  store: { Icon: IconStorefront, bg: "bg-amber-soft text-terracotta" },
  compost: { Icon: IconCompostBox, bg: "bg-mint-pale text-forest-2" },
  bike: { Icon: IconCargoBike, bg: "bg-teal-bg text-teal-fg" },
  co2: { Icon: IconCo2Down, bg: "bg-co2-bg text-co2-fg" },
};

export function TrustStrip() {
  return (
    <section aria-label="EcoBite en cifras" className="border-y border-line-soft/60 bg-sage">
      <ul className="mx-auto grid max-w-295 gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat) => {
          const { Icon, bg } = icons[stat.icon];
          return (
            <li key={stat.label} className="flex items-start gap-4">
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${bg}`}>
                <Icon size={24} />
              </span>
              <div>
                <p className="font-display text-title-2 leading-tight text-forest">{stat.value}</p>
                <p className="text-label text-forest">{stat.label}</p>
                <p className="mt-0.5 text-body-small text-ink-3">{stat.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
