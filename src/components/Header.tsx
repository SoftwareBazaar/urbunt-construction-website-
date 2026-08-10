import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { company, packages, services, serviceGroups, whatsappLink } from "@/data/site";

const nav = [
  { label: "Full Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Packages & Pricing", to: "/pricing" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Offers", to: "/promotions" },
  { label: "Financing", to: "/financing" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];


export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<null | "projects" | "services">(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container-x flex h-9 items-center justify-between text-[13px]">
          <p className="opacity-80">{company.tagline}</p>
          <div className="flex items-center gap-5">
            <a href={company.phoneHref} className="inline-flex items-center gap-1.5 hover:text-gold">
              <Phone className="size-3.5" /> {company.phone}
            </a>
            <a
              href={whatsappLink("Hello Urban T, I'd like to talk about a project.")}
              target="_blank"
              rel="noreferrer"
              className="text-whatsapp hover:underline"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src="/urban-t-logo.png"
            alt="Urban T Construction Co."
            className="h-10 w-auto object-contain md:h-12"
            width={256}
            height={256}
            style={{ mixBlendMode: 'multiply' }}
            onError={(e) => {
              // Fallback to styled text if logo image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="flex flex-col -space-y-0.5">
            <span className="font-display text-sm font-bold leading-tight text-foreground md:text-base">
              Urban T Construction
            </span>
            <span className="text-[10px] text-muted-foreground md:text-xs">
              Built by Algos
            </span>
          </div>
          <div className="hidden items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center bg-accent text-accent-foreground md:h-16 md:w-16">
              <span className="font-display text-2xl font-bold md:text-3xl">UT</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold leading-none md:text-xl">Urban T</span>
              <span className="text-xs text-muted-foreground md:text-sm">Construction Co.</span>
            </div>
          </div>
          <span className="sr-only">Urban T Construction Co.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMega(null)}>
          {nav.map((item) => {
            const isMega = item.to === "/projects" || item.to === "/services";
            return (
              <div key={item.to} className="relative">
                <Link
                  to={item.to}
                  onMouseEnter={() =>
                    setMega(isMega ? (item.to === "/projects" ? "projects" : "services") : null)
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
                  activeProps={{ className: "text-accent" }}
                >
                  {item.label}
                  {isMega ? <ChevronDown className="size-3.5 opacity-60" /> : null}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/portal"
            className="hidden px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-accent md:inline-flex"
          >
            Client Portal
          </Link>
          <Link
            to="/contact"
            className="hidden bg-accent px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Get a Free Quote
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center border border-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mega ? (
        <div
          className="absolute inset-x-0 hidden border-y border-border bg-card shadow-lg lg:block"
          onMouseEnter={() => setMega(mega)}
          onMouseLeave={() => setMega(null)}
        >
          <div className="container-x grid gap-8 py-8 md:grid-cols-4">
            {mega === "projects"
              ? packages.map((p) => (
                  <Link
                    key={p.slug}
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setMega(null)}
                    className="group"
                  >
                    <h3 className="text-sm font-bold group-hover:text-accent">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                  </Link>
                ))
              : serviceGroups.map((group) => (
                  <div key={group}>
                    <p className="eyebrow">{group}</p>
                    <ul className="mt-3 space-y-1.5">
                      {services
                        .filter((s) => s.group === group)
                        .map((s) => (
                          <li key={s.slug}>
                            <Link
                              to="/services/$slug"
                              params={{ slug: s.slug }}
                              onClick={() => setMega(null)}
                              className="text-sm text-foreground/80 hover:text-accent"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="container-x flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 font-display text-base font-bold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-accent px-4 py-3 text-center font-display font-bold uppercase text-accent-foreground"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
