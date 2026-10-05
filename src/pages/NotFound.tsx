import { IconArrow } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

const POPULAR = [
  { label: "AC service & cleaning", to: "/services/ac-service" },
  { label: "Split AC repair", to: "/services/split-ac-repair" },
  { label: "AC gas filling", to: "/services/ac-gas-filling" },
  { label: "Price list", to: "/pricing" },
  { label: "Service areas", to: "/service-areas" },
  { label: "Contact", to: "/contact" },
];

export function NotFound({ route }: { route: RouteDef }) {
  return (
    <PageHero
      crumbs={route.crumbs}
      kicker="404"
      title="This page has gone the way of R22."
      lede="The link may be old or mistyped. Here is where most people are heading — or book a technician directly."
    >
      <ul className="mt-10 grid max-w-xl gap-2 sm:grid-cols-2">
        {POPULAR.map((p) => (
          <li key={p.to}>
            <Link
              to={p.to}
              className="flex items-center justify-between rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm font-medium transition hover:border-brass hover:text-sand"
            >
              {p.label} <IconArrow size={16} />
            </Link>
          </li>
        ))}
      </ul>
    </PageHero>
  );
}
