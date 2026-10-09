import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { GuideCard, ServiceCard } from "../components/cards";
import { IconAlert, IconArrow, IconClock } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { AnswerBox, RichText, SectionHead, formatDate } from "../components/ui";
import { routeFaqs } from "../data/faqs";
import { clusterOf, guideBySlug, readingMinutes, relatedGuidesFor, type Block } from "../data/guides";
import { serviceBySlug, servicePath } from "../data/services";
import { AUTHOR } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";
import { NotFound } from "./NotFound";

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return (
        <p className="text-[17px] leading-[1.75] text-ink/85">
          <RichText text={b.text} />
        </p>
      );
    case "h2":
      return (
        <h2 id={b.id} className="font-display scroll-mt-28 text-2xl font-bold md:text-3xl">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3 className="font-display text-xl font-semibold">{b.text}</h3>;
    case "ul":
      return (
        <ul className="space-y-3 text-[17px] leading-relaxed text-ink/85">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              <span>
                <RichText text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-4 text-[17px] leading-relaxed text-ink/85">
          {b.items.map((it, i) => (
            <li key={it} className="grid grid-cols-[auto_1fr] gap-4">
              <span className="font-display flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-mint">
                {i + 1}
              </span>
              <span>
                <RichText text={it} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[560px] overflow-hidden rounded-2xl border border-line text-left text-sm">
            <caption className="caption-bottom pt-3 text-left text-xs text-muted">{b.caption}</caption>
            <thead className="bg-forest text-cream">
              <tr>
                {b.head.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.join("|")} className="border-t border-line even:bg-paper/60">
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 font-semibold text-ink">
                        <RichText text={c} />
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-muted">
                        <RichText text={c} />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className="flex gap-4 rounded-2xl border-l-4 border-copper bg-mint/25 p-5 md:p-6">
          <IconAlert size={22} className="mt-0.5 shrink-0 text-copper" />
          <div>
            <p className="font-display text-lg font-semibold">{b.title}</p>
            <p className="mt-1.5 leading-relaxed text-ink/80">
              <RichText text={b.text} />
            </p>
          </div>
        </aside>
      );
    case "defs":
      return (
        <dl className="divide-y divide-line rounded-2xl border border-line">
          {b.items.map(([term, def]) => (
            <div key={term} className="grid gap-1 px-5 py-4 md:grid-cols-[200px_1fr] md:gap-6">
              <dt className="font-display font-semibold text-ink">{term}</dt>
              <dd className="text-[15px] leading-relaxed text-ink/80">
                <RichText text={def} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

export function GuidePage({ route }: { route: RouteDef }) {
  const g = guideBySlug(route.slug!);
  if (!g) return <NotFound route={route} />;
  const cluster = clusterOf(g);
  const pillar = cluster.service ? serviceBySlug(cluster.service) : undefined;
  const toc = g.blocks.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");
  const related = g.related.map(serviceBySlug).filter((x) => x !== undefined);
  const more = relatedGuidesFor(g, 3);

  return (
    <>
      <PageHero crumbs={route.crumbs} kicker={cluster.name} title={g.title} lede={g.excerpt} photo={g.photo} actions={false}>
        <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist/80">
          <span>
            By <span className="font-semibold text-cream">{AUTHOR.name}</span>, {AUTHOR.role}
          </span>
          <span>
            Updated <time dateTime={g.updated}>{formatDate(g.updated)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconClock size={14} /> {readingMinutes(g)} min read
          </span>
        </p>
      </PageHero>

      <div className="bg-cream py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block" aria-label="On this page">
            <div className="sticky top-28 space-y-8">
              {toc.length > 1 && (
                <nav aria-label="Table of contents">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">On this page</p>
                  <ol className="mt-4 space-y-2.5 border-l border-line text-sm">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-forest hover:text-forest">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              {pillar && (
                <div className="rounded-2xl bg-forest p-5 text-cream">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint">Need it fixed?</p>
                  <p className="mt-2 text-sm text-mint">{pillar.price}</p>
                  <Link to={servicePath(pillar.slug)} className="btn btn-light mt-4 w-full px-4 py-2.5 text-sm">
                    {pillar.name} <IconArrow size={14} />
                  </Link>
                </div>
              )}
            </div>
          </aside>

          <article className="min-w-0 lg:col-span-8 lg:col-start-4">
            <AnswerBox label="Short answer" text={g.answer} updated={g.updated} />
            <div className="prose-article mt-10">
              {g.blocks.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </div>

            {g.sources && g.sources.length > 0 && (
              <section aria-labelledby="sources" className="mt-12 border-t border-line pt-8">
                <h2 id="sources" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">
                  Sources
                </h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
                  {g.sources.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} target="_blank" rel="noopener" className="text-forest underline underline-offset-4 hover:text-pine">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div className="mt-14 flex gap-5 rounded-2xl border border-line bg-paper p-6">
              <span className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest text-lg font-bold text-mint">
                {AUTHOR.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Written by</p>
                <p className="font-display mt-1 text-lg font-semibold">
                  {AUTHOR.name} <span className="text-sm font-normal text-muted">· {AUTHOR.role}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{AUTHOR.bio}</p>
                <Link to="/about" className="mt-3 inline-block text-sm font-semibold text-forest underline underline-offset-4">
                  About the team
                </Link>
              </div>
            </div>

            <p className="mt-8 text-sm text-muted">
              Part of our{" "}
              <Link to={`/guides#${cluster.id}`} className="font-medium text-forest underline underline-offset-4">
                {cluster.name.toLowerCase()} guides
              </Link>
              .
              {g.slug !== "ac-glossary" && (
                <>
                  {" "}
                  Technical terms such as tonnage, PCB, R32 or superheat are explained in the{" "}
                  <Link to="/guides/ac-glossary" className="font-medium text-forest underline underline-offset-4">
                    AC glossary
                  </Link>
                  .
                </>
              )}
            </p>
          </article>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper py-20" aria-labelledby="guide-services">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead id="guide-services" kicker="Need a hand?" title="Services mentioned in this guide" />
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <ServiceCard s={s} tone="cream" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FAQ items={routeFaqs(route)} title="Questions about this topic" />

      <section className="bg-cream py-20" aria-labelledby="more-guides">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead id="more-guides" kicker="Keep reading" title="Related guides" />
            <Link to="/guides" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-forest">
              All guides <IconArrow size={16} />
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <GuideCard g={m} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
