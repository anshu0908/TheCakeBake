import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "FAQ", description: "Answers about ordering, delivery, custom cakes and eggless options at The Cake Bake." };

const faqs = [
  ["How far in advance should I order?", "Menu cakes can often be arranged the same day. For custom designs we recommend at least 48 hours' notice, and more for tiered or wedding cakes."],
  ["Do you deliver across Gurugram?", `Yes. We offer same-day and scheduled delivery in Gurugram, including a no-contact option. Enter your pincode on any product page to check. Free delivery above ₹${site.freeDeliveryAbove.toLocaleString("en-IN")}.`],
  ["Can I get an eggless cake?", "Most cakes have an eggless version. Look for the “Eggless available” label and switch it on before adding to the cart."],
  ["How does a custom cake order work?", "Share your idea and reference photo, receive an estimate and a final quote on WhatsApp, and we bake and deliver on your date."],
  ["Can I put a message on my cake?", "Yes. Add your message on the product page or in the custom cake form."],
  ["How do I pay?", "You can pay online by UPI or card, or choose cash on delivery. You can also place your order over WhatsApp."],
  ["Can I pick up from the shop?", `Takeaway is available at ${site.address.line}, Gurugram. Please order ahead so your cake is ready.`],
  ["How do I track my order?", "Use the Track order page with your order ID."],
];

export default function FAQ() {
  return (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions" />
      <section className="container-x max-w-3xl py-14">
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group card px-6 py-5 open:shadow-lift">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl [&::-webkit-details-marker]:hidden">
                {q}<span className="text-2xl text-gold transition group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-cocoa-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
