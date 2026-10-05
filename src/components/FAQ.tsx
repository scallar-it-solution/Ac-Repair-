import { useId, useState } from "react";
import type { Faq } from "../data/site";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";

export function FAQList({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-display text-lg font-semibold md:text-xl">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sage transition-transform duration-300",
                    isOpen && "rotate-45 border-forest bg-forest text-cream"
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            {/* Answers stay in the DOM when collapsed so crawlers and AI engines can read them. */}
            <div id={panelId} role="region" aria-labelledby={btnId} className={cn("accordion-body", isOpen && "open")}>
              <p className="min-h-0 overflow-hidden pr-12 text-[15px] leading-relaxed text-muted">
                <span className="block pb-5">{item.a}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQ({
  items,
  title = "Questions we actually get asked",
  kicker = "FAQ",
  text = "If yours is not here, WhatsApp it. A human answers — not a chatbot with a menu.",
}: {
  items: Faq[];
  title?: string;
  kicker?: string;
  text?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
        <Reveal className="md:col-span-4">
          <SectionHead id="faq-heading" kicker={kicker} title={title} text={text} />
        </Reveal>
        <div className="md:col-span-8">
          <FAQList items={items} />
        </div>
      </div>
    </section>
  );
}
