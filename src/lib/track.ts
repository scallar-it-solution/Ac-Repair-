type W = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

/**
 * Conversion event for calls / WhatsApp. No-op unless Google Tag Manager (dataLayer)
 * or GA4 (gtag) is installed — add either and leads are tracked with no code changes.
 */
export function trackLead(method: "phone" | "whatsapp" | "whatsapp_form") {
  if (typeof window === "undefined") return;
  const w = window as W;
  const page_path = window.location.pathname;
  w.dataLayer?.push({ event: "lead_click", lead_method: method, page_path });
  w.gtag?.("event", "generate_lead", { method, page_path });
}

/** Delegated listener: any tel: or wa.me link anywhere on the page counts as a lead click. */
export function installLeadTracking() {
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) trackLead("phone");
    else if (href.includes("wa.me/")) trackLead("whatsapp");
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
