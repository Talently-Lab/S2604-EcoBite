"use client";

import type { FormEvent, ReactNode } from "react";

type AuthFormProps = {
  /** Slot: the fields and actions rendered inside the form. */
  children: ReactNode;
  /** Submit handler; the default browser submit is always prevented. */
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
