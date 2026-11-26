import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** First line of the title. */
  title: ReactNode;
  /** Second line, highlighted in color. */
  highlight?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({ title, highlight, tone = "dark", align = "left", id }: SectionHeadingProps) {
  const colors =
    tone === "dark"
      ? { title: "text-forest", highlight: "text-terracotta" }
      : { title: "text-white", highlight: "text-mint" };

  return (
    <h2
      id={id}
      className={`font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-tight text-balance ${colors.title} ${align === "center" ? "text-center" : ""}`}
    >
      {title}
      {highlight && (
        <>
          <br />
          <span className={colors.highlight}>{highlight}</span>
        </>
      )}
    </h2>
  );
}
