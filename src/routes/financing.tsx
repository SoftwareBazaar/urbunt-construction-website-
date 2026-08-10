import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { company, whatsappLink } from "@/data/site";

const plans = [
  {
    name: "Milestone plan",
    best: "Turnkey builds from foundation to finishing",
    deposit: "20% mobilisation",
    schedule: [
      "20% — mobilisation, setting out & site hoarding",
      "25% — substructure & slab certified",
      "25% — superstructure, roof & first-fix MEP",
      "20% — plaster, finishes & second-fix MEP",
      "10% — snagging, handover & defects bond release",
    ],
    note: "Each release is tied to a signed site certificate, never to a calendar date.",
  },
  {
    name: "Stage-by-stage",
    best: "Owners building slowly with their own cashflow",
    deposit: "Per stage",
    schedule: [
      "Contract one stage at a time (e.g. foundation only)",
      "Pay 50% on award, 50% on stage certification",
      "Pause between stages with no penalty",
      "Rates locked for 6 months per signed stage",
    ],
    note: "Ideal for diaspora and self-funded projects that grow as funds arrive.",
  },
  {
    name: "Single-trade terms",
    best: "Plumbing, electrical, tiling, painting and repairs",
    deposit: "Materials up front",
    schedule: [
      "Materials invoiced at cost with supplier receipts attached",
      "Labour paid on completion and your sign-off",
      "Jobs under KSh 50,000 payable on completion",
      "Bundle 2+ trades for an automatic 4–12% discount",
    ],
    note: "No labour payment leaves your hands until you have inspected the work.",
  },
];

const partners = [
  {
    name: "SACCO & bank construction loans",
    body: "We prepare the BOQ, drawings and stage certificates your SACCO or bank needs to release construction financing tranche by tranche.",
  },
  {
    name: "Diaspora escrow",
    body: "Funds held with your advocate or escrow agent and released only against our certified stage completion reports and photo evidence.",
  },
  {
    name: "Supplier credit lines",
    body: "Our accounts with cement, steel and finishes suppliers let you buy at trade rates with 30-day terms on large orders.",
  },
];

const faqs = [
  {
    q: "Do you ever ask for the full amount up front?",
    a: "No. The largest single payment on any Urban T contract is the 25% structure release, and every release follows a certified milestone.",
  },
  {
    q: "How are variations and extra works paid?",
    a: "Variations are quoted in writing and only start after you approve them. They are invoiced with the next scheduled milestone, never as a surprise.",
  },
  {
    q: "What happens to the retention?",
    a: "5–10% is retained through the defects liability period (6–12 months depending on contract) and released after the final snagging sign-off.",
  },
  {
    q: "Which payment channels do you accept?",
    a: "M-Pesa Paybill, bank transfer, and cheque. Every payment is receipted against your project account and reconciled on the monthly report.",
  },
];

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Payment Plans & Construction Financing | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Milestone-based payment schedules, stage-by-stage building, SACCO and bank loan support, and diaspora escrow terms for Urban T Construction Co. projects in Kenya.",
      },
      { property: "og:title", content: "Payment Plans & Financing | Urban T Construction Co." },
      {
        property: "og:description",
        content: "Milestone payments tied to certified site progress — never to calendar dates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Financing,
});

function Financing() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Payment plans & financing"
        title="Pay for progress you can stand on, not promises."
        intro="Every shilling on a Urban T contract is released against a certified milestone. Here are the schedules we work with, and the financing routes our clients use to fund them."
      />

      <section className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <article key={p.name} className="surface-card flex flex-col p-8">
              <p className="eyebrow">{p.deposit}</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.best}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.schedule.map((s) => (
                  <li key={s} className="border-l-2 border-accent pl-3">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">{p.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-x">
          <p className="eyebrow">Funding routes</p>
          <h2 className="mt-3 text-3xl">How clients fund their builds</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {partners.map((p) => (
              <div key={p.name} className="surface-card p-6">
                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Urban T Construction Co. does not lend money or charge interest. We provide the documentation
            and certification your financier requires.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 text-3xl">Payment terms, answered</h2>
            <div className="mt-8 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-lg font-bold">{f.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary p-8 text-primary-foreground lg:p-12">
            <p className="eyebrow text-gold">Next step</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">
              Get a payment schedule with your BOQ
            </h2>
            <p className="mt-4 text-sm text-primary-foreground/75">
              Send us your drawings or a description of the works and we will return a line-by-line
              BOQ with the exact milestone schedule attached — free, within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hi Urban T, I'd like a BOQ with a payment schedule.")}
                target="_blank"
                rel="noreferrer"
                className="bg-whatsapp px-5 py-3 font-display text-sm font-bold uppercase text-whatsapp-foreground"
              >
                Discuss on WhatsApp
              </a>
              <Link
                to="/pricing"
                className="bg-accent px-5 py-3 font-display text-sm font-bold uppercase text-accent-foreground"
              >
                Estimate my build
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60">
              Or call {company.phone} · {company.hours}
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
