"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconName } from "../data/services";
import { DEFAULT_WA, NAV, SITE, TEL } from "../data/site";
import { Link, isActive } from "../lib/router";
import { cn } from "../utils/cn";
import {
  IconArrow,
  IconChevron,
  IconClose,
  IconMenu,
  IconPhone,
  IconPin,
  IconWhatsApp,
  LogoMark,
  SERVICE_ICONS,
} from "./Icons";

type Menu = "services" | "areas" | null;

/** Lightweight menu data, passed from the server layout so full page content stays out of the client bundle. */
export type MenuService = { href: string; name: string; short: string; price: string; icon: IconName; tier?: "core" | "specialist" };
export type MenuArea = { href: string; city: string };

export function Header({ services, areas }: { services: MenuService[]; areas: MenuArea[] }) {
  const path = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!menu && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, open]);

  // Every page opens on a dark hero, so the bar stays transparent until the visitor scrolls.
  const solid = scrolled || open || menu !== null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        solid ? "bg-cream/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Airkraft Cooling — home">
          <LogoMark className="h-9 w-9" />
          <span className="leading-none">
            <span className={cn("font-display block text-[17px] font-extrabold tracking-tight", solid ? "text-ink" : "text-cream")}>
              Airkraft
            </span>
            <span className={cn("block text-[10px] font-medium uppercase tracking-[0.22em]", solid ? "text-sage" : "text-sand/80")}>
              Cooling
            </span>
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = isActive(path, item.to) || (item.menu === "areas" && path.startsWith("/ac-repair-"));
              const linkCls = cn(
                "nav-link rounded-full px-3 py-2 text-[13.5px] font-medium tracking-wide transition-colors",
                solid ? "text-ink/80 hover:text-ink" : "text-cream/90 hover:text-cream",
                active && "is-active"
              );
              if (!item.menu) {
                return (
                  <li key={item.to}>
                    <Link to={item.to} className={linkCls} aria-current={path === item.to ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = menu === item.menu;
              return (
                <li
                  key={item.to}
                  className="relative flex items-center"
                  onMouseEnter={() => setMenu(item.menu!)}
                  onMouseLeave={() => setMenu(null)}
                >
                  <Link to={item.to} className={linkCls} aria-current={path === item.to ? "page" : undefined}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className={cn("-ml-2 rounded-full p-1", solid ? "text-ink/60" : "text-cream/70")}
                    aria-expanded={isOpen}
                    aria-controls={`menu-${item.menu}`}
                    aria-label={`${isOpen ? "Hide" : "Show"} ${item.label.toLowerCase()} menu`}
                    onClick={() => setMenu(isOpen ? null : item.menu!)}
                  >
                    <IconChevron size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
                  </button>
                  <div
                    id={`menu-${item.menu}`}
                    className={cn(
                      "absolute left-1/2 top-full pt-3 transition-all duration-200",
                      item.menu === "services" ? "-translate-x-[40%]" : "-translate-x-1/2",
                      isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    )}
                  >
                    {item.menu === "services" ? <ServicesPanel services={services} /> : <AreasPanel areas={areas} />}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={TEL}
            className={cn("hidden items-center gap-2 text-sm font-semibold xl:flex", solid ? "text-forest" : "text-cream")}
          >
            <IconPhone size={16} />
            <span className="tabular-nums">{SITE.phoneDisplay}</span>
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition sm:inline-flex",
              solid ? "bg-forest text-cream hover:bg-pine" : "bg-cream text-forest hover:bg-sand"
            )}
          >
            <IconWhatsApp size={16} />
            Book on WhatsApp
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
              solid ? "border-line text-ink" : "border-cream/30 text-cream"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto overscroll-contain bg-cream transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav className="px-5 pb-28 pt-6" aria-label="Mobile">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Services</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {services.map((s) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="flex h-full items-center gap-2.5 rounded-xl border border-line bg-paper px-3 py-3 text-sm font-medium"
                  >
                    <Icon size={18} className="shrink-0 text-sage" />
                    {s.short}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">Areas</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a.href}>
                <Link to={a.href} className="inline-block rounded-full border border-line px-3.5 py-2 text-sm">
                  {a.city}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 border-t border-line">
            {NAV.filter((n) => !n.menu).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="flex items-center justify-between border-b border-line py-4">
                  <span className="font-display text-2xl font-semibold text-ink">{n.label}</span>
                  <IconArrow size={18} className="text-moss" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-ink"
            >
              <IconWhatsApp size={18} /> Book on WhatsApp
            </a>
            <a
              href={TEL}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest px-5 py-3.5 font-semibold text-forest"
            >
              <IconPhone size={18} /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function ServicesPanel({ services }: { services: MenuService[] }) {
  const specialist = services.filter((s) => s.tier === "specialist");
  return (
    <div className="w-[680px] rounded-2xl border border-line bg-cream p-3 shadow-2xl shadow-ink/10">
      <ul className="grid grid-cols-2 gap-1">
        {services
          .filter((s) => s.tier !== "specialist")
          .map((s) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <li key={s.href}>
              <Link to={s.href} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-paper">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-sand">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink group-hover:text-forest">{s.name}</span>
                  <span className="mt-0.5 block text-xs text-copper">{s.price}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {specialist.length > 0 && (
        <div className="mt-1 border-t border-line px-3 pb-1 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sage">Specialist repairs</p>
          <ul className="mt-2 grid grid-cols-3 gap-x-3 gap-y-1.5 text-[13px]">
            {specialist.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className="font-medium text-ink/80 hover:text-forest">
                  {s.short.charAt(0).toUpperCase() + s.short.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-2 flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-sm">
        <Link to="/services" className="inline-flex items-center gap-1.5 font-semibold text-forest">
          All services <IconArrow size={14} />
        </Link>
        <Link to="/pricing" className="font-medium text-muted hover:text-forest">
          Full price list
        </Link>
      </div>
    </div>
  );
}

function AreasPanel({ areas }: { areas: MenuArea[] }) {
  return (
    <div className="w-[300px] rounded-2xl border border-line bg-cream p-3 shadow-2xl shadow-ink/10">
      <ul>
        {areas.map((a) => (
          <li key={a.href}>
            <Link to={a.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-paper">
              <IconPin size={16} className="text-brass" />
              <span className="font-medium">{a.city}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/service-areas"
        className="mt-1 flex items-center gap-1.5 rounded-xl bg-paper px-4 py-3 text-sm font-semibold text-forest"
      >
        All service areas <IconArrow size={14} />
      </Link>
    </div>
  );
}
