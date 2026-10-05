import { CTA } from "../components/CTA";
import { GuideCard } from "../components/cards";
import { IconArrow } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AnswerBox } from "../components/ui";
import { CLUSTERS, GUIDES, guidesInCluster } from "../data/guides";
import { serviceBySlug, servicePath } from "../data/services";
import { SITE } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

export function Guides({ route }: { route: RouteDef }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Guides"
        title="Know what is wrong before anyone quotes you."
        lede="Plain-language guides from technicians who fix ACs across Delhi NCR every day — causes, costs, schedules, sizing and error codes."
        photo="training"
        actions={false}
      >
        <nav aria-label="Guide topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {CLUSTERS.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-block rounded-full border border-cream/20 px-4 py-2 text-sm transition hover:border-brass hover:text-sand"
                >
                  {c.name} <span className="text-mist/60">({guidesInCluster(c.id).length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <AnswerBox
              label="About these guides"
              updated={SITE.updated}
              text={`${GUIDES.length} guides written and reviewed by Airkraft’s technicians for Delhi NCR’s climate: why ACs stop cooling, leak, smell or show error codes; what gas filling and repairs really cost; how often to service; how to size, buy, protect and install an AC; and a glossary of the terms on your quote.`}
            />
          </div>

          <div className="mt-16 space-y-20">
            {CLUSTERS.map((c) => {
              const pillar = c.service ? serviceBySlug(c.service) : undefined;
              const items = guidesInCluster(c.id);
              return (
                <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`} className="scroll-mt-28">
                  <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
                    <div>
                      <h2 id={`${c.id}-h`} className="font-display text-3xl font-bold tracking-tight">
                        {c.name}
                      </h2>
                      <p className="mt-2 max-w-2xl text-muted">{c.intro}</p>
                    </div>
                    {pillar && (
                      <Link to={servicePath(pillar.slug)} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest">
                        {pillar.name} <IconArrow size={16} />
                      </Link>
                    )}
                  </div>
                  <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((g, i) => (
                      <Reveal as="li" key={g.slug} delay={(i % 3) + 1}>
                        <GuideCard g={g} />
                      </Reveal>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <CTA title="Rather someone just fixed it?" />
    </>
  );
}
