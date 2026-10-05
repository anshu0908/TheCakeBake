"use client";
import { useState } from "react";
import { images } from "@/data/images";
import { useStore } from "@/lib/store";
import { categories, type CategoryId, type Product } from "@/lib/types";
import { inr, slugify } from "@/lib/utils";
import SmartImage from "@/components/SmartImage";

const blank = (): Product => ({
  id: "", slug: "", name: "", short: "", description: "", category: "cakes", image: images.products.fruitCake, gallery: [], sizes: [{ label: "500 g", price: 700 }, { label: "1 kg", price: 1300 }],
  tags: [], eggless: true, inStock: true, popularity: 50, messageOnCake: true,
});

export default function ProductsTab() {
  const { products, saveProduct, deleteProduct, notify } = useStore();
  const [edit, setEdit] = useState<Product | null>(null);
  const [q, setQ] = useState("");
  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="pq">Search products</label>
        <input id="pq" className="input flex-1" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn-primary" onClick={() => setEdit(blank())}>+ Add product</button>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-cocoa/10 text-xs uppercase tracking-wider text-cocoa-500"><tr>{["Product", "Category", "From", "In stock", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-cocoa/10">
            {list.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3"><span className="flex items-center gap-3"><span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl"><SmartImage src={p.image} alt={p.name} sizes="48px" /></span><span className="font-medium">{p.name}</span></span></td>
                <td className="px-4 py-3 capitalize">{categories.find((c) => c.id === p.category)?.label}</td>
                <td className="px-4 py-3 tabular-nums">{inr(p.sizes[0]?.price ?? 0)}</td>
                <td className="px-4 py-3">
                  <button role="switch" aria-checked={p.inStock} aria-label={`In stock: ${p.name}`} onClick={() => { saveProduct({ ...p, inStock: !p.inStock }); notify(`${p.name} ${!p.inStock ? "in stock" : "sold out"}`); }} className={`relative h-6 w-11 rounded-full transition ${p.inStock ? "bg-emerald-600" : "bg-cocoa/25"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${p.inStock ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button className="mr-3 underline" onClick={() => setEdit(p)}>Edit</button>
                  <button className="text-red-700 underline" onClick={() => { if (confirm(`Delete ${p.name}?`)) { deleteProduct(p.id); notify("Product deleted"); } }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="p-10 text-center text-cocoa-600">No products found.</p>}
      </div>
      {edit && <Editor p={edit} onClose={() => setEdit(null)} onSave={(p) => { saveProduct(p); setEdit(null); notify("Product saved"); }} />}
    </div>
  );
}

function Editor({ p, onClose, onSave }: { p: Product; onClose: () => void; onSave: (p: Product) => void }) {
  const isNew = !p.id;
  const [f, setF] = useState({ ...p, sizesText: p.sizes.map((s) => `${s.label} | ${s.price}`).join("\n"), bestseller: p.tags.includes("Bestseller") });
  const [err, setErr] = useState<Record<string, string>>({});
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => { setF((x) => ({ ...x, [k]: v })); setErr({}); };

  const save = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Name is required.";
    if (f.short.trim().length < 5) e.short = "Add a short description.";
    const sizes = f.sizesText.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => { const [label, price] = l.split("|").map((x) => x.trim()); return { label, price: Number(price) }; });
    if (sizes.length === 0 || sizes.some((s) => !s.label || !Number.isFinite(s.price) || s.price <= 0)) e.sizes = "One per line as “label | price”, e.g. 1 kg | 1300.";
    if (!/^(https?:\/\/|\/)/.test(f.image)) e.image = "Use an image URL (https://…) or a /public path.";
    setErr(e);
    if (Object.keys(e).length) return;
    const { sizesText: _s, bestseller, ...rest } = f;
    void _s;
    const id = isNew ? `p${Date.now()}` : p.id;
    onSave({
      ...rest, id, slug: isNew ? slugify(f.name) + "-" + id.slice(-4) : p.slug, sizes,
      description: f.description.trim() || f.short.trim(), tags: bestseller ? ["Bestseller"] : [], gallery: [f.image, ...p.gallery.slice(1)],
      messageOnCake: f.category === "cakes",
    });
  };

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[60] grid place-items-center overflow-auto p-4" role="dialog" aria-modal="true" aria-label={isNew ? "Add product" : "Edit product"}>
      <button className="fixed inset-0 bg-cocoa/50" onClick={onClose} aria-label="Close" />
      <div className="card relative w-full max-w-xl space-y-4 bg-cream p-6">
        <h2 className="font-serif text-2xl">{isNew ? "Add product" : "Edit product"}</h2>
        <div><label htmlFor="pn" className="label">Name</label><input id="pn" className={`input ${err.name ? "input-error" : ""}`} value={f.name} onChange={(e) => set("name", e.target.value)} />{err.name && <p className="field-error">{err.name}</p>}</div>
        <div><label htmlFor="pc" className="label">Category</label><select id="pc" className="input" value={f.category} onChange={(e) => set("category", e.target.value as CategoryId)}>{categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
        <div><label htmlFor="ps" className="label">Short description</label><input id="ps" className={`input ${err.short ? "input-error" : ""}`} value={f.short} onChange={(e) => set("short", e.target.value)} />{err.short && <p className="field-error">{err.short}</p>}</div>
        <div><label htmlFor="pd" className="label">Full description</label><textarea id="pd" rows={3} className="input" value={f.description} onChange={(e) => set("description", e.target.value)} /></div>
        <div><label htmlFor="pi" className="label">Image URL</label><input id="pi" className={`input ${err.image ? "input-error" : ""}`} value={f.image} onChange={(e) => set("image", e.target.value)} />{err.image && <p className="field-error">{err.image}</p>}</div>
        <div><label htmlFor="pz" className="label">Sizes and prices</label><textarea id="pz" rows={3} className={`input font-mono text-sm ${err.sizes ? "input-error" : ""}`} value={f.sizesText} onChange={(e) => set("sizesText", e.target.value)} />{err.sizes && <p className="field-error">{err.sizes}</p>}</div>
        <div className="flex flex-wrap gap-5 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-[#3b2418]" checked={f.eggless} onChange={(e) => set("eggless", e.target.checked)} />Eggless available</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-[#3b2418]" checked={f.bestseller} onChange={(e) => set("bestseller", e.target.checked)} />Bestseller</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-[#3b2418]" checked={f.inStock} onChange={(e) => set("inStock", e.target.checked)} />In stock</label>
        </div>
        <div className="flex justify-end gap-3 pt-2"><button className="btn-outline" onClick={onClose}>Cancel</button><button className="btn-primary" onClick={save}>Save product</button></div>
      </div>
    </div>
  );
}
