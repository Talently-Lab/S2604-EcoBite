import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui";

export function LoadingState({ label = "Cargando…" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 py-10 text-base text-muted">
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent"
      />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-danger bg-danger-soft p-5 text-base text-danger"
    >
      <p className="font-semibold">No pudimos cargar esto</p>
      <p className="mt-1">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className={`${buttonClass("secondary")} mt-4`}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface p-8 text-center">
      <p className="text-lg font-semibold text-ink">{title}</p>
      {children && <div className="mt-2 text-base text-muted">{children}</div>}
    </div>
  );
}
