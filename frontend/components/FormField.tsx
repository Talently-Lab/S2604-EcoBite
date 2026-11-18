import type { ReactNode } from "react";
import { inputClass } from "@/components/ui";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children?: ReactNode;
};

export function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base font-semibold text-ink">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-base text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-base font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "url" | "number";
  autoComplete?: string;
  error?: string;
  hint?: string;
  readOnly?: boolean;
  required?: boolean;
  multiline?: boolean;
  step?: string;
  min?: string;
  maxLength?: number;
  placeholder?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
  hint,
  readOnly,
  required,
  multiline,
  step,
  min,
  maxLength,
  placeholder,
}: TextInputProps) {
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;
  const shared = {
    id,
    name: id,
    value,
    readOnly,
    required,
    maxLength,
    placeholder,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: `${inputClass} ${error ? "border-danger" : ""}`,
  };

  return (
    <Field id={id} label={required ? `${label} (obligatorio)` : label} error={error} hint={hint}>
      {multiline ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          step={step}
          min={min}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </Field>
  );
}
