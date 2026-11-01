# Design: The Cake Bake

The rules for every page of the site. `app/tokens.css` holds the values; this file says how to use them. If a page needs something this file doesn't cover, add it here first.

## What the site is for

The Cake Bake is a bakery and cake shop at 101L Circular Road, Sector 7, Gurugram. It sells celebration cakes, cupcakes and pastries, cake tubs, dry cakes and hampers, and takes custom cake orders. It delivers across Gurugram the same day or on a chosen date, and most orders finish on WhatsApp. It has 1,608 Google reviews averaging 4.6, and "customized cakes" is the theme reviewers mention most (63 times).

The person on the page wants one of two things: order a cake off the menu, or get a custom cake made. Everything on the home page serves one of those two jobs or answers where the shop is.

## The idea

The logo says "Baking your ideas to life", and reviewers say the same thing in their own words ("I shared a reference picture and the final cake matched it"). So the page's one live thing is the custom cake itself, started on the home page: you type what the cake should say, and it appears on a drawn cake top with the cherry from the logo. The message and the occasion carry over into the custom cake form.

That drawing is the site's signature. It is drawn in the logo's own manner: a few light monoline strokes, a cherry on top, nothing else.

## Where the system comes from

Three systems from awesome-design-md, each for one specific quality. None of them is copied whole.

| Borrowed from | What we took | What we left |
| --- | --- | --- |
| Starbucks | A retail shop's colour discipline: one warm ground, one deep brand band for the important moments, and a ceremonial colour kept for one job only (Starbucks keeps gold for Rewards; we keep it for review stars). Full-pill buttons with a press scale. The floating round order button (their "Frap"), which is our WhatsApp button. Dark-band footer as the bookend. | Their green, their four-tier colour ladder, their three typefaces. |
| Airbnb | Photo-first product cards with a small info badge on the photo and the save heart top-right. The rating number set as the loudest type on its screen. One shadow tier, used only on things that float. | Their coral, their soft radius on everything, their small display sizes. |
| WIRED | Serif for the things you read, sans for the things you operate. Display type at a single regular weight, carried by size alone. Square photographs. | Black and white only, zero radius on buttons, hairline story rows. |

The taste-skill house rules sit on top of all three: no gradients, no eyebrow labels, no tracked capitals, no glass, no index numbers, no thin rules as decoration, no emoji, two typefaces at most.

## Colour

The logo's own colours, refined. The earlier site used an invented cream and a dusty rose; the logo is magenta and charcoal on white. We keep the chocolate ink (it matches the cakes) and bring the magenta in from the logo.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Paper | `--color-paper` | `#FFFBF8` | The page. Close to white, as the logo's badge is. |
| Paper 2 | `--color-paper-2` | `#F6EEEA` | One tone step down. Separates surfaces instead of a line. |
| Paper 3 | `--color-paper-3` | `#ECDED6` | Image placeholders, pressed states. |
| Icing | `--color-icing` | `#FCEFF6` | A full pink field, used once per page at most (the signature cake, inner page openings). |
| Ink | `--color-ink` | `#3B2418` | Text, primary buttons, the dark band. Chocolate. |
| Ink 2 | `--color-ink-2` | `#6B4A38` | Secondary text. 7.5:1 on paper. |
| Accent | `--color-accent` | `#A8256F` | Links on hover, the custom cake button, active nav. 6.6:1 with white text. |
| Logo magenta | `--rgb-blush` | `#D83896` | Only in drawings (the cherry) and large type. 4.3:1 on white, so never for body text. |
| Star | `--rgb-gold-600` | `#957431` | Review stars, nothing else. |
| WhatsApp | `--rgb-whatsapp` | `#0E7A57` | The WhatsApp buttons. |

Tailwind keeps its old family names so the diff stays readable: `cream-*` is paper, `cocoa-*` is ink, `blush-*` is now the logo-magenta ramp, `gold-*` is the star colour.

Rules:
- One ground, one ink, one accent per screen. The accent goes on the action and at most one other thing.
- Body text is always full ink. Ink 2 is for notes and metadata.
- Surfaces are separated by a tone step (paper to paper 2) or a change of field, never by a 1px line. Form fields and real tables keep their borders.
- The dark band (cocoa) appears once on the home page, for the custom cake, plus the footer.
- On dark bands add `.on-dark`; the focus ring turns `blush-200` (8.6:1 on cocoa).

## Type

One pairing: **Young Serif** for display, **Hanken Grotesk** for everything you read in small sizes and everything you operate.

Young Serif is a heavy, round old-style face with soft serifs. It looks like a hand-painted shop sign, which suits a neighbourhood cake shop better than a thin fashion serif. It has a single weight, so hierarchy comes from size. Hanken Grotesk is a plain, open grotesk that stays readable in forms, prices and the admin.

| Step | Token | Size at 1440 / 390 | Face | Use |
| --- | --- | --- | --- | --- |
| Display | `--text-display` | 104px / 44px | Young Serif, leading 0.95, tracking -0.02em | The one `h1` per page. |
| Section | `--text-section` | 56px / 32px | Young Serif, leading 1.02 | Section headings. |
| Title | `--text-title` | 25px / 21px | Young Serif, leading 1.15 | Product names, sub-heads. |
| Lead | `--text-lead` | 21px / 18px | Hanken 400, leading 1.5 | The sentence under a heading. |
| Body | `--text-md` | 17px | Hanken 400, leading 1.55 | Running text, 45 to 70 characters a line. |
| Small | `--text-sm` | 14px | Hanken 500 | Metadata, captions, labels. |

Rules:
- Every heading fits on two lines at every width. Cut words before shrinking type.
- No italic or coloured word inside a heading. One face, one colour.
- Labels are sentence case and untracked. No small capitals above headings.
- Prices and counts use tabular figures.
- Buttons and nav are Hanken 600, never the serif.

## Space and grid

- One container: 1440px max, 64px side margins on desktop, 24px under 960px, 16px under 640px. Both sides always match.
- 12 columns, 32px gap. Text blocks start on one of two left edges per section.
- Section spacing: 120px, 144px for the big moments; 80/96px on tablets, 56/72px on phones. The gap between sections is always larger than any gap inside one.
- Neighbouring sections never share a layout.
- Spacing steps: 4, 8, 12, 16, 24, 40, 64, 96, 144.

## Radius and depth

- Buttons, chips and the WhatsApp button are fully round. Decided once.
- Photographs and panels have a 4px corner (`--radius-card`), which reads as square with the edge taken off, like a cake board.
- Form fields have 8px (`--radius-field`).
- Two photographs carry the logo's bowed tier line as their top edge (`.tier-top`): the hero and the signature cake. Nowhere else.
- One shadow, `--shadow-overlay`, for things that float: the cart drawer, the menu sheet, search, the WhatsApp button, toasts. Nothing at rest has a shadow.

## Components

**Header.** A thin cocoa strip with delivery, open status and phone (hidden on phones). Below it a solid paper bar, never blurred: the logo mark, six plain links, Admin Login as a quiet outlined pill, the icons, and Order on WhatsApp as the one filled action.

**Buttons.** 48px tall, 44px small. `.btn-primary` cocoa fill; `.btn-blush` accent fill for the custom cake; `.btn-wa` WhatsApp green; `.btn-outline` for the second choice. Hover moves one colour step, press scales to 0.98, disabled is 55% opacity. Labels say what happens: "Order a cake", "Start a custom cake", never "Learn more".

**Product card.** Photo first (4:5, square corners), Bestseller/New and Eggless badges on the photo, save heart top-right. Under it: name in Young Serif, one line of description, sizes, "from" price, Add. No border, no shadow.

**Inner page opening (`PageHero`).** A flat icing field, a working breadcrumb, the `h1`, one sentence. No gradient, no rule under it.

**Forms.** Label above the field, 8px radius, a constant border, a 2px focus outline. Errors in red text under the field, tied with `aria-describedby`.

**Footer.** Cocoa band. The full logo on a round paper plate (the logo is a badge), one plain sentence, address and phone, then three short link lists. Rows are separated by space, not rules.

## Motion

- Calm and short. The hero settles once from CSS (`.rise`, 700ms, staggered 70ms). Section content fades up 12px as it enters (`<Reveal>`). Both show the end state with no JavaScript and under reduced motion.
- The signature move is the message cake: each typed character re-sets the message on the cake top straight away, and switching occasion swaps the suggested message with a short fade.
- Lenis smooth scroll stays. The scroll progress bar is one flat accent colour.
- Transform and opacity only. No parallax, no marquees, no hover lift on cards, no bounce.

## Do

- Use the shop's real facts: Sector 7, Circular Road, near Ghaba Ki Kothi, closes 10:30 pm, 4.6 from 1,608 reviews, eggless on most cakes, free delivery above ₹1,500.
- Write like the person behind the counter: short sentences, plain words, the price and the weight.
- Let photographs be big. One large picture beats six small ones.
- Change the field colour to start a new chapter.

## Don't

- Gradients, glows, glass, blur.
- Rows of identical feature cards, icons in tinted squares, emoji.
- Numbered steps shown as big 1 2 3 4.
- Hairline rules between every row. Use space or a tone step.
- Invented proof: no per-product star ratings, no made-up counts, no testimonials beyond the ones in `data/reviews.ts`.
- Sales words: elevate, curated, indulgence, seamless, crafted with love, boutique.
- The logo's lettering imitated in a font, or the logo recoloured.

## Files

- `app/tokens.css`: every value above.
- `app/base.css`: reset and base element styles.
- `app/globals.css`: component classes (`.btn-*`, `.input`, `.chip`, `.h-*`).
- `tailwind.config.ts`: maps Tailwind colour names to the tokens.
