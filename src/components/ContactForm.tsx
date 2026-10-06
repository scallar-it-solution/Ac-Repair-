"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { waLink } from "../data/site";
import { trackLead } from "../lib/track";
import { cn } from "../utils/cn";
import { IconWhatsApp } from "./Icons";

const TYPES = ["Split AC", "Window AC", "Inverter AC", "Cassette", "VRF / ductable", "Not sure"];
const ISSUES = [
  "Not cooling",
  "Water leaking",
  "Noise / vibration",
  "Error code on display",
  "Need gas filling",
  "Service / cleaning",
  "Installation / shifting",
  "AMC enquiry",
  "Other",
];

/** Indian mobile: optional +91/0 prefix, then 10 digits starting 6–9. */
const PHONE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;

type Errors = Partial<Record<"phone" | "area", string>>;

export function ContactForm({ compact = false, defaultIssue }: { compact?: boolean; defaultIssue?: string }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [issue, setIssue] = useState(defaultIssue && ISSUES.includes(defaultIssue) ? defaultIssue : ISSUES[0]);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);

  function validate(): Errors {
    const e: Errors = {};
    const digits = phone.replace(/[\s()-]/g, "");
    if (!PHONE_RE.test(digits)) e.phone = "Enter a 10-digit Indian mobile number.";
    if (area.trim().length < 2) e.area = "Tell us your area or a landmark.";
    return e;
  }

  function submit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (e.phone) return phoneRef.current?.focus();
    if (e.area) return areaRef.current?.focus();

    const msg = [
      "Hi Airkraft, I want to book an AC technician.",
      name.trim() && `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Area: ${area.trim()}`,
      `Machine: ${type}`,
      `Issue: ${issue}`,
      note.trim() && `Note: ${note.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    trackLead("whatsapp_form");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const field =
    "mt-1.5 w-full rounded-lg border bg-cream px-4 py-3 text-[15px] font-medium text-ink outline-none transition placeholder:font-normal placeholder:text-muted/70 focus:border-forest focus:ring-2 focus:ring-forest/15";
  const label = "block text-xs font-semibold uppercase tracking-wider text-sage";
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span id={`${uid}-${k}-err`} className="mt-1.5 block text-xs font-medium normal-case tracking-normal text-red-700">
        {errors[k]}
      </span>
    ) : null;

  return (
    <form onSubmit={submit} className="grid gap-4" noValidate aria-label="Book an AC technician on WhatsApp">
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        {!compact && (
          <label className={label}>
            Name <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
            <input
              className={cn(field, "border-line")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              name="name"
            />
          </label>
        )}
        <label className={label}>
          Mobile number
          <input
            ref={phoneRef}
            className={cn(field, errors.phone ? "border-red-600" : "border-line")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98xxx xxxxx"
            inputMode="tel"
            type="tel"
            autoComplete="tel"
            name="phone"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
          />
          {err("phone")}
        </label>
      </div>
      <label className={label}>
        Area / landmark
        <input
          ref={areaRef}
          className={cn(field, errors.area ? "border-red-600" : "border-line")}
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="e.g. GK-2, Noida Sector 137, DLF Phase 3"
          autoComplete="address-level3"
          name="area"
          required
          aria-invalid={!!errors.area}
          aria-describedby={errors.area ? `${uid}-area-err` : undefined}
        />
        {err("area")}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          AC type
          <select className={cn(field, "border-line")} value={type} onChange={(e) => setType(e.target.value)} name="type">
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          Issue
          <select className={cn(field, "border-line")} value={issue} onChange={(e) => setIssue(e.target.value)} name="issue">
            {ISSUES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      {!compact && (
        <label className={label}>
          Anything else <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
          <textarea
            className={cn(field, "min-h-[96px] resize-y border-line")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Brand, tonnage, error code — photo to follow on WhatsApp…"
            name="note"
          />
        </label>
      )}
      <button type="submit" className="btn btn-wa mt-1 w-full">
        <IconWhatsApp size={18} /> {sent ? "Open WhatsApp again" : "Send on WhatsApp"}
      </button>
      <p className="text-xs text-muted" role="status">
        {sent
          ? "WhatsApp opened with your details. Press send there — we reply with a slot and a technician’s name."
          : "Opens WhatsApp with your details filled in. Nothing is stored on this website."}
      </p>
    </form>
  );
}
