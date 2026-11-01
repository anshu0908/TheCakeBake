import { useEffect, useState } from "react";

/**
 * Keeps an overlay mounted long enough to animate out. `shown` flips one frame after mount so the
 * CSS transition runs on the way in, and the unmount waits `ms` so it runs on the way out.
 */
export function usePresence(open: boolean, ms = 300) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      let r2 = 0;
      const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setShown(true)); });
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(t);
  }, [open, ms]);
  return { mounted, shown };
}
