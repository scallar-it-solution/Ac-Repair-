import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { GuideList, ServiceCard } from "../components/cards";
import { IconAlert, IconArrow, IconCheck, IconPin, IconShield } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AnswerBox, SectionHead } from "../components/ui";
import { AREAS, areaPath } from "../data/areas";
import { BRAND_PAGES, brandBySlug, brandPath } from "../data/brands";
import { routeFaqs } from "../data/faqs";
import { guideBySlug, type Guide } from "../data/guides";
import { serviceBySlug } from "../data/services";
import { BRAND_DISCLAIMER, SITE, waLink } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";
import { NotFound } from "./NotFound";

export function BrandDetail({ route }: { route: RouteDef }) {
  const b = brandBySlug(route.slug!);
  if (!b) return <NotFound route={route} />;
  const waText = `Hi Airkraft, I need ${b.name} AC repair/service in Delhi NCR. Please share a slot.`;
  const services = b.services.map(serviceBySlug).filter((s) => s !== undefined);
  const guides = b.guides.map(guideBySlug).filter((g): g is Guide => !!g);
  const others = BRAND_PAGES.filter((x) => x.slug !== b.slug);

  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Independent multi-brand service"
        title={b.h1}
        lede={b.lede}
        waText={waText}
        aside={
          <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">{b.name} machines we work on</p>
            <ul className="mt-4 space-y-2.5 text-sm text-mist/90">
              {b.lines.map((l) => (
                <li key={l} className="flex gap-2.5">
                  <IconCheck size={16} className="mt-0.5 shrink-0 text-brass" /> {l}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex gap-2.5 border-t border-cream/10 pt-4 text-xs leading-relaxed text-mist/70">
              <IconShield size={16} className="mt-0.5 shrink-0 text-brass" />
              Not affiliated with {b.name}. Under warranty? Contact {b.name} first.
            </p>
          </div>
        }
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <AnswerBox text={b.answer} updated={SITE.updated} />
          </div>

          <div className="mt-16">
            <SectionHead kicker="Common faults" title={`${b.name} AC problems we fix`} />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {b.faults.map((f, i) => (
                <Reveal as="li" key={f.title} delay={(i % 3) + 1}>
                  <Link
                    to={f.to}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition hover:border-forest/40 hover:bg-white"
                  >
                    <span className="font-display text-lg font-semibold">{f.title}</span>
                    <span className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{f.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                      How we fix it <IconArrow size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead kicker="Error codes" title={`${b.name} error codes`} text={b.codesNote} />
              {b.codes ? (
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full min-w-[480px] overflow-hidden rounded-2xl border border-line text-left text-sm">
                    <caption className="sr-only">Common {b.name} AC error codes</caption>
                    <thead className="bg-forest text-cream">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-medium">Code</th>
                        <th scope="col" className="px-4 py-3 font-medium">Meaning</th>
                        <th scope="col" className="px-4 py-3 font-medium">Usual cause</th>
                      </tr>
                    </thead>
                    <tbody>
                      {b.codes.map((c) => (
                        <tr key={c.code} className="border-t border-line even:bg-paper/60">
                          <th scope="row" className="font-display px-4 py-3 font-semibold text-ink">{c.code}</th>
                          <td className="px-4 py-3 text-ink/80">{c.meaning}</td>
                          <td className="px-4 py-3 text-muted">{c.cause}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              <p className="mt-5 text-sm text-muted">
                All brands compared in <Link to="/guides/ac-error-codes" className="font-medium text-forest underline underline-offset-4">AC error codes explained</Link>.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-forest p-7 text-cream">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">Owner’s notes</p>
                <ul className="mt-5 space-y-5">
                  {b.tips.map((t) => (
                    <li key={t.title}>
                      <p className="font-display text-lg font-semibold">{t.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-mist/80">{t.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-20" aria-labelledby="brand-services">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead id="brand-services" kicker="Services" title={`Services for ${b.name} ACs`} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard s={s} tone="cream" />
              </li>
            ))}
          </ul>

          {guides.length > 0 && (
            <div className="mt-16">
              <SectionHead kicker="Guides" title={`Read before you book a ${b.name} repair`} />
              <div className="mt-8">
                <GuideList guides={guides} />
              </div>
            </div>
          )}

          <div className="mt-14 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Service across NCR</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={areaPath(a.slug)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3.5 py-2 text-sm transition hover:border-forest hover:text-forest"
                    >
                      <IconPin size={13} className="text-brass" /> {a.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Other brands</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to={brandPath(o.slug)}
                      className="inline-block rounded-full border border-line bg-cream px-3.5 py-2 text-sm font-medium transition hover:border-forest hover:text-forest"
                    >
                      {o.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/brands" className="inline-block rounded-full px-3.5 py-2 text-sm font-semibold text-forest">
                    All brands →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 flex gap-3 rounded-2xl border border-line bg-cream p-5 text-sm text-muted">
            <IconAlert size={18} className="mt-0.5 shrink-0 text-copper" />
            {BRAND_DISCLAIMER}
          </p>
        </div>
      </section>

      <FAQ items={routeFaqs(route)} title={`${b.name} AC questions`} />
      <CTA title={`${b.name} AC acting up?`} text="Send the model sticker, the error code and a photo. You get a slot, a name and a quote before anyone opens a panel." wa={waLink(waText)} />
    </>
  );
}
