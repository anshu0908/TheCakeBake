import type { Metadata } from "next";
import { site } from "@/config/site";
import EnquiryForm from "@/components/EnquiryForm";
import { OpenBadge, PageHero, WhatsAppIcon } from "@/components/ui";

export const metadata: Metadata = { title: "Contact", description: "Visit, call or WhatsApp The Cake Bake in Sector 7, Gurugram." };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk cake">Questions, orders or custom ideas. We reply quickly.</PageHero>

      <section className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
        {/* Ways to reach the shop, fastest first, each with its own action */}
        <div className="lg:col-span-5">
          <h2 className="h-title !text-[1.75rem]">Reach us directly</h2>
          <ul className="mt-6 border-t border-cocoa/15">
            <li className="border-b border-cocoa/15 py-6">
              <p className="font-serif text-2xl">WhatsApp</p>
              <p className="mt-1 text-cocoa-600">The fastest reply. Send reference photos for custom cakes here.</p>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm mt-4"><WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp</a>
            </li>
            <li className="border-b border-cocoa/15 py-6">
              <p className="font-serif text-2xl">Call</p>
              <a className="mt-1 inline-block py-1 text-xl font-semibold tabular-nums transition-colors hover:text-blush-700" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
              <p className="mt-1 text-cocoa-600">Open daily, closes {site.hours.closeLabel}.</p>
              <div className="mt-2"><OpenBadge /></div>
            </li>
            <li className="border-b border-cocoa/15 py-6">
              <p className="font-serif text-2xl">Visit</p>
              <address className="mt-1 max-w-[40ch] not-italic text-cocoa-600">{site.address.full}</address>
              <p className="mt-1 text-sm text-cocoa-500">Plus Code: {site.plusCode}</p>
              <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm mt-4">Get directions</a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="h-title !text-[1.75rem]">Send a message</h2>
          <p className="mt-2 text-cocoa-600">We’ll reply on the number you give us.</p>
          <div className="mt-6"><EnquiryForm kind="contact" placeholder="e.g. Can you do a 2 kg eggless cake for Saturday…" /></div>
        </div>
      </section>

      <section className="container-x pb-14 sm:pb-20">
        <iframe title="Map showing The Cake Bake, Sector 7, Gurugram" src={site.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-card border-0 bg-cream-200 lg:h-[440px]" />
      </section>
    </>
  );
}
