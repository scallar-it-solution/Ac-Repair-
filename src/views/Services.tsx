import { BrandMarquee } from "../components/BrandMarquee";
import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { PriceTable, ServiceCard } from "../components/cards";
import { IconArrow } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AnswerBox, SectionHead } from "../components/ui";
import { routeFaqs } from "../data/faqs";
import { SERVICES } from "../data/services";
import { PRICING, PROCESS, SITE } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

export function Services({ route }: { route: RouteDef }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Services"
        title="AC repair, servicing, gas, installation & AMC in Delhi NCR"
        lede="Every job starts with a diagnosis. You approve the quote on WhatsApp. Then we open the unit. That order is not negotiable."
        photo="gauges"
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <AnswerBox
              label="In short"
              updated={SITE.updated}
              text={`Airkraft offers eight AC services across Delhi NCR: wet servicing from ₹449, split and window AC repair from ₹449–₹499, inverter and PCB repair from ₹799, gas filling from ₹1,799, installation from ₹1,499, AMC plans from ₹2,499 per year, and cassette, ductable and VRF work on quote. Every visit starts with a ${SITE.visitFee} inspection, waived when you approve the repair.`}
            />
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 4) + 1}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-forest py-20 text-cream md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHead tone="brass" kicker="Every service, same order" title="Diagnose. Quote. Approve. Fix." />
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i + 1} className="rounded-2xl border border-cream/10 bg-pine/40 p-6">
                <span className="font-display text-sm font-bold text-brass">{p.step}</span>
                <h3 className="font-display mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/80">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <SectionHead
              kicker="Rate card"
              title="Starting prices for Delhi NCR"
              text="PCB, compressor and coil work is quoted after testing. You see the number before any work starts."
            />
            <Link to="/pricing" className="btn btn-primary mt-8">
              Full price list <IconArrow size={16} />
            </Link>
          </Reveal>
          <Reveal delay={2} className="md:col-span-7">
            <PriceTable rows={PRICING} caption="Airkraft AC service starting prices" />
          </Reveal>
        </div>
      </section>

      <BrandMarquee />
      <FAQ items={routeFaqs(route)} />
      <CTA title="Tell us the brand and the fault." text="We reply with a slot, not a brochure." />
    </>
  );
}
