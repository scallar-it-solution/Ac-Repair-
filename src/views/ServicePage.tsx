import { CTA } from "../components/CTA";
import { ContactForm } from "../components/ContactForm";
import { FAQ } from "../components/FAQ";
import { GuideList, PriceTable, ServiceCard } from "../components/cards";
import { IconArrow, IconCheck, IconPhone, IconPin, IconShield, IconX } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AnswerBox, SectionHead } from "../components/ui";
import { AREAS, areaPath } from "../data/areas";
import { routeFaqs } from "../data/faqs";
import { guideBySlug, guidePath, guideShortTitle, guidesForService } from "../data/guides";
import { serviceBySlug } from "../data/services";
import { BRANDS, SITE, TEL, waLink } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";
import { NotFound } from "./NotFound";

export function ServicePage({ route }: { route: RouteDef }) {
  const s = serviceBySlug(route.slug!);
  if (!s) return <NotFound route={route} />;
  const waText = `Hi Frostwright, I need ${s.name} in Delhi NCR. Please share a slot.`;
  const related = s.related.map(serviceBySlug).filter((x) => x !== undefined);
  const guides = guidesForService(s.slug);

  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker={s.price}
        title={s.h1}
        lede={s.lede}
        photo={s.photo}
        photoAlt={s.photoAlt}
        waText={waText}
      />

      <div className="bg-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-8">
            <div>
              <AnswerBox text={s.answer} updated={SITE.updated} />
              {s.facts && (
                <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {s.facts.map((f) => (
                    <div key={f.k} className="bg-paper p-5">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">{f.k}</dt>
                      <dd className="mt-1.5 text-[15px] font-medium text-ink">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <section aria-labelledby="symptoms">
              <SectionHead id="symptoms" kicker="Symptoms" title={s.symptomsTitle} />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {s.symptoms.map((x) => (
                  <li key={x.title} className="flex flex-col rounded-2xl border border-line bg-paper p-5">
                    <h3 className="font-display text-lg font-semibold">{x.title}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{x.text}</p>
                    {x.guide && guideBySlug(x.guide) && (
                      <Link
                        to={guidePath(x.guide)}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline"
                      >
                        Read: {guideShortTitle(guideBySlug(x.guide)!)} <IconArrow size={14} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="process">
              <SectionHead id="process" kicker="How it is done" title="What happens on the visit" />
              <ol className="mt-8 space-y-0">
                {s.process.map((p, i) => (
                  <li key={p.title} className="relative grid grid-cols-[auto_1fr] gap-5 pb-8 last:pb-0">
                    {i < s.process.length - 1 && (
                      <span aria-hidden="true" className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px bg-line" />
                    )}
                    <span className="font-display relative flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm font-bold text-mint">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {s.table && (
              <section aria-labelledby="compare">
                <SectionHead id="compare" kicker="Compared" title={s.table.title} />
                <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full min-w-[34rem] text-left text-sm md:text-[15px]">
                    <caption className="sr-only">{s.table.caption}</caption>
                    <thead className="bg-forest text-cream">
                      <tr>
                        {s.table.head.map((h) => (
                          <th key={h} scope="col" className="px-5 py-3.5 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map(([first, ...rest]) => (
                        <tr key={first} className="border-t border-line align-top">
                          <th scope="row" className="bg-paper px-5 py-4 font-semibold text-ink">
                            {first}
                          </th>
                          {rest.map((c, i) => (
                            <td key={i} className="px-5 py-4 text-muted">
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section aria-labelledby="included" className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-paper p-6">
                <h2 id="included" className="font-display text-xl font-bold">
                  Included
                </h2>
                <ul className="mt-4 space-y-3 text-[15px]">
                  {s.included.map((x) => (
                    <li key={x} className="flex gap-3">
                      <IconCheck size={18} className="mt-0.5 shrink-0 text-sage" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line p-6">
                <h2 className="font-display text-xl font-bold">Quoted separately</h2>
                <ul className="mt-4 space-y-3 text-[15px] text-muted">
                  {s.excluded.map((x) => (
                    <li key={x} className="flex gap-3">
                      <IconX size={18} className="mt-0.5 shrink-0 text-moss" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="prices">
              <SectionHead
                id="prices"
                kicker="Prices"
                title="What it costs in Delhi NCR"
                text="Starting prices. The final figure is quoted on WhatsApp after diagnosis, before any work starts."
              />
              <div className="mt-8">
                <PriceTable rows={s.prices} caption="Starting prices for this service" />
              </div>
              <p className="mt-4 text-sm text-muted">
                See every rate on the <Link to="/pricing" className="font-medium text-forest underline underline-offset-4">price list</Link>.
              </p>
            </section>

            {guides.length > 0 && (
              <section aria-labelledby="service-guides">
                <SectionHead
                  id="service-guides"
                  kicker="Before you book"
                  title="Worth reading first"
                  text="Written by our technicians — what causes the problem, what you can check yourself, and what the fix costs."
                />
                <div className="mt-8">
                  <GuideList guides={guides} tone="paper" />
                </div>
              </section>
            )}

            <section aria-labelledby="coverage" className="rounded-2xl bg-forest p-7 text-cream md:p-9">
              <h2 id="coverage" className="font-display text-2xl font-bold">
                {s.short} across Delhi NCR
              </h2>
              <p className="mt-2 text-sm text-mist/80">
                Same-day slots in every city below. All major brands: {BRANDS.slice(0, 8).join(", ")} and more.
              </p>
              <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {AREAS.map((a) => (
                  <li key={a.slug} className="flex gap-2.5">
                    <IconPin size={16} className="mt-1 shrink-0 text-mint" />
                    <span>
                      <Link to={areaPath(a.slug)} className="font-semibold text-cream underline-offset-4 hover:text-mint hover:underline">
                        {a.city}
                      </Link>
                      <span className="block text-xs leading-relaxed text-mist/70">
                        {a.eta}
                        {a.travel ? `. ${a.travel}` : ""}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-4" aria-label="Book this service">
            <div className="rounded-3xl border border-line bg-paper p-6 lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Book {s.short}</p>
              <p className="font-display mt-2 text-3xl font-bold text-forest">{s.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <IconShield size={16} className="mt-0.5 shrink-0 text-sage" /> {SITE.warranty} warranty on repairs
                </li>
                <li className="flex gap-2">
                  <IconCheck size={16} className="mt-0.5 shrink-0 text-sage" /> GST invoice · UPI, card, cash
                </li>
                <li className="flex gap-2">
                  <IconCheck size={16} className="mt-0.5 shrink-0 text-sage" /> Typical arrival {SITE.eta}
                </li>
              </ul>
              <div className="my-6 h-px bg-line" />
              <ContactForm compact />
              <a href={TEL} className="btn btn-outline mt-3 w-full">
                <IconPhone size={16} /> Call {SITE.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper py-20" aria-labelledby="related">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead id="related" kicker="Related" title="Often booked together" />
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i + 1}>
                  <ServiceCard s={r} tone="cream" />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FAQ items={routeFaqs(route)} title="Common questions" />
      <CTA
        title="Book a technician today."
        text="Send the brand, the fault and a photo. You get a slot, a name and a quote before anyone opens a panel."
        wa={waLink(waText)}
        emergencyLink={s.slug !== "emergency-ac-repair"}
      />
    </>
  );
}
