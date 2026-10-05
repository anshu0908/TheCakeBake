"use client";
import { useState } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { PasswordInput } from "@/components/ui";
import Dashboard from "./Dashboard";
import { OrdersTab, CustomTab, EnquiriesTab } from "./Tabs";
import ProductsTab from "./ProductsTab";

const tabs = ["Dashboard", "Orders", "Custom cakes", "Products", "Enquiries"] as const;
type Tab = (typeof tabs)[number];

function Login() {
  const { login } = useStore();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-16">
      <form onSubmit={(e) => { e.preventDefault(); if (!login(u, p)) setErr("Incorrect username or password."); }} className="card w-full max-w-sm space-y-5 p-8">
        <div className="text-center"><p className="eyebrow">Owner area</p><h1 className="font-serif text-3xl">Admin sign in</h1></div>
        <div><label htmlFor="u" className="label">Username</label><input id="u" className="input" value={u} onChange={(e) => { setU(e.target.value); setErr(""); }} autoComplete="username" /></div>
        <div><label htmlFor="p" className="label">Password</label><PasswordInput id="p" value={p} onChange={(v) => { setP(v); setErr(""); }} autoComplete="current-password" invalid={!!err} />
          {err && <p role="alert" className="field-error">{err}</p>}</div>
        <button className="btn-primary w-full">Sign in</button>
        <p className="rounded-xl bg-cream p-3 text-center text-xs text-cocoa-600">Demo login: <strong>{site.admin.user}</strong> / <strong>{site.admin.pass}</strong></p>
      </form>
    </section>
  );
}

export default function AdminApp() {
  const { ready, isAdmin, logout, resetDemo, orders, custom } = useStore();
  const [tab, setTab] = useState<Tab>("Dashboard");
  if (!ready) return <p className="py-32 text-center text-cocoa-500">Loading…</p>;
  if (!isAdmin) return <Login />;
  const badge = (t: Tab) => (t === "Custom cakes" ? custom.filter((c) => c.status === "new").length : t === "Orders" ? orders.filter((o) => o.status === "received").length : 0);
  return (
    <section className="container-x py-8 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><p className="eyebrow">Owner area</p><h1 className="font-serif text-3xl sm:text-4xl">Welcome back</h1></div>
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
