"use client";

import { FormEvent, useState } from "react";
import { site, whatsappHref } from "@/config/site";

export function QuoteForm({
  service,
  city,
  need,
  cityNames,
  serviceNames,
}: {
  service?: string;
  city?: string;
  need?: string;
  cityNames: string[];
  serviceNames: string[];
}) {
  const [sent, setSent] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Tirumala Safety Nets — visit request",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `City: ${data.get("city")}`,
      `Service: ${data.get("service")}`,
      `Opening: ${data.get("opening")}`,
      `Width: ${data.get("width") || "not given"}`,
      `Height: ${data.get("height") || "not given"}`,
      `Note: ${data.get("note")}`,
      need === "photo" ? "Please attach a full photo of the opening and closer photos of the fixing edges." : "",
    ]
      .filter(Boolean)
      .join("\n");
    const wa = whatsappHref(message);
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      setSent("WhatsApp is open with your visit request. Send the message to confirm the slot.");
      return;
    }
    const mail = `mailto:${site.email}?subject=${encodeURIComponent("Site visit — Hyderabad")}&body=${encodeURIComponent(message)}`;
    window.location.href = mail;
    setSent("Your email draft is ready. Send it and we will reply with a measurement slot.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-brand-100 bg-white p-5 shadow-card sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-900">Request a free measurement</h2>
        <p className="mt-2 text-sm leading-6 text-brand-800/75">
          {need === "photo"
            ? "Add the city, the opening size if you have it, then attach the photos in the message that opens. The written figure still follows a measurement."
            : "Share the locality and the opening. We confirm Hyderabad coverage and send a written quote after the visit."}
        </p>
      </div>
      <label className="grid gap-1 text-sm font-semibold">
        Name
        <input name="name" required className="h-11 rounded-2xl border border-brand-100 px-3 font-normal" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Phone
        <input name="phone" required inputMode="tel" className="h-11 rounded-2xl border border-brand-100 px-3 font-normal" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        City or town
        <input name="city" required defaultValue={city} list="ap-cities" className="h-11 rounded-2xl border border-brand-100 px-3 font-normal" placeholder="Any area in Hyderabad" />
        <datalist id="ap-cities">
          {cityNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Service
        <select name="service" defaultValue={service || need || ""} className="h-11 rounded-2xl border border-brand-100 px-3 font-normal">
          <option value="">Not sure yet</option>
          {serviceNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Opening
        <input name="opening" className="h-11 rounded-2xl border border-brand-100 px-3 font-normal" placeholder="Balcony, window, duct, terrace, stairs" />
      </label>
      {need === "photo" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold">
            Width
            <input name="width" className="h-11 rounded-2xl border border-brand-100 px-3 font-normal" placeholder="Feet or metres" />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Height
            <input name="height" className="h-11 rounded-2xl border border-brand-100 px-3 font-normal" placeholder="Feet or metres" />
          </label>
        </div>
      ) : null}
      <label className="grid gap-1 text-sm font-semibold">
        Note
        <textarea name="note" rows={4} className="rounded-2xl border border-brand-100 px-3 py-2 font-normal" placeholder="Children, pets, pigeons, or a sports bay" />
      </label>
      <button type="submit" className="h-12 rounded-full bg-cta-500 font-semibold text-brand-950 hover:bg-cta-600">
        Send visit request
      </button>
      {need === "photo" ? (
        <p className="text-sm leading-6 text-brand-800/75">After the draft opens, attach one full photo of the opening and closer photos of the top and side fixing surfaces.</p>
      ) : null}
      {sent ? <p className="text-sm leading-6 text-brand-800">{sent}</p> : null}
    </form>
  );
}
