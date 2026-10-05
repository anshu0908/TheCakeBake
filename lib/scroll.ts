import type Lenis from "lenis";

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenis = l; };
export const getLenis = () => lenis;

/** Lock/unlock page scroll for modals and drawers (works with Lenis). */
export function lockScroll(on: boolean) {
  document.body.style.overflow = on ? "hidden" : "";
  if (on) lenis?.stop(); else lenis?.start();
}
