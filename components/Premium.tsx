"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { Stars, WhatsAppIcon } from "./ui";

/** Thin gold progress bar along the top edge while scrolling. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-gold via-blush to-gold" />;
}

/** Slow, elegant text marquee. Pauses on hover; static for reduced motion. */
export function Marquee() {
  const items = ["Custom cakes", "Fresh daily", "Online order", "Takeaway", "No-contact delivery", "Eggless options", "Designed around you", "Gurugram"];
  const row = items.flatMap((t) => [t, "✦"]);
  return (
    <div className="group overflow-hidden border-y border-cocoa/10 bg-cocoa py-4 text-cream" aria-hidden>
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-8 font-serif text-xl group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...row, ...row].map((t, i) => <span key={i} className={t === "✦" ? "text-gold-300" : ""}>{t}</span>)}
      </div>
    </div>
  );
}

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

export function StatsBand() {
  const stats = [
    { n: site.rating, d: 1, s: "★", l: "Google rating" },
    { n: site.reviewCount, d: 0, s: "", l: "Google reviews" },
    { n: 4, d: 0, s: "", l: "Ways to order" },
  ];
  return (
    <section className="section !py-14 sm:!py-20">
      <div className="container-x">
        <dl className="grid grid-cols-1 gap-y-10 divide-cocoa/10 text-center sm:grid-cols-3 sm:divide-x">
          {stats.map((s) => (
            <div key={s.l} className="px-4">
              <dd className="font-serif text-5xl text-cocoa sm:text-6xl"><Counter to={s.n} decimals={s.d} suffix={s.s} /></dd>
              <dt className="mt-2 text-sm uppercase tracking-[0.18em] text-cocoa-500">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Large editorial spotlight of one signature product. */
export function Signature() {
  const { products, addToCart } = useStore();
  const p = products.find((x) => x.slug === "rose-gulkand-cake") ?? products[0];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  if (!p) return null;
  const s = p.sizes[1] ?? p.sizes[0];
  return (
    <section className="section overflow-hidden bg-gradient-to-br from-blush-50 via-cream to-cream-200">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div ref={ref} className="relative aspect-[5/6] overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-[4/5]">
          <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0"><SmartImage src={p.image} alt={`${p.name}, our signature cake`} sizes="(max-width: 1024px) 100vw, 55vw" /></motion.div>
          <span className="absolute left-5 top-5 rounded-full bg-cream/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">Signature</span>
        </div>
        <Reveal>
          <p className="eyebrow mb-3">The signature collection</p>
          <h2 className="h-section">{p.name}</h2>
          <p className="lead mt-5">{p.description}</p>
          <ul className="mt-6 space-y-2 text-cocoa-600">
            {["Fragrant rose sponge, baked fresh", "Gulkand cream, hand-finished with petals", "Eggless version available"].map((t) => <li key={t} className="flex gap-3"><span className="text-gold" aria-hidden>✦</span>{t}</li>)}
          </ul>
          <div className="mt-6 flex items-center gap-3"><Stars n={5} /><span className="text-sm text-cocoa-600">From {inr(s.price)} · {s.label}</span></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => addToCart({ productId: p.id, name: p.name, image: p.image, size: s.label, price: s.price, eggless: false })} className="btn-primary px-8">Add 1 kg to cart</button>
            <Link href={`/menu/${p.slug}`} className="btn-outline px-8">View details</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Pillars() {
  const items = [
    ["Designed with you", "Share a photo or idea; we confirm the design before we bake."],
    ["Baked to order", "Fresh cakes, finished by hand, never sitting on a shelf."],
    ["Delivered with care", "Same-day and scheduled delivery, with no-contact option."],
  ];
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-cocoa/10 bg-cream p-8 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift">
                <span className="font-serif text-5xl text-gold/60 transition group-hover:text-gold">0{i + 1}</span>
                <p className="mt-4 font-serif text-2xl">{t}</p>
                <p className="mt-2 text-cocoa-600">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="px-4 pb-4 sm:px-6">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-cocoa px-6 py-16 text-center text-cream sm:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blush/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <p className="eyebrow !text-gold-300">Plan your celebration</p>
        <h2 className="h-section mx-auto mt-3 max-w-2xl !text-cream">Tell us the occasion. We'll bake the rest.</h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/75">Get a custom quote in minutes, or order straight from the menu for same-day delivery across Gurugram.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/custom-cake" className="btn bg-cream px-8 text-cocoa hover:bg-white">Design a custom cake</Link>
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn border border-cream/40 px-8 text-cream hover:bg-cream/10"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
        </div>
      </Reveal>
    </section>
  );
}
