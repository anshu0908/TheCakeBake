"use client";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/config/site";
import { images } from "@/data/images";
import { ratingBreakdown, reviewSummary, reviewThemes, reviews } from "@/data/reviews";
import { categories } from "@/lib/types";
import { useStore } from "@/lib/store";
import Reveal from "../Reveal";
import ProductCard from "../ProductCard";
import SmartImage from "../SmartImage";
import { OpenBadge, SectionHead, Stars, WhatsAppIcon } from "../ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream to-cream">
      <div className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
              <span className="font-semibold">{site.rating} ★</span><span className="text-cocoa-500">·</span><span>{site.reviewCount.toLocaleString("en-IN")} Google reviews</span>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="h-display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">Cakes made to be <em className="font-medium text-blush-700">remembered</em></h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead mt-6 max-w-xl">Boutique cakes, pastries and gifts, baked fresh in Gurugram and designed around your celebration. From a quiet birthday to a three-tier wedding showpiece.</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="btn-primary px-8">Order a Cake</Link>
            <Link href="/custom-cake" className="btn-outline px-8">Design Your Custom Cake</Link>
          </Reveal>
          <Reveal delay={0.32} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cocoa-600">
            <span className="inline-flex items-center gap-2"><span aria-hidden>🛵</span> Same-day &amp; scheduled delivery in Gurugram</span>
            <OpenBadge />
          </Reveal>
        </div>
        <Reveal delay={0.12} y={40} className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift">
            <SmartImage src={images.hero} alt="A rich chocolate celebration cake from The Cake Bake" priority sizes="(max-width: 1024px) 90vw, 520px" />
          </div>
          <div className="absolute -bottom-5 -left-3 hidden w-40 rotate-[-4deg] overflow-hidden rounded-3xl border-4 border-cream shadow-lift sm:block sm:w-44">
            <div className="relative aspect-square"><SmartImage src={images.heroSecondary} alt="Pastel celebration cake" sizes="180px" /></div>
          </div>
          <div className="absolute -right-2 top-8 animate-[float_6s_ease-in-out_infinite] rounded-2xl motion-reduce:animate-none bg-white px-4 py-3 shadow-lift sm:-right-6">
            <Stars n={5} />
            <p className="mt-1 text-xs font-medium text-cocoa-600">“Exceeded expectations”</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [["Fresh daily", "Baked in small batches"], ["Custom designs", "Matched to your reference"], ["Timely delivery", "Same-day & scheduled"], ["Eggless options", "On most cakes"]];
  return (
    <section aria-label="Why choose us" className="border-y border-cocoa/10 bg-white">
      <ul className="container-x grid grid-cols-2 gap-6 py-6 lg:grid-cols-4">
        {items.map(([t, s]) => (
          <li key={t} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush-100 text-blush-700" aria-hidden>✦</span>
            <span><span className="block text-sm font-semibold">{t}</span><span className="block text-xs text-cocoa-500">{s}</span></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Categories() {
  const imgs = images.categories;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead eyebrow="Shop by category" title="Something for every occasion" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <Link href={`/menu?cat=${c.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl">
                <SmartImage src={imgs[c.id]} alt={c.label} sizes="(max-width: 1024px) 50vw, 20vw" className="transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
                  <p className="font-serif text-xl leading-tight">{c.label}</p>
                  <p className="mt-1 text-xs text-cream/80">{c.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
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
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow mb-3">Bestsellers</p><h2 className="h-section">Loved by Gurugram</h2></div>
          <Link href="/menu" className="btn-outline btn-sm">View full menu →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {list.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 0.06}><ProductCard p={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function CustomTeaser() {
  const steps = [["Share your idea", "Tell us the occasion, theme and a reference photo."], ["Get a quote", "We confirm design, flavour and price."], ["We bake", "Your cake is baked and decorated by hand."], ["Delivered", "Fresh to your door, on time."]];
  return (
    <section className="section">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-lift">
          <SmartImage src={images.customTeaser} alt="A custom designed tiered celebration cake" sizes="(max-width: 1024px) 100vw, 50vw" />
        </Reveal>
        <div>
          <p className="eyebrow mb-3">Custom cakes</p>
          <h2 className="h-section">Your idea, baked to the last detail</h2>
          <p className="lead mt-4">Bring a photo, a theme or just a feeling. Our team will turn it into a cake that matches what you imagined.</p>
          <ol className="mt-8 space-y-5">
            {steps.map(([t, s], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cocoa font-serif text-cream">{i + 1}</span>
                <span><span className="block font-semibold">{t}</span><span className="text-cocoa-600">{s}</span></span>
              </li>
            ))}
          </ol>
          <Link href="/custom-cake" className="btn-blush mt-8 px-8">Start your custom cake</Link>
        </div>
      </div>
    </section>
  );
}

export function Occasions() {
  const o = images.occasions;
  const list = [["Birthday", o.birthday], ["Anniversary", o.anniversary], ["Wedding", o.wedding], ["Baby Shower", o.babyShower], ["Corporate", o.corporate], ["Festive", o.festive]];
  return (
    <section className="section bg-cocoa text-cream">
      <div className="container-x">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-3 !text-gold-300">Occasions</p>
          <h2 className="h-section !text-cream">What are we celebrating?</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {list.map(([label, src]) => (
            <Link key={label} href={`/custom-cake?occasion=${encodeURIComponent(label)}`} className="group text-center">
              <span className="relative mx-auto block aspect-square w-full max-w-[160px] overflow-hidden rounded-full border-2 border-gold/50 transition group-hover:border-gold-300">
                <SmartImage src={src} alt={`${label} cakes`} sizes="160px" className="transition duration-700 group-hover:scale-110" />
              </span>
              <span className="mt-3 block font-serif text-lg">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyLove() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl rounded-[2rem] border border-gold/30 bg-gradient-to-br from-white to-blush-50 p-8 shadow-soft sm:p-12">
          <div className="flex items-center gap-2 text-gold-700"><span aria-hidden>✦</span><p className="eyebrow">Why people love us</p></div>
          <p className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">{reviewSummary}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {reviewThemes.map((t) => (
              <span key={t.id} className="rounded-full border border-cocoa/15 bg-white px-4 py-2 text-sm font-medium">{t.id} <span className="text-cocoa-500">· {t.count}</span></span>
            ))}
          </div>
          <p className="mt-5 text-xs text-cocoa-500">Summary based on themes from Google reviews.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => scroller.current?.scrollBy({ left: d * 360, behavior: "smooth" });
  return (
    <section className="section bg-cream-200/60">
      <div className="container-x">
        <SectionHead eyebrow="Reviews" title="Kind words from our customers" />
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="card h-fit p-6">
            <p className="font-serif text-5xl">{site.rating}</p>
            <Stars n={5} className="mt-1" />
            <p className="mt-1 text-sm text-cocoa-600">{site.reviewCount.toLocaleString("en-IN")} Google reviews</p>
            <ul className="mt-5 space-y-2" aria-label="Rating breakdown">
              {ratingBreakdown.map((r) => (
                <li key={r.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-3 tabular-nums">{r.stars}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-cocoa/10"><span className="block h-full rounded-full bg-gold" style={{ width: `${r.pct}%` }} /></span>
                </li>
              ))}
            </ul>
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm mt-6 w-full">See all reviews on Google</a>
          </div>
          <div className="min-w-0">
            <div ref={scroller} tabIndex={0} aria-label="Customer reviews" className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
              {reviews.map((r) => (
                <figure key={r.id} className="card flex w-[85%] shrink-0 snap-start flex-col p-6 sm:w-[340px]">
                  {r.rating ? <Stars n={r.rating} /> : <span className="h-4" />}
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">“{r.short}”</blockquote>
                  <figcaption className="mt-5 flex items-center justify-between border-t border-cocoa/10 pt-4 text-sm">
                    <span><span className="block font-semibold">{r.author}</span><span className="text-cocoa-500">{r.badge ? `${r.badge} · ` : ""}{r.when}</span></span>
                    <span className="rounded-full bg-blush-50 px-2.5 py-1 text-[11px] font-semibold text-blush-700">Google review</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/20 hover:bg-cocoa hover:text-cream" aria-label="Previous reviews">←</button>
                <button onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/20 hover:bg-cocoa hover:text-cream" aria-label="Next reviews">→</button>
              </div>
              <Link href="/reviews" className="text-sm font-semibold underline underline-offset-4 hover:text-blush-700">Read all reviews</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead eyebrow="Instagram" title="From our kitchen to your table" sub="Follow along for fresh bakes and behind-the-scenes." />
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {images.gallery.map((src, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-2xl" aria-label="View on Instagram">
                <SmartImage src={src} alt={`The Cake Bake creation ${i + 1}`} sizes="(max-width: 768px) 33vw, 400px" className="transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-cocoa/0 text-cream opacity-0 transition group-hover:bg-cocoa/40 group-hover:opacity-100">♥</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisitUs() {
  return (
    <section className="section bg-cream-200/60">
      <div className="container-x">
        <SectionHead eyebrow="Visit us" title="Find us in Sector 7" />
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6 p-8 sm:p-10">
            <div><p className="eyebrow mb-2">Address</p><p className="leading-relaxed">{site.address.full}</p><p className="mt-1 text-sm text-cocoa-500">Plus Code: {site.plusCode}</p></div>
            <div><p className="eyebrow mb-2">Hours</p><p>Open daily · closes {site.hours.closeLabel}</p><div className="mt-1"><OpenBadge /></div></div>
            <div><p className="eyebrow mb-2">Call or WhatsApp</p><a className="text-lg font-semibold hover:text-blush-700" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></div>
            <div className="flex flex-wrap gap-3">
              <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions</a>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
            </div>
            <ul className="flex flex-wrap gap-2 pt-2">{site.services.map((s) => <li key={s} className="rounded-full border border-cocoa/15 px-3 py-1 text-xs">{s}</li>)}</ul>
          </div>
          <iframe title="Map showing The Cake Bake, Sector 7, Gurugram" src={site.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border-0 lg:h-full lg:min-h-[420px]" />
        </div>
      </div>
    </section>
  );
}
