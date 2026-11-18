/**
 * Lleva el foco al primer campo con error después de validar un formulario
 * (WCAG 3.3.1 y 3.3.3). Se ejecuta tras el render para que aria-invalid ya
 * esté aplicado.
 */
export function focusFirstInvalid(form: HTMLFormElement): void {
  window.setTimeout(() => {
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, 0);
}
