
export type Step = { n: string; title: string; text: string; ph: string; src?: string };
export type ServiceCard = { tag: string; title: string; text: string; foot: string; ph: string; src?: string };
export type Column = { eyebrow: string; title: string; text: string; points: string[]; cta: string; ph: string; src?: string };

export type Service = {
  key: string;
  title: string;
  hero: string;
  lead: string;
  placeholder: string;
  src?: string;
  introSrc?: string;
  facts: { v: string; l: string }[];
  introTitle: string;
  intro: string;
  points: string[];
  stepsTitle?: string;
  steps: Step[];
  cardsEyebrow?: string;
  cardsTitle?: string;
  cards: ServiceCard[];
  columns: Column[];
  // The editorial quote band: a Google review (its id in lib/reviews.ts) beside a photo.
  quote: { reviewId: string; ph: string; src?: string };
  // Optional band of three more Google reviews before the closing call to action.
  reviewStrip?: { title: string; text?: string; ids: string[] };
  ctaButton: string;
};

export type NavItem = { key: string; label: string; full: string; href: string };
// `label` is the short nav wording; `full` is used where there is room (footer, hero band).
export const NAV: NavItem[] = [
  { key: 'buyers', label: 'Buyer Agency', full: 'Buyer Agency', href: '/buyers' },
  { key: 'land', label: 'House & Land', full: 'House & Land', href: '/land' },
  { key: 'reviews', label: 'Reviews', full: 'Client reviews', href: '/reviews' },
  { key: 'about', label: 'About', full: 'About', href: '/about' },
];
// The services alone: the homepage hero band and the footer's Services column list these.
export const SERVICE_ITEMS = NAV.filter((i) => i.key === 'buyers' || i.key === 'land');

// Page-level photos (files live in public/images).
export const IMAGES = {
  hero: '/images/hero_brisbane_luxury.jpg',
  why: '/images/why_primeo_review.jpg',
  clients: '/images/testimonial_verandah.jpg',
  cta: '/images/cta_front_gate.jpg',
  aboutHero: '/images/hero_brisbane_luxury.jpg',
  contactHero: '/images/contact_hero.jpg',
  contactMap: '/images/contact_office_exterior.jpg',
  contactOffice: '/images/contact_lounge.jpg',
  reviewsHero: '/images/reviews_hero.jpg',
  reviewsStory: '/images/reviews_story.jpg',
};

export const CONTACT = {
  phone: '0439 860 639',
  phoneHref: 'tel:0439860639',
  email: 'info@primeo.com.au',
  address1: 'Level 2, 12 Example Street',
  address2: 'Brisbane QLD 4000',
  hours: 'Mon–Fri 8am–6pm · Sat 9am–2pm',
};

// Client reviews live in lib/reviews.ts (a selection of real Google reviews); the homepage carousel reads FEATURED from there.

export const ARTICLES = [
  { id: 'one', cat: 'Market update', date: 'Sep 2026', title: 'Spring market outlook: what buyers should expect', excerpt: 'Stock levels, clearance rates and where competition is heading this quarter.', placeholder: 'Photo: city skyline at dusk', src: '/images/insight_skyline.jpg', href: '/buyers#advisory' },
  { id: 'two', cat: 'Buying', date: 'Aug 2026', title: 'Off-market properties, explained', excerpt: 'How pre-market and off-market deals actually happen and how to access them.', placeholder: 'Photo: front door detail', src: '/images/insight_front_door.jpg', href: '/buyers#off-market' },
  { id: 'three', cat: 'Investing', date: 'Aug 2026', title: 'Growth corridors worth watching in 2027', excerpt: 'Infrastructure, land supply and the suburbs where the evidence stacks up.', placeholder: 'Photo: aerial of a new estate', src: '/images/insight_estate_aerial.jpg', href: '/buyers#investing' },
];

export const PROPERTIES = [
  { id: 'a', status: 'For sale', price: '$1,850,000', address: '42 Moray Street, New Farm', type: 'House', beds: 4, baths: 3, cars: 2, agent: 'Jordan Reid · 0400 000 000', placeholder: 'Photo: renovated Queenslander exterior', src: '/images/prop_moray_st.jpg' },
  { id: 'b', status: 'Secured off-market', price: '$1,420,000', address: '12 Latrobe Terrace, Paddington', type: 'House', beds: 4, baths: 2, cars: 2, agent: 'Secured for a PRIMEO buyer', placeholder: 'Photo: character home with verandah', src: '/images/prop_latrobe_tce.jpg' },
  { id: 'c', status: 'Secured off-market', price: '$1,290,000', address: '8/21 Oxlade Drive, New Farm', type: 'Apartment', beds: 3, baths: 2, cars: 1, agent: 'Secured for a PRIMEO investor', placeholder: 'Photo: riverfront apartment balcony', src: '/images/prop_oxlade_dr.jpg' },
];

export const JOURNEY: Step[] = [
  { n: '01', title: 'Discover', text: 'A strategy session to define budget, location, lifestyle and growth priorities.', ph: 'Photo: strategy meeting over coffee', src: '/images/journey_01_discover.jpg' },
  { n: '02', title: 'Search', text: 'On-market, off-market and pre-market sourcing, shortlisted against your brief.', ph: 'Photo: suburban streetscape', src: '/images/journey_02_search.jpg' },
  { n: '03', title: 'Inspect', text: 'Walk-throughs, building and pest, comparable sales and contract review.', ph: 'Photo: inspecting a kitchen', src: '/images/journey_03_inspect.jpg' },
  { n: '04', title: 'Negotiate', text: 'Private treaty or auction, run with a clear walk-away number.', ph: 'Photo: auction paddle raised', src: '/images/journey_04_negotiate.jpg' },
  { n: '05', title: 'Secure', text: 'Contract to settlement, handled, then keys in hand.', ph: 'Photo: keys at the front door', src: '/images/journey_05_secure.jpg' },
];

export const TRUST = [
  { n: '01', title: 'Independent by design', text: 'No listings to promote and no developer commissions. We act for one party only: our client.' },
  { n: '02', title: 'Transactions understood from the inside', text: 'Home buyers and investors, on and off market: we understand how successful acquisitions are secured.' },
  { n: '03', title: 'Evidence, not opinion', text: 'Every recommendation is supported by comparable sales and the reasoning behind it.' },
  { n: '04', title: 'Composed under pressure', text: 'Auctions, deadlines and negotiations managed by professionals who handle them every week.' },
];

// ---------- About (/about): Prim Ahuja ----------
// Every fact below comes from Prim's CV; the closing quote is his, confirmed. The company is named
// as it appears on the CV; change it here and every mention on the page follows.
const COMPANY = 'Aussie Financial Hub';

export type Factor = { n: string; title: string; text: string };
export type Discipline = { kind: string; title: string; text: string };
export type Help = { icon: string; kind: string; title: string; text: string; href: string; cta: string };

export const ABOUT = {
  company: COMPANY,
  name: 'Prim Ahuja',
  role: 'Certified Practising Accountant (CPA)',
  seo: `Meet Prim Ahuja, Certified Practising Accountant (CPA) at ${COMPANY}: more than ten years in finance, accounting and compliance, applied to every home loan application.`,
  hero: 'An accountant’s precision, working for you.',
  lead: 'Prim Ahuja is a Certified Practising Accountant with more than twenty years of professional experience.',
  // "20+ years" is the overall career figure supplied by the client (the CV documents 2012 onward in Australia
  // and earlier private-sector experience in its profile); the stats strip keeps the CV's own "10+ years in
  // finance, accounting and compliance".
  facts: [{ v: '20+ years', l: 'Professional experience' }, { v: 'CPA', l: 'Certified Practising Accountant' }, { v: '5.0', l: 'Google rating, 107 reviews' }],
  intro: {
    eyebrow: 'About Prim',
    title: 'A career built on numbers, compliance and people.',
    p1: 'Before he prepared his first loan application, Prim had reconciled balance sheets, audited payment controls, run a business with up to 30 staff and investigated compliance breaches in state and federal government roles. It shows in how he works: nothing goes to a lender until it is right.',
    p2: 'He explains what is happening and why, answers quickly, and treats a client’s application with the same care he once brought to an audit file.',
    glance: [
      { label: 'Focus', value: 'Home loans and property finance', sub: `${COMPANY} · since 2020` },
      { label: 'CPA', value: 'Certified Practising Accountant', sub: 'CPA Australia · since 2015' },
      { label: 'Education', value: 'Master of Professional Accounting', sub: 'Central Queensland University' },
      { label: 'Language', value: 'English', sub: 'Clear, plain-English client support' },
    ] as { label: string; value: string; sub?: string }[],
  },
  // The background in brief: four disciplines, with no employers and no year-by-year history (the client
  // asked for the career timeline to go). Neither a former employer nor a broker title is named on the site.
  background: {
    eyebrow: 'His background',
    title: 'The experience behind the advice.',
    text: 'Four disciplines, and one thread through all of them: understanding numbers, compliance and people.',
    disciplines: [
      { kind: 'Accounting', title: 'Trained as an accountant', text: 'A Master of Professional Accounting, then the CPA designation with CPA Australia.' },
      { kind: 'Audit and controls', title: 'Practised at checking the detail', text: 'Years in internal controls and audit, recognised with company awards for accuracy and customer service.' },
      { kind: 'Business and compliance', title: 'Seen from both sides', text: 'He has run a business of his own, and held others to the rules in state and federal compliance roles.' },
      { kind: 'Home finance', title: 'Beside buyers since 2020', text: 'Six years guiding clients through every stage of a loan application, from the first conversation to lodgement and follow-up.' },
    ] as Discipline[],
  },
  together: {
    eyebrow: `At ${COMPANY}`,
    title: 'How Prim brings it all together.',
    text: 'Everything in Prim’s background has a practical use for the client in front of him. These are the four that matter most when a loan application is on the line.',
    pillars: [
      { n: '01', title: 'An accountant’s eye', text: 'Prim understands income, tax and financial documents in depth, so an application is prepared correctly the first time rather than patched after a lender queries it.' },
      { n: '02', title: 'A compliance background', text: 'Years of audit and compliance work mean every file is thorough, accurate and lender-ready, with the supporting evidence already in order.' },
      { n: '03', title: 'A business owner’s perspective', text: 'Self-employed and small business clients work with someone who has been one. Prim knows how a business’s finances look from the inside and how to present them clearly.' },
      { n: '04', title: 'Client-first communication', text: 'Clear explanations at every step, fast responses and no jargon. Clients always know where their application is and what happens next.' },
    ] as Factor[],
    stats: [
      { v: 10, suf: '+', label: 'Years in finance, accounting and compliance', sub: 'Working in Australia since 2012' },
      { v: 22, pre: '$', suf: 'M', label: 'Lodged in a single month', sub: 'Loan applications successfully lodged in one month' },
      { v: 100, suf: '+', label: 'Five-star Google reviews', sub: '5.0 average rating from 107 reviews on Google' },
    ] as { v: number; pre?: string; suf?: string; label: string; sub: string }[],
  },
  // One section for what Prim does for PRIMEO clients and the standard he works to (formerly two: help cards and value cards).
  // `icon` keys into ICONS in app/about/page.tsx; each card links to the matching part of the service pages.
  helps: {
    eyebrow: 'Working with Prim',
    title: 'How Prim helps, and the standard he works to.',
    text: 'Three things every PRIMEO client gets from Prim, whether they are buying a first home, an investment or a house and land package.',
    items: [
      { icon: 'target', kind: 'Buying a home', title: 'Search, assess and negotiate on your side', text: 'On-market and off-market search, an independent opinion of value before any offer, and negotiation or bidding with a walk-away number agreed in advance.', href: '/buyers#agency', cta: 'Buyer agency' },
      { icon: 'home', kind: 'Investing and house & land', title: 'Research first, then the shortlist', text: 'Every suburb, estate and builder is assessed against our 32-point matrix: comparable sales, rental range, land supply, track record and more. Only properties that meet your requirements make the shortlist.', href: '/buyers#investing', cta: 'Property investment' },
      { icon: 'heart', kind: 'From offer to keys', title: 'Clear, reachable and in plain English', text: 'Prompt replies and plain English from the first question to settlement, so you always know where things stand and what happens next.', href: '/buyers#how-it-works', cta: 'How it works' },
    ] as Help[],
  },
  closing: {
    eyebrow: 'A note from Prim',
    quote: 'Most people apply for a home loan only a few times in their lives. I have spent my career learning to get the numbers right, as an accountant, an auditor and a business owner, and I bring all of it to your application. If you are thinking about your next move, let’s talk it through.',
    signature: 'Certified Practising Accountant',
    text: 'Tell Prim what you are planning and he will explain what a lender is likely to want to see, and where to start.',
    button: 'Book a conversation',
  },
};

const withPh = <T extends object>(items: T[], phs: string[], srcs?: string[]) =>
  items.map((x, i) => ({ ...x, ph: phs[i] || 'Photo', src: srcs?.[i] }));

export const SERVICES: Record<string, Service> = {
  land: {
    key: 'land',
    title: 'House & Land Packages',
    hero: 'New homes, land and packages across growth corridors.',
    lead: 'Turnkey packages with vetted builders, fixed-price contracts and independent advice on where to buy.',
    placeholder: 'Photo: new estate streetscape, contemporary homes, wide sky',
    src: '/images/service_land.jpg',
    introSrc: '/images/land_intro.jpg',
    facts: [{ v: '18', l: 'Estates assessed this year' }, { v: '6', l: 'Recommended' }, { v: 'Fixed', l: 'Price build contracts' }],
    introTitle: 'New developments, independently assessed',
    intro: 'Not every estate is a good buy. We assess infrastructure, land supply, builder track record and resale evidence before we recommend a package, so you buy where value is likely to hold.',
    points: [],
    stepsTitle: 'The buyer journey',
    steps: withPh([
      { n: '01', title: 'Brief & finance', text: 'Budget, location and pre-approval, with lender referrals if needed.' },
      { n: '02', title: 'Select', text: 'Shortlisted estates and builders, each with our written assessment.' },
      { n: '03', title: 'Contract', text: 'Land and build contracts reviewed; inclusions and timelines confirmed.' },
      { n: '04', title: 'Build & handover', text: 'Progress inspections and a final handover check before you move in.' },
    ], ['Photo: pre-approval meeting', 'Photo: estate display village', 'Photo: signing land contract', 'Photo: house under construction'],
    ['/images/why_primeo_review.jpg', '/images/land_step_select.jpg', '/images/land_step_contract.jpg', '/images/land_step_build.jpg']),
    cardsEyebrow: 'Current packages',
    cardsTitle: 'Selected developments.',
    cards: withPh([
      { tag: 'Moreton Bay', title: 'Riverbend Estate', text: '4 bed · 2 bath · 2 car on 450 m². Fixed-price turnkey, 12-month build.', foot: 'From $785,000' },
      { tag: 'Ipswich', title: 'Ridgeview Rise', text: '4 bed · 2 bath · 2 car on 400 m². Close to rail and new schools.', foot: 'From $712,000' },
      { tag: 'Logan', title: 'Parkline Terraces', text: '3 bed · 2.5 bath townhomes with private courtyards. Low-maintenance investment.', foot: 'From $598,000' },
    ], ['Photo: Riverbend display home', 'Photo: Ridgeview streetscape', 'Photo: Parkline townhomes'],
    ['/images/land_card_riverbend.jpg', '/images/land_card_ridgeview.jpg', '/images/land_card_parkline.jpg']),
    columns: [],
    quote: { reviewId: 'neharika-basnet', ph: 'Photo: couple at new home handover', src: '/images/land_quote.jpg' },
    reviewStrip: { title: 'What first-home and new-build clients say.', text: 'Three of the 107 Google reviews, from clients who bought a first home or financed a build.', ids: ['dinesh-rabari', 'bhupinder-bawa', 'karan-bhatia'] },
    ctaButton: 'Register interest',
  },
};

// ---------- closing call to action (app/template.tsx appends it to every page) ----------
export const CTA_DEFAULT = {
  eyebrow: 'Start a conversation',
  title: 'Ready to make your next property move?',
  text: 'Leave your details and a PRIMEO agent will call you within one business day to set up a free 30-minute strategy session.',
  button: 'Book a strategy call',
};
export const CTA_COPY: Record<string, Partial<typeof CTA_DEFAULT>> = {
  '/buyers': { title: 'Ready to have someone in your corner?', text: 'Leave your details and a PRIMEO buyer’s agent will call you within one business day to set up a free 30-minute strategy session.', button: 'Book a strategy call' },
  '/about': { title: 'Talk to Prim about your next move.', text: 'Leave your details and Prim will be in touch to talk through your situation and what a lender will want to see.', button: 'Book a conversation' },
  '/reviews': { title: 'Join more than a hundred five-star clients.', text: 'Leave your details and we will call you within one business day to set up a free 30-minute strategy session.', button: 'Book a strategy call' },
};

// ---------- Buyer Agency (/buyers) ----------
// The Property Investment, Off-Market and Property Advisory pages were folded into this page in
// September 2026: each is now a chapter under "What we do", and the old routes redirect to the matching
// anchor (see next.config.ts). Section numbers (01–05) print in the ruled chapter headings, and the
// sticky in-page nav is built from `sections`.
export type Chapter = { id: string; n: string; label: string; title: string; text: string; points: string[]; slot: string; alt: string; cta: { label: string; href: string } };
export type HelpCase = { who: string; problem: string; help: string };
export type FaqItem = { q: string; a: string };

export const BUYERS = {
  title: 'Buyer Agency',
  hero: 'An expert in your corner, from search to settlement.',
  lead: 'Independent representation, investment research, off-market access and property advice for buyers across Brisbane and South East Queensland.',
  facts: [{ v: '350+', l: 'Properties secured' }, { v: '1 in 3', l: 'Bought off-market' }, { v: '$60k', l: 'Average saved vs guide' }],
  sections: [
    { id: 'what-we-do', label: 'What we do' },
    { id: 'who-we-are', label: 'Who we are' },
    { id: 'who-we-help', label: 'Who we help' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'faq', label: 'FAQ' },
  ],
  what: {
    n: '01',
    eyebrow: 'What we do',
    title: 'Four ways we work for buyers. One standard of evidence.',
    text: 'Buying a home, building a portfolio, chasing something that never reaches the portals, or simply wanting a second opinion: it is the same team, the same research and the same walk-away discipline.',
    chapters: [
      {
        id: 'agency', n: '01', label: 'Buyer Agency',
        title: 'Search, assess, negotiate, settle. All of it, on your side.',
        text: 'Every seller has an agent whose job is to get the highest price. A buyer’s agent restores the balance. We take your brief, search the whole market including what is never advertised, assess each property on evidence, then negotiate or bid with a walk-away number agreed in advance.',
        points: ['Full search across on-market, pre-market and off-market stock', 'Independent opinion of value before any offer is made', 'Negotiation and auction bidding by people who do it every week', 'Contract to settlement, coordinated with your solicitor, broker and inspector'],
        slot: 'BUYERS_CHAPTER_AGENCY', alt: 'Buyer’s agent walking clients through a Queenslander',
        cta: { label: 'Book a strategy call →', href: '/contact' },
      },
      {
        id: 'investing', n: '02', label: 'Property Investment',
        title: 'Research first. Then the property.',
        text: 'Most investment mistakes happen before the search begins: the wrong suburb, the wrong property type, or a price set by emotion. We start with your objectives and test every location against the evidence: infrastructure, land supply, population, employment, rental demand and comparable sales.',
        points: ['Suburb and growth-corridor research throughout Australia', 'Comparable sales, rental range and holding costs checked before you commit', 'Established homes and house & land assessed on the same evidence', 'No promised returns, just the reasoning behind each recommendation'],
        slot: 'BUYERS_CHAPTER_INVESTING', alt: 'Adviser and investor reviewing property figures',
        cta: { label: 'Talk through an investment brief →', href: '/contact' },
      },
      {
        id: 'off-market', n: '03', label: 'Off-Market Access',
        title: 'Some of the best homes are never advertised.',
        text: 'Sellers choose privacy, speed or a quiet test of the market, and selling agents call the buyers they know are ready. Around one in three properties we secure never reaches a portal. Access is only half the job: every off-market home still gets the same pricing analysis and due diligence.',
        points: ['Off-market, pre-market and privately available homes through agent and local networks', 'Direct approaches to owners in the streets you want', 'Inspections before a campaign launches, ahead of the crowd', 'The same scrutiny whichever door a property came through'],
        slot: 'BUYERS_CHAPTER_OFF_MARKET', alt: 'Private home behind a gate',
        cta: { label: 'Join our buyer network →', href: '/contact' },
      },
      {
        id: 'advisory', n: '04', label: 'Property Advisory',
        title: 'Independent guidance, with or without the purchase.',
        text: 'Found a property yourself? Unsure what it is really worth, or how to bid on Saturday? Advisory brings the context of hundreds of transactions a year to a single decision. Engage us for one question or for the whole purchase.',
        points: ['Written opinion of value, with the comparable sales it rests on', 'Independent assessment of a property you have already found', 'Negotiation strategy, offer structure and a bidder in your place on auction day', 'Investment and house & land guidance before you sign'],
        slot: 'BUYERS_CHAPTER_ADVISORY', alt: 'Advisory meeting',
        cta: { label: 'Book a consultation →', href: '/contact' },
      },
    ] as Chapter[],
  },
  who: {
    n: '02',
    eyebrow: 'Who we are',
    title: 'Independent by design. Accountable to one person: you.',
    text: 'PRIMEO is a licensed, independent buyer’s agency based in Brisbane. We do not list, sell or take developer commissions, so the only outcome that matters is yours. Six years across South East Queensland, on and off the market, means we have seen how deals are actually won.',
    principles: TRUST,
    stats: [
      { v: 6, label: 'Years in the Brisbane market', sub: 'Buying for clients since 2020' },
      { v: 100, suf: '%', label: 'Independent', sub: 'Paid by the buyer, never by a vendor or developer' },
      { v: 60, suf: '+', label: 'Suburbs served', sub: 'From New Farm to the Moreton Bay corridor' },
      { v: 100, suf: '+', label: 'Five-star Google reviews', sub: '5.0 average rating from 107 reviews' },
    ] as { v: number; pre?: string; suf?: string; label: string; sub: string }[],
    link: { label: 'About PRIMEO →', href: '/about' },
  },
  help: {
    n: '03',
    eyebrow: 'Who we help',
    title: 'Different buyers. The same standard of evidence.',
    text: 'Most people buy property a handful of times in their lives, usually under pressure. These are the situations clients bring to us most often.',
    cases: [
      { who: 'First-home buyers', problem: 'Every open home feels like a competition you are losing.', help: 'We explain the process in plain language, set a realistic budget with your broker, and negotiate or bid for you so the first purchase is a considered one.' },
      { who: 'Growing families', problem: 'You need more space and the right school catchment, but you cannot sell before you know what you can buy.', help: 'We work the timing, the catchments and the off-market stock so you move once, not twice.' },
      { who: 'Investors', problem: 'You want growth and yield, but every “hotspot” list contradicts the last one.', help: 'Research-led sourcing across Brisbane and South East Queensland, with the numbers checked before you commit.' },
      { who: 'Interstate & overseas buyers', problem: 'You cannot fly in for every inspection, and photographs hide a lot.', help: 'We inspect, video and assess each shortlisted home, then negotiate or bid on your behalf. You decide from wherever you are.' },
      { who: 'Time-poor professionals', problem: 'Weekends of open homes are not how you want to spend the next six months.', help: 'We shortlist against your brief; you inspect only what fits, and we handle everything between offer and settlement.' },
      { who: 'Downsizers', problem: 'The family home is worth more than ever, but the next move has to be the right one.', help: 'Low-maintenance homes and apartments assessed for lifestyle, resale and body corporate health before you commit.' },
    ] as HelpCase[],
  },
  process: {
    n: '04',
    eyebrow: 'How it works',
    title: 'Six steps. One decision, made with the evidence in front of you.',
    text: 'The same process whether the property is public or private, a home or an investment.',
    steps: [
      { n: '01', title: 'Brief', text: 'A strategy session to define budget, location, purpose and timeline, with finance in place.' },
      { n: '02', title: 'Research', text: 'Suburbs, streets and market conditions assessed against the brief.' },
      { n: '03', title: 'Source', text: 'On-market, pre-market and off-market sourcing. Only what fits reaches you.' },
      { n: '04', title: 'Assess', text: 'Inspection, comparable sales, building and pest, contract review.' },
      { n: '05', title: 'Negotiate', text: 'Private treaty or auction, with a walk-away number agreed in advance.' },
      { n: '06', title: 'Settle', text: 'Contract to settlement, coordinated with your solicitor, broker and inspector. Then the keys.' },
    ] as Factor[],
    image: { slot: 'BUYERS_PROCESS_WIDE', alt: 'Keys handed over at the front door', tag: 'Settlement day' },
    link: { label: 'Book a strategy call', href: '/contact' },
  },
  faq: {
    n: '05',
    eyebrow: 'FAQ',
    title: 'Questions buyers actually ask.',
    text: 'Straight answers to the situations people bring to us most often. If yours is not here, ask us.',
    button: 'Ask us a question',
    items: [
      { q: 'I keep getting outbid at auctions. What am I doing wrong?', a: 'Usually nothing that a clear limit and a plan would not fix. Most buyers bid reactively, to the room, rather than to the evidence. We set a walk-away number from comparable sales before the day, decide how and when to bid, and if you would rather not stand there, we bid for you.' },
      { q: 'The agent says there are other offers. How do I know if that is true?', a: 'Often you cannot, and that is the point. We do not respond to pressure; we respond to evidence. If the comparable sales support the number, we move. If they do not, we hold and say so to the agent in writing. A professional across the table changes the conversation.' },
      { q: 'How much does a buyer’s agent cost, and is it worth it?', a: 'Fees are agreed before we start, either fixed or a percentage of the purchase price, and explained in the first conversation. Many clients recover the fee through the purchase price alone, and the more expensive mistake is buying the wrong property. If we do not think engaging us makes sense for your brief, we will say so.' },
      { q: 'I have found a property myself. Can you just check it for me?', a: 'Yes. Our advisory service covers exactly that: an independent assessment of the property, a written opinion of value with the comparable sales it rests on, and a negotiation strategy. You keep control of the purchase and make the decision with more context.' },
      { q: 'What is the difference between a buyer’s agent and the selling agent?', a: 'The selling agent is paid by the vendor to get the highest price. A buyer’s agent is paid by you and works only for you: searching, assessing, negotiating and coordinating settlement. We never take a fee from a seller or a developer.' },
      { q: 'I do not live in Brisbane. Can you buy on my behalf?', a: 'Yes. Interstate and overseas buyers are a large part of our work. We inspect, video and assess each shortlisted property, arrange building and pest, and negotiate or bid on your behalf. You decide from wherever you are.' },
      { q: 'How do I know what a property is really worth, not just the guide price?', a: 'Price guides are marketing. Value comes from recent sales of genuinely comparable homes, adjusted for what differs, then read against current stock and competition in that suburb. That is what our written opinion of value shows you, before you make an offer.' },
      { q: 'Are off-market properties always cheaper?', a: 'No. Some are offered quietly because the owner wants privacy; some because they would struggle in a public campaign. Access gets you to the table early. Pricing, condition, location and due diligence still decide whether you should sit down.' },
      { q: 'The building and pest report found problems. Should I walk away?', a: 'Not necessarily. Most older Brisbane homes have something in the report. The questions are what it costs to fix, whether it changes the value, and whether the vendor will meet you on price or repairs. We read the report with you, get quotes where needed, and renegotiate or walk away on the evidence.' },
      { q: 'I am a first-home buyer and do not know where to start.', a: 'Start with a conversation. We explain the process in plain language, what your budget really buys in the suburbs you like, the grants and concessions to raise with your broker, and the traps that catch first-timers: emotional bidding, skipped inspections and overpaying for a renovation.' },
    ] as FaqItem[],
  },
  // Closing client story: a Google review (its id in lib/reviews.ts) beside the BUYERS_QUOTE photo.
  quote: { reviewId: 'valeska-bezuidenhout', slot: 'BUYERS_QUOTE' },
};
