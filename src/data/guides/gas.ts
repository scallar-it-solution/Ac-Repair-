import type { Guide } from "./types";

const D = "2026-10-05";

export const GAS: Guide[] = [
  {
    slug: "ac-gas-filling-cost",
    cluster: "gas",
    title: "AC gas filling cost in Delhi NCR (2026): R32 vs R410A vs R22",
    metaTitle: "AC Gas Filling Cost in Delhi NCR (2026) — R32, R410A, R22 Prices",
    metaDescription:
      "AC gas refill costs in Delhi NCR for 2026 — R32, R410A and R22 — plus what a proper charge includes and how to tell which gas your AC uses.",
    excerpt:
      "Prices for R32, R410A and R22, what a proper gas charge should include, and why the cheapest top-up usually costs the most.",
    answer:
      "In Delhi NCR, Frostwright’s AC gas filling starts at ₹1,799 for R32 or R410A and ₹2,499 for R22 (subject to stock), including a nitrogen leak test, vacuum and a weighed charge. The final price depends on where the leak is and whether a coil or joint needs repair. A healthy AC never needs routine gas top-ups.",
    published: D,
    updated: D,
    photo: "leakTest",
    blocks: [
      { t: "h2", id: "prices", text: "Gas filling prices at a glance" },
      {
        t: "table",
        caption: "AC gas filling starting prices in Delhi NCR, 2026",
        head: ["Refrigerant", "Typically found in", "Starting price", "Notes"],
        rows: [
          ["R32", "Most split ACs sold in India in recent years", "₹1,799", "After leak test, weighed charge"],
          ["R410A", "Many inverter and split ACs from the 2010s", "₹1,799", "Charged as liquid, by weight"],
          ["R22", "Older split ACs and most older window ACs", "₹2,499", "Subject to stock; being phased out"],
        ],
      },
      {
        t: "p",
        text: "These are Frostwright’s published starting prices, including the leak test, vacuum and charge. Leak repairs beyond re-making a flare joint — brazing, coil repair — are quoted once the leak is found. All rates are on the [price list](/pricing).",
      },
      { t: "h2", id: "do-you-need-it", text: "First: do you actually need gas?" },
      {
        t: "p",
        text: "Most ‘my AC needs gas’ calls turn out to be a dirty coil, a dead outdoor fan capacitor or blocked filters — see [AC not cooling](/guides/ac-not-cooling). Real low charge has specific signs, listed in [how to tell if your AC is low on gas](/guides/ac-gas-leak-signs).",
      },
      { t: "h2", id: "what-is-included", text: "What a proper gas charge includes" },
      {
        t: "ol",
        items: [
          "**Confirm it is gas** — pressures, temperatures and current measured, and a dirty coil ruled out.",
          "**Pressure test with nitrogen** to find the leak at flares, brazed joints or the coils.",
          "**Fix the leak** before any refrigerant goes in.",
          "**Vacuum** the system to remove air and moisture.",
          "**Weighed charge** to the quantity on the nameplate, plus any extra required for long pipe runs.",
          "**Record** the gas type and grams on the invoice.",
        ],
      },
      { t: "h2", id: "cheap-top-up", text: "Why the cheapest top-up costs the most" },
      {
        t: "p",
        text: "A ‘top-up’ without a leak test feels cheap on the day. But the gas leaks out again, the compressor runs hot while undercharged, and you pay for the same visit in a few weeks. Over a summer, a proper leak repair is almost always cheaper — and it protects the most expensive part of the machine.",
      },
      {
        t: "callout",
        title: "Ask for grams on the invoice",
        text: "A professional charge is weighed. If the bill says ‘gas filling’ with no refrigerant type and no quantity, you have no way to know what went in.",
      },
      { t: "h2", id: "which-gas", text: "How to tell which gas your AC uses" },
      {
        t: "p",
        text: "Look at the nameplate sticker on the side of the outdoor unit (or the back of a window AC). It lists the refrigerant — R32, R410A or R22 — and the factory charge in grams or kilograms. Send us a photo of it on WhatsApp and we will confirm the price before the visit.",
      },
      { t: "h2", id: "r22", text: "What about R22?" },
      {
        t: "p",
        text: "R22 is an ozone-depleting HCFC being phased out under the Montreal Protocol, so supply is shrinking and prices are rising. We still charge R22 while stock lasts. For an old R22 machine with a recurring leak or a weak compressor, replacing it is often the better long-term spend — see [repair or replace?](/guides/repair-or-replace-ac).",
      },
      { t: "h2", id: "price-factors", text: "What changes the final price" },
      {
        t: "ul",
        items: [
          "Where the leak is — a flare joint is quick; a leak inside a coil needs brazing or a coil replacement.",
          "How much charge is missing, and whether the system needs a full recharge.",
          "Long copper runs, which need extra refrigerant beyond the factory charge.",
          "Access — outdoor units on high ledges or facades take longer.",
          "R22 availability.",
        ],
      },
      {
        t: "p",
        text: "See [AC gas filling](/services/ac-gas-filling) for the full process and booking.",
      },
    ],
    faqs: [
      {
        q: "What is the cost of AC gas filling in Delhi?",
        a: "At Frostwright, gas filling starts at ₹1,799 for R32 or R410A and ₹2,499 for R22, including a leak test, vacuum and weighed charge. Leak repairs beyond re-making a flare joint are quoted after the leak is found.",
      },
      {
        q: "How often does an AC need gas filling?",
        a: "Never, if there is no leak. Refrigerant runs in a sealed loop. Needing gas means the system has a leak, which should be found and fixed first.",
      },
      {
        q: "Is R32 gas filling cheaper than R22?",
        a: "Yes. R32 is widely available, while R22 is being phased out and is harder to source, so R22 charges cost more.",
      },
    ],
    related: ["ac-gas-filling", "ac-coil-repair", "split-ac-repair", "window-ac-repair"],
    relatedGuides: ["ac-gas-leak-signs", "ac-not-cooling", "repair-or-replace-ac"],
    sources: [{ label: "UNEP Ozone Secretariat — The Montreal Protocol", url: "https://ozone.unep.org/treaties/montreal-protocol" }],
  },
  {
    slug: "ac-gas-leak-signs",
    cluster: "gas",
    title: "How to tell if your AC is low on gas — and why it always means a leak",
    metaTitle: "Signs Your AC Is Low on Gas (Refrigerant Leak) | Frostwright Delhi NCR",
    metaDescription:
      "The real signs of low AC refrigerant — fading cooling, frost on the thin pipe, hissing, oily joints, leak error codes — and why a top-up without a leak test fails.",
    excerpt:
      "Six signs that point to a genuine refrigerant leak, the look-alikes that do not, and what a technician should measure before charging gas.",
    answer:
      "Signs your AC is low on gas include cooling that faded gradually over weeks, frost on the thin copper pipe or service valve, a hissing sound, oily residue at pipe joints, longer running times and a low-refrigerant error code (such as Daikin U0, LG CH38 or Samsung E554). Because refrigerant runs in a sealed loop, low gas always means a leak that should be found and fixed before recharging.",
    published: D,
    updated: D,
    photo: "gauges",
    blocks: [
      { t: "h2", id: "signs", text: "Six signs of a genuine leak" },
      {
        t: "ol",
        items: [
          "**Cooling faded slowly.** A leak drains the system over weeks; a sudden stop is usually electrical.",
          "**Frost on the thin pipe** at the outdoor unit’s service valve or on the indoor coil.",
          "**Hissing or bubbling** near the pipes or coils (only audible on larger leaks).",
          "**Oily patches** at flare nuts or coil bends — refrigerant carries compressor oil out with it.",
          "**Longer running, higher bills** for the same room temperature.",
          "**A low-refrigerant error code** on inverter ACs — see the [error codes guide](/guides/ac-error-codes).",
        ],
      },
      { t: "h2", id: "lookalikes", text: "Look-alikes that are not gas" },
      {
        t: "table",
        caption: "Problems often mistaken for low AC gas",
        head: ["Symptom", "More likely cause", "Guide"],
        rows: [
          ["Warm air, outdoor fan not spinning", "Fan capacitor or motor", "[Outdoor unit not working](/guides/ac-outdoor-unit-not-working)"],
          ["Weak airflow, musty smell", "Dirty filters and coil", "[Service schedule](/guides/ac-service-schedule)"],
          ["Water dripping indoors", "Blocked drain", "[Water leakage](/guides/ac-water-leakage)"],
          ["Struggles only in the afternoon", "Dirty condenser or undersized AC", "[Tonnage guide](/guides/ac-tonnage-guide)"],
        ],
      },
      { t: "h2", id: "measure", text: "What a technician should measure" },
      {
        t: "p",
        text: "Suction pressure, the temperature of the suction line, and compressor current — together they show whether the system is undercharged or something else is wrong. If it is low, the next step is a **nitrogen pressure test** to find the leak. Only after the leak is fixed and the system is vacuumed should refrigerant go in, by weight. That is the process in our [gas filling service](/services/ac-gas-filling).",
      },
      { t: "h2", id: "where", text: "Where AC leaks usually are" },
      {
        t: "ul",
        items: [
          "**Flare joints** at the indoor and outdoor units — the most common, especially after shifting or a rushed installation.",
          "**Long copper runs** in high-rise flats, where pipes are bent and joined.",
          "**Coils**, where corrosion or vibration opens pinholes — see [coil leak repair](/services/ac-coil-repair).",
          "**Service valves** and brazed joints on the outdoor unit.",
        ],
      },
      { t: "h2", id: "damage", text: "Can low gas damage the AC?" },
      {
        t: "p",
        text: "Yes. In most AC compressors the returning cold refrigerant also cools the compressor. Run undercharged for long enough and the compressor overheats — turning a leak repair into a compressor replacement. If you see the signs above, book a leak test rather than a top-up.",
      },
      {
        t: "callout",
        title: "Do not DIY with gas cans",
        text: "R32 is mildly flammable and all refrigerants are under pressure. Charging without a vacuum, gauges and a scale also leaves air and moisture in the system.",
      },
      {
        t: "p",
        text: "Costs for every gas type are in [AC gas filling cost](/guides/ac-gas-filling-cost).",
      },
    ],
    faqs: [
      {
        q: "How do I know if my AC gas is low?",
        a: "Gradually fading cooling, frost on the thin copper pipe, hissing, oily pipe joints, longer running times and a low-refrigerant error code. A technician confirms it with pressure and temperature readings.",
      },
      {
        q: "Can an AC lose gas without a leak?",
        a: "No. Refrigerant circulates in a sealed loop and is not consumed. Low gas always means a leak somewhere.",
      },
      {
        q: "Is it safe to keep running an AC that is low on gas?",
        a: "Not for long. The compressor relies on returning refrigerant for cooling and can overheat when undercharged. Switch to Fan mode and book a leak test.",
      },
    ],
    related: ["ac-gas-filling", "ac-coil-repair", "split-ac-repair"],
    relatedGuides: ["ac-gas-filling-cost", "ac-not-cooling", "ac-error-codes"],
  },
];
