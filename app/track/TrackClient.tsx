"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { statusSteps } from "@/lib/types";
import { fmtDate, inr } from "@/lib/utils";
import { site } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui";
import type { OrderStatus } from "@/lib/types";

const stageNotes: Record<OrderStatus, string> = {
  received: "We have your order and the delivery slot you chose.",
  baking: "Your cake is being baked and decorated by hand.",
  out: "It has left the shop. Keep your phone handy.",
  delivered: "Handed over at your address.",
};

export default function TrackClient() {
  const sp = useSearchParams();
  const { orders, ready } = useStore();
  const [input, setInput] = useState(sp.get("id") ?? "");
  const [query, setQuery] = useState(sp.get("id") ?? "");
  const [touched, setTouched] = useState(!!sp.get("id"));

  const norm = query.trim().toUpperCase().replace(/^TCB-?/, "");
  const order = orders.find((o) => o.id.replace("TCB-", "") === norm);
  const idx = order ? statusSteps.findIndex((s) => s.id === order.status) : -1;

  return (
    <section className="container-x py-12 sm:py-16"><div className="max-w-4xl">
      <form onSubmit={(e) => { e.preventDefault(); setQuery(input); setTouched(true); }} className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="oid" className="sr-only">Order ID</label>
          <input id="oid" name="order-id" className="input" placeholder="e.g. TCB-10482…" autoComplete="off" spellCheck={false} autoCapitalize="characters" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button className="btn-primary" type="submit">Track order</button>
      </form>
      <p className="mt-2 text-sm text-cocoa-500">Try <button type="button" className="tap-link underline underline-offset-2 hover:text-blush-700" onClick={() => { setInput("TCB-10481"); setQuery("TCB-10481"); setTouched(true); }}>TCB-10481</button> to see a sample.</p>

      <div className="mt-10" aria-live="polite">
        {!ready ? null : touched && !order ? (
          <div className="card p-8 text-center">
            <p className="font-serif text-2xl">We couldn’t find that order</p>
            <p className="lead mt-2">Check the ID (it looks like TCB-10482) and try again.</p>
          </div>
        ) : order ? (
          <div className="card p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="term">Order</p><p className="font-serif text-3xl">{order.id}</p></div>
              <p className="text-sm text-cocoa-600">Delivering {fmtDate(order.deliveryDate)}<br />{order.slot}</p>
            </div>
            <ol className="mt-10 grid grid-cols-4 gap-2">
              {statusSteps.map((s, i) => {
                const done = i <= idx;
                return (
                  <li key={s.id} className="relative text-center" aria-current={i === idx ? "step" : undefined}>
                    {i > 0 && <span className={`absolute right-1/2 top-5 h-0.5 w-full ${i <= idx ? "bg-blush-700" : "bg-cocoa/15"}`} aria-hidden />}
                    <span className={`relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border-2 text-sm font-bold ${done ? "border-blush-700 bg-blush-700 text-white" : "border-cocoa/20 bg-white text-cocoa-400"}`}>{done ? "✓" : i + 1}</span>
                    <span className={`mt-3 block text-xs font-medium sm:text-sm ${done ? "text-cocoa" : "text-cocoa-400"}`}>{s.label}</span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 rounded-card bg-cream p-4 text-center text-sm">
              {order.status === "received" && "We’ve received your order and will begin baking shortly."}
              {order.status === "baking" && "Your cake is in the oven. Baked and decorated by hand."}
              {order.status === "out" && "Your order is on its way. Keep your phone handy."}
              {order.status === "delivered" && "Delivered. We hope you enjoy every bite!"}
            </p>
            <ul className="mt-6 divide-y divide-cocoa/10 text-sm">
              {order.items.map((i) => <li key={i.key} className="flex justify-between py-2"><span>{i.name} ({i.size}) × {i.qty}</span><span className="tabular-nums">{inr(i.price * i.qty)}</span></li>)}
              <li className="flex justify-between py-2 font-semibold"><span>Total</span><span className="tabular-nums">{inr(order.total)}</span></li>
            </ul>
          </div>
        ) : null}
      </div>

      {/* Before anyone searches: what each status means, then where to go without an ID */}
      {!order && (
        <div className="mt-14 grid gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:gap-12">
          <div>
            <h2 className="h-title">What each status means</h2>
            <ol className="mt-5 border-t border-cocoa/15">
              {statusSteps.map((s, i) => (
                <li key={s.id} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-cocoa/15 py-4">
                  <span className="font-serif text-2xl leading-none text-blush-700 tabular-nums" aria-hidden="true">{i + 1}</span>
                  <span><span className="block font-semibold">{s.label}</span><span className="mt-1 block text-sm text-cocoa-600">{stageNotes[s.id]}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="sm:pt-1">
            <h2 className="h-title">No order ID?</h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa-600">It’s on your confirmation screen and in the WhatsApp message you sent. Or message us the phone number you ordered with and we’ll look it up.</p>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm mt-5"><WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp</a>
          </div>
        </div>
      )}
    </div></section>
  );
}
