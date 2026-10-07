import type { Guide } from "./types";

const D = "2026-10-05";

export const MAINTENANCE: Guide[] = [
  {
    slug: "ac-service-schedule",
    cluster: "maintenance",
    title: "How often should you service your AC in Delhi NCR? A season-by-season schedule",
    metaTitle: "How Often to Service Your AC in Delhi NCR — Seasonal Schedule",
    metaDescription:
      "A month-by-month AC maintenance schedule for Delhi NCR’s heat, dust and monsoon: when to book a wet service, how to clean filters, and when to call sooner.",
    excerpt:
      "Delhi NCR’s dust storms, 45 °C afternoons and humid monsoon are hard on ACs. Here is a simple schedule that keeps yours cooling and your bills down.",
    answer:
      "In Delhi NCR, service your AC at least twice a year: a wet service in March–April before the heat, and another in September–October after the monsoon. Clean the filters yourself every two weeks in summer. ACs that run through the night, or homes near construction and main roads, benefit from an extra mid-summer service.",
    published: D,
    updated: D,
    photo: "workshop",
    blocks: [
      { t: "h2", id: "schedule", text: "The Delhi NCR AC schedule" },
      {
        t: "table",
        caption: "Recommended AC maintenance schedule for Delhi NCR",
        head: ["When", "What to do", "Why"],
        rows: [
          ["March–April", "Wet service (indoor coil, blower, drain, outdoor condenser)", "Clears a winter of dust before the first 40 °C week and before technicians are booked out"],
          ["April–June", "Rinse filters every 2 weeks", "Dust storms and constant running clog filters fast"],
          ["June (heavy use)", "Dry service or outdoor wash", "Keeps condenser airflow up in peak heat"],
          ["July–August", "Watch for drips and musty smells", "Monsoon humidity overloads drains and grows mould on coils"],
          ["September–October", "Wet service", "Removes mould, silt and sludge from the monsoon"],
          ["November–February", "Switch off at the MCB if unused; keep the outdoor unit dry and ventilated", "Avoids standby damage from voltage spikes and trapped moisture"],
        ],
      },
      { t: "h2", id: "filters", text: "Clean the filters yourself — it takes ten minutes" },
      {
        t: "ol",
        items: [
          "Switch the AC off with the remote and at the switch or MCB.",
          "Lift the front panel of the indoor unit until it holds open.",
          "Slide the mesh filters out downwards.",
          "Rinse them under a tap from the back side so dust is pushed out, not in. Use a soft brush for stubborn grime.",
          "Let them dry fully in the shade — not in direct sun, which can warp them.",
          "Slide them back in, close the panel and switch on.",
        ],
      },
      {
        t: "p",
        text: "Clean filters are the cheapest efficiency upgrade there is. According to the US Department of Energy, routinely cleaning or replacing the filters can lower an air conditioner’s energy consumption by 5–15%. More savings in [how to cut your AC electricity bill](/guides/reduce-ac-electricity-bill).",
      },
      { t: "h2", id: "service-sooner", text: "Signs you need a service sooner" },
      {
        t: "ul",
        items: [
          "Airflow is weak even with clean filters",
          "A musty or sour smell when the AC starts — see [AC smells](/guides/ac-bad-smell)",
          "Water dripping from the indoor unit — see [water leakage](/guides/ac-water-leakage)",
          "The room takes much longer to cool than it used to",
          "Your electricity bill has jumped without a change in use",
          "The outdoor unit is caked with dust after a storm",
        ],
      },
      { t: "h2", id: "wet-vs-dry", text: "Wet service vs dry service" },
      {
        t: "p",
        text: "A **dry service** is a filter and surface clean. A **wet service** uses foam and a pressure jet on the coil fins, blower wheel and drain, and washes the outdoor condenser. Only a wet service removes the packed dust and mould that cost you cooling. See what a proper [AC wet service](/services/ac-service) includes.",
      },
      {
        t: "callout",
        title: "Several ACs? Consider an AMC",
        text: "If you have three or more ACs, an [AMC plan](/services/ac-amc) schedules every service for you — two wet and one dry per year, with priority slots in peak summer. Read [whether an AMC is worth it](/guides/ac-amc-worth-it) first.",
      },
    ],
    faqs: [
      {
        q: "How many times a year should an AC be serviced in Delhi?",
        a: "At least twice: once in March–April before summer and once in September–October after the monsoon. Heavy-use ACs benefit from a third, mid-summer service.",
      },
      {
        q: "How often should AC filters be cleaned?",
        a: "Every two weeks during summer in Delhi NCR, and monthly the rest of the time when the AC is in use.",
      },
      {
        q: "Does AC servicing reduce the electricity bill?",
        a: "Yes. Dirty filters, coils and condensers make the compressor run longer for the same cooling. The US Department of Energy says routinely cleaning or replacing filters can cut AC energy use by 5–15%.",
      },
    ],
    related: ["ac-service", "ac-amc", "split-ac-repair"],
    relatedGuides: ["ac-amc-worth-it", "reduce-ac-electricity-bill", "ac-bad-smell"],
    sources: [{ label: "US Department of Energy — Energy Saver 101: Home Cooling", url: "https://www.energy.gov/sites/prod/files/2016/11/f34/Energy%20Saver%20101%20Infographic%20Home%20Cooling_0.pdf" }],
  },
  {
    slug: "ac-amc-worth-it",
    cluster: "maintenance",
    title: "Is an AC AMC worth it? An honest cost comparison",
    metaTitle: "Is an AC AMC Worth It? AMC vs Pay-Per-Visit Costs in Delhi NCR",
    metaDescription:
      "When an AC maintenance contract pays off and when pay-per-visit is cheaper — with real Delhi NCR prices and what to check before you sign.",
    excerpt:
      "An AMC is not always the cheaper option. Here is when it pays off, when it does not, and what to look for in the contract.",
    answer:
      "For a single, lightly used AC, paying per visit is usually cheaper: two wet services cost about ₹998 a year at Frostwright’s split-AC rate, against ₹2,499 for a one-AC AMC. An AMC pays off when you have several ACs, run them for long hours, need guaranteed priority slots in May–June, or manage a home, rental or clinic where downtime and follow-ups cost more than the fee.",
    published: D,
    updated: D,
    photo: "living",
    blocks: [
      { t: "h2", id: "maths", text: "The basic maths" },
      {
        t: "table",
        caption: "Pay-per-visit vs AMC for one split AC, Frostwright prices",
        head: ["", "Pay per visit", "AMC (1 AC)"],
        rows: [
          ["Wet services", "2 × ₹499 = ₹998", "2 included"],
          ["Dry service", "Booked separately", "1 included"],
          ["Peak-season priority", "No", "Yes"],
          ["Parts", "Standard rate", "AMC rate"],
          ["Reminders and machine log", "No", "Yes"],
          ["Yearly cost", "From ₹998", "₹2,499"],
        ],
      },
      {
        t: "p",
        text: "On services alone, pay-per-visit wins for one AC. The AMC is paying for something else: priority, reminders, parts discounts and a technician who already knows the machine.",
      },
      { t: "h2", id: "worth-it", text: "When an AMC is worth it" },
      {
        t: "ul",
        items: [
          "**Three or more ACs** — one schedule, one invoice, and the per-AC rate drops on multi-AC plans.",
          "**Long running hours** — work-from-home rooms and bedrooms running all night need cleaning more often.",
          "**You cannot wait in June** — peak-season waiting lists do not apply to AMC customers.",
          "**Someone else lives there** — parents, tenants or a clinic; we schedule, remind and report to you.",
          "**Older machines** — more frequent faults make discounted parts and priority call-outs count.",
        ],
      },
      { t: "h2", id: "not-worth-it", text: "When pay-per-visit is better" },
      {
        t: "ul",
        items: [
          "One AC used a few hours a day, in a guest room or for part of the summer.",
          "A new AC still under the manufacturer’s warranty — use the brand’s free services first.",
          "You are happy to book early (February–March) and remember the post-monsoon service yourself — the [service schedule](/guides/ac-service-schedule) tells you when.",
        ],
      },
      { t: "h2", id: "checklist", text: "What to check in any AMC" },
      {
        t: "ol",
        items: [
          "How many **wet** services are included — not just ‘services’.",
          "Whether parts are included (comprehensive) or discounted (non-comprehensive).",
          "Whether gas charging is included, and whether a leak test comes first.",
          "Response-time promises in peak season.",
          "What is excluded — compressors, coils, voltage damage are usually out.",
          "Whether you get a written service log after each visit.",
        ],
      },
      {
        t: "p",
        text: "Frostwright’s AMC is non-comprehensive: two wet and one dry service per AC, priority slots, AMC-rate parts and a WhatsApp log. Details on the [AMC page](/services/ac-amc); commercial sites see [cassette & VRF service](/services/commercial-ac-repair).",
      },
    ],
    faqs: [
      {
        q: "Is AC AMC worth it for one AC?",
        a: "Usually not on cost alone — two pay-per-visit wet services are cheaper. It is worth it if you need priority slots in peak summer, run the AC for long hours, or want reminders and a service log handled for you.",
      },
      {
        q: "What is the difference between a comprehensive and non-comprehensive AMC?",
        a: "A comprehensive AMC includes the cost of spare parts. A non-comprehensive AMC covers services and priority, with parts billed separately, usually at a discount.",
      },
    ],
    related: ["ac-amc", "ac-service", "commercial-ac-repair"],
    relatedGuides: ["ac-service-schedule", "repair-or-replace-ac", "reduce-ac-electricity-bill"],
  },
  {
    slug: "reduce-ac-electricity-bill",
    cluster: "maintenance",
    title: "How to cut your AC electricity bill in a Delhi summer: 12 tips that work",
    metaTitle: "How to Reduce AC Electricity Bill — 12 Tips for Delhi Summers",
    metaDescription:
      "Practical ways to lower your AC power bill in Delhi NCR: set temperature, clean filters, ceiling fans, sealing, shade and maintenance — with the numbers.",
    excerpt:
      "Twelve changes, most of them free, that cut what your AC costs to run through a Delhi summer.",
    answer:
      "The biggest savings come from setting the AC at 24–26 °C instead of 18–20 °C — India’s Ministry of Power estimates each 1 °C higher saves about 6% of an AC’s electricity — plus clean filters (5–15% according to the US Department of Energy), a ceiling fan on low alongside the AC, a clean outdoor condenser with clear airflow, and blocking afternoon sun on west-facing windows.",
    published: D,
    updated: D,
    photo: "acUnit",
    blocks: [
      { t: "h2", id: "settings", text: "Settings (free)" },
      {
        t: "ol",
        items: [
          "**Set 24–26 °C, not 18 °C.** The AC does not cool faster at 18 °C; it just runs longer. India’s Ministry of Power estimates each 1 °C higher saves about 6% of the AC’s electricity, and 24 °C is the recommended default.",
          "**Run a ceiling fan on low** with the AC. Moving air lets most people set the AC a couple of degrees higher at the same comfort.",
          "**Use Sleep mode or a timer** at night — body temperature drops while you sleep.",
          "**Use Dry mode in the humid monsoon** when the problem is stickiness rather than heat.",
        ],
      },
      { t: "h2", id: "room", text: "The room (cheap)" },
      {
        t: "ol",
        items: [
          "**Block afternoon sun** — blackout curtains or blinds on west and south windows.",
          "**Seal gaps** around doors, windows and the AC pipe hole.",
          "**Keep doors closed** and heat sources (cooking, dryers, lights) out of the cooled room.",
          "**Top-floor rooms** — roof heat is the biggest load; terrace shading or reflective coating helps more than a bigger AC.",
        ],
      },
      { t: "h2", id: "machine", text: "The machine (maintenance)" },
      {
        t: "ol",
        items: [
          "**Clean filters every two weeks** in summer — the US Department of Energy puts the saving from routinely cleaning or replacing filters at 5–15%. How-to in the [service schedule](/guides/ac-service-schedule).",
          "**Keep the outdoor unit breathing** — shaded if possible, but never boxed in or covered while running, and washed before summer.",
          "**Fix leaks properly** — an undercharged AC runs longer for less cooling. See [signs of low gas](/guides/ac-gas-leak-signs).",
          "**Right-size and upgrade wisely** — an undersized AC never switches off; an old fixed-speed unit can use far more than a modern inverter. Compare the annual kWh on the BEE star label. See [inverter vs non-inverter](/guides/inverter-vs-non-inverter-ac) and [which tonnage](/guides/ac-tonnage-guide).",
        ],
      },
      {
        t: "callout",
        title: "A service pays for itself",
        text: "A [wet service](/services/ac-service) restores airflow through a dust-packed coil and condenser. In a house running ACs ten hours a day, the saving shows up on the next bill.",
      },
    ],
    faqs: [
      {
        q: "What is the best AC temperature to save electricity?",
        a: "24–26 °C. India’s Ministry of Power recommends 24 °C as the default and estimates each 1 °C increase saves about 6% of the AC’s electricity.",
      },
      {
        q: "Does using a fan with the AC save electricity?",
        a: "Yes. A ceiling fan uses a fraction of an AC’s power and lets you set the AC a couple of degrees higher at the same comfort.",
      },
      {
        q: "Does servicing the AC reduce the electricity bill?",
        a: "Yes. Clean filters, coil and condenser let the AC reach the set temperature faster and run less. The US Department of Energy says routinely cleaning or replacing filters saves 5–15%.",
      },
    ],
    related: ["ac-service", "ac-amc"],
    sources: [{ label: "Ministry of Power (PIB) — FAQs on BEE recommendations on AC temperature setting", url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1537124" }, { label: "US Department of Energy — Energy Saver 101: Home Cooling", url: "https://www.energy.gov/sites/prod/files/2016/11/f34/Energy%20Saver%20101%20Infographic%20Home%20Cooling_0.pdf" }, { label: "Bureau of Energy Efficiency — Standards & Labelling: Air Conditioners", url: "https://beeindia.gov.in/en/standards-labelling/air-conditioners" }],
    relatedGuides: ["ac-service-schedule", "inverter-vs-non-inverter-ac", "ac-tonnage-guide"],
  },
];
