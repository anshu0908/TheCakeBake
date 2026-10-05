"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { cartWhatsAppMessage, inr, waLink } from "@/lib/utils";
import SmartImage from "./SmartImage";
import { lockScroll } from "@/lib/scroll";
import { WhatsAppIcon } from "./ui";

export function QtyControl({ qty, onChange, small = false }: { qty: number; onChange: (n: number) => void; small?: boolean }) {
  const b = `grid ${small ? "h-8 w-8" : "h-10 w-10"} place-items-center rounded-full border border-cocoa/20 text-lg leading-none hover:bg-cocoa hover:text-cream`;
  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label="Quantity">
      <button type="button" className={b} onClick={() => onChange(qty - 1)} aria-label="Decrease quantity">−</button>
      <span className="w-6 text-center text-sm font-semibold tabular-nums" aria-live="polite">{qty}</span>
      <button type="button" className={b} onClick={() => onChange(qty + 1)} aria-label="Increase quantity">+</button>
    </div>
  );
}

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeFromCart, totals, placeWhatsAppOrder, ready } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    lockScroll(true);
    closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", esc);
    return () => { lockScroll(false); window.removeEventListener("keydown", esc); };
  }, [cartOpen, setCartOpen]);

  const remaining = Math.max(0, site.freeDeliveryAbove - (totals.subtotal - totals.discount));
  const pct = Math.min(100, ((totals.subtotal - totals.discount) / site.freeDeliveryAbove) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div className="fixed inset-0 z-[55]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Shopping cart">
          <button className="absolute inset-0 bg-cocoa/50" onClick={() => setCartOpen(false)} aria-label="Close cart" tabIndex={-1} />
          <motion.aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.32, ease: "easeOut" }}>
            <div className="flex items-center justify-between border-b border-cocoa/10 px-5 py-4">
              <h2 className="font-serif text-2xl">Your cart</h2>
              <button ref={closeRef} onClick={() => setCartOpen(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-cocoa/5" aria-label="Close cart">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            {!ready ? (
              <div className="flex-1 p-6 text-cocoa-500">Loading…</div>
            ) : cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-blush-100 text-3xl" aria-hidden>🧁</div>
                <p className="font-serif text-2xl">Your cart is empty</p>
                <p className="text-cocoa-600">Add something sweet. Our bestsellers are a good place to start.</p>
                <Link href="/menu" onClick={() => setCartOpen(false)} className="btn-primary">Browse the menu</Link>
              </div>
            ) : (
              <>
                <div className="border-b border-cocoa/10 px-5 py-3 text-sm">
                  {remaining > 0 ? <p>Add <strong>{inr(remaining)}</strong> more for free delivery</p> : <p className="font-medium text-emerald-700">You've unlocked free delivery 🎉</p>}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cocoa/10"><div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} /></div>
                </div>
                <ul data-lenis-prevent className="flex-1 divide-y divide-cocoa/10 overflow-auto px-5">
                  {cart.map((i) => (
                    <li key={i.key} className="flex gap-4 py-4">
                      <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl"><SmartImage src={i.image} alt={i.name} sizes="80px" /></span>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="font-medium leading-snug">{i.name}</p>
                          <p className="font-semibold tabular-nums">{inr(i.price * i.qty)}</p>
                        </div>
                        <p className="text-sm text-cocoa-500">{i.size}{i.eggless ? " · Eggless" : ""}</p>
                        {i.message && <p className="truncate text-sm text-cocoa-500">“{i.message}”</p>}
                        <div className="mt-2 flex items-center justify-between">
                          <QtyControl small qty={i.qty} onChange={(n) => setQty(i.key, n)} />
                          <button onClick={() => removeFromCart(i.key)} className="text-sm text-cocoa-500 underline underline-offset-2 hover:text-blush-700">Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 border-t border-cocoa/10 bg-white px-5 py-4">
                  <div className="flex justify-between text-lg font-semibold"><span>Subtotal</span><span>{inr(totals.subtotal)}</span></div>
                  <p className="text-xs text-cocoa-500">Delivery and coupons are applied at checkout.</p>
                  <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full">Checkout</Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/cart" onClick={() => setCartOpen(false)} className="btn-outline w-full">View cart</Link>
                    <a href={waLink(cartWhatsAppMessage(cart, totals.subtotal))} target="_blank" rel="noopener noreferrer" onClick={() => placeWhatsAppOrder()} className="btn-wa w-full"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
