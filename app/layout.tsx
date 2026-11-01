import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Young_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Toaster, WhatsAppIcon } from "@/components/ui";
import { ScrollProgress } from "@/components/Premium";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { reviews } from "@/data/reviews";

// Young Serif for display: a heavy, round shop-sign serif with one weight. Hanken Grotesk for text, prices and controls.
const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-cake-bake-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: `${site.name} | Custom cakes in Sector 7, Gurugram`, template: `%s | ${site.name}` },
  description: "Cake shop on Circular Road, Sector 7, Gurugram. Celebration and custom cakes, cupcakes, cake tubs, dry cakes and hampers, delivered across Gurugram the same day or on your date.",
  openGraph: {
    type: "website", siteName: site.name, locale: "en_IN",
    title: `${site.name} | Custom cakes in Sector 7, Gurugram`,
    description: "Order a cake from the menu or get one made to your design. Delivered across Gurugram.",
    images: [{ url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=75", width: 1200, height: 800, alt: "Chocolate cake from The Cake Bake" }],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#FFFBF8", width: "device-width", initialScale: 1, viewportFit: "cover" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Bakery"],
  name: site.name,
  url: site.url,
  telephone: site.phoneTel,
  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=75",
  logo: `${base}/brand/logo.png`,
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
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {/* First in <body> so the loader is up before anything below it paints. */}
        <Preloader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <StoreProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
          <SmoothScroll />
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-[background-color,transform] duration-200 hover:bg-whatsapp-700 active:scale-95 sm:right-6">
            <WhatsAppIcon className="h-7 w-7" />
          </a>
        </StoreProvider>
      </body>
    </html>
  );
}
