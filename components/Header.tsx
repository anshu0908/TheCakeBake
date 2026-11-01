"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";
import { OpenBadge, WhatsAppIcon } from "./ui";
import SmartImage from "./SmartImage";
import { lockScroll } from "@/lib/scroll";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/custom-cake", label: "Custom cake" },
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
      <div className="on-dark hidden bg-cocoa text-cream sm:block">
        <div className="container-x flex h-9 items-center justify-between text-[13px]">
          <span className="text-cream/85">Same-day &amp; scheduled delivery in Gurugram</span>
          <div className="flex items-center gap-5">
            <OpenBadge dark />
            <a href={`tel:${site.phoneTel}`} className="tabular-nums transition-colors hover:text-gold-300">{site.phoneDisplay}</a>
          </div>
        </div>
      </div>
      <header className={`sticky top-0 z-40 bg-cream transition-[box-shadow] duration-300 ${scrolled ? "shadow-[0_1px_0_rgb(var(--rgb-cocoa)/0.08)]" : ""}`}>
        <div className="container-x flex h-[76px] items-center justify-between gap-6 sm:h-[96px]">
          <Link href="/" className="shrink-0 rounded-md" aria-label={`${site.name} home`}>
            <Image src="/brand/logo-mark.png" alt={site.name} width={549} height={495} priority className="h-[62px] w-auto sm:h-[80px]" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 whitespace-nowrap xl:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
                className={`relative py-1 text-[15px] font-semibold transition-colors hover:text-blush-700 ${active(n.href) ? "text-blush-700" : "text-cocoa"}`}>
                {n.label}
                {active(n.href) && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blush-700" />}
              </Link>
            ))}
            <Link href="/admin/login" aria-current={pathname.startsWith("/admin") ? "page" : undefined} className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-cocoa/20 px-3.5 text-[13px] font-semibold text-cocoa-600 transition-colors hover:border-cocoa hover:text-cocoa">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
              Admin Login
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setSearch(true)} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-cocoa/5" aria-label="Search">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" /></svg>
            </button>
            <Link href="/menu?wish=1" className="relative hidden h-11 w-11 place-items-center rounded-full transition-colors hover:bg-cocoa/5 sm:grid" aria-label={`Wishlist${ready ? `, ${wishlist.length} items` : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.600-7 10-7 10z" strokeLinejoin="round" /></svg>
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-cocoa/5" aria-label={`Open cart${ready ? `, ${cartCount} items` : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h14l-1.200 11H6.200L5 8zM9 8V6a3 3 0 016 0v2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {ready && cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-blush-700 px-1 text-[11px] font-bold tabular-nums text-white">{cartCount}</span>
              )}
            </button>
            <a href={site.whatsappUrl + "?text=" + encodeURIComponent("Hi The Cake Bake! I'd like to order a cake.")} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm ml-1 hidden md:inline-flex">
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
            <button onClick={() => setMenu(true)} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-cocoa/5 xl:hidden" aria-label="Open menu" aria-expanded={menu}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <MotionConfig reducedMotion="user">
          <motion.div className="fixed inset-0 z-50 xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-cocoa/50" onClick={() => setMenu(false)} aria-label="Close menu" />
            <motion.nav data-lenis-prevent aria-label="Mobile" className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-cream p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-lift"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }}>
              <div className="mb-6 flex items-center justify-between">
                <Image src="/brand/logo-mark.png" alt={site.name} width={549} height={495} className="h-12 w-auto" />
                <button onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-cocoa/5" aria-label="Close menu">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              <ul className="flex-1 space-y-1">
                {[{ href: "/", label: "Home" }, ...nav, { href: "/track", label: "Track an order" }].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} aria-current={active(n.href) ? "page" : undefined} className={`block rounded-card px-3 py-3 font-serif text-2xl transition-colors hover:bg-cocoa/5 ${active(n.href) ? "text-blush-700" : "text-cocoa"}`}>{n.label}</Link>
                  </li>
                ))}
              </ul>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa w-full"><WhatsAppIcon /> Order on WhatsApp</a>
              <Link href="/admin/login" className="btn-outline btn-sm mt-3 w-full">Admin Login</Link>
              <div className="mt-4 text-center"><OpenBadge /></div>
            </motion.nav>
          </motion.div>
          </MotionConfig>
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
      <div className="relative mx-auto mt-16 w-[calc(100%-2rem)] max-w-xl rounded-card bg-cream p-4 shadow-lift sm:mt-24">
        <form onSubmit={(e) => { e.preventDefault(); router.push(`/menu?q=${encodeURIComponent(q)}`); onClose(); }} className="flex gap-2">
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} className="input" placeholder="Search cakes, tubs, hampers…" aria-label="Search the menu" />
          <button className="btn-primary" type="submit">Search</button>
        </form>
        <p className="term mb-2 mt-5 px-1">{q ? "Results" : "Bestsellers"}</p>
        {results.length === 0 ? (
          <p className="px-1 py-4 text-sm text-cocoa-600">Nothing on the menu matches “{q}”. Try “chocolate” or “rose”.</p>
        ) : (
          <ul data-lenis-prevent className="max-h-[50vh] space-y-1 overflow-auto">
            {results.map((p) => (
              <li key={p.id}>
                <Link href={`/menu/${p.slug}`} className="flex items-center gap-3 rounded-card p-2 hover:bg-cream-200">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-card"><SmartImage src={p.image} alt={p.name} sizes="56px" /></span>
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
