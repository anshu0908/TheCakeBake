import { Bestsellers, Categories, CustomTeaser, Gallery, Hero, Occasions, Testimonials, TrustStrip, VisitUs } from "@/components/home/Sections";
import { Signature } from "@/components/Premium";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <Bestsellers />
      <Signature />
      <Occasions />
      <CustomTeaser />
      <Testimonials />
      <Gallery />
      <VisitUs />
    </>
  );
}
