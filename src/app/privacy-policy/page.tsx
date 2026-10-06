import { matchRoute } from "@/routes";
import { buildMetadata } from "@/seo/metadata";
import { RouteView } from "@/views/RouteView";

const route = matchRoute("/privacy-policy");

export const metadata = buildMetadata(route);

export default function Page() {
  return <RouteView route={route} />;
}
