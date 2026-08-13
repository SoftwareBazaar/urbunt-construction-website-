import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { QuoteForm } from "@/components/QuoteForm";
import { SocialFeed } from "@/components/SocialFeed";

import { whatsappLink } from "@/data/site";
import { useCompanyInfo, useWebsiteContent } from "@/hooks/useWebsiteContent";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a Free Quote | Contact Urban T Construction Co." },
      {
        name: "description",
        content:
          "Request a quote in three short steps, chat on WhatsApp, or call us directly. Median first response under 5 minutes during business hours.",
      },
      { property: "og:title", content: "Get a Free Quote | Urban T Construction Co." },
      { property: "og:description", content: "WhatsApp, call or request a multi-service quote with automatic bundle discounts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { company } = useCompanyInfo();
  const { data: contactContent } = useWebsiteContent("contact");

  const pageTitle = contactContent?.title || "Tell us the job. We'll come back with a number.";
  const pageSubtitle = contactContent?.subtitle || "Three short steps. Select a full package or as many individual trades as you need — bundle discounts are calculated as you go.";

  const channels = [
    {
      icon: MessageCircle,
      title: "WhatsApp (fastest)",
      detail: "Median reply in 4 minutes, business hours.",
      action: { label: "Open WhatsApp", href: whatsappLink("Hi Urban T, I'd like a quote.") },
    },
    {
      icon: Phone,
      title: "Call us",
      detail: company.phone,
      action: { label: "Call now", href: company.phoneHref },
    },
    {
      icon: Mail,
      title: "Email",
      detail: company.email,
      action: { label: "Send email", href: `mailto:${company.email}` },
    },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact & quotes"
        title={pageTitle}
        intro={pageSubtitle}
      />

      <section className="container-x pt-16">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="surface-card overflow-hidden">
            <iframe
              title="Urban T Construction Co. office location map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.75%2C-1.34%2C36.90%2C-1.24&layer=mapnik&marker=-1.2921%2C36.8219"
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="surface-card p-6">
            <p className="eyebrow">Office & response times</p>
            <p className="mt-3 flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" /> {company.address}
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" /> Mon–Fri 7:30am–6pm · Sat 8am–2pm ·
              Sun emergencies only
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <li>WhatsApp — under 5 minutes (business hours)</li>
              <li>Phone — answered live, or callback within 30 minutes</li>
              <li>Email & web form — same working day</li>
              <li>After hours — auto-reply with next available slot</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="space-y-4">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.action.href}
                target={c.action.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="surface-card flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="flex size-11 items-center justify-center bg-secondary text-accent">
                  <c.icon className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-display font-bold">{c.title}</span>
                  <span className="block text-sm text-muted-foreground">{c.detail}</span>
                </span>
                <span className="font-display text-sm font-bold uppercase text-accent">
                  {c.action.label} →
                </span>
              </a>
            ))}
          </div>

          <div className="surface-card mt-6 p-6">
            <p className="font-display font-bold">Office & hours</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" /> {company.address}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-accent" /> {company.hours}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              After hours, WhatsApp messages receive an automatic reply with the next available
              call-back slot. Emergency leaks and electrical faults are dispatched 24/7.
            </p>
          </div>

          <iframe
            title="Urban T Construction Co. office location"
            className="mt-6 aspect-[4/3] w-full border border-border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=36.78%2C-1.29%2C36.83%2C-1.25&layer=mapnik"
          />
        </div>

        <QuoteForm />
      </div>

      <SocialFeed
        eyebrow="Social channels"
        title="Reach us where you already are."
        intro="Every channel is monitored during business hours. WhatsApp remains the fastest route to a human."
      />
    </SiteLayout>

  );
}
