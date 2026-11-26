import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/shared/ui/Logo";
import { routes } from "@/shared/config/routes";

/** Two-column shell for the auth pages: form on the left, message on the right. */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid flex-1 md:grid-cols-2 bg-stone-50 text-stone-900 font-sans">
      <div className="flex flex-col px-6 py-8 md:px-20">
        <Link href={routes.home} aria-label="EcoBite, inicio" className="w-fit">
          <Logo className="h-8 w-auto" />
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center bg-stone-200 p-20">
        <p className="max-w-md text-center text-4xl font-bold text-stone-900">
          Tu próximo pedido puede cuidar el planeta.
        </p>
      </div>
    </div>
  );
}
