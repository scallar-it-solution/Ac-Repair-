import type { Faq, PhotoKey, PriceRow } from "./site";

export type IconName =
  | "sparkle"
  | "split"
  | "window"
  | "chip"
  | "gas"
  | "install"
  | "calendar"
  | "building";

export type Service = {
  slug: string;
  name: string;
  /** Short label for menus and cards. */
  short: string;
  icon: IconName;
  price: string;
  /** Lowest published price in INR, used for Offer structured data. */
  priceValue?: number;
  blurb: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  /** Answer-first summary (40–70 words). Written to be quotable by search and AI answer engines. */
  answer: string;
  photo: PhotoKey;
  photoAlt?: string;
  symptomsTitle: string;
  /** `guide` links a symptom to the guide that explains it (service → guide interlinking). */
  symptoms: { title: string; text: string; guide?: string }[];
  process: { title: string; text: string }[];
  included: string[];
  excluded: string[];
  prices: PriceRow[];
  faqs: Faq[];
  related: string[];
};

const VISIT: PriceRow = {
  job: "Inspection visit",
  from: "₹199",
  value: 199,
  note: "Waived if you approve the repair on the same visit",
};

export const SERVICES: Service[] = [
  {
    slug: "ac-service",
    name: "AC Service & Deep Cleaning",
    short: "AC service",
    icon: "sparkle",
    price: "From ₹449",
    priceValue: 449,
    blurb:
      "Foam and pressure-jet wet service for split and window ACs. Coil, blower, drain and outdoor condenser — with a before/after cooling check.",
    metaTitle: "AC Service in Delhi NCR from ₹449 | Jet Wet Service | Airkraft",
    metaDescription:
      "Split AC wet service ₹499, window AC ₹449. Foam + pressure-jet cleaning of coil, blower and drain, outdoor wash and a cooling test. Same-day slots across Delhi NCR.",
    h1: "AC service & deep cleaning in Delhi NCR",
    lede: "Foam and pressure-jet wet service for split and window ACs — indoor coil, blower wheel, drain tray and the outdoor condenser. We test cooling before and after, so you can see what the clean actually did.",
    answer:
      "A wet AC service from Airkraft costs ₹499 for a split AC and ₹449 for a window AC in Delhi NCR. It covers foam and pressure-jet cleaning of the indoor coil, blower and drain, a wash of the outdoor condenser, and a cooling and current-draw test. Gas is never topped up without a leak test.",
    photo: "acUnit",
    symptomsTitle: "Book a service when you notice",
    symptoms: [
      { title: "Weak airflow", text: "Filters and the evaporator coil choke with dust long before anything breaks.", guide: "ac-service-schedule" },
      { title: "Musty smell at start-up", text: "Mould and bacteria grow on a damp coil and drain tray through the monsoon.", guide: "ac-bad-smell" },
      { title: "Water dripping indoors", text: "Usually a clogged drain tray or pipe — a wet service flushes both.", guide: "ac-water-leakage" },
      { title: "Rising electricity bill", text: "A dirty condenser makes the compressor run longer and hotter for the same cooling.", guide: "reduce-ac-electricity-bill" },
      { title: "First start of the season", text: "The best time is March–April, before the first 40 °C week fills every technician’s diary.", guide: "ac-service-schedule" },
      { title: "After a dust storm", text: "Pre-monsoon aandhi packs the outdoor fins with dust; cooling drops within days." },
    ],
    process: [
      { title: "Pre-check", text: "Supply-air temperature, current draw and any error codes recorded before we touch the machine." },
      { title: "Cover and protect", text: "Jet bag on the indoor unit, sheet on the wall and floor. Furniture moved only with your OK." },
      { title: "Foam and jet the indoor unit", text: "Coil, filters, blower wheel and drain tray cleaned; drain line flushed until it runs clear." },
      { title: "Wash the outdoor unit", text: "Condenser fins and fan washed; fin damage and loose wiring flagged on WhatsApp." },
      { title: "Post-check and log", text: "Cooling and current re-measured. Readings and photos go into your WhatsApp service log." },
    ],
    included: [
      "Foam + pressure-jet clean of indoor coil and filters",
      "Blower wheel, drain tray and drain line flush",
      "Outdoor condenser and fan wash",
      "Before/after cooling and current-draw check",
      "Report of anything worn or failing — no surprise add-ons",
    ],
    excluded: [
      "Gas top-up (only after a leak test, quoted separately)",
      "Spare parts and PCB work",
      "Uninstallation for bench cleaning",
    ],
    prices: [
      { job: "Split AC wet service", from: "₹499", value: 499, note: "Foam + jet, indoor + outdoor" },
      { job: "Window AC wet service", from: "₹449", value: 449, note: "Pull-out clean" },
      VISIT,
    ],
    faqs: [
      {
        q: "How often should I service my AC in Delhi NCR?",
        a: "At least twice a year for most homes: once before summer (March–April) and once after the monsoon (September–October). Rooms where the AC runs through the night, and homes near construction or main roads, benefit from a third clean in mid-summer.",
      },
      {
        q: "What is the difference between a wet service and a dry service?",
        a: "A dry service is a filter and surface clean with a cloth and blower. A wet service uses foam and a pressure jet to clean the coil fins, blower wheel and drain, and washes the outdoor condenser. Only a wet service restores lost cooling from a dirty coil.",
      },
      {
        q: "Will a service fix an AC that is not cooling?",
        a: "Sometimes. A clogged filter and a filthy evaporator can look like a gas problem. We always wash and then measure pressures. If cooling is still short, we quote gas or parts — we do not sell a service as a repair.",
      },
      {
        q: "How long does an AC wet service take?",
        a: "Roughly an hour for a split AC. A window AC takes a little longer because the chassis is pulled out of the sleeve to be cleaned properly.",
      },
    ],
    related: ["split-ac-repair", "ac-amc", "ac-gas-filling"],
  },
  {
    slug: "split-ac-repair",
    name: "Split AC Repair",
    short: "Split AC repair",
    icon: "split",
    price: "From ₹499",
    priceValue: 499,
    blurb:
      "Cooling drop, water leak, noise, remote faults, sensor errors — diagnosed on site, not guessed from the gate.",
    metaTitle: "Split AC Repair in Delhi NCR | Same-Day, 90-Day Warranty | Airkraft",
    metaDescription:
      "Split AC not cooling, leaking or noisy? Same-day diagnosis across Delhi, Noida and Gurugram. Inverter and fixed-speed, all major brands. Repairs from ₹499.",
    h1: "Split AC repair in Delhi NCR",
    lede: "We open the indoor unit, test the PCB, check the blower, measure suction and discharge pressures — and only then quote. Most split AC jobs in Delhi NCR finish on the first visit.",
    answer:
      "Airkraft repairs split ACs of every major brand across Delhi NCR, usually on the first visit. Common fixes — capacitor, fan motor, drain blockage, sensor or PCB — start at ₹499, after a ₹199 inspection that is waived if you approve the repair. Every repair carries a 90-day warranty on the part fitted and its labour.",
    photo: "workshop",
    symptomsTitle: "Split AC faults we fix every day",
    symptoms: [
      { title: "Running but not cooling", text: "Dirty coil, failed outdoor fan capacitor, low charge from a leak, or a sensor reading wrong.", guide: "ac-not-cooling" },
      { title: "Water dripping indoors", text: "Blocked drain, broken tray, wrong drain slope or torn insulation on the suction line.", guide: "ac-water-leakage" },
      { title: "Outdoor unit not starting", text: "Capacitor, contactor, communication wiring or an inverter board protecting itself.", guide: "ac-outdoor-unit-not-working" },
      { title: "Noise or vibration", text: "Blower wheel out of balance, loose panels, worn fan motor bearings or a stressed compressor mount.", guide: "ac-making-noise" },
      { title: "Ice on pipes or coil", text: "Low airflow or low refrigerant — both are fixable, neither is solved by ‘gas top-up’ alone.", guide: "ac-gas-leak-signs" },
      { title: "Trips the MCB", text: "Shorted compressor winding, failing capacitor or wiring at the terminal block. Tested, not guessed." },
    ],
    process: [
      { title: "WhatsApp the fault", text: "Brand, tonnage, symptom, a photo of the indoor unit and your landmark. You get a slot and a name." },
      { title: "Measure first", text: "Pressures, current draw, sensor resistance and error history. The fault is identified before any spare is named." },
      { title: "Quote on WhatsApp", text: "Part, labour and why — in writing. You approve, then we fix. No pressure to decide at the door." },
      { title: "Fix, test, warranty", text: "Run test on cooling, current and drain. GST invoice with a 90-day warranty on the part and its labour." },
    ],
    included: [
      "Full diagnosis: pressures, current, sensors, error codes",
      "Repair of the failed component with OEM or OEM-grade parts",
      "Run test on cooling, drain and current draw",
      "GST invoice and 90-day warranty on the part and its labour",
    ],
    excluded: [
      "Compressor replacement (quoted separately, follows the maker’s warranty)",
      "Gas charging (quoted after a leak test)",
      "Civil work such as wall patching",
    ],
    prices: [
      { job: "Water leak repair", from: "₹499", value: 499, note: "Drain / insulation" },
      { job: "Split AC wet service", from: "₹499", value: 499, note: "Foam + jet, indoor + outdoor" },
      { job: "PCB inspection & repair", from: "₹799", value: 799, note: "Board-level parts extra" },
      { job: "Gas filling (R32 / R410A)", from: "₹1,799", value: 1799, note: "After leak test" },
      VISIT,
    ],
    faqs: [
      {
        q: "Why is my split AC running but not cooling?",
        a: "The most common causes, in order, are a dirty filter or coil, a failed outdoor fan or its capacitor, a refrigerant leak, and a faulty temperature sensor. A technician should confirm with pressure and current readings before recommending gas — refrigerant does not get ‘used up’.",
      },
      {
        q: "Why is water dripping from my indoor unit?",
        a: "Usually a blocked drain pipe or tray, a drain line without enough downward slope, or torn insulation that lets the cold pipe sweat. It is a ₹499-range repair in most cases.",
      },
      {
        q: "Is it worth repairing a 10-year-old split AC?",
        a: "If the compressor and coils are healthy, yes — fans, capacitors, sensors and boards are cheap compared with a new machine. If it is an R22 unit that needs repeated gas or a compressor, we will tell you replacement is the better money.",
      },
      {
        q: "Can you repair a split AC that is still under brand warranty?",
        a: "If it is still in the manufacturer’s warranty, we will tell you to call the brand for free cover. We step in for out-of-warranty machines, expired AMCs, or when you need someone today.",
      },
    ],
    related: ["inverter-ac-pcb-repair", "ac-gas-filling", "ac-service"],
  },
  {
    slug: "window-ac-repair",
    name: "Window AC Repair & Service",
    short: "Window AC repair",
    icon: "window",
    price: "From ₹449",
    priceValue: 449,
    blurb:
      "The unloved workhorse of older Delhi flats. We still stock parts, still fix them, still stand behind the job.",
    metaTitle: "Window AC Repair & Service in Delhi NCR from ₹449 | Airkraft",
    metaDescription:
      "Window AC not cooling, noisy or leaking? Capacitor, fan motor, thermostat and gas repairs for every brand and age. Wet service ₹449. Same-day in Delhi NCR.",
    h1: "Window AC repair & service in Delhi NCR",
    lede: "Capacitor, fan motor, thermostat, gas top-up and full wet service for window units of every vintage — Voltas, LG, Carrier, Hitachi, Videocon and the rest.",
    answer:
      "Airkraft still repairs window ACs of every age and brand across Delhi NCR. A full pull-out wet service costs ₹449. Common repairs — capacitor, fan motor, thermostat, relay and gas leaks — are diagnosed on site and quoted on WhatsApp before work starts, with a 90-day warranty on the part fitted.",
    photo: "apartments",
    symptomsTitle: "Window AC problems we see most",
    symptoms: [
      { title: "Compressor hums, no cooling", text: "Classic failed run capacitor or a stuck relay — usually a same-visit fix.", guide: "ac-outdoor-unit-not-working" },
      { title: "Fan runs, air is warm", text: "Compressor not starting, thermostat fault or low charge from a leak." },
      { title: "Loud rattle", text: "Loose chassis in the sleeve, worn fan motor bushings or a cracked fan blade.", guide: "ac-making-noise" },
      { title: "Water leaking into the room", text: "The unit has lost its backward tilt or the base drain is choked with sludge.", guide: "ac-water-leakage" },
      { title: "Ice on the front grille", text: "Low airflow from a filthy coil, or low refrigerant." },
      { title: "Trips the switch", text: "Shorted capacitor, winding fault or a burnt socket — we check the wall point too." },
    ],
    process: [
      { title: "Pull-out inspection", text: "The chassis comes out of the sleeve so the coil, fan and wiring can be seen properly." },
      { title: "Test and quote", text: "Capacitor, relay, thermostat and motor tested. You get the quote on WhatsApp before work starts." },
      { title: "Repair and wet service", text: "Faulty parts replaced; coil and base tray cleaned so the repair is not undone by dirt." },
      { title: "Refit with correct tilt", text: "Slight backward slope so condensate drains outside, gaps sealed, run test done." },
    ],
    included: [
      "Pull-out inspection and electrical tests",
      "Repair with OEM-grade capacitors, relays and motors",
      "Re-seating with correct drainage tilt",
      "GST invoice and 90-day warranty on the part and its labour",
    ],
    excluded: ["Gas charging (quoted after a leak test)", "Sleeve or window-frame carpentry", "Compressor replacement"],
    prices: [
      { job: "Window AC wet service", from: "₹449", value: 449, note: "Pull-out clean" },
      { job: "Gas filling (R22)", from: "₹2,499", value: 2499, note: "Common in older window units; subject to stock" },
      { job: "Gas filling (R32 / R410A)", from: "₹1,799", value: 1799, note: "After leak test" },
      VISIT,
    ],
    faqs: [
      {
        q: "Why does my window AC leak water into the room?",
        a: "Window ACs need a slight backward tilt so condensate runs to the outside. If the unit has settled level or tilted inward, or the base drain is blocked with sludge, water spills indoors. Re-seating and cleaning the base fixes it.",
      },
      {
        q: "Do you still get parts for old window ACs?",
        a: "Yes. Capacitors, relays, thermostats and fan motors for most window units are standard sizes we carry. Brand-specific panels and old remote boards are sourced on request.",
      },
      {
        q: "Should I replace my old window AC with a split?",
        a: "If the window unit cools well after a service, keep it — repairs are cheap. Replace it if it needs a compressor, uses R22 and keeps leaking, or if the noise in a bedroom bothers you. We will give you the numbers either way.",
      },
    ],
    related: ["ac-service", "ac-gas-filling", "ac-installation"],
  },
  {
    slug: "inverter-ac-pcb-repair",
    name: "Inverter AC & PCB Repair",
    short: "Inverter & PCB repair",
    icon: "chip",
    price: "From ₹799",
    priceValue: 799,
    blurb:
      "Error codes, dead outdoor units, communication faults. We read the code, test the board and repair at component level where that is safe.",
    metaTitle: "Inverter AC & PCB Repair in Delhi NCR from ₹799 | Airkraft",
    metaDescription:
      "Inverter AC error code or outdoor unit not starting? Board-level PCB diagnosis and repair for Daikin, LG, Samsung, Voltas and more. From ₹799 in Delhi NCR.",
    h1: "Inverter AC & PCB repair in Delhi NCR",
    lede: "Inverter faults usually announce themselves as a blinking code. We read it, test sensors, both boards and the compressor drive, and repair at component level where it is safe — instead of swapping a ₹9,000 board by reflex.",
    answer:
      "Inverter AC faults usually appear as a blinking error code. Airkraft reads the code, tests sensors, the indoor and outdoor PCBs and the compressor drive, and repairs the board at component level where that is safe. PCB inspection and repair starts at ₹799 across Delhi NCR; board-level parts are quoted after testing.",
    photo: "pcb",
    symptomsTitle: "Signs of an inverter or PCB fault",
    symptoms: [
      { title: "Error code on the display", text: "Communication (e.g. U4, CH05, E101), sensor, fan-motor or compressor-drive codes.", guide: "ac-error-codes" },
      { title: "Outdoor unit will not start", text: "Indoor unit blows air but the outdoor fan and compressor stay silent.", guide: "ac-outdoor-unit-not-working" },
      { title: "Cools, then cuts out", text: "Protection trips on overheating, high current or a failing IPM module." },
      { title: "Dead after a power cut", text: "Voltage spikes and DG changeovers are the commonest killers of boards in NCR.", guide: "ac-stabilizer-guide" },
      { title: "Remote beeps, nothing happens", text: "Indoor board receives the signal but cannot drive the fan or outdoor unit." },
      { title: "Insects or moisture in the outdoor board", text: "Ants, lizards and monsoon damp short tracks on outdoor PCBs every year." },
    ],
    process: [
      { title: "Read the code and history", text: "Error code, when it appears and what happened before it (power cut, storm, recent service)." },
      { title: "Isolate the fault", text: "Sensor, wiring, indoor board, outdoor board or compressor — tested in that order, cheapest first." },
      { title: "Repair or replace", text: "Component-level repair on the bench where safe; otherwise an OEM or OEM-grade board — you choose." },
      { title: "Protect it", text: "Advice on stabilisers, surge protection and sealing the outdoor board against insects." },
    ],
    included: [
      "Error-code reading and sensor resistance tests",
      "Indoor and outdoor PCB diagnosis",
      "Component-level board repair where safe",
      "GST invoice and 90-day warranty on the repair",
    ],
    excluded: [
      "Replacement boards and components (quoted after testing)",
      "Compressor replacement",
      "Damage from ongoing voltage problems in the building wiring",
    ],
    prices: [
      { job: "PCB inspection & repair", from: "₹799", value: 799, note: "Board-level parts extra" },
      VISIT,
    ],
    faqs: [
      {
        q: "Can an inverter AC PCB be repaired, or does it have to be replaced?",
        a: "Many can be repaired. Burnt fuses, relays, regulators, capacitors and some driver components are replaceable at board level. A board with a cracked or burnt main processor area, or heavy corrosion, should be replaced. We tell you which after testing.",
      },
      {
        q: "What causes inverter AC PCBs to fail in Delhi NCR?",
        a: "Voltage fluctuations, surges when power returns after a cut, generator changeovers in societies, heat in the outdoor unit, and insects or moisture getting into the outdoor board.",
      },
      {
        q: "Do I need a stabiliser for an inverter AC?",
        a: "Most inverter ACs are built to handle a wide voltage range, and many makers say a stabiliser is not required. In buildings with frequent voltage dips, power cuts or generator changeovers, a stabiliser or surge protector is cheap insurance for a board that costs several thousand rupees.",
      },
      {
        q: "Do you use original boards?",
        a: "We fit OEM boards or OEM-grade equivalents and tell you which before fitting. We do not fit unbranded boards — they are a common cause of repeat failures.",
      },
    ],
    related: ["split-ac-repair", "commercial-ac-repair", "ac-amc"],
  },
  {
    slug: "ac-gas-filling",
    name: "AC Gas Filling",
    short: "Gas filling",
    icon: "gas",
    price: "From ₹1,799",
    priceValue: 1799,
    blurb:
      "We find the leak first. Filling gas into a leaking coil is how you get called again in three weeks.",
    metaTitle: "AC Gas Filling in Delhi NCR from ₹1,799 | Leak Test First | Airkraft",
    metaDescription:
      "AC gas refill from ₹1,799 (R32/R410A) and ₹2,499 (R22). Nitrogen leak test, vacuum and weighed charge — grams on the invoice. Same-day in Delhi NCR.",
    h1: "AC gas filling in Delhi NCR — leak test first",
    lede: "Nitrogen pressure test, leak detection, vacuum, then a weighed charge of R32, R410A or R22. Your invoice lists the gas type and grams charged.",
    answer:
      "AC gas filling at Airkraft starts at ₹1,799 for R32 or R410A and ₹2,499 for R22 (subject to stock) in Delhi NCR. It includes a nitrogen pressure test, leak detection, vacuum and a weighed charge, and the invoice lists the gas and grams used. We never refill without finding the leak, because a healthy AC does not consume refrigerant.",
    photo: "gauges",
    symptomsTitle: "Signs your AC may actually be low on gas",
    symptoms: [
      { title: "Cooling faded over weeks", text: "A slow leak shows as gradually weaker cooling, not a sudden stop.", guide: "ac-gas-leak-signs" },
      { title: "Frost on the service valve", text: "Ice on the thin copper pipe at the outdoor unit points to low charge or low airflow.", guide: "ac-gas-leak-signs" },
      { title: "Outdoor unit runs, air is mild", text: "Compressor working, but the indoor air is only a few degrees below room temperature." },
      { title: "Oily patches at joints", text: "Refrigerant carries oil — an oily flare nut or coil bend is often where it leaks." },
      { title: "Hissing or bubbling", text: "Audible at a large leak; small leaks need a nitrogen test to find." },
      { title: "Error code for low refrigerant", text: "Many inverter ACs flag low charge with a dedicated code (for example LG CH38, Samsung E554).", guide: "ac-error-codes" },
    ],
    process: [
      { title: "Confirm it is gas", text: "Pressures, temperatures and current measured. A dirty coil can mimic low gas, so we rule that out." },
      { title: "Find the leak", text: "Nitrogen pressure test with soap and electronic detection at flares, brazed joints and coils." },
      { title: "Fix the leak", text: "Flares re-made, joints brazed, or coil repair quoted — before a single gram goes in." },
      { title: "Vacuum and weigh in", text: "Vacuum pump to remove air and moisture, then a weighed charge to the nameplate spec." },
      { title: "Record it", text: "Gas type and grams on the GST invoice and in your WhatsApp log, so the next visit starts from facts." },
    ],
    included: [
      "Pressure and performance check",
      "Nitrogen leak test and leak location",
      "Vacuum before charging",
      "Weighed charge of R32, R410A or R22",
      "Gas type and grams on the invoice",
    ],
    excluded: [
      "Coil replacement or major brazing (quoted after the leak is found)",
      "Compressor replacement",
      "R22 when out of stock",
    ],
    prices: [
      { job: "Gas filling (R32 / R410A)", from: "₹1,799", value: 1799, note: "After leak test, weighed charge" },
      { job: "Gas filling (R22)", from: "₹2,499", value: 2499, note: "Subject to stock" },
      VISIT,
    ],
    faqs: [
      {
        q: "Does an AC need gas refilling every year?",
        a: "No. Refrigerant circulates in a sealed loop and is not used up. If your AC is low on gas, it has a leak. Refilling without fixing the leak only buys a few weeks.",
      },
      {
        q: "Which gas does my AC use?",
        a: "Check the nameplate sticker on the outdoor unit — it lists the refrigerant and the factory charge in grams. Most split ACs sold in India in recent years use R32; some use R410A; older machines, especially window units, often use R22.",
      },
      {
        q: "Why is R22 gas filling more expensive?",
        a: "R22 is an ozone-depleting HCFC being phased out under the Montreal Protocol, so supply is shrinking and prices are rising. For an old R22 machine with a recurring leak, replacement is often the better long-term spend.",
      },
      {
        q: "How long does AC gas filling take?",
        a: "Allow about two hours including the leak test and vacuum. If the leak needs brazing or a coil repair, that adds time and is quoted first.",
      },
    ],
    related: ["split-ac-repair", "ac-service", "window-ac-repair"],
  },
  {
    slug: "ac-installation",
    name: "AC Installation & Uninstallation",
    short: "Install & uninstall",
    icon: "install",
    price: "From ₹1,499",
    priceValue: 1499,
    blurb:
      "Core cutting, copper running, vacuuming, drainage fall — done like a fit-out, not a jugaad on the balcony.",
    metaTitle: "AC Installation in Delhi NCR from ₹1,499 | Split AC Fitting | Airkraft",
    metaDescription:
      "Split AC installation from ₹1,499 with 3 m copper kit, core cutting, proper drain fall and vacuum. Uninstallation and house shifting too. Same-day across Delhi NCR.",
    h1: "AC installation & uninstallation in Delhi NCR",
    lede: "Standard 1–2 ton split installs, high-wall mounts, heavy outdoor stands, copper extension and shifting between rooms or houses. Vacuumed every time — never ‘purged’ with the machine’s own gas.",
    answer:
      "Split AC installation at Airkraft starts at ₹1,499 for a standard 1–1.5 ton unit in Delhi NCR. It includes core cutting, indoor and outdoor mounting, the standard 3-metre copper kit, drain routing with proper fall, vacuuming and a run test. Uninstallation, shifting and extra copper are quoted on WhatsApp before the visit.",
    photo: "outdoor",
    symptomsTitle: "When to call us",
    symptoms: [
      { title: "New AC delivered", text: "Bought online or offline and the brand’s installation slot is days away.", guide: "ac-installation-checklist" },
      { title: "Moving house", text: "Uninstall, cap and carry, then reinstall with fresh flares and a vacuum at the new place." },
      { title: "Shifting rooms", text: "Relocation within the home, including longer copper runs and new core cuts." },
      { title: "Bad previous install", text: "Dripping, noise, poor cooling or an outdoor unit hanging off a rusty stand.", guide: "ac-installation-checklist" },
      { title: "Renovation or painting", text: "Temporary uninstall with the gas pumped down into the outdoor unit." },
      { title: "High-rise outdoor units", text: "Ledge and facade mounts in society towers, with safety gear and society permissions." },
    ],
    process: [
      { title: "Site check", text: "Wall strength, outdoor placement, airflow clearance, power point and MCB rating." },
      { title: "Mount and core-cut", text: "Level indoor bracket, sloped core hole, outdoor unit on a rated stand or ledge." },
      { title: "Copper and drain", text: "Flared joints, insulated lines, and a drain with a steady downward fall." },
      { title: "Vacuum, open, test", text: "Vacuum pump on the lines, valves opened, leak check, then cooling and current test." },
    ],
    included: [
      "Indoor and outdoor unit mounting",
      "Core cutting through the wall",
      "Standard 3-metre copper kit, flared and insulated",
      "Drain routing with proper fall",
      "Vacuum, leak check and run test",
    ],
    excluded: [
      "Extra copper beyond 3 m (billed per metre, quoted first)",
      "Outdoor stand, if not supplied with the AC",
      "Plaster and paint patching",
      "Electrical wiring or new power points",
    ],
    prices: [
      { job: "Split AC installation", from: "₹1,499", value: 1499, note: "Standard 1–1.5 ton, 3 m copper kit" },
      { job: "Uninstallation / shifting", from: "On quote", note: "Quoted on WhatsApp before the visit" },
      { job: "Extra copper run", from: "On quote", note: "Per metre, flared and vacuumed" },
    ],
    faqs: [
      {
        q: "Is copper pipe included in the installation price?",
        a: "Yes — the standard 3-metre kit is in the install price. Extra run is billed per metre, flared and vacuumed, never just ‘connected’.",
      },
      {
        q: "Why do you vacuum instead of ‘purging’ with gas?",
        a: "Purging pushes some of the machine’s refrigerant out to flush air, which wastes gas and leaves moisture in the lines. A vacuum pump removes air and moisture properly, which protects the compressor and keeps cooling at spec.",
      },
      {
        q: "Can you install an AC I bought online?",
        a: "Yes. Send us the model and a photo of the wall and outdoor spot on WhatsApp and we will confirm what is needed before the visit.",
      },
      {
        q: "Is civil work included?",
        a: "Core cutting is. Plaster and paint patching around the pipes is quoted separately.",
      },
    ],
    related: ["ac-gas-filling", "ac-amc", "split-ac-repair"],
  },
  {
    slug: "ac-amc",
    name: "AC AMC Plans",
    short: "AMC plans",
    icon: "calendar",
    price: "From ₹2,499",
    priceValue: 2499,
    blurb:
      "Two wet services, a dry service, priority call-outs and AMC-rate parts. Built for people done chasing a new number every May.",
    metaTitle: "AC AMC in Delhi NCR from ₹2,499/yr | Annual Maintenance | Airkraft",
    metaDescription:
      "Annual AC maintenance from ₹2,499 per AC: 2 wet + 1 dry service, priority summer slots, AMC-rate parts and a WhatsApp log for every machine.",
    h1: "AC AMC plans in Delhi NCR",
    lede: "Residential and small-office AMC. We log every machine — brand, tonnage, gas, last service — so the next technician never starts from zero.",
    answer:
      "An Airkraft residential AC AMC starts at ₹2,499 per AC per year in Delhi NCR. It includes two wet services and one dry service, priority slots in peak summer, parts at AMC rates and a WhatsApp service log for each machine. Multi-AC home plans and AMCs for offices with five or more machines are quoted after a survey.",
    photo: "living",
    symptomsTitle: "Who an AMC is for",
    symptoms: [
      { title: "Homes with 3+ ACs", text: "One plan, one schedule, one number — instead of three separate bookings each summer." },
      { title: "Landlords", text: "Tenants call us directly; you get the invoice and the service log." },
      { title: "Parents living alone", text: "We schedule, remind and turn up. Nobody has to climb a ladder or chase a technician." },
      { title: "Clinics and small offices", text: "Downtime costs patients and staff. Priority slots and night work where needed." },
      { title: "Work-from-home rooms", text: "An AC that runs ten hours a day needs cleaning more often than a guest room unit." },
      { title: "Anyone tired of May", text: "Peak season waiting lists do not apply to AMC customers.", guide: "ac-amc-worth-it" },
    ],
    process: [
      { title: "Register your machines", text: "Brand, model, tonnage, gas, age and location of every AC go into your machine file." },
      { title: "Schedule the year", text: "Pre-summer wet service, mid-summer dry service, post-monsoon wet service." },
      { title: "Priority call-outs", text: "Breakdowns between services jump the queue, even in June." },
      { title: "Renewal review", text: "Before renewal, an honest note on which machines are healthy and which are ageing." },
    ],
    included: [
      "2 wet services + 1 dry service per AC per year",
      "Priority slots in peak season",
      "Parts at AMC rates",
      "WhatsApp service log and reminders",
      "GST invoice",
    ],
    excluded: ["Spare parts (billed at AMC rates)", "Gas charging (quoted after leak test)", "Compressor and coil replacement"],
    prices: [
      { job: "Residential AMC (1 AC)", from: "₹2,499", value: 2499, note: "2 wet + 1 dry service, priority slots" },
      { job: "Multi-AC home plan", from: "On quote", note: "Per-AC rate drops as you add machines" },
      { job: "Office / clinic AMC (5+ ACs)", from: "On quote", note: "Site survey first" },
    ],
    faqs: [
      {
        q: "What does an Airkraft AMC include?",
        a: "Two wet services and one dry service per AC per year, priority slots during peak summer, parts at AMC rates, WhatsApp reminders and a service log for every machine, and a GST invoice.",
      },
      {
        q: "Are spare parts free under the AMC?",
        a: "No. This is a non-comprehensive AMC: services and priority are included, and parts are billed separately at the discounted AMC rate.",
      },
      {
        q: "When are AMC services scheduled in Delhi NCR?",
        a: "Typically a wet service in March–April before the heat, a dry service in mid-summer, and a wet service after the monsoon in September–October to clear mould and silt.",
      },
      {
        q: "Can I take an AMC for an old AC?",
        a: "Yes. We inspect it at the first service and tell you honestly if the machine is worth covering.",
      },
    ],
    related: ["ac-service", "commercial-ac-repair", "split-ac-repair"],
  },
  {
    slug: "commercial-ac-repair",
    name: "Cassette, Ductable & VRF AC Service",
    short: "Cassette & VRF",
    icon: "building",
    price: "On-site quote",
    blurb:
      "Cassette, ductable and small VRF for shops, clinics, restaurants and offices. Night work if you cannot shut the floor.",
    metaTitle: "Cassette & VRF AC Repair in Delhi NCR | Commercial AC | Airkraft",
    metaDescription:
      "Cassette, ductable and VRF/VRV AC service and repair for offices, clinics, restaurants and shops in Delhi NCR. Night work, GST invoices and AMC for 5+ machines.",
    h1: "Cassette, ductable & VRF AC service in Delhi NCR",
    lede: "Drain-pump failures, indoor PCBs, outdoor inverter boards, communication errors and gas circuits. We coordinate with facility managers and keep a paper trail.",
    answer:
      "Airkraft services cassette, ductable and small VRF/VRV systems for shops, clinics, restaurants and offices across Delhi NCR. Typical work covers drain-pump failures, indoor and outdoor PCB faults, communication errors and refrigerant circuits. Night and weekend work is available so the floor stays open, and every job comes with a GST invoice.",
    photo: "delhiStreet",
    photoAlt: "Commercial and office towers along a Delhi NCR road",
    symptomsTitle: "Commercial faults we handle",
    symptoms: [
      { title: "Water from the cassette panel", text: "Failed drain pump, stuck float switch or a choked drain line above the ceiling.", guide: "ac-water-leakage" },
      { title: "Communication errors", text: "Indoor units losing the outdoor unit or controller — wiring, addressing or board faults.", guide: "ac-error-codes" },
      { title: "One zone not cooling", text: "Expansion valve, sensor or airflow issue on a single indoor unit." },
      { title: "High-pressure trips in summer", text: "Blocked condensers or poor airflow around rooftop outdoor units." },
      { title: "Greasy coils in kitchens", text: "Restaurant coils need degreasing, not just a water jet." },
      { title: "Server and clinic rooms overheating", text: "Equipment rooms that cannot wait until the next working day." },
    ],
    process: [
      { title: "Survey and machine log", text: "Every indoor and outdoor unit tagged with model, capacity, location and condition." },
      { title: "Work around your hours", text: "Early-morning, late-night or weekend slots so customers and staff are not disturbed." },
      { title: "Fix and document", text: "Findings, photos and readings sent to the facility manager with a GST invoice." },
      { title: "Planned maintenance", text: "AMC for five or more machines with a fixed schedule and priority response." },
    ],
    included: [
      "Site survey and machine log",
      "Cassette and ductable cleaning and repair",
      "VRF/VRV fault diagnosis",
      "Night and weekend scheduling",
      "GST invoices and written reports",
    ],
    excluded: ["Large central plants and chillers", "Ducting fabrication", "Building electrical works"],
    prices: [
      { job: "Cassette AC service", from: "On quote", note: "Depends on access height and count" },
      { job: "VRF / VRV fault diagnosis", from: "On quote", note: "Site survey first" },
      { job: "Commercial AMC (5+ machines)", from: "On quote", note: "Fixed schedule + priority response" },
    ],
    faqs: [
      {
        q: "Do you work at night or on weekends?",
        a: "Yes. For restaurants, clinics, shops and offices we schedule early-morning, late-night or weekend work so you do not have to shut the floor.",
      },
      {
        q: "Do you provide GST invoices for businesses?",
        a: "Yes, on every job, with your company name and GSTIN on request.",
      },
      {
        q: "Which VRF systems do you service?",
        a: "Small and mid-size VRF/VRV systems from the major brands sold in India, including Daikin, Mitsubishi, Hitachi, LG, Samsung and Blue Star. Large plant rooms are assessed by survey first.",
      },
      {
        q: "Can you coordinate with our facility manager or building management?",
        a: "Yes. We share the schedule, technician names and IDs in advance, and send findings, photos and invoices to whoever manages the site.",
      },
    ],
    related: ["ac-amc", "inverter-ac-pcb-repair", "ac-installation"],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const servicePath = (slug: string) => `/services/${slug}`;
