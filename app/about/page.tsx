import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/data/images";
import { reviews } from "@/data/reviews";
import { site } from "@/config/site";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { OpenBadge, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "About us", description: "The story and craft behind The Cake Bake, a boutique bakery in Sector 7, Gurugram." };

const values = [
  ["Fresh, always", "Cakes are baked in small batches so what reaches you is soft, light and fresh."],
  ["Made around you", "Every celebration is different. We listen first, then design and bake."],
  ["Honest quality", "Good ingredients and careful hands. We’d rather do it properly than do it fast."],
  ["On time", "A cake that arrives late misses the moment. We plan deliveries around yours."],
];

// The page's one loud moment: a customer saying, in their own words, what the bakery promises.
const quote = reviews.find((r) => r.id === "r1") ?? reviews[0];

export default function About() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Baked with care, in Gurugram">A neighbourhood bakery with a boutique patisserie’s eye for detail.</PageHero>

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-card bg-cream-200 lg:col-span-5">
            <SmartImage src={images.about} alt="Cookies being hand-decorated with icing" sizes="(max-width: 1024px) 100vw, 40vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="h-section">Cakes for the moments that matter</h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-lg leading-relaxed text-cocoa-600">
              <p>We are a bakery and cake shop in Sector 7, Gurugram. We bake celebration cakes, cupcakes, cake tubs, dry cakes and gifting hampers for birthdays, anniversaries, weddings and everyday sweet cravings.</p>
              <p>What customers remember is a beautiful design on a cake that actually tastes wonderful. That’s the standard for every order, from a single cupcake to a tiered showpiece.</p>
              <p>If you can picture it, share it with us. A reference photo, a colour palette or a few words is enough to begin.</p>
            </div>
            <Link href="/custom-cake" className="btn-primary mt-8">Design a custom cake</Link>
          </div>
        </div>
      </section>

      <section className="on-dark section bg-cocoa text-cream">
        <figure className="container-x">
          <blockquote className="max-w-[24ch] font-serif text-[clamp(1.875rem,1.2rem+2.8vw,3.5rem)] leading-[1.12] tracking-[-0.015em] text-cream">“{quote.short}”</blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-cream/80">
            <span><span className="font-semibold text-cream">{quote.author}</span>, Google review</span>
            <Link href="/reviews" className="link text-gold-300 decoration-gold-300/40 hover:!text-cream">Read more reviews</Link>
          </figcaption>
        </figure>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 className="h-section lg:col-span-4">What we care about</h2>
          <dl className="border-t border-cocoa/15 lg:col-span-7 lg:col-start-6">
            {values.map(([t, d]) => (
              <div key={t} className="grid gap-2 border-b border-cocoa/15 py-6 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-8">
                <dt className="font-serif text-2xl">{t}</dt>
                <dd className="max-w-[48ch] text-cocoa-600 sm:pt-1">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-cream-200/60">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            <h2 className="h-section">Come say hello</h2>
            <address className="mt-5 max-w-[40ch] text-lg not-italic leading-relaxed text-cocoa-600">{site.address.full}</address>
            <p className="mt-4">Open daily, closes {site.hours.closeLabel}</p>
            <div className="mt-2"><OpenBadge /></div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions</a>
            <Link href="/contact" className="btn-outline">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
