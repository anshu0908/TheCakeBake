import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Terms() {
  return (
    <>
      <PageHero title="Terms & conditions" />
      <article className="container-x max-w-3xl space-y-6 py-14 leading-relaxed text-cocoa-600">
        <h2 className="font-serif text-2xl text-cocoa">Orders</h2>
        <p>Orders are confirmed once we acknowledge them by message or call. Custom cake designs are confirmed with you before baking begins.</p>
        <h2 className="font-serif text-2xl text-cocoa">Delivery</h2>
        <p>Delivery is available in selected Gurugram pincodes, within the time slot you choose. Free delivery applies above ₹{site.freeDeliveryAbove.toLocaleString("en-IN")}. Please make sure someone is available to receive the order.</p>
        <h2 className="font-serif text-2xl text-cocoa">Changes and cancellations</h2>
        <p>Please contact us as early as possible if you need to change or cancel. Custom orders that are already in preparation may not be refundable.</p>
        <h2 className="font-serif text-2xl text-cocoa">Freshness and allergens</h2>
        <p>Our products are made in a kitchen that handles nuts, dairy, gluten and eggs. Please tell us about any allergies when ordering. Cakes are best enjoyed fresh and stored as advised.</p>
        <p>Questions? Call {site.phoneDisplay}.</p>
        <p className="text-sm text-cocoa-500">This is a general summary and should be reviewed before the website goes live.</p>
      </article>
    </>
  );
}
