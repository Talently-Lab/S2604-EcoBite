import type { ReactNode } from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-2 rounded-lg bg-emerald-700 p-3 font-medium text-white hover:bg-emerald-800"
    >
      {children}
    </button>
  );
}
