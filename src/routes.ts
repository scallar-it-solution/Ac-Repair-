import { AREAS, areaBySlug, areaPath } from "./data/areas";
import { GUIDES, guideBySlug, guidePath } from "./data/guides";
import { SERVICES, serviceBySlug, servicePath } from "./data/services";
import { SITE } from "./data/site";
import { normalizePath } from "./lib/router";

export type RouteKind =
  | "home"
  | "services"
  | "service"
  | "pricing"
  | "areas"
  | "area"
  | "guides"
  | "guide"
  | "about"
  | "contact"
  | "faq"
  | "brands"
  | "privacy"
  | "terms"
  | "notfound";

export type Crumb = { name: string; path: string };

export type RouteDef = {
  path: string;
  kind: RouteKind;
  slug?: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  noindex?: boolean;
  priority?: number;
  lastmod?: string;
};

const HOME: Crumb = { name: "Home", path: "/" };
const SERVICES_CRUMB: Crumb = { name: "Services", path: "/services" };
const AREAS_CRUMB: Crumb = { name: "Service Areas", path: "/service-areas" };
const GUIDES_CRUMB: Crumb = { name: "Guides", path: "/guides" };

const STATIC: RouteDef[] = [
  {
    path: "/",
    kind: "home",
    title: "AC Repair & Service in Delhi NCR — Same Day | Airkraft",
    description:
      "Same-day AC repair in Delhi, Noida, Gurugram, Ghaziabad & Faridabad. Split, window & inverter ACs. Diagnosis first, GST invoice, 90-day warranty.",
    crumbs: [HOME],
    priority: 1,
  },
  {
    path: "/services",
    kind: "services",
    title: "AC Services in Delhi NCR: Repair, Gas, Install & AMC | Airkraft",
    description:
      "Every AC service we offer in Delhi NCR — servicing, split, window and inverter repair, gas filling, installation, AMC and VRF — with published prices.",
    crumbs: [HOME, SERVICES_CRUMB],
    priority: 0.9,
  },
  {
    path: "/pricing",
    kind: "pricing",
    title: "AC Repair & Service Price List in Delhi NCR (2026) | Airkraft",
    description:
      "AC service from ₹449, repair ₹499, PCB ₹799, installation ₹1,499, gas filling ₹1,799, AMC ₹2,499. ₹199 visit charge, waived when you approve the repair.",
    crumbs: [HOME, { name: "Pricing", path: "/pricing" }],
    priority: 0.8,
  },
  {
    path: "/service-areas",
    kind: "areas",
    title: "AC Repair Near Me in Delhi NCR — All Areas Covered | Airkraft",
    description:
      "Airkraft covers all of Delhi NCR: South Delhi, Dwarka, Rohini, Noida, Greater Noida, Gurugram, Ghaziabad, Faridabad and 50+ neighbourhoods. Same-day slots.",
    crumbs: [HOME, AREAS_CRUMB],
    priority: 0.8,
  },
  {
    path: "/guides",
    kind: "guides",
    title: "AC Repair & Maintenance Guides for Delhi NCR | Airkraft",
    description:
      "Practical guides from working AC technicians: why your AC is not cooling, gas filling costs, service schedules for Delhi’s climate and error codes explained.",
    crumbs: [HOME, GUIDES_CRUMB],
    priority: 0.6,
  },
  {
    path: "/about",
    kind: "about",
    title: "About Airkraft | AC Technicians in Delhi NCR Since 2014",
    description:
      "Airkraft is a Delhi NCR AC repair company run by working technicians. 18,400+ jobs, 90-day parts & labour warranty, GST invoices, no scare-selling.",
    crumbs: [HOME, { name: "About", path: "/about" }],
    priority: 0.5,
  },
  {
    path: "/contact",
    kind: "contact",
    title: "Contact Airkraft — Book AC Repair on WhatsApp | +91 93155 15700",
    description:
      "Book a same-day AC technician on WhatsApp or call +91 93155 15700. 7 AM–10 PM daily, emergency night call-outs. Delhi, Noida, Gurugram, Ghaziabad, Faridabad.",
    crumbs: [HOME, { name: "Contact", path: "/contact" }],
    priority: 0.7,
  },
  {
    path: "/faq",
    kind: "faq",
    title: "AC Repair FAQs — Prices, Warranty, Gas & Booking | Airkraft",
    description:
      "Answers to the questions Delhi NCR customers ask most: visit charges, arrival times, gas filling, warranty, brands, AMC, installation and payments.",
    crumbs: [HOME, { name: "FAQ", path: "/faq" }],
    priority: 0.6,
  },
  {
    path: "/brands",
    kind: "brands",
    title: "Daikin, Voltas, LG & All-Brand AC Repair in Delhi NCR | Airkraft",
    description:
      "Independent repair and service for Daikin, Voltas, LG, Samsung, Blue Star, Lloyd, Hitachi, Carrier, Panasonic and more across Delhi NCR. Same-day slots.",
    crumbs: [HOME, { name: "Brands", path: "/brands" }],
    priority: 0.6,
  },
  {
    path: "/privacy-policy",
    kind: "privacy",
    title: "Privacy Policy | Airkraft Cooling",
    description: "How Airkraft Cooling handles the information you share when you book an AC service.",
    crumbs: [HOME, { name: "Privacy Policy", path: "/privacy-policy" }],
    priority: 0.2,
  },
  {
    path: "/terms",
    kind: "terms",
    title: "Terms of Service & Warranty | Airkraft Cooling",
    description:
      "Terms for Airkraft AC service visits: inspection charge, quotes, payment, cancellations and the 90-day repair warranty.",
    crumbs: [HOME, { name: "Terms & Warranty", path: "/terms" }],
    priority: 0.2,
  },
];

const NOT_FOUND: RouteDef = {
  path: "/404",
  kind: "notfound",
  title: "Page not found | Airkraft",
  description: "This page does not exist. Find AC repair services, prices and service areas across Delhi NCR.",
  crumbs: [HOME],
  noindex: true,
};

export function allRoutes(): RouteDef[] {
  return [
    ...STATIC,
    ...SERVICES.map<RouteDef>((s) => ({
      path: servicePath(s.slug),
      kind: "service",
      slug: s.slug,
      title: s.metaTitle,
      description: s.metaDescription,
      crumbs: [HOME, SERVICES_CRUMB, { name: s.name, path: servicePath(s.slug) }],
      priority: 0.9,
    })),
    ...AREAS.map<RouteDef>((a) => ({
      path: areaPath(a.slug),
      kind: "area",
      slug: a.slug,
      title: a.metaTitle,
      description: a.metaDescription,
      crumbs: [HOME, AREAS_CRUMB, { name: a.city, path: areaPath(a.slug) }],
      priority: 0.9,
    })),
    ...GUIDES.map<RouteDef>((g) => ({
      path: guidePath(g.slug),
      kind: "guide",
      slug: g.slug,
      title: g.metaTitle,
      description: g.metaDescription,
      crumbs: [HOME, GUIDES_CRUMB, { name: g.title, path: guidePath(g.slug) }],
      priority: 0.7,
      lastmod: g.updated,
    })),
  ].map((r) => ({ lastmod: SITE.updated, ...r }));
}

const BY_PATH = new Map(allRoutes().map((r) => [r.path, r]));

export function matchRoute(rawPath: string): RouteDef {
  return BY_PATH.get(normalizePath(rawPath)) ?? NOT_FOUND;
}

export const notFoundRoute = NOT_FOUND;

// Re-exported for page components that need the entity behind a route.
export { areaBySlug, guideBySlug, serviceBySlug };
