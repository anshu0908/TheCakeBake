"use client";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/utils";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

/** Thin progress bar along the top edge while scrolling, in the logo's magenta. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX: reduce ? scrollYProgress : spring }} className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-blush" />;
}

/** The offer: one signature cake, set large on the icing field, with its size, price and the add action. */
export function Signature() {
  const { products, addToCart } = useStore();
  const p = products.find((x) => x.slug === "rose-gulkand-cake") ?? products[0];
  if (!p) return null;
  const s = p.sizes[1] ?? p.sizes[0];
  return (
    <section aria-labelledby="signature-head" className="section-l bg-blush-50">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <figure className="lg:col-span-6">
          <div className="tier-top relative aspect-[4/5] overflow-hidden bg-cream-200 sm:aspect-[5/4] lg:aspect-[5/6]">
            <SmartImage src={p.image} alt={`${p.name}, finished with rose petals`} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </figure>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <h2 id="signature-head" className="h-section">{p.name}</h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed">Our signature cake. {p.description}</p>
          {p.eggless && <p className="mt-4 text-cocoa-600">You can have it eggless.</p>}
          <p className="mt-10 flex items-baseline gap-3">
            <span className="font-serif text-5xl tabular-nums">{inr(s.price)}</span>
            <span className="text-cocoa-600">for {s.label}</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <button type="button" onClick={() => addToCart({ productId: p.id, name: p.name, image: p.image, size: s.label, price: s.price, eggless: false })} className="btn-primary">Add {s.label} to cart</button>
            <Link href={`/menu/${p.slug}`} className="btn-outline">Other sizes</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
