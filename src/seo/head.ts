import { areaBySlug } from "../data/areas";
import { clusterOf, guideBySlug } from "../data/guides";
import { HERO_IMAGE, OG_IMAGE, SITE, abs } from "../data/site";
import type { RouteDef } from "../routes";
import { buildGraph } from "./schema";

export type HeadTag =
  | { tag: "title"; text: string }
  | { tag: "meta" | "link"; attrs: Record<string, string> }
  | { tag: "script"; attrs: Record<string, string>; text: string };

const ROBOTS_INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

/** Every route-dependent tag in <head>. Static tags (charset, icons, fonts) live in index.html. */
export function headTags(route: RouteDef): HeadTag[] {
  const url = abs(route.path === "/" ? "/" : route.path);
  const meta = (name: string, content: string): HeadTag => ({ tag: "meta", attrs: { name, content } });
  const prop = (property: string, content: string): HeadTag => ({ tag: "meta", attrs: { property, content } });

  const area = route.kind === "area" ? areaBySlug(route.slug!) : undefined;
  const guide = route.kind === "guide" ? guideBySlug(route.slug!) : undefined;
  const geo = area
    ? { region: `IN-${area.stateCode}`, place: area.city, lat: area.geo.lat, lng: area.geo.lng }
    : { region: "IN-DL", place: SITE.city, lat: SITE.geo.lat, lng: SITE.geo.lng };

  const tags: HeadTag[] = [
    { tag: "title", text: route.title },
    meta("description", route.description),
    meta("robots", route.noindex ? "noindex, follow" : ROBOTS_INDEX),
  ];

  if (!route.noindex) tags.push({ tag: "link", attrs: { rel: "canonical", href: url } });

  tags.push(
    prop("og:type", guide ? "article" : "website"),
    prop("og:site_name", SITE.legal),
    prop("og:locale", "en_IN"),
    prop("og:title", route.title),
    prop("og:description", route.description),
    prop("og:url", url),
    prop("og:image", abs(OG_IMAGE.src)),
    prop("og:image:width", String(OG_IMAGE.width)),
    prop("og:image:height", String(OG_IMAGE.height)),
    prop("og:image:alt", OG_IMAGE.alt),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", route.title),
    meta("twitter:description", route.description),
    meta("twitter:image", abs(OG_IMAGE.src)),
    meta("geo.region", geo.region),
    meta("geo.placename", geo.place),
    meta("geo.position", `${geo.lat};${geo.lng}`),
    meta("ICBM", `${geo.lat}, ${geo.lng}`)
  );

  if (guide) {
    tags.push(
      prop("article:published_time", guide.published),
      prop("article:modified_time", guide.updated),
      prop("article:section", clusterOf(guide).name)
    );
  }

  if (route.kind === "home") {
    tags.push({
      tag: "link",
      attrs: {
        rel: "preload",
        as: "image",
        href: HERO_IMAGE.src,
        imagesrcset: HERO_IMAGE.srcSet,
        imagesizes: "100vw",
        fetchpriority: "high",
      },
    });
  }

  tags.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    text: JSON.stringify(buildGraph(route)),
  });

  return tags;
}

const escAttr = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escText = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Prevents "</script>" inside JSON-LD from closing the tag early. */
const escJson = (v: string) => v.replace(/</g, "\\u003c");

/** Server: tags → HTML. Every tag carries data-h so the client can swap them on navigation. */
export function serializeHead(tags: HeadTag[]): string {
  return tags
    .map((t) => {
      if (t.tag === "title") return `<title data-h>${escText(t.text)}</title>`;
      const attrs = Object.entries(t.attrs)
        .map(([k, v]) => `${k}="${escAttr(v)}"`)
        .join(" ");
      if (t.tag === "script") return `<script data-h ${attrs}>${escJson(t.text)}</script>`;
      return `<${t.tag} data-h ${attrs} />`;
    })
    .join("\n    ");
}

/** Client: replace the previous route's tags with this route's tags. */
export function applyHead(tags: HeadTag[]) {
  const head = document.head;
  head.querySelectorAll("[data-h]").forEach((el) => el.remove());
  const anchor = head.querySelector('meta[name="viewport"]')?.nextSibling ?? null;
  const frag = document.createDocumentFragment();
  for (const t of tags) {
    if (t.tag === "title") {
      document.title = t.text;
      continue;
    }
    // Skip re-adding the hero preload after first load; it only matters for the initial request.
    if (t.tag === "link" && t.attrs.rel === "preload") continue;
    const el = document.createElement(t.tag);
    el.setAttribute("data-h", "");
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    if (t.tag === "script") el.textContent = t.text;
    frag.appendChild(el);
  }
  head.insertBefore(frag, anchor);
}
