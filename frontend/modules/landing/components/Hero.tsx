import Image from "next/image";
import Link from "next/link";
import { buttonStyles } from "@/shared/ui/buttonStyles";
import { IconArrowRight, IconCo2Down } from "@/shared/ui/icons";
import { landingSections } from "@/shared/config/routes";
import { CO2_PER_ORDER_GRAMS } from "../data/content";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-295 items-center gap-14 px-6 pt-14 pb-20 lg:min-h-160 lg:grid-cols-[1.02fr_0.98fr] lg:pt-18">
      <div>
        <h1 className="font-display text-[clamp(2.6rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-forest">
          Comé rico.
          <br />
          Elegí mejor.
          <span className="mt-3 block text-[0.62em] leading-tight font-bold tracking-tight text-terracotta">
            Tu próxima cena puede ser parte de la solución.
          </span>
        </h1>
        <p className="mt-6 max-w-133 text-body-large text-ink-2">
          Conectamos restaurantes de tu barrio con vos usando envases compostables y entregas
          en bici o vehículos eléctricos. En cada pedido ves cuánto CO₂ evitaste.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={landingSections.restaurants.href} className={buttonStyles.primary}>
            Descubrir restaurantes
            <IconArrowRight size={18} />
          </Link>
          <Link href={landingSections.impact.href} className={buttonStyles.quiet}>
            Conocer nuestro impacto
          </Link>
        </div>
      </div>

      <div className="relative mx-auto h-105 w-full max-w-130 sm:h-122">
        {/* Main photo with arch shape */}
        <div className="absolute inset-x-6 top-2 bottom-7 rotate-2 overflow-hidden rounded-t-[190px] rounded-b-[34px] bg-sage shadow-[0_18px_55px_rgba(23,64,51,0.14)]">
          <Image
            src="/images/landing/hero-bowl.jpg"
            alt="Bowl de vegetales frescos servido en un envase de cartón"
            fill
            priority
            sizes="(min-width: 1024px) 520px, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-forest/45 to-transparent" />
        </div>

        <LeafDoodle className="absolute -top-2 left-0 w-16 text-leaf" />

        {/* Compostable stamp */}
        <div className="absolute top-14 -right-1 grid size-24 -rotate-12 place-items-center rounded-full border-2 border-dashed border-forest/30 bg-cream text-center shadow-md sm:right-0">
          <div>
            <b className="block font-display text-title-3 leading-none text-forest">100%</b>
            <small className="text-[11px] font-semibold text-forest-2">compostable</small>
          </div>
        </div>

        {/* Impact card */}
        <div className="absolute bottom-12 left-0 flex max-w-72 items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-[0_12px_36px_rgba(22,58,40,0.16)]">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint-pale text-forest-2">
            <IconCo2Down size={24} />
          </span>
          <p className="text-body-small text-ink-2">
            <strong className="block font-semibold text-forest">Cada pedido cuenta</strong>
            En promedio evitás <b className="text-forest-2">{CO2_PER_ORDER_GRAMS} g de CO₂</b>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Hand-drawn sprig, decorative. */
function LeafDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M8 58C18 40 28 26 52 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 38c-6-1-10-6-10-13 7 0 11 5 10 13Z" fill="currentColor" opacity=".85" />
      <path d="M33 25c0-7 4-12 12-13 0 7-4 12-12 13Z" fill="currentColor" />
      <path d="M30 31c6 2 12 0 16-6-7-3-13-1-16 6Z" fill="currentColor" opacity=".6" />
    </svg>
  );
}
