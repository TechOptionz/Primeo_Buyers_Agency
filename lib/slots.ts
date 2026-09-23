/**
 * Image placeholders for the Property Investment, Off-Market and Property Advisory pages
 * (and their cards on the homepage). Each key is the identifier printed inside the
 * placeholder on the page, so it is easy to find.
 *
 * To use a real photo: drop the file (JPG / WebP / AVIF) in public/images and set the
 * path here, e.g.  PROPERTY_INVESTMENT_HERO: '/images/investment_hero.webp'
 * The page picks it up automatically; nothing else needs to change.
 *
 * Suggested crops are noted per slot. Portrait = 4:5 or 3:4, landscape = 16:10, wide = 21:9.
 */
export const SLOTS: Record<string, string | undefined> = {
  // ---- Property Investment (/investing) ----
  PROPERTY_INVESTMENT_HERO: undefined,        // wide, full-bleed hero (also the homepage service card)
  INVESTMENT_INTRO_PORTRAIT: undefined,       // portrait: adviser and client reviewing figures
  PROPERTY_RESEARCH_IMAGE: undefined,         // portrait: research desk, plans, laptop with data
  INVESTMENT_STEP_STRATEGY: undefined,        // landscape: strategy meeting
  INVESTMENT_STEP_RESEARCH: undefined,        // landscape: suburb aerial or data on screen
  INVESTMENT_STEP_SOURCE: undefined,          // landscape: streetscape, agent on the phone
  INVESTMENT_STEP_ASSESS: undefined,          // landscape: inspecting a property
  INVESTMENT_STEP_NEGOTIATE: undefined,       // landscape: negotiation at a table
  INVESTMENT_STEP_SECURE: undefined,          // landscape: keys, handshake, settlement
  ESTABLISHED_PROPERTY_IMAGE: undefined,      // landscape: established Queenslander street
  HOUSE_AND_LAND_IMAGE: undefined,            // landscape: new estate under construction
  BRISBANE_GROWTH_MAP: undefined,             // wide: stylised map / aerial of South East Queensland
  BRISBANE_PROPERTY_IMAGE: undefined,         // portrait: Brisbane home, river or skyline

  // ---- Off-Market Properties (/off-market) ----
  OFF_MARKET_HERO: undefined,                 // wide, full-bleed hero: high-end home, dusk
  OFF_MARKET_PROPERTY_IMAGE: undefined,       // portrait: private home behind a gate (also the homepage card)
  OFF_MARKET_STREETSCAPE: undefined,          // wide 21:9: leafy inner-Brisbane street
  OFF_MARKET_STEP_SEARCH: undefined,          // landscape: agent on the phone / driving a street
  OFF_MARKET_STEP_EVALUATE: undefined,        // landscape: inspection, building report
  OFF_MARKET_STEP_SECURE: undefined,          // landscape: contract signing, keys
  OFF_MARKET_DUE_DILIGENCE: undefined,        // wide background: property detail, moody
  PROPERTY_MATCHING_IMAGE: undefined,         // portrait: adviser writing a brief with clients

  // ---- Property Advisory (/advisory) ----
  PROPERTY_ADVISORY_HERO: undefined,          // wide, full-bleed hero: adviser and clients at a table
  PROPERTY_ADVISORY_MEETING: undefined,       // portrait: advisory meeting (also the homepage card)
  ADVISORY_SERVICE_STRATEGY: undefined,       // portrait: one image per service (files may be shared)
  ADVISORY_SERVICE_RESEARCH: undefined,
  ADVISORY_SERVICE_ASSESSMENT: undefined,
  ADVISORY_SERVICE_COMPARABLES: undefined,
  ADVISORY_SERVICE_NEGOTIATION: undefined,
  ADVISORY_SERVICE_AUCTION: undefined,
  ADVISORY_SERVICE_INVESTMENT: undefined,
  ADVISORY_SERVICE_LAND: undefined,
  PROPERTY_ASSESSMENT_IMAGE: undefined,       // portrait 3:4: walking through a property with a clipboard
  NEGOTIATION_TABLE: undefined,               // wide background: negotiation across a table, low light
  SETTLEMENT_KEYS_IMAGE: undefined,           // landscape: keys handed over at the front door
};
