import type { Faq } from "../data/site";
import { FAQList } from "./FAQList";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";

export { FAQList };

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
