import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { PriceTable, ServiceLinkGrid } from "../components/cards";
import { IconCheck, IconFile, IconRupee, IconShield, IconWhatsApp } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AnswerBox, SectionHead, formatDate } from "../components/ui";
import { routeFaqs } from "../data/faqs";
import { SERVICES } from "../data/services";
import { PRICE_GROUPS, SITE } from "../data/site";
import type { RouteDef } from "../routes";

const BILLING = [
  {
    icon: IconRupee,
    title: `${SITE.visitFee} inspection`,
    text: "Covers the diagnosis. Waived when you approve the repair on the same visit.",
  },
  {
    icon: IconWhatsApp,
    title: "Quote on WhatsApp",
    text: "Part, labour and reason in writing. Nothing starts until you approve.",
  },
  {
    icon: IconFile,
    title: "GST invoice",
    text: "Every job, with refrigerant type and grams listed for any gas work.",
  },
  {
    icon: IconShield,
    title: `${SITE.warranty} warranty`,
    text: "On the part we fitted and its labour, printed on the invoice.",
  },
];

/** Worked examples from the published rates only — what a visit typically ends up costing. */
const SCENARIOS: [situation: string, pay: string][] = [
  ["The AC only needed cleaning", "₹449 (window) or ₹499 (split) wet service — the inspection is waived because you approved the work"],
  ["Water dripping from a blocked drain", "From ₹499 for the drain or insulation repair"],
  ["An error code traced to the circuit board", "From ₹799, plus any components, quoted after testing"],
  ["Low on gas — leak found and fixed", "From ₹1,799 (R32 / R410A) or ₹2,499 (R22); brazing or coil work quoted once the leak is found"],
  ["You decide not to go ahead", `${SITE.visitFee} inspection only`],
  ["Night emergency call-out", "Surcharge told before booking"],
];

export function Pricing({ route }: { route: RouteDef }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker={`Price list · updated ${formatDate(SITE.updated)}`}
        title="AC service charges & repair prices in Delhi NCR"
        lede="Published starting prices for every job we do. The final bill comes after diagnosis — and you approve it before any work starts."
        aside={
          <dl className="grid grid-cols-2 gap-3">
            {[
              ["AC wet service", "₹449"],
              ["Repairs", "₹499"],
              ["Gas filling", "₹1,799"],
              ["Installation", "₹1,499"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-cream/10 bg-cream/5 p-5 backdrop-blur">
                <dt className="text-xs uppercase tracking-[0.16em] text-mist/70">{k}</dt>
                <dd className="font-display mt-2 text-3xl font-bold text-mint">
                  <span className="text-base font-medium text-mist/70">from </span>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <AnswerBox
              label="Quick answer"
              updated={SITE.updated}
              text={`In Delhi NCR, Frostwright charges from ₹449 for a window AC wet service and ₹499 for a split AC wet service, from ₹799 for PCB repair, ₹1,499 for split AC installation, ₹1,799 for R32/R410A gas filling (₹2,499 for R22) and ₹2,499 per year for a single-AC AMC. The ${SITE.visitFee} inspection is waived when you approve the repair.`}
            />
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {PRICE_GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) + 1}>
                <h2 className="font-display mb-4 text-2xl font-bold">{g.title}</h2>
                <PriceTable rows={g.rows} caption={`${g.title} prices`} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-muted">
            Starting prices for standard jobs in Delhi NCR. Spare parts, leak repairs, extra copper, difficult access and
            outlying-area travel are quoted separately and approved by you on WhatsApp before work begins.
          </p>

          <h2 className="font-display mt-16 text-2xl font-bold md:text-3xl">What a typical visit costs</h2>
          <div className="mt-6 max-w-4xl overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm md:text-[15px]">
              <caption className="sr-only">Typical total cost of a Frostwright AC visit by situation</caption>
              <thead className="bg-forest text-cream">
                <tr>
                  <th scope="col" className="w-2/5 px-5 py-3.5 font-medium">
                    Situation
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-medium">
                    What you pay
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCENARIOS.map(([situation, pay]) => (
                  <tr key={situation} className="border-t border-line align-top">
                    <th scope="row" className="bg-paper px-5 py-4 font-semibold text-ink">
                      {situation}
                    </th>
                    <td className="px-5 py-4 text-muted">{pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHead kicker="How billing works" title="No number appears on your bill that you did not approve." />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BILLING.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i + 1} className="rounded-2xl border border-line bg-cream p-6">
                <b.icon size={22} className="text-sage" />
                <h3 className="font-display mt-4 text-xl font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <IconCheck size={16} className="text-sage" /> Payment by {SITE.payment.join(", ")} after the work is tested.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20" aria-labelledby="by-service">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead
            id="by-service"
            kicker="Prices by service"
            title="What each job includes"
            text="Every service page lists what is included, what is quoted separately, and its starting price."
          />
          <div className="mt-10">
            <ServiceLinkGrid services={SERVICES} />
          </div>
        </div>
      </section>

      <FAQ items={routeFaqs(route)} title="Pricing questions" />
      <CTA title="Want an exact quote?" text="Send a photo of the model sticker and the fault. We reply with a price range before the visit." />
    </>
  );
}
