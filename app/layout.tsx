import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Toaster, WhatsAppIcon } from "@/components/ui";
import { ScrollProgress } from "@/components/Premium";
import { reviews } from "@/data/reviews";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-cake-bake-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: `${site.name} | Custom Cakes & Patisserie in Gurugram`, template: `%s | ${site.name}` },
  description: "Fresh, beautifully designed cakes, cupcakes, cake tubs and gifting hampers in Sector 7, Gurugram. Custom cakes, same-day and scheduled delivery.",
  openGraph: {
    type: "website", siteName: site.name, locale: "en_IN",
    title: `${site.name} | Custom Cakes & Patisserie in Gurugram`,
    description: "Cakes made to be remembered. Custom designs, fresh daily, delivered across Gurugram.",
    images: [{ url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=75", width: 1200, height: 800, alt: "Chocolate cake from The Cake Bake" }],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#FBF6EE", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Bakery"],
  name: site.name,
  url: site.url,
  telephone: site.phoneTel,
  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=75",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "IN",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating, reviewCount: site.reviewCount, bestRating: 5 },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: site.hours.open, closes: site.hours.close,
  }],
  review: reviews.filter((r) => r.rating && !r.generic).slice(0, 2).map((r) => ({
    "@type": "Review", author: { "@type": "Person", name: r.author }, reviewRating: { "@type": "Rating", ratingValue: r.rating }, reviewBody: r.full,
  })),
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <StoreProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
            className="fixed bottom-5 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#0E7A57] text-white shadow-lift transition hover:scale-105 sm:right-6">
            <WhatsAppIcon className="h-7 w-7" />
          </a>
        </StoreProvider>
      </body>
    </html>
  );
}
