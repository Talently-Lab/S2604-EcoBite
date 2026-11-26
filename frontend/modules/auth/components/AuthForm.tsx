"use client";

import type { FormEvent, ReactNode } from "react";

type AuthFormProps = {
  /** Slot: the fields and actions rendered inside the form. */
  children: ReactNode;
  /** Optional submit handler. Defaults to a no-op while the forms are mock-ups. */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

/** Shared form shell for the auth pages. */
export function AuthForm({ children, onSubmit }: AuthFormProps) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(event);
      }}
    >
      {children}
    </form>
  );
}
