"use client";
import { useState } from "react";
import { site } from "@/config/site";
import { ratingBreakdown, reviewSummary, reviewThemes, reviews, type Theme } from "@/data/reviews";
import { Stars } from "@/components/ui";

export default function ReviewsClient() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const list = theme ? reviews.filter((r) => r.themes.includes(theme)) : reviews;
  return (
    <section className="container-x grid gap-10 py-12 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
        <div className="card p-6">
          <p className="font-serif text-5xl">{site.rating}</p>
          <Stars n={5} className="mt-1" />
          <p className="mt-1 text-sm text-cocoa-600">{site.reviewCount.toLocaleString("en-IN")} Google reviews</p>
          <ul className="mt-5 space-y-2" aria-label="Rating breakdown">
            {ratingBreakdown.map((r) => (
              <li key={r.stars} className="flex items-center gap-3 text-sm"><span className="w-3">{r.stars}</span><span className="h-2 flex-1 overflow-hidden rounded-full bg-cocoa/10"><span className="block h-full bg-gold" style={{ width: `${r.pct}%` }} /></span></li>
            ))}
          </ul>
          <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm mt-6 w-full">See all reviews on Google</a>
        </div>
        <div className="card bg-gradient-to-br from-white to-blush-50 p-6">
          <p className="eyebrow">✦ Summary</p>
          <p className="mt-3 text-sm leading-relaxed">{reviewSummary}</p>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reviews by topic">
          <button className={`chip ${!theme ? "chip-on" : ""}`} aria-pressed={!theme} onClick={() => setTheme(null)}>All</button>
          {reviewThemes.map((t) => (
            <button key={t.id} className={`chip ${theme === t.id ? "chip-on" : ""}`} aria-pressed={theme === t.id} onClick={() => setTheme(t.id)}>{t.id} <span className="opacity-70">({t.count})</span></button>
          ))}
        </div>
        <p className="mb-4 mt-4 text-sm text-cocoa-500" aria-live="polite">{list.length} review{list.length === 1 ? "" : "s"} shown. Counts show how many Google reviews mention each topic.</p>
        <div className="space-y-5">
          {list.map((r) => (
            <article key={r.id} className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><p className="font-semibold">{r.author}</p><p className="text-sm text-cocoa-500">{r.badge ? `${r.badge} · ` : ""}{r.when}</p></div>
                <div className="flex items-center gap-3">{r.rating && <Stars n={r.rating} />}<span className="rounded-full bg-blush-50 px-2.5 py-1 text-[11px] font-semibold text-blush-700">Google review</span></div>
              </div>
              <p className="mt-4 leading-relaxed">{r.full}</p>
              <div className="mt-4 flex flex-wrap gap-2">{r.themes.map((t) => <span key={t} className="rounded-full border border-cocoa/15 px-3 py-1 text-xs text-cocoa-600">{t}</span>)}</div>
              {r.reply && (
                <div className="mt-5 rounded-2xl border-l-4 border-gold bg-cream p-4 text-sm">
                  <p className="font-semibold">Response from the owner</p>
                  <p className="mt-1 text-cocoa-600">{r.reply}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
