"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";
import { AuthField } from "../components/AuthField";
import { AuthForm } from "../components/AuthForm";
import { FormError } from "../components/FormError";
import { SubmitButton } from "../components/SubmitButton";
import { loginUser } from "../services/authService";

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      return setError("Completá tu email y contraseña");
    }

    setIsLoading(true);
    const result = await loginUser({ email: email.trim(), password });
    setIsLoading(false);

    if (result.success) {
      // TODO: redirect to the user's dashboard once it exists.
      router.push(routes.home);
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Iniciar sesión</h1>
      <p className="mt-2 mb-8 text-stone-600">
        Ingresá para seguir pidiendo comida que cuida el planeta.
      </p>
      <AuthForm onSubmit={handleSubmit}>
        <FormError message={error} />
        <AuthField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton disabled={isLoading}>
          {isLoading ? "Ingresando..." : "Iniciar sesión"}
        </SubmitButton>
      </AuthForm>
      <p className="mt-6 text-sm text-stone-600">
        ¿No tenés cuenta?{" "}
        <Link href={routes.register} className="font-medium text-emerald-800 hover:underline">
          Registrate
        </Link>
      </p>
    </>
  );
}
