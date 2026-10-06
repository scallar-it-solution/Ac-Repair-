import type { Metadata } from "next";
import { notFoundRoute } from "@/routes";
import { buildMetadata } from "@/seo/metadata";
import { NotFound } from "@/views/NotFound";

export const metadata: Metadata = buildMetadata(notFoundRoute);

export default function NotFoundPage() {
  return <NotFound route={notFoundRoute} />;
}
