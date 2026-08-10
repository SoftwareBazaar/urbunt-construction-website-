import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, HardHat, Award, Users } from "lucide-react";
import heroImg from "@/assets/hero-site.jpg";
import { SiteLayout, PageHero, TrustBar, SectionHeading } from "@/components/SiteLayout";
import { pillars } from "@/data/site";

const team = [
  { name: "Eng. Daniel Kimani", role: "Managing Director & Structural Engineer", note: "18 years, 540+ projects delivered." },
  { name: "Ar. Mercy Wanjiru", role: "Head of Architecture & BOQ", note: "Leads design, costing and county approvals." },
  { name: "Peter Odhiambo", role: "Head of Projects", note: "Programme control and on-site quality." },
  { name: "Faith Cherono", role: "Client Care & WhatsApp Desk", note: "Median first response: 4 minutes." },
];

const credentials = [
  { icon: ShieldCheck, title: "NCA 1 registered", detail: "Cleared for unlimited-value building works." },
  { icon: Award, title: "EPRA-licensed electrical", detail: "Certified installations and sign-off." },
  { icon: HardHat, title: "Zero lost-time injuries, 2025", detail: "Documented safety inductions on every site." },
  { icon: Users, title: "Contractors all-risk insured", detail: "Works, third-party and workmen's cover." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Urban T Construction Co. | Licensed Builders & Engineers" },
      {
        name: "description",
        content:
          "18 years, 540+ completed projects, NCA 1 registered and fully insured. Meet the engineers, architects and project managers behind Urban T Construction Co.",
      },
      { property: "og:title", content: "About Urban T Construction Co." },
      { property: "og:description", content: "Licensed engineers and architects, documented safety record, 96% on-time handover." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="A contractor built like an engineering firm."
        intro="Urban T Construction Co. started as a two-man masonry crew in 2008. Today we run architecture, every core trade and post-construction handover under one roof — with the documentation culture of a firm three times our size."
      />
      <TrustBar />

      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <img
            src={heroImg}
            alt="Urban T crew on site during a villa build"
            loading="lazy"
            width={1920}
            height={1088}
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="We grew by refusing to hand off the hard parts."
              intro="Most contractors subcontract the trades that carry the most risk — MEP, roofing, finishes. We built those crews in-house instead, which is why we can hold a completion date and a price at the same time."
            />
            <div className="mt-8 space-y-5">
              {pillars.map((p) => (
                <div key={p.title} className="border-l-2 border-accent pl-4">
                  <p className="font-display font-bold">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Leadership" title="The people who sign off your work." />
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {team.map((t) => (
              <article key={t.name} className="surface-card p-6">
                <div className="rule-accent h-1 w-10" />
                <p className="mt-4 font-display text-lg font-bold">{t.name}</p>
                <p className="text-sm text-accent">{t.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading eyebrow="Certifications & safety" title="Credentials, on the record." />
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {credentials.map((c) => (
            <article key={c.title} className="surface-card p-6">
              <c.icon className="size-6 text-accent" />
              <p className="mt-4 font-display font-bold">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="flex flex-col items-start gap-6 bg-primary p-10 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-3xl">Careers & subcontractor network</h2>
            <p className="mt-2 max-w-xl text-primary-foreground/75">
              We are continuously onboarding skilled artisans, site supervisors and specialist
              subcontractors as demand grows. Send your trade, years of experience and references.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-accent px-6 py-3.5 font-display text-sm font-bold uppercase text-accent-foreground"
          >
            Apply to join
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
