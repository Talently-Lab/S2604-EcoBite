"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { FormAlert } from "@/components/FormAlert";
import { TextField } from "@/components/FormField";
import { EmptyState, LoadingState } from "@/components/StatusMessages";
import { buttonClass } from "@/components/ui";
import { apiFetch, errorMessage } from "@/lib/api";
import { focusFirstInvalid } from "@/lib/focus";

type Errors = Partial<Record<"nombre" | "precio" | "imagen_url", string>>;

export default function NuevoPlatoPage() {
  const { status, user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [created, setCreated] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <LoadingState label="Verificando tu sesión…" />
      </div>
    );
  }

  if (!user || user.rol !== "restaurante") {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <EmptyState title="Esta sección es solo para restaurantes">
          <p>
            {user ? "Tu cuenta no es de un restaurante." : "Ingresá con la cuenta de tu restaurante para cargar platos."}
          </p>
          <Link
            href={user ? "/" : "/login"}
            className={`${buttonClass("primary")} mt-4 inline-flex`}
          >
            {user ? "Volver al inicio" : "Ingresar"}
          </Link>
        </EmptyState>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!nombre.trim()) next.nombre = "Ingresá el nombre del plato.";
    else if (nombre.trim().length > 150) next.nombre = "El nombre no puede superar los 150 caracteres.";
    const price = Number(precio.replace(",", "."));
    if (!precio.trim() || !Number.isFinite(price) || price <= 0) {
      next.precio = "Ingresá un precio mayor que cero.";
    }
    if (imagenUrl.trim()) {
      try {
        const url = new URL(imagenUrl.trim());
        if (!["http:", "https:"].includes(url.protocol)) throw new Error("protocolo");
      } catch {
        next.imagen_url = "Ingresá una URL válida que empiece con http:// o https://.";
      }
    }
    setErrors(next);
    setFormError(null);
    setCreated(null);
    if (Object.keys(next).length > 0) {
      focusFirstInvalid(event.currentTarget);
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch<unknown>("/products", {
        method: "POST",
        json: {
          nombre: nombre.trim(),
          descripcion: descripcion.trim() || null,
          precio: price,
          imagen_url: imagenUrl.trim() || null,
        },
      });
      setCreated(nombre.trim());
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagenUrl("");
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Cargar un plato</h1>
      <p className="mt-2 text-base text-muted">Se suma al menú de tu restaurante.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
        {formError && <FormAlert message={formError} />}
        {created && (
          <div role="status" className="rounded-lg border border-brand bg-brand-soft p-4 text-base text-brand-dark">
            <p className="font-semibold">Plato cargado: {created}</p>
            <p className="mt-1">
              Podés cargar otro plato.{" "}
              <Link href="/" className="font-semibold underline">
                Ver los restaurantes
              </Link>
            </p>
          </div>
        )}
        <TextField id="nombre" label="Nombre del plato" value={nombre} onChange={setNombre} error={errors.nombre} maxLength={150} required />
        <TextField id="descripcion" label="Descripción" hint="Opcional. Ingredientes, tamaño, aclaraciones." value={descripcion} onChange={setDescripcion} multiline />
        <TextField id="precio" label="Precio (en pesos)" type="number" step="0.01" min="0" value={precio} onChange={setPrecio} error={errors.precio} required />
        <TextField id="imagen_url" label="URL de la imagen" type="url" hint="Opcional. Enlace público a una foto del plato." value={imagenUrl} onChange={setImagenUrl} error={errors.imagen_url} />
        <button type="submit" disabled={submitting} className={buttonClass("primary")}>
          {submitting ? "Guardando…" : "Guardar plato"}
        </button>
      </form>
    </div>
  );
}
