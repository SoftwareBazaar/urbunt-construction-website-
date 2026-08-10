import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Tag } from "lucide-react";
import { promotions } from "@/data/site";

const KEY = "bc-promo-dismissed";

export function PromoBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(KEY) !== "1") setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const promo = promotions[3] ?? promotions[0];
  if (!show || !promo) return null;


  return (
    <div className="rule-accent">
      <div className="container-x flex items-center gap-3 py-2.5 text-accent-foreground">
        <Tag className="hidden size-4 shrink-0 sm:block" />
        <p className="flex-1 text-sm font-semibold">
          <span className="font-display uppercase tracking-wide">{promo.title}:</span> {promo.reward} —{" "}
          <span className="opacity-80">{promo.validity}</span>{" "}
          <Link to="/promotions" className="underline underline-offset-4">
            see terms
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss offer banner"
          onClick={() => {
            setShow(false);
            try {
              window.sessionStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
          }}
          className="shrink-0 rounded-sm p-1 transition-opacity hover:opacity-70"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
