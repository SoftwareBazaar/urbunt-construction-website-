import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import civil from "@/assets/project-civil.jpg";
import { socialPosts, socials } from "@/data/site";
import { SectionHeading } from "./SiteLayout";

const images: Record<string, string> = { residential, commercial, civil };

export function SocialFeed({
  eyebrow = "From the sites",
  title = "Follow the work as it happens.",
  intro = "Daily pours, snagging walk-throughs and drone passes — published across our channels the same week they are shot.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="container-x py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <div className="flex flex-wrap gap-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="border border-border px-3 py-2 font-display text-xs font-bold uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {socialPosts.map((p, i) => (
          <a
            key={i}
            href={socials.find((s) => s.name === p.channel)?.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden"
          >
            <img
              src={images[p.image]}
              alt={p.caption}
              loading="lazy"
              width={640}
              height={640}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex flex-col justify-end bg-primary/75 p-3 text-xs text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-display font-bold uppercase tracking-wide text-gold">
                {p.channel}
              </span>
              <span className="mt-1">{p.caption}</span>
              <span className="mt-1 opacity-70">{p.meta}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
