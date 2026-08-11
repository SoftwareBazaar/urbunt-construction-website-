import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Urban T Construction Co. | Full-Service Construction Company in Nairobi, Kenya" },
      {
        name: "description",
        content:
          "Leading construction company in Nairobi offering turnkey builds, architecture, masonry, roofing, electrical, plumbing & finishing. NCA registered. 540+ projects completed. Get free quote on WhatsApp.",
      },
      {
        name: "keywords",
        content: "construction company Nairobi, builders Kenya, NCA registered contractor, house construction Kenya, commercial building Nairobi, turnkey construction, BOQ pricing, architecture design Kenya",
      },
      { name: "author", content: "Urban T Construction Co." },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      
      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://urbantconstruction.com/" },
      { property: "og:site_name", content: "Urban T Construction Co." },
      { property: "og:title", content: "Urban T Construction Co. | Full-Service Construction Company in Nairobi" },
      {
        property: "og:description",
        content: "From Foundation to Finishing — One Company, Every Trade. NCA registered contractor with 540+ projects. Transparent BOQ pricing & fixed timelines. Get your free quote today.",
      },
      { property: "og:image", content: "https://urbantconstruction.com/og-image.png" },
      { property: "og:image:alt", content: "Urban T Construction Co. - Full-Service Construction in Nairobi, Kenya" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_KE" },
      
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@urbantconstruction" },
      { name: "twitter:title", content: "Urban T Construction Co. | Full-Service Construction in Nairobi" },
      { name: "twitter:description", content: "From Foundation to Finishing — One Company, Every Trade. NCA registered · 540+ projects · 96% on-time completion. Get free quote on WhatsApp." },
      { name: "twitter:image", content: "https://urbantconstruction.com/og-image.png" },
      { name: "twitter:image:alt", content: "Urban T Construction Co. - Leading Construction Company in Nairobi, Kenya" },
      
      // Additional SEO
      { name: "geo.region", content: "KE-110" },
      { name: "geo.placename", content: "Nairobi" },
      { name: "geo.position", content: "-1.286389;36.817223" },
      { name: "ICBM", content: "-1.286389, 36.817223" },
      
      // Theme & Mobile
      { name: "theme-color", content: "#1a2332" },
      { name: "msapplication-TileColor", content: "#1a2332" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Urban T Construction" },
      
      // Verification (add these when ready)
      // { name: "google-site-verification", content: "your-verification-code" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      ...(import.meta.env["VITE_GA_MEASUREMENT_ID"]
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env["VITE_GA_MEASUREMENT_ID"]}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${import.meta.env["VITE_GA_MEASUREMENT_ID"]}');`,
            },
          ]
        : []),
      ...(import.meta.env["VITE_META_PIXEL_ID"]
        ? [
            {
              children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${import.meta.env["VITE_META_PIXEL_ID"]}');fbq('track','PageView');`,
            },
          ]
        : []),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          name: "Urban T Construction Co.",
          description:
            "Full-service construction company delivering turnkey contracts and individual trades with BOQ-based pricing.",
          slogan: "From Foundation to Finishing — One Company, Every Trade.",
          telephone: "+254111770039",
          email: "Urbantconstructions@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Westways arcade northern bypass",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
          areaServed: ["Nairobi", "Kiambu", "Kenya"],
          openingHours: "Mo-Sa 07:30-18:00",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "148" },
        }),
      },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
