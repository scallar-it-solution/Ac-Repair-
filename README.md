# Frostwright — AC Repair Delhi NCR

Website for Frostwright AC Repair: same-day AC repair, servicing, gas filling, installation and AMC across Delhi, Noida, Greater Noida, Gurugram, Ghaziabad and Faridabad.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (PostCSS plugin)
- Fonts self-hosted with `next/font` (Oswald — brand display face, Outfit — body)
- Every page is statically generated at build time (SSG) — full HTML for search engines and AI crawlers

## Getting started

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerendered)
npm run start      # serve the production build
npm run typecheck
```

## Project structure

```
src/
  app/                 Next.js routes (thin: metadata + RouteView)
    layout.tsx         <html>, fonts, header/footer, site-wide metadata
    [area]/            city pages: /ac-repair-delhi, /ac-repair-noida, …
    services/[slug]/   service pages
    guides/[slug]/     guide articles
    sitemap.ts         /sitemap.xml   (generated from the route table)
    robots.ts          /robots.txt    (search + AI crawlers allowed)
    llms.txt/route.ts  /llms.txt      (plain-text brief for AI answer engines)
    not-found.tsx      real 404 page (noindex)
  views/               page layouts (server components)
  components/          UI; only Header, ContactForm, FAQList, Reveal, ClientEffects run in the browser
  data/                ALL content — edit here
    site.ts            business facts (NAP), prices, testimonials, team, brands
    services.ts        8 service pages
    areas.ts           6 city pages + city → guide links
    guides/            17 guides in 5 topic clusters
    faqs.ts            FAQ sets per page (also feeds FAQPage schema)
  routes.ts            every URL with its title, description, breadcrumbs, sitemap priority
  seo/
    metadata.ts        per-page <head>: title, description, canonical, OG, Twitter, geo
    schema.ts          JSON-LD @graph (HVACBusiness, WebSite, WebPage, Service, Article, FAQPage, BreadcrumbList)
    files.ts           llms.txt and sitemap helpers
public/                images (self-hosted WebP), icons, web manifest
```

## Editing content

All copy lives in `src/data/`. Change it there and every place that uses it — pages, structured data, sitemap, llms.txt — updates on the next build.

- **Business facts** (phone, hours, address, rating, prices): `src/data/site.ts`. Update `SITE.updated` when content is reviewed; it drives "last reviewed" dates and sitemap `<lastmod>`.
- **Official profiles**: add Google Business Profile, Facebook, Instagram, Justdial URLs to `SITE.sameAs`.
- **New guide**: add it to the right cluster file in `src/data/guides/`, set `related` (services) and `relatedGuides`. It is picked up by the route table, sitemap, hub page and interlinking automatically.
- Inline links in guide and city text: `[label](/path)`; bold: `**text**`.

## SEO architecture

- Static HTML for every URL; unique title, description and canonical per page
- Connected JSON-LD graph on every page; FAQ markup always matches the visible FAQs
- Topic clusters: guides ↔ services ↔ city pages are interlinked from data, so links never go stale
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and other AI crawlers
- Lead tracking: clicks on call / WhatsApp links push `lead_click` to `dataLayer` (GTM) and `generate_lead` to GA4. Set `GA4_ID` in `src/data/site.ts` to load GA4; the privacy policy then describes the analytics cookies automatically
- IndexNow: after a deploy, `npm run indexnow` (all sitemap URLs) or `npm run indexnow -- /pricing /faq` (changed paths; prefix `MSYS_NO_PATHCONV=1` in Git Bash on Windows) notifies Bing, Yandex and other IndexNow engines; the key file lives in `public/`

## Deployment

Search indexing is enabled (`src/data/indexing.json`, `enabled: true`, since 9 October 2026): every content page emits
`index, follow` with a self-referencing canonical and is listed in the sitemap; only the 404 is noindex. Setting
`enabled` to `false` and deploying switches the whole site to `noindex, follow`, adds `X-Robots-Tag: noindex, follow`
and empties the sitemap — use it only for a deliberate de-indexing.
The old `airkraft-ac-repair.vercel.app` copy is intentionally left on noindex (with canonicals to frostwright.in) so it
never competes with the live site. It is not Git-connected; delete that Vercel project when convenient.

Production runs as a Docker container on a Hostinger VPS, behind Caddy (automatic HTTPS). GitHub Actions verifies the site and builds the Docker image on pushes and pull requests. Pushes to `main` publish `docker.io/pateldeepesh/acrepair` when Docker Hub credentials are set; the VPS receives the immutable `sha-<commit>` tag once `DEPLOY_ENABLED=true`. Server setup, secrets and rollback: [DEPLOY.md](DEPLOY.md).

```
.github/workflows/ci-cd.yml   verify (typecheck, build, spam-policy audit) → Docker image → deploy
Dockerfile                    Next.js standalone server image
deploy/                       docker-compose.yml, Caddyfile and the server-side deploy script
```

The existing Quorlytic VPS uses `VPS_DEPLOY_MODE=shared`: restricted blue/green deployment behind its existing Caddy
proxy. A healthy new slot replaces the old one, then the old container and obsolete Frostwright images are deleted.
See the shared-server setup in [DEPLOY.md](DEPLOY.md).

Redirects, trailing-slash handling and security headers are in `next.config.ts`.

Run the production image locally: `docker build -t frostwright-ac-repair . && docker run --rm -p 3000:3000 frostwright-ac-repair`.
