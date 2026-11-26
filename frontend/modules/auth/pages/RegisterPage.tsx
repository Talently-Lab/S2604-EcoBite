import Link from "next/link";
import { routes } from "@/shared/config/routes";
import { AuthField } from "../components/AuthField";
import { AuthForm } from "../components/AuthForm";
import { SubmitButton } from "../components/SubmitButton";

export function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Crear cuenta</h1>
      <p className="mt-2 mb-8 text-stone-600">
        Creá tu cuenta en un minuto y empezá a medir tu impacto.
      </p>
      <AuthForm>
        <AuthField label="Nombre" name="name" autoComplete="name" />
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
          autoComplete="new-password"
        />
        <AuthField
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
        <label className="flex items-start gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="acceptTerms"
            required
            className="mt-0.5 size-4 accent-emerald-700"
          />
          <span>
            Acepto los{" "}
            <Link
              href="#"
              className="font-medium text-emerald-800 hover:underline"
            >
              términos y condiciones
            </Link>
          </span>
        </label>
        <SubmitButton>Registrarse</SubmitButton>
      </AuthForm>
      <p className="mt-6 text-sm text-stone-600">
        ¿Ya tenés cuenta?{" "}
        <Link
          href={routes.login}
          className="font-medium text-emerald-800 hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>
    </>
  );
}
