# PRIMEO Property Group — website

Next.js (App Router, TypeScript) build of the PRIMEO buyer's agency design.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/buyers` | Buyer Agency: what we do (buyer agency, property investment, off-market access, property advisory), who we are, who we help, how it works, FAQ |
| `/land` | House & Land (shared service template, content in `lib/data.ts`) |
| `/reviews` | Client reviews: Google rating summary, two full client stories, all 107 Google reviews with topic filters (data in `lib/reviews.ts`) |
| `/about` | About |
| `/contact` | Contact |

The former Property Investment, Off-Market and Property Advisory pages were folded into the Buyer
Agency page. `/investing`, `/off-market` and `/advisory` redirect permanently to the matching chapter
(`/buyers#investing`, `/buyers#off-market`, `/buyers#advisory`); see `redirects()` in `next.config.ts`.

## Photos

Every photo area is an `<ImageSlot>` placeholder. To use a real image, drop it in `public/images/` and pass `src`:

```tsx
<ImageSlot src="/images/hero.jpg" alt="…" />
```

Photos are never resized at request time. `scripts/build-images.mjs` pre-renders every size
`next/image` can ask for, as AVIF (served to ~95% of browsers) and WebP (the fallback), into
`public/_img`, along with an 8px blurred preview per photo. It runs by itself before `npm run dev`
and `npm run build` and only encodes new or changed photos (the first run on a machine takes about
a minute). Both the output and `lib/generated/` are gitignored. Run `npm run images` after adding a
photo while the dev server is running; until then the dev console warns and serves the original.
Pass `sizes` with the slot's rendered width (e.g. `sizes="(max-width: 1000px) 100vw, 50vw"`) so phones are not sent desktop-sized files.
After adding photos to `public/images`, run `node scripts/optimize-images.mjs` once to bring the
source files down to web size (auto-orient, max 1920px, JPEG Q80). It only rewrites files that shrink.

The Buyer Agency page, the homepage service cards and the About portrait print an identifier inside
each placeholder (for example `BUYERS_CHAPTER_INVESTING`). To fill one, set its path in `lib/slots.ts`:

```ts
BUYERS_CHAPTER_INVESTING: '/images/investment_meeting.webp',
```

## Structure

- `lib/data.ts` — all copy, stats, services, team, testimonials (`BUYERS` holds the Buyer Agency page)
- `components/Motion.tsx` — scroll reveals, counters, pinned steps, card hover (data-attribute driven)
- `components/SubNav.tsx`, `ServiceChapters.tsx`, `Faq.tsx`, `SectionHead.tsx` — Buyer Agency page pieces
- `app/globals.css` — design tokens, utility classes, responsive rules
