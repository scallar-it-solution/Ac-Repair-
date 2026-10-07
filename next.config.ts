import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone for the Docker image (see Dockerfile).
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Canonical URLs have no trailing slash; "/about/" 308-redirects to "/about".
  trailingSlash: false,

  async redirects() {
    return [
      { source: "/areas", destination: "/service-areas", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      // Pre-rebrand asset URLs (cached link previews, old manifests) point at the Frostwright files.
      { source: "/images/og-cover.jpg", destination: "/images/og-image.png", permanent: true },
      { source: "/images/logo.png", destination: "/brand/logo-720.png", permanent: true },
      { source: "/favicon.png", destination: "/android-chrome-192x192.png", permanent: true },
      { source: "/icon-192.png", destination: "/android-chrome-192x192.png", permanent: true },
      { source: "/icon-512.png", destination: "/android-chrome-512x512.png", permanent: true },
      { source: "/icon-maskable-512.png", destination: "/maskable-icon-512x512.png", permanent: true },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
