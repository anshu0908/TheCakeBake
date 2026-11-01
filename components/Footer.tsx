import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { OpenBadge } from "./ui";

const cols = [
  { title: "Menu", links: [["Cakes", "/menu?cat=cakes"], ["Cupcakes & pastries", "/menu?cat=cupcakes"], ["Cake tubs", "/menu?cat=tubs"], ["Dry cakes", "/menu?cat=dry"], ["Hampers", "/menu?cat=hampers"]] },
  { title: "The shop", links: [["Custom cake", "/custom-cake"], ["Gifting", "/gifting"], ["About", "/about"], ["Reviews", "/reviews"], ["Contact", "/contact"]] },
  { title: "Help", links: [["Track an order", "/track"], ["FAQ", "/faq"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Admin Login", "/admin/login"]] },
];

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export default function Footer() {
  return (
    <footer className="on-dark bg-cocoa text-cream/85">
      <div className="container-x flex flex-col items-start gap-8 pt-20 sm:flex-row sm:items-center sm:gap-12 sm:pt-24">
        {/* The logo's charcoal needs a light ground: it sits on a round paper plate, as the mark was first drawn, in a white circle. */}
        <Link href="/" aria-label={`${site.name} home`} className="grid h-48 w-48 shrink-0 place-items-center rounded-full bg-cream sm:h-56 sm:w-56">
          <Image src="/brand/logo.png" alt={site.name} width={728} height={565} className="h-auto w-[72%]" />
        </Link>
        <p className="max-w-lg font-serif text-2xl leading-snug text-cream sm:text-[2rem]">Cakes, cupcakes, cake tubs and hampers from Circular Road, Sector 7. Open every day until {site.hours.closeLabel}.</p>
      </div>

      <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <address className="space-y-1.5 not-italic leading-relaxed">
            <p className="max-w-xs">{site.address.full}</p>
            <p><a className="text-lg font-semibold tabular-nums text-cream transition-colors hover:text-blush-200" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></p>
          </address>
          <div className="mt-4"><OpenBadge dark /></div>
          <div className="mt-6 flex gap-2">
            {[
              ["Instagram", site.social.instagram, "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.500-1.500v.01"],
              ["Facebook", site.social.facebook, "M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"],
              ["YouTube", site.social.youtube, "M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8zm7 1.500v5l4.500-2.500L10 9.500z"],
            ].map(([n, href, d]) => (
              <a key={n} href={href} target="_blank" rel="noopener noreferrer" aria-label={n} className="grid h-11 w-11 place-items-center rounded-full bg-cocoa-700 transition-colors hover:bg-cream hover:text-cocoa">
                <Icon d={d} />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="term mb-1.5">{c.title}</p>
              <ul className="text-[15px]">
                {c.links.map(([l, h]) => (
                  <li key={l}><Link href={h} className="inline-block py-2.5 transition-colors hover:text-blush-200">{l}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="bg-black/20">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-[13px] text-cream/75 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}</p>
          {site.demoCredit && <p>{site.demoCredit}</p>}
        </div>
      </div>
    </footer>
  );
}
