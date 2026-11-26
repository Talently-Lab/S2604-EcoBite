import Link from "next/link";
import { IconArrowRight, IconPin } from "@/shared/ui/icons";
import { landingSections, routes } from "@/shared/config/routes";
import { neighborhoodColors, pilotNeighborhoods } from "../data/content";
import { SectionHeading } from "./SectionHeading";

export function PilotZone() {
  return (
    <section
      id={landingSections.pilotZone.id}
      aria-labelledby="zona-piloto-title"
      className="mx-auto max-w-295 px-6 pb-24"
    >
      <div className="grid items-center gap-10 rounded-[26px] bg-sage p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:p-14">
        <div>
          <p className="inline-flex items-center gap-2 text-label text-forest-2">
            <IconPin size={18} /> Buenos Aires, Argentina
          </p>
          <div className="mt-3">
            <SectionHeading id="zona-piloto-title" title="Empezamos por" highlight="tres barrios." />
          </div>
          <p className="mt-5 max-w-110 text-body text-ink-2">
            El piloto de EcoBite funciona en Belgrano, Palermo y Recoleta: distancias cortas que
            se pueden recorrer en bici y una red de locales que ya trabajan con envases compostables.
          </p>
          <p className="mt-6 text-body-small text-ink-2">
            ¿Vivís en otro barrio? Creá tu cuenta y te avisamos cuando lleguemos.{" "}
            <Link
              href={routes.register}
              className="inline-flex items-center gap-1 font-semibold text-terracotta hover:text-terracotta-700"
            >
              Crear cuenta <IconArrowRight size={16} />
            </Link>
          </p>
        </div>

        <ul className="grid gap-3">
          {pilotNeighborhoods.map((barrio) => (
            <li key={barrio.id} className="flex items-start gap-4 rounded-2xl bg-white p-5">
              <span
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 rounded-full border-2"
                style={{
                  backgroundColor: neighborhoodColors[barrio.id].fill,
                  borderColor: neighborhoodColors[barrio.id].stroke,
                }}
              />
              <div>
                <h3 className="text-body font-bold text-forest">{barrio.name}</h3>
                <p className="text-body-small text-ink-3">{barrio.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
