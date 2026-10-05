import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = { title: "Reviews", description: "What customers say about The Cake Bake on Google: custom designs, fresh cakes and timely delivery." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="What customers say">From Google reviews, honest and unedited in spirit.</PageHero>
      <ReviewsClient />
    </>
  );
}
