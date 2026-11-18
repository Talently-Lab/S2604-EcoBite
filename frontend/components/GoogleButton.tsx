import { API_URL } from "@/lib/api";
import { buttonClass } from "@/components/ui";

export function GoogleButton({ label }: { label: string }) {
  return (
    <a href={`${API_URL}/auth/google`} className={`${buttonClass("secondary")} w-full`}>
      {label}
    </a>
  );
}
