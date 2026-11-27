"use client";

import { useState, type ChangeEvent } from "react";

type ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

type TextInputProps = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  onChange: ChangeHandler;
};

const inputClasses =
  "bg-surface py-3 px-3.5 text-ink rounded-md border border-line focus:outline-none focus:border-eco-700 focus:shadow-focus-input w-full disabled:cursor-no-drop disabled:bg-surface-alt disabled:border-line-soft disabled:text-disabled";
const labelClasses = "flex flex-col text-label font-sans gap-1.5 text-ink w-full";

export function TextInput({ id, placeholder, label, type, onChange }: TextInputProps) {
  return (
    <label htmlFor={id} className={labelClasses}>
      {label}
      <input id={id} type={type} className={inputClasses} placeholder={placeholder} onChange={onChange} />
    </label>
  );
}

export function EmailInput({ onChange }: { onChange: ChangeHandler }) {
  return (
    <label htmlFor="emailInput" className={labelClasses}>
      Email
      <input
        id="emailInput"
        name="email"
        type="email"
        className={inputClasses}
        placeholder="tu@correo.com"
        onChange={onChange}
      />
    </label>
  );
}

export function PasswordInput({ onChange }: { onChange: ChangeHandler }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label htmlFor="passwordInput" className={labelClasses}>
      Contraseña
      <div className="relative">
        <input
          id="passwordInput"
          name="password"
          type={isVisible ? "text" : "password"}
          className={inputClasses}
          minLength={8}
          placeholder="••••••••"
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink hover:text-ink-2"
        >
          {isVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.391 4.178 5.327 7.2 9.964 7.2 1.761 0 3.42-.433 4.876-1.196m4.243-4.243a10.477 10.477 0 0 0 1.934-3.761m-6.308-6.308A10.474 10.474 0 0 0 12 4.5c-4.637 0-8.573 3.007-9.963 7.178.07.207.07.431 0 .639a10.45 10.45 0 0 0 2.213 3.32M12 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.343 6.343L3 3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </button>
      </div>
    </label>
  );
}
