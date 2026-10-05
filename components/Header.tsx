"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";
import { OpenBadge, WhatsAppIcon } from "./ui";
import SmartImage from "./SmartImage";
import { lockScroll } from "@/lib/scroll";

const nav = [
  { href: "/menu", label: "Cakes" },
  { href: "/custom-cake", label: "Custom Cake" },
  { href: "/gifting", label: "Gifting" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

function useLock(on: boolean) {
  useEffect(() => {
    if (!on) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [on]);
}

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setCartOpen, ready, wishlist } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setMenu(false); setSearch(false); }, [pathname]);
  useLock(menu);

  const active = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <div className="hidden bg-cocoa text-cream sm:block">
        <div className="container-x flex items-center justify-between py-2 text-[13px]">
          <span className="text-cream/85">Same-day &amp; scheduled delivery in Gurugram</span>
          <div className="flex items-center gap-5">
            <OpenBadge dark />
            <Link href="/admin" className="font-semibold text-gold-300 hover:text-white">Admin demo →</Link>
            <a href={`tel:${site.phoneTel}`} className="hover:text-gold-300">{site.phoneDisplay}</a>
          </div>
        </div>
      </div>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-cocoa/10 bg-cream/90 shadow-soft backdrop-blur-md" : "bg-cream"}`}>
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <Link href="/" className="flex shrink-0 flex-col leading-none whitespace-nowrap" aria-label={`${site.name} home`}>
            <span className="font-serif text-2xl font-semibold tracking-tight text-cocoa sm:text-[1.7rem]">{site.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 whitespace-nowrap xl:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
                className={`relative py-1 text-[15px] font-medium transition hover:text-blush-700 ${active(n.href) ? "text-blush-700" : "text-cocoa"}`}>
                {n.label}
                {active(n.href) && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-blush-700" />}
              </Link>
            ))}
            <Link href="/admin" className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold-300/20 px-3.5 py-1.5 text-[13px] font-semibold text-gold-700 transition hover:bg-gold-300/40">
              <span aria-hidden>⚙</span> Admin Demo
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setSearch(true)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-cocoa/5" aria-label="Search">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" /></svg>
            </button>
            <Link href="/menu?wish=1" className="relative hidden h-11 w-11 place-items-center rounded-full hover:bg-cocoa/5 sm:grid" aria-label={`Wishlist${ready ? `, ${wishlist.length} items` : ""}`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.600-7 10-7 10z" strokeLinejoin="round" /></svg>
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-cocoa/5" aria-label={`Open cart${ready ? `, ${cartCount} items` : ""}`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h14l-1.200 11H6.200L5 8zM9 8V6a3 3 0 016 0v2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {ready && cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-blush-700 px-1 text-[11px] font-bold text-white">{cartCount}</span>
              )}
            </button>
            <a href={site.whatsappUrl + "?text=" + encodeURIComponent("Hi The Cake Bake! I'd like to order a cake.")} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm ml-1 hidden md:inline-flex">
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
            <button onClick={() => setMenu(true)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-cocoa/5 xl:hidden" aria-label="Open menu" aria-expanded={menu}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="fixed inset-0 z-50 xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-cocoa/50" onClick={() => setMenu(false)} aria-label="Close menu" />
            <motion.nav data-lenis-prevent aria-label="Mobile" className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-cream p-6 shadow-lift"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }}>
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-xl font-semibold">{site.name}</span>
                <button onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-cocoa/5" aria-label="Close menu">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              <ul className="flex-1 space-y-1">
                {[{ href: "/", label: "Home" }, ...nav, { href: "/track", label: "Track order" }, { href: "/admin", label: "Admin Demo" }].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className={`block rounded-xl px-3 py-3 font-serif text-2xl ${active(n.href) ? "text-blush-700" : "text-cocoa"}`}>{n.label}</Link>
                  </li>
                ))}
              </ul>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa w-full"><WhatsAppIcon /> Order on WhatsApp</a>
              <div className="mt-4 text-center"><OpenBadge /></div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { products } = useStore();
  const router = useRouter();
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useLock(true);
  useEffect(() => {
    ref.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return products.filter((p) => p.tags.includes("Bestseller")).slice(0, 5);
    return products.filter((p) => (p.name + " " + p.short).toLowerCase().includes(t)).slice(0, 6);
  }, [q, products]);

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search">
      <button className="absolute inset-0 bg-cocoa/50" onClick={onClose} aria-label="Close search" />
      <div className="relative mx-auto mt-16 w-[calc(100%-2rem)] max-w-xl rounded-3xl bg-cream p-4 shadow-lift sm:mt-24">
        <form onSubmit={(e) => { e.preventDefault(); router.push(`/menu?q=${encodeURIComponent(q)}`); onClose(); }} className="flex gap-2">
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} className="input" placeholder="Search cakes, tubs, hampers…" aria-label="Search the menu" />
          <button className="btn-primary" type="submit">Search</button>
        </form>
        <p className="eyebrow mb-2 mt-5 px-1">{q ? "Results" : "Popular right now"}</p>
        {results.length === 0 ? (
          <p className="px-1 py-4 text-sm text-cocoa-600">No matches for “{q}”. Try “chocolate” or “rose”.</p>
        ) : (
          <ul data-lenis-prevent className="max-h-[50vh] space-y-1 overflow-auto">
            {results.map((p) => (
              <li key={p.id}>
                <Link href={`/menu/${p.slug}`} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-white">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"><SmartImage src={p.image} alt={p.name} sizes="56px" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{p.name}</span>
                    <span className="block truncate text-sm text-cocoa-500">from {inr(p.sizes[0].price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
