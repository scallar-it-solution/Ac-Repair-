import { AREAS, areaPath } from "../data/areas";
import { CLUSTERS, GUIDES, guidePath, guidesInCluster } from "../data/guides";
import { SERVICES, servicePath } from "../data/services";
import { BRAND_DISCLAIMER, BRANDS, PRICE_GROUPS, SITE, abs } from "../data/site";

/** Photo for a URL, if the page has one — used for image entries in sitemap.xml. */
export function photoUrlFor(path: string) {
  const photo =
    SERVICES.find((x) => servicePath(x.slug) === path)?.photo ?? GUIDES.find((x) => guidePath(x.slug) === path)?.photo;
  return photo ? abs(`/images/photos/${photo}-1600.webp`) : undefined;
}

/** AI search and assistant crawlers, explicitly allowed — answer engines can only cite what they can fetch. */
export const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
];

/** llms.txt (llmstxt.org): a plain-text brief for LLMs and AI answer engines. */
export function llmsTxt() {
  const prices = PRICE_GROUPS.flatMap((g) => g.rows)
    .map((p) => `- ${p.job}: ${p.from}${p.from.startsWith("₹") ? " (starting price)" : ""} — ${p.note}`)
    .join("\n");
  const guides = CLUSTERS.map(
    (c) =>
      `### ${c.name}\n` +
      guidesInCluster(c.id)
        .map((g) => `- [${g.title}](${abs(guidePath(g.slug))}): ${g.answer}`)
        .join("\n")
  ).join("\n\n");

  return `# ${SITE.legal}

> ${SITE.description}

Key facts:
- Business: ${SITE.legal} (also "${SITE.name}"), dispatch desk in ${SITE.address.locality} ${SITE.address.postalCode}, India
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

## How to book
- WhatsApp ${SITE.phoneDisplay} with the AC brand and tonnage, the fault, any error code, a photo of the indoor unit and model sticker, and your area and landmark. Call instead for night emergencies.
- You get a slot and the technician's name before anyone sets off. The technician diagnoses first (pressures, current, error codes) and quotes on WhatsApp; work starts only after you approve.

## Policies
- Inspection ${SITE.visitFee}, waived if the repair is approved on the same visit; if you decline, only the inspection is charged.
- Starting prices cover the standard job. Spare parts, leak repairs, extra copper, difficult access and outlying-area travel are quoted separately and approved before work starts.
- Warranty: ${SITE.warranty} on the part fitted and the labour for that part, printed on the GST invoice. Compressors and coils follow the part maker's cover.
- Payment by ${SITE.payment.join(", ")} after the work is tested. Night emergency call-outs carry a surcharge stated before booking.

## What Frostwright does not do
- It is not an authorised service centre for any brand: ACs still under the manufacturer's warranty should go to the brand first.
- It does not top up refrigerant without a leak test, and does not fit unbranded circuit boards.
- It does not take on large central plants, chillers, ducting fabrication or building electrical works.

## Services
${SERVICES.map((s) => `- [${s.name}](${abs(servicePath(s.slug))}): ${s.answer}${s.facts ? ` (${s.facts.map((f) => `${f.k}: ${f.v}`).join("; ")})` : ""}`).join("\n")}

## Prices (INR, Delhi NCR)
${prices}
- Full price list: ${abs("/pricing")}

## Service areas
${AREAS.map((a) => `- [AC repair in ${a.city}](${abs(areaPath(a.slug))}): ${a.zones.flatMap((z) => z.places).join(", ")}. Typical arrival: ${a.eta}.${a.travel ? ` ${a.travel}` : ""}`).join("\n")}

## Guides
${guides}

## Company
- [About Frostwright](${abs("/about")})
- [Contact and booking](${abs("/contact")})
- [Frequently asked questions](${abs("/faq")})
- [Brands we service](${abs("/brands")})
- [Terms of service and warranty](${abs("/terms")})
- [Privacy policy](${abs("/privacy-policy")})
`;
}
