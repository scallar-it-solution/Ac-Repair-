import { DEFAULT_WA, SITE, TEL } from "../data/site";
import { IconPhone, IconWhatsApp } from "./Icons";
import { Reveal } from "./Reveal";
import { Kicker } from "./ui";

export function CTA({
  title = "AC down. Heat does not wait.",
  text = "Send a photo of the indoor unit and your area. You get a slot, a name, and a quote before anyone opens a panel.",
  wa = DEFAULT_WA,
}: {
  title?: string;
  text?: string;
  wa?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      <div className="glow absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-24">
        <Reveal>
          <Kicker tone="brass">Same-day slots · {SITE.hours}</Kicker>
          <h2 className="font-display mt-4 max-w-xl text-3xl font-bold tracking-tight text-balance md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-lg text-mist/80">{text}</p>
        </Reveal>
        <Reveal delay={2} className="w-full sm:w-auto">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <IconWhatsApp size={18} /> WhatsApp {SITE.phoneDisplay}
            </a>
            <a href={TEL} className="btn btn-outline-light">
              <IconPhone size={18} /> Call now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
