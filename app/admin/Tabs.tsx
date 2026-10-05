"use client";
import { useState } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { statusSteps, type OrderStatus } from "@/lib/types";
import { fmtDate, fmtDateTime, inr, waLink } from "@/lib/utils";

const waPhone = (p: string) => `https://wa.me/91${p.replace(/\D/g, "").slice(-10)}`;

const statusColor: Record<OrderStatus, string> = {
  received: "bg-blush-100 text-blush-700", baking: "bg-gold-300/50 text-gold-700", out: "bg-sky-100 text-sky-800", delivered: "bg-emerald-100 text-emerald-800",
};

export function OrdersTab() {
  const { orders, setOrderStatus, notify } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [open, setOpen] = useState<string | null>(null);
  const t = q.trim().toLowerCase();
  const list = orders.filter((o) => (status === "all" || o.status === status) && (!t || (o.id + o.customer.name + o.customer.phone).toLowerCase().includes(t)));
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="oq">Search orders</label>
        <input id="oq" className="input flex-1" placeholder="Search by order ID, name or phone" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="sr-only" htmlFor="os">Filter by status</label>
        <select id="os" className="input sm:!w-52" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="all">All statuses</option>{statusSteps.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      {list.length === 0 ? <p className="card p-10 text-center text-cocoa-600">No orders match your search.</p> : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-cocoa/10 text-xs uppercase tracking-wider text-cocoa-500"><tr>{["Order", "Customer", "Items", "Delivery", "Total", "Status"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-cocoa/10">
              {list.map((o) => (
                <tr key={o.id} className="align-top">
                  <td className="px-4 py-3"><button className="font-semibold underline-offset-2 hover:underline" onClick={() => setOpen(open === o.id ? null : o.id)} aria-expanded={open === o.id}>{o.id}</button><p className="text-xs text-cocoa-500">{fmtDateTime(o.createdAt)}</p></td>
                  <td className="px-4 py-3">{o.customer.name}<p className="text-xs text-cocoa-500">{o.customer.phone}</p></td>
                  <td className="px-4 py-3">
                    {o.items.map((i) => <p key={i.key}>{i.name} <span className="text-cocoa-500">({i.size}) ×{i.qty}</span></p>)}
                    {open === o.id && <p className="mt-2 rounded-lg bg-cream p-2 text-xs">{o.address} {o.pincode} · {o.payment}{o.items.some((i) => i.message) ? ` · “${o.items.find((i) => i.message)?.message}”` : ""}</p>}
                  </td>
                  <td className="px-4 py-3">{fmtDate(o.deliveryDate)}<p className="text-xs text-cocoa-500">{o.slot}</p></td>
                  <td className="px-4 py-3 tabular-nums">{inr(o.total)}</td>
                  <td className="px-4 py-3">
                    <label className="sr-only" htmlFor={`st-${o.id}`}>Status for {o.id}</label>
                    <select id={`st-${o.id}`} value={o.status} onChange={(e) => { setOrderStatus(o.id, e.target.value as OrderStatus); notify(`${o.id} marked ${statusSteps.find((s) => s.id === e.target.value)?.label}`); }} className={`select-pill rounded-full border-0 px-3 py-1.5 text-xs font-semibold ${statusColor[o.status]}`}>
                      {statusSteps.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-cocoa-500">Changing a status here updates the customer's tracking page instantly.</p>
    </div>
  );
}

export function CustomTab() {
  const { custom, setCustomStatus } = useStore();
  if (custom.length === 0) return <p className="card p-10 text-center text-cocoa-600">No custom cake requests yet.</p>;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {custom.map((c) => {
        const msg = `Hi ${c.name}, this is ${site.name} about your custom cake request ${c.id} (${c.occasion}, ${c.size}, ${c.tiers} tier). Estimated ${inr(c.estLow)} - ${inr(c.estHigh)}. Could you share a few more details so we can confirm your quote?`;
        return (
          <article key={c.id} className="card p-6">
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-semibold">{c.id} · {c.name}</p><p className="text-sm text-cocoa-500">{fmtDateTime(c.createdAt)} · {c.phone}</p></div>
              <select aria-label={`Status for ${c.id}`} value={c.status} onChange={(e) => setCustomStatus(c.id, e.target.value as typeof c.status)} className="select-pill rounded-full border border-cocoa/20 bg-white px-3 py-1.5 text-xs font-semibold capitalize">
                <option value="new">New</option><option value="quoted">Quoted</option><option value="confirmed">Confirmed</option>
              </select>
            </div>
            <div className="mt-4 flex gap-4">
              {c.reference && (/* eslint-disable-next-line @next/next/no-img-element */ <img src={c.reference} alt={`Reference for ${c.id}`} className="h-28 w-28 shrink-0 rounded-2xl object-cover" />)}
              <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {[["Occasion", c.occasion], ["Flavour", c.flavour], ["Size", c.size], ["Tiers", `${c.tiers} · ${c.shape}`], ["Theme", c.theme], ["Message", c.message || "—"], ["Needed", `${fmtDate(c.date)}, ${c.slot}`], ["Estimate", `${inr(c.estLow)} - ${inr(c.estHigh)}`]].map(([k, v]) => (
                  <div key={k} className="contents"><dt className="text-cocoa-500">{k}</dt><dd className="font-medium">{v}</dd></div>
                ))}
              </dl>
            </div>
            <a href={`${waPhone(c.phone)}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm mt-5">Reply on WhatsApp</a>
          </article>
        );
      })}
    </div>
  );
}

export function EnquiriesTab() {
  const { enquiries } = useStore();
  if (enquiries.length === 0) return <p className="card p-10 text-center text-cocoa-600">No contact or gifting enquiries yet. Submissions from the Contact and Gifting pages appear here.</p>;
  return (
    <ul className="space-y-4">
      {enquiries.map((e) => (
        <li key={e.id} className="card p-5 text-sm">
          <p className="font-semibold">{e.name} <span className="rounded-full bg-cream px-2 py-0.5 text-xs capitalize">{e.kind}</span></p>
          <p className="text-cocoa-500">{fmtDateTime(e.createdAt)} · {e.phone}{e.email ? ` · ${e.email}` : ""}</p>
          <p className="mt-2">{e.details}</p>
          <a className="btn-wa btn-sm mt-3" target="_blank" rel="noopener noreferrer" href={`${waPhone(e.phone)}?text=${encodeURIComponent(`Hi ${e.name}, thanks for contacting ${site.name}.`)}`}>Reply on WhatsApp</a>
        </li>
      ))}
    </ul>
  );
}
