import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { PageHero, WhatsAppIcon } from "@/components/ui";

export const metadata: Metadata = { title: "FAQ", description: "Answers about ordering, delivery, custom cakes and eggless options at The Cake Bake." };

const groups: { topic: string; faqs: [string, string][] }[] = [
  {
    topic: "Ordering",
    faqs: [
      ["How far in advance should I order?", "Menu cakes can often be arranged the same day. For custom designs we recommend at least 48 hours’ notice, and more for tiered or wedding cakes."],
      ["How does a custom cake order work?", "Share your idea and reference photo, receive an estimate and a final quote on WhatsApp, and we bake and deliver on your date."],
      ["Can I put a message on my cake?", "Yes. Add your message on the product page or in the custom cake form."],
    ],
  },
  {
    topic: "Delivery & pickup",
    faqs: [
      ["Do you deliver across Gurugram?", `Yes. We offer same-day and scheduled delivery in Gurugram, including a no-contact option. Enter your pincode on any product page to check. Free delivery above ₹${site.freeDeliveryAbove.toLocaleString("en-IN")}.`],
      ["Can I pick up from the shop?", `Takeaway is available at ${site.address.line}, Gurugram. Please order ahead so your cake is ready.`],
      ["How do I track my order?", "Use the Track order page with the order ID from your confirmation."],
    ],
  },
  {
    topic: "Cakes & payment",
    faqs: [
      ["Can I get an eggless cake?", "Most cakes have an eggless version. Look for the “Eggless available” label and switch it on before adding to the cart."],
      ["How do I pay?", "You can pay online by UPI or card, or choose cash on delivery. You can also place your order over WhatsApp."],
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions" />
      <section className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-14 lg:col-span-7">
          {groups.map((g) => (
            <div key={g.topic}>
              <h2 className="h-title !text-[1.75rem]">{g.topic}</h2>
              <div className="mt-4 border-t border-cocoa/15">
                {g.faqs.map(([q, a]) => (
                  <details key={q} className="group border-b border-cocoa/15">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl transition-colors hover:text-blush-700 [&::-webkit-details-marker]:hidden">
                      {q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cocoa/20 text-lg leading-none text-cocoa-600 transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="max-w-[60ch] pb-6 leading-relaxed text-cocoa-600">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-card bg-cream-200/70 p-6 sm:p-8 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9">
          <h2 className="h-title">Still have a question?</h2>
          <p className="mt-3 text-cocoa-600">Message us with your date and what you have in mind, and we’ll help you choose.</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp</a>
            <a href={`tel:${site.phoneTel}`} className="btn-outline">Call {site.phoneDisplay}</a>
          </div>
          <p className="mt-6 text-sm text-cocoa-600">Planning a custom cake? <Link href="/custom-cake" className="link">Start a request</Link></p>
        </aside>
      </section>
    </>
  );
}
