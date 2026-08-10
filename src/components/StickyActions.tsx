import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { company, whatsappLink } from "@/data/site";
import { track } from "@/lib/analytics";

export function StickyActions() {
  return (
    <>
      {/* Mobile bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card sm:hidden">
        <a
          href={company.phoneHref}
          onClick={() => track("call_click", { from: "sticky_bar" })}
          className="flex items-center justify-center gap-1.5 py-3.5 font-display text-sm font-bold"
        >
          <Phone className="size-4" /> Call
        </a>
        <a
          href={whatsappLink("Hi Urban T, I need help with a job.")}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { from: "mobile_bar" })}
          className="flex items-center justify-center gap-1.5 bg-whatsapp py-3.5 font-display text-sm font-bold text-whatsapp-foreground"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
        <Link
          to="/contact"
          className="flex items-center justify-center bg-accent py-3.5 font-display text-sm font-bold uppercase text-accent-foreground"
        >
          Get Quote
        </Link>
      </div>

      {/* Desktop floating dual action */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 sm:flex">
        <Link
          to="/contact"
          className="bg-accent px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
        >
          Get a Free Quote
        </Link>
        <a
          href={whatsappLink("Hi Urban T, I need help with a job.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Urban T on WhatsApp"
          onClick={() => track("whatsapp_click", { from: "floating_button" })}
          className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-display text-sm font-bold text-whatsapp-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="size-5" /> WhatsApp
        </a>
      </div>
      <div className="h-14 sm:hidden" />
    </>
  );
}
