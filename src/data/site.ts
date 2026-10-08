/**
 * Single source of truth for business facts (NAP: name, address, phone).
 * Everything — page copy, JSON-LD, llms.txt, footer — reads from here, so keep it accurate.
 */
export const SITE = {
  name: "Frostwright",
  legal: "Frostwright AC Repair",
  url: "https://frostwright.in",
  tagline: "Diagnosed, not guessed.",
  description:
    "Frostwright is a Delhi NCR AC repair company offering same-day split, window, inverter, cassette and VRF AC repair, gas filling, installation and AMC plans, with a 90-day repair warranty and GST invoices.",
  phone: "+919315515700",
  phoneDisplay: "+91 93155 15700",
  whatsapp: "919315515700",
  email: "hello@frostwright.in",
  hours: "7:00 AM – 10:00 PM, all 7 days",
  opens: "07:00",
  closes: "22:00",
  emergency: "24×7 emergency call-out",
  city: "New Delhi",
  region: "Delhi NCR",
  address: {
    locality: "New Delhi",
    region: "Delhi",
    regionCode: "DL",
    postalCode: "110019",
    country: "IN",
  },
  geo: { lat: 28.5355, lng: 77.259 },
  eta: "45–90 min",
  warranty: "90-day",
  visitFee: "₹199",
  payment: ["UPI", "Cash", "Card"],
  languages: ["English", "Hindi"],
  /** Date the content was last reviewed — shown on pages and used for sitemap <lastmod>. */
  updated: "2026-10-05",
  /**
   * Official profiles (Google Business Profile, Facebook, Instagram, Justdial, LinkedIn…).
   * Add real URLs here — they become `sameAs` in structured data, which links the entity across the web.
   */
  sameAs: [] as string[],
} as const;

/**
 * Absolute URL for a site path. The homepage is "https://frostwright.in" (no trailing slash) — the form Next.js
 * emits for canonical/og:url — so canonical, sitemap and structured data always agree exactly.
 */
export const abs = (path: string) => (path.startsWith("http") ? path : path === "/" ? SITE.url : `${SITE.url}${path}`);

export const WHATSAPP_BASE = `https://wa.me/${SITE.whatsapp}`;

export function waLink(text: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export const DEFAULT_WA = waLink(
  "Hi Frostwright, I need AC repair service in Delhi NCR. Please share the next available slot."
);

export const TEL = `tel:${SITE.phone}`;

export type Faq = { q: string; a: string };

/* ----------------------------------------------------------------------------------------------
 * Photos: self-hosted responsive WebP in /public/images/photos/{key}-{640|1024|1600}.webp (3:2).
 * Alt text describes what is actually in the frame.
 * -------------------------------------------------------------------------------------------- */
export const PHOTOS = {
  workshop: "Technician working on split AC indoor and outdoor units at a repair bench",
  training: "AC technicians around a refrigerant gauge and vacuum pump during hands-on training",
  pcb: "Technician testing an air conditioner circuit board with a multimeter probe",
  outdoor: "Technician servicing a split AC outdoor unit mounted high on an exterior wall",
  gauges: "Refrigerant manifold gauges being read during an AC pressure check",
  leakTest: "Electronic leak detector probe held against an AC condenser coil",
  acUnit: "Inverter split AC outdoor unit mounted on an exterior wall",
  display: "Digital control display of an air conditioner",
  delhi: "Aerial view of New Delhi rooftops and neighbourhoods",
  delhiStreet: "Office and residential towers along a wide Delhi NCR road",
  living: "Modern living room with a wall-mounted split air conditioner",
  apartments: "Apartment block facade with window and split AC units",
  bench: "Electronics bench with microscope and tools used for circuit board repair",
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export const HERO_IMAGE = {
  src: "/images/hero-1376.webp",
  srcSet: "/images/hero-640.webp 640w, /images/hero-960.webp 960w, /images/hero-1376.webp 1376w",
  avifSrcSet: "/images/hero-640.avif 640w, /images/hero-960.avif 960w, /images/hero-1376.avif 1376w",
  width: 1376,
  height: 768,
  alt: "AC technician checking a split air conditioner's indoor unit with gauges in a Delhi apartment",
};

export const OG_IMAGE = {
  src: "/images/og-image.png",
  width: 1200,
  height: 630,
  alt: "Frostwright — same-day AC repair in Delhi NCR. Diagnosed, not guessed.",
};

/* ------------------------------------------------------------------------------------------- */

export const NAV: { label: string; to: string; menu?: "services" | "areas" }[] = [
  { label: "Services", to: "/services", menu: "services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Service Areas", to: "/service-areas", menu: "areas" },
  { label: "Guides", to: "/guides" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const PROCESS = [
  {
    step: "01",
    title: "WhatsApp the fault",
    text: "Brand, tonnage, what it is doing, and your area. Photos of the indoor unit help. You get a slot, not a hold tune.",
  },
  {
    step: "02",
    title: "Technician at the door",
    text: "ID card, shoe covers, a manifold set that actually holds vacuum. Diagnosis before any spare is named.",
  },
  {
    step: "03",
    title: "Plain-language quote",
    text: "What failed, why, parts vs labour, and what we will not do. You approve on WhatsApp. Then we open tools.",
  },
  {
    step: "04",
    title: "Fix, test, warranty",
    text: "Run test on cooling, current draw and drain. GST invoice. 90 days on the work we touched.",
  },
] as const;

export const REASONS = [
  {
    title: "Diagnosis before the spare",
    text: "No ‘gas khatam hai’ from the gate. Pressures, current, and error codes first. If it only needs a wash, you only pay for a wash.",
  },
  {
    title: "Parts we can stand behind",
    text: "OEM-grade capacitors, coils and PCBs. Cheap unbranded boards are how a ₹1,200 saving becomes an ₹8,000 second visit.",
  },
  {
    title: "Written 90-day warranty",
    text: "Labour and the part we fitted. The warranty lives on your invoice and in our WhatsApp log — not in someone’s memory.",
  },
  {
    title: "GST bill, every time",
    text: "For landlords, offices and anyone who is tired of handwritten pads. UPI, card, cash.",
  },
] as const;

export type PriceRow = { job: string; from: string; note: string; value?: number };

/** Published starting prices. `value` (INR) feeds structured data; omit it for "on quote" rows. */
export const PRICE_GROUPS: { title: string; rows: PriceRow[] }[] = [
  {
    title: "Visit & diagnosis",
    rows: [
      { job: "Inspection visit", from: "₹199", value: 199, note: "Waived if you approve the repair on the same visit" },
      { job: "Night emergency call-out", from: "On quote", note: "Surcharge told before booking" },
    ],
  },
  {
    title: "Service & cleaning",
    rows: [
      { job: "Split AC wet service", from: "₹499", value: 499, note: "Foam + jet, indoor + outdoor" },
      { job: "Window AC wet service", from: "₹449", value: 449, note: "Pull-out clean" },
    ],
  },
  {
    title: "Repairs",
    rows: [
      { job: "Water leak repair", from: "₹499", value: 499, note: "Drain / insulation" },
      { job: "PCB inspection & repair", from: "₹799", value: 799, note: "Board-level parts extra" },
      { job: "Fan motor / capacitor replacement", from: "On quote", note: "Quoted after testing" },
      { job: "Compressor replacement", from: "On quote", note: "After electrical tests; compared with a new AC" },
      { job: "Coil leak repair or replacement", from: "On quote", note: "After a nitrogen leak test" },
    ],
  },
  {
    title: "Gas filling",
    rows: [
      { job: "Gas filling (R32 / R410A)", from: "₹1,799", value: 1799, note: "After leak test, weighed charge" },
      { job: "Gas filling (R22)", from: "₹2,499", value: 2499, note: "Subject to stock" },
    ],
  },
  {
    title: "Installation",
    rows: [
      { job: "Split AC installation", from: "₹1,499", value: 1499, note: "Standard 1–1.5 ton, 3 m copper kit" },
      { job: "Uninstallation / shifting", from: "On quote", note: "Quoted on WhatsApp before the visit" },
    ],
  },
  {
    title: "AMC & commercial",
    rows: [
      { job: "Residential AMC (1 AC)", from: "₹2,499", value: 2499, note: "2 wet + 1 dry service, priority slots" },
      { job: "Cassette / ductable / VRF", from: "On quote", note: "Site survey first" },
    ],
  },
];

export const PRICING: PriceRow[] = PRICE_GROUPS.flatMap((g) => g.rows).filter(
  (r) => r.value && r.job !== "Inspection visit"
);

export const TESTIMONIALS = [
  {
    name: "Ritika Malhotra",
    area: "Greater Kailash II",
    text: "Two other ‘technicians’ told me the coil was dead. They found a pinched drain and a dying capacitor. AC is quieter than it was in 2019.",
    rating: 5,
    machine: "Daikin 1.5T inverter",
  },
  {
    name: "Imran Qureshi",
    area: "Noida Sector 137",
    text: "Booked on WhatsApp at 9:12. Engineer at 10:40. Gas was not the issue — outdoor fan capacitor. Billed ₹650. That almost never happens in this city.",
    rating: 5,
    machine: "Voltas 2T",
  },
  {
    name: "Sneha Iyer",
    area: "DLF Phase 3, Gurugram",
    text: "Three cassette units in the clinic. They came after 8pm, no drama with the RWA, invoices the next morning. Renewed AMC the same week.",
    rating: 5,
    machine: "Blue Star cassette ×3",
  },
  {
    name: "Pankaj Bansal",
    area: "Vaishali, Ghaziabad",
    text: "Window AC from 2012. Everyone said scrap it. They rebuilt the fan motor and did a proper wet service. Still running through this summer.",
    rating: 5,
    machine: "Carrier window 1.5T",
  },
] as const;

export const FAQS: Faq[] = [
  {
    q: "Do you charge a visiting fee?",
    a: "₹199 inspection in most of Delhi NCR, waived if you approve the repair the same visit. Outlying Greater Noida West / Sohna / Ballabhgarh may attract a small travel add-on — we tell you on WhatsApp before we roll.",
  },
  {
    q: "How fast can a technician reach me?",
    a: "Typical window is 45–90 minutes in South, Central, East Delhi, Noida and Gurugram during the day. Peak May–June afternoons run longer; we will not invent an ETA. Night emergency is available at a published surcharge.",
  },
  {
    q: "Which AC brands do you service?",
    a: "Daikin, Voltas, Lloyd, LG, Samsung, Blue Star, Hitachi, Carrier, Mitsubishi, O General, Panasonic, Godrej, Haier, Whirlpool, Onida and most white-label machines sold in India. VRF/VRV by quote. We are an independent multi-brand service, not an authorised brand service centre.",
  },
  {
    q: "Do you fill R22 gas?",
    a: "Yes, while stock lasts, and only after a leak test. We will also tell you honestly when a 12-year-old R22 machine is cheaper to replace than to keep charging.",
  },
  {
    q: "Is there a warranty on repairs?",
    a: "90 days on the spare we fitted and the labour for that spare. Compressors and coils follow the part maker’s cover. Warranty is on the GST invoice.",
  },
  {
    q: "Can I book on WhatsApp instead of calling?",
    a: "That is the preferred way. Send the brand, tonnage, the fault, a photo, and your landmark to +91 93155 15700. You get a slot and the technician’s name before anyone sets off.",
  },
];

export const BRANDS = [
  "Daikin",
  "Voltas",
  "Lloyd",
  "LG",
  "Samsung",
  "Blue Star",
  "Hitachi",
  "Carrier",
  "Mitsubishi",
  "O General",
  "Panasonic",
  "Godrej",
  "Haier",
  "Whirlpool",
] as const;

export const BRAND_DISCLAIMER =
  "Frostwright is an independent multi-brand AC service provider. We are not affiliated with, or an authorised service centre of, any air-conditioner manufacturer. Brand names are used only to identify the equipment we service.";

export const TEAM = [
  { name: "Arjun Mehta", role: "Lead diagnostic engineer", years: "14 yrs", focus: "Inverter PCB & VRF" },
  { name: "Farhan Siddiqui", role: "Field supervisor, South & Central", years: "11 yrs", focus: "Split & cassette" },
  { name: "Kavita Rao", role: "AMC & dispatch", years: "8 yrs", focus: "Slots, parts, follow-ups" },
  { name: "Rakesh Yadav", role: "Installation crew lead", years: "12 yrs", focus: "Copper, vacuum, civil" },
] as const;

/** Default author / reviewer for guides (E-E-A-T). */
export const AUTHOR = {
  name: TEAM[0].name,
  role: TEAM[0].role,
  bio: "Arjun has diagnosed inverter boards, VRF communication faults and refrigerant circuits across Delhi NCR for 14 years. He leads Frostwright’s diagnostic bench and reviews every technical guide on this site.",
};
