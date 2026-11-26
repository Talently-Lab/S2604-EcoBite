import type { SVGProps } from "react";

/**
 * EcoBite's own icon set: 1.6 stroke, round caps and slightly organic shapes
 * (leaves, packaging lids) so they don't look generic.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Leaf with asymmetric veins. */
export function IconLeaf(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 19c-.6-7.2 3.4-13 14-14 .4 9.6-4.6 14.6-12 14" />
      <path d="M5 19c2.6-4.2 5.6-7 9.5-9.2" />
      <path d="M9.6 14.2l-.4-3.1M12.4 11.8l2.6.3" />
    </Base>
  );
}

/** Takeaway box with a sprouting leaf: compostable. */
export function IconCompostBox(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 9.5h15l-1.6 9.2a1.6 1.6 0 0 1-1.6 1.3H7.7a1.6 1.6 0 0 1-1.6-1.3L4.5 9.5Z" />
      <path d="M3.5 9.5h17" />
      <path d="M12 9.5c0-2.6 1.4-4.6 4.4-5.2.2 2.8-1.4 4.6-4.4 5.2Z" />
      <path d="M12 9.5C11.6 7.6 10.2 6.4 8 6.3" />
    </Base>
  );
}

/** Delivery bike with a rear cargo box. */
export function IconCargoBike(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="5.5" cy="16.5" r="3" />
      <circle cx="18.5" cy="16.5" r="3" />
      <path d="M5.5 16.5 9 9.5h5.5l4 7" />
      <path d="M9 9.5 12 16.5h1.5" />
      <path d="M13 6.5h2.5l-1 3" />
      <path d="M2.8 8.5h4.4v3.2H2.8z" />
    </Base>
  );
}

/** Cloud with a down arrow: less CO₂. */
export function IconCo2Down(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 16.5H6.2a3.7 3.7 0 0 1-.5-7.4 5.5 5.5 0 0 1 10.6-1.4 4.4 4.4 0 0 1 1.5 8.6" />
      <path d="M12 11v9M9.2 17.4 12 20.2l2.8-2.8" />
    </Base>
  );
}

/** Storefront with a striped awning. */
export function IconStorefront(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10v9.5h16V10" />
      <path d="M3 10 4.6 4.5h14.8L21 10c0 1.4-1.2 2.4-2.6 2.4s-2.5-1-2.5-2.4c0 1.4-1.2 2.4-2.6 2.4h-.6c-1.4 0-2.6-1-2.6-2.4 0 1.4-1.1 2.4-2.5 2.4S3 11.4 3 10Z" />
      <path d="M10 19.5v-4.5h4v4.5" />
    </Base>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <path d="M12 12.6c0-2 1-3.4 3-3.8.1 2-1 3.4-3 3.8Z" />
    </Base>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.2 4L19 7" />
    </Base>
  );
}

export function IconDash(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 12h10" />
    </Base>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 12h14M13.5 6.5 19 12l-5.5 5.5" />
    </Base>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Base>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}
