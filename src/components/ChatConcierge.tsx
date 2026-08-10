import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { services, whatsappLink } from "@/data/site";
import { submitLead } from "@/lib/leads.functions";
import { captureSource, track } from "@/lib/analytics";

type Msg = { from: "bot" | "user"; text: string };

const urgencies = ["Emergency (today)", "This week", "This month", "Planning ahead"];
const projectTypes = ["Residential", "Commercial", "Civil / infrastructure"];
const stages = ["Just planning", "Have land", "Have drawings", "Ready to build"];

/**
 * Live chat concierge: runs the same qualification flow as the WhatsApp bot
 * (what / where / when / who), saves the lead, then hands over to a human on
 * WhatsApp with the full context pre-filled.
 */
export function ChatConcierge() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hi, I'm the Urban T concierge. What do you need help with?" },
  ]);
  const [step, setStep] = useState<
    "track" | "service" | "type" | "stage" | "location" | "urgency" | "contact" | "done"
  >("track");
  const [answers, setAnswers] = useState({
    track: "" as "" | "full" | "trades",
    service: "",
    type: "",
    stage: "",
    location: "",
    urgency: "",
    name: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [msgs, step]);

  const say = (from: Msg["from"], text: string) => setMsgs((m) => [...m, { from, text }]);

  const handoffMessage = `Hi Urban T, I chatted on your site.
Need: ${answers.track === "full" ? `Full project — ${answers.type}` : answers.service || "Single trade"}
${answers.track === "full" ? `Stage: ${answers.stage}` : `Urgency: ${answers.urgency}`}
Location: ${answers.location || "—"}
Name: ${answers.name || "—"} | Phone: ${answers.phone || "—"}`;

  function choose(value: string) {
    say("user", value);
    if (step === "track") {
      const t = value.startsWith("Full") ? "full" : "trades";
      setAnswers((a) => ({ ...a, track: t }));
      if (t === "full") {
        setStep("type");
        say("bot", "Great. What type of project is it?");
      } else {
        setStep("service");
        say("bot", "Which trade do you need?");
      }
      return;
    }
    if (step === "service") {
      setAnswers((a) => ({ ...a, service: value }));
      setStep("location");
      say("bot", "Where is the site? (area / town)");
      return;
    }
    if (step === "type") {
      setAnswers((a) => ({ ...a, type: value }));
      setStep("stage");
      say("bot", "What stage are you at?");
      return;
    }
    if (step === "stage") {
      setAnswers((a) => ({ ...a, stage: value }));
      setStep("location");
      say("bot", "Where is the site? (area / town)");
      return;
    }
    if (step === "urgency") {
      setAnswers((a) => ({ ...a, urgency: value }));
      setStep("contact");
      say("bot", "Last step — your name and phone, and a project manager will call you back.");
    }
  }

  async function finish(e: React.FormEvent) {
    e.preventDefault();
    if (answers.name.trim().length < 2 || !/^[+\d][\d\s-]{6,19}$/.test(answers.phone.trim())) return;
    setSaving(true);
    say("user", `${answers.name} · ${answers.phone}`);
    const src = captureSource();
    try {
      await submitLead({
        data: {
          kind: "chat",
          track: answers.track || "trades",
          serviceSlugs: answers.service
            ? [services.find((s) => s.name === answers.service)?.slug ?? answers.service]
            : [],
          location: answers.location,
          stage: answers.track === "full" ? answers.stage : answers.urgency,
          notes: answers.track === "full" ? `Project type: ${answers.type}` : undefined,
          name: answers.name.trim(),
          phone: answers.phone.trim(),
          sourcePage: src.sourcePage,
          sourceChannel: "chat",
          referrer: src.referrer,
          utm: src.utm,
        },
      });
      track("chat_lead_captured", { track: answers.track });
    } catch {
      /* lead still reaches us over WhatsApp below */
    }
    setSaving(false);
    setStep("done");
    say(
      "bot",
      "Got it — you're in the queue. Median first response is under 5 minutes in business hours. Continue on WhatsApp for an instant reply.",
    );
  }

  const options =
    step === "track"
      ? ["Full project (turnkey)", "Single trade"]
      : step === "service"
        ? services.map((s) => s.name)
        : step === "type"
          ? projectTypes
          : step === "stage"
            ? stages
            : step === "urgency"
              ? urgencies
              : [];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          if (!open) track("chat_opened");
        }}
        aria-label={open ? "Close chat concierge" : "Open chat concierge"}
        className="fixed bottom-20 right-6 z-40 inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] sm:bottom-32"
      >
        {open ? <X className="size-5" /> : <Bot className="size-5" />}
      </button>

      {open ? (
        <div className="fixed bottom-36 right-4 z-40 flex max-h-[70vh] w-[min(360px,calc(100vw-2rem))] flex-col border border-border bg-card shadow-[var(--shadow-lift)] sm:bottom-48">
          <header className="flex items-center gap-2 bg-primary px-4 py-3 text-primary-foreground">
            <Bot className="size-4 text-gold" />
            <p className="font-display text-sm font-bold uppercase tracking-wide">Urban T concierge</p>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={
                  m.from === "bot"
                    ? "max-w-[85%] bg-secondary px-3 py-2"
                    : "ml-auto max-w-[85%] bg-accent px-3 py-2 text-accent-foreground"
                }
              >
                {m.text}
              </p>
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-3">
            {options.length ? (
              <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
                {options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => choose(o)}
                    className="border border-border px-2.5 py-1.5 text-xs hover:border-accent"
                  >
                    {o}
                  </button>
                ))}
              </div>
            ) : null}

            {step === "location" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!answers.location.trim()) return;
                  say("user", answers.location);
                  if (answers.track === "full") {
                    setStep("contact");
                    say("bot", "Last step — your name and phone, and a project manager will call you back.");
                  } else {
                    setStep("urgency");
                    say("bot", "How soon do you need it done?");
                  }
                }}
                className="flex gap-2"
              >
                <input
                  aria-label="Site location"
                  value={answers.location}
                  maxLength={120}
                  onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                  placeholder="e.g. Karen, Nairobi"
                  className="flex-1 border border-input bg-background px-3 py-2 text-sm"
                />
                <button type="submit" className="bg-accent px-3 text-accent-foreground" aria-label="Send">
                  <Send className="size-4" />
                </button>
              </form>
            ) : null}

            {step === "contact" ? (
              <form onSubmit={finish} className="space-y-2">
                <input
                  aria-label="Your name"
                  required
                  maxLength={100}
                  value={answers.name}
                  onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full border border-input bg-background px-3 py-2 text-sm"
                />
                <div className="flex gap-2">
                  <input
                    aria-label="Phone number"
                    required
                    maxLength={20}
                    value={answers.phone}
                    onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
                    placeholder="+254…"
                    className="flex-1 border border-input bg-background px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-accent px-3 text-accent-foreground disabled:opacity-60"
                    aria-label="Submit details"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
              </form>
            ) : null}

            {step === "done" ? (
              <a
                href={whatsappLink(handoffMessage)}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp_click", { from: "concierge" })}
                className="flex items-center justify-center gap-2 bg-whatsapp py-2.5 font-display text-sm font-bold text-whatsapp-foreground"
              >
                <MessageCircle className="size-4" /> Continue on WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
