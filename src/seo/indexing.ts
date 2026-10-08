import policy from "../data/indexing.json";
import type { RouteDef } from "../routes";

/** Temporary site-wide indexing switch; the 404 always remains noindex. */
export function isIndexable(route: Pick<RouteDef, "noindex">): boolean {
  return policy.enabled && !route.noindex;
}
