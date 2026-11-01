"use client";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { Stars } from "./ui";

/** Thin progress bar along the top edge while scrolling, in the logo's magenta. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX: reduce ? scrollYProgress : spring }} className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-blush" />;
}

/** The offer: one signature cake, set large, with its size, price and the add action. */
export function Signature() {
  const { products, addToCart } = useStore();
  const p = products.find((x) => x.slug === "rose-gulkand-cake") ?? products[0];
  if (!p) return null;
  const s = p.sizes[1] ?? p.sizes[0];
  return (
    <section className="section-l bg-gradient-to-br from-blush-50 via-cream to-cream-200">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <figure className="lg:col-span-6">
          <div className="tier-top relative aspect-[4/5] overflow-hidden bg-cream-200 sm:aspect-[5/4] lg:aspect-[5/6]">
            <SmartImage src={p.image} alt={`${p.name}, our signature cake`} sizes="(max-width: 1024px) 100vw, 58vw" />
          </div>
          <figcaption className="mt-3 text-sm text-cocoa-600">Our signature cake, finished with rose petals.</figcaption>
        </figure>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <h2 className="h-section">{p.name}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-cocoa-600">{p.description}</p>
          <ul className="mt-8 border-t border-cocoa/10">
            {["Fragrant rose sponge, baked fresh", "Gulkand cream, hand-finished with petals", "Eggless version available"].map((t) => <li key={t} className="border-b border-cocoa/10 py-3.5">{t}</li>)}
          </ul>
          <div className="mt-8 flex items-baseline justify-between gap-4">
            <p className="font-serif text-4xl tabular-nums">{inr(s.price)}</p>
            <p className="text-sm text-cocoa-600">for {s.label}</p>
          </div>
          <div className="mt-2"><Stars n={5} /></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <button type="button" onClick={() => addToCart({ productId: p.id, name: p.name, image: p.image, size: s.label, price: s.price, eggless: false })} className="btn-primary">Add {s.label} to cart</button>
            <Link href={`/menu/${p.slug}`} className="btn-outline">View details</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
