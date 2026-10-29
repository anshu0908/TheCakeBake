"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { openStatus } from "@/lib/utils";
import { useStore } from "@/lib/store";

export function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-gold ${className}`} role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < n ? "fill-current" : "fill-cocoa/15"}`} aria-hidden>
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6L10 15.1 4.7 18l1.1-6L1.4 7.8l6-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

/** Live open/closed badge (Asia/Kolkata). Renders after mount to avoid hydration mismatch. */
export function OpenBadge({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const [s, setS] = useState<ReturnType<typeof openStatus> | null>(null);
  useEffect(() => {
    const tick = () => setS(openStatus());
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  if (!s) return <span className={`inline-block h-5 w-36 ${className}`} aria-hidden />;
  return (
    <span role="status" className={`inline-flex items-center gap-2 text-sm font-medium ${dark ? "text-cream" : "text-cocoa"} ${className}`}>
      <span className="h-2 w-2 rounded-full" style={{ background: s.isOpen ? "var(--color-success)" : "var(--color-error)" }} aria-hidden />
      <span>{s.label}</span>
      <span className={dark ? "text-cream/75" : "text-cocoa-600"}>· {s.detail}</span>
    </span>
  );
}

/** Inner-page opening: a working breadcrumb (the old eyebrow text names the current page), then the head, left-aligned on the brand wash. */
export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="border-b border-cocoa/10 bg-gradient-to-b from-blush-50 to-cream">
      <div className="container-x pb-14 pt-8 sm:pb-20 sm:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li><Link href="/" className="hover:text-blush-700">Home</Link></li>
            <li aria-current="page">{eyebrow ?? title}</li>
          </ol>
        </nav>
        <h1 className="h-display mt-10 sm:mt-14">{title}</h1>
        {children && <div className="lead mt-5">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ title, sub, center = false, className = "" }: { title: string; sub?: string; center?: boolean; className?: string }) {
  return (
    <div className={`mb-12 sm:mb-16 ${center ? "mx-auto max-w-2xl text-center [&>*]:mx-auto" : ""} ${className}`}>
      <h2 className="h-section">{title}</h2>
      {sub && <p className="lead mt-4">{sub}</p>}
    </div>
  );
}

export function Toaster() {
  const { toast } = useStore();
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4">
      {toast && <div className="rounded-full bg-cocoa px-5 py-3 text-sm font-medium text-cream shadow-lift">{toast}</div>}
    </div>
  );
}

export const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.400-.9-.8-1.4-1.700-1.600-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.100c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.400 1 2.800 1.200 3c.1.2 2 3.100 4.900 4.300.7.3 1.200.5 1.600.6.7.2 1.300.2 1.800.1.500-.1 1.700-.7 1.900-1.400.2-.7.2-1.200.2-1.400-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.500 15.200L2 22l4.900-1.500A10 10 0 1012 2zm0 18.200c-1.500 0-2.900-.4-4.200-1.200l-.3-.2-2.900.9.9-2.800-.2-.3A8.200 8.200 0 1112 20.200z" />
  </svg>
);

export function PasswordInput({ id, value, onChange, invalid, className = "", ...rest }: { id: string; value: string; onChange: (v: string) => void; invalid?: boolean; className?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id" | "type">) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...rest} id={id} type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid} className={`input pr-12 ${invalid ? "input-error" : ""} ${className}`} />
      <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show} aria-label={show ? "Hide password" : "Show password"} className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-cocoa-600 transition-colors hover:bg-cocoa/5 hover:text-cocoa">
        {show ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 3l18 18M10.6 6.2A9.8 9.8 0 0112 6c5 0 8.500 4.200 9.500 6-.5.900-1.400 2.100-2.700 3.200M6.700 6.800C4.600 8.100 3.200 10 2.500 12c1 1.800 4.500 6 9.500 6 1.600 0 3-.4 4.200-1M9.900 9.900a3 3 0 004.200 4.200" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2.500 12C3.500 10 7 6 12 6s8.500 4 9.500 6c-1 2-4.500 6-9.500 6S3.500 14 2.500 12z" /><circle cx="12" cy="12" r="3" /></svg>
        )}
      </button>
    </div>
  );
}
