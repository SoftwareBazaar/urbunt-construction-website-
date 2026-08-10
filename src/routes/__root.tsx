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
      { title: "Urban T Construction Co. | Full-Service Construction, Nairobi" },
      {
        name: "description",
        content:
          "From architecture and BOQ to finishing — turnkey builds and single trades. Transparent pricing, fixed timelines, quotes on WhatsApp in minutes.",
      },
      { name: "author", content: "Urban T Construction Co." },
      { property: "og:title", content: "Urban T Construction Co. | Full-Service Construction, Nairobi" },
      {
        property: "og:description",
        content: "From architecture and BOQ to finishing — turnkey builds and single trades. Transparent pricing, fixed timelines, quotes on WhatsApp in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Urban T Construction Co. | Full-Service Construction, Nairobi" },
      { name: "twitter:description", content: "From architecture and BOQ to finishing — turnkey builds and single trades. Transparent pricing, fixed timelines, quotes on WhatsApp in minutes." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a26e3360-6f1d-43a5-92f6-20e3a1ca9952/id-preview-77db58ef--2840d4f0-83f2-4534-9cd7-36f90ace2a47.lovable.app-1785559674698.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a26e3360-6f1d-43a5-92f6-20e3a1ca9952/id-preview-77db58ef--2840d4f0-83f2-4534-9cd7-36f90ace2a47.lovable.app-1785559674698.png" },
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
          email: "info@urbantconstruction.co.ke",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Westlands Business Park",
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
