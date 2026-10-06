import { CTA } from "../components/CTA";
import { FAQList } from "../components/FAQ";
import { PageHero } from "../components/PageHero";
import { FAQ_GROUPS } from "../data/faqs";
import type { RouteDef } from "../routes";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function FaqPage({ route }: { route: RouteDef }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="FAQ"
        title="Questions we actually get asked"
        lede="Visit charges, arrival times, gas, warranty, AMC and installation — answered plainly. If yours is not here, WhatsApp it and a human replies."
      />
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
          <nav className="lg:col-span-3" aria-label="FAQ topics">
            <ul className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:sticky lg:top-28 lg:flex-col lg:overflow-visible">
              {FAQ_GROUPS.map((g) => (
                <li key={g.title} className="shrink-0">
                  <a
                    href={`#${slug(g.title)}`}
                    className="block rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-forest hover:text-forest lg:rounded-xl lg:border-transparent lg:px-3"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14 lg:col-span-9">
            {FAQ_GROUPS.map((g) => (
              <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-h`} className="scroll-mt-28">
                <h2 id={`${slug(g.title)}-h`} className="font-display mb-4 text-2xl font-bold md:text-3xl">
                  {g.title}
                </h2>
                <FAQList items={g.items} defaultOpen={-1} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <CTA title="Still have a question?" text="WhatsApp it. A technician answers — usually within minutes during working hours." />
    </>
  );
}
