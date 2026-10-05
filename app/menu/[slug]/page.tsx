import type { Metadata } from "next";
import { seedProducts } from "@/data/products";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return seedProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = seedProducts.find((x) => x.slug === slug);
  if (!p) return { title: "Cake" };
  return {
    title: p.name,
    description: p.short,
    openGraph: { title: `${p.name} | The Cake Bake`, description: p.short, images: [{ url: p.image }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductView slug={slug} />;
}
