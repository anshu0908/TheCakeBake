# Design: The Cake Bake

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Catalogue (Stage hero, care facts, category bento, product grid, signature offer, occasion index, custom-cake steps, reviews, kitchen rail, visit close)
- Theme: brand, led by the supplied logo (`.hallmark/brand-spec.md`); palette kept exactly
- Axes: light/soft-serif/chromatic-rose · posture: Restrained

## Tokens
`app/tokens.css` is the source of truth. Brand colours are stored as RGB channels (`--rgb-*`) so Tailwind's `/opacity` modifiers work; the Tailwind palette in `tailwind.config.ts` resolves every colour to them. The roles:
```css
:root {
  --color-paper: #FBF6EE;  --color-paper-2: #F4EADB;  --color-paper-3: #E9D9C0;   /* cream, cream-200, cream-300 */
  --color-ink: #3B2418;  --color-ink-2: #6B4A38;  --color-muted: #8A6A57;          /* cocoa, cocoa-600, cocoa-500 */
  --color-rule: rgb(59 36 24 / 0.12);
  --color-accent: #A24A5D;  --color-accent-ink: #FBF6EE;  --color-focus: #745A22;  /* blush-700, cream, gold-700 */
  --font-display: Fraunces (weight 360, SOFT 100, WONK 0);  --font-body: DM Sans;
  --radius-card: 1.25rem;  --radius-field: 0.75rem;  --radius-pill: 999px;  --rule-hair: 1px;
}
```
On cocoa bands add `.on-dark`: the focus ring becomes gold-300 (#E3C98F) so it holds 3:1.

## Logo
- `public/brand/logo-mark.png` (no tagline) in the header, 62px tall on phones, 80px from `sm`; `logo.png` (with the tagline) in the footer and on `/admin/login`, where the tagline can be read. `the-cake-bake-logo-original.png` is the supplied file, untouched.
- Never set the name in type as a logo, never recolour or filter the mark. On cocoa it sits on a round cream plate, the circular badge it was drawn in.
- The logo's own magenta (#D83896) and charcoal stay inside the logo; the site keeps blush and cocoa.
- Motif, used twice only: the tiers' bowed top line as `.tier-top` on the hero and signature photographs.

## Type
- Display heads are Fraunces, soft and light, one style and one colour: no italic or coloured word inside a head. They sit beside the logo's hand lettering without imitating it.
- `.h-display` (hero, 84px at 1440), `.h-section` (52px), `.h-title` (25px), `.lead` (21px), body 16px.
- Labels are DM Sans, sentence case, untracked (`.term`, `.meta`). No eyebrows above headings, no tracked capitals.

## Layout
- One container: `.container-x`, 1440px cap with a 64px gutter (24px under 60rem, 16px under 40rem).
- Sections part with `.section` (120px) and `.section-l` (144px), and change paper (cream, cream-200, white strip, cocoa band) rather than boxing content.
- Hairline rules, not cards, on cream. A bordered `.card` is only for independent interactive panels (cart, checkout, forms).
- Inner pages open with `PageHero`: a working breadcrumb, then a left-aligned head on the blush-50 to cream wash.

## Controls
- Admin Login: a quiet outlined pill in the desktop nav and an outlined button in the mobile menu; it never outranks Order on WhatsApp.
- Primary: cocoa fill, cream text, pill, 48px (`.btn-primary`). Secondary: cocoa outline (`.btn-outline`). Custom-cake action: `.btn-blush`. WhatsApp: `.btn-wa`.
- Small: 44px (`.btn-sm`). Hover is one colour step; press scales to 0.98; disabled is 0.55 opacity with `cursor: not-allowed`.
- Inputs keep a constant border, focus with an outline ring, never a border change.

## Motion
- Character: calm. The hero settles once from CSS (`.rise`); below it one reveal (`<Reveal>`, `data-reveal`) fades content in, visible without JavaScript.
- Lenis smooth scroll and the gold-blush scroll-progress bar stay. No parallax, marquees or floating elements.
- Under `prefers-reduced-motion` everything shows its end state at once.

## Exports
`app/tokens.css` and `app/base.css` in this project, imported at the top of `app/globals.css` above the `@tailwind` directives.
