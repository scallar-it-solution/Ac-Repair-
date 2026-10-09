import { AREAS, areaBySlug, areaPath } from "../data/areas";
import { brandBySlug, brandPath } from "../data/brands";
import { routeFaqs } from "../data/faqs";
import { GUIDES, clusterOf, guideBySlug, guidePath, readingMinutes } from "../data/guides";
import { SERVICES, serviceBySlug, servicePath } from "../data/services";
import { AUTHOR, HERO_IMAGE, OG_IMAGE, PRICE_GROUPS, PHOTOS, SITE, abs } from "../data/site";
import { allRoutes, type RouteDef } from "../routes";

type Node = Record<string, unknown>;

const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;
const LOGO_ID = `${SITE.url}/#logo`;
const photoUrl = (key: keyof typeof PHOTOS) => abs(`/images/photos/${key}-1600.webp`);

/**
 * Reference to a service described in full on its own page. Google resolves `@id` only within the current page,
 * so a bare `{ "@id" }` pointing elsewhere reads as an empty, unnamed item; type, name and url keep it valid here
 * and merge with the full node on the service page itself.
 */
function serviceRef(slug: string): Node {
  const s = serviceBySlug(slug)!;
  const url = abs(servicePath(s.slug));
  return { "@type": "Service", "@id": `${url}#service`, name: s.name, url };
}

/**
 * Google's FAQ guidelines: a question repeated across the site is marked up once. Every FAQ stays visible wherever
 * it is shown; the markup goes to the most specific page that shows it (earliest kind below, then route order).
 */
const FAQ_OWNER_ORDER: RouteDef["kind"][] = ["service", "area", "brand", "guide", "pricing", "brands", "areas", "faq", "home", "contact", "services"];
const FAQ_OWNER = new Map<string, string>();
for (const kind of FAQ_OWNER_ORDER)
  for (const r of allRoutes().filter((x) => x.kind === kind))
    for (const f of routeFaqs(r)) if (!FAQ_OWNER.has(f.q)) FAQ_OWNER.set(f.q, r.path);

/** The FAQs this route marks up as FAQPage (a subset of the FAQs it shows). */
export const markedUpFaqs = (route: RouteDef) => routeFaqs(route).filter((f) => FAQ_OWNER.get(f.q) === route.path);

const cityNode = (a: (typeof AREAS)[number]) => ({
  "@type": "City",
  name: a.city,
  sameAs: a.wiki,
  containedInPlace: { "@type": "State", name: a.state },
});

function business(): Node {
  return {
    "@type": "HVACBusiness",
    "@id": BUSINESS_ID,
    name: SITE.legal,
    alternateName: SITE.name,
    url: abs("/"),
    description: SITE.description,
    slogan: SITE.tagline,
    telephone: SITE.phone,
    email: SITE.email,
    logo: { "@type": "ImageObject", "@id": LOGO_ID, url: abs("/brand/logo-720.png"), width: 720, height: 720 },
    image: [abs(HERO_IMAGE.src), abs(OG_IMAGE.src)],
    priceRange: "₹199–₹2,499",
    currenciesAccepted: "INR",
    paymentAccepted: SITE.payment.join(", "),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: AREAS.map(cityNode),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: SITE.opens,
        closes: SITE.closes,
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: SITE.languages,
    },
    knowsAbout: [
      "Split AC repair",
      "Window AC repair",
      "Inverter AC PCB repair",
      "AC gas filling (R32, R410A, R22)",
      "AC installation",
      "AC annual maintenance contracts",
      "Cassette, ductable and VRF air conditioning",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AC repair and maintenance services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: serviceRef(s.slug),
        ...(s.priceValue
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: s.priceValue,
                priceCurrency: "INR",
              },
            }
          : {}),
      })),
    },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

function website(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: abs("/"),
    name: SITE.legal,
    alternateName: SITE.name,
    inLanguage: "en-IN",
    publisher: { "@id": BUSINESS_ID },
  };
}

function breadcrumbs(route: RouteDef): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(route.path)}#breadcrumb`,
    itemListElement: route.crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path === "/" ? "/" : c.path),
    })),
  };
}

function serviceNode(slug: string): Node {
  const s = serviceBySlug(slug)!;
  const url = abs(servicePath(s.slug));
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.answer,
    url,
    image: photoUrl(s.photo),
    provider: { "@id": BUSINESS_ID },
    areaServed: AREAS.map(cityNode),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      ...(s.priceValue ? { lowPrice: s.priceValue } : {}),
      offerCount: s.prices.length,
      offers: s.prices.map((p) => ({
        "@type": "Offer",
        name: p.job,
        description: p.note,
        ...(p.value ? { price: p.value, priceCurrency: "INR" } : {}),
        availability: "https://schema.org/InStock",
      })),
    },
  };
}

function areaServiceNode(slug: string): Node {
  const a = areaBySlug(slug)!;
  const url = abs(areaPath(a.slug));
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `AC repair and service in ${a.city}`,
    serviceType: "Air conditioner repair and maintenance",
    description: a.answer,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      ...cityNode(a),
      geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng },
      containsPlace: a.zones.flatMap((z) => z.places).map((name) => ({ "@type": "Place", name })),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `AC services in ${a.city}`,
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: serviceRef(s.slug),
      })),
    },
  };
}

function brandServiceNode(slug: string): Node {
  const b = brandBySlug(slug)!;
  const url = abs(brandPath(b.slug));
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${b.name} AC repair and service`,
    serviceType: "Air conditioner repair and maintenance",
    description: b.answer,
    url,
    brand: { "@type": "Brand", name: b.name },
    provider: { "@id": BUSINESS_ID },
    areaServed: AREAS.map(cityNode),
  };
}

function articleNode(slug: string, webpageId: string): Node {
  const g = guideBySlug(slug)!;
  return {
    "@type": "Article",
    "@id": `${abs(guidePath(g.slug))}#article`,
    headline: g.title,
    description: g.metaDescription,
    abstract: g.answer,
    image: photoUrl(g.photo),
    datePublished: g.published,
    dateModified: g.updated,
    articleSection: clusterOf(g).name,
    timeRequired: `PT${readingMinutes(g)}M`,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      jobTitle: AUTHOR.role,
      description: AUTHOR.bio,
      worksFor: { "@id": BUSINESS_ID },
      url: abs("/about"),
    },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: { "@id": webpageId },
    about: g.related.map(serviceRef),
    ...(g.sources?.length
      ? { citation: g.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })) }
      : {}),
  };
}

function itemList(name: string, items: { name: string; path: string }[]): Node {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  };
}

const PAGE_TYPE: Partial<Record<RouteDef["kind"], string>> = {
  about: "AboutPage",
  contact: "ContactPage",
  services: "CollectionPage",
  areas: "CollectionPage",
  guides: "CollectionPage",
};

export function buildGraph(route: RouteDef): Node {
  const url = abs(route.path === "/" ? "/" : route.path);
  const webpageId = `${url}#webpage`;
  const faqs = markedUpFaqs(route);

  const baseType = PAGE_TYPE[route.kind] ?? "WebPage";
  const webpage: Node = {
    "@type": faqs.length ? [baseType, "FAQPage"] : baseType,
    "@id": webpageId,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    // The homepage has no breadcrumb trail, so it must not reference one (Search Console: missing itemListElement).
    ...(route.kind === "home" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    primaryImageOfPage: { "@type": "ImageObject", url: abs(OG_IMAGE.src) },
    dateModified: route.lastmod ?? SITE.updated,
    ...(faqs.length
      ? {
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : {}),
  };

  const graph: Node[] = [business(), website(), webpage];
  if (route.kind !== "home") graph.push(breadcrumbs(route));

  switch (route.kind) {
    case "service":
      graph.push(serviceNode(route.slug!));
      break;
    case "area":
      graph.push(areaServiceNode(route.slug!));
      break;
    case "brand":
      graph.push(brandServiceNode(route.slug!));
      break;
    case "guide":
      graph.push(articleNode(route.slug!, webpageId));
      break;
    case "services":
      graph.push(...SERVICES.map((s) => serviceNode(s.slug)));
      graph.push(itemList("AC services", SERVICES.map((s) => ({ name: s.name, path: servicePath(s.slug) }))));
      break;
    case "areas":
      graph.push(itemList("Service areas", AREAS.map((a) => ({ name: `AC repair in ${a.city}`, path: areaPath(a.slug) }))));
      break;
    case "guides":
      graph.push(itemList("AC guides", GUIDES.map((g) => ({ name: g.title, path: guidePath(g.slug) }))));
      break;
    case "pricing":
      graph.push({
        "@type": "OfferCatalog",
        "@id": `${url}#prices`,
        name: "Frostwright AC service price list",
        itemListElement: PRICE_GROUPS.flatMap((g) => g.rows).map((p) => ({
          "@type": "Offer",
          name: p.job,
          description: p.note,
          ...(p.value ? { price: p.value, priceCurrency: "INR" } : {}),
          seller: { "@id": BUSINESS_ID },
        })),
      });
      break;
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
