import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { IconClock, IconPin, IconShield, IconStar } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { GuideList, PriceTable, ServiceLinkGrid } from "../components/cards";
import { AnswerBox, RichText, SectionHead } from "../components/ui";
import { AREAS, AREA_GUIDES, areaBySlug, areaPath } from "../data/areas";
import { BRAND_PAGES, brandPath } from "../data/brands";
import { routeFaqs } from "../data/faqs";
import { guideBySlug, type Guide } from "../data/guides";
import { SERVICES } from "../data/services";
import { KEY_PRICES, SITE, TESTIMONIALS, waLink } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";
import { NotFound } from "./NotFound";

export function AreaPage({ route }: { route: RouteDef }) {
  const a = areaBySlug(route.slug!);
  if (!a) return <NotFound route={route} />;
  const places = a.zones.flatMap((z) => z.places);
  const waText = `Hi Frostwright, I need AC repair in ${a.city}. Please share the next slot.`;
  const review = TESTIMONIALS.find((t) => t.area.includes(a.city) || places.some((p) => t.area.includes(p)));
  const others = AREAS.filter((x) => x.slug !== a.slug);
  const guides = (AREA_GUIDES[a.slug] ?? []).map(guideBySlug).filter((g): g is Guide => !!g);

  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker={`${a.state} · Service area`}
        title={a.h1}
        lede={a.lede}
        waText={waText}
        aside={
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 text-sm">
            {[
              { Icon: IconClock, k: "Typical arrival", v: a.eta },
              { Icon: IconClock, k: "Hours", v: SITE.hours },
              { Icon: IconPin, k: "Neighbourhoods", v: `${places.length} covered` },
              { Icon: IconShield, k: "Warranty", v: `${SITE.warranty} on repairs, GST invoice` },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="flex items-start gap-4 bg-forest/95 p-5">
                <Icon size={20} className="mt-0.5 shrink-0 text-mint" />
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-mist/60">{k}</dt>
                  <dd className="mt-1 font-medium text-cream">{v}</dd>
                </div>
              </div>
            ))}
          </dl>
        }
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <AnswerBox text={a.answer} updated={SITE.updated} />
          </div>

          <div className="mt-16">
            <SectionHead
              kicker="Neighbourhoods"
              title={`Where we work in ${a.city}`}
              text="Tap your area to open WhatsApp with the location already filled in."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {a.zones.map((z) => (
                <div key={z.name} className="rounded-2xl border border-line bg-paper p-6">
                  <h3 className="font-display text-lg font-semibold">{z.name}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {z.places.map((p) => (
                      <li key={p}>
                        <a
                          href={waLink(`Hi Frostwright, I need AC repair in ${p}, ${a.city}. Please share the next slot.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1.5 text-sm transition hover:border-forest hover:text-forest"
                        >
                          <IconPin size={13} className="text-sage" /> {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHead kicker="Local knowledge" title="What the job actually involves here" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {a.local.map((l, i) => (
              <Reveal key={l.title} delay={(i % 2) + 1}>
                <article className="h-full rounded-2xl border border-line bg-cream p-7">
                  <h3 className="font-display text-xl font-semibold">{l.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    <RichText text={l.text} />
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {review && (
            <Reveal className="mt-12">
              <figure className="rounded-2xl bg-forest p-8 text-cream md:p-10">
                <div className="flex gap-1 text-mint" role="img" aria-label={`Rated ${review.rating} out of 5`}>
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <IconStar key={s} size={15} />
                  ))}
                </div>
                <blockquote className="font-display mt-5 max-w-3xl text-xl leading-snug md:text-2xl">“{review.text}”</blockquote>
                <figcaption className="mt-6 text-sm text-mist/70">
                  <span className="font-semibold text-cream">{review.name}</span> · {review.area} · {review.machine}
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-cream py-20 md:py-24" aria-labelledby="area-prices">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 md:px-8">
          <div className="md:col-span-5">
            <SectionHead
              id="area-prices"
              kicker="Prices"
              title={`AC repair & service prices in ${a.city}`}
              text={`The same published starting prices apply in ${a.city} as across Delhi NCR. Every visit starts with a ${SITE.visitFee} inspection, waived if you approve the repair on the same visit.`}
            />
            {a.travel && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{a.travel}</p>}
            <Link to="/pricing" className="btn btn-primary mt-8">
              Full price list
            </Link>
          </div>
          <div className="md:col-span-7">
            <PriceTable rows={KEY_PRICES} caption={`Frostwright AC service starting prices in ${a.city}`} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream py-20 md:py-24" aria-labelledby="area-services">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead id="area-services" kicker="Services" title="Every AC service, same-day" />
          <div className="mt-10">
            <ServiceLinkGrid services={SERVICES} />
          </div>

          {guides.length > 0 && (
            <div className="mt-16">
              <SectionHead
                kicker="Helpful guides"
                title="What customers here read before booking"
                text="Technician-written guides on the problems we see most in this part of NCR."
              />
              <div className="mt-8">
                <GuideList guides={guides} tone="paper" />
              </div>
            </div>
          )}

          <div className="mt-14 border-t border-line pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Other NCR cities we cover</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={areaPath(o.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-forest hover:text-forest"
                  >
                    {o.city}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/service-areas" className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-forest">
                  All service areas →
                </Link>
              </li>
            </ul>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Brands we fix</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {BRAND_PAGES.map((b) => (
                <li key={b.slug}>
                  <Link
                    to={brandPath(b.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-forest hover:text-forest"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/brands" className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-forest">
                  All brands →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={routeFaqs(route)} title="Common questions" />
      <CTA
        title={`AC down in ${a.city}?`}
        text="Send your landmark and the fault. We reply with an honest arrival window and a technician’s name."
        wa={waLink(waText)}
      />
    </>
  );
}
