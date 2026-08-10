import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import residential from "@/assets/project-residential.jpg";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { BeforeAfter } from "@/components/BeforeAfter";
import { QuoteForm } from "@/components/QuoteForm";
import { getService, services, whatsappLink, type Service } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): Service => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Service"} Services | Urban T Construction Co.` },
      { name: "description", content: loaderData?.blurb ?? "Professional trade services." },
      { property: "og:title", content: `${loaderData?.name ?? "Service"} | Urban T Construction Co.` },
      { property: "og:description", content: loaderData?.blurb ?? "Professional trade services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: loaderData.name,
              serviceType: loaderData.group,
              description: loaderData.blurb,
              provider: { "@type": "GeneralContractor", name: "Urban T Construction Co." },
              areaServed: ["Nairobi", "Kiambu", "Kenya"],
              offers: { "@type": "Offer", priceCurrency: "KES", description: `From ${loaderData.from}` },
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: loaderData.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          },
        ]
      : [],
  }),

  component: ServicePage,
});

function ServicePage() {
  const service: Service = Route.useLoaderData();
  const related = service.combine
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <SiteLayout>
      <PageHero eyebrow={service.group} title={service.name} intro={service.blurb}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="border border-primary-foreground/30 px-4 py-2 font-display text-sm font-bold">
            From {service.from}
          </span>
          <a
            href={whatsappLink(`Hi Urban T, I need a quote for ${service.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp px-5 py-3 font-display text-sm font-bold uppercase text-whatsapp-foreground"
          >
            <MessageCircle className="size-4" /> WhatsApp about {service.name}
          </a>
        </div>
      </PageHero>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-2xl">Scope of work</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {service.scope.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl">Materials & standards</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.materials.map((m) => (
              <span key={m} className="border border-border bg-secondary px-3 py-1.5 text-sm">
                {m}
              </span>
            ))}
          </div>

          <h2 className="mt-12 text-2xl">Before & after</h2>
          <div className="mt-5">
            <BeforeAfter image={residential} alt={`${service.name} work`} />
          </div>

          <div className="mt-12 border-l-4 border-accent bg-secondary p-6">
            <p className="font-display text-lg font-bold">Combine with…</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Planning more than one job? Add a second service and a bundle discount of up to 12%
              applies automatically to your quote.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r!.slug}
                  to="/services/$slug"
                  params={{ slug: r!.slug }}
                  className="border border-border bg-card px-3 py-1.5 text-sm hover:border-accent"
                >
                  {r!.name}
                </Link>
              ))}
              <Link
                to="/projects"
                className="bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground"
              >
                See full project packages
              </Link>
            </div>
          </div>

          <h2 className="mt-12 text-2xl">Questions clients ask</h2>
          <dl className="mt-5 divide-y divide-border border-y border-border">
            {service.faqs.map((f) => (
              <div key={f.q} className="py-4">
                <dt className="font-display font-bold">{f.q}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <QuoteForm preselect={service.slug} />
        </aside>
      </div>
    </SiteLayout>
  );
}
