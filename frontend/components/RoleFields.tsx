import { TextField } from "@/components/FormField";
import type { Rol } from "@/lib/types";

export function RoleFields({
  rol,
  onRol,
  direccion,
  onDireccion,
  direccionError,
}: {
  rol: Rol;
  onRol: (rol: Rol) => void;
  direccion: string;
  onDireccion: (value: string) => void;
  direccionError?: string;
}) {
  const options: { value: Rol; title: string; text: string }[] = [
    { value: "usuario", title: "Soy cliente", text: "Quiero descubrir restaurantes y platos." },
    { value: "restaurante", title: "Soy restaurante", text: "Quiero publicar mi menú." },
  ];

  return (
    <>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-base font-semibold text-ink">¿Cómo vas a usar EcoBite?</legend>
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 ${
              rol === option.value ? "border-brand bg-brand-soft" : "border-line bg-surface"
            }`}
          >
            <input
              type="radio"
              name="rol"
              value={option.value}
              checked={rol === option.value}
              onChange={() => onRol(option.value)}
              className="mt-1 h-5 w-5 accent-brand"
            />
            <span>
              <span className="block text-base font-semibold text-ink">{option.title}</span>
              <span className="block text-base text-muted">{option.text}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {rol === "restaurante" && (
        <TextField
          id="direccion"
          label="Dirección del restaurante"
          hint="Calle, número y ciudad. La usamos para ubicarte en el mapa."
          autoComplete="street-address"
          value={direccion}
          onChange={onDireccion}
          error={direccionError}
          required
        />
      )}
    </>
  );
}
