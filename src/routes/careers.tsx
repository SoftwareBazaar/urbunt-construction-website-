import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, HardHat, Send, ShieldCheck, TrendingUp } from "lucide-react";
import { SiteLayout, PageHero, TrustBar } from "@/components/SiteLayout";
import { careerRoles, company, whatsappLink } from "@/data/site";
import { submitApplication } from "@/lib/leads.functions";
import { captureSource, track } from "@/lib/analytics";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Subcontractor Network | Urban T Construction Co." },
      {
        name: "description",
        content:
          "Join Urban T Construction Co. — site engineers, project managers, licensed electricians, quantity surveyors and pre-qualified subcontractor crews across Nairobi and Kiambu.",
      },
      { property: "og:title", content: "Careers & Subcontractor Network | Urban T Construction Co." },
      {
        property: "og:description",
        content: "Open roles and our pre-qualified subcontractor panel. Apply in two minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

const benefits = [
  { icon: ShieldCheck, title: "Safety first, in practice", body: "Full PPE issued, toolbox talks every morning and an incident record we publish internally." },
  { icon: TrendingUp, title: "Continuous work", body: "Concurrent projects across residential, commercial and civil mean crews stay booked year-round." },
  { icon: HardHat, title: "Paid on schedule", body: "Certified works are paid on a fixed monthly cycle. No chasing, no indefinite retention." },
];

export function ApplicationForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", role: careerRoles[0]?.title ?? "", years: "", note: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (form.name.trim().length < 2 || form.name.trim().length > 100) errs.push("Enter your full name (2–100 characters).");
    if (!/^[+\d][\d\s-]{6,19}$/.test(form.phone.trim())) errs.push("Enter a valid phone number.");
    if (form.note.length > 1000) errs.push("Keep your note under 1000 characters.");
    setErrors(errs);
    if (errs.length) return;

    const message = `Hi Urban T, I'd like to apply.\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nRole: ${form.role}\nExperience: ${form.years || "n/a"} years\nNote: ${form.note.trim() || "—"}`;
    try {
      const src = captureSource();
      await submitApplication({
        data: {
          applicantType: form.role.toLowerCase().includes("subcontractor") ? "subcontractor" : "individual",
          roleTitle: form.role,
          name: form.name.trim(),
          phone: form.phone.trim(),
          experience: form.years || undefined,
          message: form.note.trim() || undefined,
          sourcePage: src.sourcePage,
        },
      });
      track("application_submitted", { role: form.role });
    } catch {
      /* WhatsApp hand-off below still delivers the application */
    }
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const field = "mt-1 w-full border border-border bg-card px-3 py-2.5 text-sm focus:border-accent focus:outline-none";

  return (
    <div className="surface-card p-7">
      <p className="eyebrow">Apply</p>
      <h2 className="mt-2 text-2xl">Send your application</h2>
      {sent ? (
        <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          Application opened in WhatsApp. Attach your CV or portfolio photos in the same chat and our
          people team will respond within two working days.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="ap-name" className="font-display text-sm font-bold">Full name</label>
            <input id="ap-name" required maxLength={100} value={form.name} onChange={set("name")} className={field} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ap-phone" className="font-display text-sm font-bold">Phone</label>
              <input id="ap-phone" required maxLength={20} value={form.phone} onChange={set("phone")} placeholder="+254…" className={field} />
            </div>
            <div>
              <label htmlFor="ap-years" className="font-display text-sm font-bold">Years of experience</label>
              <input id="ap-years" type="number" min={0} max={60} value={form.years} onChange={set("years")} className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="ap-role" className="font-display text-sm font-bold">Role or trade</label>
            <select id="ap-role" value={form.role} onChange={set("role")} className={field}>
              {careerRoles.map((r) => (
                <option key={r.title} value={r.title}>{r.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ap-note" className="font-display text-sm font-bold">Anything we should know</label>
            <textarea id="ap-note" rows={4} maxLength={1000} value={form.note} onChange={set("note")} className={field} />
          </div>
          {errors.length ? (
            <ul className="space-y-1 text-sm text-accent">
              {errors.map((e) => <li key={e}>{e}</li>)}
            </ul>
          ) : null}
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 bg-accent px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground">
            <Send className="size-4" /> Submit application
          </button>
          <p className="text-xs text-muted-foreground">
            Prefer email? Send your CV to {company.email}.
          </p>
        </form>
      )}
    </div>
  );
}

function Careers() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Careers & subcontractors"
        title="Build with a contractor that keeps its crews busy."
        intro="We run concurrent residential, commercial and civil projects. That means continuous work for good people and a standing panel of pre-qualified subcontractors."
      />
      <TrustBar />

      <section className="container-x grid gap-6 py-16 md:grid-cols-3">
        {benefits.map((b) => (
          <article key={b.title} className="surface-card p-7">
            <b.icon className="size-6 text-accent" />
            <h2 className="mt-4 text-xl">{b.title}</h2>
            <p className="mt-2 text-muted-foreground">{b.body}</p>
          </article>
        ))}
      </section>

      <div className="container-x grid gap-12 pb-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-3xl">Open roles</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {careerRoles.map((r) => (
              <li key={r.title} className="py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl">{r.title}</h3>
                  <span className="border border-border bg-secondary px-2.5 py-1 text-xs font-semibold">{r.type}</span>
                  <span className="text-sm text-muted-foreground">{r.location}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{r.detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-l-4 border-accent bg-secondary p-6">
            <p className="font-display text-lg font-bold">Subcontractor pre-qualification</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Crews on our panel supply NCA registration, proof of insurance, two site references and a
              recent works portfolio. Once approved, you are invited to price packages directly from our
              BOQ rather than bidding blind.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <ApplicationForm />
        </aside>
      </div>
    </SiteLayout>
  );
}
