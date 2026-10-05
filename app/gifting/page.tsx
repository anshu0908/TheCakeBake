import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/data/images";
import { seedProducts } from "@/data/products";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Gifting & Hampers", description: "Curated dessert hampers and corporate gifting from The Cake Bake, Gurugram." };

export default function Gifting() {
  const hampers = seedProducts.filter((p) => p.category === "hampers");
  return (
    <>
      <PageHero eyebrow="Gifting" title="Gifts worth unwrapping">Curated hampers for family, friends and teams. Bulk and corporate orders welcome.</PageHero>
      <section className="section">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {hampers.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <p className="mt-6 text-center text-sm"><Link href="/menu?cat=hampers" className="underline underline-offset-4">See all hampers</Link></p>
        </div>
      </section>
      <section className="section bg-cream-200/60">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Corporate &amp; bulk</p>
            <h2 className="h-section">Planning something bigger?</h2>
            <p className="lead mt-4">Festive gifting, client hampers, team celebrations or wedding favours. Tell us the quantity, budget and date and we'll propose options.</p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-soft"><SmartImage src={images.gifting} alt="Gift boxes with ribbon" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
          </div>
          <EnquiryForm kind="gifting" placeholder="Quantity, budget, delivery date and any branding or personalisation…" extra={{ label: "Enquiry type", options: ["Festive gifting", "Corporate gifting", "Wedding favours", "Birthday hamper", "Other"] }} />
        </div>
      </section>
    </>
  );
}
