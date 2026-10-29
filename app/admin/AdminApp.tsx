"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Dashboard from "./Dashboard";
import { OrdersTab, CustomTab, EnquiriesTab } from "./Tabs";
import ProductsTab from "./ProductsTab";

const tabs = ["Dashboard", "Orders", "Custom cakes", "Products", "Enquiries"] as const;
type Tab = (typeof tabs)[number];

export default function AdminApp() {
  const { ready, isAdmin, logout, resetDemo, orders, custom } = useStore();
  const [tab, setTab] = useState<Tab>("Dashboard");
  const router = useRouter();
  // Signed-out visitors go to the Admin Login page (a browser-only demo session; see app/admin/login).
  useEffect(() => { if (ready && !isAdmin) router.replace("/admin/login"); }, [ready, isAdmin, router]);
  if (!ready || !isAdmin) return <p role="status" className="py-32 text-center text-cocoa-600">Loading…</p>;
  const badge = (t: Tab) => (t === "Custom cakes" ? custom.filter((c) => c.status === "new").length : t === "Orders" ? orders.filter((o) => o.status === "received").length : 0);
  return (
    <section className="container-x py-8 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-serif text-3xl sm:text-4xl">Welcome back</h1><p className="meta mt-1">Owner area</p></div>
        <div className="flex gap-2">
          <button className="btn-outline btn-sm" onClick={() => { if (confirm("Reset all demo data (orders, requests, products, cart)?")) resetDemo(); }}>Reset demo data</button>
          <button className="btn-primary btn-sm" onClick={logout}>Sign out</button>
        </div>
      </div>
      <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`chip shrink-0 ${tab === t ? "chip-on" : ""}`}>
            {t}{badge(t) > 0 && <span className={`rounded-full px-1.5 text-[11px] font-bold ${tab === t ? "bg-cream text-cocoa" : "bg-blush-700 text-white"}`}>{badge(t)}</span>}
          </button>
        ))}
      </div>
      {tab === "Dashboard" && <Dashboard goto={(t) => setTab(t as Tab)} />}
      {tab === "Orders" && <OrdersTab />}
      {tab === "Custom cakes" && <CustomTab />}
      {tab === "Products" && <ProductsTab />}
      {tab === "Enquiries" && <EnquiriesTab />}
    </section>
  );
}
