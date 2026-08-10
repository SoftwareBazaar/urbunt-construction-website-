import { useMemo, useState } from "react";
import { Check, ArrowRight, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { packages, services, whatsappLink } from "@/data/site";
import { submitLead } from "@/lib/leads.functions";
import { captureSource, track as trackEvent } from "@/lib/analytics";

const steps = ["What you need", "Project details", "Your contact"] as const;

export function QuoteForm({ preselect }: { preselect?: string }) {
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState<"full" | "trades">(preselect ? "trades" : "full");
  const [pkg, setPkg] = useState(packages[0]?.slug ?? "");
  const [picked, setPicked] = useState<string[]>(preselect ? [preselect] : []);
  const [details, setDetails] = useState({ location: "", stage: "Planning", size: "", notes: "" });
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);


  const bundle = track === "trades" && picked.length >= 2;
  const discount = useMemo(() => {
    if (!bundle) return 0;
    return Math.min(12, 4 + (picked.length - 2) * 2);
  }, [bundle, picked.length]);

  const toggle = (slug: string) =>
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  const summary =
    track === "full"
      ? packages.find((p) => p.slug === pkg)?.name ?? ""
      : picked.map((s) => services.find((x) => x.slug === s)?.name).join(", ");

  const message = `Hi Urban T, I'd like a quote.
Type: ${track === "full" ? "Full project package" : "Individual services"}
Scope: ${summary || "—"}
Location: ${details.location || "—"}
Stage: ${details.stage}
Size/scale: ${details.size || "—"}
Notes: ${details.notes || "—"}
Name: ${contact.name || "—"} | Phone: ${contact.phone || "—"}${discount ? `\nBundle discount eligible: ${discount}%` : ""}`;

  if (sent) {
    return (
      <div className="surface-card p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="size-6" />
        </span>
        <h3 className="mt-4 text-2xl">Request received</h3>
        <p className="mt-2 text-muted-foreground">
          A project manager will respond within 15 minutes during business hours. For the fastest
          reply, send the same details straight to WhatsApp.
        </p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("whatsapp_click", { from: "quote_confirmation" })}
          className="mt-6 inline-flex items-center gap-2 bg-whatsapp px-5 py-3 font-display text-sm font-bold uppercase text-whatsapp-foreground"
        >
          <MessageCircle className="size-4" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      className="surface-card p-6 md:p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        if (step < 2) {
          setStep(step + 1);
          return;
        }
        setSaving(true);
        setSaveError(null);
        const src = captureSource();
        try {
          await submitLead({
            data: {
              kind: "quote",
              track,
              packageSlug: track === "full" ? pkg : undefined,
              serviceSlugs: track === "trades" ? picked : [],
              bundleDiscount: discount,
              location: details.location,
              stage: details.stage,
              size: details.size,
              notes: details.notes,
              name: contact.name.trim(),
              phone: contact.phone.trim(),
              email: contact.email.trim() || undefined,
              sourcePage: src.sourcePage,
              sourceChannel: "web",
              referrer: src.referrer,
              utm: src.utm,
            },
          });
          trackEvent("quote_submitted", {
            track,
            services: picked.length,
            bundle_discount: discount,
          });
          setSent(true);
        } catch {
          setSaveError(
            "We couldn't save your request just now — send it on WhatsApp and we'll pick it up instantly.",
          );
        } finally {
          setSaving(false);
        }
      }}
    >
      <div className="flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <div className="flex-1">
              <div
                className={`h-1 w-full ${i <= step ? "bg-accent" : "bg-border"}`}
                aria-hidden
              />
              <p
                className={`mt-2 font-display text-xs font-bold uppercase tracking-wide ${
                  i <= step ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {i + 1}. {s}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 space-y-5">
        {step === 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              {(["full", "trades"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrack(t)}
                  className={`border p-4 text-left transition-colors ${
                    track === t ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                  }`}
                >
                  <p className="font-display font-bold">
                    {t === "full" ? "Full project" : "Individual services"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t === "full" ? "Turnkey, one contract" : "One or more trades"}
                  </p>
                </button>
              ))}
            </div>

            {track === "full" ? (
              <div>
                <label className="text-sm font-medium" htmlFor="pkg">Which package?</label>
                <select
                  id="pkg"
                  value={pkg}
                  onChange={(e) => setPkg(e.target.value)}
                  className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"
                >
                  {packages.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium">Select the trades you need</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => toggle(s.slug)}
                      className={`border px-3 py-1.5 text-sm transition-colors ${
                        picked.includes(s.slug)
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
                {bundle ? (
                  <p className="mt-4 flex items-center gap-2 bg-gold/25 px-3 py-2 text-sm font-medium">
                    <Sparkles className="size-4 text-accent" />
                    Bundle discount applied: {discount}% off with {picked.length} services.
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Planning more than one job? Add a second service and a bundle discount applies
                    automatically.
                  </p>
                )}
              </div>
            )}
          </>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Location" value={details.location} onChange={(v) => setDetails({ ...details, location: v })} placeholder="Karen, Nairobi" />
            <div>
              <label className="text-sm font-medium" htmlFor="stage">Stage</label>
              <select
                id="stage"
                value={details.stage}
                onChange={(e) => setDetails({ ...details, stage: e.target.value })}
                className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"
              >
                {["Planning", "Have land", "Have drawings", "Ready to build", "Urgent repair"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <Field label="Size / scale" value={details.size} onChange={(v) => setDetails({ ...details, size: v })} placeholder="e.g. 220 m², 4 bedrooms" />
            <div className="sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="notes">Anything else?</label>
              <textarea
                id="notes"
                rows={3}
                value={details.notes}
                onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"
                placeholder="Budget range, target start date, drawings available…"
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} placeholder="Jane Mwangi" />
            <Field label="Phone / WhatsApp" required value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="+254 7…" />
            <div className="sm:col-span-2">
              <Field label="Email (optional)" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="you@email.com" />
            </div>
            <p className="text-sm text-muted-foreground sm:col-span-2">
              Requesting: <span className="font-medium text-foreground">{summary || "—"}</span>
              {discount ? ` · ${discount}% bundle discount` : ""}
            </p>
          </div>
        ) : null}
      </div>

      {saveError ? (
        <p className="mt-6 border border-accent/40 bg-accent/10 p-3 text-sm">
          {saveError}{" "}
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", { from: "quote_form_fallback" })}
            className="font-bold underline"
          >
            Open WhatsApp
          </a>
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground disabled:opacity-40"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-accent disabled:opacity-60 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          {saving ? "Sending…" : step === 2 ? "Send request" : "Continue"}{" "}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={id}>{label}</label>
      <input
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"
      />
    </div>
  );
}
