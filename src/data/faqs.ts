import type { RouteDef } from "../routes";
import { areaBySlug } from "./areas";
import { guideBySlug } from "./guides";
import { serviceBySlug } from "./services";
import { FAQS, type Faq } from "./site";

export const PRICING_FAQS: Faq[] = [
  {
    q: "How does the ₹199 inspection charge work?",
    a: "The technician diagnoses the fault and quotes on WhatsApp. If you approve the repair on the same visit, the ₹199 is waived. If you decide not to go ahead, you pay only the ₹199.",
  },
  {
    q: "Why might the final bill differ from the starting price?",
    a: "Starting prices cover the standard job. Parts, leak repairs, extra copper, difficult access or additional machines change the total — and you approve every change on WhatsApp before work starts.",
  },
  {
    q: "Are spare parts included in the prices?",
    a: "No. Service prices cover labour and the work described. Parts are quoted separately after diagnosis, with the part name and price in writing.",
  },
  {
    q: "How can I pay?",
    a: "UPI, card or cash, after the work is done and tested. Every job comes with a GST invoice.",
  },
  {
    q: "Is there an extra charge for night or emergency visits?",
    a: "Night emergency call-outs carry a surcharge, which we tell you before booking. Outlying areas such as Greater Noida West, Sohna and Ballabhgarh may carry a small travel add-on.",
  },
];

export const AREA_HUB_FAQS: Faq[] = [
  {
    q: "Which areas does Airkraft cover?",
    a: "All of Delhi NCR: Delhi, Noida, Greater Noida, Gurugram, Ghaziabad and Faridabad, including 50+ neighbourhoods. Fringe areas such as Sohna, Ballabhgarh and Bahadurgarh are covered with a small travel add-on.",
  },
  FAQS[1],
  FAQS[0],
];

export const BRAND_FAQS: Faq[] = [
  {
    q: "Are you an authorised service centre for these brands?",
    a: "No. Airkraft is an independent multi-brand service. If your AC is still under the manufacturer’s warranty, contact the brand first for free cover; we step in for out-of-warranty machines or when you need someone today.",
  },
  {
    q: "Do you use original spare parts?",
    a: "We fit OEM parts or OEM-grade equivalents and tell you which before fitting. We do not fit unbranded boards.",
  },
  FAQS[2],
];

const svc = (slug: string, i: number) => serviceBySlug(slug)!.faqs[i];

export const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  { title: "Booking & visits", items: [FAQS[5], FAQS[1], FAQS[0]] },
  { title: "Prices & payment", items: PRICING_FAQS.slice(0, 4) },
  { title: "Repairs & warranty", items: [FAQS[4], svc("split-ac-repair", 3), svc("split-ac-repair", 2)] },
  { title: "Gas filling", items: [svc("ac-gas-filling", 0), svc("ac-gas-filling", 1), FAQS[3]] },
  { title: "Servicing & AMC", items: [svc("ac-service", 0), svc("ac-service", 1), svc("ac-amc", 1)] },
  { title: "Installation", items: [svc("ac-installation", 0), svc("ac-installation", 1)] },
  { title: "Brands", items: [FAQS[2], BRAND_FAQS[0]] },
];

/** The FAQs a route renders. Structured data reads this too, so markup always matches visible content. */
export function routeFaqs(route: RouteDef): Faq[] {
  switch (route.kind) {
    case "home":
    case "contact":
      return FAQS;
    case "services":
      return [FAQS[0], FAQS[4], svc("split-ac-repair", 3), FAQS[2]];
    case "service":
      return serviceBySlug(route.slug!)?.faqs ?? [];
    case "pricing":
      return PRICING_FAQS;
    case "areas":
      return AREA_HUB_FAQS;
    case "area":
      return areaBySlug(route.slug!)?.faqs ?? [];
    case "guide":
      return guideBySlug(route.slug!)?.faqs ?? [];
    case "faq":
      return FAQ_GROUPS.flatMap((g) => g.items);
    case "brands":
      return BRAND_FAQS;
    default:
      return [];
  }
}

