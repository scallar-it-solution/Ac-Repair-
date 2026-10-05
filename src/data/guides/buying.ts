import type { Guide } from "./types";

const D = "2026-10-05";

export const BUYING: Guide[] = [
  {
    slug: "ac-tonnage-guide",
    cluster: "buying",
    title: "What size AC do you need? A tonnage chart for Delhi NCR rooms",
    metaTitle: "Which Tonnage AC for My Room? Size Chart for Delhi NCR Heat",
    metaDescription:
      "How to choose between a 1, 1.5 and 2 ton AC for Delhi NCR: a room-size chart adjusted for top floors and west-facing rooms, and why too big is as bad as too small.",
    excerpt:
      "A room-size chart adjusted for Delhi’s heat, the factors that push you up a size, and why an oversized AC is not the safe choice.",
    answer:
      "As a rule of thumb for Delhi NCR: up to about 120 sq ft needs a 1 ton AC, 120–180 sq ft a 1.5 ton, 180–250 sq ft a 1.5–2 ton, and 250–350 sq ft a 2 ton. Go one step up for top-floor, west-facing or sun-exposed rooms, kitchens nearby or more than three people. One ton of cooling equals 12,000 BTU per hour, or about 3.5 kW.",
    published: D,
    updated: D,
    photo: "living",
    blocks: [
      { t: "h2", id: "chart", text: "The size chart" },
      {
        t: "table",
        caption: "Rule-of-thumb AC tonnage by room size for Delhi NCR (ceiling height around 10 ft)",
        head: ["Room size", "Normal room", "Top floor, west-facing or very sunny"],
        rows: [
          ["Up to 120 sq ft", "1 ton", "1.5 ton"],
          ["120–180 sq ft", "1.5 ton", "1.5–2 ton"],
          ["180–250 sq ft", "1.5–2 ton", "2 ton"],
          ["250–350 sq ft", "2 ton", "2 ton+ or two units"],
          ["Above 350 sq ft / open-plan", "Two units, cassette or ductable", "Site survey"],
        ],
      },
      {
        t: "p",
        text: "A ‘ton’ is cooling capacity, not weight: 1 ton = 12,000 BTU per hour ≈ 3.5 kW of heat removed. These are rules of thumb — Delhi’s 45 °C afternoons are harsher than the average-climate charts printed on most boxes.",
      },
      { t: "h2", id: "step-up", text: "When to go one size up" },
      {
        t: "ul",
        items: [
          "Top-floor flats and rooms under a terrace — the roof is the biggest heat source in a Delhi summer.",
          "West or south-facing glass with afternoon sun.",
          "Ceilings well above 10 feet.",
          "Kitchen, server rack or lots of electronics in or next to the room.",
          "More than three people using the room regularly.",
        ],
      },
      { t: "h2", id: "oversize", text: "Why bigger is not always safer" },
      {
        t: "p",
        text: "An oversized fixed-speed AC cools the air too fast, switches off before it has pulled moisture out, and leaves the room cold but clammy — while the frequent starts wear the compressor. An undersized AC never switches off and struggles every afternoon. Inverter ACs handle a slightly oversized room better because they slow down instead of switching off — see [inverter vs non-inverter](/guides/inverter-vs-non-inverter-ac).",
      },
      {
        t: "callout",
        title: "Already have an AC that ‘never cools enough’?",
        text: "Before upgrading, rule out the fixable causes in [AC not cooling](/guides/ac-not-cooling) — a dirty condenser can make a correctly sized AC look undersized.",
      },
      {
        t: "p",
        text: "Bought the right size? Make sure it is fitted properly — read the [installation checklist](/guides/ac-installation-checklist) or book [AC installation](/services/ac-installation).",
      },
    ],
    faqs: [
      {
        q: "Which tonnage AC is best for a 150 sq ft room in Delhi?",
        a: "A 1.5 ton AC for most 150 sq ft rooms in Delhi NCR. A well-shaded, lower-floor room may manage with 1 ton; a top-floor or west-facing room should have 1.5 ton at least.",
      },
      {
        q: "What does 1 ton mean in an AC?",
        a: "Cooling capacity. One ton removes about 12,000 BTU of heat per hour, roughly 3.5 kW.",
      },
      {
        q: "Is a bigger AC better?",
        a: "No. An oversized fixed-speed AC short-cycles, leaves the room clammy and wears the compressor faster. Choose the size the room needs, stepping up one size only for hot rooms.",
      },
    ],
    related: ["ac-installation", "split-ac-repair"],
    relatedGuides: ["inverter-vs-non-inverter-ac", "ac-installation-checklist", "reduce-ac-electricity-bill"],
  },
  {
    slug: "inverter-vs-non-inverter-ac",
    cluster: "buying",
    title: "Inverter vs non-inverter AC: running cost, repairs and which to buy",
    metaTitle: "Inverter vs Non-Inverter AC — Power Bills, Repairs & Which to Buy",
    metaDescription:
      "How inverter and fixed-speed ACs differ in power use, comfort, repair costs and voltage sensitivity — and which makes sense for your room in Delhi NCR.",
    excerpt:
      "Inverters save power when run for long hours, but their boards cost more to repair. Here is how to weigh it for your use.",
    answer:
      "An inverter AC varies its compressor speed instead of switching on and off, so it uses less electricity when it runs for long hours and holds a steadier temperature. A non-inverter (fixed-speed) AC is cheaper to buy and its common faults — capacitors, contactors — are cheaper to fix, but it costs more to run daily. For rooms cooled more than a few hours a day in Delhi NCR, an inverter usually wins; compare the annual kWh on the BEE star label.",
    published: D,
    updated: D,
    photo: "pcb",
    blocks: [
      { t: "h2", id: "how", text: "How they differ" },
      {
        t: "p",
        text: "A **fixed-speed** compressor runs at full power until the room hits the set temperature, switches off, and restarts when it warms up. An **inverter** compressor slows down as the room approaches the set point and keeps running gently, avoiding repeated full-power starts.",
      },
      {
        t: "table",
        caption: "Inverter vs non-inverter AC compared",
        head: ["", "Inverter", "Non-inverter (fixed-speed)"],
        rows: [
          ["Electricity for long daily use", "Lower", "Higher"],
          ["Temperature stability", "Steady", "Swings as it cycles"],
          ["Purchase price", "Higher", "Lower"],
          ["Common repairs", "PCBs, sensors, inverter drive", "Capacitors, contactors, relays"],
          ["Typical repair cost", "Higher (boards)", "Lower"],
          ["Sensitivity to voltage spikes", "Boards are vulnerable", "Motors and capacitors stressed by low voltage"],
          ["Best for", "Bedrooms, WFH rooms, long hours", "Occasional or short use"],
        ],
      },
      { t: "h2", id: "label", text: "Read the BEE star label, not the brochure" },
      {
        t: "p",
        text: "In India, AC efficiency is rated by the Bureau of Energy Efficiency using ISEER, and the star label shows estimated annual electricity use in kWh. Comparing that number between two models is more useful than any ‘saves up to 60%’ claim. More ways to save in [how to cut your AC bill](/guides/reduce-ac-electricity-bill).",
      },
      { t: "h2", id: "repairs", text: "What repairs look like" },
      {
        t: "p",
        text: "Inverter faults show up as error codes — see the [error codes guide](/guides/ac-error-codes) — and the usual culprits are sensors, the indoor or outdoor board, or the compressor drive. Many boards can be repaired at component level instead of replaced; that is what our [inverter & PCB repair](/services/inverter-ac-pcb-repair) does. Fixed-speed faults are usually electrical parts covered under [split AC repair](/services/split-ac-repair).",
      },
      {
        t: "callout",
        title: "Protect the board",
        text: "Most inverter board failures we see in Delhi NCR follow power cuts and generator changeovers. Read [does your AC need a stabiliser?](/guides/ac-stabilizer-guide)",
      },
    ],
    faqs: [
      {
        q: "Does an inverter AC really save electricity?",
        a: "Yes, when it runs for long hours — it avoids repeated full-power starts and slows down near the set temperature. For a few hours of occasional use the saving is smaller. Compare the annual kWh on the BEE star label.",
      },
      {
        q: "Are inverter ACs more expensive to repair?",
        a: "Usually, because their faults tend to involve circuit boards. Many boards can be repaired at component level, which costs much less than replacement.",
      },
    ],
    related: ["inverter-ac-pcb-repair", "ac-installation", "split-ac-repair"],
    relatedGuides: ["ac-stabilizer-guide", "ac-tonnage-guide", "repair-or-replace-ac"],
  },
  {
    slug: "ac-stabilizer-guide",
    cluster: "buying",
    title: "Does your AC need a stabiliser? Voltage, power cuts and inverter boards",
    metaTitle: "Does My AC Need a Stabilizer? Inverter AC & Voltage Guide (Delhi NCR)",
    metaDescription:
      "When an AC stabiliser is worth it in Delhi NCR, what inverter ACs handle on their own, how power cuts damage boards, and how to choose one.",
    excerpt:
      "Inverter ACs claim they do not need one. Delhi NCR’s power cuts and generator changeovers disagree. Here is how to decide.",
    answer:
      "Fixed-speed ACs generally need a stabiliser wherever voltage fluctuates. Many inverter ACs are built to run across a wide voltage range and makers often say a stabiliser is not required — but in Delhi NCR homes with frequent dips, power cuts or society generator changeovers, a correctly rated stabiliser or surge protector is inexpensive insurance for an inverter board that costs several thousand rupees to replace.",
    published: D,
    updated: D,
    photo: "bench",
    blocks: [
      { t: "h2", id: "what", text: "What a stabiliser does" },
      {
        t: "p",
        text: "It holds the voltage reaching the AC within a safe band when the mains sags or rises, cuts the AC off if voltage goes outside that band, and adds a restart delay after power returns so the compressor does not start against high pressure.",
      },
      { t: "h2", id: "decide", text: "Do you need one?" },
      {
        t: "table",
        caption: "When an AC stabiliser is worth it",
        head: ["Situation", "Recommendation"],
        rows: [
          ["Fixed-speed (non-inverter) AC, any fluctuation", "Yes"],
          ["Inverter AC, stable supply, rare cuts", "Usually not — check the manual’s voltage range"],
          ["Inverter AC, frequent dips or power cuts", "Recommended"],
          ["Society with generator (DG) changeover", "Recommended, plus surge protection"],
          ["Lights dim when the AC starts", "Get the wiring checked; use a stabiliser"],
          ["Board already failed once after a power cut", "Yes — before the replacement board goes in"],
        ],
      },
      { t: "h2", id: "spikes", text: "Spikes are the real board killers" },
      {
        t: "p",
        text: "Inverter boards tolerate slow sags well. What damages them is a sharp spike — when power returns after a cut, or when a society switches between grid and generator. That is why we see board failures cluster after storms and outages in Gurugram and Noida societies. A stabiliser with a time delay, plus surge protection at the board, addresses both. If a board has already failed, our [PCB repair](/services/inverter-ac-pcb-repair) tests it before anything is replaced.",
      },
      { t: "h2", id: "choose", text: "How to choose one" },
      {
        t: "ul",
        items: [
          "Match the stabiliser to the AC’s tonnage and type as specified by the stabiliser maker.",
          "Check its working input voltage range against what your area actually sees.",
          "Look for a time-delay feature and high/low voltage cut-off.",
          "Mount it on the wall near the AC socket with ventilation around it.",
          "Read your AC’s manual — some makers specify whether a stabiliser should be used.",
        ],
      },
      {
        t: "callout",
        title: "Not a fix for bad wiring",
        text: "If lights dim or the MCB trips when the AC starts, the problem may be undersized wiring or a loose connection. A stabiliser hides it; an electrician fixes it.",
      },
      {
        t: "p",
        text: "Related: [AC outdoor unit not starting](/guides/ac-outdoor-unit-not-working) and [inverter vs non-inverter](/guides/inverter-vs-non-inverter-ac).",
      },
    ],
    faqs: [
      {
        q: "Is a stabiliser required for an inverter AC?",
        a: "Not always — many inverter ACs run across a wide voltage range. In areas with frequent power cuts, voltage dips or generator changeovers, a stabiliser or surge protector is recommended to protect the board.",
      },
      {
        q: "Can voltage fluctuation damage an AC?",
        a: "Yes. Low voltage stresses compressors and capacitors on fixed-speed ACs, and voltage spikes after power cuts are a leading cause of inverter board failures.",
      },
    ],
    related: ["inverter-ac-pcb-repair", "split-ac-repair"],
    relatedGuides: ["inverter-vs-non-inverter-ac", "ac-outdoor-unit-not-working", "ac-error-codes"],
  },
  {
    slug: "repair-or-replace-ac",
    cluster: "buying",
    title: "Repair or replace your old AC? A cost-based decision guide",
    metaTitle: "Repair or Replace an Old AC? Decision Guide With Costs | Airkraft",
    metaDescription:
      "When an old AC is worth repairing and when replacement is better: age, R22 gas, compressor failure, repeated leaks and running costs — with a simple rule of thumb.",
    excerpt:
      "A failed capacitor on a 12-year-old AC is worth fixing. A failed compressor on a leaking R22 unit is not. Here is how to tell the difference.",
    answer:
      "Repair an AC when the compressor and coils are healthy and the fault is a fan, capacitor, sensor, drain or board — these repairs are a small fraction of a new machine’s price. Consider replacing when the AC is over 10–12 years old and needs a compressor, uses R22 and keeps leaking, or the repair would cost more than about half the price of a comparable new AC.",
    published: D,
    updated: D,
    photo: "apartments",
    blocks: [
      { t: "h2", id: "table", text: "The quick decision table" },
      {
        t: "table",
        caption: "Repair or replace an AC: common situations",
        head: ["Situation", "Our usual advice"],
        rows: [
          ["Capacitor, fan motor, sensor or drain fault, any age", "Repair"],
          ["Inverter board fault, AC under 8 years", "Repair (board-level if possible)"],
          ["Single leak at a flare joint", "Repair and recharge"],
          ["Repeated leaks in the coil, R22 machine", "Replace"],
          ["Compressor failed, AC over 10–12 years", "Replace"],
          ["Repair over ~50% of a comparable new AC", "Replace"],
          ["Works, but loud and power-hungry", "Plan replacement before summer"],
        ],
      },
      { t: "h2", id: "rule", text: "The 50% rule of thumb" },
      {
        t: "p",
        text: "If a repair costs more than about half the price of a comparable new AC — and the machine is past the middle of its life — the money usually works harder in a new, efficient unit. Below that, repair. The rule bends for nearly new machines (repair) and very old R22 machines (replace sooner).",
      },
      { t: "h2", id: "r22", text: "The R22 question" },
      {
        t: "p",
        text: "R22 is being phased out, so every recharge gets more expensive and harder to source. One recharge after a fixed leak is fine; a machine that needs R22 every summer is costing you twice — in gas and in power. Prices in [AC gas filling cost](/guides/ac-gas-filling-cost).",
      },
      { t: "h2", id: "running", text: "Do not forget running costs" },
      {
        t: "p",
        text: "An old fixed-speed AC can use far more electricity than a modern inverter of the same tonnage. Compare the annual kWh on the BEE star label of a replacement against your current bills — see [inverter vs non-inverter](/guides/inverter-vs-non-inverter-ac).",
      },
      {
        t: "callout",
        title: "We give you both numbers",
        text: "On a diagnosis visit we quote the repair and tell you plainly when replacement is the better spend — and we install the new AC too if you want. See [AC installation](/services/ac-installation).",
      },
    ],
    faqs: [
      {
        q: "Is it worth repairing a 10-year-old AC?",
        a: "Yes, if the compressor and coils are healthy and the fault is a fan, capacitor, sensor, drain or board. If it needs a compressor or keeps leaking R22, replacement is usually the better spend.",
      },
      {
        q: "How long does an AC last in Delhi?",
        a: "A well-maintained split AC commonly lasts 10–12 years or more in Delhi NCR. Regular wet servicing and voltage protection extend it; dust, heat and neglect shorten it.",
      },
    ],
    related: ["split-ac-repair", "ac-installation", "window-ac-repair"],
    relatedGuides: ["ac-gas-filling-cost", "inverter-vs-non-inverter-ac", "ac-tonnage-guide"],
  },
  {
    slug: "ac-installation-checklist",
    cluster: "buying",
    title: "AC installation checklist: 12 things to check before the installer leaves",
    metaTitle: "AC Installation Checklist — 12 Checks Before the Installer Leaves",
    metaDescription:
      "What a proper split AC install looks like: level mounting, drain fall, insulation, flare joints, vacuum, outdoor clearance, wiring and a cooling test.",
    excerpt:
      "Most AC problems in the first year are installation problems. Twelve things to check while the installer is still in your home.",
    answer:
      "A proper split AC installation has a level indoor unit, a core hole sloping outwards, a drain with continuous downward fall, both copper lines insulated, leak-tested flare joints, a vacuum pump used before the valves are opened, the outdoor unit bolted to a rated stand with clearance for airflow, a correctly rated MCB and earthing, and a cooling test showing a clear temperature drop across the indoor unit.",
    published: D,
    updated: D,
    photo: "outdoor",
    blocks: [
      { t: "h2", id: "indoor", text: "Indoor unit" },
      {
        t: "ol",
        items: [
          "**Level mounting plate** — check with a spirit level; a tilted unit leaks from one end.",
          "**Core hole sloping outwards** so rain and condensate cannot run back into the wall.",
          "**Drain with continuous fall** — no loops or uphill sections, outlet visible outside. See [water leakage](/guides/ac-water-leakage).",
          "**Both copper lines insulated** all the way, with the joints taped — bare pipes sweat and drip.",
        ],
      },
      { t: "h2", id: "refrigerant", text: "Refrigerant work" },
      {
        t: "ol",
        items: [
          "**Flare joints leak-tested** with soap solution or a detector after tightening.",
          "**Vacuum pump used** before the valves are opened — not ‘purging’ with the AC’s own gas. Many manufacturers specify evacuating to 500 microns or lower, measured with a micron gauge. Ask to see the gauge.",
          "**Extra gas for long runs** — if the copper run is longer than the factory pre-charge covers, refrigerant is added by weight. See [gas filling](/services/ac-gas-filling).",
        ],
      },
      { t: "h2", id: "outdoor", text: "Outdoor unit" },
      {
        t: "ol",
        items: [
          "**Rated, rust-proofed stand, bolted down** with anti-vibration pads — a loose stand is the most common source of rattles. See [AC noises](/guides/ac-making-noise).",
          "**Clearance for airflow** as specified in the manual — never boxed in, never facing a wall a few inches away.",
        ],
      },
      { t: "h2", id: "electrical", text: "Electrical and handover" },
      {
        t: "ol",
        items: [
          "**Correct MCB and socket rating, and proper earthing** — no extension boards.",
          "**Cooling test** — after the room settles, air leaving the indoor unit is typically 8–12 °C cooler than air going in.",
          "**Paperwork** — installation date, the brand’s warranty registration, and an invoice listing copper length and any extra gas.",
        ],
      },
      {
        t: "callout",
        title: "Already installed badly?",
        text: "Dripping, noise and poor cooling in the first year are usually fixable without replacing the AC — re-routing the drain, re-making flares, re-mounting the outdoor unit. Book [AC installation & re-installation](/services/ac-installation).",
      },
      {
        t: "p",
        text: "Still choosing a machine? Start with [which tonnage](/guides/ac-tonnage-guide) and [inverter vs non-inverter](/guides/inverter-vs-non-inverter-ac).",
      },
    ],
    faqs: [
      {
        q: "How do I know if my AC was installed properly?",
        a: "Check that the indoor unit is level, the drain flows outside without loops, both pipes are insulated, the joints were leak-tested, a vacuum pump was used, the outdoor unit is bolted to a rated stand with airflow clearance, and the air leaving the AC is well below room temperature.",
      },
      {
        q: "Is vacuuming necessary during AC installation?",
        a: "Yes. Vacuuming removes air and moisture from the copper lines. Purging with the AC’s own refrigerant wastes gas and leaves moisture that harms the compressor.",
      },
    ],
    related: ["ac-installation", "ac-gas-filling"],
    relatedGuides: ["ac-tonnage-guide", "ac-water-leakage", "ac-making-noise"],
  },
];
