import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse cakes, cupcakes and pastries, cake tubs, dry cakes and gifting hampers from The Cake Bake, Gurugram.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero eyebrow="The menu" title="Cakes & Desserts">Baked fresh daily. Filter by category, flavour and more.</PageHero>
      <Suspense fallback={<div className="container-x py-20 text-center text-cocoa-500">Loading menu…</div>}>
        <MenuClient />
      </Suspense>
    </>
  );
}
