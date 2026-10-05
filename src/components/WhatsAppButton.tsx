import { DEFAULT_WA, TEL } from "../data/site";
import { IconPhone, IconWhatsApp } from "./Icons";

/** Floating WhatsApp button (desktop) and sticky call/WhatsApp bar (mobile). */
export function WhatsAppButton() {
  return (
    <>
      <a
        href={DEFAULT_WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp for AC repair"
        className="wa-ring fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lg shadow-black/20 transition hover:scale-105 md:flex"
      >
        <IconWhatsApp size={28} />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <a href={TEL} className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-forest">
          <IconPhone size={17} /> Call now
        </a>
        <a
          href={DEFAULT_WA}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-wa py-4 text-sm font-semibold text-ink"
        >
          <IconWhatsApp size={17} /> WhatsApp
        </a>
      </div>
    </>
  );
}
