import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/data/images";
import { site } from "@/config/site";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "About us", description: "The story and craft behind The Cake Bake, a boutique bakery in Sector 7, Gurugram." };

const values = [
  ["Fresh, always", "Cakes are baked in small batches so what reaches you is soft, light and fresh."],
  ["Made around you", "Every celebration is different. We listen first, then design and bake."],
  ["Honest quality", "Good ingredients and careful hands. We'd rather do it properly than do it fast."],
  ["On time", "A cake that arrives late misses the moment. We plan deliveries around yours."],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Baked with care, in Gurugram">A neighbourhood bakery with a boutique patisserie's eye for detail.</PageHero>
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift"><SmartImage src={images.about} alt="Freshly baked goods at a bakery counter" sizes="(max-width: 1024px) 100vw, 50vw" /></Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-cocoa-600">
            <p className="eyebrow">{site.name}</p>
            <h2 className="h-section text-cocoa">Cakes for the moments that matter</h2>
            <p>We are a bakery and cake shop in Sector 7, Gurugram. We bake celebration cakes, cupcakes, cake tubs, dry cakes and gifting hampers for birthdays, anniversaries, weddings and everyday sweet cravings.</p>
            <p>Customers tell us that what they remember is the combination of a beautiful design and a cake that actually tastes wonderful. That's the standard we hold ourselves to with every order, from a single cupcake to a tiered showpiece.</p>
            <p>If you can picture it, share it with us. A reference photo, a colour palette or just a few words is enough to begin.</p>
            <Link href="/custom-cake" className="btn-primary mt-2">Design a custom cake</Link>
          </div>
        </div>
      </section>
      <section className="section bg-cream-200/60">
        <div className="container-x">
          <h2 className="h-section mb-12 text-center">What we care about</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06} className="card p-7"><p className="font-serif text-2xl">{t}</p><p className="mt-3 text-cocoa-600">{d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x text-center">
          <h2 className="h-section">Come say hello</h2>
          <p className="lead mt-3">{site.address.full}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/contact" className="btn-primary">Contact us</Link><Link href="/menu" className="btn-outline">See the menu</Link></div>
        </div>
      </section>
    </>
  );
}
