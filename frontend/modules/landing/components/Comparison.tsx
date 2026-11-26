import { IconCheck, IconDash } from "@/shared/ui/icons";
import { comparisonRows } from "../data/content";
import { SectionHeading } from "./SectionHeading";

export function Comparison() {
  return (
    <section aria-labelledby="comparacion-title" className="mx-auto max-w-295 px-6 py-24">
      <SectionHeading
        id="comparacion-title"
        align="center"
        title="Delivery de siempre."
        highlight="Con otra energía."
      />

      <div className="mx-auto mt-10 max-w-225 overflow-x-auto rounded-[17px] border border-line-soft/70 bg-white shadow-[0_9px_30px_rgba(37,61,42,0.05)]">
        <table className="w-full min-w-150 text-left text-body-small">
          <thead>
            <tr className="bg-sage text-label text-ink-3">
              <th scope="col" className="px-5 py-4 font-semibold">Lo que importa</th>
              <th scope="col" className="px-5 py-4 font-semibold">Apps tradicionales</th>
              <th scope="col" className="bg-mint-pale px-5 py-4 font-display text-body font-bold text-forest">
                EcoBite
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.topic} className="border-t border-line-soft/60">
                <th scope="row" className="px-5 py-4 font-semibold text-forest">{row.topic}</th>
                <td className="px-5 py-4 text-ink-3">
                  <span className="inline-flex items-center gap-2">
                    <IconDash size={16} /> {row.others}
                  </span>
                </td>
                <td className="bg-mint-pale/45 px-5 py-4 font-semibold text-forest-2">
                  <span className="inline-flex items-center gap-2">
                    <IconCheck size={16} /> {row.ecobite}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
