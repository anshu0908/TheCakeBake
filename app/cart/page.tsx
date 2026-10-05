"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { cartWhatsAppMessage, fmtDate, inr, waLink } from "@/lib/utils";
import { QtyControl } from "@/components/CartDrawer";
import { Coupon, Totals } from "@/components/CartSummary";
import SmartImage from "@/components/SmartImage";
import { PageHero, WhatsAppIcon } from "@/components/ui";

export default function CartPage() {
  const { cart, ready, setQty, removeFromCart, totals, placeWhatsAppOrder } = useStore();
  return (
    <>
      <PageHero title="Your cart" />
      <section className="container-x py-12">
        {!ready ? (
          <p className="py-20 text-center text-cocoa-500">Loading…</p>
        ) : cart.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-blush-100 text-3xl" aria-hidden>🧁</div>
            <p className="font-serif text-3xl">Your cart is empty</p>
            <p className="lead mt-2">Let's find something delicious.</p>
            <Link href="/menu" className="btn-primary mt-6">Browse the menu</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <ul className="card divide-y divide-cocoa/10 px-5 sm:px-8">
              {cart.map((i) => (
                <li key={i.key} className="flex gap-4 py-6 sm:gap-6">
                  <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28"><SmartImage src={i.image} alt={i.name} sizes="112px" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3"><h2 className="font-serif text-xl">{i.name}</h2><p className="font-semibold tabular-nums">{inr(i.price * i.qty)}</p></div>
                    <p className="text-sm text-cocoa-500">{i.size}{i.eggless ? " · Eggless" : ""} · {inr(i.price)} each</p>
                    {i.message && <p className="text-sm text-cocoa-500">Message: “{i.message}”</p>}
                    {i.date && <p className="text-sm text-cocoa-500">Delivery: {fmtDate(i.date)}, {i.slot}</p>}
                    <div className="mt-3 flex items-center justify-between">
                      <QtyControl qty={i.qty} onChange={(n) => setQty(i.key, n)} />
                      <button onClick={() => removeFromCart(i.key)} className="text-sm text-cocoa-500 underline underline-offset-2 hover:text-blush-700">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="card h-fit space-y-6 p-6 sm:p-8">
              <h2 className="font-serif text-2xl">Order summary</h2>
              <Coupon />
              <Totals />
              <Link href="/checkout" className="btn-primary w-full">Proceed to checkout</Link>
              <a href={waLink(cartWhatsAppMessage(cart, totals.subtotal))} onClick={() => placeWhatsAppOrder()} target="_blank" rel="noopener noreferrer" className="btn-wa w-full"><WhatsAppIcon className="h-4 w-4" /> Place order via WhatsApp</a>
              <Link href="/menu" className="block text-center text-sm underline underline-offset-4">Continue shopping</Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
