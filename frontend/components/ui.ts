const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-brand text-on-brand hover:bg-brand-dark",
  secondary: "border-2 border-brand text-brand hover:bg-brand-soft",
  ghost: "text-brand hover:bg-brand-soft",
} as const;

export function buttonClass(variant: keyof typeof variants = "primary"): string {
  return `${base} ${variants[variant]}`;
}

export const inputClass =
  "w-full min-h-11 rounded-lg border border-muted bg-surface px-3 py-2 text-base text-ink placeholder:text-muted read-only:bg-brand-soft/40";
