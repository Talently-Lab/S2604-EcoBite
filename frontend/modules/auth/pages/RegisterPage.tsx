"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";
import { AuthField } from "../components/AuthField";
import { AuthForm } from "../components/AuthForm";
import { FormError } from "../components/FormError";
import { RoleSelector } from "../components/RoleSelector";
import { SubmitButton } from "../components/SubmitButton";
import { registerUser } from "../services/authService";
import type { UserRole } from "../types";

const MIN_PASSWORD_LENGTH = 8;

export function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("usuario");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptsTerms, setAcceptsTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isRestaurant = role === "restaurante";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || (isRestaurant && !address.trim())) {
      return setError("Completá todos los campos");
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
    }
    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }
    if (!acceptsTerms) {
      return setError("Tenés que aceptar los términos y condiciones");
    }

    setIsLoading(true);
    const result = await registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      address: isRestaurant ? address.trim() : undefined,
    });
    setIsLoading(false);

    if (result.success) {
      router.push(routes.login);
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Crear cuenta</h1>
      <p className="mt-2 mb-8 text-stone-600">
        Creá tu cuenta en un minuto y empezá a medir tu impacto.
      </p>
      <AuthForm onSubmit={handleSubmit}>
        <RoleSelector value={role} onChange={setRole} />
        <FormError message={error} />
        <AuthField
          label={isRestaurant ? "Nombre del restaurante" : "Nombre"}
          name="name"
          autoComplete={isRestaurant ? "organization" : "name"}
          onChange={(e) => setName(e.target.value)}
        />
        <AuthField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {isRestaurant && (
          <AuthField
            label="Dirección del local"
            name="address"
            autoComplete="street-address"
            onChange={(e) => setAddress(e.target.value)}
          />
        )}
        <AuthField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthField
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label className="flex items-start gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={acceptsTerms}
            onChange={(e) => setAcceptsTerms(e.target.checked)}
            required
            className="mt-0.5 size-4 accent-emerald-700"
          />
          <span>
            Acepto los{" "}
            <Link href="#" className="font-medium text-emerald-800 hover:underline">
              términos y condiciones
            </Link>
          </span>
        </label>
        <SubmitButton disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Registrarse"}
        </SubmitButton>
      </AuthForm>
      <p className="mt-6 text-sm text-stone-600">
        ¿Ya tenés cuenta?{" "}
        <Link href={routes.login} className="font-medium text-emerald-800 hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </>
  );
}
