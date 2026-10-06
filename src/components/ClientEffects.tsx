"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { normalizePath } from "../lib/router";
import { installLeadTracking } from "../lib/track";

/** Old hash URLs (/#/services) from the first version of the site → real paths. */
const LEGACY: Record<string, string> = { "/areas": "/service-areas", "/home": "/" };

/**
 * Browser-only side effects for the whole site:
 *  - call / WhatsApp lead tracking (no-op until GTM or GA4 is installed)
 *  - marks <html data-navigated> on the first in-app navigation so pages animate in after a click,
 *    but never on first load (keeps LCP fast)
 *  - redirects legacy hash URLs
 */
export function ClientEffects() {
  const router = useRouter();

  useEffect(() => {
    // Tells the inline safety-net script in layout.tsx that hydration succeeded.
    document.documentElement.setAttribute("data-hydrated", "");
    return installLeadTracking();
  }, []);

  useEffect(() => {
    const mark = () => document.documentElement.setAttribute("data-navigated", "");
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='/']");
      if (a && !a.getAttribute("href")?.startsWith("//")) mark();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", mark);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", mark);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/")) {
      const p = normalizePath(hash.slice(1));
      router.replace(LEGACY[p] ?? p);
    }
  }, [router]);

  return null;
}
