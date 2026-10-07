import { SITE, addressLines } from '@/config/site';
import { HOME_DESCRIPTION } from '@/lib/seo';
import { ABOUT, BUYERS, SERVICES, TRUST, HOME_FAQ } from '@/lib/data';

// /llms-full.txt: the llms.txt convention's long form, the site's substantive copy as one plain-text
// document, so an AI crawler or assistant can read PRIMEO's pages in a single fetch. Built from the
// same data the pages render, so it cannot say anything the site does not. Served statically.
export const dynamic = 'force-static';

const faq = (items: { q: string; a: string }[]) => items.map((i) => `### ${i.q}\n\n${i.a}`).join('\n\n');
const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');

export function GET() {
  const land = SERVICES.land;
  const text = `# ${SITE.name}

> ${SITE.name} (${SITE.shortName}) is an independent buyer’s agency in Brisbane, Australia, founded in ${SITE.stats.foundedYear} by ${SITE.founder.name}, ${SITE.founder.role}. It acts only for property buyers and investors across Brisbane and South East Queensland. ${HOME_DESCRIPTION}

Phone ${SITE.phone} · ${SITE.email} · ${addressLines().join(', ')}, Australia · Hours: ${SITE.hours.full}
Areas served: ${[SITE.areas.primary, ...SITE.areas.others].join(', ')}.
Google Business Profile: ${SITE.google.profileUrl}

## Why PRIMEO (${SITE.url})

${TRUST.map((t) => `- **${t.title}.** ${t.text}`).join('\n')}

## Buyer Agency (${SITE.url}/buyers)

${BUYERS.lead}

${BUYERS.who.text}

### What we do

${BUYERS.what.chapters.map((c) => `#### ${c.label}: ${c.title}\n\n${c.text}\n\n${list(c.points)}`).join('\n\n')}

### Who we help

${BUYERS.help.cases.map((c) => `- **${c.who}.** ${c.problem} ${c.help}`).join('\n')}

### How it works

${BUYERS.process.steps.map((s) => `${s.n}. **${s.title}.** ${s.text}`).join('\n')}

### Frequently asked questions

${faq(BUYERS.faq.items)}

## ${land.title} (${SITE.url}/land)

${land.lead}

${land.intro}

${land.steps.map((s) => `${s.n}. **${s.title}.** ${s.text}`).join('\n')}

${land.faq ? `### Frequently asked questions\n\n${faq(land.faq.items)}` : ''}

## About ${ABOUT.name} (${SITE.url}/about)

${ABOUT.lead}

${ABOUT.intro.p1}

${ABOUT.intro.p2}

${ABOUT.background.disciplines.map((d) => `- **${d.title}.** ${d.text}`).join('\n')}

${ABOUT.together.pillars.map((p) => `- **${p.title}.** ${p.text}`).join('\n')}

## Reviews (${SITE.url}/reviews)

${SITE.google.sourceNote} The rating and review count shown on the site belong to ${SITE.google.listingName}, not to ${SITE.name}.

## Contact (${SITE.url}/contact)

Call ${SITE.phone}, email ${SITE.email} or send an enquiry through the website. Enquiries are answered within one business day. Hours: ${SITE.hours.full}.

## General questions

${faq(HOME_FAQ.items)}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
