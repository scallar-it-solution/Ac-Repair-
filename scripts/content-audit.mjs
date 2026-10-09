/**
 * Content & spam-policy audit for the built site. Run after `npm run build`:  npm run audit
 *
 * Reads the statically generated HTML in .next/server/app and checks the things Google's spam
 * policies and quality systems look at:
 *   - scaled / near-duplicate content and doorway patterns (pairwise main-content similarity)
 *   - thin pages, keyword stuffing, missing or duplicate titles / descriptions
 *   - canonical, robots, one H1, image alt text
 *   - broken internal links and orphan pages (inbound link counts)
 *   - structured data: valid JSON-LD, no self-serving review markup, FAQ markup matches visible text and appears on
 *     one page per question, no @id reference to a node missing from the page, no empty BreadcrumbList
 * Exits with code 1 if any hard failure is found.
 */
import fs from "node:fs";
import path from "node:path";
import indexing from "../src/data/indexing.json" with { type: "json" };

const ROOT = path.resolve(".next/server/app");
const SITE = "https://frostwright.in";
if (!fs.existsSync(ROOT)) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const toUrl = (f) => {
  const rel = path.relative(ROOT, f).split(path.sep).join("/").replace(/\.html$/, "");
  return rel === "index" ? "/" : "/" + rel;
};
const dec = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const textOf = (html) =>
  dec(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
const meta = (h, attr, key) => {
  const tag = (h.match(new RegExp(`<meta[^>]*${attr}="${key}"[^>]*>`, "i")) || [])[0];
  return tag ? dec((tag.match(/content="([^"]*)"/) || [])[1] || "") : null;
};

// Next-internal pages start with "_"; keep _not-found so the 404 noindex check runs.
const files = walk(ROOT).filter((f) => f.endsWith(".html") && (!f.includes(`${path.sep}_`) || f.endsWith(`${path.sep}_not-found.html`)));
const pages = files.map((f) => {
  const html = fs.readFileSync(f, "utf8");
  const url = toUrl(f);
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] || "";
  const canonTag = (html.match(/<link[^>]*rel="canonical"[^>]*>/) || [])[0];
  return {
    url,
    html,
    title: dec((html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || ""),
    description: meta(html, "name", "description") || "",
    robots: meta(html, "name", "robots") || "",
    canonical: canonTag ? (canonTag.match(/href="([^"]*)"/) || [])[1] : "",
    h1Count: (main.match(/<h1[\s>]/g) || []).length,
    mainText: textOf(main),
    links: [...html.matchAll(/<a[^>]*href="(\/[^"#?]*)/g)].map((m) => dec(m[1]).replace(/\/$/, "") || "/"),
    externals: [...html.matchAll(/<a[^>]*href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]),
    imgs: [...html.matchAll(/<img [^>]*>/g)].map((m) => m[0]),
    ld: (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1],
  };
});

const fails = [];
const warns = [];
const known = new Set(pages.map((p) => p.url));
const isStatic = (u) => /\.(png|ico|svg|webmanifest|xml|txt|webp|jpg|css|js)$/.test(u) || u.startsWith("/_next");
const isNotFound = (p) => p.url.includes("not-found");

// ---- per-page checks
const titles = new Map();
const descs = new Map();
const faqMarkup = new Map(); // question → the one page allowed to mark it up
for (const p of pages) {
  if (isNotFound(p)) {
    if (!p.robots.includes("noindex")) fails.push(`${p.url}: 404 page is indexable`);
    continue;
  }
  if (!p.title) fails.push(`${p.url}: missing <title>`);
  if (p.title.length > 70) warns.push(`${p.url}: title ${p.title.length} chars (may truncate)`);
  if (p.description.length < 70 || p.description.length > 165) warns.push(`${p.url}: description ${p.description.length} chars`);
  if (titles.has(p.title)) fails.push(`${p.url}: duplicate title with ${titles.get(p.title)}`);
  if (descs.has(p.description)) fails.push(`${p.url}: duplicate description with ${descs.get(p.description)}`);
  titles.set(p.title, p.url);
  descs.set(p.description, p.url);
  const expected = SITE + (p.url === "/" ? "" : p.url);
  if (p.canonical !== expected) fails.push(`${p.url}: canonical "${p.canonical}" ≠ "${expected}"`);
  const directives = p.robots.split(",").map((s) => s.trim());
  const expectedDirective = indexing.enabled ? "index" : "noindex";
  const forbiddenDirective = indexing.enabled ? "noindex" : "index";
  if (!directives.includes(expectedDirective) || directives.includes(forbiddenDirective) || !directives.includes("follow"))
    fails.push(`${p.url}: robots "${p.robots}"; expected ${expectedDirective}, follow`);
  if (p.h1Count !== 1) fails.push(`${p.url}: ${p.h1Count} <h1> in main`);
  for (const img of p.imgs) if (!/ alt="/.test(img)) fails.push(`${p.url}: <img> without alt`);

  const words = p.mainText.split(" ").length;
  if (words < 300 && !/privacy|terms/.test(p.url)) warns.push(`${p.url}: thin main content (${words} words)`);

  // keyword stuffing: exact "ac repair" frequency in main content
  const hits = (p.mainText.toLowerCase().match(/\bac repair\b/g) || []).length;
  const density = (hits * 2 * 100) / words;
  if (density > 3) fails.push(`${p.url}: "AC repair" density ${density.toFixed(1)}% (stuffing risk)`);
  else if (density > 2) warns.push(`${p.url}: "AC repair" density ${density.toFixed(1)}%`);

  // structured data
  try {
    const graph = JSON.parse(p.ld)["@graph"];
    const flat = JSON.stringify(graph);
    if (/"aggregateRating"|"@type":"Review"/.test(flat)) fails.push(`${p.url}: self-serving review/rating markup`);
    // Google resolves @id only within the page: a bare {"@id"} with no node behind it becomes an empty, unnamed item
    // (e.g. "BreadcrumbList: missing field itemListElement" in Search Console).
    const defined = new Set();
    const refs = [];
    const visit = (n) => {
      if (Array.isArray(n)) return n.forEach(visit);
      if (!n || typeof n !== "object") return;
      if (n["@id"] && Object.keys(n).length === 1) refs.push(n["@id"]);
      else if (n["@id"]) defined.add(n["@id"]);
      if ([].concat(n["@type"]).includes("BreadcrumbList") && !n.itemListElement?.length)
        fails.push(`${p.url}: BreadcrumbList without itemListElement`);
      for (const [k, v] of Object.entries(n)) if (!k.startsWith("@")) visit(v);
    };
    visit(graph);
    for (const id of new Set(refs)) if (!defined.has(id)) fails.push(`${p.url}: JSON-LD reference to undefined node ${id}`);

    const faqNode = graph.find((n) => [].concat(n["@type"]).includes("FAQPage"));
    if (faqNode) {
      const visible = p.mainText.toLowerCase();
      for (const q of faqNode.mainEntity) {
        // Google's FAQ guidelines: a question repeated across the site is marked up on one page only.
        if (faqMarkup.has(q.name)) fails.push(`${p.url}: FAQ "${q.name}" is also marked up on ${faqMarkup.get(q.name)}`);
        else faqMarkup.set(q.name, p.url);
        if (!visible.includes(q.name.toLowerCase())) fails.push(`${p.url}: FAQ markup question not visible: "${q.name}"`);
        if (!visible.includes(q.acceptedAnswer.text.toLowerCase().slice(0, 60)))
          fails.push(`${p.url}: FAQ markup answer not visible for "${q.name}"`);
      }
    }
  } catch (e) {
    fails.push(`${p.url}: invalid JSON-LD (${e.message})`);
  }
}

// ---- links: broken + inbound counts (orphans)
const inbound = new Map([...known].map((u) => [u, new Set()]));
for (const p of pages) {
  for (const l of new Set(p.links)) {
    if (isStatic(l)) continue;
    if (!known.has(l)) fails.push(`${p.url}: broken internal link ${l}`);
    else if (l !== p.url) inbound.get(l).add(p.url);
  }
}
const contentPages = pages.filter((p) => !isNotFound(p));
const indexable = indexing.enabled ? contentPages : [];
const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml.body"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => dec(m[1]));
const expectedUrls = new Set(indexable.map((p) => SITE + (p.url === "/" ? "" : p.url)));
for (const url of sitemapUrls) if (!expectedUrls.has(url)) fails.push(`sitemap: unexpected URL ${url}`);
for (const url of expectedUrls) if (!sitemapUrls.includes(url)) fails.push(`sitemap: missing URL ${url}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fails.push("sitemap: duplicate URLs");
for (const p of contentPages) {
  const n = inbound.get(p.url).size;
  if (n === 0) fails.push(`${p.url}: orphan page (no internal links point to it)`);
  else if (n < 3) warns.push(`${p.url}: only ${n} internal pages link to it`);
}

// ---- near-duplicate content (scaled content / doorway detection)
const shingles = (t, k = 5) => {
  const w = t.toLowerCase().replace(/[^a-z0-9₹ ]+/g, " ").split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + k <= w.length; i++) s.add(w.slice(i, i + k).join(" "));
  return s;
};
const sh = contentPages.map((p) => [p.url, shingles(p.mainText)]);
const pairs = [];
for (let i = 0; i < sh.length; i++) {
  for (let j = i + 1; j < sh.length; j++) {
    const [ua, a] = sh[i];
    const [ub, b] = sh[j];
    let inter = 0;
    for (const x of a) if (b.has(x)) inter++;
    const jac = inter / (a.size + b.size - inter || 1);
    pairs.push([jac, ua, ub]);
  }
}
pairs.sort((x, y) => y[0] - x[0]);
for (const [jac, ua, ub] of pairs) {
  if (jac >= 0.5) fails.push(`near-duplicate content ${(jac * 100).toFixed(0)}%: ${ua} ↔ ${ub}`);
  else if (jac >= 0.3) warns.push(`similar content ${(jac * 100).toFixed(0)}%: ${ua} ↔ ${ub}`);
}

// ---- outbound links (should only be booking channels and cited sources)
const outDomains = new Map();
for (const p of pages) for (const e of p.externals) outDomains.set(new URL(e).hostname, (outDomains.get(new URL(e).hostname) || 0) + 1);

// ---- report
const inboundCounts = contentPages.map((p) => inbound.get(p.url).size).sort((a, b) => a - b);
console.log(`Pages audited: ${indexable.length} indexable + ${contentPages.length - indexable.length} temporarily noindex + ${pages.length - contentPages.length} not-found`);
console.log(`Sitemap URLs: ${sitemapUrls.length}`);
console.log(`Inbound internal links per page: min ${inboundCounts[0]}, median ${inboundCounts[Math.floor(inboundCounts.length / 2)]}, max ${inboundCounts.at(-1)}`);
console.log(`Highest content similarity: ${(pairs[0][0] * 100).toFixed(0)}% (${pairs[0][1]} ↔ ${pairs[0][2]})`);
console.log(`Outbound domains: ${[...outDomains.entries()].map(([d, n]) => `${d} (${n})`).join(", ")}`);
if (warns.length) console.log(`\nWARNINGS (${warns.length}):\n  - ${warns.join("\n  - ")}`);
if (fails.length) {
  console.log(`\nFAILURES (${fails.length}):\n  - ${fails.join("\n  - ")}`);
  process.exit(1);
}
console.log("\n✓ No failures");
