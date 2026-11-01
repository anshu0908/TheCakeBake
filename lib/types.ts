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
  { id: "cakes", label: "Cakes", blurb: "Celebration cakes in 500 g, 1 kg and 2 kg" },
  { id: "cupcakes", label: "Cupcakes & pastries", blurb: "Cupcakes, pastries, brownies and macarons" },
  { id: "tubs", label: "Cake tubs", blurb: "Sponge and cream layered in a tub" },
  { id: "dry", label: "Dry cakes", blurb: "Fruit and plum loaves for tea time and festivals" },
  { id: "hampers", label: "Hampers & gifting", blurb: "Gift boxes of cake and treats" },
];

export const statusSteps: { id: OrderStatus; label: string }[] = [
  { id: "received", label: "Received" },
  { id: "baking", label: "Baking" },
  { id: "out", label: "Out for delivery" },
  { id: "delivered", label: "Delivered" },
];
