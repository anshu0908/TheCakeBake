import type { Metadata } from "next";
import { site } from "@/config/site";
import EnquiryForm from "@/components/EnquiryForm";
import { OpenBadge, PageHero, WhatsAppIcon } from "@/components/ui";

export const metadata: Metadata = { title: "Contact", description: "Visit, call or WhatsApp The Cake Bake in Sector 7, Gurugram." };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk cake">Questions, orders or custom ideas. We reply quickly.</PageHero>
      <section className="container-x grid gap-10 py-14 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card space-y-5 p-6 sm:p-8">
            <div><p className="eyebrow mb-1">Address</p><address className="not-italic">{site.address.full}</address><p className="text-sm text-cocoa-500">Plus Code: {site.plusCode}</p></div>
            <div><p className="eyebrow mb-1">Phone / WhatsApp</p><a className="text-lg font-semibold hover:text-blush-700" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></div>
            <div><p className="eyebrow mb-1">Hours</p><p>Open daily · closes {site.hours.closeLabel}</p><OpenBadge /></div>
            <div className="flex flex-wrap gap-3">
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> WhatsApp us</a>
              <a href={`tel:${site.phoneTel}`} className="btn-outline">Call now</a>
              <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">Directions</a>
            </div>
          </div>
          <iframe title="Map showing The Cake Bake, Sector 7, Gurugram" src={site.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full rounded-3xl border-0 shadow-soft" />
        </div>
        <EnquiryForm kind="contact" placeholder="How can we help?" />
      </section>
    </>
  );
}
