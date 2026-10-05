import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { IconArrow, IconClock, IconPin, IconShield, IconStar, SERVICE_ICONS } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { GuideList } from "../components/cards";
import { AnswerBox, RichText, SectionHead } from "../components/ui";
import { AREAS, AREA_GUIDES, areaBySlug, areaPath } from "../data/areas";
import { routeFaqs } from "../data/faqs";
import { guideBySlug, type Guide } from "../data/guides";
import { SERVICES, servicePath } from "../data/services";
import { SITE, TESTIMONIALS, waLink } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";
import { NotFound } from "./NotFound";

export function AreaPage({ route }: { route: RouteDef }) {
  const a = areaBySlug(route.slug!);
  if (!a) return <NotFound route={route} />;
  const places = a.zones.flatMap((z) => z.places);
  const waText = `Hi Airkraft, I need AC repair in ${a.city}. Please share the next slot.`;
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
              { Icon: IconPin, k: "Neighbourhoods", v: `${places.length} covered in ${a.city}` },
              { Icon: IconShield, k: "Warranty", v: `${SITE.warranty} on repairs, GST invoice` },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="flex items-start gap-4 bg-forest/95 p-5">
                <Icon size={20} className="mt-0.5 shrink-0 text-brass" />
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
                          href={waLink(`Hi Airkraft, I need AC repair in ${p}, ${a.city}. Please share the next slot.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1.5 text-sm transition hover:border-forest hover:text-forest"
                        >
                          <IconPin size={13} className="text-brass" /> {p}
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
            <SectionHead kicker="Local knowledge" title={`What AC repair in ${a.city} actually involves`} />
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
                <div className="flex gap-1 text-brass" role="img" aria-label={`Rated ${review.rating} out of 5`}>
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

      <section className="bg-cream py-20 md:py-24" aria-labelledby="area-services">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead id="area-services" kicker={`Services in ${a.city}`} title={`Every AC service, available in ${a.city}`} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <li key={s.slug}>
                  <Link
                    to={servicePath(s.slug)}
                    className="group flex h-full items-center gap-3 rounded-xl border border-line bg-paper p-4 transition hover:border-forest/40 hover:bg-white"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-sand">
                      <Icon size={18} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{s.name}</span>
                      <span className="block text-xs text-copper">{s.price}</span>
                    </span>
                    <IconArrow size={16} className="text-moss transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {guides.length > 0 && (
            <div className="mt-16">
              <SectionHead
                kicker="Helpful guides"
                title={`What ${a.city} customers read before booking`}
                text="Technician-written guides on the problems we see most in this part of NCR."
              />
              <div className="mt-8">
                <GuideList guides={guides} tone="paper" />
              </div>
            </div>
          )}

          <div className="mt-14 border-t border-line pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Also covering</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={areaPath(o.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-forest hover:text-forest"
                  >
                    AC repair in {o.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={routeFaqs(route)} title={`AC repair in ${a.city}: questions`} />
      <CTA
        title={`AC down in ${a.city}?`}
        text="Send your landmark and the fault. We reply with an honest arrival window and a technician’s name."
        wa={waLink(waText)}
      />
    </>
  );
}
