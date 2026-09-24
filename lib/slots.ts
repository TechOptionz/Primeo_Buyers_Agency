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
  PROPERTY_INVESTMENT_HERO: '/images/invest_hero.jpg',
  INVESTMENT_INTRO_PORTRAIT: '/images/invest_intro_portrait.jpg',
  PROPERTY_RESEARCH_IMAGE: '/images/invest_research_desk.jpg',
  INVESTMENT_STEP_STRATEGY: '/images/invest_step_strategy.jpg',
  INVESTMENT_STEP_RESEARCH: '/images/invest_step_research.jpg',
  INVESTMENT_STEP_SOURCE: '/images/invest_step_source.jpg',
  INVESTMENT_STEP_ASSESS: '/images/invest_step_assess.jpg',
  INVESTMENT_STEP_NEGOTIATE: '/images/invest_step_negotiate.jpg',
  INVESTMENT_STEP_SECURE: '/images/invest_step_secure.jpg',
  ESTABLISHED_PROPERTY_IMAGE: '/images/prop_latrobe_tce.jpg',
  HOUSE_AND_LAND_IMAGE: '/images/land_card_parkline.jpg',
  BRISBANE_GROWTH_MAP: '/images/insight_skyline.jpg',
  BRISBANE_PROPERTY_IMAGE: '/images/prop_moray_st.jpg',

  // ---- Off-Market Properties (/off-market) ----
  OFF_MARKET_HERO: '/images/off_market_hero.jpg',
  OFF_MARKET_PROPERTY_IMAGE: '/images/off_market_gate.jpg',
  OFF_MARKET_STREETSCAPE: '/images/prop_oxlade_dr.jpg',
  OFF_MARKET_STEP_SEARCH: '/images/journey_02_search.jpg',
  OFF_MARKET_STEP_EVALUATE: '/images/journey_03_inspect.jpg',
  OFF_MARKET_STEP_SECURE: '/images/journey_05_secure.jpg',
  OFF_MARKET_DUE_DILIGENCE: '/images/off_market_due_diligence.jpg',
  PROPERTY_MATCHING_IMAGE: '/images/off_market_buyer_brief.jpg',

  // ---- Property Advisory (/advisory) ----
  PROPERTY_ADVISORY_HERO: '/images/advisory_hero.jpg',
  PROPERTY_ADVISORY_MEETING: '/images/advisory_meeting.jpg',
  ADVISORY_SERVICE_STRATEGY: '/images/buyers_intro.jpg',
  ADVISORY_SERVICE_RESEARCH: '/images/about_early_office.jpg',
  ADVISORY_SERVICE_ASSESSMENT: '/images/why_primeo_review.jpg',
  ADVISORY_SERVICE_COMPARABLES: '/images/insight_front_door.jpg',
  ADVISORY_SERVICE_NEGOTIATION: '/images/journey_04_negotiate.jpg',
  ADVISORY_SERVICE_AUCTION: '/images/buyers_card_leverage.jpg',
  ADVISORY_SERVICE_INVESTMENT: '/images/land_step_contract.jpg',
  ADVISORY_SERVICE_LAND: '/images/land_step_select.jpg',
  PROPERTY_ASSESSMENT_IMAGE: '/images/advisory_property_assessment.jpg',
  NEGOTIATION_TABLE: '/images/advisory_negotiation_table.jpg',
  SETTLEMENT_KEYS_IMAGE: '/images/advisory_settlement_keys.jpg',
};
