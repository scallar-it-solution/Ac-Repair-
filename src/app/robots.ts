import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { AI_BOTS } from "@/seo/files";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
