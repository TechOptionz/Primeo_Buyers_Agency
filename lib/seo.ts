import type { Metadata } from 'next';
import { SITE } from '@/config/site';

/** The social sharing card, 1200x630 (rendered by scripts/build-og.mjs). */
export const OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: `${SITE.name}: independent buyer’s agents in Brisbane and South East Queensland` };

export const TITLE_SUFFIX = ` | ${SITE.name}`;
export const HOME_TITLE = `Buyers Agent Brisbane${TITLE_SUFFIX}`;
export const HOME_DESCRIPTION = 'Independent buyer’s agents in Brisbane and South East Queensland: property search, off-market access, negotiation, investment research and house & land advice, acting only for the buyer.';

/**
 * Metadata for one page: its title, description and canonical URL, repeated into the Open Graph and
 * Twitter tags. Metadata merges shallowly, so a page that set only `title` would share the layout's
 * Open Graph title and URL with every other page; this fills each block in whole.
 * `title` goes through the layout's template ("%s | PRIMEO Property Group") unless `absolute` is set.
 */
export function pageMeta({ title, description, path, absolute = false }: { title: string; description: string; path: string; absolute?: boolean }): Metadata {
  const full = absolute ? title : `${title}${TITLE_SUFFIX}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: SITE.name, locale: 'en_AU', url: path, title: full, description, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: full, description, images: [OG_IMAGE.url] },
  };
}

/** Every indexable route, for app/sitemap.ts. */
export const ROUTES = ['/', '/buyers', '/land', '/reviews', '/about', '/contact', '/privacy', '/terms'];

/**
 * schema.org RealEstateAgent for the root layout, built from config/site.ts. A field is included
 * only when its value is known: no street address means no `address`.
 *
 * No `aggregateRating` or `review` here, and none anywhere else on the site: the Google rating and
 * reviews belong to Queensland Fundings (SITE.google), and a rating has to belong to the business it
 * describes. For the same reason that listing is not one of PRIMEO's `sameAs` profiles.
 */
export function businessJsonLd() {
  const { address: a, areas } = SITE;
  const sameAs = Object.values(SITE.social).filter(Boolean);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    ...(SITE.legalName && { legalName: SITE.legalName }),
    url: SITE.url,
    image: `${SITE.url}${OG_IMAGE.url}`,
    description: HOME_DESCRIPTION,
    telephone: SITE.phone.replace(/\s/g, '').replace(/^0/, '+61'),
    email: SITE.email,
    ...(a.street && {
      address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.locality, addressRegion: a.region, postalCode: a.postcode, addressCountry: a.country },
    }),
    areaServed: [areas.primary, ...areas.others].map((name) => ({ '@type': 'City', name })),
    ...(sameAs.length > 0 && { sameAs }),
  };
  // "<" is escaped so the JSON can never close its own <script> tag.
  return JSON.stringify(ld).replace(/</g, '\\u003c');
}
