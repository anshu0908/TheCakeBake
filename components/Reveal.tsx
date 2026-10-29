"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// One shared observer for every reveal on the page.
let io: IntersectionObserver | null = null;
function observer() {
  if (!io) {
    io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io?.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
  }
  return io;
}

/**
 * Scroll reveal that never hides content on its own: the markup is visible as rendered, and only
 * `html.js` (set before paint in the layout) fades it in once it enters the viewport.
 * `delay` is kept for existing callers and maps onto the stagger step.
 */
export default function Reveal({
  children, delay = 0, className = "", as: Tag = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = observer();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);
  const style = { "--i": Math.round(delay / 0.06) } as CSSProperties;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
