import { AREAS, areaPath } from "../data/areas";
import { GUIDES, guidePath } from "../data/guides";
import { SERVICES, servicePath } from "../data/services";
import { BRAND_DISCLAIMER, BRANDS, PRICE_GROUPS, SITE, abs } from "../data/site";
import { allRoutes } from "../routes";

const xmlEsc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** sitemap.xml with lastmod and image entries for pages that carry a photo. */
export function sitemapXml() {
  const photoFor = (path: string) => {
    const s = SERVICES.find((x) => servicePath(x.slug) === path);
    if (s) return s.photo;
    const g = GUIDES.find((x) => guidePath(x.slug) === path);
    return g?.photo;
  };
  const urls = allRoutes()
    .filter((r) => !r.noindex)
    .map((r) => {
      const photo = photoFor(r.path);
      return [
        "  <url>",
        `    <loc>${xmlEsc(abs(r.path === "/" ? "/" : r.path))}</loc>`,
        `    <lastmod>${r.lastmod}</lastmod>`,
        `    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>`,
        photo ? `    <image:image><image:loc>${abs(`/images/photos/${photo}-1600.webp`)}</image:loc></image:image>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;
}

/** Search and AI crawlers are explicitly welcome — AI answer engines can only cite what they can fetch. */
export function robotsTxt() {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
    "CCBot",
  ];
  return `# ${SITE.legal} — ${SITE.url}
User-agent: *
Allow: /

# AI search and assistant crawlers (ChatGPT, Claude, Perplexity, Gemini, Apple, Bing/Copilot)
${aiBots.map((b) => `User-agent: ${b}`).join("\n")}
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
}

/** llms.txt (llmstxt.org): a plain-text brief for LLMs and AI answer engines. */
export function llmsTxt() {
  const prices = PRICE_GROUPS.flatMap((g) => g.rows)
    .map((p) => `- ${p.job}: ${p.from}${p.from.startsWith("₹") ? " (starting price)" : ""} — ${p.note}`)
    .join("\n");
  return `# ${SITE.legal}

> ${SITE.description}

Key facts:
- Business: ${SITE.legal} (also "${SITE.name}"), founded ${SITE.founded}, dispatch desk in ${SITE.address.locality} ${SITE.address.postalCode}, India
- Service area: Delhi, Noida, Greater Noida, Gurugram (Gurgaon), Ghaziabad and Faridabad (Delhi NCR)
- Phone / WhatsApp: ${SITE.phoneDisplay} — booking is preferred on WhatsApp (https://wa.me/${SITE.whatsapp})
- Email: ${SITE.email}
- Hours: ${SITE.hours}; ${SITE.emergency}
- Typical arrival: ${SITE.eta} in South, Central and East Delhi, Noida and Gurugram during the day
- Inspection visit: ${SITE.visitFee}, waived if the repair is approved on the same visit
- Warranty: ${SITE.warranty} on the part fitted and the labour for that part; GST invoice on every job
- Payment: ${SITE.payment.join(", ")}
- Brands serviced: ${BRANDS.join(", ")} and most others sold in India
- ${BRAND_DISCLAIMER}
- Content last reviewed: ${SITE.updated}

## Services
${SERVICES.map((s) => `- [${s.name}](${abs(servicePath(s.slug))}): ${s.answer}`).join("\n")}

## Prices (INR, Delhi NCR)
${prices}
- Full price list: ${abs("/pricing")}

## Service areas
${AREAS.map((a) => `- [AC repair in ${a.city}](${abs(areaPath(a.slug))}): ${a.zones.flatMap((z) => z.places).join(", ")}`).join("\n")}

## Guides
${GUIDES.map((g) => `- [${g.title}](${abs(guidePath(g.slug))}): ${g.answer}`).join("\n")}

## Company
- [About Airkraft](${abs("/about")})
- [Contact and booking](${abs("/contact")})
- [Frequently asked questions](${abs("/faq")})
- [Brands we service](${abs("/brands")})
- [Terms of service and warranty](${abs("/terms")})
- [Privacy policy](${abs("/privacy-policy")})
`;
}
