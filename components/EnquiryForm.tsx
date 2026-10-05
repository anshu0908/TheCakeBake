"use client";
import { useState } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./ui";

export default function EnquiryForm({ kind, placeholder, extra }: { kind: "gifting" | "contact"; placeholder: string; extra?: { label: string; options: string[] } }) {
  const { addEnquiry } = useStore();
  const [f, setF] = useState({ name: "", phone: "", email: "", choice: "", details: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setF((x) => ({ ...x, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: "" })); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, "").slice(-10))) er.phone = "Enter a valid 10-digit mobile number.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) er.email = "That email doesn't look right.";
    if (f.details.trim().length < 10) er.details = "Please add a few more details (at least 10 characters).";
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    addEnquiry({ kind, name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), details: (f.choice ? `${extra?.label}: ${f.choice}. ` : "") + f.details.trim() });
    setBusy(false);
    setSent(true);
  };

  if (sent) {
    const msg = `Hi ${site.name}! My name is ${f.name}. ${f.choice ? `${extra?.label}: ${f.choice}. ` : ""}${f.details}`;
    return (
      <div className="card p-8 text-center" role="status">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-700" aria-hidden>✓</div>
        <h3 className="mt-4 font-serif text-2xl">Thank you, {f.name.split(" ")[0]}</h3>
        <p className="lead mt-2">We've received your message and will get back to you shortly.</p>
        <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-6"><WhatsAppIcon className="h-4 w-4" /> Also send on WhatsApp</a>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="field-error">{errors[k]}</p>;
  return (
    <form onSubmit={submit} noValidate className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor={`${kind}-name`} className="label">Name</label><input id={`${kind}-name`} className={`input ${errors.name ? "input-error" : ""}`} value={f.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />{err("name")}</div>
        <div><label htmlFor={`${kind}-phone`} className="label">Mobile number</label><input id={`${kind}-phone`} className={`input ${errors.phone ? "input-error" : ""}`} value={f.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} />{err("phone")}</div>
      </div>
      <div><label htmlFor={`${kind}-email`} className="label">Email (optional)</label><input id={`${kind}-email`} type="email" className={`input ${errors.email ? "input-error" : ""}`} value={f.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />{err("email")}</div>
      {extra && (
        <div><label htmlFor={`${kind}-choice`} className="label">{extra.label}</label>
          <select id={`${kind}-choice`} className="input" value={f.choice} onChange={set("choice")}><option value="">Select</option>{extra.options.map((o) => <option key={o}>{o}</option>)}</select></div>
      )}
      <div><label htmlFor={`${kind}-details`} className="label">Message</label><textarea id={`${kind}-details`} rows={5} className={`input ${errors.details ? "input-error" : ""}`} value={f.details} onChange={set("details")} placeholder={placeholder} aria-invalid={!!errors.details} />{err("details")}</div>
      <button className="btn-primary w-full sm:w-auto sm:px-10" disabled={busy}>{busy ? "Sending…" : "Send message"}</button>
    </form>
  );
}
