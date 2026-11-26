import Link from "next/link";
import { routes } from "@/shared/config/routes";
import { AuthField } from "../components/AuthField";
import { AuthForm } from "../components/AuthForm";
import { SubmitButton } from "../components/SubmitButton";

export function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Iniciar sesión</h1>
      <p className="mt-2 mb-8 text-stone-600">
        Ingresá para seguir pidiendo comida que cuida el planeta.
      </p>
      <AuthForm>
        <AuthField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
        />
        <AuthField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <SubmitButton>Iniciar sesión</SubmitButton>
      </AuthForm>
      <p className="mt-6 text-sm text-stone-600">
        ¿No tenés cuenta?{" "}
        <Link
          href={routes.register}
          className="font-medium text-emerald-800 hover:underline"
        >
          Registrate
        </Link>
      </p>
    </>
  );
}
