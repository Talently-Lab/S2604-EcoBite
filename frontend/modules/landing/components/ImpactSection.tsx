import Link from "next/link";
import { buttonStyles } from "@/shared/ui/buttonStyles";
import { IconArrowRight } from "@/shared/ui/icons";
import { landingSections } from "@/shared/config/routes";
import { communityImpact } from "../data/content";
import { ImpactEstimator } from "./ImpactEstimator";
import { SectionHeading } from "./SectionHeading";

export function ImpactSection() {
  return (
    <section
      id={landingSections.impact.id}
      aria-labelledby="impacto-title"
      className="relative overflow-hidden bg-forest py-24 text-white"
    >
      {/* Decorative rings */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-72 -left-44 size-125 rounded-full border border-white/8" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-96 size-125 rounded-full border border-white/8" />

      <div className="relative mx-auto grid max-w-295 items-center gap-16 px-6 lg:grid-cols-[1fr_0.86fr] lg:gap-24">
        <div>
          <SectionHeading
            id="impacto-title"
            tone="light"
            title="Pedir acá"
            highlight="multiplica el impacto."
          />
          <p className="mt-5 max-w-105 text-body text-mint-pale/80">
            Cada pedido con envase compostable y entrega de bajas emisiones suma a un cambio
            colectivo. Este es el impacto estimado de la comunidad EcoBite.
          </p>

          <dl className="mt-9 grid max-w-120 grid-cols-2 gap-x-10 gap-y-7">
            {communityImpact.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block font-display text-title-1 text-mint">{item.value}</span>
                  <span className="mt-1 block text-body-small text-mint-pale/75">{item.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <Link href={landingSections.restaurants.href} className={`${buttonStyles.light} mt-10`}>
            Sumar mi próximo pedido <IconArrowRight size={18} />
          </Link>
          <p className="mt-4 text-footer font-normal text-mint-pale/55">
            Estimaciones ilustrativas del piloto EcoBite; el ahorro varía según cada pedido.
          </p>
        </div>

        <ImpactEstimator />
      </div>
    </section>
  );
}
