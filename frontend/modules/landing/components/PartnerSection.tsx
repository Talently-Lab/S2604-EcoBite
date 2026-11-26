import Image from "next/image";
import Link from "next/link";
import { buttonStyles } from "@/shared/ui/buttonStyles";
import { IconArrowRight, IconCheck } from "@/shared/ui/icons";
import { landingSections, routes } from "@/shared/config/routes";
import { SectionHeading } from "./SectionHeading";

const benefits = [
  "Llegá a consumidores que eligen con conciencia",
  "Obtené el sello de certificación EcoBite",
  "0% de comisión los primeros 3 meses",
];

export function PartnerSection() {
  return (
    <section
      id={landingSections.partners.id}
      aria-labelledby="partners-title"
      className="mx-auto max-w-295 px-6 pb-24"
    >
      <div className="grid items-stretch overflow-hidden rounded-[26px] bg-forest-2 text-white lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-80">
          <Image
            src="/images/landing/chef.jpg"
            alt="Cocinero emplatando bajo lámparas de calor en una cocina profesional"
            fill
            sizes="(min-width: 1024px) 460px, 100vw"
            className="object-cover object-[50%_35%]"
          />
          <span className="absolute bottom-5 left-5 rotate-[-3deg] rounded-xl bg-cream px-3.5 py-2 text-label text-forest shadow-md">
            Tu cocina, con más futuro.
          </span>
        </div>

        <div className="p-8 sm:p-12 lg:p-14">
          <p className="text-label tracking-wider text-mint uppercase">Para restaurantes</p>
          <div className="mt-3">
            <SectionHeading
              id="partners-title"
              tone="light"
              title="¿Tenés un restaurante?"
              highlight="Crecé sin perder tu identidad."
            />
          </div>
          <p className="mt-5 max-w-115 text-body text-mint-pale/85">
            Sumate a la red de locales que ya entregan en envases compostables y con repartos de
            bajas emisiones. Te acompañamos en la transición.
          </p>
          <ul className="mt-7 grid gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-body">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint text-forest">
                  <IconCheck size={14} strokeWidth={2.4} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href={routes.restaurantPortal} className={buttonStyles.light}>
              Sumar mi restaurante <IconArrowRight size={18} />
            </Link>
            <small className="text-body-small text-mint-pale/70">Sin costo de alta</small>
          </div>
        </div>
      </div>
    </section>
  );
}
