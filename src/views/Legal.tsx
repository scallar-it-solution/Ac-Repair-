import type { ReactNode } from "react";
import { PageHero } from "../components/PageHero";
import { formatDate } from "../components/ui";
import { BRAND_DISCLAIMER, SITE } from "../data/site";
import { Link } from "../lib/router";
import type { RouteDef } from "../routes";

type Section = { h: string; body: ReactNode };

const mail = (
  <a href={`mailto:${SITE.email}`} className="font-medium text-forest underline underline-offset-4">
    {SITE.email}
  </a>
);

const PRIVACY: Section[] = [
  {
    h: "Who we are",
    body: (
      <p>
        {SITE.legal} (“Frostwright”, “we”) provides AC repair and maintenance services in Delhi NCR from a dispatch desk in{" "}
        {SITE.address.locality}. For any privacy question, write to {mail}.
      </p>
    ),
  },
  {
    h: "What this website collects",
    body: (
      <>
        <p>
          This website has no user accounts and no server-side forms. The booking form builds a WhatsApp message inside your
          browser; nothing is sent to us until you press send in WhatsApp. We do not use advertising or analytics cookies.
        </p>
        <p>
          Fonts and images are served from this website itself, not from third-party services. Clicking a WhatsApp link
          opens WhatsApp (Meta), whose own privacy policy applies.
        </p>
      </>
    ),
  },
  {
    h: "What you share when you book",
    body: (
      <p>
        When you contact us by WhatsApp, phone or email, we receive what you choose to send — typically your name, phone
        number, address or landmark, details and photos of your AC, and messages about the job.
      </p>
    ),
  },
  {
    h: "How we use it",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To schedule, carry out and follow up on the service you requested.</li>
        <li>To issue GST invoices and honour warranty claims.</li>
        <li>To keep a service log for your machines and, if you have an AMC, to remind you of scheduled visits.</li>
      </ul>
    ),
  },
  {
    h: "Sharing",
    body: (
      <p>
        We share your details only with the technician assigned to your job, with payment providers when you pay by card or
        UPI, and where the law requires it. We do not sell or rent personal data.
      </p>
    ),
  },
  {
    h: "Retention",
    body: (
      <p>
        We keep service records for as long as needed to provide warranty and AMC service and to meet tax and accounting
        obligations. You can ask us to delete anything we are not legally required to keep.
      </p>
    ),
  },
  {
    h: "Your rights",
    body: (
      <p>
        Under India’s Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your personal data,
        withdraw consent, and raise a grievance. Write to {mail} and we will respond within a reasonable time.
      </p>
    ),
  },
  {
    h: "Changes",
    body: <p>If we change how we handle data — for example by adding website analytics — we will update this page and its date.</p>,
  },
];

const TERMS: Section[] = [
  {
    h: "Booking",
    body: (
      <p>
        You can book on WhatsApp ({SITE.phoneDisplay}), by phone or by email. A booking is confirmed when we message you a
        slot. Arrival windows are honest estimates; traffic and peak-season demand can change them, and we will tell you if
        they do.
      </p>
    ),
  },
  {
    h: "Inspection charge",
    body: (
      <p>
        Each visit carries a {SITE.visitFee} inspection charge for diagnosis. It is waived if you approve the repair on the
        same visit. Outlying areas may carry a travel add-on, which we tell you before booking.
      </p>
    ),
  },
  {
    h: "Quotes and approval",
    body: (
      <p>
        After diagnosis we send a written quote on WhatsApp listing parts and labour. No work starts until you approve it.
        If further work turns out to be needed, we quote it separately and wait for your approval again.
      </p>
    ),
  },
  {
    h: "Prices and payment",
    body: (
      <p>
        Prices on this website are starting prices for standard jobs and may change; the price in your approved quote is the
        one that applies. Payment is due on completion by {SITE.payment.join(", ")}. Every job comes with a GST invoice.
      </p>
    ),
  },
  {
    h: "Repair warranty",
    body: (
      <>
        <p>
          Repairs carry a {SITE.warranty} warranty from the invoice date on the spare part we fitted and the labour for that
          part. Compressors and coils are covered by their manufacturer’s warranty terms. To claim, WhatsApp us your invoice
          number and a description of the problem.
        </p>
        <p>The warranty does not cover:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Damage from voltage fluctuations, power surges or faulty building wiring.</li>
          <li>Physical damage, water or pest ingress, or misuse.</li>
          <li>Machines opened, repaired or modified by anyone else after our visit.</li>
          <li>Parts we did not supply, and faults unrelated to the work we did.</li>
          <li>Refrigerant lost through a leak other than the one we repaired.</li>
        </ul>
      </>
    ),
  },
  {
    h: "Cancellations",
    body: <p>Please cancel or reschedule on WhatsApp as early as possible so the slot can go to someone else.</p>,
  },
  {
    h: "Access and safety",
    body: (
      <p>
        Please provide safe access to the indoor and outdoor units. Our technicians may decline work where access is unsafe
        — for example an outdoor unit that can only be reached by hanging outside a building — and will suggest alternatives.
      </p>
    ),
  },
  {
    h: "Brands",
    body: <p>{BRAND_DISCLAIMER}</p>,
  },
  {
    h: "Liability and governing law",
    body: (
      <p>
        To the extent permitted by law, our liability for any job is limited to the amount invoiced for that job. These
        terms are governed by the laws of India, and courts in New Delhi have jurisdiction.
      </p>
    ),
  },
];

export function Legal({ route }: { route: RouteDef }) {
  const isPrivacy = route.kind === "privacy";
  const sections = isPrivacy ? PRIVACY : TERMS;
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker={`Last updated ${formatDate(SITE.updated)}`}
        title={isPrivacy ? "Privacy policy" : "Terms of service & warranty"}
        lede={
          isPrivacy
            ? "Short version: this website stores nothing about you. What you send us on WhatsApp is used to fix your AC, and nothing else."
            : "Short version: you see the quote before any work starts, you get a GST invoice, and our repairs carry a 90-day warranty."
        }
        actions={false}
      />
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10 px-5 text-[16px] leading-relaxed text-ink/85 md:px-8">
          {sections.map((s) => (
            <section key={s.h} className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-ink">{s.h}</h2>
              {s.body}
            </section>
          ))}
          <p className="border-t border-line pt-8 text-sm text-muted">
            Questions? Write to {mail} or see the <Link to={isPrivacy ? "/terms" : "/privacy-policy"} className="text-forest underline underline-offset-4">{isPrivacy ? "terms of service" : "privacy policy"}</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
