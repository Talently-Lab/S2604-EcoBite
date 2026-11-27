type ButtonProps = {
  id: string;
  text: string;
  /** Extra classes, usually the width (e.g. "w-full"). */
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const focus = "focus-visible:outline-none focus-visible:shadow-focus";
const base = `inline-flex h-12 max-md:h-10 px-5 items-center justify-center whitespace-nowrap rounded-md border-2 text-button transition-all duration-300 disabled:cursor-not-allowed disabled:shadow-none ${focus}`;

export function PrimaryButton({ id, text, className = "", type, disabled, onClick }: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${className} border-transparent bg-eco-700 hover:bg-eco-800 active:bg-eco-900 disabled:border-line-soft disabled:bg-line-soft disabled:text-disabled text-white`}
    >
      {text}
    </button>
  );
}

export function SecondaryButton({ id, text, className = "", type, disabled, onClick }: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${className} border-eco-700 hover:bg-eco-100 active:bg-eco-200 focus:border-eco-900 text-eco-700 disabled:border-line-soft disabled:text-disabled`}
    >
      {text}
    </button>
  );
}

export function TextButton({ id, text, className = "", type, disabled, onClick }: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${className} h-12 border-transparent text-eco-700 hover:bg-eco-100 active:bg-eco-200 disabled:border-line-soft disabled:bg-line-soft disabled:text-disabled group`}
    >
      <p className="border-b-2 border-b-eco-700 group-disabled:border-transparent transition-all duration-300">
        {text}
      </p>
    </button>
  );
}

export function DestructiveButton({ id, text, className = "", type, disabled, onClick }: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${className} h-12 border-transparent bg-danger hover:bg-danger-hover active:bg-danger-active text-white disabled:border-line-soft disabled:bg-line-soft disabled:text-disabled`}
    >
      {text}
    </button>
  );
}
