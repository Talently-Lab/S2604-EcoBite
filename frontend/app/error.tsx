"use client";

import { buttonClass } from "@/components/ui";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-ink">Algo salió mal</h1>
      <p className="mt-3 text-base text-muted">Tuvimos un problema inesperado. Probá de nuevo.</p>
      <button type="button" onClick={reset} className={`${buttonClass("primary")} mt-6`}>
        Reintentar
      </button>
    </div>
  );
}
