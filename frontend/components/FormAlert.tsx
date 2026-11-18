export function FormAlert({ message, hint }: { message: string; hint?: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-danger bg-danger-soft p-4 text-base text-danger"
    >
      <p className="font-semibold">{message}</p>
      {hint && <p className="mt-1">{hint}</p>}
    </div>
  );
}
