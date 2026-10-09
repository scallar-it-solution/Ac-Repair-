import type { Area } from "../data/areas";
import { areaPath } from "../data/areas";
import { clusterOf, guidePath, readingMinutes, type Guide } from "../data/guides";
import { servicePath, type Service } from "../data/services";
import { PRICE_LINKS, type PriceRow } from "../data/site";
import { Link } from "../lib/router";
import { cn } from "../utils/cn";
import { IconArrow, IconBook, IconClock, IconPin, SERVICE_ICONS } from "./Icons";
import { Photo } from "./ui";

/*
 * Every card below is clickable as a whole, but its <a> wraps only the title (`.stretched-link`, see globals.css).
 * That keeps anchor text short and descriptive — "AC Gas Filling", not "From ₹1,799 AC Gas Filling We find…" —
 * which is how Google reads what the linked page is about.
 */

export function ServiceCard({ s, tone = "paper" }: { s: Service; tone?: "paper" | "cream" }) {
  const Icon = SERVICE_ICONS[s.icon];
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line p-7 transition duration-300 hover:-translate-y-1 hover:border-forest/40 hover:bg-white hover:shadow-xl hover:shadow-forest/5",
        tone === "paper" ? "bg-paper" : "bg-cream"
      )}
    >
      <span className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-mint transition-colors group-hover:bg-sage">
          <Icon size={22} />
        </span>
        <span className="rounded-full bg-mint/45 px-3 py-1 text-xs font-semibold text-forest">{s.price}</span>
      </span>
      <Link to={servicePath(s.slug)} className="stretched-link font-display mt-6 block text-2xl font-semibold leading-tight">
        {s.name}
      </Link>
      <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">{s.blurb}</span>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest" aria-hidden="true">
        Details & prices
        <IconArrow size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  );
}

export function AreaCard({ a }: { a: Area }) {
  const places = a.zones.flatMap((z) => z.places);
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-cream/15 bg-cream/5 p-6 backdrop-blur-sm transition hover:border-mint/60 hover:bg-cream/10">
      <span className="flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-cream">{a.city}</span>
        <IconPin size={20} className="text-mint" />
      </span>
      <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-mist/60">{a.state}</span>
      <span className="mt-4 block flex-1 text-sm leading-relaxed text-mist/80">
        {places.slice(0, 5).join(" · ")}
        {places.length > 5 ? ` + ${places.length - 5} more` : ""}
      </span>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint">
        <Link to={areaPath(a.slug)} className="stretched-link">
          AC repair in {a.city}
        </Link>
        <IconArrow size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  );
}

export function GuideCard({ g }: { g: Guide }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream transition hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/5">
      <span className="img-zoom block aspect-[16/9] overflow-hidden bg-paper">
        <Photo name={g.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
      </span>
      <span className="flex flex-1 flex-col p-6">
        <span className="flex items-center gap-3 text-xs text-muted">
          <span className="rounded-full bg-mist px-2.5 py-0.5 font-semibold text-forest">{clusterOf(g).name}</span>
          <span className="inline-flex items-center gap-1">
            <IconClock size={13} />
            <span aria-label={`${readingMinutes(g)} minute read`}>{readingMinutes(g)} min</span>
          </span>
        </span>
        <Link
          to={guidePath(g.slug)}
          className="stretched-link font-display mt-4 block text-xl font-semibold leading-snug group-hover:text-forest"
        >
          {g.title}
        </Link>
        <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">{g.excerpt}</span>
      </span>
    </div>
  );
}

/** Compact service links (icon, name, price) — used wherever a full card grid would be too heavy. */
export function ServiceLinkGrid({ services, tone = "paper" }: { services: Service[]; tone?: "paper" | "cream" }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const Icon = SERVICE_ICONS[s.icon];
        return (
          <li
            key={s.slug}
            className={cn(
              "group relative flex h-full items-center gap-3 rounded-xl border border-line p-4 transition hover:border-forest/40 hover:bg-white",
              tone === "paper" ? "bg-paper" : "bg-cream"
            )}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-mint">
              <Icon size={18} />
            </span>
            <span className="flex-1">
              <Link to={servicePath(s.slug)} className="stretched-link block text-sm font-semibold">
                {s.name}
              </Link>
              <span className="block text-xs text-sage">{s.price}</span>
            </span>
            <IconArrow size={16} className="text-moss transition-transform group-hover:translate-x-0.5" />
          </li>
        );
      })}
    </ul>
  );
}

/** Compact guide links — used to wire service and city pages into the guide clusters. */
export function GuideList({ guides, tone = "cream" }: { guides: Guide[]; tone?: "cream" | "paper" }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {guides.map((g) => (
        <li
          key={g.slug}
          className={cn(
            "group relative flex h-full items-start gap-4 rounded-xl border border-line p-4 transition hover:border-forest/40 hover:bg-white",
            tone === "cream" ? "bg-cream" : "bg-paper"
          )}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-forest">
            <IconBook size={18} />
          </span>
          <span className="flex-1">
            <Link to={guidePath(g.slug)} className="stretched-link block text-[15px] font-semibold leading-snug group-hover:text-forest">
              {g.title}
            </Link>
            <span className="mt-1 block text-xs text-muted">
              {clusterOf(g).name} · {readingMinutes(g)} min
            </span>
          </span>
          <IconArrow size={16} className="mt-1 shrink-0 text-moss transition-transform group-hover:translate-x-0.5" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Price list. Job names link to the service page that does the job (descriptive anchors from strong pages such as
 * /pricing and the homepage), except a link back to the page the table is on (`current`).
 */
export function PriceTable({ rows, caption, current }: { rows: PriceRow[]; caption?: string; current?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-cream">
      <table className="w-full text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-forest text-cream">
          <tr>
            <th scope="col" className="px-5 py-3.5 font-medium">
              Job
            </th>
            <th scope="col" className="px-5 py-3.5 text-right font-medium">
              From
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const to = PRICE_LINKS[p.job];
            return (
              <tr key={p.job} className="border-t border-line align-top">
                <th scope="row" className="px-5 py-4 font-normal">
                  {to && to !== current ? (
                    <Link to={to} className="block font-semibold text-ink underline decoration-sage/40 underline-offset-4 hover:text-forest hover:decoration-forest">
                      {p.job}
                    </Link>
                  ) : (
                    <span className="block font-semibold text-ink">{p.job}</span>
                  )}
                  <span className="mt-0.5 block text-xs text-muted">{p.note}</span>
                </th>
                <td className="font-display whitespace-nowrap px-5 py-4 text-right text-lg font-semibold text-forest">{p.from}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
