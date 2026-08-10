import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { packages, services } from "@/data/site";
import { EstimateCapture } from "@/components/EstimateCapture";
import { EstimatePrint } from "@/components/EstimatePrint";

const rates: Record<string, number> = { Standard: 38000, Premium: 52000, Signature: 74000 };
const typeFactor: Record<string, number> = { Residential: 1, Commercial: 1.18, Civil: 1.3 };

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Packages & Pricing + BOQ Estimator | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Compare turnkey tiers and single-trade rates, then get an indicative BOQ-based build cost in 60 seconds with eligible promotions applied.",
      },
      { property: "og:title", content: "Packages & Pricing | Urban T Construction Co." },
      { property: "og:description", content: "Transparent BOQ-based pricing and an instant estimator." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  const [type, setType] = useState("Residential");
  const [tier, setTier] = useState("Standard");
  const [area, setArea] = useState(200);

  const estimate = useMemo(() => {
    const base = (rates[tier] ?? 38000) * (typeFactor[type] ?? 1) * area;
    return { low: base * 0.92, high: base * 1.12 };
  }, [type, tier, area]);

  const fmt = (n: number) =>
    `KSh ${(n / 1_000_000).toLocaleString("en-KE", { maximumFractionDigits: 1 })}M`;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Packages & pricing"
        title="Published rates. Line-by-line BOQs. No surprise invoices."
        intro="Every figure below comes from the same rate book we use to build your Bill of Quantities — so the number you see is the conversation we start from."
      />

      <section className="container-x py-16">
        <div className="surface-card grid gap-8 p-8 lg:grid-cols-[1fr_1fr] lg:p-12">
          <div>
            <p className="eyebrow">Instant estimate</p>
            <h2 className="mt-3 text-3xl">Rough build cost in 60 seconds</h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-medium">Project type</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.keys(typeFactor).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`border px-4 py-2 text-sm ${type === t ? "border-accent bg-accent text-accent-foreground" : "border-border"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Finish level</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.keys(rates).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`border px-4 py-2 text-sm ${tier === t ? "border-accent bg-accent text-accent-foreground" : "border-border"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="area" className="text-sm font-medium">
                  Built-up area: <span className="font-bold">{area} m²</span>
                </label>
                <input
                  id="area"
                  type="range"
                  min={60}
                  max={1200}
                  step={10}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--accent)]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-primary p-8 text-primary-foreground">
            <p className="eyebrow text-gold">Indicative range</p>
            <p className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
              {fmt(estimate.low)} – {fmt(estimate.high)}
            </p>
            <p className="mt-3 text-sm text-primary-foreground/70">
              {type} · {tier} finish · {area} m². Includes structure, MEP and finishes; excludes land
              and county fees. A signed BOQ replaces this range after your site visit.
            </p>
            <p className="mt-4 bg-gold/20 px-3 py-2 text-sm">
              Signing bonus applied: free architecture consultation on turnkey contracts.
            </p>
            <EstimateCapture
              type={type}
              tier={tier}
              area={area}
              low={estimate.low}
              high={estimate.high}
              formatted={`${fmt(estimate.low)} – ${fmt(estimate.high)}`}
            />
            <EstimatePrint
              type={type}
              tier={tier}
              area={area}
              formatted={`${fmt(estimate.low)} – ${fmt(estimate.high)}`}
            />
            <Link
              to="/contact"
              className="mt-4 inline-flex justify-center bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground"
            >
              Get the full BOQ
            </Link>
            <Link
              to="/financing"
              className="mt-3 text-center font-display text-sm font-bold uppercase text-gold hover:underline print:hidden"
            >
              See payment plans →
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <h2 className="text-3xl">Turnkey packages</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border border-border bg-card text-left text-sm">
            <thead className="bg-secondary">
              <tr>
                {["Package", "Ideal client", "Tiers", "From", "Timeline"].map((h) => (
                  <th key={h} className="border-b border-border p-4 font-display uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p.slug} className="border-b border-border last:border-0">
                  <td className="p-4 font-display font-bold">
                    <Link to="/projects/$slug" params={{ slug: p.slug }} className="hover:text-accent">
                      {p.name}
                    </Link>
                  </td>
                  <td className="p-4 text-muted-foreground">{p.ideal}</td>
                  <td className="p-4 text-muted-foreground">{p.tiers.map((t) => t.name).join(" · ")}</td>
                  <td className="p-4 font-semibold text-accent">{p.from}</td>
                  <td className="p-4 text-muted-foreground">{p.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-16 text-3xl">Individual trade rates</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="surface-card flex items-center justify-between p-4 hover:border-accent"
            >
              <span className="font-medium">{s.name}</span>
              <span className="font-display text-sm font-bold text-accent">from {s.from}</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Bundle two or more trades in a single request and a 4–12% discount is applied
          automatically at quote stage.
        </p>
      </section>
    </SiteLayout>
  );
}
