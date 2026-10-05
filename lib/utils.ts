import { site } from "@/config/site";
import type { CartItem, Order } from "./types";

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const slots = ["10 am - 1 pm", "12 pm - 3 pm", "2 pm - 5 pm", "4 pm - 7 pm", "6 pm - 9 pm"];

export const waLink = (text: string) => `${site.whatsappUrl}?text=${encodeURIComponent(text)}`;

/** Minutes since midnight in Asia/Kolkata */
function istMinutes(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: site.hours.timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  return h * 60 + m;
}
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function openStatus(now = new Date()) {
  const cur = istMinutes(now);
  const open = toMin(site.hours.open);
  const close = toMin(site.hours.close);
  const isOpen = cur >= open && cur < close;
  return {
    isOpen,
    label: isOpen ? "Open now" : "Closed now",
    detail: isOpen ? `Closes ${site.hours.closeLabel}` : `Opens ${site.hours.openLabel}`,
  };
}

/** Today's date (YYYY-MM-DD) in IST, plus offset days */
export function istDate(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: site.hours.timeZone }).format(d);
}

export const isGurugramPin = (pin: string) => /^1220\d{2}$/.test(pin.trim());

export const fmtDate = (d: string) => {
  if (!d) return "";
  const dt = new Date(d.length <= 10 ? d + "T00:00:00" : d);
  return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export const fmtDateTime = (d: string) =>
  new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

export function cartWhatsAppMessage(items: CartItem[], subtotal: number) {
  const lines = items.map(
    (i, n) => `${n + 1}. ${i.name} (${i.size}${i.eggless ? ", eggless" : ""}) x${i.qty} = ${inr(i.price * i.qty)}${i.message ? `\n   Message: "${i.message}"` : ""}`
  );
  return `Hi ${site.name}! I'd like to place an order:\n\n${lines.join("\n")}\n\nSubtotal: ${inr(subtotal)}\n\nPlease confirm availability and delivery details.`;
}

export function orderWhatsAppMessage(o: Order) {
  return `Hi ${site.name}! Following up on order ${o.id} (${inr(o.total)}). Delivery: ${fmtDate(o.deliveryDate)}, ${o.slot}.`;
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
