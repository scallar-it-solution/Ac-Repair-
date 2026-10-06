import { preload } from "react-dom";
import { BrandMarquee } from "../components/BrandMarquee";
import { CTA } from "../components/CTA";
import { ContactForm } from "../components/ContactForm";
import { FAQ } from "../components/FAQ";
import { AreaCard, GuideCard, PriceTable, ServiceCard, ServiceLinkGrid } from "../components/cards";
import {
  IconAlert,
  IconArrow,
  IconCheck,
  IconClock,
  IconDroplet,
  IconFile,
  IconGas,
  IconPhone,
  IconShield,
  IconSparkle,
  IconStar,
  IconThermo,
  IconWave,
  IconWhatsApp,
  IconX,
} from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { Photo, SectionHead, formatCount } from "../components/ui";
import { AREAS } from "../data/areas";
import { routeFaqs } from "../data/faqs";
import { GUIDES } from "../data/guides";
import { CORE_SERVICES, SPECIALIST_SERVICES } from "../data/services";
import { DEFAULT_WA, HERO_IMAGE, PRICING, PROCESS, REASONS, SITE, TEL, TESTIMONIALS } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

const SYMPTOMS = [
  { icon: IconThermo, title: "Running, but not cooling", text: "Ten causes, five checks you can do yourself.", to: "/guides/ac-not-cooling" },
  { icon: IconDroplet, title: "Water dripping indoors", text: "Usually a blocked drain — a ₹499-range fix.", to: "/guides/ac-water-leakage" },
  { icon: IconAlert, title: "Error code blinking", text: "Daikin, LG, Samsung codes decoded.", to: "/guides/ac-error-codes" },
  { icon: IconGas, title: "“Needs gas”?", text: "Six signs of a real leak — and the look-alikes.", to: "/guides/ac-gas-leak-signs" },
  { icon: IconWave, title: "Noisy or vibrating", text: "What rattling, buzzing and hissing mean.", to: "/guides/ac-making-noise" },
  { icon: IconSparkle, title: "Due for a service", text: "Foam + jet wet service from ₹449.", to: "/services/ac-service" },
];

const VERSUS = [
  ["“Gas khatam” from the gate", "Pressures and current measured first"],
  ["Handwritten bill, if any", "GST invoice on every job"],
  ["Warranty on a promise", "90 days, written on the invoice"],
  ["Unknown, unbranded boards", "OEM or OEM-grade — named before fitting"],
  ["Quote changes after the panel is open", "You approve the quote on WhatsApp first"],
];

export function Home({ route }: { route: RouteDef }) {
  // LCP image: hoisted into <head> as <link rel="preload"> during server rendering.
  preload("/images/hero-1376.avif", { as: "image", type: "image/avif", imageSrcSet: HERO_IMAGE.avifSrcSet, imageSizes: "100vw", fetchPriority: "high" });

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <picture className="contents">
          <source type="image/avif" srcSet={HERO_IMAGE.avifSrcSet} sizes="100vw" />
          <img
            src={HERO_IMAGE.src}
            srcSet={HERO_IMAGE.srcSet}
            sizes="100vw"
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            alt={HERO_IMAGE.alt}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[60%_30%]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 md:px-8 md:pt-40 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:pb-24">
          <div className="lg:col-span-7">
            <p className="rise inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5 text-xs font-medium text-mist backdrop-blur">
              <span className="live-dot h-2 w-2 rounded-full bg-wa" aria-hidden="true" />
              Same-day slots · {SITE.hours}
            </p>
            <h1 className="rise font-display mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
              Same-day AC repair in Delhi NCR.
              <span className="mt-2 block text-sand">Diagnosed, not guessed.</span>
            </h1>
            <p className="rise-2 mt-6 max-w-xl text-base leading-relaxed text-mist/90 md:text-lg">
              Split, window, inverter and cassette ACs across Delhi, Noida, Gurugram, Ghaziabad and Faridabad. Pressures
              measured before any part is named. GST invoice. {SITE.warranty} warranty.
            </p>
            <div className="rise-2 mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <IconWhatsApp size={18} /> Book on WhatsApp
              </a>
              <a href={TEL} className="btn btn-outline-light">
                <IconPhone size={18} /> {SITE.phoneDisplay}
              </a>
            </div>
            <div className="rise-3 mt-7 flex items-center gap-3 text-sm text-mist/80">
              <span className="flex text-brass" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} size={15} />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-cream">{SITE.rating}/5</strong> from {formatCount(SITE.reviewCount)}+
                customers
              </span>
            </div>

            <dl className="rise-3 mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-cream/15 pt-8 sm:grid-cols-4">
              {[
                [SITE.jobs, "Jobs done"],
                [SITE.eta, "Typical arrival"],
                [SITE.warranty, "Repair warranty"],
                [`Since ${SITE.founded}`, "In Delhi NCR"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-mist/60">{v}</dt>
                  <dd className="font-display stat-number mt-1 text-2xl font-bold md:text-[1.7rem]">{k}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise-2 hidden lg:col-span-5 lg:block">
            <div className="rounded-3xl border border-cream/10 bg-cream p-7 text-ink shadow-2xl shadow-black/40">
              <p className="font-display text-2xl font-bold">Book a technician</p>
              <p className="mb-6 mt-1.5 text-sm text-muted">Takes 30 seconds. We reply on WhatsApp with a slot and a name.</p>
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>

      <BrandMarquee />

      {/* ---------------- Services ---------------- */}
      <section className="bg-cream py-20 md:py-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              id="services-heading"
              kicker="What we do"
              title="Repair first. Replace only when the machine is actually done."
            />
            <Link to="/services" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-forest">
              All services <IconArrow size={16} />
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_SERVICES().map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 4) + 1}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </ul>
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Specialist repairs</p>
            <div className="mt-4">
              <ServiceLinkGrid services={SPECIALIST_SERVICES()} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Symptom finder ---------------- */}
      <section className="border-y border-line bg-paper py-20 md:py-24" aria-labelledby="symptoms-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHead
              id="symptoms-heading"
              kicker="Start with the symptom"
              title="What is your AC doing?"
              text="Pick the closest match. Each one leads to a plain explanation of the likely causes and what the fix costs."
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SYMPTOMS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 3) + 1}>
                <Link
                  to={s.to}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-cream p-6 transition hover:border-forest/40 hover:shadow-lg hover:shadow-forest/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-forest transition-colors group-hover:bg-forest group-hover:text-sand">
                    <s.icon size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="font-display block text-lg font-semibold">{s.title}</span>
                    <span className="mt-1 block text-sm text-muted">{s.text}</span>
                  </span>
                  <IconArrow size={18} className="mt-1 shrink-0 text-moss transition-transform group-hover:translate-x-1 group-hover:text-forest" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="overflow-hidden bg-forest text-cream">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-full">
            <Photo name="workshop" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent md:bg-gradient-to-r" aria-hidden="true" />
          </div>
          <div className="px-5 py-16 md:px-14 md:py-24">
            <Reveal>
              <SectionHead tone="brass" kicker="How we work" title="Four steps. No theatre." />
            </Reveal>
            <ol className="mt-10 space-y-8">
              {PROCESS.map((p, i) => (
                <Reveal as="li" key={p.step} delay={i + 1} className="grid grid-cols-[auto_1fr] gap-5">
                  <span className="font-display flex h-10 w-10 items-center justify-center rounded-full border border-brass/50 text-sm font-bold text-brass">
                    {p.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist/80">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- Why + versus ---------------- */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHead kicker="Why Airkraft" title="Built by people who still carry a manifold gauge, not a sales script." />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {REASONS.map((r, i) => {
              const Icon = [IconCheck, IconShield, IconClock, IconFile][i];
              return (
                <Reveal key={r.title} delay={(i % 2) + 1}>
                  <article className="border-t border-line pt-6">
                    <Icon size={22} className="text-sage" />
                    <h3 className="font-display mt-4 text-2xl font-semibold">{r.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{r.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-16">
            <div className="overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-left text-sm md:text-[15px]">
                <caption className="sr-only">How Airkraft compares with a typical AC repair visit</caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-1/2 bg-paper px-5 py-4 font-semibold text-muted">
                      The usual visit
                    </th>
                    <th scope="col" className="w-1/2 bg-forest px-5 py-4 font-semibold text-cream">
                      An Airkraft visit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VERSUS.map(([bad, good]) => (
                    <tr key={bad} className="border-t border-line">
                      <td className="bg-paper/60 px-5 py-4 text-muted">
                        <span className="flex items-start gap-2.5">
                          <IconX size={16} className="mt-0.5 shrink-0 text-red-700/70" /> {bad}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium">
                        <span className="flex items-start gap-2.5">
                          <IconCheck size={16} className="mt-0.5 shrink-0 text-sage" /> {good}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="pricing-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <SectionHead
              id="pricing-heading"
              kicker="Starting prices"
              title="Published rates. Final bill after diagnosis."
              text={`Inspection ${SITE.visitFee}, waived when you approve the repair on the same visit. Gas, PCB and coil work is quoted after testing — never from the gate.`}
            />
            <Link to="/pricing" className="btn btn-primary mt-8">
              Full price list <IconArrow size={16} />
            </Link>
          </Reveal>
          <Reveal delay={2} className="md:col-span-7">
            <PriceTable rows={PRICING} caption="Airkraft AC service starting prices in Delhi NCR" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="bg-ink py-20 text-cream md:py-28" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHead
              id="reviews-heading"
              tone="brass"
              kicker="Field notes"
              title="What people say after the room actually cools."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal as="li" key={t.name} delay={(i % 2) + 1}>
                <figure className="flex h-full flex-col rounded-2xl border border-cream/10 bg-pine/40 p-7">
                  <div className="flex gap-1 text-brass" role="img" aria-label={`Rated ${t.rating} out of 5`}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <IconStar key={s} size={14} />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed text-mist/95">“{t.text}”</blockquote>
                  <figcaption className="mt-6 flex items-end justify-between gap-4 text-sm">
                    <span>
                      <span className="block font-semibold text-cream">{t.name}</span>
                      <span className="text-mist/60">{t.area}</span>
                    </span>
                    <span className="text-right text-xs text-brass">{t.machine}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Areas ---------------- */}
      <section className="relative overflow-hidden" aria-labelledby="areas-heading">
        <Photo name="delhi" sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/90" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal className="flex flex-col justify-between gap-6 text-cream md:flex-row md:items-end">
            <SectionHead
              id="areas-heading"
              tone="brass"
              kicker="Coverage"
              title="Delhi, Noida, Gurugram, Ghaziabad, Faridabad."
              text="Fifty-plus neighbourhoods. Same WhatsApp number. Same warranty."
            />
            <Link to="/service-areas" className="btn btn-light shrink-0">
              All service areas <IconArrow size={16} />
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={(i % 3) + 1}>
                <AreaCard a={a} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Guides ---------------- */}
      <section className="bg-cream py-20 md:py-28" aria-labelledby="guides-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              id="guides-heading"
              kicker="From the bench"
              title="Know what is wrong before anyone quotes you."
            />
            <Link to="/guides" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-forest">
              All guides <IconArrow size={16} />
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.slice(0, 3).map((g, i) => (
              <Reveal as="li" key={g.slug} delay={i + 1}>
                <GuideCard g={g} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FAQ items={routeFaqs(route)} />
      <CTA />
    </>
  );
}
