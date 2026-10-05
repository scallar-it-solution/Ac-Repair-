/**
 * Static prerender: renders every route to real HTML (content + per-page <head>) so search engines
 * and AI crawlers that do not execute JavaScript see the full page. Also writes sitemap.xml,
 * robots.txt, llms.txt and 404.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle in dist-ssr/).
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes('<div id="root"><!--app-html-->')) {
  throw new Error("index.html is missing the <!--app-head--> / <!--app-html--> placeholders");
}

const { render, allRoutes, notFoundRoute, sitemapXml, robotsTxt, llmsTxt } = await import(pathToFileURL(ssrEntry).href);

/** data-route lets the client hydrate only when the served HTML belongs to the current URL. */
const fill = (head, html, routePath) =>
  template
    .replace("<!--app-head-->", head)
    .replace('<div id="root"><!--app-html-->', `<div id="root" data-route="${routePath}">${html}`);

/** "/" → index.html, "/services/split-ac-repair" → services/split-ac-repair.html (served at the clean URL). */
const fileFor = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

let count = 0;
for (const r of allRoutes()) {
  const { html, head } = render(r.path);
  const out = path.join(dist, fileFor(r.path));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, fill(head, html, r.path));
  count++;
}

const nf = render(notFoundRoute.path);
fs.writeFileSync(path.join(dist, "404.html"), fill(nf.head, nf.html, notFoundRoute.path));

fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemapXml());
fs.writeFileSync(path.join(dist, "robots.txt"), robotsTxt());
fs.writeFileSync(path.join(dist, "llms.txt"), llmsTxt());

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`Prerendered ${count} pages + 404.html, sitemap.xml, robots.txt, llms.txt`);
