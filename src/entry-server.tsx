import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { allRoutes, matchRoute, notFoundRoute } from "./routes";
import { headTags, serializeHead } from "./seo/head";

/** Used by scripts/prerender.mjs to produce static HTML for every route. */
export function render(path: string) {
  const route = matchRoute(path);
  const html = renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>
  );
  return { html, head: serializeHead(headTags(route)), route };
}

export { allRoutes, notFoundRoute };
export { llmsTxt, robotsTxt, sitemapXml } from "./seo/files";
