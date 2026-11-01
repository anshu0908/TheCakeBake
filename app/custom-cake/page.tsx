import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import CustomForm from "./CustomForm";

export const metadata: Metadata = {
  title: "Custom cake",
  description: "Design a custom cake in a few steps. Share your idea, get an estimate and confirm on WhatsApp.",
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Custom cake" title="Plan a custom cake">Tell us what you have in mind and we’ll send a quote on WhatsApp.</PageHero>
      <Suspense fallback={null}><CustomForm /></Suspense>
    </>
  );
}
