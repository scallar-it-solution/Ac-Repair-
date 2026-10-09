import type { Faq } from "./site";

export type Area = {
  slug: string;
  city: string;
  /** Name used inside sentences ("in South Delhi, Dwarka…"). */
  region: string;
  state: "Delhi" | "Uttar Pradesh" | "Haryana";
  stateCode: "DL" | "UP" | "HR";
  pin: string;
  geo: { lat: number; lng: number };
  /** Wikipedia URL for entity disambiguation in structured data. */
  wiki: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  answer: string;
  eta: string;
  /** Travel add-on note for outlying pockets — only where it applies; shown with the city's prices. */
  travel?: string;
  zones: { name: string; places: string[] }[];
  /** Local insight paragraphs. Supports [label](/path) inline links. */
  local: { title: string; text: string }[];
  faqs: Faq[];
};

export const AREAS: Area[] = [
  {
    slug: "delhi",
    city: "Delhi",
    region: "New Delhi & all Delhi districts",
    state: "Delhi",
    stateCode: "DL",
    pin: "1100xx",
    geo: { lat: 28.6139, lng: 77.209 },
    wiki: "https://en.wikipedia.org/wiki/Delhi",
    metaTitle: "AC Repair in Delhi | Same-Day AC Service & Gas Filling | Frostwright",
    metaDescription:
      "Same-day AC repair and service across Delhi — Dwarka, Rohini, Janakpuri, South Extension, GK, Saket, Laxmi Nagar and more. Split, window, inverter. 90-day warranty.",
    h1: "AC repair & service in Delhi",
    lede: "Builder floors in South Delhi, DDA flats in Dwarka and Rohini, old window units in Karol Bagh, inverter splits in Vasant Kunj. Our dispatch desk is in New Delhi — this is home ground.",
    answer:
      "Frostwright provides same-day AC repair, gas filling, installation and servicing across Delhi, dispatched from New Delhi. Technicians typically reach South, Central and East Delhi within 45–90 minutes during the day. Visits start with a ₹199 inspection, waived if you approve the repair, and every repair has a 90-day warranty.",
    eta: "45–90 min in South, Central & East Delhi",
    zones: [
      {
        name: "South Delhi",
        places: [
          "South Extension",
          "Greater Kailash",
          "Kalkaji",
          "Nehru Place",
          "Hauz Khas",
          "Saket",
          "Vasant Kunj",
          "Lajpat Nagar",
          "Defence Colony",
        ],
      },
      { name: "West Delhi", places: ["Dwarka", "Janakpuri", "Patel Nagar", "Karol Bagh"] },
      { name: "North Delhi", places: ["Rohini", "Pitampura", "Civil Lines"] },
      { name: "East Delhi", places: ["Mayur Vihar", "Laxmi Nagar", "Preet Vihar", "Shahdara"] },
    ],
    local: [
      {
        title: "Builder floors and narrow lanes",
        text: "South Delhi builder floors often have outdoor units on terraces or narrow side walls with long copper runs — a common place for [slow gas leaks](/guides/ac-gas-leak-signs) at flare joints. We carry long-reach hoses and plan parking before we arrive in GK, Lajpat Nagar and Defence Colony.",
      },
      {
        title: "Voltage and power cuts",
        text: "Summer voltage dips and power returning with a spike are the main reason we replace inverter boards in Delhi. Where it keeps happening, we will recommend a [stabiliser or surge protector](/guides/ac-stabilizer-guide) rather than sell you a second board.",
      },
      {
        title: "Older window ACs still at work",
        text: "Delhi still runs a lot of working window ACs — in DDA flats, shops and offices. We still [repair them](/services/window-ac-repair), and still carry the capacitors, relays and fan motors they need.",
      },
      {
        title: "Dwarka and Rohini sector societies",
        text: "Both sub-cities are laid out in numbered sectors of DDA flats and group-housing societies, many of them a few decades old. One building can hold an R22 window unit, a first-generation split and a new inverter AC, with outdoor units on balcony grilles or shared ledges. Send your sector and society name when you book — it tells the technician which gauges, gas and ladder to bring, and whether a [window AC](/services/window-ac-repair) or an [inverter board](/services/inverter-ac-pcb-repair) is likely on the job.",
      },
      {
        title: "Dust storms and 45 °C afternoons",
        text: "Pre-monsoon dust storms pack outdoor condensers with grit, and May–June afternoons push compressors to their limits. A [wet service](/services/ac-service) before April is the cheapest way to avoid a June breakdown.",
      },
    ],
    faqs: [
      {
        q: "Which parts of Delhi do you cover?",
        a: "All of Delhi — South, Central, East, West and North — including South Extension, Greater Kailash, Saket, Vasant Kunj, Dwarka, Janakpuri, Rohini, Pitampura, Karol Bagh, Mayur Vihar, Laxmi Nagar and Shahdara.",
      },
      {
        q: "How quickly can a technician reach me in Delhi?",
        a: "During the day, typically 45–90 minutes in South, Central and East Delhi. Peak May–June afternoons run longer, and we tell you the honest window on WhatsApp before you wait.",
      },
      {
        q: "Do you repair old window ACs in Delhi?",
        a: "Yes. Capacitors, relays, thermostats, fan motors, gas leaks and pull-out wet services for window units of every age.",
      },
    ],
  },
  {
    slug: "noida",
    city: "Noida",
    region: "Noida",
    state: "Uttar Pradesh",
    stateCode: "UP",
    pin: "2013xx",
    geo: { lat: 28.5355, lng: 77.391 },
    wiki: "https://en.wikipedia.org/wiki/Noida",
    metaTitle: "AC Repair in Noida | Same-Day AC Service in All Sectors | Frostwright",
    metaDescription:
      "Same-day AC repair, gas filling and service across Noida — Sector 18, 50, 62, 76, 137, 150 and Noida Extension. Society-ready technicians. 90-day warranty.",
    h1: "AC repair & service in Noida",
    lede: "High-rise societies, service ledges on the 20th floor, gate approvals on an app, and a lot of inverter ACs. Noida jobs need different preparation from a Delhi builder floor — we plan for that.",
    answer:
      "Frostwright provides same-day AC repair, servicing, gas filling and installation across Noida, from Sector 18 and Sector 62 to Sector 137, Sector 150 and Noida Extension. Daytime arrival is typically 45–90 minutes. Visits start with a ₹199 inspection, waived if you approve the repair, and repairs carry a 90-day warranty.",
    eta: "45–90 min across central Noida",
    travel: "Noida Extension (Greater Noida West) may carry a small travel add-on, confirmed on WhatsApp before the visit.",
    zones: [
      { name: "Central Noida", places: ["Sector 18", "Sector 37", "Sector 50", "Sector 62", "Sector 76"] },
      { name: "Expressway", places: ["Sector 137", "Sector 150"] },
      { name: "Noida Extension", places: ["Noida Extension"] },
    ],
    local: [
      {
        title: "High-rise outdoor units",
        text: "In Expressway societies the outdoor unit often sits on a service ledge or balcony cage several floors up. We plan access in advance, use safety gear, and avoid jobs that would need unsafe hanging off a facade.",
      },
      {
        title: "Long copper runs, slow leaks",
        text: "Tower flats frequently have long, bent copper runs between the indoor and outdoor units. Flare joints on these runs are the most common slow-leak point we find in Noida — and the reason we [leak-test before any gas goes in](/services/ac-gas-filling).",
      },
      {
        title: "Society entry, sorted",
        text: "Send us your tower and flat number with the booking. We share the technician’s name and phone so you can pre-approve entry on your society’s visitor app before they arrive.",
      },
      {
        title: "Move-in season installations",
        text: "New possession societies in [Noida Extension](/ac-repair-greater-noida) (Greater Noida West) see a steady stream of installations and [AC shifts](/services/ac-shifting). We [vacuum every install and check drain fall](/guides/ac-installation-checklist) — new flats often have pre-drilled holes at the wrong slope.",
      },
    ],
    faqs: [
      {
        q: "Do you cover all sectors of Noida?",
        a: "Yes — including Sector 18, 37, 50, 62, 76, 137, 150 and Noida Extension. Noida Extension is officially Greater Noida West, and parts of it may carry a small travel add-on that we confirm on WhatsApp before the visit. If your sector is not listed, WhatsApp your location and we will confirm the slot.",
      },
      {
        q: "Can you service outdoor units on high floors?",
        a: "Yes, where the unit is accessible from a ledge, balcony or service shaft with proper safety gear. If access is genuinely unsafe, we will tell you and suggest how to relocate the unit.",
      },
      {
        q: "Do your technicians handle society gate approvals?",
        a: "We share the technician’s name and phone number in advance so you can pre-approve entry on your society’s visitor system.",
      },
    ],
  },
  {
    slug: "greater-noida",
    city: "Greater Noida",
    region: "Greater Noida",
    state: "Uttar Pradesh",
    stateCode: "UP",
    pin: "2013xx",
    geo: { lat: 28.4744, lng: 77.504 },
    wiki: "https://en.wikipedia.org/wiki/Greater_Noida",
    metaTitle: "AC Repair in Greater Noida | AC Service & Gas Filling | Frostwright",
    metaDescription:
      "AC repair, service and gas filling in Greater Noida — Pari Chowk, Alpha, Beta, Gamma, Knowledge Park, Greater Noida West. Same-day slots, 90-day warranty.",
    h1: "AC repair & service in Greater Noida",
    lede: "Plotted houses in Alpha, Beta and Gamma, hostels and PGs around Knowledge Park, and the high-rise societies of the western sectors. Distances are longer here, so we confirm the slot honestly before anyone sets off.",
    answer:
      "Frostwright provides AC repair, wet servicing, gas filling and installation across Greater Noida, including Pari Chowk, Alpha, Beta, Gamma, Knowledge Park and Greater Noida West. Same-day slots are available; outlying pockets may carry a small travel add-on, which we confirm on WhatsApp before the visit. Repairs carry a 90-day warranty.",
    eta: "Same-day — exact window confirmed on WhatsApp",
    travel: "Some outlying pockets, including parts of the western sectors, may carry a small travel add-on, confirmed on WhatsApp before booking.",
    zones: [
      { name: "Sectors", places: ["Alpha / Beta / Gamma", "Pari Chowk", "Knowledge Park"] },
      { name: "West", places: ["Greater Noida West"] },
    ],
    local: [
      {
        title: "Plotted homes with many ACs",
        text: "Independent houses in Alpha, Beta and Gamma sectors often run four or more ACs of different ages. A [multi-AC AMC](/services/ac-amc) is usually cheaper than booking each one separately every summer.",
      },
      {
        title: "Hostels, PGs and institutes",
        text: "Around Knowledge Park we service rows of identical splits in hostels and PGs. Owners get one GST invoice, a list of machines and their condition, and a schedule for the next service.",
      },
      {
        title: "Longer distances, honest timings",
        text: "The city is spread out. We batch jobs by area so the technician is not crossing the city twice, and we tell you the real arrival window rather than a 20-minute promise.",
      },
    ],
    faqs: [
      {
        q: "Is there an extra charge for Greater Noida?",
        a: "Most of the city is covered at the standard ₹199 inspection. Some outlying pockets, including parts of the western sectors, may carry a small travel add-on, which we tell you on WhatsApp before booking.",
      },
      {
        q: "Is Greater Noida West the same as Noida Extension?",
        a: "Yes. Greater Noida West is the official name of the area most people call Noida Extension — the high-rise belt west of the main Greater Noida sectors. It is covered from our Greater Noida schedule, and parts of it may carry a small travel add-on, which we confirm on WhatsApp before the visit.",
      },
      {
        q: "Do you service ACs in hostels and PGs?",
        a: "Yes. We service multiple machines in one visit, provide a GST invoice and a machine list, and offer AMC for properties with several ACs.",
      },
    ],
  },
  {
    slug: "gurugram",
    city: "Gurugram",
    region: "Gurugram (Gurgaon)",
    state: "Haryana",
    stateCode: "HR",
    pin: "1220xx",
    geo: { lat: 28.4595, lng: 77.0266 },
    wiki: "https://en.wikipedia.org/wiki/Gurgaon",
    metaTitle: "AC Repair in Gurugram (Gurgaon) | Same-Day AC Service | Frostwright",
    metaDescription:
      "Same-day AC repair and service in Gurugram — DLF Phase 1–5, Golf Course Road, Sohna Road, Sushant Lok, South City and Dwarka Expressway. Homes, offices and clinics.",
    h1: "AC repair & service in Gurugram",
    lede: "Golf Course Road towers, DLF phases, Sohna Road societies and a lot of offices. Gurugram means generator changeovers, cassette units in commercial floors and boom-barriers — we come prepared for all three.",
    answer:
      "Frostwright provides same-day AC repair, servicing, gas filling and installation across Gurugram (Gurgaon), including DLF Phase 1–5, Golf Course Road, Sushant Lok, South City, Sohna Road and Dwarka Expressway. Daytime arrival is typically 45–90 minutes. Offices and clinics get night slots and GST invoices; repairs carry a 90-day warranty.",
    eta: "45–90 min across central Gurugram",
    travel: "Sohna town may carry a small travel add-on, confirmed on WhatsApp before the visit.",
    zones: [
      { name: "DLF & Golf Course", places: ["DLF Phase 1–5", "Golf Course Road", "MG Road"] },
      { name: "Central & South", places: ["Sushant Lok", "South City", "Sohna Road", "Sector 49–57"] },
      { name: "New Gurugram", places: ["New Gurgaon", "Palam Vihar", "Dwarka Expressway"] },
    ],
    local: [
      {
        title: "Generator changeovers and inverter boards",
        text: "Many Gurugram societies switch to DG backup during power cuts, and the changeover can stress inverter AC boards. If your AC dies after outages, we test the board and advise on [surge protection](/guides/ac-stabilizer-guide) before replacing anything.",
      },
      {
        title: "Offices, clinics and cassette units",
        text: "Commercial floors along Golf Course Road, MG Road and Sohna Road run [cassette, ductable and VRF systems](/services/commercial-ac-repair). We work nights and weekends, coordinate with facility managers, and send written reports.",
      },
      {
        title: "Boom-barriers and visitor apps",
        text: "We share the technician’s name and phone number in advance so you can pre-approve entry. Gated-society access is planned into the arrival window, not discovered at the gate.",
      },
      {
        title: "New towers, long pipe runs",
        text: "Dwarka Expressway and New Gurugram towers often have outdoor units on service ledges with long copper runs. Flare joints there are a common leak point — we [leak-test before charging gas](/guides/ac-gas-leak-signs).",
      },
    ],
    faqs: [
      {
        q: "Do you cover all of Gurugram?",
        a: "Yes — DLF Phase 1–5, Golf Course Road, MG Road, Sushant Lok, South City, Sohna Road, Sector 49–57, New Gurgaon, Palam Vihar and Dwarka Expressway. Sohna town may carry a small travel add-on.",
      },
      {
        q: "Do you service office ACs in Gurugram at night?",
        a: "Yes. Cassette, ductable and VRF service and repair can be scheduled late evening, overnight or on weekends.",
      },
      {
        q: "Why does my inverter AC fail after power cuts?",
        a: "Voltage spikes when mains power returns or when the society switches to and from generator backup can damage inverter boards. A stabiliser or surge protector is a cheap safeguard; we test the board before recommending any replacement.",
      },
    ],
  },
  {
    slug: "ghaziabad",
    city: "Ghaziabad",
    region: "Ghaziabad",
    state: "Uttar Pradesh",
    stateCode: "UP",
    pin: "2010xx",
    geo: { lat: 28.6692, lng: 77.4538 },
    wiki: "https://en.wikipedia.org/wiki/Ghaziabad",
    metaTitle: "AC Repair & Service in Ghaziabad, Indirapuram | Frostwright",
    metaDescription:
      "Same-day AC repair, service and gas filling in Ghaziabad — Indirapuram, Vaishali, Vasundhara, Kaushambi, Raj Nagar Extension and Crossings Republik. 90-day warranty.",
    h1: "AC repair & service in Ghaziabad",
    lede: "Older flats in Vaishali and Vasundhara, busy societies in Indirapuram, new towers in Raj Nagar Extension and Crossings Republik. Mixed housing means mixed machines — window, split and inverter.",
    answer:
      "Frostwright provides same-day AC repair, wet servicing, gas filling and installation across Ghaziabad, including Indirapuram, Vaishali, Vasundhara, Kaushambi, Raj Nagar Extension and Crossings Republik. The exact arrival window is confirmed on WhatsApp at booking. Visits start with a ₹199 inspection, waived if you approve the repair; repairs carry a 90-day warranty.",
    eta: "Same-day — exact window confirmed on WhatsApp",
    zones: [
      { name: "Trans-Hindon", places: ["Indirapuram", "Vaishali", "Vasundhara", "Kaushambi"] },
      { name: "New townships", places: ["Raj Nagar Extension", "Crossings Republik"] },
    ],
    local: [
      {
        title: "Indirapuram tower societies",
        text: "Indirapuram is laid out in khands — Niti, Shakti, Ahinsa, Nyay, Gyan and Abhay among them — and is mostly high-rise group housing. Outdoor units sit on service ledges or balcony cages, so access is planned before the visit, and the long copper runs in tower flats make flare joints a common slow-leak point. That is why gas is never charged before a [leak test](/guides/ac-gas-leak-signs). Share your khand, society and tower when you book.",
      },
      {
        title: "A mix of old and new machines",
        text: "Vaishali and Vasundhara flats still run many window and older R22 splits, while Raj Nagar Extension and Crossings Republik are mostly newer inverter units. Our technicians carry parts and gauges for both.",
      },
      {
        title: "Old machines that deserve a second life",
        text: "We regularly rebuild window AC fan motors and replace capacitors on 10-year-old machines here. If a unit is genuinely done — a failed compressor on a leaking R22 system — [we say so](/guides/repair-or-replace-ac).",
      },
      {
        title: "Crossing the Hindon",
        text: "Traffic on the main roads into Ghaziabad decides arrival times more than distance. We batch Indirapuram–Vaishali jobs together and give you an honest window at booking.",
      },
    ],
    faqs: [
      {
        q: "Which areas of Ghaziabad do you cover?",
        a: "Indirapuram, Vaishali, Vasundhara, Kaushambi, Raj Nagar Extension, Crossings Republik and nearby areas. WhatsApp your location if it is not listed.",
      },
      {
        q: "Can you still fill R22 gas in older ACs?",
        a: "Yes, while stock lasts and only after a leak test. For an old R22 machine with a recurring leak, we will tell you when replacement is the better spend.",
      },
    ],
  },
  {
    slug: "faridabad",
    city: "Faridabad",
    region: "Faridabad",
    state: "Haryana",
    stateCode: "HR",
    pin: "1210xx",
    geo: { lat: 28.4089, lng: 77.3178 },
    wiki: "https://en.wikipedia.org/wiki/Faridabad",
    metaTitle: "AC Repair in Faridabad | Same-Day AC Service | Frostwright",
    metaDescription:
      "AC repair, service, gas filling and installation in Faridabad — NIT, Sector 15–21, Greater Faridabad and Ballabhgarh. Same-day slots, GST invoice, 90-day warranty.",
    h1: "AC repair & service in Faridabad",
    lede: "Independent houses in NIT and the older sectors, new towers in Greater Faridabad, shops and small workshops along the main roads. We cover all of it, and we tell you the timing before you wait.",
    answer:
      "Frostwright provides AC repair, wet servicing, gas filling and installation across Faridabad, including NIT, Sector 15–21, Greater Faridabad and Ballabhgarh. Same-day slots are available, with the arrival window confirmed on WhatsApp; outlying areas such as Ballabhgarh may carry a small travel add-on. Repairs carry a 90-day warranty.",
    eta: "Same-day — exact window confirmed on WhatsApp",
    travel: "Greater Faridabad is covered at standard rates; Ballabhgarh and other outlying areas may carry a small travel add-on, confirmed on WhatsApp before booking.",
    zones: [
      { name: "Old Faridabad", places: ["NIT Faridabad", "Sector 15–21"] },
      { name: "Greater Faridabad", places: ["Greater Faridabad"] },
      { name: "South", places: ["Ballabhgarh"] },
    ],
    local: [
      {
        title: "Independent houses, many ACs",
        text: "Houses in NIT and Sectors 15–21 often run window and split ACs side by side, some well over a decade old. We service the whole house in one visit and log every machine.",
      },
      {
        title: "Shops and small workshops",
        text: "Shops and small industrial units run ACs long hours in dusty conditions. Condensers clog fast — a mid-summer [wash](/services/ac-service) keeps compressors from tripping in the afternoon heat.",
      },
      {
        title: "Greater Faridabad towers",
        text: "Newer societies in Greater Faridabad mean inverter splits, service-ledge outdoor units and long copper runs. We [leak-test flare joints](/guides/ac-gas-leak-signs) before charging gas.",
      },
    ],
    faqs: [
      {
        q: "Do you cover Greater Faridabad and Ballabhgarh?",
        a: "Yes. Greater Faridabad is covered at standard rates; Ballabhgarh and other outlying areas may carry a small travel add-on, which we confirm on WhatsApp before booking.",
      },
      {
        q: "Do you service ACs in Faridabad shops and workshops?",
        a: "Yes. Shops and small industrial units run their ACs for long hours in dusty conditions, so condensers clog quickly and compressors trip in the afternoon heat. A mid-summer wash between the pre-summer and post-monsoon services prevents most of it; for five or more machines, an AMC with a fixed schedule is usually cheaper.",
      },
      {
        q: "Can you service several ACs in one visit?",
        a: "Yes. Tell us how many machines and their types when you book, and we will send enough time and hands to do them together.",
      },
    ],
  },
];

/** Locally relevant guides per city (city → guide interlinking). */
export const AREA_GUIDES: Record<string, string[]> = {
  delhi: ["ac-stabilizer-guide", "ac-not-cooling", "ac-gas-filling-cost", "reduce-ac-electricity-bill"],
  noida: ["ac-gas-filling-cost", "ac-gas-leak-signs", "ac-installation-checklist", "ac-not-cooling"],
  "greater-noida": ["ac-amc-worth-it", "ac-service-schedule", "ac-not-cooling", "ac-water-leakage"],
  gurugram: ["ac-stabilizer-guide", "ac-error-codes", "inverter-vs-non-inverter-ac", "ac-outdoor-unit-not-working"],
  ghaziabad: ["repair-or-replace-ac", "ac-gas-filling-cost", "ac-making-noise", "ac-not-cooling"],
  faridabad: ["ac-service-schedule", "repair-or-replace-ac", "ac-water-leakage", "ac-bad-smell"],
};

export const areaBySlug = (slug: string) => AREAS.find((a) => a.slug === slug);
export const areaPath = (slug: string) => `/ac-repair-${slug}`;
