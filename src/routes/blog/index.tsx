import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import civil from "@/assets/project-civil.jpg";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { posts, postCategories } from "@/data/blog";

const images: Record<string, string> = { residential, commercial, civil };

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Construction Guides & Resources | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Build cost guides, BOQ explainers, county approval timelines, maintenance checklists and project spotlights from a working Nairobi contractor.",
      },
      { property: "og:title", content: "Construction Guides & Resources | Urban T Construction Co." },
      {
        property: "og:description",
        content: "Cost guides, approval timelines and project spotlights from our site teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [cat, setCat] = useState<(typeof postCategories)[number]>("All");
  const list = posts.filter((p) => cat === "All" || p.category === cat);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog & resources"
        title="What a build actually costs, and how it actually runs."
        intro="Written by the quantity surveyors, engineers and foremen doing the work — not by a marketing department."
      />
      <div className="container-x py-16">
        <div className="flex flex-wrap gap-2">
          {postCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`border px-4 py-2 font-display text-sm font-bold uppercase tracking-wide ${
                cat === c ? "border-accent bg-accent text-accent-foreground" : "border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col">
              <div className="overflow-hidden">
                <img
                  src={images[p.image]}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-4">
                {p.category} · {p.readMinutes} min read
              </p>
              <h2 className="mt-2 text-xl group-hover:text-accent">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-accent">
                Read guide →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
