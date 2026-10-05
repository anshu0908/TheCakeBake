"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";
import type { Product } from "@/lib/types";
import SmartImage from "./SmartImage";

export default function ProductCard({ p }: { p: Product }) {
  const { addToCart, wishlist, toggleWish, notify, ready } = useStore();
  const wished = ready && wishlist.includes(p.id);
  const first = p.sizes[0];

  return (
    <article className="group card flex flex-col overflow-hidden transition duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
        <Link href={`/menu/${p.slug}`} aria-label={`View ${p.name}`} className="absolute inset-0 z-[1]" />
        <SmartImage src={p.image} alt={`${p.name}`} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="transition duration-700 group-hover:scale-105" />
        <div className="absolute left-3 top-3 z-[2] flex flex-col gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-semibold text-cocoa shadow-sm">{t}</span>
          ))}
          {p.eggless && <span className="rounded-full bg-emerald-50/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">Eggless available</span>}
        </div>
        <button
          onClick={() => { toggleWish(p.id); notify(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
          aria-pressed={wished} aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          className="absolute right-3 top-3 z-[2] grid h-10 w-10 place-items-center rounded-full bg-cream/95 shadow-sm transition hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className={`h-5 w-5 ${wished ? "fill-blush-600 text-blush-600" : "text-cocoa"}`} fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.400-7-10a4 4 0 017-2.600A4 4 0 0119 10c0 5.600-7 10-7 10z" strokeLinejoin="round" /></svg>
        </button>
        {!p.inStock && <div className="absolute inset-0 z-[2] grid place-items-center bg-cream/70 font-serif text-xl">Sold out</div>}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-lg leading-snug sm:text-xl"><Link href={`/menu/${p.slug}`} className="hover:text-blush-700">{p.name}</Link></h3>
        <p className="mt-1 line-clamp-2 text-sm text-cocoa-600">{p.short}</p>
        <p className="mt-2 text-xs text-cocoa-500">{p.sizes.map((s) => s.label).join(" · ")}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <p className="text-sm text-cocoa-500">from <span className="text-lg font-semibold text-cocoa">{inr(first.price)}</span></p>
          <button
            disabled={!p.inStock}
            onClick={() => { addToCart({ productId: p.id, name: p.name, image: p.image, size: first.label, price: first.price, eggless: false }); }}
            className="btn-primary btn-sm" aria-label={`Add ${p.name} to cart`}
          >Add</button>
        </div>
      </div>
    </article>
  );
}
