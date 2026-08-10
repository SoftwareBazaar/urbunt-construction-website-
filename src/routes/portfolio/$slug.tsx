import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import civil from "@/assets/project-civil.jpg";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { BeforeAfter } from "@/components/BeforeAfter";
import { projects, services, type Project } from "@/data/site";

const images: Record<string, string> = { residential, commercial, civil };

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }): Project => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Case study"} | Urban T Construction Co.` },
      { name: "description", content: loaderData?.brief ?? "Urban T project case study." },
      { property: "og:title", content: `${loaderData?.title ?? "Case study"} | Urban T Construction Co.` },
      { property: "og:description", content: loaderData?.brief ?? "Urban T project case study." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const project: Project = Route.useLoaderData();
  const trades = project.trades
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <SiteLayout>
      <PageHero
        eyebrow={`${project.type} · ${project.location} · ${project.year}`}
        title={project.title}
        intro={project.brief}
      />
      <div className="container-x py-16">
        <img
          src={images[project.image]}
          alt={project.title}
          loading="lazy"
          width={1280}
          height={960}
          className="aspect-[16/9] w-full object-cover"
        />

        <dl className="mt-10 grid gap-6 border-y border-border py-8 sm:grid-cols-4">
          {[
            ["Timeline", project.duration],
            ["Contract value", project.budget],
            ["Location", project.location],
            ["Completed", String(project.year)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-2 font-display text-lg font-bold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Trades delivered</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {trades.map((t) => (
                <Link
                  key={t.slug}
                  to="/services/$slug"
                  params={{ slug: t.slug }}
                  className="border border-border bg-secondary px-3 py-1.5 text-sm hover:border-accent"
                >
                  {t.name}
                </Link>
              ))}
            </div>
            <figure className="mt-10 border-l-4 border-accent bg-secondary p-6">
              <blockquote className="text-lg">"{project.testimonial.quote}"</blockquote>
              <figcaption className="mt-3 font-display font-bold">
                {project.testimonial.author}
              </figcaption>
            </figure>
            <Link
              to="/contact"
              className="mt-8 inline-flex bg-accent px-6 py-3.5 font-display text-sm font-bold uppercase text-accent-foreground"
            >
              Start a project like this
            </Link>
          </div>
          <div>
            <h2 className="text-2xl">Before & after</h2>
            <div className="mt-4">
              <BeforeAfter image={images[project.image] ?? residential} alt={project.title} />
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
