/**
 * Reusable button classes for <Link> and <button>.
 * Exported as strings so the style isn't tied to a specific component.
 */
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[13px] px-5 py-3.5 text-button whitespace-nowrap transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:shadow-focus";

export const buttonStyles = {
  primary: `${base} bg-terracotta text-white hover:bg-terracotta-700 hover:shadow-[0_9px_20px_rgba(23,64,51,0.15)]`,
  quiet: `${base} text-forest hover:bg-white`,
  light: `${base} bg-white text-forest hover:bg-mint-pale`,
  outline: `${base} border-[1.5px] border-forest/25 text-forest hover:border-forest hover:bg-white`,
} as const;
