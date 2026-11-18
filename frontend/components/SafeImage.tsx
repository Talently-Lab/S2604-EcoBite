"use client";

import { useState } from "react";

export function SafeImage({
  src,
  alt,
  fallbackLabel,
  className = "",
}: {
  src?: string | null;
  alt: string;
  fallbackLabel: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center justify-center bg-brand-soft text-3xl font-bold text-brand ${className}`}
      >
        {fallbackLabel.trim().charAt(0).toUpperCase() || "E"}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
