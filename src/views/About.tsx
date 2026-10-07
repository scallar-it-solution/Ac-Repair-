import { CTA } from "../components/CTA";
import { IconArrow, IconShield } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Kicker, Photo, SectionHead } from "../components/ui";
import { SITE, TEAM } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

const WONT = [
  "Quote gas without a leak test.",
  "Fit an unbranded PCB and disappear.",
  "Tell you a 4-year-old inverter is scrap so we can sell a new one.",
  "Leave without a GST invoice and a WhatsApp log of the work.",
];

export function About({ route }: { route: RouteDef }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="About Frostwright"
        title="A workshop that learned to show up on time."
        lede={`Frostwright started in ${SITE.founded} as two technicians with a van and a rule: do not invent a dead compressor to close a sale. That rule paid better than the sale.`}
        photo="training"
        actions={false}
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <SectionHead kicker="The short version" title="We still think like the person on the ladder." />
          </Reveal>
          <div className="space-y-5 text-[17px] leading-relaxed text-muted md:col-span-7">
            <Reveal>
              <p>
                Delhi NCR summers punish machines and people equally. The market responded with visiting charges, mystery
                “gas khatam” quotes, and a new contractor every April. We built Frostwright as the opposite of that — a small
                bench, logged jobs, and technicians who can read an inverter error without calling a friend.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p>
                Today we run a dispatch desk in New Delhi, a parts shelf that actually has R32 gauges, and an AMC book for
                homes and clinics that do not want to re-explain their cassette every May. {SITE.jobs} jobs later, the rule
                is the same: diagnosis first.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p>
                We are not a pan-India app. We are an NCR trade. If we cannot reach you today, we say so. If the machine
                should be replaced, we say that too — and we will still install the new one if you want us to.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-forest py-16 text-cream">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-8">
          {[
            [String(SITE.founded), "Year we started"],
            [SITE.jobs, "Documented jobs"],
            [SITE.warranty, "Workmanship cover"],
            [`${SITE.rating} / 5`, "Customer rating"],
          ].map(([n, l]) => (
            <div key={l} className="flex flex-col-reverse">
              <dt className="mt-2 text-xs uppercase tracking-[0.18em] text-mist/60">{l}</dt>
              <dd className="font-display stat-number text-3xl font-bold md:text-5xl">{n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-paper py-20 md:py-28" aria-labelledby="team">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHead id="team" kicker="People" title="Who turns up" />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i + 1}>
                <article className="h-full rounded-2xl border border-line bg-cream p-6">
                  <span className="font-display flex h-12 w-12 items-center justify-center rounded-full bg-forest text-mint">
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <h3 className="font-display mt-5 text-xl font-semibold">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{t.role}</p>
                  <p className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
                    <span className="text-forest">{t.focus}</span>
                    <span className="font-semibold text-sage">{t.years}</span>
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <div className="img-zoom aspect-[4/3] overflow-hidden rounded-2xl">
              <Photo name="pcb" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <Kicker>Standards</Kicker>
            <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">What we will not do</h2>
            <ul className="mt-6 space-y-4 text-[17px] text-muted">
              {WONT.map((w) => (
                <li key={w} className="flex gap-3">
                  <IconShield className="mt-0.5 shrink-0 text-sage" size={20} />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="btn btn-primary">
                Our services <IconArrow size={16} />
              </Link>
              <Link to="/terms" className="btn btn-outline">
                Warranty terms
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA title="Want the same technician next summer?" text="Ask about AMC. We keep the machine file." />
    </>
  );
}
