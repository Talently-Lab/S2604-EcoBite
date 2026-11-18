import type { ReactNode } from "react";

export function AuthCard({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
        {intro && <p className="mt-2 text-base text-muted">{intro}</p>}
        <div className="mt-6 flex flex-col gap-5">{children}</div>
      </div>
    </div>
  );
}
