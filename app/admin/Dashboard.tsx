"use client";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { inr, istDate } from "@/lib/utils";

// Mock history so the 7-day chart looks alive before there are real orders (demo only).
const baseline = [4200, 6100, 3800, 7400];

export default function Dashboard({ goto }: { goto: (tab: string) => void }) {
  const { orders, custom } = useStore();

  const d = useMemo(() => {
    const today = istDate(0);
    const dayOf = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date(iso));
    const todays = orders.filter((o) => dayOf(o.createdAt) === today);
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = istDate(i - 6);
      const rev = orders.filter((o) => dayOf(o.createdAt) === date).reduce((a, o) => a + o.total, 0) + (i < 4 ? baseline[i] : 0);
      return { date, rev, label: new Date(date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short" }) };
    });
    const units = new Map<string, number>();
    orders.forEach((o) => o.items.forEach((i) => units.set(i.name, (units.get(i.name) ?? 0) + i.qty)));
    const top = [...units.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { todays, revenue: todays.reduce((a, o) => a + o.total, 0), days, top };
  }, [orders]);

  const pending = custom.filter((c) => c.status === "new").length;
  const maxRev = Math.max(...d.days.map((x) => x.rev), 1);
  const maxTop = Math.max(...d.top.map((x) => x[1]), 1);

  const kpis = [
    { l: "Orders today", v: String(d.todays.length), s: `${orders.length} total`, go: "Orders" },
    { l: "Revenue today", v: inr(d.revenue), s: "Demo figures", go: "Orders" },
    { l: "Pending custom requests", v: String(pending), s: `${custom.length} total`, go: "Custom cakes" },
    { l: "Awaiting action", v: String(orders.filter((o) => o.status === "received").length), s: "New orders", go: "Orders" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <button key={k.l} onClick={() => goto(k.go)} className="card p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lift">
            <p className="text-sm text-cocoa-500">{k.l}</p>
            <p className="mt-2 font-serif text-3xl sm:text-4xl">{k.v}</p>
            <p className="mt-1 text-xs text-cocoa-500">{k.s}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="card p-6">
          <h2 className="font-serif text-xl">Revenue, last 7 days</h2>
          <div className="mt-6 flex h-52 items-end gap-3" role="img" aria-label={`Revenue by day: ${d.days.map((x) => `${x.label} ${inr(x.rev)}`).join(", ")}`}>
            {d.days.map((x, i) => (
              <div key={x.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[11px] tabular-nums text-cocoa-500">{x.rev >= 1000 ? `${(x.rev / 1000).toFixed(1)}k` : x.rev}</span>
                <div className={`w-full rounded-t-lg ${i === 6 ? "bg-blush-600" : "bg-gold-400"}`} style={{ height: `${Math.max(4, (x.rev / maxRev) * 100)}%` }} />
                <span className="text-xs text-cocoa-600">{x.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="font-serif text-xl">Top products</h2>
          <ul className="mt-5 space-y-4">
            {d.top.map(([n, c]) => (
              <li key={n}>
                <div className="flex justify-between text-sm"><span>{n}</span><span className="tabular-nums text-cocoa-500">{c} sold</span></div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-cocoa/10"><div className="h-full rounded-full bg-gold" style={{ width: `${(c / maxTop) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between"><h2 className="font-serif text-xl">Latest orders</h2><button className="text-sm underline" onClick={() => goto("Orders")}>View all</button></div>
        <ul className="mt-4 divide-y divide-cocoa/10 text-sm">
          {orders.slice(0, 5).map((o) => (
            <li key={o.id} className="flex items-center justify-between gap-3 py-3"><span><strong>{o.id}</strong> · {o.customer.name}</span><span className="tabular-nums">{inr(o.total)}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
