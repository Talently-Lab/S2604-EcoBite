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
import { RoleFields } from "@/components/RoleFields";
import { buttonClass } from "@/components/ui";
import { apiFetch, errorMessage } from "@/lib/api";
import { focusFirstInvalid } from "@/lib/focus";
import type { Rol } from "@/lib/types";

type Errors = Partial<Record<"nombre" | "email" | "password" | "direccion", string>>;

export default function RegistroPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [rol, setRol] = useState<Rol>("usuario");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!nombre.trim()) {
      next.nombre = rol === "restaurante" ? "Ingresá el nombre del restaurante." : "Ingresá tu nombre.";
    }
    if (!email.trim()) next.email = "Ingresá tu email.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Revisá el formato del email.";
    if (password.length < 8) next.password = "La contraseña debe tener al menos 8 caracteres.";
    if (rol === "restaurante" && !direccion.trim()) next.direccion = "Ingresá la dirección del restaurante.";
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length > 0) {
      focusFirstInvalid(event.currentTarget);
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch<unknown>("/auth/register", {
        method: "POST",
        json: {
          nombre: nombre.trim(),
          email: email.trim(),
          password,
          rol,
          ...(rol === "restaurante" ? { direccion: direccion.trim() } : {}),
        },
      });
      await refresh();
      router.push("/");
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard title="Creá tu cuenta" intro="Sumate a EcoBite en un minuto.">
      <GoogleButton label="Registrarme con Google" />
      <p className="text-center text-base text-muted">o con tu email</p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {formError && <FormAlert message={formError} />}
        <RoleFields
          rol={rol}
          onRol={setRol}
          direccion={direccion}
          onDireccion={setDireccion}
          direccionError={errors.direccion}
        />
        <TextField
          id="nombre"
          label={rol === "restaurante" ? "Nombre del restaurante" : "Nombre"}
          autoComplete={rol === "restaurante" ? "organization" : "name"}
          value={nombre}
          onChange={setNombre}
          error={errors.nombre}
          required
        />
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
          hint="Mínimo 8 caracteres."
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <button type="submit" disabled={submitting} className={buttonClass("primary")}>
          {submitting ? "Creando cuenta…" : "Crear cuenta"}
        </button>
      </form>

      <p className="text-center text-base text-ink">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-semibold text-brand underline">
          Ingresá
        </Link>
      </p>
    </AuthCard>
  );
}
