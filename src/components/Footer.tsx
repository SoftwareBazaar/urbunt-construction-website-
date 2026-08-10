import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Newsletter } from "./Newsletter";
import { company, packages, services, socials, whatsappLink } from "@/data/site";


export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="inline-flex items-center justify-center rounded-lg bg-primary-foreground p-3 shadow-lg shadow-black/10">
            <img
              src="/urban-t-logo.png"
              alt="Urban T Construction Co. logo"
              className="h-20 w-auto md:h-24"
              width={256}
              height={256}
            />
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">{company.tagline}</p>
          <p className="mt-2 text-xs text-primary-foreground/50">Built by Algos</p>
          <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
            <a href={company.phoneHref} className="flex items-center gap-2 hover:text-gold">
              <Phone className="size-4" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-gold">
              <Mail className="size-4" /> {company.email}
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="size-4" /> {company.address}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="size-4" /> {company.hours}
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold">Full Projects</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {packages.map((p) => (
              <li key={p.slug}>
                <Link to="/projects/$slug" params={{ slug: p.slug }} className="hover:text-gold">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Services</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-primary-foreground/75 sm:grid-cols-2 md:grid-cols-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-gold">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
            <li><Link to="/pricing" className="hover:text-gold">Packages & Pricing</Link></li>
            <li><Link to="/promotions" className="hover:text-gold">Promotions & Offers</Link></li>
            <li><Link to="/financing" className="hover:text-gold">Payment Plans & Financing</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Blog & Resources</Link></li>
            <li><Link to="/careers" className="hover:text-gold">Careers & Subcontractors</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/portal" className="hover:text-gold">Client Portal</Link></li>
          </ul>
          <div className="mt-6 border border-primary-foreground/20 p-4">
            <p className="font-display text-sm font-bold">Licensed & insured</p>
            <p className="mt-1 text-xs text-primary-foreground/70">
              NCA 1 registered · Contractors all-risk insured · EPRA-licensed electrical
            </p>
          </div>
          <Newsletter />
          <a
            href={whatsappLink("Hi Urban T, I'd like a quote.")}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex bg-whatsapp px-4 py-2.5 font-display text-sm font-bold uppercase text-whatsapp-foreground"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-wrap items-center gap-x-5 gap-y-2 py-5">
          <p className="eyebrow text-gold">Follow</p>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary-foreground/75 hover:text-gold"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Urban T Construction Co. All rights reserved. Built by Algos.</p>
          <p>From Foundation to Finishing — One Company, Every Trade.</p>
        </div>
      </div>

    </footer>
  );
}
