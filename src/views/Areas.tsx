import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { IconArrow, IconClock, IconPin } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AnswerBox, Photo } from "../components/ui";
import { AREAS, areaPath } from "../data/areas";
import { routeFaqs } from "../data/faqs";
import { SITE } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

export function Areas({ route }: { route: RouteDef }) {
  const count = AREAS.reduce((n, a) => n + a.zones.reduce((m, z) => m + z.places.length, 0), 0);
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Service areas"
        title="If it is Delhi NCR, we already know the parking."
        lede="Same-day coverage across Delhi, Noida, Greater Noida, Gurugram, Ghaziabad and Faridabad. If you are on the fringe, we still come — we just tell you the window first."
        photo="delhiStreet"
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <AnswerBox
              label="Coverage in short"
              text={`Frostwright covers six cities and ${count}+ neighbourhoods across Delhi NCR from a dispatch desk in ${SITE.address.locality}. Typical daytime arrival is ${SITE.eta} in South, Central and East Delhi, Noida and Gurugram; Greater Noida, Ghaziabad and Faridabad get same-day slots with the exact window confirmed on WhatsApp.`}
            />
          </div>

          <h2 className="font-display mt-16 max-w-2xl text-3xl font-bold md:text-4xl">
            AC repair near you — city by city
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Open your city to see every neighbourhood we cover. Tap yours there and WhatsApp opens with the location already filled in.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {AREAS.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) + 1}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold">
                        <Link to={areaPath(a.slug)} className="hover:text-forest">
                          {a.city}
                        </Link>
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                        <IconClock size={13} /> {a.eta}
                      </p>
                    </div>
                    <IconPin className="shrink-0 text-sage" />
                  </div>
                  {/*
                    Zones only: the full neighbourhood list (with tap-to-book) lives on each city page. Repeating every
                    place name here would turn the hub into the "list of cities" block Google's spam policies describe.
                  */}
                  <p className="mt-6 flex-1 leading-relaxed text-ink/80">{a.zones.map((z) => z.name).join(" · ")}</p>
                  <Link to={areaPath(a.slug)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                    See {a.city} neighbourhoods <IconArrow size={16} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <h2 className="font-display mt-16 text-2xl font-bold md:text-3xl">Coverage at a glance</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[36rem] text-left text-sm md:text-[15px]">
              <caption className="sr-only">Frostwright AC repair coverage, arrival times and travel charges by city</caption>
              <thead className="bg-forest text-cream">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-medium">City</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Typical arrival</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Travel add-on</th>
                </tr>
              </thead>
              <tbody>
                {AREAS.map((a) => (
                  <tr key={a.slug} className="border-t border-line align-top">
                    <th scope="row" className="bg-paper px-5 py-4 font-semibold">
                      <Link to={areaPath(a.slug)} className="text-forest hover:underline">
                        {a.city}
                      </Link>
                      <span className="block text-xs font-normal text-muted">{a.state}</span>
                    </th>
                    <td className="px-5 py-4 text-muted">{a.eta}</td>
                    <td className="px-5 py-4 text-muted">{a.travel ?? `None — standard ${SITE.visitFee} inspection`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Photo name="apartments" sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
          <h2 className="font-display max-w-xl text-3xl font-bold text-cream md:text-5xl">Societies, builder floors, shops, clinics.</h2>
          <p className="mt-4 max-w-lg text-mist/85">
            We share technician names in advance for society entry, carry shoe covers, and plan for Gurugram boom-barriers.
            Night work for restaurants and clinics on request.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold">Not on the list?</h2>
          <p className="mt-3 text-muted">
            Sohna, Bahadurgarh and other edge-of-NCR towns — we cover many of these with a small travel add-on.
            WhatsApp the pin code before you wait.
          </p>
        </div>
      </section>

      <FAQ items={routeFaqs(route)} title="Coverage questions" />
      <CTA title="Send your landmark." text="We reply with an honest ETA, not a 20-minute fantasy." />
    </>
  );
}
