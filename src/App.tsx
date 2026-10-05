import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Head } from "./components/Head";
import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { RouterProvider, useRouter } from "./lib/router";
import { installLeadTracking } from "./lib/track";
import { About } from "./pages/About";
import { AreaPage } from "./pages/AreaPage";
import { Areas } from "./pages/Areas";
import { Brands } from "./pages/Brands";
import { Contact } from "./pages/Contact";
import { FaqPage } from "./pages/FaqPage";
import { GuidePage } from "./pages/GuidePage";
import { Guides } from "./pages/Guides";
import { Home } from "./pages/Home";
import { Legal } from "./pages/Legal";
import { NotFound } from "./pages/NotFound";
import { Pricing } from "./pages/Pricing";
import { ServicePage } from "./pages/ServicePage";
import { Services } from "./pages/Services";
import { matchRoute, type RouteDef } from "./routes";
import { cn } from "./utils/cn";

export default function App({ initialPath }: { initialPath: string }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <Shell />
    </RouterProvider>
  );
}

function Shell() {
  const { path, navigated } = useRouter();
  const route = matchRoute(path);

  useEffect(() => installLeadTracking(), []);

  return (
    <>
      <Head route={route} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:font-semibold focus:text-forest focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} key={route.path} className={cn("pb-16 outline-none md:pb-0", navigated && "page-enter")}>
        <Page route={route} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function Page({ route }: { route: RouteDef }) {
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
    case "privacy":
    case "terms":
      return <Legal route={route} />;
    default:
      return <NotFound route={route} />;
  }
}
