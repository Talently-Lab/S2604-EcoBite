import Link from "next/link";
import { buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-ink">No encontramos esa página</h1>
      <p className="mt-3 text-base text-muted">Puede que el enlace esté mal o que ya no exista.</p>
      <Link href="/" className={`${buttonClass("primary")} mt-6 inline-flex`}>
        Volver al inicio
      </Link>
    </div>
  );
}
