import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { normalizePath } from "./lib/router";
import { matchRoute } from "./routes";

/** Old hash URLs (/#/services) from the previous site version → real paths. */
const LEGACY: Record<string, string> = { "/areas": "/service-areas", "/home": "/" };

const hash = window.location.hash;
if (hash.startsWith("#/")) {
  const p = normalizePath(hash.slice(1));
  window.history.replaceState(null, "", LEGACY[p] ?? p);
}

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
);

// Hydrate only when the prerendered HTML belongs to this URL. Dev mode, legacy-hash redirects and hosts
// that fall back to index.html for unknown paths all render fresh instead of mismatching.
if (container.dataset.route && container.dataset.route === matchRoute(window.location.pathname).path) {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
