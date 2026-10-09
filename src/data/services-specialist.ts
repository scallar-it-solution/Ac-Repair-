import type { Service } from "./services";
import type { PriceRow } from "./site";

/**
 * Specialist, high-intent repair pages. Each targets a distinct transactional query and links into the
 * guide that explains the problem (symptom → guide) and the related core services.
 * Prices use only published rates; everything else is "On quote".
 */

const VISIT: PriceRow = {
  job: "Inspection visit",
  from: "₹199",
  value: 199,
  note: "Waived if you approve the repair on the same visit",
};

export const SPECIALIST: Service[] = [
  {
    slug: "emergency-ac-repair",
    tier: "specialist",
    name: "Emergency & Same-Day AC Repair",
    short: "Emergency repair",
    icon: "bolt",
    price: "Visit ₹199",
    priceValue: 199,
    blurb:
      "AC died on a 45 °C afternoon or in the middle of the night? Same-day slots 7 AM–10 PM and night call-outs for dead machines in occupied rooms.",
    metaTitle: "Emergency AC Repair Delhi NCR — Same-Day & Night | Frostwright",
    metaDescription:
      "AC stopped in peak heat or at night? Same-day repair across Delhi NCR from 7 AM to 10 PM, plus night emergency call-outs. ₹199 visit, waived on repair.",
    h1: "Emergency & same-day AC repair in Delhi NCR",
    lede: "When the AC dies in a Delhi summer, a closed room becomes unbearable within the hour. Send a photo and your landmark — we confirm a same-day slot, and run night call-outs for occupied rooms, the elderly, infants and clinics.",
    answer:
      "Frostwright offers same-day AC repair across Delhi NCR between 7 AM and 10 PM, with typical daytime arrival of 45–90 minutes in South, Central and East Delhi, Noida and Gurugram, and a 24×7 emergency call-out for dead machines at night. The ₹199 inspection is waived if you approve the repair; night call-outs carry a surcharge that we tell you before booking.",
    photo: "outdoor",
    symptomsTitle: "Treat it as an emergency when",
    symptoms: [
      { title: "AC dead in peak heat", text: "Elderly people, infants or anyone unwell in a room above 35 °C should not wait for tomorrow’s slot.", guide: "ac-outdoor-unit-not-working" },
      { title: "Burning smell or sparking", text: "Switch off at the MCB first, then call. Do not run the AC again until it has been checked.", guide: "ac-bad-smell" },
      { title: "Water pouring indoors", text: "Switch off to protect the wiring and walls — a blocked drain is usually a quick fix.", guide: "ac-water-leakage" },
      { title: "MCB trips on start", text: "A shorted capacitor or compressor winding. Repeated restarts can make the damage worse.", guide: "ac-outdoor-unit-not-working" },
      { title: "Equipment room overheating", text: "Server, clinic and pharmacy rooms — tell us it is an equipment room and we schedule it ahead of routine servicing." },
      { title: "Error code and no cooling", text: "Send a photo of the display; many codes tell us which parts to bring.", guide: "ac-error-codes" },
    ],
    process: [
      { title: "Call or WhatsApp", text: "Call for night emergencies. In the day, WhatsApp a photo, any error code and your landmark." },
      { title: "An honest arrival window", text: "You get the real window before anyone sets off — and we say so if we cannot reach you today." },
      { title: "Make it safe, then diagnose", text: "Power isolated, water stopped, then gauges and meters before any part is named. Quote on WhatsApp." },
      { title: "Fix now or plan the part", text: "Most faults are fixed on the visit. If a part must be sourced, we tell you whether the AC can run safely meanwhile." },
    ],
    included: [
      "Same-day slots 7 AM–10 PM, all 7 days",
      "Night call-out for dead machines in occupied rooms",
      "Full diagnosis before any part is named",
      "Written quote on WhatsApp before work starts",
      "GST invoice and 90-day warranty on the repair",
    ],
    excluded: [
      "Night surcharge (told before booking)",
      "Spare parts and gas (quoted after diagnosis)",
      "Travel add-on for outlying areas, where it applies",
    ],
    prices: [
      VISIT,
      { job: "Night emergency call-out", from: "On quote", note: "Surcharge told before booking" },
      { job: "Water leak repair", from: "₹499", value: 499, note: "Drain / insulation" },
      { job: "PCB inspection & repair", from: "₹799", value: 799, note: "Board-level parts extra" },
    ],
    faqs: [
      {
        q: "Do you repair ACs at night?",
        a: "Yes. Our working hours are 7 AM to 10 PM every day, and we run a 24×7 emergency call-out for dead machines in occupied rooms. Night visits carry a surcharge that we tell you before booking.",
      },
      {
        q: "How fast can you reach me in an emergency?",
        a: "During the day, typically 45–90 minutes in South, Central and East Delhi, Noida and Gurugram. Peak May–June afternoons and night call-outs can take longer — we give you an honest window before anyone sets off.",
      },
      {
        q: "What should I do while I wait?",
        a: "Switch the AC off at the MCB if there is a burning smell, water near the electrics or repeated tripping. Close curtains on sunny windows, and send a photo of the indoor unit and any error code so the technician arrives with the right parts.",
      },
      {
        q: "Is emergency AC repair more expensive?",
        a: "A same-day daytime visit costs the same as any visit: a ₹199 inspection, waived if you approve the repair. Only night call-outs carry a surcharge, and we tell you the amount upfront.",
      },
    ],
    related: ["split-ac-repair", "inverter-ac-pcb-repair", "ac-water-leakage-repair"],
  },
  {
    slug: "ac-compressor-replacement",
    tier: "specialist",
    name: "AC Compressor Repair & Replacement",
    short: "Compressor replacement",
    icon: "compressor",
    price: "On quote",
    blurb:
      "Many ‘dead compressors’ are really a failed capacitor, contactor or overload. We test before anyone says ‘replace’ — and replace properly when it is needed.",
    metaTitle: "AC Compressor Repair & Replacement in Delhi NCR | Frostwright",
    metaDescription:
      "AC compressor not starting? We test windings, capacitor and overload before quoting a replacement — then braze, flush, vacuum and weigh in the gas. Delhi NCR.",
    h1: "AC compressor repair & replacement in Delhi NCR",
    lede: "The compressor is the most expensive part of an AC, which makes it the part most often ‘diagnosed’ carelessly. We prove it has failed before quoting — and when it has, we replace it the way the maker intended.",
    answer:
      "Before replacing an AC compressor, Frostwright tests the start capacitor, contactor, overload protector, winding resistance and current draw, because many compressors written off as dead are stopped by one of these cheaper parts. If the compressor has genuinely failed, replacement includes brazing under nitrogen, a pressure test, vacuum and a weighed refrigerant charge. It is quoted after diagnosis, and the compressor carries its manufacturer’s warranty.",
    photo: "workshop",
    symptomsTitle: "Signs the compressor needs testing",
    symptoms: [
      { title: "Outdoor fan runs, compressor silent", text: "Could be the compressor — or its capacitor, contactor or overload protector.", guide: "ac-outdoor-unit-not-working" },
      { title: "Humming, then the MCB trips", text: "A locked rotor or shorted winding — or simply a failed start capacitor. Tested, not assumed." },
      { title: "Loud knocking from the outdoor unit", text: "Internal mechanical wear, often near the end of the compressor’s life.", guide: "ac-making-noise" },
      { title: "Compressor-drive error code", text: "Codes such as Daikin L5 or LG CH21 point at the inverter drive or the compressor; the board is tested first.", guide: "ac-error-codes" },
      { title: "Burnt smell at the outdoor unit", text: "A burnt-out compressor contaminates the circuit, which needs flushing — not just a new compressor.", guide: "ac-bad-smell" },
      { title: "Old R22 machine, repeated leaks", text: "An ageing compressor on a leaking R22 system is often a replace-the-AC decision.", guide: "repair-or-replace-ac" },
    ],
    process: [
      { title: "Prove the failure", text: "Capacitor, contactor and overload tested; winding resistance and insulation measured; current compared with the nameplate." },
      { title: "Compare before you commit", text: "The compressor quote comes with an honest note on what a new AC would cost, so you can choose." },
      { title: "Replace properly", text: "Old compressor removed, new one brazed in under nitrogen, filter-drier replaced where fitted, system pressure-tested." },
      { title: "Vacuum, charge, test", text: "Deep vacuum, weighed refrigerant charge, current and cooling checked against spec." },
    ],
    included: [
      "Electrical tests of capacitor, contactor, overload and windings",
      "Written comparison: compressor replacement vs a new AC",
      "Brazing under nitrogen and pressure test",
      "Vacuum and weighed refrigerant charge",
      "GST invoice; compressor covered by its manufacturer’s warranty",
    ],
    excluded: [
      "Compressor and refrigerant cost (quoted after diagnosis)",
      "Coil replacement if the coil is also leaking",
      "Machines whose compressor is still under the brand’s warranty — claim that first",
    ],
    prices: [
      VISIT,
      { job: "Compressor replacement", from: "On quote", note: "Depends on model, tonnage and refrigerant" },
      { job: "Gas filling (R32 / R410A)", from: "₹1,799", value: 1799, note: "After leak test, weighed charge" },
    ],
    faqs: [
      {
        q: "How do I know if my AC compressor is really dead?",
        a: "Only by testing: the start capacitor, contactor and overload protector, the winding resistance and the current the compressor draws. Many compressors written off as dead are actually stopped by one of those cheaper parts.",
      },
      {
        q: "Is it worth replacing an AC compressor?",
        a: "Usually, if the AC is under about eight years old and the coils are healthy. On an older machine — especially one using R22 — a new compressor often costs a large share of a new, more efficient AC. We quote both so you can compare.",
      },
      {
        q: "Is the compressor covered by the brand’s warranty?",
        a: "Many brands cover the compressor for longer than the rest of the AC. Check your warranty card first — if it is still covered, claim it from the brand. We step in when it is not.",
      },
      {
        q: "How long does a compressor replacement take?",
        a: "Typically most of a day, including brazing, pressure testing and vacuum — longer if the part has to be sourced for an older or less common model.",
      },
    ],
    related: ["split-ac-repair", "ac-coil-repair", "inverter-ac-pcb-repair"],
  },
  {
    slug: "ac-water-leakage-repair",
    tier: "specialist",
    name: "AC Water Leakage Repair",
    short: "Water leakage repair",
    icon: "droplet",
    price: "From ₹499",
    priceValue: 499,
    blurb:
      "Dripping indoor unit, wet wall, puddle under the AC. Drain, tray, slope and insulation fixed — usually in one visit.",
    metaTitle: "AC Water Leakage Repair in Delhi NCR from ₹499 | Frostwright",
    metaDescription:
      "Water dripping from your AC indoor unit? Drain flush, tray clean, slope correction and pipe insulation from ₹499. Same-day across Delhi, Noida and Gurugram.",
    h1: "AC water leakage repair in Delhi NCR",
    lede: "Water dripping from the indoor unit is almost never a gas problem. It is a blocked drain, a tilted unit, torn insulation or a coil freezing over — and most are fixed in one visit.",
    answer:
      "AC water leakage repair at Frostwright starts at ₹499 in Delhi NCR. The technician finds where the water escapes — a blocked drain line, dirty tray, wrong drain slope, an indoor unit that is not level, torn pipe insulation or a coil freezing from low airflow — and fixes it on the same visit in most cases. If a frozen coil points to low refrigerant, the leak test and gas work are quoted separately.",
    photo: "living",
    symptomsTitle: "Where the water is coming from",
    symptoms: [
      { title: "Drip from under the indoor unit", text: "The classic blocked drain line or choked tray.", guide: "ac-water-leakage" },
      { title: "Water running down the wall", text: "Torn insulation on the cold pipe, or water tracking back through the core hole." },
      { title: "Leak only after switching off", text: "The coil froze and is melting — usually dirty filters or low airflow.", guide: "ac-service-schedule" },
      { title: "Leaking since installation or shifting", text: "A drain without fall, or an indoor unit that is not level.", guide: "ac-installation-checklist" },
      { title: "Window AC leaking inside", text: "The unit lost its slight backward tilt, or the base drain is choked." },
      { title: "Musty smell with the leak", text: "Sludge and mould in the tray — it needs a proper wet clean.", guide: "ac-bad-smell" },
    ],
    process: [
      { title: "Find the source", text: "Drain outlet, tray, slope, insulation and coil checked — the fix depends on where the water escapes." },
      { title: "Clear and clean", text: "Drain line flushed or blown through and the tray cleaned of sludge." },
      { title: "Correct the cause", text: "Unit re-levelled, a drain without fall re-routed, insulation repaired or the core hole sealed." },
      { title: "Run and watch", text: "AC run until condensate flows steadily outside with nothing dripping indoors." },
    ],
    included: [
      "Leak source diagnosis",
      "Drain line flush and tray clean",
      "Slope and level correction where possible",
      "Insulation repair on exposed pipe sections",
      "Run test and 90-day warranty on the repair",
    ],
    excluded: [
      "Gas work if the coil freezes from low refrigerant (leak test first)",
      "Wall plaster or paint repair",
      "New drain routing through walls (quoted)",
    ],
    prices: [
      { job: "Water leak repair", from: "₹499", value: 499, note: "Drain / insulation" },
      { job: "Split AC wet service", from: "₹499", value: 499, note: "When the tray and coil need a full clean" },
      { job: "Window AC wet service", from: "₹449", value: 449, note: "Pull-out clean" },
      VISIT,
    ],
    faqs: [
      {
        q: "How much does AC water leakage repair cost?",
        a: "At Frostwright, drain and insulation repairs start at ₹499. If the tray and coil need a full clean, a wet service is ₹499 for a split AC and ₹449 for a window AC.",
      },
      {
        q: "Can I keep using the AC while it leaks?",
        a: "Better not. Water near the indoor unit’s electrics or the wall socket is a shock and short-circuit risk, and it damages walls. Switch off until it is fixed.",
      },
      {
        q: "Why does my AC leak right after a service?",
        a: "Usually the drain was disturbed or the indoor unit was not re-seated level. It is a quick correction — and on our own work it is covered by the warranty.",
      },
    ],
    related: ["ac-service", "split-ac-repair", "window-ac-repair"],
  },
  {
    slug: "ac-shifting",
    tier: "specialist",
    name: "AC Shifting & Reinstallation",
    short: "AC shifting",
    icon: "truck",
    price: "On quote",
    blurb:
      "Moving house or rooms? Gas pumped down into the outdoor unit, lines capped, then a fresh install with new flares, vacuum and a leak test.",
    metaTitle: "AC Shifting Service in Delhi NCR | Uninstall & Reinstall | Frostwright",
    metaDescription:
      "Moving house? AC shifting across Delhi NCR: gas pumped down, lines capped, units handed over safely and reinstalled with new flares, vacuum and a leak test.",
    h1: "AC shifting & reinstallation in Delhi NCR",
    lede: "Most AC problems after a house move come from the move itself: gas lost on removal, kinked pipes, old flares reused, no vacuum. We shift ACs the way they should be shifted.",
    answer:
      "AC shifting at Frostwright means pumping the refrigerant down into the outdoor unit before removal, capping the lines, handing the units over upright and padded for your movers, then reinstalling with fresh flares, a vacuum, a leak test and a run test. Uninstallation, reinstallation and any extra copper are quoted on WhatsApp before the visit; standard split installation at the new place starts at ₹1,499.",
    photo: "outdoor",
    symptomsTitle: "Book AC shifting when",
    symptoms: [
      { title: "Moving house within NCR", text: "Uninstall at the old home, reinstall at the new one — one team, one quote." },
      { title: "Moving the AC to another room", text: "New core cut and pipe run, same machine.", guide: "ac-installation-checklist" },
      { title: "Renovation or painting", text: "Remove now, reinstall after the work, with the gas stored safely in the outdoor unit." },
      { title: "Handing back a rented flat", text: "Remove your own AC and leave the wall ready for patching." },
      { title: "AC stopped cooling after a move", text: "Gas lost or a bad flare from a previous shift — leak test, then recharge.", guide: "ac-gas-leak-signs" },
      { title: "Outdoor unit in a bad spot", text: "Relocate it for airflow, safe access or a neighbour’s complaint.", guide: "ac-making-noise" },
    ],
    process: [
      { title: "Survey both ends", text: "Photos of both walls and outdoor positions on WhatsApp; copper length and stands confirmed before the quote." },
      { title: "Pump down and remove", text: "Refrigerant pumped down into the outdoor unit, lines disconnected and capped, units removed without kinking pipes." },
      { title: "Hand over safely", text: "Outdoor unit kept upright and padded, ready for your packers and movers." },
      { title: "Reinstall like new", text: "Fresh flares, vacuum, leak test, a drain with proper fall, and a cooling test at the new place." },
    ],
    included: [
      "Pump-down to keep the refrigerant in the system",
      "Disconnection, capping and removal",
      "Reinstallation with fresh flares",
      "Vacuum, leak test and run test",
      "Drain routing with proper fall",
    ],
    excluded: [
      "Transport between homes (your packers and movers)",
      "Extra copper beyond the standard kit (per metre)",
      "Gas, if the system was already low",
      "Wall patching and painting",
    ],
    prices: [
      { job: "Uninstallation / shifting", from: "On quote", note: "Quoted on WhatsApp from photos of both locations" },
      { job: "Split AC installation", from: "₹1,499", value: 1499, note: "Standard 1–1.5 ton, 3 m copper kit" },
      { job: "Extra copper run", from: "On quote", note: "Per metre, flared and vacuumed" },
      { job: "Gas filling (R32 / R410A)", from: "₹1,799", value: 1799, note: "Only if a leak is found" },
    ],
    faqs: [
      {
        q: "Will my AC need gas after shifting?",
        a: "Not if it is shifted properly. Pumping the refrigerant down into the outdoor unit before removal keeps the charge in the system. Gas is only needed if it was already low or a joint leaks — which the leak test at reinstallation catches.",
      },
      {
        q: "Can the same copper pipes be reused?",
        a: "Often yes, if they are long enough, undamaged and re-flared at both ends. Kinked or too-short pipes are replaced and the extra length is quoted per metre.",
      },
      {
        q: "How much does AC shifting cost?",
        a: "It depends on the AC type, the copper length needed at the new place and access. We quote on WhatsApp from photos of both locations before the visit; standard split installation starts at ₹1,499.",
      },
    ],
    related: ["ac-installation", "ac-gas-filling", "ac-water-leakage-repair"],
  },
  {
    slug: "ac-fan-motor-repair",
    tier: "specialist",
    name: "AC Fan Motor & Blower Repair",
    short: "Fan motor repair",
    icon: "fan",
    price: "On quote",
    blurb:
      "Outdoor fan not spinning, weak airflow indoors, grinding or squealing. Capacitor, motor, bearings or blower wheel — tested, then fixed.",
    metaTitle: "AC Fan Motor Repair & Replacement in Delhi NCR | Frostwright",
    metaDescription:
      "Outdoor fan not spinning or weak airflow indoors? We test the capacitor, motor and blower wheel, then repair or replace with OEM-grade parts. Same-day in Delhi NCR.",
    h1: "AC fan motor & blower repair in Delhi NCR",
    lede: "A stopped outdoor fan is an emergency for the compressor; a slow indoor blower kills cooling quietly. Both are usually quick fixes once someone tests the right part.",
    answer:
      "When an AC’s outdoor fan stops or the indoor airflow drops, Frostwright tests the fan capacitor, the motor windings or DC fan driver, the bearings and the blower wheel before replacing anything. Fixed-speed ACs often need only a capacitor; inverter ACs use DC fan motors driven by the board, so the board is tested too. Repairs are quoted after testing, with a 90-day warranty on the part fitted.",
    photo: "acUnit",
    symptomsTitle: "Fan problems we fix",
    symptoms: [
      { title: "Outdoor fan not spinning", text: "The compressor overheats within minutes — switch off. Usually the capacitor or the motor.", guide: "ac-outdoor-unit-not-working" },
      { title: "Fan spins slowly", text: "A weak capacitor or worn bearings." },
      { title: "Grinding or squealing", text: "Bearings on their way out.", guide: "ac-making-noise" },
      { title: "Weak airflow indoors", text: "A dust-packed blower wheel or a failing indoor motor.", guide: "ac-service-schedule" },
      { title: "Fan error code", text: "Codes such as Daikin A6 / E7 or LG CH10 / CH67 point to the indoor or outdoor fan.", guide: "ac-error-codes" },
      { title: "Wobbling or cracked blade", text: "An unbalanced blade destroys bearings — replace it before the motor goes." },
    ],
    process: [
      { title: "Test before replacing", text: "Capacitor value, winding resistance or DC drive, bearings and blade balance checked." },
      { title: "Quote on WhatsApp", text: "Capacitor, motor, wheel or board — with the reason, before any part is fitted." },
      { title: "Fit the right part", text: "OEM or OEM-grade parts matching speed, rotation and mounting — no universal motor forced to fit." },
      { title: "Run test", text: "Airflow, current and noise checked; then the 90-day warranty starts." },
    ],
    included: [
      "Capacitor and motor testing",
      "Blower wheel and fan blade inspection",
      "OEM or OEM-grade replacement parts",
      "Run test of airflow and current",
      "GST invoice and 90-day warranty",
    ],
    excluded: ["Inverter board replacement if the fan driver has failed (quoted)", "Compressor work"],
    prices: [
      VISIT,
      { job: "Motor or capacitor replacement", from: "On quote", note: "Depends on model; quoted after testing" },
      { job: "Split AC wet service", from: "₹499", value: 499, note: "Cleans a dust-packed blower wheel" },
      { job: "PCB inspection & repair", from: "₹799", value: 799, note: "For inverter fan-drive faults" },
    ],
    faqs: [
      {
        q: "Why is my AC outdoor fan not spinning?",
        a: "Most often a failed fan capacitor on fixed-speed ACs, or a motor or driver fault on inverter ACs. Switch the AC off — running without the outdoor fan overheats the compressor.",
      },
      {
        q: "Can an AC fan motor be repaired?",
        a: "Capacitors and sometimes bearings can be replaced; a motor with burnt windings is replaced. On inverter ACs, the board’s fan driver is tested before the motor is blamed.",
      },
      {
        q: "How much does AC fan motor replacement cost?",
        a: "It depends on the motor type and the model — a capacitor is a small part, a DC motor costs more. We test first and quote on WhatsApp before fitting anything.",
      },
    ],
    related: ["split-ac-repair", "inverter-ac-pcb-repair", "ac-service"],
  },
  {
    slug: "ac-coil-repair",
    tier: "specialist",
    name: "AC Coil Leak Repair & Replacement",
    short: "Coil repair",
    icon: "coil",
    price: "On quote",
    blurb:
      "Gas keeps leaking out? Pinholes in the indoor or outdoor coil are found under nitrogen pressure, then brazed — or the coil is replaced.",
    metaTitle: "AC Coil Leak Repair & Replacement in Delhi NCR | Frostwright",
    metaDescription:
      "AC losing gas every few months? We find coil pinholes with a nitrogen pressure test, then braze or replace the indoor or outdoor coil and recharge by weight.",
    h1: "AC coil leak repair & replacement in Delhi NCR",
    lede: "If your AC needs gas every summer, the leak is often in a coil. Another top-up does not fix it — finding the pinhole does.",
    answer:
      "When an AC keeps losing refrigerant, Frostwright pressurises the system with nitrogen to locate the leak in the indoor (evaporator) or outdoor (condenser) coil. Accessible pinholes and bends can be brazed; a coil with several or hidden leaks is replaced. The system is then vacuumed and recharged by weight. Coil work is quoted after the leak is found; gas filling starts at ₹1,799 for R32 or R410A.",
    photo: "leakTest",
    symptomsTitle: "Signs of a coil leak",
    symptoms: [
      { title: "Needs gas every season", text: "A slow leak somewhere — most often a coil or a flare joint.", guide: "ac-gas-leak-signs" },
      { title: "Oily patch on the coil", text: "Refrigerant carries oil out with it; the stain marks the leak point.", guide: "ac-gas-leak-signs" },
      { title: "Low-refrigerant error code", text: "Daikin U0, LG CH38, Samsung E554 and similar warnings.", guide: "ac-error-codes" },
      { title: "Ice on the coil, weak cooling", text: "Low charge from a leak — or low airflow. Tested before any gas goes in.", guide: "ac-not-cooling" },
      { title: "Bent or damaged coil", text: "Physical damage and age cost both cooling and refrigerant." },
      { title: "Old R22 machine leaking again", text: "Often cheaper to replace the AC than the coil.", guide: "repair-or-replace-ac" },
    ],
    process: [
      { title: "Pressure test with nitrogen", text: "System pressurised and every joint and coil checked with soap solution and an electronic detector." },
      { title: "Repair or replace", text: "Accessible pinholes brazed; coils with several or hidden leaks quoted for replacement — alongside a new-AC comparison when that is the better spend." },
      { title: "Prove the repair", text: "Nitrogen held under pressure to confirm the fix before any refrigerant goes in." },
      { title: "Vacuum and weigh in", text: "Deep vacuum, weighed charge, and the grams written on the invoice." },
    ],
    included: [
      "Nitrogen pressure test and leak location",
      "Brazing of accessible leaks",
      "Pressure-hold test after the repair",
      "Vacuum and weighed charge",
      "Gas type and grams on the invoice",
    ],
    excluded: [
      "Replacement coil (quoted after the leak is found)",
      "Refrigerant (from ₹1,799 for R32 / R410A)",
      "Leaks still covered by the brand’s warranty — claim that first",
    ],
    prices: [
      { job: "Coil brazing or replacement", from: "On quote", note: "After nitrogen leak test" },
      { job: "Gas filling (R32 / R410A)", from: "₹1,799", value: 1799, note: "After the leak is fixed" },
      { job: "Gas filling (R22)", from: "₹2,499", value: 2499, note: "Subject to stock" },
      VISIT,
    ],
    faqs: [
      {
        q: "Can an AC coil leak be repaired?",
        a: "Often, if the pinhole is at an accessible bend or joint — it can be brazed and pressure-tested. Coils with several leaks, or leaks deep inside the fins, are replaced.",
      },
      {
        q: "Why does my AC keep needing gas?",
        a: "Because it is leaking. Refrigerant runs in a sealed loop and is never consumed. Find and fix the leak — often a coil or a flare joint — and the charge lasts.",
      },
      {
        q: "Is coil replacement worth it on an old AC?",
        a: "On a machine more than about ten years old, especially one using R22, a new coil plus gas can approach the price of a new, efficient AC. We quote both.",
      },
    ],
    related: ["ac-gas-filling", "split-ac-repair", "ac-compressor-replacement"],
  },
];
