import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AREAS, areaPath } from "@/data/areas";
import { matchRoute } from "@/routes";
import { buildMetadata } from "@/seo/metadata";
import { RouteView } from "@/views/RouteView";

/** City pages live at the top level: /ac-repair-delhi, /ac-repair-noida, … */
type Props = { params: Promise<{ area: string }> };

/** Only the pre-built city slugs exist; any other top-level path is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return AREAS.map((a) => ({ area: areaPath(a.slug).slice(1) }));
}

async function routeFor(params: Props["params"]) {
  const { area } = await params;
  const route = matchRoute(`/${area}`);
  if (route.kind !== "area") notFound();
  return route;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata(await routeFor(params));
}

export default async function Page({ params }: Props) {
  return <RouteView route={await routeFor(params)} />;
}
