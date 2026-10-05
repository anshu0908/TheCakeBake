"use client";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { categories, type CategoryId } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

type Sort = "popular" | "low" | "high";

export default function MenuClient() {
  const { products, wishlist, ready } = useStore();
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const cat = (sp.get("cat") as CategoryId | null) ?? null;
  const q = sp.get("q") ?? "";
  const sort = (sp.get("sort") as Sort) || "popular";
  const eggless = sp.get("eggless") === "1";
  const wish = sp.get("wish") === "1";

  const set = (patch: Record<string, string | null>) => {
    const p = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    const s = p.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    let l = products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (eggless && !p.eggless) return false;
      if (wish && !wishlist.includes(p.id)) return false;
      if (t && !(p.name + " " + p.short + " " + p.description).toLowerCase().includes(t)) return false;
      return true;
    });
    l = [...l].sort((a, b) => (sort === "low" ? a.sizes[0].price - b.sizes[0].price : sort === "high" ? b.sizes[0].price - a.sizes[0].price : b.popularity - a.popularity));
    return l;
  }, [products, cat, q, sort, eggless, wish, wishlist]);

  const clear = () => router.replace(pathname, { scroll: false });

  return (
    <section className="container-x py-10 sm:py-14">
      <div className="space-y-5">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
          <button className={`chip shrink-0 ${!cat ? "chip-on" : ""}`} aria-pressed={!cat} onClick={() => set({ cat: null })}>All</button>
          {categories.map((c) => (
            <button key={c.id} className={`chip shrink-0 ${cat === c.id ? "chip-on" : ""}`} aria-pressed={cat === c.id} onClick={() => set({ cat: c.id })}>{c.label}</button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor="q" className="sr-only">Search menu</label>
            <input id="q" className="input pl-11" placeholder="Search the menu…" value={q} onChange={(e) => set({ q: e.target.value || null })} />
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cocoa-500" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.500-3.500" strokeLinecap="round" /></svg>
          </div>
          <label className="chip cursor-pointer select-none">
            <input type="checkbox" className="h-4 w-4 accent-[#3b2418]" checked={eggless} onChange={(e) => set({ eggless: e.target.checked ? "1" : null })} /> Eggless available
          </label>
          <label className="chip cursor-pointer select-none">
            <input type="checkbox" className="h-4 w-4 accent-[#3b2418]" checked={wish} onChange={(e) => set({ wish: e.target.checked ? "1" : null })} /> Wishlist {ready && wishlist.length > 0 && `(${wishlist.length})`}
          </label>
          <div>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select id="sort" className="input !w-auto" value={sort} onChange={(e) => set({ sort: e.target.value === "popular" ? null : e.target.value })}>
              <option value="popular">Most popular</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mb-6 mt-6 text-sm text-cocoa-500" aria-live="polite">{list.length} {list.length === 1 ? "item" : "items"}</p>

      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-3xl">Nothing matches that</p>
          <p className="lead mt-2">{wish ? "Your wishlist is empty. Tap the heart on any cake to save it." : "Try a different search or clear your filters."}</p>
          <button className="btn-primary mt-6" onClick={clear}>Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
  );
}
