import { Printer } from "lucide-react";
import { company } from "@/data/site";

/**
 * Print-friendly estimate summary. The block is hidden on screen and revealed
 * only for print, so `window.print()` produces a clean one-page PDF the client
 * can save or forward to a financier.
 */
export function EstimatePrint({
  type,
  tier,
  area,
  formatted,
}: {
  type: string;
  tier: string;
  area: number;
  formatted: string;
}) {
  const today = new Date().toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <button
        type="button"
        onClick={() => window.print()}
        className="mt-3 inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-5 py-3 font-display text-sm font-bold uppercase text-primary-foreground hover:bg-primary-foreground/10 print:hidden"
      >
        <Printer className="size-4" /> Download estimate (PDF)
      </button>

      <div id="estimate-print" className="hidden print:block">
        <h1 style={{ fontSize: "22px", fontWeight: 800 }}>Urban T &amp; Co.</h1>
        <p style={{ fontSize: "12px" }}>{company.tagline}</p>
        <p style={{ fontSize: "12px" }}>
          {company.phone} · {company.email} · {company.address}
        </p>
        <hr style={{ margin: "14px 0" }} />
        <h2 style={{ fontSize: "16px", fontWeight: 700 }}>Indicative build cost estimate</h2>
        <p style={{ fontSize: "12px" }}>Prepared {today}</p>
        <table style={{ width: "100%", marginTop: "14px", fontSize: "13px", textAlign: "left" }}>
          <tbody>
            <tr>
              <th style={{ padding: "6px 0" }}>Project type</th>
              <td>{type}</td>
            </tr>
            <tr>
              <th style={{ padding: "6px 0" }}>Finish level</th>
              <td>{tier}</td>
            </tr>
            <tr>
              <th style={{ padding: "6px 0" }}>Built-up area</th>
              <td>{area} m²</td>
            </tr>
            <tr>
              <th style={{ padding: "6px 0" }}>Indicative range</th>
              <td style={{ fontWeight: 700 }}>{formatted}</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: "16px", fontSize: "12px" }}>
          Includes structure, MEP and finishes. Excludes land, county approval fees, furniture and
          landscaping. This is an indicative range only — a signed, line-by-line Bill of Quantities
          issued after a site visit supersedes it.
        </p>
        <p style={{ marginTop: "10px", fontSize: "12px" }}>
          Payment follows a certified milestone schedule: 20% mobilisation, 25% substructure, 25%
          superstructure, 20% finishes, 10% handover.
        </p>
        <p style={{ marginTop: "16px", fontSize: "12px" }}>
          Estimate reference: BC-{new Date().getFullYear()}-{String(area).padStart(4, "0")}
        </p>
      </div>
    </>
  );
}
