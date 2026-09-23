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
| `/buyers` `/land` | Service pages (shared template, content in `lib/data.ts`) |
| `/investing` | Property Investment |
| `/off-market` | Off-Market Properties |
| `/advisory` | Property Advisory |
| `/about` | About |
| `/contact` | Contact |

## Photos

Every photo area is an `<ImageSlot>` placeholder. To use a real image, drop it in `public/` and pass `src`:

```tsx
<ImageSlot src="/photos/hero.jpg" alt="…" />
```

The Investing, Off-Market and Advisory pages print an identifier inside each placeholder
(for example `PROPERTY_INVESTMENT_HERO`). To fill one, set its path in `lib/slots.ts`:

```ts
PROPERTY_INVESTMENT_HERO: '/images/investment_hero.webp',
```

## Structure

- `lib/data.ts` — all copy, stats, services, team, testimonials
- `components/Motion.tsx` — scroll reveals, counters, pinned steps, card hover (data-attribute driven)
- `app/globals.css` — design tokens, utility classes, responsive rules
