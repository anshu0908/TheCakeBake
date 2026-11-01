import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/data/images";
import { seedProducts } from "@/data/products";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Gifting & Hampers", description: "Cake hampers, gift boxes and bulk orders for offices and weddings from The Cake Bake, Gurugram." };

export default function Gifting() {
  const hampers = seedProducts.filter((p) => p.category === "hampers");
  return (
    <>
      <PageHero eyebrow="Gifting" title="Hampers and gift boxes">Cake, cupcakes and sweets packed to give. We also take bulk orders for offices and weddings.</PageHero>
      <section className="section">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {hampers.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <p className="mt-8"><Link href="/menu?cat=hampers" className="link">See hampers on the menu</Link></p>
        </div>
      </section>
      <section className="section bg-cream-200/60">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h-section">Corporate &amp; bulk orders</h2>
            <p className="lead mt-4">Festive gifts, client hampers, team celebrations or wedding favours. Tell us how many, your budget and the date, and we’ll send you options.</p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-card bg-cream-200"><SmartImage src={images.gifting} alt="Gift boxes with ribbon" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
          </div>
          <EnquiryForm kind="gifting" placeholder="Quantity, budget, delivery date and any branding or personalisation…" extra={{ label: "Enquiry type", options: ["Festive gifting", "Corporate gifting", "Wedding favours", "Birthday hamper", "Other"] }} />
        </div>
      </section>
    </>
  );
}
