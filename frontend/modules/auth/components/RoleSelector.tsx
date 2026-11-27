import type { UserRole } from "../types";

const options: { value: UserRole; label: string }[] = [
  { value: "usuario", label: "Soy cliente" },
  { value: "restaurante", label: "Soy restaurante" },
];

type RoleSelectorProps = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Tipo de cuenta" className="flex rounded-full border border-stone-300 bg-white p-1">
      {options.map((option) => (
        <label key={option.value} className="w-1/2 cursor-pointer">
          <input
            type="radio"
            name="role"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span className="flex justify-center rounded-full py-2 text-sm font-medium text-stone-700 transition-colors peer-checked:bg-emerald-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-200">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
