import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading } from "@/components/SiteLayout";
import { services, serviceGroups } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Individual Trades & Services | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Twelve trades, one accountable contractor: masonry, plumbing, electrical, roofing, flooring, ceilings, smart security and more. Book a single trade in minutes.",
      },
      { property: "og:title", content: "Individual Trades & Services | Urban T Construction Co." },
      { property: "og:description", content: "Book one trade or bundle several and save automatically." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tier B — Individual services"
        title="Just need one trade? Book exactly that."
        intro="No package pressure, no minimum contract. Pick the trade, get an indicative price, and a crew is scheduled — bundle two or more and a discount applies automatically."
      />
      <div className="container-x py-16">
        {serviceGroups.map((group) => (
          <section key={group} className="mb-14">
            <SectionHeading eyebrow={group} title={`${group} trades`} />
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.group === group)
                .map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="surface-card group flex h-full flex-col p-6 transition-transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl group-hover:text-accent">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.blurb}</p>
                    <p className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-accent">
                      From {s.from} →
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
