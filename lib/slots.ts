/**
 * Image placeholders for the Buyer Agency page, the homepage service cards and the About page.
 * Each key is the identifier printed inside the placeholder on the page, so it is easy to find.
 *
 * To use a real photo: drop the file (JPG / WebP / AVIF) in public/images and set the
 * path here, e.g.  BUYERS_HERO: '/images/buyers_hero.webp'
 * The page picks it up automatically; nothing else needs to change.
 *
 * Suggested crops are noted per slot. Portrait = 4:5 or 3:4, landscape = 16:10, wide = 21:9.
 */
export const SLOTS: Record<string, string | undefined> = {
  // ---- Buyer Agency (/buyers) ----
  BUYERS_HERO: '/images/service_buyers.jpg', // wide
  // "What we do" chapters: one portrait (4:5) each, crossfading in the sticky frame beside the copy
  BUYERS_CHAPTER_AGENCY: '/images/buyers_representation.jpg',
  BUYERS_CHAPTER_INVESTING: '/images/invest_intro_portrait.jpg',
  BUYERS_CHAPTER_OFF_MARKET: '/images/off_market_gate.jpg',
  BUYERS_CHAPTER_ADVISORY: '/images/advisory_meeting.jpg',
  BUYERS_WHO_WE_ARE_BACKDROP: '/images/advisory_negotiation_table.jpg', // full-bleed, sits under a navy wash
  BUYERS_PROCESS_WIDE: '/images/advisory_settlement_keys.jpg', // 21:9
  BUYERS_QUOTE: '/images/testimonial_verandah.jpg', // 4:5

  // ---- Homepage service cards (app/page.tsx) ----
  PROPERTY_INVESTMENT_HERO: '/images/invest_hero.jpg',
  OFF_MARKET_PROPERTY_IMAGE: '/images/off_market_gate.jpg',
  PROPERTY_ADVISORY_MEETING: '/images/advisory_meeting.jpg',

  // ---- About (/about) ----
  // Prim Ahuja's portrait (3:4). To replace it, drop the new file in public/images and point this at it.
  PRIM_AHUJA_PORTRAIT: '/images/founder_portrait.jpg',
};
