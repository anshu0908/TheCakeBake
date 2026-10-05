# The Cake Bake: demo website

A pitch-ready demo for a Gurugram bakery. Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion. No database, no API keys.

## Run

```bash
npm i && npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy to Vercel

Push the repo to GitHub, then "Add New Project" on Vercel and import it. No settings needed. Optionally set `NEXT_PUBLIC_SITE_URL` (used for sitemap, robots and Open Graph) to the live domain.

## Admin

Go to `/admin` (linked in the footer). Demo login: **admin / cakebake123**. Session and all data live in the browser's `localStorage`. "Reset demo data" restores the seeded state.

## Where to change things

| What | File |
| --- | --- |
| Name, phone, WhatsApp, address, hours, delivery threshold and fee, coupon codes, social links, footer credit, admin login | `config/site.ts` |
| Opening time (**placeholder 9:00 am**, not confirmed by the client) | `config/site.ts` → `hours.open` |
| All images (swap for the owner's real photos) | `data/images.ts` |
| Menu items and **placeholder prices** | `data/products.ts` (or live from the admin Products tab) |
| Reviews and rating breakdown | `data/reviews.ts` |
| Seeded fake orders and custom requests | `data/seed.ts` |

Remove the footer credit by setting `demoCredit: ""` in `config/site.ts`.

## What is mocked

- **Prices** are placeholders, not the client's real prices.
- **Payments** (UPI, card, cash on delivery): no real payment; checkout simulates processing.
- **Orders, custom requests, enquiries, products and the admin session** are stored in `localStorage`, per browser. Nothing is sent to a server. Orders appear in `/admin` and `/track` on the same browser.
- **Pincode check**: accepts `1220xx` only.
- **Coupons**: `WELCOME10` (10%) and `CAKEBAKE5` (5%).
- **Custom cake estimate** is a simple size × tiers formula; the real quote is confirmed on WhatsApp.
- **Rating breakdown bars** are an illustrative distribution consistent with a 4.6 average; Google's real breakdown was not provided.
- **Dashboard** revenue chart includes mock history for earlier days.
- **Photography** is free-licence Unsplash placeholder imagery.
- **Social links** are placeholders.
- Reviews are real Google excerpts (paraphrased) from the brief. Two reviews on the site have no star rating because none was provided. "Verified Google reviewer" items are generic filler.
- **Reference image upload** is client-side only (resized and stored in `localStorage`).
- The WhatsApp order buttons open a pre-filled `wa.me` message.

## Decisions

- The Hindi name was removed on request; the brand is shown in English only.
- Opening hours use the Asia/Kolkata time zone for the live Open / Closed badge.
- `/order/[id]` is the order confirmation page; `/track?id=…` tracks it.
