import { BUYING } from "./buying";
import { GAS } from "./gas";
import { MAINTENANCE } from "./maintenance";
import { REFERENCE } from "./reference";
import { TROUBLESHOOTING } from "./troubleshooting";
import type { Block, ClusterId, Guide } from "./types";

export type { Block, ClusterId, Guide };

/**
 * Topic clusters. Each cluster is anchored to the service ("money page") it supports, so every
 * article in it links to that service and the service page links back to the whole cluster.
 */
export const CLUSTERS: { id: ClusterId; name: string; intro: string; service?: string }[] = [
  {
    id: "troubleshooting",
    name: "Troubleshooting",
    intro: "What your AC is doing, what usually causes it, what you can safely check yourself — and when it needs a technician.",
    service: "split-ac-repair",
  },
  {
    id: "gas",
    name: "Gas & refrigerant",
    intro: "How refrigerant works, how to spot a real leak, and what a proper gas charge costs in Delhi NCR.",
    service: "ac-gas-filling",
  },
  {
    id: "maintenance",
    name: "Maintenance & running costs",
    intro: "Service schedules for Delhi’s heat, dust and monsoon, AMC maths, and how to cut the electricity bill.",
    service: "ac-service",
  },
  {
    id: "buying",
    name: "Buying, installing & upgrading",
    intro: "Sizing, inverter vs fixed-speed, stabilisers, installation quality — and when an old AC should be replaced.",
    service: "ac-installation",
  },
  {
    id: "reference",
    name: "Reference",
    intro: "Plain-English definitions of the terms technicians use.",
  },
];

export const GUIDES: Guide[] = [...TROUBLESHOOTING, ...GAS, ...MAINTENANCE, ...BUYING, ...REFERENCE];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidePath = (slug: string) => `/guides/${slug}`;
export const clusterOf = (g: Guide) => CLUSTERS.find((c) => c.id === g.cluster)!;
export const guidesInCluster = (id: ClusterId) => GUIDES.filter((g) => g.cluster === id);

/** Sibling guides: hand-picked first, then the rest of the same cluster. */
export function relatedGuidesFor(g: Guide, limit = 3): Guide[] {
  const picked = (g.relatedGuides ?? []).map(guideBySlug).filter((x): x is Guide => !!x);
  const siblings = guidesInCluster(g.cluster).filter((x) => x.slug !== g.slug);
  const out: Guide[] = [];
  for (const x of [...picked, ...siblings, ...GUIDES]) {
    if (x.slug !== g.slug && !out.includes(x)) out.push(x);
    if (out.length === limit) break;
  }
  return out;
}

/** Reverse index: every guide that supports a given service. */
export const guidesForService = (serviceSlug: string) => GUIDES.filter((g) => g.related.includes(serviceSlug));

/** Rough reading time from word count (~200 wpm). */
export function readingMinutes(g: Guide) {
  const words = g.blocks
    .flatMap((b) => {
      switch (b.t) {
        case "ul":
        case "ol":
          return b.items;
        case "table":
          return b.rows.flat();
        case "callout":
          return [b.title, b.text];
        case "defs":
          return b.items.flat();
        default:
          return [b.text];
      }
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

/** Short label for inline links: "AC not cooling? 10 causes…" → "AC not cooling". */
export const guideShortTitle = (g: Guide) => g.title.split(/[:?]| — /)[0].trim();
