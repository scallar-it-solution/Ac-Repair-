import { brandPathByName } from "../data/brands";
import { BRANDS } from "../data/site";
import { Link } from "../lib/router";

export function BrandMarquee() {
  return (
    <section className="border-y border-line bg-cream py-8" aria-labelledby="brands-heading">
      <h2 id="brands-heading" className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-sage">
        <Link to="/brands" className="inline-block py-2 hover:text-forest">
          Every major brand. No orphan machines.
        </Link>
      </h2>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-12 pr-12" aria-hidden={copy === 1 ? true : undefined}>
              {BRANDS.map((b) => {
                // Brands with their own page link to it; the duplicate copy (for the loop) stays out of the tab order.
                const page = brandPathByName(b);
                return (
                  <li key={b} className="font-display text-xl font-semibold text-forest/70 md:text-2xl">
                    {page ? (
                      <Link to={page} tabIndex={copy === 1 ? -1 : undefined} className="hover:text-forest" aria-label={`${b} AC repair`}>
                        {b}
                      </Link>
                    ) : (
                      b
                    )}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
