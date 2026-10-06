import type { RouteDef } from "../routes";
import { buildGraph } from "../seo/schema";

/** Connected schema.org @graph for the page. "<" is escaped so content can never close the tag early. */
export function JsonLd({ route }: { route: RouteDef }) {
  const json = JSON.stringify(buildGraph(route)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
