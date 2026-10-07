import type { Guide } from "./types";

const D = "2026-10-05";

export const TROUBLESHOOTING: Guide[] = [
  {
    slug: "ac-not-cooling",
    cluster: "troubleshooting",
    title: "AC not cooling? 10 common causes and what each costs to fix",
    metaTitle: "AC Not Cooling? 10 Causes & Repair Costs in Delhi NCR (2026)",
    metaDescription:
      "Why your AC runs but does not cool: 10 common causes, five checks you can do yourself, and typical repair costs in Delhi NCR — from a working technician.",
    excerpt:
      "Most ‘not cooling’ calls are not gas. Here are the ten causes we actually find, the five-minute checks to do first, and what each fix costs.",
    answer:
      "An AC that runs but does not cool is most often caused by dirty filters or a clogged coil, a failed outdoor fan capacitor, a refrigerant leak, or a dirty outdoor condenser. Check the mode, set temperature, filters and whether the outdoor fan is spinning first. A wet service (₹449–₹499) fixes the most common cause; gas is only needed if a leak is found.",
    published: D,
    updated: D,
    photo: "living",
    blocks: [
      { t: "h2", id: "quick-checks", text: "Five-minute checks before you call anyone" },
      {
        t: "ol",
        items: [
          "**Mode** — make sure the remote shows Cool (a snowflake), not Fan, Dry or Auto.",
          "**Set temperature** — set 24 °C. If the set point is above room temperature, the compressor will not start.",
          "**Filters** — slide out the mesh filters behind the front panel. If they are grey and furry, rinse them under a tap, dry them in the shade and refit. Our [service schedule guide](/guides/ac-service-schedule) shows how.",
          "**Outdoor unit** — go and look. Is the fan spinning? Humming without spinning? Silent? Each points to a different fault — see [outdoor unit not working](/guides/ac-outdoor-unit-not-working).",
          "**Power** — check the MCB and the stabiliser. A stabiliser in time-delay or low-voltage cut-off will keep the outdoor unit off.",
        ],
      },
      {
        t: "p",
        text: "If those are fine and the room still is not cooling after 20 minutes, one of the causes below is likely.",
      },
      { t: "h2", id: "causes", text: "The 10 causes we actually find" },
      {
        t: "table",
        caption: "Common causes of an AC not cooling, symptoms and typical fixes in Delhi NCR",
        head: ["Cause", "What you notice", "Typical fix", "Starting price"],
        rows: [
          ["Dirty filters and indoor coil", "Weak airflow, musty smell", "Wet service", "₹449–₹499"],
          ["Dirty outdoor condenser", "Cools in the morning, struggles in the afternoon", "Outdoor wash (part of wet service)", "₹449–₹499"],
          ["Failed outdoor fan capacitor", "Outdoor fan not spinning or very slow; unit hums", "Capacitor replacement", "Quoted after inspection"],
          ["Refrigerant leak", "Cooling faded over weeks; frost on the thin pipe", "Leak repair + weighed gas charge", "₹1,799"],
          ["Blocked drain / iced coil", "Water dripping indoors, ice on pipes", "Drain clearing, airflow fix", "₹499"],
          ["Faulty temperature sensor", "Compressor cuts out early or behaves erratically", "Sensor replacement", "Quoted after inspection"],
          ["PCB or inverter board fault", "Error code, outdoor unit not starting", "Board diagnosis and repair", "₹799"],
          ["Indoor blower problem", "Low airflow, noise, burning smell", "Motor or wheel repair", "Quoted after inspection"],
          ["Low voltage", "Struggles at peak hours; stabiliser cuts in", "Stabiliser or wiring check", "Advice"],
          ["Undersized AC or heat load", "Runs non-stop in a top-floor or west-facing room", "Right-sizing advice", "Free advice"],
        ],
      },
      {
        t: "p",
        text: "Prices are Frostwright’s published starting rates. Every visit starts with a ₹199 inspection that is waived if you approve the repair. See the full [price list](/pricing). If the room is simply too big for the machine, our [tonnage guide](/guides/ac-tonnage-guide) explains how to size it.",
      },
      { t: "h2", id: "is-it-gas", text: "Is it really the gas?" },
      {
        t: "p",
        text: "Refrigerant circulates in a sealed loop. It is not burned or used up like petrol. If an AC is low on gas, it has a leak — and topping it up without finding the leak means you will be calling again within weeks. Read the [signs of a real gas leak](/guides/ac-gas-leak-signs).",
      },
      {
        t: "p",
        text: "A dirty coil, a dead outdoor fan and low gas can all produce the same symptom: warm air. The only way to tell them apart is to measure — suction pressure, coil temperature and compressor current. Read more about [how gas filling should be done](/services/ac-gas-filling).",
      },
      {
        t: "callout",
        title: "Red flag",
        text: "Anyone who says ‘gas khatam hai’ without connecting a gauge to the service valve is guessing. Ask them to show you the reading.",
      },
      { t: "h2", id: "when-to-call", text: "When to stop troubleshooting and call" },
      {
        t: "ul",
        items: [
          "The outdoor unit hums but the fan does not spin — a capacitor or motor is failing and the compressor can overheat.",
          "There is ice on the pipes or the indoor coil.",
          "An error code is blinking on the display — see our [AC error codes guide](/guides/ac-error-codes).",
          "The MCB trips when the compressor starts.",
          "You smell burning or see scorch marks near the wiring — switch off at the MCB. See [AC smells](/guides/ac-bad-smell).",
          "Someone elderly, an infant or anyone unwell is in a room that is heating up fast — use [emergency AC repair](/services/emergency-ac-repair).",
        ],
      },
      { t: "h2", id: "what-to-send", text: "What to send when you book" },
      {
        t: "ul",
        items: [
          "Brand, tonnage and approximate age of the AC",
          "A photo of the model sticker (indoor and outdoor unit)",
          "Any error code on the display",
          "What changed: power cut, recent service, storm, first start of the season",
          "Your area and a landmark",
        ],
      },
      {
        t: "p",
        text: "Send it on WhatsApp and you get a slot, a technician’s name and an honest arrival window. See [split AC repair](/services/split-ac-repair) for what the visit includes.",
      },
    ],
    faqs: [
      {
        q: "Why is my AC running but not cooling?",
        a: "The most common causes are dirty filters or coil, a dirty outdoor condenser, a failed outdoor fan capacitor and a refrigerant leak. Check the mode, the set temperature, the filters and whether the outdoor fan is spinning before calling a technician.",
      },
      {
        q: "How much does it cost to fix an AC that is not cooling in Delhi?",
        a: "At Frostwright, a wet service that fixes the most common cause costs ₹449 (window) to ₹499 (split). Gas filling after a leak test starts at ₹1,799 for R32/R410A, and PCB repair starts at ₹799. The ₹199 inspection is waived if you approve the repair.",
      },
      {
        q: "Does an AC need gas every year?",
        a: "No. Refrigerant is not consumed. If the gas is low, there is a leak that needs to be found and fixed before recharging.",
      },
    ],
    related: ["ac-service", "split-ac-repair", "ac-gas-filling", "emergency-ac-repair"],
    relatedGuides: ["ac-outdoor-unit-not-working", "ac-gas-leak-signs", "ac-error-codes"],
  },
  {
    slug: "ac-water-leakage",
    cluster: "troubleshooting",
    title: "AC leaking water inside the room? 7 causes and how to fix them",
    metaTitle: "AC Water Leakage From Indoor Unit — 7 Causes & Fixes | Frostwright",
    metaDescription:
      "Water dripping from your AC indoors? The 7 usual causes — blocked drain, frozen coil, bad slope, torn insulation — what to check and what repair costs.",
    excerpt:
      "Dripping indoor unit? It is almost never the gas. Here is what is actually happening, what you can check safely, and what the fix costs.",
    answer:
      "Water leaking from an AC’s indoor unit is usually caused by a blocked drain pipe or tray, dirty filters that let the coil freeze and then overflow, a drain line without enough downward slope, or torn insulation that makes the cold pipe sweat. Switch the AC off, clean the filters and check the drain outlet outside. Most leak repairs start at ₹499 in Delhi NCR.",
    published: D,
    updated: D,
    photo: "workshop",
    blocks: [
      { t: "h2", id: "why", text: "Why an AC makes water at all" },
      {
        t: "p",
        text: "Cooling pulls moisture out of the air. It condenses on the cold indoor coil, drips into a tray and runs outside through a drain pipe. In a humid Delhi monsoon a 1.5-ton split can produce several litres a day. A leak indoors means that water is not getting out — something is blocked, broken or tilted.",
      },
      { t: "h2", id: "causes", text: "The 7 usual causes" },
      {
        t: "table",
        caption: "Causes of AC water leakage indoors and typical fixes",
        head: ["Cause", "Clue", "Fix"],
        rows: [
          ["Blocked drain pipe", "Steady drip from under the indoor unit; nothing coming out of the outside pipe", "Flush or blow out the drain line"],
          ["Dirty tray / algae", "Musty smell, slimy water", "Wet service — tray and line cleaned"],
          ["Dirty filters → frozen coil", "Ice on the coil; leak starts after the AC switches off", "Clean filters; wet service"],
          ["Drain without fall", "Leak since installation, or after the unit was moved", "Re-route the drain with a steady downward slope"],
          ["Indoor unit not level", "Water runs out of one end of the unit", "Re-level the mounting plate"],
          ["Torn pipe insulation", "Droplets on the wall below the pipes", "Re-insulate the suction line"],
          ["Low refrigerant", "Ice on the thin pipe, weak cooling", "Leak repair and recharge — see [gas leak signs](/guides/ac-gas-leak-signs)"],
        ],
      },
      { t: "h2", id: "check", text: "What you can safely check" },
      {
        t: "ol",
        items: [
          "Switch the AC off and keep water away from the electrics and the socket.",
          "Clean the filters — a choked filter is the single most common trigger.",
          "Find the drain pipe outside. If it drips while the AC runs, the line is at least partly clear; if it is dry, the blockage is inside.",
          "Look along the pipe run for sagging sections or kinks.",
          "For a window AC, check that the unit tilts slightly backwards, towards the outside.",
        ],
      },
      {
        t: "callout",
        title: "Do not poke wire into the drain",
        text: "Pushing a wire up the drain line from outside can puncture it or the tray. Flushing and blowing out the line is the safe way.",
      },
      { t: "h2", id: "outside", text: "Water outside is normal" },
      {
        t: "p",
        text: "Water dripping from the drain pipe outside while the AC is cooling is exactly what should happen. Worry only if it falls on a neighbour’s balcony — that is a routing problem, not a fault.",
      },
      { t: "h2", id: "cost", text: "What it costs" },
      {
        t: "p",
        text: "[Water leakage repairs](/services/ac-water-leakage-repair) — drain and insulation — start at ₹499, and a full [wet service](/services/ac-service) — which cleans the tray and line — is ₹499 for a split AC and ₹449 for a window AC. If the leak comes from a frozen coil caused by low refrigerant, the gas repair is quoted after a leak test. See [split AC repair](/services/split-ac-repair) or [window AC repair](/services/window-ac-repair).",
      },
    ],
    faqs: [
      {
        q: "Why is water dripping from my split AC indoor unit?",
        a: "Most often a blocked drain pipe or tray, dirty filters that let the coil freeze and overflow, a drain line without enough slope, or torn insulation on the cold pipe. Switch the AC off and clean the filters first.",
      },
      {
        q: "Is AC water leakage dangerous?",
        a: "It can be. Water near the indoor unit’s electrics or the wall socket is a shock and short-circuit risk, and it damages walls and furniture. Switch off and get it fixed.",
      },
      {
        q: "How much does AC water leakage repair cost in Delhi?",
        a: "At Frostwright, drain and insulation repairs start at ₹499. A wet service that cleans the tray and drain line is ₹449–₹499.",
      },
    ],
    related: ["ac-water-leakage-repair", "ac-service", "split-ac-repair", "window-ac-repair"],
    relatedGuides: ["ac-bad-smell", "ac-service-schedule", "ac-not-cooling"],
  },
  {
    slug: "ac-outdoor-unit-not-working",
    cluster: "troubleshooting",
    title: "AC outdoor unit not starting? Causes, safe checks and fixes",
    metaTitle: "AC Outdoor Unit Not Working or Fan Not Spinning — Causes & Fixes",
    metaDescription:
      "Indoor unit blowing but the outdoor unit is silent, humming or its fan will not spin? The usual causes — delay timers, capacitor, contactor, board — and what to do.",
    excerpt:
      "Indoor unit on, outdoor unit silent — or humming without spinning. What each symptom means and what is safe to check.",
    answer:
      "If the indoor unit runs but the outdoor unit does not start, first wait three to five minutes — most ACs and stabilisers have a restart delay. If it still does not start, common causes are a tripped outdoor MCB, a stabiliser cutting out on low voltage, a failed capacitor or contactor, or an inverter board or communication fault. A unit that hums without its fan spinning should be switched off to protect the compressor.",
    published: D,
    updated: D,
    photo: "acUnit",
    blocks: [
      { t: "h2", id: "wait", text: "First: wait five minutes" },
      {
        t: "p",
        text: "Most ACs protect the compressor with a restart delay of around three minutes after being switched on or after a power cut, and most AC stabilisers add their own time delay. A silent outdoor unit for the first few minutes is normal.",
      },
      { t: "h2", id: "symptoms", text: "What the outdoor unit is telling you" },
      {
        t: "table",
        caption: "Outdoor unit symptoms and their likely causes",
        head: ["Symptom", "Likely cause", "Urgency"],
        rows: [
          ["Completely silent", "No power to the outdoor unit, stabiliser cut-off, communication or board fault", "Check power; then book"],
          ["Hums, fan does not spin", "Failed fan capacitor or fan motor", "Switch off now — the compressor can overheat"],
          ["Fan spins, compressor does not start", "Compressor capacitor, contactor, overload or inverter drive", "Book a technician"],
          ["Starts, then stops after a few minutes", "Overheating, low gas, dirty condenser, or a protection trip", "Book a technician"],
          ["Error code on indoor display", "The board has diagnosed something — see [error codes](/guides/ac-error-codes)", "Note the code, then book"],
        ],
      },
      { t: "h2", id: "checks", text: "Safe checks" },
      {
        t: "ul",
        items: [
          "Mode is Cool and the set temperature is below room temperature.",
          "The AC’s MCB — and any separate outdoor-unit isolator — is on.",
          "The stabiliser display shows normal voltage and is not in delay or cut-off.",
          "Nothing is blocking the outdoor fan: leaves, plastic sheets, bird nests.",
        ],
      },
      {
        t: "callout",
        title: "Do not open the outdoor unit",
        text: "Capacitors store a charge even after power is off, and inverter boards carry high DC voltage. Leave the panels to a technician.",
      },
      { t: "h2", id: "causes", text: "The common faults behind it" },
      {
        t: "p",
        text: "**Capacitors** are the most common failure in fixed-speed ACs, especially after a Delhi summer — cheap to replace and usually a same-visit fix (see [fan motor repair](/services/ac-fan-motor-repair)). A compressor is only condemned after its start parts and windings are tested — see [compressor repair & replacement](/services/ac-compressor-replacement). **Contactors** pit and stick. **Inverter ACs** have no start capacitor for the compressor; there the culprit is more often the outdoor board, a sensor, or the cable between indoor and outdoor units — see [inverter & PCB repair](/services/inverter-ac-pcb-repair).",
      },
      {
        t: "p",
        text: "If the unit died right after a power cut or a society generator changeover, a voltage spike may have damaged the board — our [stabiliser guide](/guides/ac-stabilizer-guide) explains how to prevent a repeat.",
      },
    ],
    faqs: [
      {
        q: "Why is my AC indoor unit running but the outdoor unit not?",
        a: "After waiting a few minutes for the restart delay, the usual causes are no power to the outdoor unit, a stabiliser in cut-off, a failed capacitor or contactor, or a board or communication fault on inverter ACs.",
      },
      {
        q: "My AC outdoor fan is not spinning but the unit hums. What should I do?",
        a: "Switch the AC off. A humming unit with a stopped fan usually has a failed fan capacitor or motor, and running it can overheat the compressor. It is typically a quick repair.",
      },
    ],
    related: ["ac-fan-motor-repair", "ac-compressor-replacement", "split-ac-repair", "inverter-ac-pcb-repair"],
    relatedGuides: ["ac-error-codes", "ac-stabilizer-guide", "ac-not-cooling"],
  },
  {
    slug: "ac-making-noise",
    cluster: "troubleshooting",
    title: "AC making noise? What rattling, buzzing, hissing and clicking mean",
    metaTitle: "AC Making Noise? Rattling, Buzzing, Hissing Sounds Explained",
    metaDescription:
      "What each AC noise means — rattling, buzzing, hissing, gurgling, grinding, clicking — which are normal, which need a technician, and which mean switch off now.",
    excerpt:
      "Some AC sounds are normal. Some mean a ₹200 fix. A few mean switch it off now. Here is how to tell them apart.",
    answer:
      "Short clicks at start and stop, soft gurgling and brief hissing are normal AC sounds. Rattling usually means loose panels or debris; buzzing points to electrical parts such as a capacitor or contactor; grinding or squealing means worn fan-motor bearings; and constant hissing can mean a refrigerant leak. Humming with no fan movement, or grinding, means switch off and book a technician.",
    published: D,
    updated: D,
    photo: "outdoor",
    blocks: [
      { t: "h2", id: "sounds", text: "The sound map" },
      {
        t: "table",
        caption: "Air conditioner noises and what they usually mean",
        head: ["Sound", "Usually means", "Action"],
        rows: [
          ["Click at start / stop", "Relay or contactor switching — normal", "None"],
          ["Ticking or cracking at start", "Plastic panels expanding or contracting — normal", "None"],
          ["Soft gurgling", "Water in the drain or refrigerant flow — normal", "None, unless water leaks"],
          ["Rattling", "Loose screws, panels, debris, or a loose outdoor stand", "Tighten / clear; book if it persists"],
          ["Buzzing", "Electrical: capacitor, contactor, loose wiring", "Book a technician"],
          ["Humming, fan not moving", "Failed capacitor or seized fan motor", "Switch off now"],
          ["Squealing or grinding", "Worn fan-motor bearings", "Switch off; book a technician"],
          ["Constant hissing", "Possible refrigerant leak", "Book a leak test"],
          ["Banging or clanking", "Loose or broken fan blade, compressor mount", "Switch off now"],
          ["Repeated clicking, no start", "Control or relay fault", "Book a technician"],
        ],
      },
      { t: "h2", id: "indoor-vs-outdoor", text: "Indoor or outdoor?" },
      {
        t: "p",
        text: "Indoor noises are usually the blower wheel (dust build-up throws it off balance), the swing motor, or the front panel. Outdoor noises are usually the fan, the compressor mounts, the stand, or loose sheet metal. A dusty blower wheel is cleaned in a [wet service](/services/ac-service); worn motors and bearings are a [fan motor repair](/services/ac-fan-motor-repair), and loose mounts a [general repair](/services/split-ac-repair).",
      },
      { t: "h2", id: "stand", text: "Rattles from the outdoor stand" },
      {
        t: "p",
        text: "In Delhi NCR a lot of noise complaints are the outdoor stand, not the AC — rusted brackets, missing anti-vibration pads, or a unit that was never bolted down. That is a safety problem as well as a noise problem on a high floor. Our [installation checklist](/guides/ac-installation-checklist) shows what a proper mount looks like.",
      },
      {
        t: "callout",
        title: "Hissing plus fading cooling",
        text: "A hiss together with gradually weaker cooling is a strong leak signal. Read the [signs of a gas leak](/guides/ac-gas-leak-signs) before anyone offers a top-up.",
      },
    ],
    faqs: [
      {
        q: "Is it normal for an AC to make noise?",
        a: "Some sounds are normal: a click when it starts or stops, ticking as plastic expands, and soft gurgling from water or refrigerant. Buzzing, grinding, squealing, banging or constant hissing are not.",
      },
      {
        q: "Why is my AC outdoor unit rattling?",
        a: "Usually loose panels or screws, debris in the fan, a worn fan motor, or a loose or rusted outdoor stand without anti-vibration pads.",
      },
    ],
    related: ["ac-fan-motor-repair", "split-ac-repair", "window-ac-repair", "ac-service"],
    relatedGuides: ["ac-outdoor-unit-not-working", "ac-installation-checklist", "ac-gas-leak-signs"],
  },
  {
    slug: "ac-bad-smell",
    cluster: "troubleshooting",
    title: "Why does my AC smell? Musty, burning and rotten smells explained",
    metaTitle: "AC Smells Bad? Musty, Burning or Rotten Smell — Causes & Fixes",
    metaDescription:
      "What a musty, burning, sour or rotten smell from your AC means, which ones are dangerous, and how a proper wet service and good habits stop it coming back.",
    excerpt:
      "A musty AC is a dirty AC. A burning smell is an emergency. Here is the difference — and how to stop the smell coming back after every monsoon.",
    answer:
      "A musty or sour smell from an AC is almost always mould and bacteria on a damp coil, drain tray or filter — fixed by a foam-and-jet wet service. A burning or electrical smell means switch off at the MCB immediately and call a technician. A rotten smell often means a dead lizard or rodent inside the unit. Running the fan for a few minutes after cooling helps keep the coil dry.",
    published: D,
    updated: D,
    photo: "living",
    blocks: [
      { t: "h2", id: "smells", text: "What each smell means" },
      {
        t: "table",
        caption: "AC smells, their usual causes and what to do",
        head: ["Smell", "Usual cause", "What to do"],
        rows: [
          ["Musty, damp, ‘old socks’", "Mould and bacteria on the coil, tray or filters", "Clean filters; book a wet service"],
          ["Sour or vinegary", "Mould in the drain tray, sometimes stagnant water", "Wet service with drain flush"],
          ["Burning or hot plastic", "Overheating wiring, motor or board", "Switch off at the MCB now; call"],
          ["Rotten or dead-animal", "A lizard, rat or bird inside the unit", "Switch off; technician to remove and sanitise"],
          ["Smoky or outdoor-like", "Outside air drawn in through gaps, or smoke near the outdoor unit", "Seal gaps around the pipe hole"],
        ],
      },
      {
        t: "callout",
        title: "Burning smell = switch off",
        text: "Do not wait for it to ‘go away’. Switch off at the MCB, not just the remote, and do not run the AC again until it has been checked.",
      },
      { t: "h2", id: "monsoon", text: "Why it gets worse after the monsoon" },
      {
        t: "p",
        text: "Delhi NCR’s humid months keep the coil and drain tray wet for weeks. Dust on the coil feeds mould, and the smell arrives with the first cold blast every morning. A post-monsoon wet service in September–October clears it — see the [seasonal service schedule](/guides/ac-service-schedule).",
      },
      { t: "h2", id: "prevent", text: "How to keep it from coming back" },
      {
        t: "ul",
        items: [
          "Rinse the filters every two weeks in summer.",
          "After cooling, run the AC in Fan mode for a few minutes to dry the coil — many newer ACs have an auto-clean or self-dry setting that does this for you.",
          "Book a [wet service](/services/ac-service) twice a year; a dry wipe does not reach the coil fins or the tray.",
          "Make sure the drain is flowing — standing water in the tray is where the sour smell starts. See [water leakage](/guides/ac-water-leakage).",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my AC smell musty when it starts?",
        a: "Mould and bacteria grow on a damp, dusty coil and drain tray, especially after the monsoon. A foam-and-jet wet service removes it; cleaning filters regularly and drying the coil in Fan mode keeps it away.",
      },
      {
        q: "Is a burning smell from an AC dangerous?",
        a: "Yes. It usually means wiring, a motor or a board is overheating. Switch off at the MCB and have it checked before using the AC again.",
      },
    ],
    related: ["ac-service", "split-ac-repair", "emergency-ac-repair", "ac-amc"],
    relatedGuides: ["ac-water-leakage", "ac-service-schedule", "ac-making-noise"],
  },
  {
    slug: "ac-error-codes",
    cluster: "troubleshooting",
    title: "AC error codes explained: Daikin, LG, Samsung and what to do next",
    metaTitle: "AC Error Codes Explained — Daikin, LG, Samsung (U4, CH05, E101…)",
    metaDescription:
      "What common split AC error codes mean — Daikin U4, A5, E7, LG CH05, CH38, Samsung E101, E554 — what you can safely try yourself, and when to call a technician.",
    excerpt:
      "What the most common Daikin, LG and Samsung error codes mean, what you can safely try, and when the code means ‘call someone’.",
    answer:
      "An AC error code is the unit’s self-diagnosis. Communication errors (Daikin U4, LG CH05, Samsung E101) mean the indoor and outdoor units are not talking — often wiring, power or a board fault. Sensor codes are usually cheap fixes. Low-refrigerant codes (Daikin U0, LG CH38, Samsung E554) mean a leak. Switch off at the MCB for five minutes; if the code returns, book a technician.",
    published: D,
    updated: D,
    photo: "display",
    blocks: [
      {
        t: "callout",
        title: "Codes are model-specific",
        text: "The meanings below are the commonly documented ones for each brand’s split and inverter ranges. Codes can differ between series and years, so your owner’s manual is the final word — or send us a photo of the display and the model sticker.",
      },
      { t: "h2", id: "first", text: "First, try a safe reset" },
      {
        t: "ol",
        items: [
          "Switch the AC off with the remote.",
          "Switch it off at the MCB or wall switch and wait five minutes so the boards fully discharge.",
          "Switch on and run in Cool mode for 15 minutes.",
          "If the same code returns, note it down and book a technician. Do not open covers — capacitors inside can hold a dangerous charge.",
        ],
      },
      { t: "h2", id: "daikin", text: "Daikin error codes" },
      {
        t: "table",
        caption: "Common Daikin split and inverter AC error codes",
        head: ["Code", "Meaning", "Usual cause"],
        rows: [
          ["U4", "Indoor–outdoor communication error", "Wiring, power to outdoor unit, or a board fault"],
          ["U0", "Refrigerant shortage", "Gas leak — needs leak test before charging"],
          ["A1", "Indoor PCB fault", "Indoor board failure"],
          ["A5", "Freeze-up / high-pressure protection", "Dirty coil, low airflow, or blocked filters"],
          ["A6", "Indoor fan motor fault", "Blower motor or its connection"],
          ["C4 / C9", "Indoor coil / room temperature sensor fault", "Thermistor or its connector"],
          ["E5 / E6", "Compressor overload / lock", "Overheating, low gas, or compressor start fault"],
          ["E7", "Outdoor fan motor fault", "Outdoor fan motor or obstruction"],
          ["F3", "Discharge pipe temperature too high", "Low gas or blocked condenser airflow"],
          ["L5", "Compressor overcurrent", "Inverter drive (IPM) or compressor fault"],
        ],
      },
      { t: "p", text: "Need a technician for a Daikin? See [Daikin AC repair in Delhi NCR](/brands/daikin-ac-repair)." },
      { t: "h2", id: "lg", text: "LG error codes" },
      {
        t: "table",
        caption: "Common LG split and inverter AC error codes",
        head: ["Code", "Meaning", "Usual cause"],
        rows: [
          ["CH01", "Indoor room temperature sensor error", "Sensor or connector"],
          ["CH02", "Indoor pipe temperature sensor error", "Sensor or connector"],
          ["CH05", "Indoor–outdoor communication error", "Wiring, power or board fault"],
          ["CH10", "Indoor fan motor lock", "Blower motor or obstruction"],
          ["CH21", "DC peak / inverter module fault", "Inverter drive or compressor"],
          ["CH38", "Low refrigerant / leak detected", "Gas leak — needs leak test"],
          ["CH61", "Outdoor condenser temperature too high", "Blocked condenser or poor airflow"],
          ["CH67", "Outdoor fan motor lock", "Outdoor fan motor or obstruction"],
        ],
      },
      { t: "p", text: "More on LG faults in [LG AC repair in Delhi NCR](/brands/lg-ac-repair)." },
      { t: "h2", id: "samsung", text: "Samsung error codes" },
      {
        t: "table",
        caption: "Common Samsung split and inverter AC error codes",
        head: ["Code", "Meaning", "Usual cause"],
        rows: [
          ["E101", "Indoor–outdoor communication error", "Wiring, power or board fault"],
          ["E121", "Indoor room temperature sensor error", "Sensor or connector"],
          ["E122", "Indoor coil (evaporator) sensor error", "Sensor or connector"],
          ["E154", "Indoor fan error", "Blower motor or its circuit"],
          ["E554", "Refrigerant leak detected", "Gas leak — needs leak test"],
        ],
      },
      { t: "p", text: "More on Samsung faults in [Samsung AC repair in Delhi NCR](/brands/samsung-ac-repair)." },
      { t: "h2", id: "other-brands", text: "Voltas, Lloyd, Blue Star and others" },
      {
        t: "p",
        text: "Many Indian-market brands use short ‘E’ or ‘F’ codes that change meaning between series — an E5 on one Voltas model is not the same as an E5 on another. Check the manual for your exact model, or send us a photo of the display and the model sticker on WhatsApp and we will tell you what it means. See [Voltas AC repair](/brands/voltas-ac-repair) or all [brands we service](/brands).",
      },
      { t: "h2", id: "patterns", text: "What the code families usually mean" },
      {
        t: "ul",
        items: [
          "**Communication errors** — the indoor and outdoor units have lost contact. Often a loose or damaged interconnecting cable, no power at the outdoor unit, or a board fault. See [inverter & PCB repair](/services/inverter-ac-pcb-repair).",
          "**Sensor errors** — a thermistor or its connector has failed. Usually one of the cheaper fixes.",
          "**Fan motor errors** — indoor or outdoor fan locked or not reaching speed. See [outdoor unit not working](/guides/ac-outdoor-unit-not-working).",
          "**Refrigerant codes** — the system has detected low charge, which means a leak. See [signs of a gas leak](/guides/ac-gas-leak-signs) and [gas filling](/services/ac-gas-filling).",
          "**Compressor / inverter drive errors** — overcurrent, overheating or start failures. Needs proper diagnosis before any part is replaced. Repeated board faults after power cuts? Read the [stabiliser guide](/guides/ac-stabilizer-guide).",
        ],
      },
    ],
    faqs: [
      {
        q: "What does U4 mean on a Daikin AC?",
        a: "U4 is a communication error between the indoor and outdoor units. Common causes are a damaged interconnecting cable, no power reaching the outdoor unit, or an indoor or outdoor board fault.",
      },
      {
        q: "What does CH05 mean on an LG AC?",
        a: "CH05 is a communication error between the indoor and outdoor units, usually caused by wiring, power supply or a board fault.",
      },
      {
        q: "Can I reset an AC error code myself?",
        a: "Yes — switch off at the MCB for five minutes and restart. If the same code comes back, the fault is real and needs a technician. Do not open the covers, as capacitors can hold a dangerous charge.",
      },
    ],
    related: ["inverter-ac-pcb-repair", "split-ac-repair", "ac-gas-filling"],
    relatedGuides: ["ac-outdoor-unit-not-working", "ac-stabilizer-guide", "ac-gas-leak-signs"],
  },
];
