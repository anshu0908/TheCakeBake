import { Bestsellers, Hero, MenuBoard, Testimonials, VisitUs } from "@/components/home/Sections";
import MessageCake from "@/components/home/MessageCake";
import { Signature } from "@/components/Premium";

// The order follows the visitor's two jobs: order off the menu, or get a cake made. Then proof, then where the shop is.
export default function Home() {
  return (
    <>
      <Hero />
      <Bestsellers />
      <MenuBoard />
      <Signature />
      <MessageCake />
      <Testimonials />
      <VisitUs />
    </>
  );
}
