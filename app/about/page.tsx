import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/data/images";
import { reviews } from "@/data/reviews";
import { site } from "@/config/site";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { OpenBadge, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "About us", description: "About The Cake Bake, a bakery and cake shop on Circular Road, Sector 7, Gurugram." };

const values = [
  ["Small batches", "We bake in small batches and finish each cake by hand."],
  ["Your design first", "We ask what you have in mind and agree the design with you before we start baking."],
  ["Eggless on request", "Most cakes on the menu can be made eggless. Switch it on when you add one to the cart."],
  ["On your date", "Same-day delivery across Gurugram, or pick a date and a time slot."],
];

// The page's one loud moment: a customer saying, in their own words, what the bakery promises.
const quote = reviews.find((r) => r.id === "r1") ?? reviews[0];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="A cake shop in Sector 7">We bake cakes, cupcakes, cake tubs and hampers on Circular Road, near Ghaba Ki Kothi.</PageHero>

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-card bg-cream-200 lg:col-span-5">
            <SmartImage src={images.about} alt="Cookies being hand-decorated with icing" sizes="(max-width: 1024px) 100vw, 40vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="h-section">What we make</h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-lg leading-relaxed">
              <p>We are a bakery and cake shop in Sector 7, Gurugram. We bake celebration cakes, cupcakes, cake tubs, dry cakes and gifting hampers for birthdays, anniversaries, weddings and everyday sweet cravings.</p>
              <p>What reviewers mention most is custom cakes: people send a picture and want the cake to look like it, and taste good too. We hold every order to that, from one cupcake to a tiered wedding cake.</p>
              <p>To start a custom cake, send us a reference photo, a few colours or a short description.</p>
            </div>
            <Link href="/custom-cake" className="btn-primary mt-8">Start a custom cake</Link>
          </div>
        </div>
      </section>

      <section className="on-dark section bg-cocoa text-cream">
        <figure className="container-x">
          <blockquote className="max-w-[36ch] font-serif text-[clamp(1.625rem,1rem+1.6vw,2.25rem)] leading-[1.2] tracking-[-0.015em] text-cream">“{quote.short}”</blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-cream/80">
            <span><span className="font-semibold text-cream">{quote.author}</span>, Google review</span>
            <Link href="/reviews" className="link text-blush-200 decoration-blush-200/50 hover:!text-cream">Read more reviews</Link>
          </figcaption>
        </figure>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 className="h-section lg:col-span-4">How we work</h2>
          <dl className="space-y-2 lg:col-span-7 lg:col-start-6">
            {values.map(([t, d]) => (
              <div key={t} className="grid gap-2 rounded-card bg-cream-200 p-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8">
                <dt className="font-serif text-2xl">{t}</dt>
                <dd className="max-w-[48ch] sm:pt-1">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-cream-200/60">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            <h2 className="h-section">Visit the shop</h2>
            <address className="mt-5 max-w-[40ch] text-lg not-italic leading-relaxed text-cocoa-600">{site.address.full}</address>
            <p className="mt-4">Every day until {site.hours.closeLabel}</p>
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
