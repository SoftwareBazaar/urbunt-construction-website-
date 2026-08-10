import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { subscribeNewsletter } from "@/lib/leads.functions";
import { captureSource, track } from "@/lib/analytics";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const value = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) || value.length > 255) {
          setError("Enter a valid email address.");
          return;
        }
        setError(null);
        setBusy(true);
        try {
          const src = captureSource();
          await subscribeNewsletter({ data: { email: value, sourcePage: src.sourcePage } });
          track("newsletter_signup");
          setDone(true);
          setEmail("");
        } catch {
          setError("Something went wrong. Please try again.");
        } finally {
          setBusy(false);
        }
      }}
      className="mt-6 border border-primary-foreground/20 p-4"
    >
      <p className="font-display text-sm font-bold">Site notes, monthly</p>
      <p className="mt-1 text-xs text-primary-foreground/70">
        Cost guides, new case studies and seasonal offers. No spam, unsubscribe anytime.
      </p>
      {done ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-gold">
          <Check className="size-4" /> You're on the list.
        </p>
      ) : (
        <>
          <div className="mt-3 flex">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              maxLength={255}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="min-w-0 flex-1 border border-primary-foreground/25 bg-transparent px-3 py-2.5 text-sm placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              aria-label="Subscribe to the newsletter"
              className="inline-flex items-center gap-1.5 bg-accent px-4 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
            >
              <Mail className="size-4" />
            </button>
          </div>
          {error ? <p className="mt-2 text-xs text-accent">{error}</p> : null}
        </>
      )}
    </form>
  );
}
