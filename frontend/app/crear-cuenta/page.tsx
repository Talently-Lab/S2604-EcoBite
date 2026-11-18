"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthCard } from "@/components/AuthCard";
import { useAuth } from "@/components/AuthProvider";
import { FormAlert } from "@/components/FormAlert";
import { TextField } from "@/components/FormField";
import { RoleFields } from "@/components/RoleFields";
import { ErrorState, LoadingState } from "@/components/StatusMessages";
import { buttonClass } from "@/components/ui";
import { apiFetch, errorMessage } from "@/lib/api";
import { focusFirstInvalid } from "@/lib/focus";
import type { RegistrationData, Rol } from "@/lib/types";
import { useApi } from "@/lib/useApi";

function CompleteForm({ data }: { data: RegistrationData }) {
  const router = useRouter();
  const { refresh } = useAuth();
  const [rol, setRol] = useState<Rol>("usuario");
  const [nombre, setNombre] = useState(data.name ?? "");
  const [direccion, setDireccion] = useState("");
  const [errors, setErrors] = useState<{ nombre?: string; direccion?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { nombre?: string; direccion?: string } = {};
    if (!nombre.trim()) {
      next.nombre = rol === "restaurante" ? "Ingresá el nombre del restaurante." : "Ingresá tu nombre.";
    }
    if (rol === "restaurante" && !direccion.trim()) next.direccion = "Ingresá la dirección del restaurante.";
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length > 0) {
      focusFirstInvalid(event.currentTarget);
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch<unknown>("/auth/complete-registration", {
        method: "POST",
        json: {
          nombre: nombre.trim(),
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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {formError && <FormAlert message={formError} />}
      <TextField
        id="email"
        label="Email de tu cuenta de Google"
        type="email"
        value={data.email}
        onChange={() => undefined}
        readOnly
      />
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
      <button type="submit" disabled={submitting} className={buttonClass("primary")}>
        {submitting ? "Guardando…" : "Completar registro"}
      </button>
    </form>
  );
}

export default function CrearCuentaPage() {
  const { state, retry } = useApi<RegistrationData>("/auth/registration-data");

  return (
    <AuthCard title="Terminá de crear tu cuenta" intro="Ya validamos tu cuenta de Google. Falta un último paso.">
      {state.status === "loading" && <LoadingState label="Verificando tu cuenta de Google…" />}

      {state.status === "error" && (
        <>
          <ErrorState message={state.message} onRetry={retry} />
          <p className="text-base text-ink">
            Si el registro expiró, volvé a empezar desde{" "}
            <Link href="/registro" className="font-semibold text-brand underline">
              Crear cuenta
            </Link>
            .
          </p>
        </>
      )}

      {state.status === "success" && <CompleteForm data={state.data} />}
    </AuthCard>
  );
}
