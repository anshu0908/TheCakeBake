import { Bestsellers, Categories, CustomTeaser, Gallery, Hero, Occasions, Testimonials, TrustStrip, VisitUs, WhyLove } from "@/components/home/Sections";
import { CtaBand, Marquee, Pillars, Signature, StatsBand } from "@/components/Premium";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <Bestsellers />
      <Signature />
      <Marquee />
      <CustomTeaser />
      <StatsBand />
      <Occasions />
      <WhyLove />
      <Testimonials />
      <Pillars />
      <Gallery />
      <CtaBand />
      <VisitUs />
    </>
  );
}
