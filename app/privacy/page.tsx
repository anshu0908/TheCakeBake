import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy policy" />
      <article className="container-x max-w-3xl space-y-6 py-14 leading-relaxed text-cocoa-600">
        <p>We collect only the details needed to take and deliver your order: your name, phone number, delivery address and, optionally, your email.</p>
        <h2 className="font-serif text-2xl text-cocoa">How we use your information</h2>
        <p>To confirm and deliver orders, to contact you about them, and to respond to your enquiries. We do not sell your personal information.</p>
        <h2 className="font-serif text-2xl text-cocoa">Sharing</h2>
        <p>We share your delivery details only with the people who help deliver your order, and with payment providers where relevant.</p>
        <h2 className="font-serif text-2xl text-cocoa">Your choices</h2>
        <p>You can ask us to correct or delete your details at any time by contacting us on {site.phoneDisplay}.</p>
        <p className="text-sm text-cocoa-500">This is a general summary and should be reviewed before the website goes live.</p>
      </article>
    </>
  );
}
