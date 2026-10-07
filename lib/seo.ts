import type { Metadata } from 'next';
import { SITE } from '@/config/site';

/** The social sharing card, 1200x630 (rendered by scripts/build-og.mjs). */
export const OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: `${SITE.name}: independent buyer’s agents in Brisbane and South East Queensland` };

/** The square brand mark for the structured data (rendered by scripts/build-icons.mjs). */
export const LOGO = { url: '/logo.png', width: 512, height: 512 };

export const TITLE_SUFFIX = ` | ${SITE.name}`;
export const HOME_TITLE = `Buyers Agent Brisbane${TITLE_SUFFIX}`;
export const HOME_DESCRIPTION = 'PRIMEO Property Group: independent buyer’s agents in Brisbane and South East Queensland. Search, off-market access and negotiation for buyers only.';

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

const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;
const FOUNDER_ID = `${SITE.url}/about#prim-ahuja`;

/** "0439 860 639" -> "+61439860639", the international form for structured data. */
const intlPhone = (phone: string) => phone.replace(/\s/g, '').replace(/^0/, '+61');

/** "<" is escaped so the JSON can never close its own <script> tag. */
const serialize = (ld: unknown) => JSON.stringify(ld).replace(/</g, '\\u003c');

/** ["Monday", ..., "Friday"] -> "Mo-Fr"; ["Saturday"] -> "Sa" (schema.org openingHours shorthand). */
const dayRange = (days: readonly string[]) => (days.length > 1 ? `${days[0].slice(0, 2)}-${days[days.length - 1].slice(0, 2)}` : days[0].slice(0, 2));

/**
 * The site-wide structured data for the root layout, built from config/site.ts: the business as
 * schema.org RealEstateAgent (name, alternateName "PRIMEO", logo, contact details, the Brisbane
 * address, areas served, opening hours, the founder and the sameAs profiles, including PRIMEO's
 * Google Business Profile), and the WebSite, so search engines show "PRIMEO Property Group" as the
 * site name. The street line of the address is included only once it is known.
 *
 * No `aggregateRating` or `review` here, and none anywhere else on the site: the Google rating and
 * reviews belong to Queensland Fundings (SITE.google), and a rating has to belong to the business it
 * describes. For the same reason that listing is not one of PRIMEO's `sameAs` profiles.
 */
export function businessJsonLd() {
  const { address: a, areas, hours, founder } = SITE;
  const sameAs = [...Object.values(SITE.social), SITE.google.profileUrl].filter(Boolean);
  const business = {
    '@type': 'RealEstateAgent',
    '@id': BUSINESS_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    ...(SITE.legalName && { legalName: SITE.legalName }),
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: `${SITE.url}${LOGO.url}`, width: LOGO.width, height: LOGO.height },
    image: `${SITE.url}${OG_IMAGE.url}`,
    description: HOME_DESCRIPTION,
    telephone: intlPhone(SITE.phone),
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      ...(a.street && { streetAddress: a.street }),
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postcode,
      addressCountry: a.country,
    },
    areaServed: [areas.primary, ...areas.others].map((name) => ({ '@type': 'City', name })),
    openingHours: hours.spec.map((h) => `${dayRange(h.days)} ${h.opens}-${h.closes}`),
    openingHoursSpecification: hours.spec.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    founder: { '@type': 'Person', '@id': FOUNDER_ID, name: founder.name, jobTitle: founder.role, url: `${SITE.url}/about` },
    ...(sameAs.length > 0 && { sameAs }),
  };
  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.shortName,
    inLanguage: 'en-AU',
    publisher: { '@id': BUSINESS_ID },
  };
  return serialize({ '@context': 'https://schema.org', '@graph': [business, website] });
}

/**
 * The founder as schema.org Person, for /about. It carries the same `@id` as the organisation's
 * `founder`, so the two are read as one person, and `worksFor` points back at the organisation.
 */
export function founderJsonLd({ description, image }: { description: string; image: string }) {
  const { founder } = SITE;
  return serialize({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: founder.name,
    jobTitle: founder.role,
    description,
    url: `${SITE.url}/about`,
    image: `${SITE.url}${image}`,
    worksFor: { '@type': 'RealEstateAgent', '@id': BUSINESS_ID, name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/about`,
  });
}
