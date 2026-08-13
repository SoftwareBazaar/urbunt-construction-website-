import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Quote } from "lucide-react";
import heroImg from "@/assets/hero-site.jpg";

import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import civil from "@/assets/project-civil.jpg";
import makueniAerial from "@/assets/makueni-school-aerial-view.jpg";
import { SiteLayout, TrustBar, SectionHeading } from "@/components/SiteLayout";
import { BeforeAfter } from "@/components/BeforeAfter";
import { SocialFeed } from "@/components/SocialFeed";
import { packages, pillars, projects, promotions, services, testimonials, whatsappLink } from "@/data/site";
import { posts } from "@/data/blog";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";


const images: Record<string, string> = { residential, commercial, civil, makueni: makueniAerial };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Urban T Construction Co. | Full-Service Construction, Nairobi" },
      {
        name: "description",
        content:
          "From architecture and BOQ to finishing — turnkey builds and single trades. Transparent pricing, fixed timelines, quotes on WhatsApp in minutes.",
      },
      { property: "og:title", content: "Urban T Construction Co. | Full-Service Construction, Nairobi" },
      {
        property: "og:description",
        content: "From architecture and BOQ to finishing — turnkey builds and single trades. Transparent pricing, fixed timelines, quotes on WhatsApp in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: homepageContent } = useWebsiteContent("homepage");

  const heroTitle = homepageContent?.hero_title || "From foundation to finishing — built on a price you can audit.";
  const heroSubtitle = homepageContent?.hero_subtitle || "Turnkey contracts and single-trade jobs from the same crew. BOQ-based pricing, contracted completion dates, and a 96% on-time handover record.";
  const heroCta = homepageContent?.hero_cta || "Start a full project";

  return (
    <SiteLayout>
      <section className="relative isolate min-h-[600px] overflow-hidden lg:h-[86vh] lg:max-h-[860px] lg:min-h-[640px]">
        <video
          className="absolute inset-0 -z-10 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          aria-hidden="true"
        >
          <source src="/urban-t-hero.webm" type="video/webm" />
          <source src="/urban-t-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />

        <div className="container-x flex h-full min-h-[600px] flex-col justify-end pb-14 pt-28 text-primary-foreground">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">One company, every trade</p>
            <h1 className="mt-3 text-[2rem] leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              {heroTitle.split("—")[0]}— <span className="text-gold">{heroTitle.split("—")[1] || "built on a price you can audit."}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-primary-foreground/75 md:text-[1.05rem]">
              {heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-accent px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                {heroCta} <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-primary-foreground/40 px-6 py-4 font-display text-sm font-bold uppercase tracking-wide transition-colors hover:bg-primary-foreground/10"
              >
                Book a single trade
              </Link>
              <a
                href={whatsappLink("Hi Urban T, I saw your site and need a quote.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-whatsapp-foreground transition-transform hover:-translate-y-0.5"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Promo ribbon */}
      <section className="rule-accent">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-4 text-accent-foreground">
          <p className="font-display text-sm font-bold uppercase tracking-wide">
            Live offer · {promotions[3]?.title}: {promotions[3]?.reward}
          </p>
          <Link to="/promotions" className="text-sm font-semibold underline underline-offset-4">
            See all offers
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Why Urban T"
          title="Three promises, printed in every contract."
          intro="Affordability, quality and time of completion are not slogans here — each one has a proof point you can check before you sign."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="surface-card p-7">
              <div className="rule-accent h-1 w-12" />
              <h3 className="mt-5 text-2xl">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Dual track */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="border border-primary-foreground/20 p-8">
            <p className="eyebrow text-gold">Tier A</p>
            <h2 className="mt-3 text-3xl">Full turnkey packages</h2>
            <p className="mt-3 text-primary-foreground/75">
              One contract, one project manager, concept to keys-in-hand.
            </p>
            <ul className="mt-6 divide-y divide-primary-foreground/15">
              {packages.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="flex items-center justify-between gap-4 py-3.5 hover:text-gold"
                  >
                    <span className="font-display font-bold">{p.name}</span>
                    <span className="text-sm text-primary-foreground/60">{p.from}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-primary-foreground/20 p-8">
            <p className="eyebrow text-gold">Tier B</p>
            <h2 className="mt-3 text-3xl">Individual trades</h2>
            <p className="mt-3 text-primary-foreground/75">
              Just need an electrician? Find, price and book one trade in under two minutes.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="border border-primary-foreground/20 px-3 py-2.5 text-sm transition-colors hover:border-gold hover:text-gold"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Recent work"
            title="Projects you can visit, references you can call."
          />
          <Link to="/portfolio" className="font-display text-sm font-bold uppercase text-accent">
            View all projects →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
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
              <p className="eyebrow mt-4">{p.type} · {p.location}</p>
              <h3 className="mt-2 text-xl group-hover:text-accent">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.duration}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-secondary py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Before / after"
              title="Drag to see what finishing actually changes."
              intro="Every completed project gets a documented before-and-after set, a BOQ summary and a client reference — the same file we hand to your next lender or tenant."
            />
            <Link
              to="/portfolio"
              className="mt-6 inline-flex items-center gap-2 bg-accent px-6 py-3.5 font-display text-sm font-bold uppercase text-accent-foreground"
            >
              Browse case studies <ArrowRight className="size-4" />
            </Link>
          </div>
          <BeforeAfter image={residential} alt="Karen Signature Villa" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x py-20">
        <SectionHeading eyebrow="Client voices" title="Reputation earned one handover at a time." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.author} className="surface-card flex h-full flex-col p-7">
              <Quote className="size-6 text-accent" />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-2 font-display font-bold">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <SocialFeed />

      {/* Resources */}
      <section className="bg-secondary py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Blog & resources"
              title="Know the numbers before you sign anything."
              intro="Cost guides, BOQ explainers and approval timelines written by the people who price and build the work."
            />
            <Link to="/blog" className="font-display text-sm font-bold uppercase text-accent">
              All resources →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="surface-card group flex h-full flex-col p-7"
              >
                <p className="eyebrow">{p.category} · {p.readMinutes} min</p>
                <h3 className="mt-3 text-xl group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Estimate teaser */}
      <section className="container-x pb-24">
        <div className="grid gap-8 bg-primary p-10 text-primary-foreground md:grid-cols-[2fr_1fr] md:items-center md:p-14">
          <div>
            <p className="eyebrow text-gold">Instant estimate</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Get a rough build cost in 60 seconds.</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/75">
              Enter project type, size and finish level — we return an indicative range from our live
              BOQ rates, with any eligible promotion already applied.
            </p>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-gold-foreground"
          >
            Open the estimator <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
