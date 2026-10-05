"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { fmtDate, inr, istDate, slots, waLink } from "@/lib/utils";
import type { CustomRequest } from "@/lib/types";
import { WhatsAppIcon } from "@/components/ui";

const occasions = ["Birthday", "Anniversary", "Wedding", "Baby Shower", "Corporate", "Festive", "Other"];
const flavours = ["Chocolate truffle", "Vanilla with fresh fruit", "Red velvet", "Butterscotch", "Rose gulkand", "Black forest", "Rasmalai", "Pistachio"];
const sizes = [
  { label: "1 kg (10-12 servings)", low: 1700, high: 2300 },
  { label: "2 kg (20-25 servings)", low: 2600, high: 3400 },
  { label: "3 kg (30-35 servings)", low: 3800, high: 4800 },
  { label: "5 kg (50+ servings)", low: 6200, high: 7800 },
];
const tierMult = { 1: 1, 2: 1.45, 3: 1.9 } as Record<number, number>;
const shapes = ["Round", "Square", "Heart", "Rectangle"];
const stepNames = ["Occasion", "Flavour", "Size", "Shape & tiers", "Theme", "Reference", "Date & time", "Your details"];

const round100 = (n: number) => Math.round(n / 100) * 100;

async function shrink(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  const max = 560;
  const r = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return c.toDataURL("image/jpeg", 0.72);
}

export default function CustomForm() {
  const sp = useSearchParams();
  const { addCustom } = useStore();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<CustomRequest | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [f, setF] = useState({
    occasion: occasions.includes(sp.get("occasion") ?? "") ? sp.get("occasion")! : "",
    flavour: "", size: "", tiers: 1, shape: "Round", theme: "", message: "", reference: "" as string, date: "", slot: "", name: "", phone: "", email: "",
  });
  const up = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => { setF((x) => ({ ...x, [k]: v })); setErrors({}); };

  const sz = sizes.find((s) => s.label === f.size);
  const est = sz ? { low: round100(sz.low * tierMult[f.tiers]), high: round100(sz.high * tierMult[f.tiers]) } : null;

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !f.occasion) e.occasion = "Please pick an occasion.";
    if (s === 1 && !f.flavour) e.flavour = "Please pick a flavour.";
    if (s === 2 && !f.size) e.size = "Please choose a size.";
    if (s === 4 && f.theme.trim().length < 3) e.theme = "Tell us a little about the theme or design.";
    if (s === 6) {
      if (!f.date) e.date = "Choose a date.";
      if (!f.slot) e.slot = "Choose a time slot.";
    }
    if (s === 7) {
      if (f.name.trim().length < 2) e.name = "Please enter your name.";
      if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a valid 10-digit mobile number.";
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "That email doesn't look right.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => s + 1);

  const onFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setErrors({ reference: "Please choose an image file." });
    if (file.size > 12 * 1024 * 1024) return setErrors({ reference: "That image is too large (max 12 MB)." });
    setUploading(true);
    try { up("reference", await shrink(file)); } catch { setErrors({ reference: "We couldn't read that image." }); }
    setUploading(false);
  };

  const message = (id: string) =>
    [
      `Hi ${site.name}! I'd like a custom cake (request ${id}).`, "",
      `Occasion: ${f.occasion}`, `Flavour: ${f.flavour}`, `Size: ${f.size}`, `Tiers: ${f.tiers}`, `Shape: ${f.shape}`,
      `Theme: ${f.theme}`, f.message ? `Message on cake: "${f.message}"` : "", f.reference ? "Reference photo: I'll send it in this chat" : "",
      `Date: ${fmtDate(f.date)}, ${f.slot}`, est ? `Estimate: ${inr(est.low)} - ${inr(est.high)}` : "", "",
      `Name: ${f.name}`, `Phone: ${f.phone}`,
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");

  const submit = () => {
    if (!validate(7) || !est) return;
    const req = addCustom({
      name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), occasion: f.occasion, flavour: f.flavour, size: f.size, tiers: f.tiers, shape: f.shape,
      theme: f.theme.trim(), message: f.message.trim(), reference: f.reference || undefined, date: f.date, slot: f.slot, estLow: est.low, estHigh: est.high,
    });
    setDone(req);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    return (
      <section className="container-x max-w-2xl py-16 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl text-emerald-700" aria-hidden>✓</div>
        <h2 className="h-display mt-6 text-4xl">Request received</h2>
        <p className="lead mt-3">Thank you, {done.name.split(" ")[0]}. Your request <strong>{done.id}</strong> is with our team. Send it on WhatsApp to get your quote fastest.</p>
        <div className="card mt-8 p-6 text-left text-sm">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
            {[["Occasion", done.occasion], ["Flavour", done.flavour], ["Size", done.size], ["Tiers", String(done.tiers)], ["Shape", done.shape], ["Date", `${fmtDate(done.date)}, ${done.slot}`], ["Estimate", `${inr(done.estLow)} - ${inr(done.estHigh)}`]].map(([k, v]) => (
              <div key={k} className="contents"><dt className="text-cocoa-500">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={waLink(message(done.id))} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp</a>
          <Link href="/menu" className="btn-outline">Browse the menu</Link>
        </div>
      </section>
    );
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="field-error" role="alert">{errors[k]}</p> : null);
  const choice = (selected: boolean) => `cursor-pointer rounded-2xl border p-4 text-left transition ${selected ? "border-cocoa bg-cocoa text-cream" : "border-cocoa/20 bg-white hover:border-cocoa/60"}`;

  return (
    <section className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
      <div className="card p-6 sm:p-10">
        <ol className="mb-8 flex gap-1.5" aria-label="Progress">
          {stepNames.map((n, i) => (
            <li key={n} className="flex-1" aria-current={i === step ? "step" : undefined}>
              <span className={`block h-1.5 rounded-full ${i <= step ? "bg-gold" : "bg-cocoa/10"}`} />
              <span className="sr-only">{n}</span>
            </li>
          ))}
        </ol>
        <p className="eyebrow">Step {step + 1} of {stepNames.length}</p>

        <div className="mt-2 min-h-[260px]">
          {step === 0 && (<>
            <h2 className="font-serif text-3xl">What are we celebrating?</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Occasion">
              {occasions.map((o) => <button key={o} type="button" role="radio" aria-checked={f.occasion === o} onClick={() => up("occasion", o)} className={choice(f.occasion === o)}>{o}</button>)}
            </div><Err k="occasion" />
          </>)}
          {step === 1 && (<>
            <h2 className="font-serif text-3xl">Pick a flavour</h2>
            <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Flavour">
              {flavours.map((o) => <button key={o} type="button" role="radio" aria-checked={f.flavour === o} onClick={() => up("flavour", o)} className={choice(f.flavour === o)}>{o}</button>)}
            </div><Err k="flavour" />
          </>)}
          {step === 2 && (<>
            <h2 className="font-serif text-3xl">How many are you serving?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Size">
              {sizes.map((o) => <button key={o.label} type="button" role="radio" aria-checked={f.size === o.label} onClick={() => up("size", o.label)} className={choice(f.size === o.label)}>{o.label}</button>)}
            </div><Err k="size" />
          </>)}
          {step === 3 && (<>
            <h2 className="font-serif text-3xl">Shape &amp; tiers</h2>
            <p className="label mt-6">Shape</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Shape">
              {shapes.map((o) => <button key={o} type="button" role="radio" aria-checked={f.shape === o} onClick={() => up("shape", o)} className={choice(f.shape === o)}>{o}</button>)}
            </div>
            <p className="label mt-6">Tiers</p>
            <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Tiers">
              {[1, 2, 3].map((t) => <button key={t} type="button" role="radio" aria-checked={f.tiers === t} onClick={() => up("tiers", t)} className={choice(f.tiers === t)}>{t} tier{t > 1 ? "s" : ""}</button>)}
            </div>
          </>)}
          {step === 4 && (<>
            <h2 className="font-serif text-3xl">Theme &amp; message</h2>
            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="theme" className="label">Theme or design idea</label>
                <textarea id="theme" rows={4} className={`input ${errors.theme ? "input-error" : ""}`} value={f.theme} onChange={(e) => up("theme", e.target.value)} placeholder="e.g. Pastel floral with gold accents, space theme, minimalist white…" aria-invalid={!!errors.theme} />
                <Err k="theme" />
              </div>
              <div>
                <label htmlFor="cmsg" className="label">Message on cake <span className="font-normal text-cocoa-500">(optional)</span></label>
                <input id="cmsg" className="input" maxLength={50} value={f.message} onChange={(e) => up("message", e.target.value)} placeholder="Happy Birthday Aanya" />
              </div>
            </div>
          </>)}
          {step === 5 && (<>
            <h2 className="font-serif text-3xl">Add a reference photo</h2>
            <p className="lead mt-2">Optional, but it helps us match your vision.</p>
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" id="ref" onChange={(e) => onFile(e.target.files?.[0])} />
            {f.reference ? (
              <div className="mt-6 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.reference} alt="Your uploaded reference" className="h-40 w-40 rounded-2xl object-cover shadow-soft" />
                <div className="space-y-2">
                  <button type="button" className="btn-outline btn-sm" onClick={() => fileRef.current?.click()}>Change photo</button><br />
                  <button type="button" className="text-sm underline" onClick={() => up("reference", "")}>Remove</button>
                </div>
              </div>
            ) : (
              <label htmlFor="ref" className="mt-6 grid cursor-pointer place-items-center rounded-3xl border-2 border-dashed border-cocoa/25 bg-cream p-10 text-center transition hover:border-gold">
                <span className="text-3xl" aria-hidden>📷</span>
                <span className="mt-2 font-medium">{uploading ? "Processing…" : "Tap to upload an image"}</span>
                <span className="text-sm text-cocoa-500">JPG or PNG. Preview only; you'll also send it on WhatsApp.</span>
              </label>
            )}
            <Err k="reference" />
          </>)}
          {step === 6 && (<>
            <h2 className="font-serif text-3xl">When do you need it?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cdate" className="label">Date</label>
                <input id="cdate" type="date" min={istDate(1)} className={`input ${errors.date ? "input-error" : ""}`} value={f.date} onChange={(e) => up("date", e.target.value)} aria-invalid={!!errors.date} />
                <Err k="date" />
                <p className="mt-1 text-xs text-cocoa-500">We recommend at least 48 hours' notice for custom designs.</p>
              </div>
              <div>
                <label htmlFor="cslot" className="label">Time slot</label>
                <select id="cslot" className={`input ${errors.slot ? "input-error" : ""}`} value={f.slot} onChange={(e) => up("slot", e.target.value)} aria-invalid={!!errors.slot}>
                  <option value="">Select a slot</option>{slots.map((s) => <option key={s}>{s}</option>)}
                </select>
                <Err k="slot" />
              </div>
            </div>
          </>)}
          {step === 7 && (<>
            <h2 className="font-serif text-3xl">Your details</h2>
            <div className="mt-6 space-y-4">
              {([["name", "Full name", "name"], ["phone", "Mobile / WhatsApp number", "tel"], ["email", "Email (optional)", "email"]] as const).map(([k, l, t]) => (
                <div key={k}>
                  <label htmlFor={`c-${k}`} className="label">{l}</label>
                  <input id={`c-${k}`} type={t === "email" ? "email" : "text"} inputMode={t === "tel" ? "tel" : undefined} autoComplete={t} className={`input ${errors[k] ? "input-error" : ""}`} value={f[k]} onChange={(e) => up(k, e.target.value)} aria-invalid={!!errors[k]} />
                  <Err k={k} />
                </div>
              ))}
            </div>
          </>)}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" className="btn-outline" onClick={() => { setErrors({}); setStep((s) => s - 1); }} disabled={step === 0}>Back</button>
          {step < stepNames.length - 1
            ? <button type="button" className="btn-primary px-8" onClick={next}>{step === 5 && !f.reference ? "Skip" : "Continue"}</button>
            : <button type="button" className="btn-blush px-8" onClick={submit}>Submit request</button>}
        </div>
      </div>

      <aside className="h-fit space-y-4 lg:sticky lg:top-28">
        <div className="card bg-gradient-to-br from-white to-blush-50 p-6">
          <p className="eyebrow">Estimated price</p>
          {est ? (<>
            <p className="mt-2 font-serif text-4xl" aria-live="polite">{inr(est.low)} – {inr(est.high)}</p>
            <p className="mt-1 text-sm text-cocoa-600">For {f.size.split(" (")[0]}, {f.tiers} tier{f.tiers > 1 ? "s" : ""}</p>
          </>) : <p className="mt-2 text-cocoa-600">Choose a size to see an estimate.</p>}
          <p className="mt-4 text-xs text-cocoa-500">An estimate only. Your final quote depends on design complexity and is confirmed on WhatsApp.</p>
        </div>
        <ul className="card space-y-1.5 p-6 text-sm">
          {[["Occasion", f.occasion], ["Flavour", f.flavour], ["Shape", f.shape], ["Date", f.date ? fmtDate(f.date) : ""]].map(([k, v]) => (
            <li key={k} className="flex justify-between gap-3"><span className="text-cocoa-500">{k}</span><span className="text-right font-medium">{v || "—"}</span></li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
