import type { Metadata } from "next";
import { areaBySlug } from "../data/areas";
import { clusterOf, guideBySlug } from "../data/guides";
import { AUTHOR, OG_IMAGE, SITE, abs } from "../data/site";
import type { RouteDef } from "../routes";

/** Per-route metadata: title, description, canonical, robots, Open Graph, Twitter and geo tags. */
export function buildMetadata(route: RouteDef): Metadata {
  const url = abs(route.path === "/" ? "/" : route.path);
  const area = route.kind === "area" ? areaBySlug(route.slug!) : undefined;
  const guide = route.kind === "guide" ? guideBySlug(route.slug!) : undefined;
  const geo = area
    ? { region: `IN-${area.stateCode}`, place: area.city, lat: area.geo.lat, lng: area.geo.lng }
    : { region: "IN-DL", place: SITE.city, lat: SITE.geo.lat, lng: SITE.geo.lng };

  const image = { url: OG_IMAGE.src, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt };
  const base = {
    siteName: SITE.legal,
    locale: "en_IN",
    title: route.title,
    description: route.description,
    url,
    images: [image],
  };

  return {
    title: { absolute: route.title },
    description: route.description,
    ...(route.noindex ? {} : { alternates: { canonical: url } }),
    robots: route.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: guide
      ? {
          ...base,
          type: "article",
          publishedTime: guide.published,
          modifiedTime: guide.updated,
          section: clusterOf(guide).name,
          authors: [AUTHOR.name],
        }
      : { ...base, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [OG_IMAGE.src],
    },
    other: {
      "geo.region": geo.region,
      "geo.placename": geo.place,
      "geo.position": `${geo.lat};${geo.lng}`,
      ICBM: `${geo.lat}, ${geo.lng}`,
    },
  };
}
