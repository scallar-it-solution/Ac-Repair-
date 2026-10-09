import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { IconArrow } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AnswerBox } from "../components/ui";
import { brandPathByName } from "../data/brands";
import { routeFaqs } from "../data/faqs";
import { serviceBySlug, servicePath } from "../data/services";
import { BRAND_DISCLAIMER, SITE, waLink } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

/** `service` links brands without their own page to the service that matches the note. */
const BRAND_NOTES: { name: string; note: string; service?: string }[] = [
  { name: "Daikin", note: "Inverter splits and VRV systems. Two-character error codes such as U4, A5 and E7." },
  { name: "Voltas", note: "Split, window and inverter ACs across every price band — from decade-old windows to new inverter splits." },
  { name: "LG", note: "Dual-inverter splits with CH-series error codes; outdoor PCB and fan-motor faults." },
  { name: "Samsung", note: "Inverter splits with three-digit E-codes such as E101 and E554." },
  { name: "Lloyd", note: "Inverter and fixed-speed splits; PCB, sensor and fan-motor work.", service: "inverter-ac-pcb-repair" },
  { name: "Blue Star", note: "Splits, windows and cassette units in homes, shops and clinics.", service: "commercial-ac-repair" },
  { name: "Hitachi", note: "Inverter splits and windows; sensor and PCB diagnostics.", service: "inverter-ac-pcb-repair" },
  { name: "Carrier", note: "Splits and long-running window units.", service: "window-ac-repair" },
  { name: "Mitsubishi", note: "Inverter splits and VRF systems.", service: "commercial-ac-repair" },
  { name: "O General", note: "Inverter splits; outdoor-unit and PCB work.", service: "inverter-ac-pcb-repair" },
  { name: "Panasonic", note: "Inverter splits; sensor, drainage and PCB issues.", service: "split-ac-repair" },
  { name: "Godrej", note: "Splits and windows; capacitor, relay and gas work.", service: "ac-gas-filling" },
  { name: "Haier", note: "Inverter and fixed-speed splits.", service: "split-ac-repair" },
  { name: "Whirlpool", note: "Splits and windows; electrical and gas faults.", service: "split-ac-repair" },
];

export function Brands({ route }: { route: RouteDef }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Multi-brand service"
        title="Every major AC brand. No orphan machines."
        lede="Independent repair and service for the brands NCR homes and offices actually run — split, window, inverter, cassette and VRF."
        photo="workshop"
      />
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <AnswerBox
              label="In short"
              updated={SITE.updated}
              text={`Frostwright repairs and services Daikin, Voltas, LG, Samsung, Lloyd, Blue Star, Hitachi, Carrier, Mitsubishi, O General, Panasonic, Godrej, Haier, Whirlpool and most other ACs sold in India, across Delhi NCR. We are an independent service, not an authorised brand service centre — if your AC is still under manufacturer warranty, call the brand first.`}
            />
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRAND_NOTES.map((b, i) => {
              const page = brandPathByName(b.name);
              const service = b.service ? serviceBySlug(b.service) : undefined;
              return (
                <Reveal as="li" key={b.name} delay={(i % 3) + 1}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6">
                    <h2 className="font-display text-2xl font-bold">
                      {page ? (
                        <Link to={page} className="hover:text-forest">
                          {b.name}
                        </Link>
                      ) : (
                        <>{b.name}</>
                      )}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{b.note}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                      {page && (
                        <Link to={page} className="inline-flex items-center gap-2 text-forest">
                          Faults, codes & service <IconArrow size={16} />
                        </Link>
                      )}
                      {!page && service && (
                        <Link to={servicePath(service.slug)} className="inline-flex items-center gap-2 text-forest">
                          {service.short} <IconArrow size={16} />
                        </Link>
                      )}
                      <a
                        href={waLink(`Hi Frostwright, I need ${b.name} AC repair/service in Delhi NCR. Please share a slot.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-forest"
                      >
                        Book {b.name} service
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-10 max-w-3xl rounded-2xl border border-line p-5 text-sm text-muted">{BRAND_DISCLAIMER}</p>
          <p className="mt-6 text-sm text-muted">
            Installing a new AC? <Link to="/services/ac-installation" className="font-medium text-forest underline underline-offset-4">AC installation</Link>{" "}
            is the same for every brand — Daikin, Voltas, LG, Samsung, Carrier, Hitachi or any other — from ₹1,499 for a standard split.
          </p>
          <p className="mt-3 text-sm text-muted">
            Seeing an error code? Read <Link to="/guides/ac-error-codes" className="font-medium text-forest underline underline-offset-4">AC error codes explained</Link>.
          </p>
        </div>
      </section>
      <FAQ items={routeFaqs(route)} title="Brand questions" />
      <CTA />
    </>
  );
}
