import type { Metadata, Viewport } from "next";
import { Oswald, Outfit } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { ClientEffects } from "@/components/ClientEffects";
import { Footer } from "@/components/Footer";
import { Header, type MenuArea, type MenuService } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AREAS, areaPath } from "@/data/areas";
import { SERVICES, servicePath } from "@/data/services";
import { GA4_ID, SITE } from "@/data/site";
import "./globals.css";

// Oswald is the Frostwright brand face (headings, lockup); Outfit stays for body copy.
const display = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const sans = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.legal,
  authors: [{ name: SITE.legal, url: SITE.url }],
  creator: SITE.legal,
  publisher: SITE.legal,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14352c",
};

const menuServices: MenuService[] = SERVICES.map((s) => ({
  href: servicePath(s.slug),
  name: s.name,
  short: s.short,
  price: s.price,
  icon: s.icon,
  tier: s.tier ?? "core",
}));

const menuAreas: MenuArea[] = AREAS.map((a) => ({ href: areaPath(a.slug), city: a.city }));

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Scroll-reveal styles apply only when JS runs, so no-JS visitors and crawlers always see content.
          Safety net: if the app has not hydrated within 4s (blocked or failed script), reveal everything.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'var d=document.documentElement;d.classList.add("js");setTimeout(function(){if(!d.hasAttribute("data-hydrated"))d.classList.remove("js")},4000);',
          }}
        />
      </head>
      <body className="pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:font-semibold focus:text-forest focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header services={menuServices} areas={menuAreas} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ClientEffects />
        {GA4_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA4_ID}");`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
