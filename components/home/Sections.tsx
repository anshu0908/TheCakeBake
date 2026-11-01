"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/config/site";
import { images } from "@/data/images";
import { reviewSummary, reviewThemes, reviews } from "@/data/reviews";
import { categories } from "@/lib/types";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";
import Reveal from "../Reveal";
import ProductCard from "../ProductCard";
import SmartImage from "../SmartImage";
import { OpenBadge, Stars, WhatsAppIcon } from "../ui";

const Arrow = ({ className = "h-5 w-5", flip = false }: { className?: string; flip?: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/** The headline and the two ways to order on the left, the chocolate drip cake large on the right. */
export function Hero() {
  return (
    <section className="bg-cream">
      <div className="container-x grid gap-10 pb-16 pt-8 sm:pb-20 sm:pt-12 lg:min-h-[calc(100svh-132px)] lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-10">
        <div className="lg:col-span-6 lg:self-center">
          <h1 className="h-display rise">Baking your ideas to life</h1>
          <p className="lead rise mt-8 !max-w-[46ch] !text-cocoa" style={{ "--i": 1 } as React.CSSProperties}>
            The Cake Bake is a cake shop on Circular Road, Sector 7, Gurugram. We make celebration cakes, cupcakes, cake tubs and hampers, and deliver across the city the same day or on the date you pick.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/menu" className="btn-primary">Order a cake</Link>
            <Link href="/custom-cake" className="btn-outline">Plan a custom cake</Link>
          </div>
          <ul className="rise mt-12 grid gap-x-8 gap-y-3 text-[15px] sm:grid-cols-2" style={{ "--i": 3 } as React.CSSProperties}>
            <li>
              <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-blush-700">
                <Stars n={5} /><span><span className="tabular-nums">{site.rating}</span> from <span className="tabular-nums">{site.reviewCount.toLocaleString("en-IN")}</span> Google reviews</span>
              </a>
            </li>
            <li><OpenBadge /></li>
            <li>Eggless versions of most cakes</li>
            <li>Free delivery over {inr(site.freeDeliveryAbove)}</li>
          </ul>
        </div>
        <figure className="tier-top rise relative h-[min(64svh,620px)] min-h-[340px] overflow-hidden bg-cream-200 lg:col-span-6 lg:h-auto lg:min-h-[560px]" style={{ "--i": 1 } as React.CSSProperties}>
          <SmartImage src={images.hero} alt="A chocolate drip celebration cake" priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-[50%_40%]" />
        </figure>
      </div>
    </section>
  );
}

export function Bestsellers() {
  const { products } = useStore();
  const list = products.filter((p) => p.tags.includes("Bestseller") && p.inStock).sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  return (
    <section aria-labelledby="best-head" className="section bg-cream-200">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <h2 id="best-head" className="h-section">What people order most</h2>
          <Link href="/menu" className="link inline-flex items-center gap-2 py-2">See the full menu <Arrow className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {list.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 0.06}><ProductCard p={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/** The five ranges as a price board. Counts and starting prices come from the live menu. One photograph follows the row in focus. */
export function MenuBoard() {
  const { products } = useStore();
  const [on, setOn] = useState(0);
  const rows = categories.map((c) => {
    const items = products.filter((p) => p.category === c.id);
    const from = items.length ? Math.min(...items.map((p) => p.sizes[0].price)) : 0;
    return { ...c, count: items.length, from, img: images.categories[c.id] };
  });
  return (
    <section aria-labelledby="menu-head" className="section-l">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="menu-head" className="h-section">The menu</h2>
          <p className="lead mt-5">Five ranges, baked fresh each day. Prices are for the smallest size.</p>
          <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-card bg-cream-200 lg:block">
            {rows.map((r, i) => (
              <div key={r.id} className={`absolute inset-0 transition-opacity duration-500 ease-out ${i === on ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== on}>
                <SmartImage src={r.img} alt={r.label} sizes="(max-width: 1280px) 40vw, 520px" />
              </div>
            ))}
          </div>
        </div>
        <ul className="lg:col-span-7 lg:self-center">
          {rows.map((r, i) => (
            <li key={r.id}>
              <Link href={`/menu?cat=${r.id}`} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}
                className={`group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4 rounded-card px-3 py-5 transition-colors sm:gap-6 sm:px-5 sm:py-6 lg:grid-cols-[minmax(0,1fr)_auto] ${i === on ? "lg:bg-cream-200" : ""} hover:bg-cream-200`}>
                <span className="relative h-14 w-14 overflow-hidden rounded-full bg-cream-200 lg:hidden"><SmartImage src={r.img} alt="" sizes="56px" /></span>
                <span className="min-w-0">
                  <span className="block font-serif text-[1.75rem] leading-none sm:text-[2.75rem]">{r.label}</span>
                  <span className="mt-2 block text-[15px] text-cocoa-600">{r.blurb}</span>
                </span>
                <span className="text-right text-[15px]">
                  <span className="block font-semibold tabular-nums">from {inr(r.from)}</span>
                  <span className="block text-cocoa-600 tabular-nums">{r.count} {r.count === 1 ? "item" : "items"}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => scroller.current?.scrollBy({ left: d * 380, behavior: "smooth" });
  const themes = [...reviewThemes].sort((a, b) => b.count - a.count);
  return (
    <section aria-labelledby="reviews-head" className="section">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="reviews-head" className="h-section">What customers say</h2>
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="group mt-10 flex items-end gap-5">
              <span className="font-serif text-[6.5rem] leading-[0.8] tabular-nums sm:text-[8rem]">{site.rating}</span>
              <span className="pb-1">
                <Stars n={5} />
                <span className="mt-1.5 block text-[15px] font-semibold underline decoration-blush/50 decoration-2 underline-offset-4 transition-colors group-hover:text-blush-700"><span className="tabular-nums">{site.reviewCount.toLocaleString("en-IN")}</span> Google reviews</span>
              </span>
            </a>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:self-end">
            <p className="max-w-[34ch] font-serif text-[1.375rem] leading-snug sm:text-[2rem] sm:leading-[1.25]">{reviewSummary}</p>
            <p className="mt-6 max-w-[60ch] text-cocoa-600">
              Reviewers mention {themes.map((t, i) => <span key={t.id}>{i > 0 && (i === themes.length - 1 ? " and " : ", ")}{t.id} <span className="tabular-nums">{t.count}</span>{i === 0 ? " times" : ""}</span>)}.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <div ref={scroller} tabIndex={0} aria-label="Customer reviews" className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 sm:gap-5">
            {reviews.map((r) => (
              <figure key={r.id} className="flex w-[85%] shrink-0 snap-start flex-col rounded-card bg-cream-200 p-7 sm:w-[380px]">
                {r.rating ? <Stars n={r.rating} /> : <span className="h-4" />}
                <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug">“{r.short}”</blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="block font-semibold">{r.author}</span>
                  <span className="text-cocoa-600">{r.badge ? `${r.badge}, ` : ""}{r.when}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-cream-200 transition-[background-color,color,transform] hover:bg-cocoa hover:text-cream active:scale-95" aria-label="Previous reviews"><Arrow className="h-4 w-4" flip /></button>
              <button type="button" onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full bg-cream-200 transition-[background-color,color,transform] hover:bg-cocoa hover:text-cream active:scale-95" aria-label="Next reviews"><Arrow className="h-4 w-4" /></button>
            </div>
            <Link href="/reviews" className="link text-[15px]">Read all reviews</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** How to find the shop: address, hours and phone beside the map. */
export function VisitUs() {
  return (
    <section aria-labelledby="visit-head" className="section bg-cream-200">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id="visit-head" className="h-section">Visit the shop</h2>
          <dl className="mt-10 space-y-7">
            <div><dt className="term">Address</dt><dd className="mt-1 text-lg leading-relaxed">{site.address.full}</dd><dd className="mt-1 text-sm text-cocoa-600">Plus Code {site.plusCode}</dd></div>
            <div><dt className="term">Hours</dt><dd className="mt-1 text-lg">Every day until {site.hours.closeLabel}</dd><dd className="mt-1"><OpenBadge /></dd></div>
            <div><dt className="term">Call or WhatsApp</dt><dd className="mt-1"><a className="text-2xl font-semibold tabular-nums transition-colors hover:text-blush-700" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></dd></div>
            <div><dt className="term">At the shop</dt><dd className="mt-1">{site.services.join(", ")}</dd></div>
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions</a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>
        </div>
        <iframe title="Map showing The Cake Bake, Sector 7, Gurugram" src={site.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-card border-0 bg-cream-300 lg:col-span-7 lg:col-start-6 lg:h-full lg:min-h-[520px]" />
      </div>
    </section>
  );
}
