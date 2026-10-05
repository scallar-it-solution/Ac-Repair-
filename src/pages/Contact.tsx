import { ContactForm } from "../components/ContactForm";
import { FAQ } from "../components/FAQ";
import { IconCheck, IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { routeFaqs } from "../data/faqs";
import { DEFAULT_WA, SITE, TEL } from "../data/site";
import type { RouteDef } from "../routes";

const SEND = [
  "Brand and tonnage (e.g. Daikin 1.5 ton inverter)",
  "What it is doing — and since when",
  "Any error code on the display",
  "A photo of the indoor unit and the model sticker",
  "Your area and a landmark",
];

export function Contact({ route }: { route: RouteDef }) {
  const channels = [
    { Icon: IconWhatsApp, label: "WhatsApp", value: SITE.phoneDisplay, href: DEFAULT_WA, note: "Preferred. Send brand, fault, photo, landmark.", external: true },
    { Icon: IconPhone, label: "Call", value: SITE.phoneDisplay, href: TEL, note: "Best for night emergencies and elderly customers." },
    { Icon: IconMail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, note: "AMC, office and invoice queries." },
    { Icon: IconClock, label: "Hours", value: SITE.hours, note: SITE.emergency },
    { Icon: IconPin, label: "Dispatch", value: `${SITE.address.locality} · covering all NCR`, note: "Mobile workshop. We come to you." },
  ];

  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Contact"
        title="WhatsApp is the front desk."
        lede="Call if it is an emergency. For everything else — a photo, a pin, a slot — use WhatsApp. Humans between 7 AM and 10 PM. Night call-outs for dead machines in occupied rooms."
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-3xl font-bold">Reach us</h2>
              <ul className="mt-8 space-y-6">
                {channels.map((c) => (
                  <li key={c.label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-sand">
                      <c.Icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">{c.label}</p>
                      {c.href ? (
                        <a
                          href={c.href}
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-1 block text-lg font-semibold text-forest hover:underline"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg font-semibold">{c.value}</p>
                      )}
                      <p className="text-sm text-muted">{c.note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-line bg-paper p-6">
                <h3 className="font-display text-lg font-semibold">What to send for the fastest slot</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
                  {SEND.map((s) => (
                    <li key={s} className="flex gap-2.5">
                      <IconCheck size={16} className="mt-0.5 shrink-0 text-sage" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={2}>
              <div className="rounded-3xl border border-line bg-paper p-6 md:p-10">
                <h2 className="font-display text-2xl font-bold">Book a slot</h2>
                <p className="mb-8 mt-2 text-sm text-muted">
                  This form does not store anything. It opens WhatsApp with a ready-to-send message.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FAQ items={routeFaqs(route)} />
    </>
  );
}
