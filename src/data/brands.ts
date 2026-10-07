import type { Faq } from "./site";

/**
 * Brand repair pages. Each is written around what is genuinely different about that brand — its error
 * codes, product mix and ownership advice — so no page is a template with the name swapped.
 * Every page states clearly that Frostwright is independent and not an authorised service centre.
 */
export type BrandPage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  answer: string;
  lines: string[];
  /** `to` is any internal path (service page or guide) that explains or fixes the fault. */
  faults: { title: string; text: string; to: string }[];
  codes?: { code: string; meaning: string; cause: string }[];
  codesNote: string;
  tips: { title: string; text: string }[];
  faqs: Faq[];
  services: string[];
  guides: string[];
};

const authorised = (brand: string): Faq => ({
  q: `Are you an authorised ${brand} service centre?`,
  a: `No. Frostwright is an independent multi-brand AC service and is not affiliated with ${brand}. If your ${brand} AC is still under the manufacturer’s warranty, contact ${brand} first for free cover; we help with out-of-warranty machines, expired AMCs, or when you need someone today.`,
});

export const BRAND_PAGES: BrandPage[] = [
  {
    slug: "daikin-ac-repair",
    name: "Daikin",
    metaTitle: "Daikin AC Repair & Service in Delhi NCR | Independent | Frostwright",
    metaDescription:
      "Independent Daikin AC repair in Delhi NCR: inverter splits, U4, A5 and E7 errors, PCB, gas and VRV faults. Same-day slots. Not an authorised Daikin centre.",
    h1: "Daikin AC repair & service in Delhi NCR",
    lede: "Daikin inverter splits are common in NCR homes and offices, and their two-character error codes make diagnosis faster — when they are read properly.",
    answer:
      "Frostwright repairs and services Daikin split, inverter, cassette and small VRV air conditioners across Delhi NCR as an independent multi-brand service, not an authorised Daikin service centre. Common Daikin jobs are communication errors (U4), freeze-up protection from dirty coils (A5), outdoor fan faults (E7), sensor faults (C4, C9) and refrigerant shortage (U0). If your Daikin AC is still under warranty, contact Daikin first.",
    lines: ["Inverter split ACs, 1–2 ton", "Older fixed-speed splits", "Cassette units in shops and clinics", "Small VRV systems in offices"],
    faults: [
      { title: "U4 — communication error", text: "Indoor and outdoor units have lost contact: the cable, power at the outdoor unit, or a board.", to: "/services/inverter-ac-pcb-repair" },
      { title: "A5 — freeze-up protection", text: "Usually a dirty coil or blocked filters. A wet service often clears it for good.", to: "/services/ac-service" },
      { title: "E7 — outdoor fan fault", text: "Outdoor fan motor, its driver, or something blocking the blades.", to: "/services/ac-fan-motor-repair" },
      { title: "U0 — refrigerant shortage", text: "A leak. It needs a leak test before any gas goes in.", to: "/services/ac-gas-filling" },
      { title: "L5 — compressor overcurrent", text: "The inverter drive or the compressor itself — tested before anything is replaced.", to: "/services/ac-compressor-replacement" },
      { title: "Water dripping indoors", text: "The drain and tray, not the gas.", to: "/services/ac-water-leakage-repair" },
    ],
    codes: [
      { code: "U4", meaning: "Indoor–outdoor communication error", cause: "Wiring, outdoor power or a board" },
      { code: "U0", meaning: "Refrigerant shortage", cause: "Gas leak" },
      { code: "A1", meaning: "Indoor PCB fault", cause: "Indoor board" },
      { code: "A5", meaning: "Freeze-up / high-pressure protection", cause: "Dirty coil, blocked filters, low airflow" },
      { code: "A6", meaning: "Indoor fan motor fault", cause: "Blower motor or connection" },
      { code: "E7", meaning: "Outdoor fan motor fault", cause: "Fan motor or obstruction" },
      { code: "F3", meaning: "Discharge pipe temperature too high", cause: "Low gas or blocked condenser" },
      { code: "L5", meaning: "Compressor overcurrent", cause: "Inverter drive or compressor" },
    ],
    codesNote: "Commonly documented Daikin codes; meanings can differ between series, so your manual is the final word.",
    tips: [
      { title: "Read the stored code", text: "Many Daikin remotes have a check mode that shows the stored error code. Your manual shows how for your model — send us the code with the booking." },
      { title: "Check the refrigerant first", text: "Most recent Daikin splits sold in India use R32. The nameplate on the outdoor unit confirms it before any gas quote." },
      { title: "Use the warranty you have", text: "Like most brands, Daikin covers some parts — often the compressor — for longer than the rest of the machine. Check your warranty card before paying for a major part." },
    ],
    faqs: [
      authorised("Daikin"),
      {
        q: "Can you fix a Daikin U4 error?",
        a: "Usually. U4 is a communication error, so we check the interconnecting cable, power at the outdoor unit and both boards — in that order, cheapest first — before replacing anything.",
      },
      {
        q: "Do you service Daikin VRV systems?",
        a: "Yes, small and mid-size VRV systems in offices, clinics and shops. Larger plant rooms are assessed by a site survey first.",
      },
    ],
    services: ["inverter-ac-pcb-repair", "ac-gas-filling", "split-ac-repair", "commercial-ac-repair"],
    guides: ["ac-error-codes", "ac-stabilizer-guide", "inverter-vs-non-inverter-ac"],
  },
  {
    slug: "lg-ac-repair",
    name: "LG",
    metaTitle: "LG AC Repair & Service in Delhi NCR | CH Error Codes | Frostwright",
    metaDescription:
      "Independent LG AC repair in Delhi NCR: dual inverter splits, CH05, CH38 and CH67 errors, outdoor boards, fan motors and gas leaks. Same-day slots.",
    h1: "LG AC repair & service in Delhi NCR",
    lede: "LG split ACs report faults as CH codes on the indoor display. Read correctly, they cut diagnosis time; read loosely, they lead to the wrong board being replaced.",
    answer:
      "Frostwright repairs and services LG split and inverter air conditioners across Delhi NCR as an independent multi-brand service, not an authorised LG service centre. Common LG jobs include CH05 communication errors, CH38 low-refrigerant warnings, indoor and outdoor fan-motor locks (CH10, CH67), sensor errors (CH01, CH02) and outdoor board faults after power cuts. If your LG AC is still under warranty, contact LG first.",
    lines: ["Dual inverter split ACs", "Fixed-speed splits", "Older window ACs"],
    faults: [
      { title: "CH05 — communication error", text: "Cable, outdoor power or a board — tested in that order.", to: "/services/inverter-ac-pcb-repair" },
      { title: "CH38 — low refrigerant", text: "The AC has detected a leak. It is a warning, not a request for a top-up.", to: "/guides/ac-gas-leak-signs" },
      { title: "CH10 / CH67 — fan motor lock", text: "Indoor (CH10) or outdoor (CH67) fan motor, its driver, or an obstruction.", to: "/services/ac-fan-motor-repair" },
      { title: "CH01 / CH02 — sensor error", text: "A thermistor or its connector — usually one of the cheaper repairs.", to: "/services/split-ac-repair" },
      { title: "CH21 — inverter module fault", text: "The compressor drive on the outdoor board, or the compressor.", to: "/services/inverter-ac-pcb-repair" },
      { title: "CH61 — condenser too hot", text: "A dust-packed outdoor coil in May is the usual cause.", to: "/services/ac-service" },
    ],
    codes: [
      { code: "CH01", meaning: "Indoor room temperature sensor error", cause: "Sensor or connector" },
      { code: "CH02", meaning: "Indoor pipe temperature sensor error", cause: "Sensor or connector" },
      { code: "CH05", meaning: "Indoor–outdoor communication error", cause: "Wiring, power or board" },
      { code: "CH10", meaning: "Indoor fan motor lock", cause: "Blower motor or obstruction" },
      { code: "CH21", meaning: "DC peak / inverter module fault", cause: "Inverter drive or compressor" },
      { code: "CH38", meaning: "Low refrigerant / leak detected", cause: "Gas leak" },
      { code: "CH61", meaning: "Outdoor condenser temperature too high", cause: "Blocked condenser, poor airflow" },
      { code: "CH67", meaning: "Outdoor fan motor lock", cause: "Fan motor or obstruction" },
    ],
    codesNote: "Commonly documented LG codes; check your manual for your exact model.",
    tips: [
      { title: "CH38 is not a top-up code", text: "It means the system detected low charge. Find and fix the leak first — otherwise the code returns within weeks." },
      { title: "Protect the outdoor board", text: "Like all inverter ACs, LG boards are vulnerable to voltage spikes when power returns after a cut. A stabiliser or surge protector is cheap insurance." },
      { title: "Clean condenser, fewer trips", text: "High-condenser-temperature trips in peak summer are usually airflow. A pre-summer wet service prevents most of them." },
    ],
    faqs: [
      authorised("LG"),
      {
        q: "What does CH38 mean on an LG AC?",
        a: "CH38 means the AC has detected low refrigerant, which means a leak. The fix is a leak test and repair, then a weighed recharge — not a top-up.",
      },
      {
        q: "Can you repair LG outdoor PCBs?",
        a: "Often, at component level — burnt fuses, relays, regulators and some driver parts can be replaced. A board with a damaged processor area or heavy corrosion is replaced, and we tell you which after testing.",
      },
    ],
    services: ["inverter-ac-pcb-repair", "ac-gas-filling", "ac-fan-motor-repair", "split-ac-repair"],
    guides: ["ac-error-codes", "ac-gas-leak-signs", "ac-stabilizer-guide"],
  },
  {
    slug: "samsung-ac-repair",
    name: "Samsung",
    metaTitle: "Samsung AC Repair & Service in Delhi NCR | E101, E554 | Frostwright",
    metaDescription:
      "Independent Samsung AC repair in Delhi NCR: inverter splits, E101 communication, E121/E122 sensor, E154 fan and E554 gas-leak errors. Same-day slots.",
    h1: "Samsung AC repair & service in Delhi NCR",
    lede: "Samsung inverter splits use three-digit E codes that point to a specific circuit — communication, a sensor, the indoor fan or a refrigerant leak. That is where we start.",
    answer:
      "Frostwright repairs and services Samsung split and inverter air conditioners across Delhi NCR as an independent multi-brand service, not an authorised Samsung service centre. Common Samsung jobs include E101 communication errors, E121 and E122 sensor errors, E154 indoor fan errors and E554 refrigerant-leak detection. If your Samsung AC is still under warranty, contact Samsung first.",
    lines: ["Inverter split ACs, 1–2 ton", "Older fixed-speed splits", "Small commercial units"],
    faults: [
      { title: "E101 — communication error", text: "Cable, outdoor power or a board fault between the units.", to: "/services/inverter-ac-pcb-repair" },
      { title: "E121 / E122 — sensor error", text: "Room or coil thermistor, or its connector — far cheaper than a board.", to: "/services/split-ac-repair" },
      { title: "E154 — indoor fan error", text: "Blower motor, its circuit, or a dust-packed blower wheel straining the motor.", to: "/services/ac-fan-motor-repair" },
      { title: "E554 — refrigerant leak detected", text: "Often a coil or flare joint. Leak test first, then repair and recharge.", to: "/services/ac-coil-repair" },
      { title: "Water from the indoor unit", text: "Drain, tray or slope — not the gas.", to: "/services/ac-water-leakage-repair" },
      { title: "Remote beeps, nothing happens", text: "The indoor board receives the signal but cannot drive the fan or outdoor unit.", to: "/services/inverter-ac-pcb-repair" },
    ],
    codes: [
      { code: "E101", meaning: "Indoor–outdoor communication error", cause: "Wiring, power or board" },
      { code: "E121", meaning: "Indoor room temperature sensor error", cause: "Sensor or connector" },
      { code: "E122", meaning: "Indoor coil (evaporator) sensor error", cause: "Sensor or connector" },
      { code: "E154", meaning: "Indoor fan error", cause: "Blower motor or its circuit" },
      { code: "E554", meaning: "Refrigerant leak detected", cause: "Gas leak" },
    ],
    codesNote: "Commonly documented Samsung codes; check your manual for your exact model.",
    tips: [
      { title: "E554 means a leak", text: "Samsung’s leak detection is a warning, not a request for gas. A leak test comes before any refrigerant." },
      { title: "Sensors before boards", text: "E121 and E122 are often a sensor or a loose connector. Insist on a sensor test before anyone quotes a board." },
      { title: "Keep the blower clean", text: "A dust-packed blower wheel makes the indoor fan motor work harder and can trigger E154. A wet service clears it." },
    ],
    faqs: [
      authorised("Samsung"),
      {
        q: "What does E101 mean on a Samsung AC?",
        a: "E101 is a communication error between the indoor and outdoor units — usually the interconnecting cable, power at the outdoor unit, or a board.",
      },
      {
        q: "What does E554 mean on a Samsung AC?",
        a: "E554 means the AC has detected a refrigerant leak. It needs a nitrogen leak test and repair before recharging; a top-up alone will not last.",
      },
    ],
    services: ["inverter-ac-pcb-repair", "ac-coil-repair", "ac-fan-motor-repair", "split-ac-repair"],
    guides: ["ac-error-codes", "ac-gas-leak-signs", "ac-making-noise"],
  },
  {
    slug: "voltas-ac-repair",
    name: "Voltas",
    metaTitle: "Voltas AC Repair & Service in Delhi NCR | Window & Split | Frostwright",
    metaDescription:
      "Independent Voltas AC repair in Delhi NCR: window and split, inverter and fixed-speed — capacitors, fan motors, gas, PCBs and error codes. Same-day slots.",
    h1: "Voltas AC repair & service in Delhi NCR",
    lede: "From decade-old window units in DDA flats to new inverter splits in Noida towers, Voltas machines span every age and price band in NCR. Diagnosis starts with knowing which one you have.",
    answer:
      "Frostwright repairs and services Voltas window, split and inverter air conditioners across Delhi NCR as an independent multi-brand service, not an authorised Voltas service centre. Common Voltas jobs are capacitor and fan-motor failures on fixed-speed and window units, gas leaks, drain leaks, and PCB or sensor faults on inverter models. Voltas error codes vary between series, so we read them against your exact model.",
    lines: ["Window ACs, including older R22 units", "Fixed-speed split ACs", "Inverter split ACs"],
    faults: [
      { title: "Compressor hums, no cooling", text: "A failed run capacitor on fixed-speed and window units — usually a same-visit fix.", to: "/guides/ac-outdoor-unit-not-working" },
      { title: "Window AC leaking into the room", text: "Lost backward tilt or a choked base drain.", to: "/services/ac-water-leakage-repair" },
      { title: "Noisy or rattling window unit", text: "Loose chassis, worn fan-motor bushings or a cracked blade.", to: "/services/ac-fan-motor-repair" },
      { title: "Old R22 unit low on gas", text: "Leak test first — and an honest view on whether the machine is worth recharging.", to: "/guides/repair-or-replace-ac" },
      { title: "Error code on an inverter model", text: "Codes vary by series; send a photo of the display and the model sticker.", to: "/guides/ac-error-codes" },
      { title: "Weak cooling every afternoon", text: "A dust-packed condenser in peak heat — a wet service fixes most of it.", to: "/services/ac-service" },
    ],
    codesNote:
      "Voltas uses different code sets across its series — the same ‘E5’ can mean different things on two models. Send us a photo of the display and the model sticker and we will tell you what it means.",
    tips: [
      { title: "Find your model number", text: "The sticker on the side of a window AC, or on the outdoor unit of a split, gives the series, refrigerant and capacity. Send it with your booking." },
      { title: "Window units need tilt", text: "A slight backward tilt lets condensate drain outside. Units that have settled level start leaking indoors." },
      { title: "R22 or R32?", text: "Older Voltas window units often use R22; newer splits typically use R32. Check the nameplate before any gas quote." },
    ],
    faqs: [
      authorised("Voltas"),
      {
        q: "What does the error code on my Voltas AC mean?",
        a: "It depends on the series — Voltas codes are not the same across models. Check the manual for your exact model, or send us a photo of the display and the model sticker on WhatsApp.",
      },
      {
        q: "Is it worth repairing an old Voltas window AC?",
        a: "Usually yes, if it cools well after a service — capacitors, relays and fan motors are inexpensive. If it needs a compressor or keeps leaking R22, replacement is often the better spend.",
      },
    ],
    services: ["window-ac-repair", "split-ac-repair", "ac-gas-filling", "ac-fan-motor-repair"],
    guides: ["repair-or-replace-ac", "ac-water-leakage", "ac-gas-filling-cost"],
  },
];

export const brandBySlug = (slug: string) => BRAND_PAGES.find((b) => b.slug === slug);
export const brandPath = (slug: string) => `/brands/${slug}`;
/** Brand name → page path, for linking from the brands hub, city pages and guides. */
export const brandPathByName = (name: string) => {
  const b = BRAND_PAGES.find((x) => x.name === name);
  return b ? brandPath(b.slug) : undefined;
};
