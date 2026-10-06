import NextLink from "next/link";
import type { ComponentProps } from "react";

/** Strip query/hash and trailing slash so "/services/" and "/services" resolve to one route. */
export function normalizePath(p: string) {
  const clean = p.split(/[?#]/)[0] || "/";
  return clean.length > 1 ? clean.replace(/\/+$/, "") || "/" : "/";
}

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & { to: string };

/** Internal link: a real, crawlable <a href> with Next.js client-side navigation and prefetching. */
export function Link({ to, ...rest }: LinkProps) {
  return <NextLink href={to} {...rest} />;
}

/** True when `path` is `href` or a child of it (e.g. /services/x is inside /services). */
export function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(href + "/");
}
