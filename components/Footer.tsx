import Link from "next/link";
import { site } from "@/config/site";
import { OpenBadge } from "./ui";

const cols = [
  { title: "Shop", links: [["Cakes", "/menu?cat=cakes"], ["Cupcakes & Pastries", "/menu?cat=cupcakes"], ["Cake Tubs", "/menu?cat=tubs"], ["Dry Cakes", "/menu?cat=dry"], ["Hampers", "/menu?cat=hampers"]] },
  { title: "Company", links: [["Custom Cake", "/custom-cake"], ["Gifting", "/gifting"], ["About", "/about"], ["Reviews", "/reviews"], ["Contact", "/contact"]] },
  { title: "Help", links: [["Track order", "/track"], ["FAQ", "/faq"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Admin", "/admin"]] },
];

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export default function Footer() {
  return (
    <footer className="mt-10 bg-cocoa text-cream/80">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="font-serif text-3xl text-cream">{site.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">Boutique cakes, pastries and gifting in Gurugram. Baked fresh, designed for your celebration.</p>
          <address className="mt-5 space-y-1 text-sm not-italic">
            <p>{site.address.full}</p>
            <p><a className="hover:text-gold-300" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></p>
          </address>
          <div className="mt-3"><OpenBadge dark /></div>
          <div className="mt-5 flex gap-2">
            {[
              ["Instagram", site.social.instagram, "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.500-1.500v.01"],
              ["Facebook", site.social.facebook, "M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"],
              ["YouTube", site.social.youtube, "M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8zm7 1.500v5l4.500-2.500L10 9.500z"],
            ].map(([n, href, d]) => (
              <a key={n} href={href} target="_blank" rel="noopener noreferrer" aria-label={n} className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 hover:border-gold-300 hover:text-gold-300">
                <Icon d={d} />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{c.title}</p>
              <ul className="space-y-2.5 text-sm">
                {c.links.map(([l, h]) => (
                  <li key={l}><Link href={h} className="hover:text-gold-300">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          {site.demoCredit && <p>{site.demoCredit}</p>}
        </div>
      </div>
    </footer>
  );
}
