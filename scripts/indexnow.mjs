/**
 * Notify IndexNow search engines (Bing — which also feeds ChatGPT search and Copilot — Yandex, Seznam, Naver)
 * that URLs changed. Run after a deploy is live:
 *
 *   npm run indexnow                      every URL in the live sitemap
 *   npm run indexnow -- /pricing /faq     only these paths
 *
 * Submit only URLs that actually changed; resubmitting unchanged pages does not speed anything up.
 * The key file public/<KEY>.txt must stay deployed, or the submission is rejected.
 */
const SITE = "https://frostwright.in";
const KEY = "4b997ed617befddd920d3f036145c558";

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => (p === "/" ? SITE : SITE + p));
} else {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml: HTTP ${res.status}`);
  urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) throw new Error("No URLs to submit");

const keyRes = await fetch(`${SITE}/${KEY}.txt`);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) throw new Error(`Key file ${SITE}/${KEY}.txt is not live yet`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
// 200 = accepted, 202 = accepted, key validation pending. Anything else is an error.
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
