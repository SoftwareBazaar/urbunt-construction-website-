import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyActions } from "./StickyActions";
import { PromoBanner } from "./PromoBanner";
import { ChatConcierge } from "./ChatConcierge";
import { trustStats } from "@/data/site";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PromoBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyActions />
      <ChatConcierge />
    </div>
  );
}


export function TrustBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <section
      className={
        tone === "dark"
          ? "border-y border-primary-foreground/15 bg-primary text-primary-foreground"
          : "border-y border-border bg-secondary"
      }
    >
      <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {trustStats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl font-extrabold text-accent">{s.value}</p>
            <p className="mt-1 text-sm opacity-75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-x py-16 md:py-24">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">{title}</h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/75">{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-muted-foreground">{intro}</p> : null}
    </div>
  );
}
