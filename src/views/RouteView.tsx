import { JsonLd } from "../components/JsonLd";
import type { RouteDef } from "../routes";
import { About } from "./About";
import { AreaPage } from "./AreaPage";
import { BrandDetail } from "./BrandDetail";
import { Areas } from "./Areas";
import { Brands } from "./Brands";
import { Contact } from "./Contact";
import { FaqPage } from "./FaqPage";
import { GuidePage } from "./GuidePage";
import { Guides } from "./Guides";
import { Home } from "./Home";
import { Legal } from "./Legal";
import { NotFound } from "./NotFound";
import { Pricing } from "./Pricing";
import { ServicePage } from "./ServicePage";
import { Services } from "./Services";

function View({ route }: { route: RouteDef }) {
  switch (route.kind) {
    case "home":
      return <Home route={route} />;
    case "services":
      return <Services route={route} />;
    case "service":
      return <ServicePage route={route} />;
    case "pricing":
      return <Pricing route={route} />;
    case "areas":
      return <Areas route={route} />;
    case "area":
      return <AreaPage route={route} />;
    case "guides":
      return <Guides route={route} />;
    case "guide":
      return <GuidePage route={route} />;
    case "about":
      return <About route={route} />;
    case "contact":
      return <Contact route={route} />;
    case "faq":
      return <FaqPage route={route} />;
    case "brands":
      return <Brands route={route} />;
    case "brand":
      return <BrandDetail route={route} />;
    case "privacy":
    case "terms":
      return <Legal route={route} />;
    default:
      return <NotFound route={route} />;
  }
}

/** A page's structured data plus its view. Every app/ page renders through this. */
export function RouteView({ route }: { route: RouteDef }) {
  return (
    <>
      <JsonLd route={route} />
      <View route={route} />
    </>
  );
}
