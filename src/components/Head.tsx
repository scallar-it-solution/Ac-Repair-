import { useEffect } from "react";
import type { RouteDef } from "../routes";
import { applyHead, headTags } from "../seo/head";

/** Keeps <head> (title, meta, canonical, JSON-LD) in sync with the current route after client navigation. */
export function Head({ route }: { route: RouteDef }) {
  useEffect(() => {
    applyHead(headTags(route));
  }, [route]);
  return null;
}
