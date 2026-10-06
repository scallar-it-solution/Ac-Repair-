import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, servicePath } from "@/data/services";
import { matchRoute } from "@/routes";
import { buildMetadata } from "@/seo/metadata";
import { RouteView } from "@/views/RouteView";

type Props = { params: Promise<{ slug: string }> };

/** Only the pre-built service slugs exist; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

async function routeFor(params: Props["params"]) {
  const { slug } = await params;
  const route = matchRoute(servicePath(slug));
  if (route.kind !== "service") notFound();
  return route;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata(await routeFor(params));
}

export default async function Page({ params }: Props) {
  return <RouteView route={await routeFor(params)} />;
}
