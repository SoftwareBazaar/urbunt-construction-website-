import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { submitLead } from "@/lib/leads.functions";
import { captureSource, track } from "@/lib/analytics";

/**
 * Captures the estimator result as a real lead and sends the same summary to
 * WhatsApp, so a rough estimate always becomes a conversation.
 */
export function EstimateCapture({
  type,
  tier,
  area,
  low,
  high,
  formatted,
}: {
  type: string;
  tier: string;
  area: number;
  low: number;
  high: number;
  formatted: string;
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summary = `Hi Urban T, here's my estimate summary.
Project: ${type} · ${tier} finish · ${area} m²
Indicative range: ${formatted}
Name: ${form.name || "—"} | Phone: ${form.phone || "—"}
Please send the detailed BOQ.`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2 || !/^[+\d][\d\s-]{6,19}$/.test(form.phone.trim())) {
      setError("Enter your name and a valid phone number.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const src = captureSource();
      await submitLead({
        data: {
          kind: "estimate",
          track: "full",
          location: undefined,
          stage: "Estimator",
          size: `${area} m²`,
          notes: `${type} · ${tier} finish · indicative ${formatted}`,
          estimateLow: Math.round(low),
          estimateHigh: Math.round(high),
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          sourcePage: src.sourcePage,
          sourceChannel: "estimator",
          referrer: src.referrer,
          utm: src.utm,
        },
      });
      track("estimate_completed", { type, tier, area });
      setSent(true);
    } catch {
      setError("Couldn't send that — please use WhatsApp below.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="mt-6 border border-primary-foreground/25 p-4 text-sm">
        <p className="flex items-center gap-2 text-gold">
          <Check className="size-4" /> Estimate summary saved — a quantity surveyor will call you back.
        </p>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { from: "estimator" })}
          className="mt-3 inline-flex items-center gap-2 bg-whatsapp px-4 py-2.5 font-display text-xs font-bold uppercase text-whatsapp-foreground"
        >
          <MessageCircle className="size-4" /> Get it on WhatsApp now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 border border-primary-foreground/25 p-4">
      <p className="font-display text-sm font-bold">Send me this estimate + full BOQ</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <input
          aria-label="Your name"
          value={form.name}
          maxLength={100}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          className="border border-primary-foreground/25 bg-transparent px-3 py-2.5 text-sm placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none"
        />
        <input
          aria-label="Phone or WhatsApp number"
          value={form.phone}
          maxLength={20}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+254…"
          className="border border-primary-foreground/25 bg-transparent px-3 py-2.5 text-sm placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none"
        />
        <input
          aria-label="Email (optional)"
          type="email"
          value={form.email}
          maxLength={255}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email (optional)"
          className="border border-primary-foreground/25 bg-transparent px-3 py-2.5 text-sm placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none sm:col-span-2"
        />
      </div>
      {error ? <p className="mt-2 text-xs text-gold">{error}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={busy}
          className="bg-accent px-5 py-2.5 font-display text-xs font-bold uppercase text-accent-foreground disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send my estimate"}
        </button>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { from: "estimator" })}
          className="inline-flex items-center gap-2 bg-whatsapp px-5 py-2.5 font-display text-xs font-bold uppercase text-whatsapp-foreground"
        >
          <MessageCircle className="size-4" /> WhatsApp it
        </a>
      </div>
    </form>
  );
}
