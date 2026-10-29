"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/store";
import { PasswordInput } from "@/components/ui";

type Errors = { id?: string; pw?: string; form?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Admin Login for the client demo. There is no server-side auth in this project: it signs into the
 * existing browser-only demo session (lib/store `login`), whose dashboard holds sample data only.
 */
export default function LoginForm() {
  const router = useRouter();
  const { ready, isAdmin, login } = useStore();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<Errors>({});
  const idRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (ready && isAdmin) router.replace("/admin"); }, [ready, isAdmin, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    const v = id.trim();
    if (!v) next.id = "Enter your email or username.";
    else if (v.includes("@") && !EMAIL.test(v)) next.id = "Enter a valid email address, like name@example.com.";
    if (!pw) next.pw = "Enter your password.";
    if (next.id || next.pw) {
      setErr(next);
      (next.id ? idRef.current : document.getElementById("admin-pw"))?.focus();
      return;
    }
    if (!login(v, pw)) {
      setErr({ form: "Those details don’t match the demo account. Check them and try again." });
      document.getElementById("admin-pw")?.focus();
      return;
    }
    router.push("/admin");
  };

  return (
    <section className="bg-gradient-to-b from-blush-50 to-cream">
      <div className="container-x grid min-h-[calc(100svh-132px)] items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-cocoa-600 transition-colors hover:text-cocoa">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            Back to the website
          </Link>
          <Image src="/brand/logo.png" alt={site.name} width={728} height={565} priority className="mt-10 h-auto w-44 sm:w-52" />
          <h1 className="h-section mt-10">Admin Login</h1>
          <p className="lead mt-4">Sign in to manage bakery operations.</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <form noValidate onSubmit={submit} aria-describedby="demo-note" className="card space-y-6 p-6 sm:p-10">
            {err.form && <p role="alert" className="rounded-field border border-[color:var(--color-error)] bg-white px-4 py-3 text-sm font-medium text-[color:var(--color-error)]">{err.form}</p>}
            <div>
              <label htmlFor="admin-id" className="label">Email or username</label>
              <input ref={idRef} id="admin-id" name="username" type="text" inputMode="email" autoComplete="username" autoCapitalize="none" spellCheck={false}
                className={`input min-h-[52px] ${err.id ? "input-error" : ""}`} value={id} aria-invalid={!!err.id} aria-describedby={err.id ? "admin-id-err" : undefined}
                onChange={(e) => { setId(e.target.value); setErr((x) => ({ ...x, id: undefined, form: undefined })); }} />
              {err.id && <p id="admin-id-err" className="field-error">{err.id}</p>}
            </div>
            <div>
              <label htmlFor="admin-pw" className="label">Password</label>
              <PasswordInput id="admin-pw" name="password" value={pw} invalid={!!err.pw} autoComplete="current-password" className="min-h-[52px]"
                aria-describedby={err.pw ? "admin-pw-err" : undefined}
                onChange={(v) => { setPw(v); setErr((x) => ({ ...x, pw: undefined, form: undefined })); }} />
              {err.pw && <p id="admin-pw-err" className="field-error">{err.pw}</p>}
            </div>
            <button type="submit" className="btn-primary w-full" disabled={!ready}>Sign in</button>
            <div id="demo-note" className="rule-t pt-5 text-sm leading-relaxed text-cocoa-600">
              <p><strong className="font-semibold text-cocoa">Demo mode.</strong> There is no server sign-in yet: the session and the dashboard’s sample orders stay in this browser.</p>
              <p className="mt-2">Demo account: <strong className="font-semibold text-cocoa">{site.admin.user}</strong> / <strong className="font-semibold text-cocoa">{site.admin.pass}</strong></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
