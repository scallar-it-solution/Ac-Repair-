import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES, guidePath } from "@/data/guides";
import { matchRoute } from "@/routes";
import { buildMetadata } from "@/seo/metadata";
import { RouteView } from "@/views/RouteView";

type Props = { params: Promise<{ slug: string }> };

/** Only the pre-built guide slugs exist; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

async function routeFor(params: Props["params"]) {
  const { slug } = await params;
  const route = matchRoute(guidePath(slug));
  if (route.kind !== "guide") notFound();
  return route;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata(await routeFor(params));
}

export default async function Page({ params }: Props) {
  return <RouteView route={await routeFor(params)} />;
}
