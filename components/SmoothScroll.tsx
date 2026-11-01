"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getLenis, setLenis } from "@/lib/scroll";

/** Lenis inertial scrolling on its own animation frame loop. Off under reduced motion. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, autoRaf: true });
    setLenis(lenis);
    return () => { lenis.destroy(); setLenis(null); };
  }, []);

  // New page: start at the top.
  useEffect(() => { getLenis()?.scrollTo(0, { immediate: true }); }, [pathname]);

  return null;
}
