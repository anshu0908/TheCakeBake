import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import TrackClient from "./TrackClient";

export const metadata: Metadata = { title: "Track your order", description: "Enter your order ID to see where your cake is." };

export default function TrackPage() {
  return (
    <>
      <PageHero eyebrow="Order tracking" title="Where's my cake?">Enter the order ID from your confirmation.</PageHero>
      <Suspense fallback={null}><TrackClient /></Suspense>
    </>
  );
}
