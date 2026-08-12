import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { QuoteForm } from "@/components/QuoteForm";
import { packages, processSteps, projects, services, type Package } from "@/data/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): Package => {
    const pkg = packages.find((p) => p.slug === params.slug);
    if (!pkg) throw notFound();
    return pkg;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Package"} | Urban T Construction Co.` },
      { name: "description", content: loaderData?.summary ?? "Turnkey construction package." },
      { property: "og:title", content: `${loaderData?.name ?? "Package"} | Urban T Construction Co.` },
      { property: "og:description", content: loaderData?.summary ?? "Turnkey construction package." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackagePage,
});

function PackagePage() {
  const pkg: Package = Route.useLoaderData();
  const included = pkg.includes
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const cases = projects.filter((p) =>
    pkg.slug.startsWith("residential")
      ? p.type === "Residential"
      : pkg.slug.startsWith("commercial")
        ? p.type === "Commercial"
        : pkg.slug.startsWith("civil")
          ? p.type === "Civil"
          : true,
  );

  return (
    <SiteLayout>
      <PageHero eyebrow="Full turnkey package" title={pkg.name} intro={pkg.summary}>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="border border-primary-foreground/30 px-4 py-2 font-display font-bold">
            From {pkg.from}
          </span>
          <span className="border border-primary-foreground/30 px-4 py-2">{pkg.duration}</span>
          <span className="border border-primary-foreground/30 px-4 py-2">Ideal for: {pkg.ideal}</span>
        </div>
      </PageHero>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-2xl">Choose your tier</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {pkg.tiers.map((t, i) => (
              <article
                key={t.name}
                className={`surface-card p-6 ${i === 1 ? "border-accent" : ""}`}
              >
                {i === 1 ? (
                  <span className="eyebrow">Most chosen</span>
                ) : null}
                <h3 className="mt-1 text-xl">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.detail}</p>
              </article>
            ))}
          </div>

          <h2 className="mt-12 text-2xl">What's included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {included.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="flex items-start gap-2.5 text-sm hover:text-accent"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl">Process & timeline</h2>
          <ol className="mt-5 divide-y divide-border border-y border-border">
            {processSteps.map((s) => (
              <li key={s.step} className="flex items-baseline gap-4 py-4">
                <span className="font-display text-sm font-extrabold text-accent">{s.step}</span>
                <div className="flex-1">
                  <p className="font-display font-bold">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.detail}</p>
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{s.time}</span>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-2xl">Related case studies</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {cases.map((c) => (
              <Link
                key={c.slug}
                to="/portfolio/$slug"
                params={{ slug: c.slug }}
                className="surface-card p-5 hover:border-accent"
              >
                <p className="eyebrow">{c.type} · {c.year}</p>
                <p className="mt-2 font-display text-lg font-bold">{c.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.duration}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 border-l-4 border-gold bg-secondary p-6">
            <p className="font-display text-lg font-bold">Payment plans</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Stage-based payments tied to certified progress: 20% mobilisation, then milestone
              draws at substructure, roof level, finishes and handover. Bank and SACCO financing
              introductions available.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <QuoteForm />
        </aside>
      </div>
    </SiteLayout>
  );
}
