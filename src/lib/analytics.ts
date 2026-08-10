/**
 * Lightweight analytics + conversion tracking layer.
 *
 * Works with GA4 (gtag), Meta Pixel (fbq) and any GTM dataLayer. Nothing is
 * required at build time — if no tag IDs are configured the calls are no-ops,
 * so the site never breaks when tracking is not yet connected.
 *
 * Configure in .env:
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXX
 *   VITE_META_PIXEL_ID=1234567890
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;
export const META_PIXEL_ID = import.meta.env["VITE_META_PIXEL_ID"] as string | undefined;

export type TrackPayload = Record<string, string | number | boolean | undefined>;

/** Fire a conversion / interaction event to every configured destination. */
export function track(event: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const data = { ...payload, page_path: window.location.pathname };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...data });

  window.gtag?.("event", event, data);

  if (window.fbq) {
    const standard: Record<string, string> = {
      quote_submitted: "Lead",
      whatsapp_click: "Contact",
      call_click: "Contact",
      newsletter_signup: "Subscribe",
      application_submitted: "SubmitApplication",
      estimate_completed: "InitiateCheckout",
    };
    const mapped = standard[event];
    if (mapped) window.fbq("track", mapped, data);
    else window.fbq("trackCustom", event, data);
  }
}

/** Attribution details attached to every lead so sales can see where it came from. */
export function captureSource() {
  if (typeof window === "undefined") {
    return { sourcePage: "", referrer: "", utm: {} as Record<string, string> };
  }
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 120);
  }
  try {
    const stored = window.sessionStorage.getItem("bc_utm");
    if (Object.keys(utm).length) window.sessionStorage.setItem("bc_utm", JSON.stringify(utm));
    else if (stored) Object.assign(utm, JSON.parse(stored) as Record<string, string>);
  } catch {
    /* storage unavailable */
  }
  return {
    sourcePage: window.location.pathname,
    referrer: document.referrer.slice(0, 300),
    utm,
  };
}
