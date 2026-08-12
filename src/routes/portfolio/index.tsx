import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import civil from "@/assets/project-civil.jpg";
import makueniAerial from "@/assets/makueni-school-aerial-view.jpg";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { projects } from "@/data/site";

const images: Record<string, string> = { residential, commercial, civil, makueni: makueniAerial };
const filters = ["All", "Residential", "Commercial", "Civil"] as const;

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Project Portfolio & Case Studies | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Completed villas, commercial fit-outs and civil works with BOQ summaries, planned-versus-actual timelines and client references.",
      },
      { property: "og:title", content: "Project Portfolio | Urban T Construction Co." },
      { property: "og:description", content: "Case studies with timelines and client references." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [location, setLocation] = useState("All");
  const [year, setYear] = useState("All");

  const locations = ["All", ...Array.from(new Set(projects.map((p) => p.location)))];
  const years = ["All", ...Array.from(new Set(projects.map((p) => String(p.year)))).sort().reverse()];

  const list = projects.filter(
    (p) =>
      (filter === "All" || p.type === filter) &&
      (location === "All" || p.location === location) &&
      (year === "All" || String(p.year) === year),
  );

  const select =
    "border border-border bg-card px-3 py-2 text-sm focus:border-accent focus:outline-none";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portfolio"
        title="Work you can visit. References you can call."
        intro="Filter by project type, location and completion year. Every case study lists the BOQ range, planned versus actual timeline, materials and a named client reference."
      />
      <div className="container-x py-16">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border px-4 py-2 font-display text-sm font-bold uppercase tracking-wide ${
                filter === f ? "border-accent bg-accent text-accent-foreground" : "border-border"
              }`}
            >
              {f}
            </button>
          ))}
          <label htmlFor="pf-location" className="sr-only">Filter by location</label>
          <select id="pf-location" value={location} onChange={(e) => setLocation(e.target.value)} className={select}>
            {locations.map((l) => (
              <option key={l} value={l}>{l === "All" ? "All locations" : l}</option>
            ))}
          </select>
          <label htmlFor="pf-year" className="sr-only">Filter by year</label>
          <select id="pf-year" value={year} onChange={(e) => setYear(e.target.value)} className={select}>
            {years.map((y) => (
              <option key={y} value={y}>{y === "All" ? "All years" : y}</option>
            ))}
          </select>
        </div>

        {list.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            No projects match those filters yet — try widening the location or year.
          </p>
        ) : null}


        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {list.map((p) => (
            <Link key={p.slug} to="/portfolio/$slug" params={{ slug: p.slug }} className="group">
              <div className="overflow-hidden">
                <img
                  src={images[p.image]}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-4">{p.type} · {p.location} · {p.year}</p>
              <h2 className="mt-2 text-2xl group-hover:text-accent">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.brief}</p>
              <p className="mt-3 font-display text-sm font-bold">{p.duration}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
