import Link from "next/link";
import { Logo } from "@/shared/ui/Logo";
import { landingSections, routes } from "@/shared/config/routes";

const columns = [
  {
    title: "Explorá",
    links: [
      { label: "Restaurantes", href: landingSections.restaurants.href },
      { label: "Nuestro impacto", href: landingSections.impact.href },
      { label: "Zona piloto", href: landingSections.pilotZone.href },
    ],
  },
  {
    title: "Sumate",
    links: [
      { label: "Tengo un restaurante", href: landingSections.partners.href },
      { label: "Crear cuenta", href: routes.register },
      { label: "Iniciar sesión", href: routes.login },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest text-mint-pale">
      <div className="mx-auto grid max-w-295 gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href={routes.home} aria-label="EcoBite, inicio" className="inline-block">
            <Logo tone="light" className="h-9 w-auto" />
          </Link>
          <p className="mt-5 max-w-64 text-body-small text-mint-pale/75">
            Comida rica, decisiones que hacen bien. Delivery con envases compostables y
            repartos limpios en Buenos Aires.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-sans text-label uppercase tracking-wider text-mint">
              {column.title}
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-small text-mint-pale/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-295 flex-col gap-2 px-6 py-6 text-footer font-normal text-mint-pale/60 sm:flex-row sm:justify-between">
          <span>© 2026 EcoBite · Hecho en Buenos Aires</span>
          <span>Economía circular, un pedido a la vez</span>
        </div>
      </div>
    </footer>
  );
}
