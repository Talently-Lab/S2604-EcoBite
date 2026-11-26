type AuthFieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
};

export function AuthField({ label, name, type = "text", autoComplete }: AuthFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-stone-700">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-base text-stone-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
      />
    </label>
  );
}
