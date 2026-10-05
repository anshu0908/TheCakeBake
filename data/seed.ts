// Fake orders and custom requests so the admin panel looks alive on first load.
import { seedProducts } from "./products";
import type { CartItem, CustomRequest, Order, OrderStatus } from "@/lib/types";

const DAY = 86400000;
const iso = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();
const dateOnly = (offsetDays: number) => new Date(Date.now() + offsetDays * DAY).toISOString().slice(0, 10);

function line(productId: string, sizeIdx: number, qty = 1, message?: string): CartItem {
  const p = seedProducts.find((x) => x.id === productId)!;
  const s = p.sizes[sizeIdx];
  return { key: `${p.id}|${s.label}|0|${message ?? ""}`, productId: p.id, name: p.name, image: p.image, size: s.label, price: s.price, qty, eggless: false, message };
}

function order(id: string, hoursAgo: number, name: string, phone: string, items: CartItem[], status: OrderStatus, payment: Order["payment"], pincode = "122001", slot = "4 pm - 7 pm", dayOffset = 0): Order {
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const deliveryFee = subtotal >= 1500 ? 0 : 150;
  return {
    id, createdAt: iso(-hoursAgo * 3600000), customer: { name, phone, email: "" },
    address: "Sector 7, Gurugram", pincode,
    deliveryDate: dateOnly(dayOffset), slot, items, subtotal, discount: 0, deliveryFee, total: subtotal + deliveryFee, payment, status,
  };
}

export function seedOrders(): Order[] {
  return [
    order("TCB-10482", 1, "Aarav Mehta", "98100 11122", [line("p7", 1, 1, "Happy Birthday Riya")], "received", "UPI", "122001", "6 pm - 9 pm"),
    order("TCB-10481", 3, "Priya Sharma", "98110 22233", [line("p1", 1, 2), line("p3", 1)], "baking", "Card", "122002", "4 pm - 7 pm"),
    order("TCB-10480", 5, "Kabir Singh", "99999 33344", [line("p5", 1, 1, "Happy Anniversary")], "baking", "Cash on Delivery", "122001", "2 pm - 5 pm"),
    order("TCB-10479", 7, "Neha Verma", "98730 44455", [line("p18", 1)], "out", "UPI", "122011", "12 pm - 3 pm"),
    order("TCB-10478", 9, "Rohan Kapoor", "98999 55566", [line("p9", 0), line("p14", 1)], "delivered", "UPI", "122001", "10 am - 1 pm"),
    order("TCB-10477", 26, "Isha Malhotra", "97170 66677", [line("p10", 1, 1, "Congratulations!")], "delivered", "Card", "122003", "4 pm - 7 pm", -1),
    order("TCB-10476", 30, "Vikram Rao", "98180 77788", [line("p12", 2)], "delivered", "Cash on Delivery", "122001", "6 pm - 9 pm", -1),
    order("TCB-10475", 52, "Sana Khan", "98710 88899", [line("p2", 2), line("p15", 0)], "delivered", "UPI", "122002", "2 pm - 5 pm", -2),
  ];
}

export function seedCustom(): CustomRequest[] {
  return [
    {
      id: "CC-2041", createdAt: iso(-2 * 3600000), name: "Meera Joshi", phone: "98111 99900", email: "meera@example.com",
      occasion: "Birthday", flavour: "Vanilla with fresh fruit", size: "2 kg (20-25 servings)", tiers: 1, shape: "Round",
      theme: "Pastel floral with gold accents", message: "Happy 1st Birthday Anaya", date: dateOnly(3), slot: "4 pm - 7 pm", estLow: 2600, estHigh: 3400, status: "new",
    },
    {
      id: "CC-2040", createdAt: iso(-20 * 3600000), name: "Arjun Bhatia", phone: "99100 12345", email: "arjun@example.com",
      occasion: "Wedding", flavour: "Red velvet", size: "5 kg (50+ servings)", tiers: 3, shape: "Round",
      theme: "Classic white with sugar flowers", message: "Tanya & Karan", date: dateOnly(12), slot: "12 pm - 3 pm", estLow: 11500, estHigh: 15500, status: "quoted",
    },
    {
      id: "CC-2039", createdAt: iso(-45 * 3600000), name: "Simran Kaur", phone: "98760 54321", email: "simran@example.com",
      occasion: "Corporate", flavour: "Chocolate truffle", size: "1 kg (10-12 servings)", tiers: 1, shape: "Square",
      theme: "Company logo on top, brand colours", message: "Congratulations Team", date: dateOnly(5), slot: "10 am - 1 pm", estLow: 1700, estHigh: 2300, status: "new",
    },
  ];
}
