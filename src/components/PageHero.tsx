import type { ReactNode } from "react";
import { DEFAULT_WA, TEL, waLink, type PhotoKey } from "../data/site";
import { Link } from "../lib/router";
import type { Crumb } from "../routes";
import { IconPhone, IconWhatsApp } from "./Icons";
import { Kicker, Photo } from "./ui";

export function Breadcrumbs({ crumbs, tone = "light" }: { crumbs: Crumb[]; tone?: "light" | "dark" }) {
  if (crumbs.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-7">
      <ol
        className={
          tone === "light"
            ? "flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-mist/70"
            : "flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-muted"
        }
      >
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={tone === "light" ? "text-mint" : "text-ink"}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link to={c.path} className="underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  kicker,
  title,
  lede,
  photo,
  photoAlt,
  aside,
  actions = true,
  waText,
  children,
}: {
  crumbs: Crumb[];
  kicker: string;
  title: ReactNode;
  lede: ReactNode;
  photo?: PhotoKey;
  photoAlt?: string;
  aside?: ReactNode;
  actions?: boolean;
  waText?: string;
  children?: ReactNode;
}) {
  const wa = waText ? waLink(waText) : DEFAULT_WA;
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      <div className="glow absolute inset-0" aria-hidden="true" />
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-12 md:px-8 md:pb-24 md:pt-36">
        <div className="rise md:col-span-7">
          <Breadcrumbs crumbs={crumbs} />
          <Kicker tone="mint">{kicker}</Kicker>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-[1.04] text-balance md:text-6xl">
            {title}
          </h1>
          <div className="mt-6 max-w-xl text-base leading-relaxed text-mist/85 md:text-lg">{lede}</div>
          {actions && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <IconWhatsApp size={18} /> Book on WhatsApp
              </a>
              <a href={TEL} className="btn btn-outline-light">
                <IconPhone size={18} /> Call now
              </a>
            </div>
          )}
          {children}
        </div>
        {(aside || photo) && (
          <div className="rise-2 md:col-span-5">
            {aside ?? (
              <div className="img-zoom aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-cream/10">
                <Photo
                  name={photo!}
                  alt={photoAlt}
                  priority
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
