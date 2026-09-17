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
  quote: { text: string; name: string; meta: string; ph: string; src?: string };
  ctaButton: string;
};

export const NAV = [
  { key: 'buyers', label: 'Buyer Agency', href: '/buyers' },
  { key: 'selling', label: 'Selling', href: '/selling' },
  { key: 'rentals', label: 'Rentals', href: '/rentals' },
  { key: 'commercial', label: 'Commercial', href: '/commercial' },
  { key: 'land', label: 'House & Land', href: '/land' },
  { key: 'about', label: 'About', href: '/about' },
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
  { id: 'nguyen', quote: 'They found us a home that was never advertised and negotiated $60k under the guide. Calm the whole way through.', name: 'Sarah & Tom Nguyen', meta: 'Bought in New Farm' },
  { id: 'andersen', quote: 'The appraisal was honest, the campaign plan was clear, and we sold in three weeks above reserve.', name: 'Michael Andersen', meta: 'Sold in Paddington' },
  { id: 'raman', quote: 'Our commercial purchase had a dozen moving parts. PRIMEO kept every one of them on track.', name: 'Priya Raman', meta: 'Commercial investor, Fortitude Valley' },
];

export const ARTICLES = [
  { id: 'one', cat: 'Market update', date: 'Sep 2026', title: 'Brisbane spring market: what buyers should expect', excerpt: 'Stock levels, clearance rates and where the competition is heading this quarter.', placeholder: 'Photo: Brisbane skyline from Kangaroo Point', src: '/images/insight_skyline.jpg' },
  { id: 'two', cat: 'Buying', date: 'Aug 2026', title: 'Off-market properties, explained', excerpt: 'How pre-market and off-market deals actually happen and how to access them.', placeholder: 'Photo: front door detail', src: '/images/insight_front_door.jpg' },
  { id: 'three', cat: 'Investing', date: 'Aug 2026', title: 'Growth corridors worth watching in 2027', excerpt: 'Infrastructure, land supply and the suburbs where the evidence stacks up.', placeholder: 'Photo: aerial of a new estate', src: '/images/insight_estate_aerial.jpg' },
];

export const PROPERTIES = [
  { id: 'a', status: 'For sale', price: '$1,850,000', address: '42 Moray Street, New Farm', type: 'House', beds: 4, baths: 3, cars: 2, agent: 'Jordan Reid · 0400 000 000', placeholder: 'Photo: renovated Queenslander exterior', src: '/images/prop_moray_st.jpg' },
  { id: 'b', status: 'Secured off-market', price: '$1,420,000', address: '12 Latrobe Terrace, Paddington', type: 'House', beds: 4, baths: 2, cars: 2, agent: 'Secured for a PRIMEO buyer', placeholder: 'Photo: character home with verandah', src: '/images/prop_latrobe_tce.jpg' },
  { id: 'c', status: 'For lease', price: '$1,150 per week', address: '8/21 Oxlade Drive, New Farm', type: 'Apartment', beds: 3, baths: 2, cars: 1, agent: 'Property management', placeholder: 'Photo: riverfront apartment balcony', src: '/images/prop_oxlade_dr.jpg' },
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
  { n: '02', title: 'Every side of the deal', text: 'Buyers, sellers, landlords and investors: we see how deals are actually won.' },
  { n: '03', title: 'Evidence, not opinion', text: 'Each recommendation arrives with comparable sales and the reasoning behind it.' },
  { n: '04', title: 'Calm under pressure', text: 'Auctions, deadlines and negotiations handled by people who do it weekly.' },
];

export const VALUES = [
  { n: '01', title: 'Independence', text: 'No listing to push, no developer commissions. Our only client is the person in front of us.' },
  { n: '02', title: 'Evidence', text: 'Every recommendation comes with the comparable sales and the reasoning behind it.' },
  { n: '03', title: 'Calm', text: 'Property is stressful enough. We remove urgency tricks and explain each step plainly.' },
  { n: '04', title: 'Local', text: 'Suburb by suburb knowledge of Brisbane and South East Queensland, built over 14 years.' },
];

export const TEAM = [
  { id: 'one', name: 'Jordan Reid', role: 'Principal · Buyer Agency', bio: 'Founder. 14 years negotiating for Brisbane buyers.' },
  { id: 'two', name: 'Elena Marsh', role: 'Director · Sales', bio: 'Campaign strategy and auction specialist.' },
  { id: 'three', name: 'Daniel Okafor', role: 'Head of Commercial', bio: 'Office, retail and industrial acquisitions.' },
  { id: 'four', name: 'Mia Tran', role: 'Property Management', bio: 'Keeps 400+ tenancies running smoothly.' },
];

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
    introSrc: '/images/buyers_intro.jpg',
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
    quote: { text: 'They found us a home that was never advertised and negotiated $60k under the guide. Calm the whole way through.', name: 'Sarah & Tom Nguyen', meta: 'Bought in New Farm', ph: 'Photo: family at their new front door', src: '/images/testimonial_verandah.jpg' },
    ctaButton: 'Book a strategy call',
  },
  selling: {
    key: 'selling',
    title: 'Selling',
    hero: 'Sell with a strategy, not just a sign.',
    lead: 'Considered campaigns that find the right buyer and protect your price.',
    placeholder: 'Photo: styled living room with garden view',
    src: '/images/service_selling.jpg',
    introSrc: '/images/selling_intro.jpg',
    facts: [{ v: '21 days', l: 'Average days on market' }, { v: '4%', l: 'Above appraisal, average' }, { v: '100%', l: 'Campaigns with weekly reports' }],
    introTitle: 'A calmer way to sell',
    intro: 'Selling well is a sequence of good decisions: the right price guide, the right method, the right buyers in the room at the right time. We plan each of them with you before anything goes live, and we report on every one of them as the campaign runs.',
    points: [],
    stepsTitle: 'The selling process',
    steps: withPh([
      { n: '01', title: 'Appraisal', text: 'A documented market appraisal with comparable evidence, not a number to win the listing.' },
      { n: '02', title: 'Prepare', text: 'Presentation, styling and photography planned to the buyer we want to attract.' },
      { n: '03', title: 'Campaign', text: 'Targeted digital, database and portal marketing with weekly reporting.' },
      { n: '04', title: 'Negotiate', text: 'Private treaty, auction or expressions of interest, run to protect your price.' },
    ], ['Photo: appraisal walkthrough', 'Photo: stylist dressing a room', 'Photo: photographer on site', 'Photo: handshake at auction'],
    ['/images/selling_step_appraisal.jpg', '/images/selling_step_prepare.jpg', '/images/selling_step_campaign.jpg', '/images/selling_step_negotiate.jpg']),
    cardsEyebrow: 'Marketing approach',
    cardsTitle: 'Reach the right buyers, not just the most.',
    cards: withPh([
      { tag: 'Presentation', title: 'Editorial photography', text: 'Architectural imagery and floor plans that show the home the way it lives.', foot: 'Included in every campaign' },
      { tag: 'Reach', title: 'Buyer database first', text: 'Qualified buyers from our buyer agency see your home before it is public.', foot: 'Pre-market advantage' },
      { tag: 'Reporting', title: 'Weekly campaign reports', text: 'Enquiry, inspections, feedback and price signals, explained plainly.', foot: 'No surprises' },
    ], ['Photo: editorial interior', 'Photo: buyer database on screen', 'Photo: campaign report'],
    ['/images/selling_card_photography.jpg', '/images/selling_card_database.jpg', '/images/selling_card_report.jpg']),
    columns: [],
    quote: { text: 'The appraisal was honest, the campaign plan was clear, and we sold in three weeks above reserve.', name: 'Michael Andersen', meta: 'Sold in Paddington', ph: 'Photo: seller at the front steps of his home', src: '/images/selling_quote.jpg' },
    ctaButton: 'Request an appraisal',
  },
  rentals: {
    key: 'rentals',
    title: 'Rental Services',
    hero: 'Rentals managed with care and clarity.',
    lead: 'Property management that keeps landlords informed and tenants looked after.',
    placeholder: 'Photo: bright apartment interior, Brisbane skyline',
    src: '/images/service_rentals.jpg',
    introSrc: '/images/rentals_intro.jpg',
    facts: [{ v: '0.8%', l: 'Vacancy across our portfolio' }, { v: '48 hrs', l: 'Average maintenance response' }, { v: '4 × yr', l: 'Routine inspections' }],
    introTitle: 'Good management is good communication',
    intro: 'A rental is a relationship between three parties. We keep it working with clear leases, fast maintenance, transparent statements and a single point of contact who knows your property.',
    points: [],
    steps: [],
    cards: [],
    columns: withPh([
      { eyebrow: 'For landlords', title: 'Protect the asset, maximise the return.', text: 'Rental appraisal, tenant selection, routine inspections and compliance handled for you.', points: ['Rental appraisal and market positioning', 'Tenant screening and reference checks', 'Quarterly inspections with photo reports', 'Maintenance coordination with vetted trades', 'Monthly statements and EOFY summaries'], cta: 'Request a rental appraisal' },
      { eyebrow: 'For tenants', title: 'A home you can rely on.', text: 'Straightforward applications, prompt repairs and respectful communication throughout your lease.', points: ['Simple online application', 'Repairs logged and tracked online', 'Clear entry and exit condition reports', 'Fair, transparent lease renewals'], cta: 'Browse rentals' },
    ], ['Photo: routine inspection', 'Photo: tenants moving in'],
    ['/images/rentals_landlords.jpg', '/images/rentals_tenants.jpg']),
    quote: { text: 'Statements arrive on time, repairs are handled fast and I always know who to call.', name: 'Grace Whitford', meta: 'Landlord, Bulimba', ph: 'Photo: landlord on her apartment balcony', src: '/images/rentals_quote.jpg' },
    ctaButton: 'Get in touch',
  },
  commercial: {
    key: 'commercial',
    title: 'Commercial',
    hero: 'Commercial property, handled end to end.',
    lead: 'Acquisition, leasing, sales and advisory for offices, retail and industrial assets.',
    placeholder: 'Photo: contemporary Brisbane office building at golden hour',
    src: '/images/service_commercial.jpg',
    introSrc: '/images/commercial_intro.jpg',
    facts: [{ v: '$120M', l: 'Commercial transactions' }, { v: '6.2%', l: 'Average net yield secured' }, { v: '3 sectors', l: 'Office · Retail · Industrial' }],
    introTitle: 'Commercial property solutions',
    intro: 'Commercial decisions carry more variables: yield, lease covenants, tenancy risk, zoning and exit. We bring the same evidence-led approach we use in residential to help investors and occupiers buy, lease and sell with confidence.',
    points: [],
    steps: [],
    cardsEyebrow: 'Services',
    cardsTitle: 'Four ways we work with commercial clients.',
    cards: withPh([
      { tag: 'Acquisition', title: 'Buy the right asset', text: 'Sourcing, financial analysis and due diligence for investors and owner-occupiers.', foot: 'Yield and risk assessed' },
      { tag: 'Leasing', title: 'Secure quality tenants', text: 'Tenant sourcing, lease negotiation and renewals that protect long-term income.', foot: 'Office · Retail · Industrial' },
      { tag: 'Sales', title: 'Sell to qualified buyers', text: 'Targeted campaigns to investors and occupiers already in our network.', foot: 'Off-market where it suits' },
      { tag: 'Advisory', title: 'Portfolio strategy', text: 'Hold-or-sell reviews, valuations and repositioning advice.', foot: 'Independent view' },
    ], ['Photo: office tower', 'Photo: retail strip', 'Photo: industrial warehouse', 'Photo: portfolio review'],
    ['/images/commercial_card_office.jpg', '/images/commercial_card_retail.jpg', '/images/commercial_card_industrial.jpg', '/images/why_primeo_review.jpg']),
    columns: [],
    quote: { text: 'Our commercial purchase had a dozen moving parts. PRIMEO kept every one of them on track.', name: 'Priya Raman', meta: 'Commercial investor, Fortitude Valley', ph: 'Photo: investor in office foyer', src: '/images/commercial_quote.jpg' },
    ctaButton: 'Book a consultation',
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
    quote: { text: 'They told us which estates to avoid and why. We bought where the numbers made sense.', name: 'Liam & Aisha Carter', meta: 'First-home buyers, Moreton Bay', ph: 'Photo: couple at new home handover', src: '/images/land_quote.jpg' },
    ctaButton: 'Register interest',
  },
};
