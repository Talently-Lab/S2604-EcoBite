"use client";

import { useState } from "react";
import { Field } from "@/components/FormField";
import { inputClass } from "@/components/ui";

export function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  autoComplete: "current-password" | "new-password";
}) {
  const [visible, setVisible] = useState(false);
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <Field id={id} label={`${label} (obligatorio)`} error={error} hint={hint}>
      <input
        id={id}
        name={id}
        type={visible ? "text" : "password"}
        value={value}
        required
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${inputClass} ${error ? "border-danger" : ""}`}
        onChange={(event) => onChange(event.target.value)}
      />
      <label className="mt-1 flex items-center gap-2 text-base text-ink">
        <input
          type="checkbox"
          checked={visible}
          onChange={(event) => setVisible(event.target.checked)}
          className="h-5 w-5 accent-brand"
        />
        Mostrar contraseña
      </label>
    </Field>
  );
}
