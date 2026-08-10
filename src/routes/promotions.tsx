import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { promotions, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Promotions, Bonuses & Referral Rewards | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Bundle discounts up to 12%, turnkey signing bonuses, referral rewards, dry-season roofing offers and loyalty tiers — with clear terms and validity dates.",
      },
      { property: "og:title", content: "Promotions & Offers | Urban T Construction Co." },
      { property: "og:description", content: "Transparent construction discounts, bonuses and referral rewards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Promotions,
});

function Promotions() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Promotions & offers"
        title="Discounts with terms you can read in one sitting."
        intro="Every offer below is logged in our quoting system, so eligible discounts are applied to your estimate automatically — no haggling, no pricing errors."
      />
      <div className="container-x grid gap-6 py-16 md:grid-cols-2">
        {promotions.map((p) => (
          <article key={p.title} className="surface-card flex flex-col p-8">
            <div className="rule-accent h-1 w-12" />
            <h2 className="mt-5 text-2xl">{p.title}</h2>
            <p className="mt-2 font-display text-3xl font-extrabold text-accent">{p.reward}</p>
            <p className="mt-3 flex-1 text-muted-foreground">{p.mechanic}</p>
            <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
              Valid: {p.validity}
            </p>
          </article>
        ))}
      </div>
      <section className="container-x pb-24">
        <div className="flex flex-col items-start gap-6 bg-primary p-10 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-3xl">Claim an offer in one message.</h2>
            <p className="mt-2 text-primary-foreground/75">
              Tell us the trade or package and we'll confirm which discounts you qualify for.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink("Hi Urban T, which promotions do I qualify for?")}
              target="_blank"
              rel="noreferrer"
              className="bg-whatsapp px-6 py-3.5 font-display text-sm font-bold uppercase text-whatsapp-foreground"
            >
              Ask on WhatsApp
            </a>
            <Link
              to="/contact"
              className="bg-gold px-6 py-3.5 font-display text-sm font-bold uppercase text-gold-foreground"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
