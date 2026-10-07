import { SITE, addressLines } from '@/config/site';
import { HOME_DESCRIPTION } from '@/lib/seo';
import { ABOUT, BUYERS, SERVICES, HOME_FAQ } from '@/lib/data';
import { PRIVACY, TERMS } from '@/lib/legal';

// /llms.txt: a plain-text summary of the business and its pages for AI crawlers and answer engines
// (the llms.txt convention: Markdown, a heading, a one-line summary, then links with descriptions).
// Built from the same sources as the pages, so it cannot drift from them. Served statically.
export const dynamic = 'force-static';

const PAGES: [string, string, string][] = [
  ['/', 'Home', HOME_DESCRIPTION],
  ['/buyers', 'Buyer Agency', BUYERS.seo],
  ['/land', SERVICES.land.title, SERVICES.land.seo ?? SERVICES.land.lead],
  ['/about', `About ${ABOUT.name}`, ABOUT.seo],
  ['/reviews', 'Client Reviews', `Google reviews from clients of ${SITE.google.listingName}, ${SITE.founder.name}’s mortgage business.`],
  ['/contact', 'Contact', `Phone ${SITE.phone}, email ${SITE.email}, or the enquiry form. Hours: ${SITE.hours.full}.`],
  ['/privacy', 'Privacy Policy', PRIVACY.seo],
  ['/terms', 'Terms of Use', TERMS.seo],
];

export function GET() {
  const areas = [SITE.areas.primary, ...SITE.areas.others].join(', ');
  const faq = HOME_FAQ.items.map((i) => `### ${i.q}\n\n${i.a}`).join('\n\n');
  const text = `# ${SITE.name}

> ${SITE.name} (also written ${SITE.shortName}) is an independent buyer’s agency in Brisbane, Australia, founded in ${SITE.stats.foundedYear} by ${SITE.founder.name}, ${SITE.founder.role}. It acts only for property buyers and investors across Brisbane and South East Queensland.

- Website: ${SITE.url}
- Phone: ${SITE.phone}
- Email: ${SITE.email}
- Address: ${addressLines().join(', ')}, Australia
- Hours: ${SITE.hours.full}
- Areas served: ${areas}
- Services: buyer agency, property investment research, off-market access, property advisory, house and land packages
- Founder: ${SITE.founder.name} (${SITE.founder.role}), Certified Practising Accountant
- Google Business Profile: ${SITE.google.profileUrl}
- Instagram: ${SITE.social.instagram}
- Facebook: ${SITE.social.facebook}

Note: the Google reviews shown on the site are for ${SITE.google.listingName}, the mortgage business also run by ${SITE.founder.name}. ${SITE.name} does not list or sell property and takes no developer commissions.

## Pages

${PAGES.map(([path, title, desc]) => `- [${title}](${SITE.url}${path === '/' ? '' : path}): ${desc}`).join('\n')}

## Frequently asked questions

${faq}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
