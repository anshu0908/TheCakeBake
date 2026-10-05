"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { cartWhatsAppMessage, inr, isGurugramPin, istDate, slots, waLink } from "@/lib/utils";
import { Coupon, Totals } from "@/components/CartSummary";
import SmartImage from "@/components/SmartImage";
import { PageHero, PasswordInput, WhatsAppIcon } from "@/components/ui";
import type { Order } from "@/lib/types";

type Pay = "UPI" | "Card" | "Cash on Delivery";
const payments: { id: Pay; label: string; sub: string }[] = [
  { id: "UPI", label: "UPI", sub: "GPay, PhonePe, Paytm" },
  { id: "Card", label: "Credit / Debit card", sub: "Visa, Mastercard, RuPay" },
  { id: "Cash on Delivery", label: "Cash on Delivery", sub: "Pay when it arrives" },
];

export default function CheckoutPage() {
  const { cart, ready, totals, placeOrder, placeWhatsAppOrder } = useStore();
  const router = useRouter();
  const [f, setF] = useState({ name: "", phone: "", email: "", address: "", pincode: "", date: "", slot: "", upi: "", card: "", exp: "", cvv: "" });
  const [pay, setPay] = useState<Pay>("UPI");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  // Prefill date/slot from the first cart item that has them
  useEffect(() => {
    const withDate = cart.find((c) => c.date);
    if (withDate) setF((x) => ({ ...x, date: x.date || withDate.date || "", slot: x.slot || withDate.slot || "" }));
  }, [cart]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((x) => ({ ...x, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a valid 10-digit mobile number.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "That email doesn't look right.";
    if (f.address.trim().length < 8) e.address = "Please enter the full delivery address.";
    if (!/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a 6-digit pincode.";
    else if (!isGurugramPin(f.pincode)) e.pincode = "Not serviceable. We deliver to Gurugram pincodes (1220xx).";
    if (!f.date) e.date = "Choose a delivery date.";
    if (!f.slot) e.slot = "Choose a time slot.";
    if (pay === "UPI" && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(f.upi)) e.upi = "Enter a valid UPI ID, e.g. name@upi.";
    if (pay === "Card") {
      if (f.card.replace(/\s/g, "").length < 15) e.card = "Enter a valid card number.";
      if (!/^\d{2}\/\d{2}$/.test(f.exp)) e.exp = "Use MM/YY.";
      if (!/^\d{3,4}$/.test(f.cvv)) e.cvv = "3 or 4 digits.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 1200)); // mock payment processing
    const o: Order = placeOrder({
      customer: { name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim() },
      address: f.address.trim(), pincode: f.pincode, deliveryDate: f.date, slot: f.slot, payment: pay,
    });
    router.push(`/order/${o.id}`);
  };

  const field = (k: keyof typeof f, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, hint?: string) => (
    <div>
      <label htmlFor={k} className="label">{label}</label>
      {props.type === "password"
        ? <PasswordInput id={k} value={f[k]} onChange={(v) => { setF((x) => ({ ...x, [k]: v })); setErrors((x) => ({ ...x, [k]: "" })); }} invalid={!!errors[k]} inputMode={props.inputMode} maxLength={props.maxLength} autoComplete={props.autoComplete} />
        : <input id={k} className={`input ${errors[k] ? "input-error" : ""}`} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} {...props} />}
      {hint && !errors[k] && <p className="mt-1 text-xs text-cocoa-500">{hint}</p>}
      {errors[k] && <p id={`${k}-err`} className="field-error">{errors[k]}</p>}
    </div>
  );

  if (!ready) return <><PageHero title="Checkout" /><p className="py-20 text-center text-cocoa-500">Loading…</p></>;
  if (cart.length === 0 && !busy) {
    return (
      <>
        <PageHero title="Checkout" />
        <div className="container-x py-20 text-center">
          <p className="font-serif text-3xl">Your cart is empty</p>
          <Link href="/menu" className="btn-primary mt-6">Browse the menu</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title="Checkout" />
      <form onSubmit={submit} noValidate className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <section className="card space-y-5 p-6 sm:p-8">
            <h2 className="font-serif text-2xl">Contact details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full name", { autoComplete: "name" })}
              {field("phone", "Mobile number", { inputMode: "tel", autoComplete: "tel", placeholder: "98XXXXXXXX" })}
            </div>
            {field("email", "Email (optional)", { type: "email", autoComplete: "email" })}
          </section>

          <section className="card space-y-5 p-6 sm:p-8">
            <h2 className="font-serif text-2xl">Delivery</h2>
            <div>
              <label htmlFor="address" className="label">Delivery address</label>
              <textarea id="address" rows={3} className={`input ${errors.address ? "input-error" : ""}`} value={f.address} onChange={set("address")} aria-invalid={!!errors.address} placeholder="House / flat no., street, sector, landmark" />
              {errors.address && <p className="field-error">{errors.address}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {field("pincode", "Pincode", { inputMode: "numeric", maxLength: 6, autoComplete: "postal-code", placeholder: "122001" })}
              {field("date", "Delivery date", { type: "date", min: istDate(0) })}
              <div>
                <label htmlFor="slot" className="label">Time slot</label>
                <select id="slot" className={`input ${errors.slot ? "input-error" : ""}`} value={f.slot} onChange={set("slot")} aria-invalid={!!errors.slot}>
                  <option value="">Select</option>
                  {slots.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.slot && <p className="field-error">{errors.slot}</p>}
              </div>
            </div>
          </section>

          <section className="card space-y-5 p-6 sm:p-8">
            <h2 className="font-serif text-2xl">Payment</h2>
            <div role="radiogroup" aria-label="Payment method" className="grid gap-3 sm:grid-cols-3">
              {payments.map((p) => (
                <label key={p.id} className={`cursor-pointer rounded-2xl border p-4 transition ${pay === p.id ? "border-cocoa bg-cream ring-2 ring-cocoa/10" : "border-cocoa/20 hover:border-cocoa/50"}`}>
                  <input type="radio" name="pay" className="sr-only" checked={pay === p.id} onChange={() => { setPay(p.id); setErrors({}); }} />
                  <span className="block font-semibold">{p.label}</span><span className="text-xs text-cocoa-500">{p.sub}</span>
                </label>
              ))}
            </div>
            {pay === "UPI" && field("upi", "UPI ID", { placeholder: "name@upi", autoComplete: "off" })}
            {pay === "Card" && (
              <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
                {field("card", "Card number", { inputMode: "numeric", placeholder: "1234 5678 9012 3456", autoComplete: "off" })}
                {field("exp", "Expiry", { placeholder: "MM/YY", maxLength: 5 })}
                {field("cvv", "CVV", { inputMode: "numeric", maxLength: 4, type: "password", autoComplete: "off" })}
              </div>
            )}
            {pay === "Cash on Delivery" && <p className="text-sm text-cocoa-600">Pay in cash or UPI to our delivery partner when your order arrives.</p>}
          </section>
        </div>

        <aside className="card h-fit space-y-6 p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <ul className="space-y-4">
            {cart.map((i) => (
              <li key={i.key} className="flex gap-3">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"><SmartImage src={i.image} alt={i.name} sizes="64px" /></span>
                <span className="min-w-0 flex-1 text-sm"><span className="block font-medium leading-snug">{i.name}</span><span className="text-cocoa-500">{i.size} × {i.qty}</span></span>
                <span className="text-sm font-semibold tabular-nums">{inr(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <Coupon />
          <Totals />
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" aria-hidden /> Processing…</>) : `Place order · ${inr(totals.total)}`}
          </button>
          <div className="relative text-center text-xs text-cocoa-500"><span className="relative z-10 bg-white px-2">or</span><span className="absolute inset-x-0 top-1/2 h-px bg-cocoa/10" /></div>
          <a href={waLink(cartWhatsAppMessage(cart, totals.subtotal))} onClick={() => placeWhatsAppOrder()} target="_blank" rel="noopener noreferrer" className="btn-wa w-full"><WhatsAppIcon className="h-4 w-4" /> Place order via WhatsApp</a>
        </aside>
      </form>
    </>
  );
}
