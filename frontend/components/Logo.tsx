"use client";

import { useState } from "react";

/**
 * Usa el logo oficial (colibrí) desde /public/images/logo-ecobite.png.
 * Si el archivo todavía no está, muestra el nombre en texto.
 */
export function Logo({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/logo-ecobite.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9"
          ref={(img) => {
            // Si el archivo falló antes de hidratar, onError ya no se dispara.
            if (img && img.complete && img.naturalWidth === 0) setFailed(true);
          }}
          onError={() => setFailed(true)}
        />
      )}
      <span className="text-xl font-bold tracking-tight text-brand">EcoBite</span>
    </span>
  );
}
