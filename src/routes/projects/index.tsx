import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, TrustBar } from "@/components/SiteLayout";
import { packages, processSteps } from "@/data/site";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Full Turnkey Project Packages | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Residential, commercial, civil and smart-home turnkey packages. One contract, one project manager, from architecture and BOQ to handover cleaning.",
      },
      { property: "og:title", content: "Full Turnkey Project Packages | Urban T Construction Co." },
      { property: "og:description", content: "One contract, concept to keys-in-hand, with fixed timelines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tier A — Full projects"
        title="One contract. One project manager. Keys in your hand."
        intro="Turnkey delivery across residential, commercial, civil and smart-home work — every trade in-house, every cost in the BOQ."
      />
      <TrustBar />

      <div className="container-x grid gap-6 py-16 md:grid-cols-2">
        {packages.map((p) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="surface-card group flex flex-col p-8 transition-transform hover:-translate-y-1"
          >
            <p className="eyebrow">{p.ideal}</p>
            <h2 className="mt-3 text-2xl group-hover:text-accent">{p.name}</h2>
            <p className="mt-3 flex-1 text-muted-foreground">{p.summary}</p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
              <span className="font-display font-bold text-accent">From {p.from}</span>
              <span className="text-muted-foreground">{p.duration}</span>
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-x">
          <p className="eyebrow text-gold">How a full build runs</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Seven stages, each with a date attached.</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.step} className="border-t-2 border-gold pt-4">
                <p className="font-display text-3xl font-extrabold text-gold">{s.step}</p>
                <p className="mt-2 font-display font-bold">{s.title}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">{s.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-accent">{s.time}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
