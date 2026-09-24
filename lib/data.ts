import { SLOTS } from './slots';

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
  quote: { text: string; name: string; meta: string; ph: string; src?: string; avatarSrc?: string };
  ctaButton: string;
};

export type NavItem = { key: string; label: string; full: string; href: string };
// `label` is the short nav wording; `full` is used where there is room (footer, hero band).
export const NAV: NavItem[] = [
  { key: 'buyers', label: 'Buyer Agency', full: 'Buyer Agency', href: '/buyers' },
  { key: 'investing', label: 'Investing', full: 'Property Investment', href: '/investing' },
  { key: 'off-market', label: 'Off-Market', full: 'Off-Market Properties', href: '/off-market' },
  { key: 'advisory', label: 'Property Advisory', full: 'Property Advisory', href: '/advisory' },
  { key: 'land', label: 'House & Land', full: 'House & Land', href: '/land' },
  { key: 'about', label: 'About', full: 'About', href: '/about' },
];
export const SERVICE_ITEMS = NAV.filter((i) => i.key !== 'about');

// Page-level photos (files live in public/images).
export const IMAGES = {
  hero: '/images/hero_brisbane_luxury.jpg',
  why: '/images/why_primeo_review.jpg',
  clients: '/images/testimonial_verandah.jpg',
  cta: '/images/cta_front_gate.jpg',
  aboutHero: '/images/hero_brisbane_luxury.jpg',
  aboutStoryA: '/images/about_early_office.jpg',
  aboutStoryB: '/images/testimonial_verandah.jpg',
  founder: '/images/founder_portrait.jpg',
  contactHero: '/images/contact_hero.jpg',
  contactMap: '/images/contact_office_exterior.jpg',
  contactOffice: '/images/contact_lounge.jpg',
};

export const CONTACT = {
  phone: '0400 000 000',
  phoneHref: 'tel:0400000000',
  email: 'hello@primeo.com.au',
  address1: 'Level 2, 12 Example Street',
  address2: 'Brisbane QLD 4000',
  hours: 'Mon–Fri 8am–6pm · Sat 9am–2pm',
};

export const TESTIMONIALS = [
  { id: 'nguyen', quote: 'They found us a home that was never advertised and negotiated $60k under the guide. Calm the whole way through.', name: 'Sarah & Tom Nguyen', meta: 'Bought in New Farm', src: '/images/avatar_nguyen.jpg' },
  { id: 'andersen', quote: 'We were outbid twice on our own. With PRIMEO bidding for us we secured the third home at auction, under budget.', name: 'Michael Andersen', meta: 'Bought in Paddington', src: '/images/avatar_andersen.jpg' },
  { id: 'raman', quote: 'They told us which suburbs to avoid and why. Our investment property was secured with the numbers already checked.', name: 'Priya Raman', meta: 'Investor, Fortitude Valley', src: '/images/avatar_raman.jpg' },
];

export const ARTICLES = [
  { id: 'one', cat: 'Market update', date: 'Sep 2026', title: 'Brisbane spring market: what buyers should expect', excerpt: 'Stock levels, clearance rates and where the competition is heading this quarter.', placeholder: 'Photo: Brisbane skyline from Kangaroo Point', src: '/images/insight_skyline.jpg', href: '/advisory' },
  { id: 'two', cat: 'Buying', date: 'Aug 2026', title: 'Off-market properties, explained', excerpt: 'How pre-market and off-market deals actually happen and how to access them.', placeholder: 'Photo: front door detail', src: '/images/insight_front_door.jpg', href: '/off-market' },
  { id: 'three', cat: 'Investing', date: 'Aug 2026', title: 'Growth corridors worth watching in 2027', excerpt: 'Infrastructure, land supply and the suburbs where the evidence stacks up.', placeholder: 'Photo: aerial of a new estate', src: '/images/insight_estate_aerial.jpg', href: '/investing' },
];

export const PROPERTIES = [
  { id: 'a', status: 'For sale', price: '$1,850,000', address: '42 Moray Street, New Farm', type: 'House', beds: 4, baths: 3, cars: 2, agent: 'Jordan Reid · 0400 000 000', placeholder: 'Photo: renovated Queenslander exterior', src: '/images/prop_moray_st.jpg' },
  { id: 'b', status: 'Secured off-market', price: '$1,420,000', address: '12 Latrobe Terrace, Paddington', type: 'House', beds: 4, baths: 2, cars: 2, agent: 'Secured for a PRIMEO buyer', placeholder: 'Photo: character home with verandah', src: '/images/prop_latrobe_tce.jpg' },
  { id: 'c', status: 'Secured off-market', price: '$1,290,000', address: '8/21 Oxlade Drive, New Farm', type: 'Apartment', beds: 3, baths: 2, cars: 1, agent: 'Secured for a PRIMEO investor', placeholder: 'Photo: riverfront apartment balcony', src: '/images/prop_oxlade_dr.jpg' },
];

export const JOURNEY: Step[] = [
  { n: '01', title: 'Discover', text: 'A strategy session to define budget, location, lifestyle and growth priorities.', ph: 'Photo: strategy meeting over coffee', src: '/images/journey_01_discover.jpg' },
  { n: '02', title: 'Search', text: 'On-market, off-market and pre-market sourcing, shortlisted against your brief.', ph: 'Photo: Brisbane suburb streetscape', src: '/images/journey_02_search.jpg' },
  { n: '03', title: 'Inspect', text: 'Walk-throughs, building and pest, comparable sales and contract review.', ph: 'Photo: inspecting a kitchen', src: '/images/journey_03_inspect.jpg' },
  { n: '04', title: 'Negotiate', text: 'Private treaty or auction, run with a clear walk-away number.', ph: 'Photo: auction paddle raised', src: '/images/journey_04_negotiate.jpg' },
  { n: '05', title: 'Secure', text: 'Contract to settlement, handled, then keys in hand.', ph: 'Photo: keys at the front door', src: '/images/journey_05_secure.jpg' },
];

export const TRUST = [
  { n: '01', title: 'Independent by design', text: 'No listing to push and no developer commissions. Our only client is the person in front of us.' },
  { n: '02', title: 'Deals seen from the inside', text: 'Home buyers and investors, on and off market: we see how deals are actually won.' },
  { n: '03', title: 'Evidence, not opinion', text: 'Each recommendation arrives with comparable sales and the reasoning behind it.' },
  { n: '04', title: 'Calm under pressure', text: 'Auctions, deadlines and negotiations handled by people who do it weekly.' },
];

export const VALUES = [
  { n: '01', title: 'Independence', text: 'No listing to push, no developer commissions. Our only client is the person in front of us.' },
  { n: '02', title: 'Evidence', text: 'Every recommendation comes with the comparable sales and the reasoning behind it.' },
  { n: '03', title: 'Calm', text: 'Property is stressful enough. We remove urgency tricks and explain each step plainly.' },
  { n: '04', title: 'Local', text: 'Suburb by suburb knowledge of Brisbane and South East Queensland, built across every market cycle.' },
];

/** Founder spotlight on the About page. Update `name` when the client confirms it. */
export const FOUNDER = {
  name: 'Prim Singh',
  role: 'Founder & CEO',
  quote: 'A buyer should never walk into a negotiation alone. Our job is to bring the evidence, hold the line on price, and be the one voice in the room that answers only to you.',
  bio: 'Prim founded PRIMEO after years of watching buyers outmanoeuvred by well-briefed selling agents. He still leads negotiations for private clients and sets the standard for every recommendation the firm makes.',
  src: '/images/founder_portrait.jpg',
};

const withPh = <T extends object>(items: T[], phs: string[], srcs?: string[]) =>
  items.map((x, i) => ({ ...x, ph: phs[i] || 'Photo', src: srcs?.[i] }));

export const SERVICES: Record<string, Service> = {
  buyers: {
    key: 'buyers',
    title: 'Buyer Agency',
    hero: 'An expert in your corner, from search to settlement.',
    lead: 'Independent representation for home buyers and investors across Brisbane and South East Queensland.',
    placeholder: 'Photo: buyers walking through a Queenslander with their agent',
    src: '/images/service_buyers.jpg',
    introSrc: '/images/buyers_representation.jpg',
    facts: [{ v: '350+', l: 'Properties secured' }, { v: '1 in 3', l: 'Bought off-market' }, { v: '$60k', l: 'Average saved vs guide' }],
    introTitle: 'Why buyers need representation',
    intro: 'Every seller has an agent whose job is to get the highest price. Most buyers have no one. A buyer’s agent restores the balance: we search the whole market, including off-market stock, assess each property on evidence and negotiate with a clear walk-away number.',
    points: ['Access to off-market and pre-market properties through agent networks', 'Independent valuation before you make an offer', 'Negotiation and auction bidding handled by someone who does it weekly', 'Time saved: we shortlist, you decide'],
    stepsTitle: 'Our buying process',
    steps: withPh([
      { n: '01', title: 'Brief', text: 'A strategy session to define budget, location, lifestyle and growth priorities.' },
      { n: '02', title: 'Search', text: 'On-market, off-market and pre-market sourcing, shortlisted against your brief.' },
      { n: '03', title: 'Assess', text: 'Inspections, comparable sales, building and pest, contract review.' },
      { n: '04', title: 'Secure', text: 'Negotiation or auction bidding, then support through to settlement.' },
    ], ['Photo: strategy meeting', 'Photo: suburb streetscape', 'Photo: inspecting a kitchen', 'Photo: keys in hand'],
    ['/images/journey_01_discover.jpg', '/images/journey_02_search.jpg', '/images/journey_03_inspect.jpg', '/images/journey_05_secure.jpg']),
    cardsEyebrow: 'Benefits',
    cardsTitle: 'What you gain with PRIMEO beside you.',
    cards: withPh([
      { tag: 'Clarity', title: 'One recommendation', text: 'We do not send you a list. We tell you which property, what it is worth and why.', foot: 'Evidence-based' },
      { tag: 'Access', title: 'The whole market', text: 'Roughly a third of the properties we secure never reach a portal.', foot: 'Off-market network' },
      { tag: 'Leverage', title: 'A stronger position', text: 'Selling agents negotiate differently with a professional across the table.', foot: 'Better outcomes' },
    ], ['Photo: signed contract', 'Photo: off-market home', 'Photo: auction crowd'],
    ['/images/why_primeo_review.jpg', '/images/prop_moray_st.jpg', '/images/buyers_card_leverage.jpg']),
    columns: [],
    quote: { text: 'They found us a home that was never advertised and negotiated $60k under the guide. Calm the whole way through.', name: 'Sarah & Tom Nguyen', meta: 'Bought in New Farm', ph: 'Photo: family at their new front door', src: '/images/testimonial_verandah.jpg', avatarSrc: '/images/avatar_nguyen.jpg' },
    ctaButton: 'Book a strategy call',
  },
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
    quote: { text: 'They told us which estates to avoid and why. We bought where the numbers made sense.', name: 'Liam & Aisha Carter', meta: 'First-home buyers, Moreton Bay', ph: 'Photo: couple at new home handover', src: '/images/land_quote.jpg', avatarSrc: '/images/avatar_carter.jpg' },
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
  '/investing': { title: 'Build your next property move with clarity.', text: 'Leave your details and a PRIMEO adviser will call you within one business day to talk through your investment brief.', button: 'Book a property consultation' },
  '/off-market': { eyebrow: 'Join our buyer network', title: 'Tell us what you’re looking for.', text: 'Register your brief and we will be in touch when a property that matches it comes through our network.', button: 'Join our buyer network' },
  '/advisory': { title: 'Make your next property decision with greater clarity.', text: 'Leave your details and a PRIMEO adviser will call you within one business day to set up a free 30-minute consultation.', button: 'Book a consultation' },
};

// ---------- Property Investment (/investing) ----------
export type Factor = { n: string; title: string; text: string };

export const INVESTING = {
  title: 'Property Investment',
  hero: 'Property investment backed by research, not guesswork.',
  lead: 'Independent sourcing, analysis and negotiation for investors buying in Brisbane and South East Queensland.',
  facts: [{ v: '14', l: 'Years in the Brisbane market' }, { v: '1 in 3', l: 'Purchases made off-market' }, { v: '6', l: 'Steps from strategy to settlement' }],
  intro: {
    eyebrow: 'Investment introduction',
    title: 'Research first. Then the property.',
    p1: 'Most investment mistakes are made before the search begins: the wrong suburb, the wrong property type, or a price set by emotion rather than evidence. PRIMEO works the other way around. We start with your objectives, research the market, and only then identify the opportunities that fit.',
    p2: 'From there the process is the one we run for every buyer: comparable sales, due diligence and professional negotiation with a clear walk-away number. Our only client is you, so the recommendation is independent of any listing or developer.',
    points: ['Market research and location analysis before any inspection', 'Property analysis built on comparable sales, not sales pitches', 'Professional negotiation and coordination through to settlement'],
  },
  research: {
    eyebrow: 'Research before purchase',
    title: 'Every recommendation starts with the evidence.',
    text: 'Before we put an investment property in front of you, the location and the property itself are tested against the questions below. If the evidence does not stack up, we keep looking.',
    factors: [
      { n: '01', title: 'Market research', text: 'Current conditions, stock levels and buyer competition across the suburbs on your shortlist.' },
      { n: '02', title: 'Comparable property analysis', text: 'Recent sales of similar homes, so the price you pay is measured against the market rather than the guide.' },
      { n: '03', title: 'Location research', text: 'Transport, schools, employment and lifestyle amenity, assessed street by street.' },
      { n: '04', title: 'Infrastructure', text: 'Committed and planned projects that change how an area works and how people move through it.' },
      { n: '05', title: 'Population growth', text: 'Who is moving in, who is moving out, and what that means for demand over time.' },
      { n: '06', title: 'Demand', text: 'Days on market, auction clearance and the balance between buyers and available stock.' },
      { n: '07', title: 'Rental considerations', text: 'Vacancy rates, tenant profile and a realistic rental range for the property type.' },
      { n: '08', title: 'Future growth potential', text: 'Land supply, zoning and the signals that suggest an area may develop, assessed without guarantees.' },
    ] as Factor[],
  },
  stepsTitle: 'Six steps, one investment decision.',
  steps: [
    { n: '01', title: 'Strategy', text: 'We understand your goals, budget, timeline and preferred investment profile before anything else.', ph: 'INVESTMENT_STEP_STRATEGY', src: SLOTS.INVESTMENT_STEP_STRATEGY },
    { n: '02', title: 'Research', text: 'Locations, market conditions and suitable opportunities are researched against that brief.', ph: 'INVESTMENT_STEP_RESEARCH', src: SLOTS.INVESTMENT_STEP_RESEARCH },
    { n: '03', title: 'Source', text: 'On-market, pre-market and off-market opportunities are searched, then shortlisted.', ph: 'INVESTMENT_STEP_SOURCE', src: SLOTS.INVESTMENT_STEP_SOURCE },
    { n: '04', title: 'Assess', text: 'Property analysis and due diligence: comparable sales, condition, contract and rental evidence.', ph: 'INVESTMENT_STEP_ASSESS', src: SLOTS.INVESTMENT_STEP_ASSESS },
    { n: '05', title: 'Negotiate', text: 'We represent you professionally through negotiation, with a walk-away number agreed in advance.', ph: 'INVESTMENT_STEP_NEGOTIATE', src: SLOTS.INVESTMENT_STEP_NEGOTIATE },
    { n: '06', title: 'Secure', text: 'The purchase is coordinated through to settlement with your solicitor, broker and inspector.', ph: 'INVESTMENT_STEP_SECURE', src: SLOTS.INVESTMENT_STEP_SECURE },
  ] as Step[],
  compare: {
    eyebrow: 'Established vs new',
    title: 'Established property or house and land? We assess both.',
    text: 'Neither is right for every investor. The choice depends on your budget, timeline, tax position and appetite for a build. We evaluate both on the same evidence and tell you which fits.',
    cols: [
      { eyebrow: 'Established property', title: 'Proven streets, known prices.', text: 'An existing home in an established suburb comes with a sales history, an existing rental market and a street you can walk today.', points: ['Comparable sales are readily available', 'Rental history and vacancy data exist for the area', 'Condition and renovation potential can be inspected'], slot: 'ESTABLISHED_PROPERTY_IMAGE', link: { label: 'How buyer agency works →', href: '/buyers' } },
      { eyebrow: 'New house & land', title: 'New stock in growth corridors.', text: 'A house and land package offers a new build, often in a corridor where infrastructure and population are still arriving. Builder, estate and land supply all need checking first.', points: ['Builder track record and contract terms reviewed', 'Estate infrastructure and land supply assessed', 'Depreciation and holding costs considered with your accountant'], slot: 'HOUSE_AND_LAND_IMAGE', link: { label: 'House & land packages →', href: '/land' } },
    ],
    note: 'We do not promise returns. We show you the evidence for each option and the reasoning behind our recommendation.',
  },
  growth: {
    eyebrow: 'Growth areas',
    title: 'Researching Brisbane and Queensland growth corridors.',
    text: 'South East Queensland is investing in transport, health and education ahead of a growing population. We research each corridor in the data and on the ground, and we are clear about what the evidence does and does not show.',
    markers: [
      { x: 60, y: 14, label: 'Sunshine Coast' }, { x: 57, y: 33, label: 'Moreton Bay' }, { x: 63, y: 47, label: 'Brisbane' },
      { x: 37, y: 56, label: 'Ipswich' }, { x: 60, y: 66, label: 'Logan' }, { x: 72, y: 84, label: 'Gold Coast' },
    ],
    lenses: [
      { n: '01', title: 'Infrastructure', text: 'Rail, road, hospital and education projects that are funded, not just announced.' },
      { n: '02', title: 'Land supply', text: 'How much land is still to come, and what that means for the prices already being paid.' },
      { n: '03', title: 'Population', text: 'Interstate and overseas migration, and where new residents are actually settling.' },
      { n: '04', title: 'Employment', text: 'Job centres, commute times and the industries anchoring each corridor.' },
    ] as Factor[],
    disclaimer: 'Past growth is not a guarantee of future performance. Every area is assessed on current evidence, and our advice is general in nature until we know your circumstances.',
  },
};

// ---------- Off-Market Properties (/off-market) ----------
export const OFF_MARKET = {
  title: 'Off-Market Opportunities',
  hero: 'Access property opportunities beyond the major portals.',
  lead: 'Off-market, pre-market and privately available homes, sourced through the relationships a buyer’s agent builds every week.',
  facts: [{ v: '1 in 3', l: 'PRIMEO purchases made off-market' }, { v: '350+', l: 'Properties secured' }, { v: '60+', l: 'Suburbs served' }],
  what: {
    eyebrow: 'What is off-market?',
    title: 'Some of the best homes are never advertised.',
    text: 'Sellers choose privacy, speed or a quiet test of the market. Selling agents know which buyers are ready. Those two facts create a layer of the market that public listings never show.',
    defs: [
      { n: '01', title: 'Off-market', text: 'A property offered for sale without a public campaign, usually shared by the selling agent with a small number of qualified buyers.' },
      { n: '02', title: 'Pre-market', text: 'A property that will be listed soon. Buyers introduced before the campaign can inspect and negotiate ahead of the crowd.' },
      { n: '03', title: 'Privately available', text: 'An owner who would sell for the right offer without engaging an agent, reached through direct approaches and local networks.' },
    ] as Factor[],
  },
  beyond: {
    eyebrow: 'Beyond public listings',
    title: 'Six ways a buyer’s agent widens the search.',
    text: 'Portals show what is advertised. A buyer’s agent works the whole market, on and off it, and shortlists only what fits your brief.',
    channels: [
      { n: '01', title: 'Agent relationships', text: 'Selling agents call buyers’ agents first when a vendor wants a quiet sale.' },
      { n: '02', title: 'Local networks', text: 'Solicitors, accountants, builders and neighbours who hear about a sale before it happens.' },
      { n: '03', title: 'Pre-market opportunities', text: 'Homes being prepared for sale, inspected before the campaign launches.' },
      { n: '04', title: 'Off-market opportunities', text: 'Properties offered quietly, without advertising, to qualified buyers.' },
      { n: '05', title: 'Direct property sourcing', text: 'Approaches to owners of specific streets or homes that match your brief.' },
      { n: '06', title: 'Existing listings', text: 'Everything on the portals, assessed with the same rigour. Public does not mean overpriced.' },
    ] as Factor[],
  },
  process: {
    eyebrow: 'How the process works',
    title: 'From brief to keys, without the crowd.',
    steps: [
      { n: '01', title: 'Understand', text: 'A brief that defines budget, location, property type, purpose and timeline.' },
      { n: '02', title: 'Search', text: 'On-market, pre-market and off-market sourcing through our agent and local networks.', slot: 'OFF_MARKET_STEP_SEARCH' },
      { n: '03', title: 'Shortlist', text: 'Only the properties that fit the brief reach you, each with our reasoning attached.' },
      { n: '04', title: 'Evaluate', text: 'Comparable sales, inspection, condition and due diligence before any offer is made.', slot: 'OFF_MARKET_STEP_EVALUATE' },
      { n: '05', title: 'Negotiate', text: 'Private negotiation with a clear walk-away number, handled on your behalf.' },
      { n: '06', title: 'Secure', text: 'Contract to settlement, coordinated with your solicitor, broker and building inspector.', slot: 'OFF_MARKET_STEP_SECURE' },
    ] as (Factor & { slot?: string })[],
  },
  caution: {
    eyebrow: 'A word of caution',
    title: 'Not every off-market property is a good property.',
    lines: ['Access alone is not enough.', 'Pricing must still be analysed.', 'Location still matters.', 'Condition still matters.', 'Comparable sales must still be reviewed.', 'Due diligence remains essential.'],
    text: 'Some properties are off-market because the owner wants privacy. Others are off-market because they would struggle in a public campaign. We treat every opportunity with the same scrutiny, whichever door it came through.',
  },
  matching: {
    eyebrow: 'Property matching',
    title: 'Tell us the brief. We match it against everything we see.',
    text: 'The clearer the brief, the faster the match. Define what you are looking for and we will contact you when a suitable property comes through our network.',
    criteria: [
      { label: 'Budget', value: 'A realistic range, with finance in place', sub: 'We negotiate within it, never above it.' },
      { label: 'Location', value: 'Suburbs, streets or a radius from work and family', sub: 'Inner city, coast or growth corridor.' },
      { label: 'Property type', value: 'House, townhouse, apartment or land', sub: 'Bedrooms, parking, outdoor space and condition.' },
      { label: 'Purpose', value: 'Owner occupier or investment', sub: 'Changes what we assess and how we negotiate.' },
      { label: 'Timeline', value: 'Ready now, three months or twelve', sub: 'Pre-market suits patient buyers; off-market rewards ready ones.' },
    ],
  },
};

// ---------- Property Advisory (/advisory) ----------
export const ADVISORY = {
  title: 'Property Advisory',
  hero: 'Independent guidance for confident property decisions.',
  lead: 'Advice on value, location, strategy and negotiation from an adviser with no listing to sell.',
  facts: [{ v: '14', l: 'Years advising buyers' }, { v: '100%', l: 'Independent, no listings to push' }, { v: 'Evidence', l: 'Behind every recommendation' }],
  context: {
    eyebrow: 'Property decisions need context',
    title: 'A price is only a number until you know what sits behind it.',
    text: 'Most buyers see a handful of properties before they commit. We see hundreds a year, on and off the market, and we sit across the table from selling agents every week. Advisory brings that context to your decision, whether or not we run the purchase for you.',
    needs: [
      { n: '01', title: 'Market value', text: 'What the property is worth on the evidence, not the guide.' },
      { n: '02', title: 'Location', text: 'How the street, the suburb and the plans around it affect the price you should pay.' },
      { n: '03', title: 'Comparable properties', text: 'Which recent sales are genuinely comparable, and which are being used to anchor you.' },
      { n: '04', title: 'Property type', text: 'House, townhouse, apartment or land, and what each means for your objectives.' },
      { n: '05', title: 'Negotiation', text: 'How to structure an offer, when to walk away and how auctions really work.' },
      { n: '06', title: 'Purchase strategy', text: 'Timing, finance and the order of decisions between now and settlement.' },
    ] as Factor[],
  },
  services: [
    { n: '01', title: 'Property strategy', text: 'Objectives, budget and timeline translated into a plan you can act on.', slot: 'ADVISORY_SERVICE_STRATEGY' },
    { n: '02', title: 'Suburb & market research', text: 'Where to look and why, backed by data and time spent on the ground.', slot: 'ADVISORY_SERVICE_RESEARCH' },
    { n: '03', title: 'Property assessment', text: 'An independent view of a property you have found, before you commit to it.', slot: 'ADVISORY_SERVICE_ASSESSMENT' },
    { n: '04', title: 'Comparable sales analysis', text: 'A written opinion of value, with the sales it rests on.', slot: 'ADVISORY_SERVICE_COMPARABLES' },
    { n: '05', title: 'Negotiation strategy', text: 'Offer structure, timing and a walk-away number, agreed before you start.', slot: 'ADVISORY_SERVICE_NEGOTIATION' },
    { n: '06', title: 'Auction support', text: 'A bidding strategy, or a bidder in your place, on the day.', slot: 'ADVISORY_SERVICE_AUCTION' },
    { n: '07', title: 'Investment property guidance', text: 'Yield, growth evidence and holding costs assessed against your goals.', slot: 'ADVISORY_SERVICE_INVESTMENT' },
    { n: '08', title: 'House & land guidance', text: 'Estate, builder and contract review before you sign.', slot: 'ADVISORY_SERVICE_LAND' },
  ],
  assessment: {
    eyebrow: 'Property assessment',
    title: 'A property should be judged in context, not on emotion.',
    text: 'Open homes are designed to make you feel something. Our assessment puts the property back in context, so the decision rests on what it is, where it is and what it is worth.',
    factors: [
      { n: '01', title: 'Location', text: 'The street, its neighbours and the plans that will change it.' },
      { n: '02', title: 'Price', text: 'The guide, the vendor’s expectation and the number the evidence supports.' },
      { n: '03', title: 'Comparable sales', text: 'Genuinely similar homes sold recently, adjusted for what differs.' },
      { n: '04', title: 'Property condition', text: 'Structure, services and the cost of what needs doing.' },
      { n: '05', title: 'Layout', text: 'How the home works day to day, and how it will resell.' },
      { n: '06', title: 'Market conditions', text: 'Stock, competition and timing in that suburb right now.' },
      { n: '07', title: 'Buyer objectives', text: 'Whether this property serves the plan, or only the moment.' },
    ] as Factor[],
  },
  negotiation: {
    eyebrow: 'Negotiation',
    title: 'The asking price is only the beginning of the conversation.',
    text: 'Every seller has a professional negotiating for them. Advisory puts one on your side: someone who knows the agent’s playbook, the true comparable sales and the number at which you walk away.',
    points: [
      { n: '01', title: 'Private treaty', text: 'Offer structure, conditions and timing that protect your position.' },
      { n: '02', title: 'Auction', text: 'A bidding strategy set in advance, and a calm bidder on the day.' },
      { n: '03', title: 'Walk-away number', text: 'Agreed before negotiations begin, so the decision is never made under pressure.' },
    ] as Factor[],
  },
  timeline: {
    eyebrow: 'From strategy to settlement',
    title: 'Six stages. One adviser. All the evidence.',
    steps: [
      { n: '01', title: 'Consult', text: 'Objectives, budget, timeline and the questions you need answered.' },
      { n: '02', title: 'Research', text: 'Suburbs, streets and market conditions assessed against your brief.' },
      { n: '03', title: 'Assess', text: 'Individual properties reviewed in context, with comparable sales.' },
      { n: '04', title: 'Negotiate', text: 'Strategy agreed, then executed at private treaty or auction.' },
      { n: '05', title: 'Purchase', text: 'Contract, conditions and due diligence coordinated with your advisers.' },
      { n: '06', title: 'Settle', text: 'Final inspection and settlement, then the keys.' },
    ] as Factor[],
  },
};
