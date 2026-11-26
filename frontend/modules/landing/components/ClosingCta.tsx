import Link from "next/link";
import { buttonStyles } from "@/shared/ui/buttonStyles";
import { IconArrowRight } from "@/shared/ui/icons";
import { routes } from "@/shared/config/routes";

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-295 px-6 pb-24">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[26px] border border-line-soft/70 bg-white px-8 py-10 sm:flex-row sm:items-center sm:px-12">
        <div>
          <p className="text-body text-ink-3">Un buen pedido puede cambiar muchas cosas.</p>
          <h2 className="mt-1 font-display text-title-1 text-forest">¿Qué se te antoja hoy?</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={routes.register} className={buttonStyles.outline}>
            Crear cuenta
          </Link>
          <Link href={routes.explore} className={buttonStyles.primary}>
            Encontrá tu próximo favorito <IconArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
