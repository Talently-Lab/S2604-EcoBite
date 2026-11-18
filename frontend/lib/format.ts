const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
});

export function formatPrice(value: number | string): string {
  const number = Number(value);
  return Number.isFinite(number) ? money.format(number) : "Precio a confirmar";
}
