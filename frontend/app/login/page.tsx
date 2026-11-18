"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthCard } from "@/components/AuthCard";
import { useAuth } from "@/components/AuthProvider";
import { FormAlert } from "@/components/FormAlert";
import { TextField } from "@/components/FormField";
import { GoogleButton } from "@/components/GoogleButton";
import { PasswordField } from "@/components/PasswordField";
import { buttonClass } from "@/components/ui";
import { ApiError, apiFetch, errorMessage } from "@/lib/api";
import { focusFirstInvalid } from "@/lib/focus";

export default function LoginPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<{ message: string; hint?: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Ingresá tu email.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Revisá el formato del email.";
    if (!password) next.password = "Ingresá tu contraseña.";
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length > 0) {
      focusFirstInvalid(event.currentTarget);
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch<unknown>("/auth/login", {
        method: "POST",
        json: { email: email.trim(), password },
      });
      await refresh();
      router.push("/");
    } catch (error) {
      setFormError({
        message: errorMessage(error),
        hint:
          error instanceof ApiError && error.status >= 500
            ? "Si creaste tu cuenta con Google, ingresá con el botón de Google."
            : undefined,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard title="Ingresá a tu cuenta" intro="Bienvenido de nuevo a EcoBite.">
      <GoogleButton label="Ingresar con Google" />
      <p className="text-center text-base text-muted">o con tu email</p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {formError && <FormAlert message={formError.message} hint={formError.hint} />}
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          required
        />
        <PasswordField
          id="password"
          label="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <button type="submit" disabled={submitting} className={buttonClass("primary")}>
          {submitting ? "Ingresando…" : "Ingresar"}
        </button>
      </form>

      <p className="text-center text-base text-ink">
        ¿Todavía no tenés cuenta?{" "}
        <Link href="/registro" className="font-semibold text-brand underline">
          Creá una
        </Link>
      </p>
    </AuthCard>
  );
}
