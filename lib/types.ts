export type CategoryId = "cakes" | "cupcakes" | "tubs" | "dry" | "hampers";

export interface SizeOption { label: string; price: number }

export interface Product {
  id: string;
  slug: string;
  name: string;
  short: string;
  description: string;
  category: CategoryId;
  image: string;
  gallery: string[];
  sizes: SizeOption[];
  tags: ("Bestseller" | "New")[];
  eggless: boolean; // eggless version available
  inStock: boolean;
  popularity: number;
  messageOnCake: boolean;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  qty: number;
  eggless: boolean;
  message?: string;
  date?: string;
  slot?: string;
}

export type OrderStatus = "received" | "baking" | "out" | "delivered";

export interface Order {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; email: string };
  address: string;
  pincode: string;
  deliveryDate: string;
  slot: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  coupon?: string;
  payment: "UPI" | "Card" | "Cash on Delivery" | "WhatsApp";
  status: OrderStatus;
}

export interface CustomRequest {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  occasion: string;
  flavour: string;
  size: string;
  tiers: number;
  shape: string;
  theme: string;
  message: string;
  reference?: string;
  date: string;
  slot: string;
  estLow: number;
  estHigh: number;
  status: "new" | "quoted" | "confirmed";
}

export interface Enquiry {
  id: string;
  createdAt: string;
  kind: "gifting" | "contact";
  name: string;
  phone: string;
  email: string;
  details: string;
}

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "cakes", label: "Cakes", blurb: "Signature celebration cakes" },
  { id: "cupcakes", label: "Cupcakes & Pastries", blurb: "Single-serve indulgences" },
  { id: "tubs", label: "Cake Tubs", blurb: "Layered desserts in a tub" },
  { id: "dry", label: "Dry Cakes", blurb: "Tea-time & festive loaves" },
  { id: "hampers", label: "Hampers & Gifting", blurb: "Curated gift boxes" },
];

export const statusSteps: { id: OrderStatus; label: string }[] = [
  { id: "received", label: "Received" },
  { id: "baking", label: "Baking" },
  { id: "out", label: "Out for delivery" },
  { id: "delivered", label: "Delivered" },
];
