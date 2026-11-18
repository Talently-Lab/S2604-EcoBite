"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { buttonClass } from "@/components/ui";

function NavLink({
  href,
  children,
  alsoActiveOn = [],
}: {
  href: string;
  children: string;
  alsoActiveOn?: string[];
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/" || alsoActiveOn.some((prefix) => pathname.startsWith(prefix))
      : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-lg px-3 py-2 text-base font-medium hover:bg-brand-soft ${
        active ? "text-brand underline underline-offset-4" : "text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const { status, user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" aria-label="EcoBite, ir al inicio" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="flex flex-wrap items-center gap-1">
          <NavLink href="/" alsoActiveOn={["/restaurantes"]}>
            Restaurantes
          </NavLink>
          {user?.rol === "restaurante" && (
            <NavLink href="/panel/platos/nuevo">Cargar plato</NavLink>
          )}
        </nav>

        <div className="flex flex-wrap items-center gap-2" aria-live="polite">
          {status === "loading" ? (
            <>
              <span role="status" className="sr-only">
                Verificando tu sesión…
              </span>
              <span aria-hidden="true" className="h-11 w-44 animate-pulse rounded-lg bg-line" />
            </>
          ) : user ? (
            <>
              <span className="text-base text-ink">Hola, {user.name}</span>
              <button type="button" onClick={handleLogout} className={buttonClass("secondary")}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonClass("ghost")}>
                Ingresar
              </Link>
              <Link href="/registro" className={buttonClass("primary")}>
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
