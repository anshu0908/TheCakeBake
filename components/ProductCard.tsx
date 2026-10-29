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
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-cream-200">
        <Link href={`/menu/${p.slug}`} aria-label={`View ${p.name}`} className="absolute inset-0 z-[1] rounded-card" />
        <SmartImage src={p.image} alt={`${p.name}`} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-col items-start gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-cream/95 px-2.5 py-1 text-xs font-semibold text-cocoa">{t}</span>
          ))}
          {p.eggless && <span className="rounded-full bg-cream/95 px-2.5 py-1 text-xs font-medium text-cocoa-600">Eggless available</span>}
        </div>
        <button
          type="button"
          onClick={() => { toggleWish(p.id); notify(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
          aria-pressed={wished} aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          className="absolute right-3 top-3 z-[2] grid h-11 w-11 place-items-center rounded-full bg-cream/95 transition-colors hover:bg-white active:scale-95"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-5 w-5 ${wished ? "text-blush-600" : "text-cocoa"}`} fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.400-7-10a4 4 0 017-2.600A4 4 0 0119 10c0 5.600-7 10-7 10z" strokeLinejoin="round" /></svg>
        </button>
        {!p.inStock && <div className="absolute inset-0 z-[2] grid place-items-center bg-cream/75 font-serif text-xl">Sold out</div>}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="h-title !text-[1.25rem] sm:!text-[1.375rem]"><Link href={`/menu/${p.slug}`} className="transition-colors group-hover:text-blush-700">{p.name}</Link></h3>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-cocoa-600">{p.short}</p>
        <p className="mt-2 text-[13px] text-cocoa-600">{p.sizes.map((s) => s.label).join(", ")}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-sm text-cocoa-600">from <span className="text-base font-semibold tabular-nums text-cocoa">{inr(first.price)}</span></p>
          <button
            type="button"
            disabled={!p.inStock}
            onClick={() => { addToCart({ productId: p.id, name: p.name, image: p.image, size: first.label, price: first.price, eggless: false }); }}
            className="btn-outline btn-sm" aria-label={`Add ${p.name} to cart`}
          >Add</button>
        </div>
      </div>
    </article>
  );
}
