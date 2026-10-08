import type { MetadataRoute } from "next";
import { abs } from "@/data/site";
import { allRoutes } from "@/routes";
import { photoUrlFor } from "@/seo/files";
import { isIndexable } from "@/seo/indexing";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes()
    .filter(isIndexable)
    .map((r) => {
      const image = photoUrlFor(r.path);
      return {
        url: abs(r.path === "/" ? "/" : r.path),
        lastModified: r.lastmod,
        priority: r.priority,
        ...(image ? { images: [image] } : {}),
      };
    });
}
