"use client";
import { useState } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";

export function Coupon() {
  const { coupon, applyCoupon, clearCoupon, notify } = useStore();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <div>
      <label htmlFor="coupon" className="label">Coupon code</label>
      {coupon ? (
        <div className="flex items-center justify-between rounded-xl border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-sm">
          <span className="font-semibold text-emerald-800">{coupon} applied</span>
          <button onClick={() => { clearCoupon(); setMsg(null); notify("Coupon removed"); }} className="underline">Remove</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); const r = applyCoupon(code); setMsg({ ok: r.ok, text: r.message }); if (r.ok) setCode(""); }} className="flex gap-2">
          <input id="coupon" className="input uppercase" value={code} onChange={(e) => setCode(e.target.value)} placeholder="WELCOME10" />
          <button className="btn-outline" type="submit">Apply</button>
        </form>
      )}
      {msg && <p role="status" className={msg.ok ? "mt-1.5 text-[13px] font-medium text-emerald-700" : "field-error"}>{msg.text}</p>}
    </div>
  );
}

export function Totals() {
  const { totals, coupon } = useStore();
  const row = "flex justify-between";
  return (
    <dl className="space-y-2 text-[15px]">
      <div className={row}><dt className="text-cocoa-600">Subtotal</dt><dd className="tabular-nums">{inr(totals.subtotal)}</dd></div>
      {totals.discount > 0 && <div className={`${row} text-emerald-700`}><dt>Discount ({coupon})</dt><dd className="tabular-nums">−{inr(totals.discount)}</dd></div>}
      <div className={row}><dt className="text-cocoa-600">Delivery</dt><dd className="tabular-nums">{totals.deliveryFee === 0 ? "Free" : inr(totals.deliveryFee)}</dd></div>
      {totals.deliveryFee > 0 && <p className="text-xs text-cocoa-500">Free delivery on orders above {inr(site.freeDeliveryAbove)}</p>}
      <div className={`${row} border-t border-cocoa/10 pt-3 text-xl font-semibold`}><dt>Total</dt><dd className="tabular-nums">{inr(totals.total)}</dd></div>
    </dl>
  );
}
