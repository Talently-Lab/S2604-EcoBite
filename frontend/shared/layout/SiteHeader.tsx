"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/shared/ui/Logo";
import { IconClose, IconMenu } from "@/shared/ui/icons";
import { buttonStyles } from "@/shared/ui/buttonStyles";
import { landingSections, routes } from "@/shared/config/routes";

const navLinks = Object.values(landingSections);

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line-soft/70 bg-cream/90 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-19.5 max-w-310 items-center gap-10 px-6"
      >
        <Link href={routes.home} aria-label="EcoBite, inicio" onClick={close} className="shrink-0">
          <Logo className="h-8 w-auto" />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-body-small font-semibold text-ink-2 transition-colors hover:text-terracotta"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link href={routes.login} className={`${buttonStyles.quiet} py-2.5`}>
            Iniciar sesión
          </Link>
          <Link href={routes.register} className={`${buttonStyles.primary} py-2.5`}>
            Registrarme
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="ml-auto rounded-md p-2 text-forest hover:bg-white focus-visible:outline-none focus-visible:shadow-focus lg:hidden"
        >
          {isOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-line-soft bg-cream px-6 pb-6 shadow-md lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block border-b border-line-soft py-3.5 font-semibold text-forest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3">
            <Link href={routes.login} onClick={close} className={buttonStyles.outline}>
              Iniciar sesión
            </Link>
            <Link href={routes.register} onClick={close} className={buttonStyles.primary}>
              Registrarme
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
