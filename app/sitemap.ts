import type { MetadataRoute } from "next";
import { seedProducts } from "@/data/products";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-cake-bake-demo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/menu", "/custom-cake", "/gifting", "/about", "/reviews", "/contact", "/faq", "/track", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: base + p, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...seedProducts.map((p) => ({ url: `${base}/menu/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
