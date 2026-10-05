import type { Guide } from "./types";

const D = "2026-10-05";

export const REFERENCE: Guide[] = [
  {
    slug: "ac-glossary",
    cluster: "reference",
    title: "AC glossary: 34 terms technicians use, in plain English",
    metaTitle: "AC Glossary — Tonnage, Inverter, R32, PCB & More Explained",
    metaDescription:
      "Plain-English definitions of AC terms on quotes and from technicians: tonnage, ISEER, inverter, capacitor, PCB, R32, flare joint, vacuum, wet service.",
    excerpt:
      "Tonnage, ISEER, capacitor, superheat, flare joint, wet service — what technicians mean, in one page.",
    answer:
      "This glossary defines the terms that appear on AC quotes and in technicians’ explanations — from capacity and efficiency (ton, BTU, ISEER, star rating) to parts (compressor, condenser, evaporator, capacitor, PCB, thermistor), refrigerants (R32, R410A, R22) and service work (wet service, vacuuming, nitrogen leak test, AMC).",
    published: D,
    updated: D,
    photo: "training",
    blocks: [
      { t: "h2", id: "capacity", text: "Capacity and efficiency" },
      {
        t: "defs",
        items: [
          ["Ton (tonnage)", "Cooling capacity. One ton removes about 12,000 BTU of heat per hour, roughly 3.5 kW. See the [tonnage guide](/guides/ac-tonnage-guide)."],
          ["BTU", "British Thermal Unit — a unit of heat. AC capacity is often given in BTU per hour."],
          ["ISEER", "Indian Seasonal Energy Efficiency Ratio — the efficiency measure used for AC star ratings in India. Higher is more efficient."],
          ["Star rating (BEE label)", "The Bureau of Energy Efficiency label on every AC sold in India, showing the star rating and estimated annual electricity use in kWh."],
          ["Inverter AC", "An AC whose compressor changes speed to match the cooling needed, instead of switching fully on and off. See [inverter vs non-inverter](/guides/inverter-vs-non-inverter-ac)."],
          ["Fixed-speed (non-inverter) AC", "An AC whose compressor runs at full power or not at all, cycling on and off to hold temperature."],
          ["Short cycling", "An AC switching on and off too often — usually oversizing, low gas or a sensor fault."],
        ],
      },
      { t: "h2", id: "parts", text: "Parts" },
      {
        t: "defs",
        items: [
          ["Compressor", "The pump in the outdoor unit that circulates refrigerant — the heart and most expensive part of the AC."],
          ["Condenser", "The outdoor coil where heat taken from the room is released outside."],
          ["Evaporator (indoor coil)", "The cold coil in the indoor unit that absorbs heat and moisture from room air."],
          ["Blower wheel", "The long fan inside the indoor unit that pushes air across the coil."],
          ["Capacitor", "An electrical part that helps the compressor and fan motors start and run on fixed-speed ACs. A common, inexpensive failure."],
          ["Contactor / relay", "Switches that turn the compressor and fan on and off. Their contacts wear and pit over time."],
          ["PCB", "Printed circuit board — the AC’s electronic controller. Inverter ACs have indoor and outdoor boards. See [PCB repair](/services/inverter-ac-pcb-repair)."],
          ["IPM", "Intelligent power module — the part of an inverter board that drives the compressor."],
          ["Thermistor (sensor)", "A temperature sensor on the coil or in the air stream that tells the board what is happening."],
          ["Drain tray and drain pipe", "Collect condensed water from the indoor coil and carry it outside. See [water leakage](/guides/ac-water-leakage)."],
          ["Drain pump", "A small pump in cassette units that lifts condensate up to the drain line."],
          ["Stabiliser", "A device that keeps the voltage reaching the AC within a safe band. See the [stabiliser guide](/guides/ac-stabilizer-guide)."],
        ],
      },
      { t: "h2", id: "refrigerant", text: "Refrigerant" },
      {
        t: "defs",
        items: [
          ["Refrigerant (‘gas’)", "The fluid that carries heat from the room to the outdoor unit in a sealed loop. It is not consumed — low gas means a leak."],
          ["R32", "The refrigerant in most split ACs sold in India in recent years. Mildly flammable, lower global-warming impact than R410A."],
          ["R410A", "A refrigerant blend used in many split and inverter ACs from the 2010s."],
          ["R22", "An older, ozone-depleting refrigerant being phased out under the Montreal Protocol; common in old window ACs."],
          ["Flare joint", "The threaded copper connection at the indoor and outdoor units — the most common leak point."],
          ["Nitrogen leak test", "Pressurising the system with dry nitrogen to find leaks safely before refrigerant is added."],
          ["Vacuuming (evacuation)", "Removing air and moisture from the system with a vacuum pump before charging or opening valves."],
          ["Superheat", "How far the refrigerant leaving the indoor coil has warmed above its boiling point — one of the readings used to judge the charge."],
          ["Manifold gauge", "The set of pressure gauges a technician connects to read system pressures. See [gas filling](/services/ac-gas-filling)."],
        ],
      },
      { t: "h2", id: "service", text: "Service and contracts" },
      {
        t: "defs",
        items: [
          ["Wet service", "Foam and pressure-jet cleaning of the indoor coil, blower and drain, and a wash of the outdoor condenser. See [AC service](/services/ac-service)."],
          ["Dry service", "A filter and surface clean without water jetting."],
          ["AMC", "Annual maintenance contract — scheduled services and priority support for a yearly fee. See [is an AMC worth it?](/guides/ac-amc-worth-it)"],
          ["Comprehensive AMC", "An AMC that includes spare parts. A non-comprehensive AMC bills parts separately."],
          ["Error code", "A code shown on the display when the AC detects a fault. See [error codes explained](/guides/ac-error-codes)."],
          ["Cassette / ductable / VRF", "Commercial AC types: ceiling cassettes, ducted units, and multi-indoor-unit variable refrigerant flow systems. See [commercial AC service](/services/commercial-ac-repair)."],
        ],
      },
    ],
    faqs: [
      {
        q: "What does tonnage mean in an AC?",
        a: "Cooling capacity. One ton removes about 12,000 BTU of heat per hour, roughly 3.5 kW — it has nothing to do with the AC’s weight.",
      },
      {
        q: "What is ISEER in an AC?",
        a: "The Indian Seasonal Energy Efficiency Ratio, used by the Bureau of Energy Efficiency to star-rate ACs. A higher ISEER means lower electricity use for the same cooling.",
      },
    ],
    related: ["ac-service", "split-ac-repair", "ac-gas-filling"],
    relatedGuides: ["ac-tonnage-guide", "ac-error-codes", "inverter-vs-non-inverter-ac"],
  },
];
