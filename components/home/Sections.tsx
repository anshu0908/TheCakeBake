"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/config/site";
import { images } from "@/data/images";
import { ratingBreakdown, reviewSummary, reviewThemes, reviews } from "@/data/reviews";
import { categories } from "@/lib/types";
import { useStore } from "@/lib/store";
import Reveal from "../Reveal";
import ProductCard from "../ProductCard";
import SmartImage from "../SmartImage";
import { OpenBadge, SectionHead, Stars, WhatsAppIcon } from "../ui";

const Arrow = ({ className = "h-5 w-5", flip = false }: { className?: string; flip?: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/** Stage: the headline on five columns, the cake on seven, settled once by CSS. */
export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blush-50 via-cream to-cream">
      <div className="container-x grid items-center gap-10 py-10 sm:py-14 lg:min-h-[calc(100svh-132px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16 lg:py-10">
        <div>
          <h1 className="h-display rise !max-w-[15ch]">Cakes made to be remembered</h1>
          <p className="lead rise mt-6" style={{ "--i": 1 } as React.CSSProperties}>Boutique cakes, pastries and gifts, baked fresh in Gurugram.</p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/menu" className="btn-primary">Order a Cake</Link>
            <Link href="/custom-cake" className="btn-outline">Design Your Custom Cake</Link>
          </div>
          <ul className="rise mt-10 space-y-2.5 border-t border-cocoa/10 pt-6 text-sm text-cocoa-600" style={{ "--i": 3 } as React.CSSProperties}>
            <li>
              <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-cocoa transition-colors hover:text-blush-700">
                <Stars n={5} /><span><span className="tabular-nums">{site.rating}</span> from <span className="tabular-nums">{site.reviewCount.toLocaleString("en-IN")}</span> Google reviews</span>
              </a>
            </li>
            <li>Same-day &amp; scheduled delivery in Gurugram</li>
            <li><OpenBadge /></li>
          </ul>
        </div>
        <figure className="tier-top rise relative h-[min(68svh,680px)] min-h-[360px] overflow-hidden bg-cream-200" style={{ "--i": 1 } as React.CSSProperties}>
          <SmartImage src={images.hero} alt="A rich chocolate celebration cake from The Cake Bake" priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-[50%_40%]" />
        </figure>
      </div>
    </section>
  );
}

/** The care facts, said once, as a ruled strip (merges the old trust strip and the three pillars). */
export function TrustStrip() {
  const items = [
    ["Fresh daily", "Baked in small batches and finished by hand, never sitting on a shelf."],
    ["Custom designs", "Matched to your reference; we confirm the design before we bake."],
    ["Timely delivery", "Same-day and scheduled, with a no-contact option."],
    ["Eggless options", "Available on most cakes."],
  ];
  return (
    <section aria-label="Why choose us" className="border-y border-cocoa/10 bg-white">
      <dl className="container-x grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([t, s], i) => (
          <div key={t} className={`border-cocoa/10 py-7 sm:py-9 lg:px-8 lg:first:pl-0 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
            <dt className="font-serif text-xl">{t}</dt>
            <dd className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-cocoa-600">{s}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Bento: cakes lead, the other four ranges around it. */
export function Categories() {
  const imgs = images.categories;
  const [lead, ...rest] = categories;
  const tile = (c: (typeof categories)[number], cls: string, sizes: string, i: number) => (
    <Reveal key={c.id} delay={i * 0.06} className={cls}>
      <Link href={`/menu?cat=${c.id}`} className="group relative block h-full min-h-[220px] overflow-hidden rounded-card bg-cream-200">
        <SmartImage src={imgs[c.id]} alt={c.label} sizes={sizes} />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/15 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-cream sm:p-6">
          <span>
            <span className="block font-serif text-xl leading-tight sm:text-2xl xl:text-[1.75rem]">{c.label}</span>
            <span className="mt-1 block text-[13px] leading-snug text-cream/85 sm:text-sm">{c.blurb}</span>
          </span>
          <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/40 sm:grid transition-colors duration-200 group-hover:border-cream group-hover:bg-cream group-hover:text-cocoa"><Arrow className="h-4 w-4" /></span>
        </div>
      </Link>
    </Reveal>
  );
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead title="Shop by category" sub="Something for every occasion, from a single cupcake to a hamper." />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-12 xl:grid-rows-[280px_280px]">
          {tile(lead, "col-span-2 aspect-[4/3] lg:aspect-[16/9] xl:col-span-6 xl:row-span-2 xl:aspect-auto", "(max-width: 1280px) 100vw, 50vw", 0)}
          {rest.map((c, i) => tile(c, "aspect-[4/5] lg:aspect-[4/3] xl:col-span-3 xl:aspect-auto", "(max-width: 1280px) 50vw, 25vw", i + 1))}
        </div>
      </div>
    </section>
  );
}

export function Bestsellers() {
  const { products } = useStore();
  const list = products.filter((p) => p.tags.includes("Bestseller") && p.inStock).sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  return (
    <section className="section bg-cream-200/60">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <h2 className="h-section">Loved by Gurugram</h2>
          <Link href="/menu" className="btn-outline btn-sm">View full menu</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {list.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 0.06}><ProductCard p={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/** Index of occasions on the cocoa band; one photograph swaps to whichever row is hovered or focused. */
export function Occasions() {
  const o = images.occasions;
  const list: [string, string][] = [["Birthday", o.birthday], ["Anniversary", o.anniversary], ["Wedding", o.wedding], ["Baby Shower", o.babyShower], ["Corporate", o.corporate], ["Festive", o.festive]];
  const [on, setOn] = useState(0);
  return (
    <section className="on-dark section bg-cocoa text-cream">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="h-section text-cream">What are we celebrating?</h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-cream/80">From a quiet birthday to a three-tier wedding showpiece.</p>
          <div className="relative mt-10 hidden aspect-[4/5] max-w-md overflow-hidden rounded-card bg-cocoa-700 lg:block">
            {list.map(([label, src], i) => (
              <div key={label} className={`absolute inset-0 transition-opacity duration-500 ease-out ${i === on ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== on}>
                <SmartImage src={src} alt={`${label} cakes`} sizes="420px" />
              </div>
            ))}
          </div>
        </div>
        <ul className="border-t border-cream/15 lg:col-span-6 lg:col-start-7 lg:self-center">
          {list.map(([label, src], i) => (
            <li key={label} className="border-b border-cream/15">
              <Link href={`/custom-cake?occasion=${encodeURIComponent(label)}`} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}
                className="group flex items-center gap-5 py-5 transition-colors duration-200 hover:text-gold-300 sm:py-6">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full lg:hidden"><SmartImage src={src} alt="" sizes="56px" /></span>
                <span className="flex-1 font-serif text-3xl leading-none sm:text-[2.5rem]">{label}</span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/25 transition-colors duration-200 group-hover:border-gold-300"><Arrow className="h-4 w-4" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Steps: a real ordered list beside the photograph of a finished custom cake. */
export function CustomTeaser() {
  const steps = [["Share your idea", "Tell us the occasion, theme and a reference photo."], ["Get a quote", "We confirm design, flavour and price."], ["We bake", "Your cake is baked and decorated by hand."], ["Delivered", "Fresh to your door, on time."]];
  return (
    <section className="section-l">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-card bg-cream-200 sm:aspect-square lg:col-span-5">
          <SmartImage src={images.customTeaser} alt="A custom designed tiered celebration cake" sizes="(max-width: 1024px) 100vw, 40vw" />
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="h-section">Baking your ideas to life</h2>
          <p className="lead mt-5">Bring a photo, a theme or just a feeling. Our team will turn it into a cake that matches what you imagined.</p>
          <ol className="mt-10 border-t border-cocoa/10">
            {steps.map(([t, s], i) => (
              <li key={t} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-cocoa/10 py-5 sm:grid-cols-[4rem_minmax(0,1fr)]">
                <span className="font-serif text-3xl leading-none text-gold-700 tabular-nums" aria-hidden="true">{i + 1}</span>
                <span><span className="block font-semibold">{t}</span><span className="mt-1 block text-cocoa-600">{s}</span></span>
              </li>
            ))}
          </ol>
          <Link href="/custom-cake" className="btn-blush mt-10">Start your custom cake</Link>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => scroller.current?.scrollBy({ left: d * 380, behavior: "smooth" });
  return (
    <section className="section bg-cream-200/60">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="h-section">Kind words from our customers</h2>
            <div className="mt-10 flex items-end gap-4">
              <p className="font-serif text-[5.5rem] leading-[0.85] tabular-nums">{site.rating}</p>
              <div className="pb-1">
                <Stars n={5} />
                <p className="mt-1 text-sm text-cocoa-600"><span className="tabular-nums">{site.reviewCount.toLocaleString("en-IN")}</span> Google reviews</p>
              </div>
            </div>
            <ul className="mt-6 max-w-xs space-y-2" aria-label="Rating breakdown">
              {ratingBreakdown.map((r) => (
                <li key={r.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-3 tabular-nums">{r.stars}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cocoa/10"><span className="block h-full rounded-full bg-gold" style={{ width: `${r.pct}%` }} /></span>
                </li>
              ))}
            </ul>
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="link mt-8 inline-block text-sm">See all reviews on Google</a>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="font-serif text-xl leading-snug sm:text-[2rem] sm:leading-[1.3]">{reviewSummary}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="What reviews mention">
              {reviewThemes.map((t) => (
                <li key={t.id} className="rounded-full border border-cocoa/20 px-4 py-2 text-sm font-medium">{t.id} <span className="tabular-nums text-cocoa-600">{t.count}</span></li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-cocoa-600">Summary based on themes from Google reviews.</p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <div ref={scroller} tabIndex={0} aria-label="Customer reviews" className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-5 overflow-x-auto px-[var(--gutter)] pb-2">
            {reviews.map((r) => (
              <figure key={r.id} className="flex w-[85%] shrink-0 snap-start flex-col rounded-card border border-cocoa/10 bg-cream p-7 sm:w-[360px]">
                {r.rating ? <Stars n={r.rating} /> : <span className="h-4" />}
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed">“{r.short}”</blockquote>
                <figcaption className="mt-6 flex items-end justify-between gap-3 border-t border-cocoa/10 pt-4 text-sm">
                  <span><span className="block font-semibold">{r.author}</span><span className="text-cocoa-600">{r.badge ? `${r.badge}, ` : ""}{r.when}</span></span>
                  <span className="text-xs font-medium text-cocoa-600">Google review</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/25 transition-colors hover:border-cocoa hover:bg-cocoa hover:text-cream active:scale-95" aria-label="Previous reviews"><Arrow className="h-4 w-4" flip /></button>
              <button type="button" onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/25 transition-colors hover:border-cocoa hover:bg-cocoa hover:text-cream active:scale-95" aria-label="Next reviews"><Arrow className="h-4 w-4" /></button>
            </div>
            <Link href="/reviews" className="link text-sm">Read all reviews</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A rail of the kitchen's work, running past the container edge. */
export function Gallery() {
  return (
    <section className="section overflow-hidden">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <h2 className="h-section">From our kitchen to your table</h2>
            <p className="lead mt-4">Follow along for fresh bakes and behind-the-scenes.</p>
          </div>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">Follow on Instagram</a>
        </div>
        <ul data-lenis-prevent className="no-scrollbar -mx-[var(--gutter)] flex snap-x gap-4 overflow-x-auto px-[var(--gutter)] sm:gap-6">
          {images.gallery.map((src, i) => (
            <li key={i} className={`shrink-0 snap-start ${i % 3 === 1 ? "w-[55%] sm:w-[220px]" : "w-[65%] sm:w-[280px]"}`}>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-card bg-cream-200" aria-label="View on Instagram">
                <span className={`relative block ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
                  <SmartImage src={src} alt={`The Cake Bake creation ${i + 1}`} sizes="280px" />
                </span>
                <span className="absolute inset-0 bg-cocoa/0 transition-colors duration-300 group-hover:bg-cocoa/25" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The close: the order actions, then how to find the shop. */
export function VisitUs() {
  return (
    <section className="section bg-cream-200/60">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="h-section">Tell us the occasion. We’ll bake the rest.</h2>
            <p className="lead mt-5">Get a custom quote in minutes, or order straight from the menu for same-day delivery across Gurugram.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link href="/custom-cake" className="btn-primary">Design a custom cake</Link>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-cocoa/10 pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="h-title !text-[1.75rem]">Find us in Sector 7</h3>
            <dl className="mt-8 space-y-6">
              <div><dt className="term">Address</dt><dd className="mt-1 leading-relaxed">{site.address.full}</dd><dd className="mt-1 text-sm text-cocoa-600">Plus Code: {site.plusCode}</dd></div>
              <div><dt className="term">Hours</dt><dd className="mt-1">Open daily, closes {site.hours.closeLabel}</dd><dd className="mt-1"><OpenBadge /></dd></div>
              <div><dt className="term">Call or WhatsApp</dt><dd className="mt-1"><a className="text-lg font-semibold tabular-nums transition-colors hover:text-blush-700" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></dd></div>
            </dl>
            <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline mt-8">Get directions</a>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Services">{site.services.map((s) => <li key={s} className="rounded-full border border-cocoa/20 px-3 py-1 text-[13px]">{s}</li>)}</ul>
          </div>
          <iframe title="Map showing The Cake Bake, Sector 7, Gurugram" src={site.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-card border-0 bg-cream-200 lg:col-span-7 lg:col-start-6 lg:h-full lg:min-h-[460px]" />
        </div>
      </div>
    </section>
  );
}
