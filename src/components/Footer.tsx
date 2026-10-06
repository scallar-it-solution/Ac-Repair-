import { AREAS, areaPath } from "../data/areas";
import { guideBySlug, guidePath, guideShortTitle, type Guide } from "../data/guides";
import { SERVICES, servicePath } from "../data/services";
import { BRAND_DISCLAIMER, DEFAULT_WA, SITE, TEL } from "../data/site";
import { Link } from "../lib/router";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp, LogoMark } from "./Icons";

const FOOTER_GUIDES = [
  "ac-not-cooling",
  "ac-water-leakage",
  "ac-error-codes",
  "ac-gas-filling-cost",
  "ac-service-schedule",
  "ac-tonnage-guide",
]
  .map(guideBySlug)
  .filter((g): g is Guide => !!g);

const COMPANY = [
  { label: "About us", to: "/about" },
  { label: "Price list", to: "/pricing" },
  { label: "Brands we service", to: "/brands" },
  { label: "AC guides", to: "/guides" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-16 sm:grid-cols-2 md:px-8 md:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Airkraft Cooling — home">
            <LogoMark className="h-10 w-10" />
            <span>
              <span className="font-display block text-xl font-bold leading-none">Airkraft</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-brass">Cooling · Delhi NCR</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist/80">
            Same-day AC repair without the scare-sell. Split, window, inverter, cassette and VRF — diagnosed properly,
            billed on GST, warranted for 90 days.
          </p>
          <address className="mt-6 space-y-2.5 text-sm not-italic text-mist/80">
            <p className="flex items-start gap-2.5">
              <IconPin size={16} className="mt-0.5 shrink-0 text-brass" />
              <span>
                {SITE.legal}, dispatch desk {SITE.address.locality} {SITE.address.postalCode}
                <br />
                Mobile service across Delhi NCR
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <IconPhone size={16} className="shrink-0 text-brass" />
              <a href={TEL} className="tabular-nums hover:text-cream">
                {SITE.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <IconMail size={16} className="shrink-0 text-brass" />
              <a href={`mailto:${SITE.email}`} className="hover:text-cream">
                {SITE.email}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <IconClock size={16} className="shrink-0 text-brass" />
              <span>
                {SITE.hours} · {SITE.emergency}
              </span>
            </p>
          </address>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa px-5 py-2.5 text-sm">
              <IconWhatsApp size={16} /> WhatsApp
            </a>
            <a href={TEL} className="btn btn-outline-light px-5 py-2.5 text-sm">
              <IconPhone size={16} /> Call now
            </a>
          </div>
        </div>

        <FooterCol title="Services" className="lg:col-span-2">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link to={servicePath(s.slug)} className="hover:text-cream">
                {s.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Service areas" className="lg:col-span-2">
          {AREAS.map((a) => (
            <li key={a.slug}>
              <Link to={areaPath(a.slug)} className="hover:text-cream">
                AC repair {a.city}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/service-areas" className="text-brass hover:text-cream">
              All areas →
            </Link>
          </li>
        </FooterCol>

        <FooterCol title="Guides" className="lg:col-span-2">
          {FOOTER_GUIDES.map((g) => (
            <li key={g.slug}>
              <Link to={guidePath(g.slug)} className="hover:text-cream">
                {guideShortTitle(g)}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/guides" className="text-brass hover:text-cream">
              All guides →
            </Link>
          </li>
        </FooterCol>

        <FooterCol title="Company" className="lg:col-span-2">
          {COMPANY.map((c) => (
            <li key={c.to}>
              <Link to={c.to} className="hover:text-cream">
                {c.label}
              </Link>
            </li>
          ))}
        </FooterCol>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 py-6 text-xs leading-relaxed text-mist/60 md:px-8">
          <p className="max-w-4xl">{BRAND_DISCLAIMER}</p>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p suppressHydrationWarning>
              © {new Date().getFullYear()} {SITE.legal}. All rights reserved. GST invoices · 90-day repair warranty ·
              Serving Delhi NCR since {SITE.founded}.
            </p>
            <p className="flex gap-5">
              <Link to="/privacy-policy" className="hover:text-cream">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-cream">
                Terms & warranty
              </Link>
              <a href="/sitemap.xml" className="hover:text-cream">
                Sitemap
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <nav className={className} aria-label={title}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-mist/80">{children}</ul>
    </nav>
  );
}
