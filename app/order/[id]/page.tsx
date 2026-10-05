"use client";
import Link from "next/link";
import { use } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { fmtDate, inr, orderWhatsAppMessage, waLink } from "@/lib/utils";
import SmartImage from "@/components/SmartImage";
import { WhatsAppIcon } from "@/components/ui";

export default function OrderConfirmation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders, ready } = useStore();
  const o = orders.find((x) => x.id === id);

  if (!ready) return <p className="py-32 text-center text-cocoa-500">Loading…</p>;
  if (!o) {
    return (
      <div className="container-x py-32 text-center">
        <p className="font-serif text-4xl">Order not found</p>
        <p className="lead mt-2">We couldn't find order {id} on this device.</p>
        <Link href="/track" className="btn-primary mt-6">Track an order</Link>
      </div>
    );
  }
  return (
    <section className="container-x max-w-3xl py-14 sm:py-20">
      <div className="text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl text-emerald-700" aria-hidden>✓</div>
        <p className="eyebrow mt-6">Order confirmed</p>
        <h1 className="h-display mt-2 text-4xl sm:text-5xl">Thank you, {o.customer.name.split(" ")[0]}!</h1>
        <p className="lead mt-3">Your order is in. We'll start baking soon.</p>
        <p className="mx-auto mt-6 inline-block rounded-full border border-gold/40 bg-white px-6 py-3 font-semibold tracking-wide">Order ID: {o.id}</p>
      </div>

      <div className="card mt-10 space-y-6 p-6 sm:p-8">
        <ul className="divide-y divide-cocoa/10">
          {o.items.map((i) => (
            <li key={i.key} className="flex gap-4 py-4 first:pt-0">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"><SmartImage src={i.image} alt={i.name} sizes="64px" /></span>
              <span className="flex-1 text-sm"><span className="block font-medium">{i.name}</span><span className="text-cocoa-500">{i.size}{i.eggless ? " · Eggless" : ""} × {i.qty}</span>{i.message && <span className="block text-cocoa-500">“{i.message}”</span>}</span>
              <span className="font-semibold tabular-nums">{inr(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-1.5 border-t border-cocoa/10 pt-4 text-[15px]">
          <div className="flex justify-between"><dt className="text-cocoa-600">Subtotal</dt><dd>{inr(o.subtotal)}</dd></div>
          {o.discount > 0 && <div className="flex justify-between text-emerald-700"><dt>Discount ({o.coupon})</dt><dd>−{inr(o.discount)}</dd></div>}
          <div className="flex justify-between"><dt className="text-cocoa-600">Delivery</dt><dd>{o.deliveryFee ? inr(o.deliveryFee) : "Free"}</dd></div>
          <div className="flex justify-between pt-2 text-xl font-semibold"><dt>Total</dt><dd>{inr(o.total)}</dd></div>
        </dl>
        <div className="grid gap-4 border-t border-cocoa/10 pt-5 text-sm sm:grid-cols-3">
          <div><p className="eyebrow mb-1">Deliver on</p><p>{fmtDate(o.deliveryDate)}<br />{o.slot}</p></div>
          <div><p className="eyebrow mb-1">Address</p><p>{o.address}<br />{o.pincode}</p></div>
          <div><p className="eyebrow mb-1">Payment</p><p>{o.payment}</p></div>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={`/track?id=${o.id}`} className="btn-primary">Track order</Link>
        <a href={waLink(orderWhatsAppMessage(o))} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Message us on WhatsApp</a>
        <Link href="/menu" className="btn-outline">Continue shopping</Link>
      </div>
      <p className="mt-6 text-center text-sm text-cocoa-500">Questions? Call us on <a className="underline" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>.</p>
    </section>
  );
}
