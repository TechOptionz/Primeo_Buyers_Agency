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
| `/reviews` | Client reviews: Google rating summary, two full client stories and a selection of 24 of the 107 Google reviews with topic filters, signed by name with no profile photos (data in `lib/reviews.ts`) |
| `/about` | About |
| `/contact` | Contact |

The former Property Investment, Off-Market and Property Advisory pages were folded into the Buyer
Agency page. `/investing`, `/off-market` and `/advisory` redirect permanently to the matching chapter
(`/buyers#investing`, `/buyers#off-market`, `/buyers#advisory`); see `redirects()` in `next.config.ts`.

## Business details

Phone, email, address, licence, opening hours, the Google listing (link, rating, review count), the
headline figures, social profiles and the switches for optional sections all live in `config/site.ts`.
Values the business has not confirmed are marked `TODO:`; an empty value hides whatever depends on it
(a link, a button, a social icon) instead of showing a placeholder.

## SEO

Each page sets its title, description and canonical URL with `pageMeta()` from `lib/seo.ts`; the root
layout adds the Open Graph and Twitter defaults and the `RealEstateAgent` structured data, both built
from `config/site.ts`. The structured data carries no `aggregateRating` or `review`: the Google reviews
on the site belong to Queensland Fundings, the owner's mortgage business, and are labelled that way
wherever they appear. `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`
(add a new route to `ROUTES` in `lib/seo.ts`). The share card `public/og-image.jpg` is rendered by
`node scripts/build-og.mjs`. The browser and home-screen icons (`app/icon.png`, `app/apple-icon.png`)
are cut from the official symbol in `scripts/assets/` by `node scripts/build-icons.mjs`.

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

## Enquiry emails

Both forms (the contact page form and the closing call to action on every page, in
`components/Forms.tsx`) post to the `sendEnquiry` Server Action in `app/actions.ts`, which emails the
enquiry through [Resend](https://resend.com). Set these in `.env.local` (gitignored) and on the host:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from the Resend dashboard |
| `ENQUIRY_TO` | Inbox that receives enquiries; comma-separate for several. Defaults to `SITE.email` in `config/site.ts` |
| `ENQUIRY_FROM` | Sender, e.g. `PRIMEO Website <website@primeo.com.au>`. The domain must be verified in Resend |

To verify the domain, add it in Resend (Domains) and copy the DNS records it shows into the domain's
DNS at GoDaddy. They sit on a `send` subdomain and a DKIM key, so they do not touch the mailbox's own
MX records. Without `ENQUIRY_FROM` the action uses Resend's test sender, which only delivers to the
Resend account owner's address. Replies go to the visitor (the email is sent with their address as
Reply-To). Failures are logged on the server with an `[enquiry]` prefix.

The email's layout is `lib/enquiry-email.ts`: a navy header with the logo, the visitor's details, their
message, and Reply / Call buttons, in the site's colours. The logo is a small PNG stored as base64 in
`lib/email-logo.ts` and attached inline, because inboxes do not draw SVG or load the site's fonts;
the comment in that file says how to refresh it if the logo changes.

## Structure

- `lib/data.ts` — all copy, stats, services, team (`BUYERS` holds the Buyer Agency page)
- `lib/reviews.ts` — the selected Google reviews and the listing's rating figures
- `components/Motion.tsx` — scroll reveals, counters, pinned steps, card hover (data-attribute driven)
- `components/SubNav.tsx`, `ServiceChapters.tsx`, `Faq.tsx`, `SectionHead.tsx` — Buyer Agency page pieces
- `app/globals.css` — design tokens, utility classes, responsive rules
