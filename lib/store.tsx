"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { site } from "@/config/site";
import { seedProducts } from "@/data/products";
import { seedCustom, seedOrders } from "@/data/seed";
import type { CartItem, CustomRequest, Enquiry, Order, OrderStatus, Product } from "./types";

const KEY = "cb-demo-v1";
const ADMIN_KEY = "cb-admin-v1";

interface Persisted {
  products: Product[];
  orders: Order[];
  custom: CustomRequest[];
  enquiries: Enquiry[];
  cart: CartItem[];
  wishlist: string[];
  coupon: string | null;
}

export interface PlaceOrderInput {
  customer: Order["customer"];
  address: string;
  pincode: string;
  deliveryDate: string;
  slot: string;
  payment: Order["payment"];
}

interface Store extends Persisted {
  ready: boolean;
  isAdmin: boolean;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  toast: string | null;
  notify: (m: string) => void;
  cartCount: number;
  totals: { subtotal: number; discount: number; deliveryFee: number; total: number; couponPct: number };
  addToCart: (item: Omit<CartItem, "key" | "qty"> & { qty?: number }, opts?: { silent?: boolean }) => void;
  setQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;
  toggleWish: (id: string) => void;
  placeOrder: (input: PlaceOrderInput) => Order;
  placeWhatsAppOrder: () => void;
  setOrderStatus: (id: string, s: OrderStatus) => void;
  addCustom: (r: Omit<CustomRequest, "id" | "createdAt" | "status">) => CustomRequest;
  setCustomStatus: (id: string, s: CustomRequest["status"]) => void;
  addEnquiry: (e: Omit<Enquiry, "id" | "createdAt">) => void;
  saveProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  resetDemo: () => void;
}

const Ctx = createContext<Store | null>(null);

const initial = (): Persisted => ({
  products: seedProducts,
  orders: seedOrders(),
  custom: seedCustom(),
  enquiries: [],
  cart: [],
  wishlist: [],
  coupon: null,
});

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Persisted>(initial);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData((d) => ({ ...d, ...JSON.parse(raw) }));
      setIsAdmin(localStorage.getItem(ADMIN_KEY) === "1");
    } catch {}
    setReady(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* quota exceeded (e.g. big reference images): ignore for demo */
    }
  }, [data, ready]);

  const notify = useCallback((m: string) => {
    setToast(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const patch = useCallback((p: Partial<Persisted>) => setData((d) => ({ ...d, ...p })), []);

  const couponPct = data.coupon ? site.coupons[data.coupon] ?? 0 : 0;
  const totals = useMemo(() => {
    const subtotal = data.cart.reduce((a, i) => a + i.price * i.qty, 0);
    const discount = Math.round((subtotal * couponPct) / 100);
    const after = subtotal - discount;
    const deliveryFee = subtotal === 0 || after >= site.freeDeliveryAbove ? 0 : site.deliveryFee;
    return { subtotal, discount, deliveryFee, total: after + deliveryFee, couponPct };
  }, [data.cart, couponPct]);

  const cartCount = data.cart.reduce((a, i) => a + i.qty, 0);

  const addToCart: Store["addToCart"] = (item, opts) => {
    const key = [item.productId, item.size, item.eggless ? 1 : 0, item.message ?? "", item.date ?? "", item.slot ?? ""].join("|");
    const qty = item.qty ?? 1;
    setData((d) => {
      const existing = d.cart.find((c) => c.key === key);
      const cart = existing
        ? d.cart.map((c) => (c.key === key ? { ...c, qty: Math.min(c.qty + qty, 20) } : c))
        : [...d.cart, { ...item, key, qty }];
      return { ...d, cart };
    });
    if (!opts?.silent) setCartOpen(true);
  };

  const setQty = (key: string, qty: number) =>
    setData((d) => ({ ...d, cart: qty <= 0 ? d.cart.filter((c) => c.key !== key) : d.cart.map((c) => (c.key === key ? { ...c, qty: Math.min(qty, 20) } : c)) }));
  const removeFromCart = (key: string) => setData((d) => ({ ...d, cart: d.cart.filter((c) => c.key !== key) }));

  const applyCoupon: Store["applyCoupon"] = (code) => {
    const c = code.trim().toUpperCase();
    if (!c) return { ok: false, message: "Enter a coupon code." };
    if (!(c in site.coupons)) return { ok: false, message: "That code isn't valid. Try WELCOME10." };
    patch({ coupon: c });
    return { ok: true, message: `${c} applied: ${site.coupons[c]}% off.` };
  };

  const toggleWish = (id: string) =>
    setData((d) => {
      const has = d.wishlist.includes(id);
      return { ...d, wishlist: has ? d.wishlist.filter((x) => x !== id) : [...d.wishlist, id] };
    });

  const nextOrderId = (orders: Order[]) => {
    const max = orders.reduce((m, o) => Math.max(m, Number(o.id.replace(/\D/g, "")) || 0), 10000);
    return `TCB-${max + 1}`;
  };

  const placeOrder: Store["placeOrder"] = (input) => {
    const order: Order = {
      id: nextOrderId(data.orders),
      createdAt: new Date().toISOString(),
      ...input,
      items: data.cart,
      subtotal: totals.subtotal,
      discount: totals.discount,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      coupon: data.coupon ?? undefined,
      status: "received",
    };
    setData((d) => ({ ...d, orders: [order, ...d.orders], cart: [], coupon: null }));
    return order;
  };

  const placeWhatsAppOrder = () => {
    // The WhatsApp order is recorded too so the owner's panel stays complete.
    const order: Order = {
      id: nextOrderId(data.orders),
      createdAt: new Date().toISOString(),
      customer: { name: "WhatsApp customer", phone: "", email: "" },
      address: "To be confirmed on WhatsApp",
      pincode: "",
      deliveryDate: new Date().toISOString().slice(0, 10),
      slot: "To be confirmed",
      payment: "WhatsApp",
      items: data.cart,
      subtotal: totals.subtotal,
      discount: totals.discount,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      coupon: data.coupon ?? undefined,
      status: "received",
    };
    setData((d) => ({ ...d, orders: [order, ...d.orders] }));
  };

  const setOrderStatus = (id: string, s: OrderStatus) =>
    setData((d) => ({ ...d, orders: d.orders.map((o) => (o.id === id ? { ...o, status: s } : o)) }));

  const addCustom: Store["addCustom"] = (r) => {
    const max = data.custom.reduce((m, c) => Math.max(m, Number(c.id.replace(/\D/g, "")) || 0), 2000);
    const req: CustomRequest = { ...r, id: `CC-${max + 1}`, createdAt: new Date().toISOString(), status: "new" };
    setData((d) => ({ ...d, custom: [req, ...d.custom] }));
    return req;
  };
  const setCustomStatus = (id: string, s: CustomRequest["status"]) =>
    setData((d) => ({ ...d, custom: d.custom.map((c) => (c.id === id ? { ...c, status: s } : c)) }));

  const addEnquiry: Store["addEnquiry"] = (e) =>
    setData((d) => ({ ...d, enquiries: [{ ...e, id: `EN-${d.enquiries.length + 1}`, createdAt: new Date().toISOString() }, ...d.enquiries] }));

  const saveProduct = (p: Product) =>
    setData((d) => ({ ...d, products: d.products.some((x) => x.id === p.id) ? d.products.map((x) => (x.id === p.id ? p : x)) : [p, ...d.products] }));
  const deleteProduct = (id: string) => setData((d) => ({ ...d, products: d.products.filter((p) => p.id !== id) }));

  const login = (u: string, p: string) => {
    const ok = u.trim() === site.admin.user && p === site.admin.pass;
    if (ok) {
      setIsAdmin(true);
      try { localStorage.setItem(ADMIN_KEY, "1"); } catch {}
    }
    return ok;
  };
  const logout = () => {
    setIsAdmin(false);
    try { localStorage.removeItem(ADMIN_KEY); } catch {}
  };

  const resetDemo = () => {
    setData(initial());
    notify("Demo data reset");
  };

  const value: Store = {
    ...data, ready, isAdmin, cartOpen, setCartOpen, toast, notify, cartCount, totals,
    addToCart, setQty, removeFromCart, applyCoupon, clearCoupon: () => patch({ coupon: null }), toggleWish,
    placeOrder, placeWhatsAppOrder, setOrderStatus, addCustom, setCustomStatus, addEnquiry,
    saveProduct, deleteProduct, login, logout, resetDemo,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}
