export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

const badge = "font-sans text-footer rounded-pill inline-flex items-center pl-2 pr-2.5 py-1 gap-1.5";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pendiente", className: "bg-warn-bg text-warn-fg" },
  preparing: { label: "En preparación", className: "bg-co2-bg text-co2-fg" },
  ready: { label: "Listo", className: "bg-teal-bg text-teal-fg" },
  delivered: { label: "Entregado", className: "bg-eco-700 text-white" },
  cancelled: { label: "Cancelado", className: "bg-danger-bg text-danger" },
};

export function OrderStatusBadge({ id, status }: { id?: string; status: OrderStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span id={id} className={`${badge} ${className}`}>
      {label}
    </span>
  );
}
