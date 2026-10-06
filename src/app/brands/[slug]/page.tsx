import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND_PAGES, brandPath } from "@/data/brands";
import { matchRoute } from "@/routes";
import { buildMetadata } from "@/seo/metadata";
import { RouteView } from "@/views/RouteView";

type Props = { params: Promise<{ slug: string }> };

/** Only the pre-built brand slugs exist; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return BRAND_PAGES.map((b) => ({ slug: b.slug }));
}

async function routeFor(params: Props["params"]) {
  const { slug } = await params;
  const route = matchRoute(brandPath(slug));
  if (route.kind !== "brand") notFound();
  return route;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata(await routeFor(params));
}

export default async function Page({ params }: Props) {
  return <RouteView route={await routeFor(params)} />;
}
