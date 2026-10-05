"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { reviews } from "@/data/reviews";
import { useStore } from "@/lib/store";
import { inr, isGurugramPin, istDate, slots } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import { Stars } from "@/components/ui";
import { QtyControl } from "@/components/CartDrawer";
import Reveal from "@/components/Reveal";

export default function ProductView({ slug }: { slug: string }) {
  const { products, ready, addToCart, wishlist, toggleWish, notify } = useStore();
  const p = products.find((x) => x.slug === slug);
  const [img, setImg] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [eggless, setEggless] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinState, setPinState] = useState<"idle" | "ok" | "bad">("idle");
  const [errors, setErrors] = useState<{ date?: string; slot?: string; pin?: string }>({});

  if (!ready) return <div className="container-x py-32 text-center text-cocoa-500">Loading…</div>;
  if (!p) {
    return (
      <div className="container-x py-32 text-center">
        <p className="font-serif text-4xl">We couldn't find that item</p>
        <Link href="/menu" className="btn-primary mt-6">Back to the menu</Link>
      </div>
    );
  }

  const size = p.sizes[Math.min(sizeIdx, p.sizes.length - 1)];
  const related = products.filter((x) => x.category === p.category && x.id !== p.id && x.inStock).concat(products.filter((x) => x.category !== p.category && x.tags.includes("Bestseller") && x.id !== p.id)).slice(0, 4);
  const wished = wishlist.includes(p.id);

  const checkPin = () => {
    if (!/^\d{6}$/.test(pin.trim())) { setPinState("idle"); setErrors((e) => ({ ...e, pin: "Enter a 6-digit pincode." })); return false; }
    setErrors((e) => ({ ...e, pin: undefined }));
    const ok = isGurugramPin(pin);
    setPinState(ok ? "ok" : "bad");
    return ok;
  };

  const add = () => {
    const err: typeof errors = {};
    if (!date) err.date = "Please choose a delivery date.";
    if (!slot) err.slot = "Please choose a time slot.";
    if (pin && !checkPin()) err.pin = "We don't deliver to that pincode yet.";
    setErrors(err);
    if (Object.keys(err).length) return;
    addToCart({ productId: p.id, name: p.name, image: p.image, size: size.label, price: size.price, eggless, message: message.trim() || undefined, date, slot, qty });
  };

  return (
    <>
      <div className="container-x pt-6 text-sm text-cocoa-500">
        <Link href="/menu" className="hover:text-blush-700">Menu</Link> / <Link href={`/menu?cat=${p.category}`} className="hover:text-blush-700 capitalize">{p.category === "cupcakes" ? "Cupcakes & Pastries" : p.category === "tubs" ? "Cake Tubs" : p.category === "dry" ? "Dry Cakes" : p.category === "hampers" ? "Hampers" : "Cakes"}</Link> / <span className="text-cocoa">{p.name}</span>
      </div>
      <section className="container-x grid gap-10 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream-200 shadow-soft">
            <SmartImage src={p.gallery[img] ?? p.image} alt={`${p.name}, view ${img + 1}`} priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {p.gallery.slice(0, 3).map((g, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} aria-pressed={img === i} className={`relative aspect-square overflow-hidden rounded-2xl border-2 ${img === i ? "border-cocoa" : "border-transparent"}`}>
                <SmartImage src={g} alt={`${p.name} thumbnail ${i + 1}`} sizes="160px" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => <span key={t} className="rounded-full bg-gold-300/40 px-3 py-1 text-xs font-semibold text-gold-700">{t}</span>)}
            {p.eggless && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Eggless available</span>}
          </div>
          <h1 className="h-display mt-3 text-4xl sm:text-5xl">{p.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm"><Stars n={5} /><span className="text-cocoa-600">{site.rating} · {site.reviewCount.toLocaleString("en-IN")} Google reviews of our bakery</span></div>
          <p className="mt-5 text-3xl font-semibold tabular-nums">{inr(size.price)}</p>
          <p className="lead mt-4">{p.description}</p>

          <fieldset className="mt-8">
            <legend className="label">Size / weight</legend>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s, i) => (
                <button key={s.label} type="button" aria-pressed={i === sizeIdx} onClick={() => setSizeIdx(i)} className={`chip ${i === sizeIdx ? "chip-on" : ""}`}>{s.label} · {inr(s.price)}</button>
              ))}
            </div>
          </fieldset>

          {p.eggless && (
            <label className="mt-6 flex cursor-pointer items-center gap-3">
              <input type="checkbox" className="h-5 w-5 accent-[#3b2418]" checked={eggless} onChange={(e) => setEggless(e.target.checked)} />
              <span className="text-sm font-medium">Make it eggless</span>
            </label>
          )}

          {p.messageOnCake && (
            <div className="mt-6">
              <label htmlFor="msg" className="label">Message on cake <span className="font-normal text-cocoa-500">(optional)</span></label>
              <input id="msg" className="input" maxLength={40} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. Happy Birthday Riya" />
              <p className="mt-1 text-xs text-cocoa-500">{message.length}/40 characters</p>
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="label">Delivery date</label>
              <input id="date" type="date" min={istDate(0)} className={`input ${errors.date ? "input-error" : ""}`} value={date} onChange={(e) => { setDate(e.target.value); setErrors((x) => ({ ...x, date: undefined })); }} aria-invalid={!!errors.date} aria-describedby={errors.date ? "date-err" : undefined} />
              {errors.date && <p id="date-err" className="field-error">{errors.date}</p>}
            </div>
            <div>
              <label htmlFor="slot" className="label">Time slot</label>
              <select id="slot" className={`input ${errors.slot ? "input-error" : ""}`} value={slot} onChange={(e) => { setSlot(e.target.value); setErrors((x) => ({ ...x, slot: undefined })); }} aria-invalid={!!errors.slot}>
                <option value="">Select a slot</option>
                {slots.map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.slot && <p className="field-error">{errors.slot}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="pin" className="label">Check delivery to your pincode</label>
            <div className="flex gap-2">
              <input id="pin" inputMode="numeric" maxLength={6} className={`input ${errors.pin ? "input-error" : ""}`} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setPinState("idle"); }} placeholder="e.g. 122001" />
              <button type="button" onClick={checkPin} className="btn-outline">Check</button>
            </div>
            <div aria-live="polite">
              {errors.pin && <p className="field-error">{errors.pin}</p>}
              {pinState === "ok" && <p className="mt-1.5 text-[13px] font-semibold text-emerald-700">✓ Delivery available to {pin}</p>}
              {pinState === "bad" && <p className="field-error">Not serviceable at {pin} right now. Call or WhatsApp us and we'll try to help.</p>}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyControl qty={qty} onChange={(n) => setQty(Math.max(1, n))} />
            <button onClick={add} disabled={!p.inStock} className="btn-primary flex-1 sm:flex-none sm:px-10">{p.inStock ? `Add to cart · ${inr(size.price * qty)}` : "Sold out"}</button>
            <button onClick={() => { toggleWish(p.id); notify(wished ? "Removed from wishlist" : "Saved to wishlist"); }} aria-pressed={wished} aria-label="Toggle wishlist" className="grid h-12 w-12 place-items-center rounded-full border border-cocoa/20 hover:border-cocoa">
              <svg viewBox="0 0 24 24" className={`h-5 w-5 ${wished ? "fill-blush-600 text-blush-600" : ""}`} fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.400-7-10a4 4 0 017-2.600A4 4 0 0119 10c0 5.600-7 10-7 10z" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-cocoa-600">{site.services.map((s) => <li key={s}>✓ {s}</li>)}</ul>
        </div>
      </section>

      <section className="border-t border-cocoa/10 bg-white py-14">
        <div className="container-x">
          <h2 className="h-section mb-8">What customers say</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {reviews.filter((r) => r.rating).map((r) => (
              <figure key={r.id} className="rounded-3xl border border-cocoa/10 bg-cream p-6">
                <Stars n={r.rating!} />
                <blockquote className="mt-3 leading-relaxed">“{r.short}”</blockquote>
                <figcaption className="mt-3 text-sm text-cocoa-500">{r.author} · Google review</figcaption>
              </figure>
            ))}
          </div>
          <Link href="/reviews" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">Read all reviews</Link>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="h-section mb-10">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((r, i) => <Reveal key={r.id} delay={i * 0.05}><ProductCard p={r} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  );
}
