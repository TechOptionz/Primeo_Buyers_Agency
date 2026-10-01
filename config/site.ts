/**
 * Every business detail on the site, in one place: contact details, the address, the licence, the
 * Google listing, headline figures, social profiles and section switches. Pages and components read
 * from here, so a value changed here changes everywhere it is shown (pages, metadata, structured data).
 *
 * Anything marked TODO has not been confirmed by the business. An empty string means "not known yet":
 * the site hides whatever depends on it (a link, a button, a line of the address) rather than showing
 * a placeholder. Search for "TODO:" in this file for the full list.
 *
 * Deliberately free of imports: client components (Nav, Forms, FinalCta) read it too.
 */
export const SITE = {
  name: 'PRIMEO Property Group',
  shortName: 'PRIMEO',
  url: 'https://www.primeo.com.au',
  // TODO: confirm the registered company name; it prints in the footer and the legal pages.
  legalName: 'Primeo Property Group Pty Ltd',
  // TODO: ABN. Printed on the legal pages once set.
  abn: '',
  // TODO: Queensland real estate licence number. Printed in the footer and on the legal pages once set.
  licenceNumber: '',
  // The footer and legal pages describe the business as a licensed Queensland real estate agency.
  // TODO: confirm that wording is accurate before the licence number is added.
  licenceLabel: 'Licensed Real Estate Agency QLD',

  phone: '0439 860 639',
  email: 'info@primeo.com.au',

  address: {
    // TODO: street address (was the placeholder "Level 2, 12 Example Street"). While empty, the
    // site shows the suburb line only and leaves the address out of the structured data.
    street: '',
    // TODO: confirm suburb, state and postcode.
    locality: 'Brisbane',
    region: 'QLD',
    postcode: '4000',
    country: 'AU',
    // Heading of the "Office" row on the contact page. TODO: confirm.
    label: 'Brisbane CBD',
    // TODO: Google Maps link to the office. While empty, the "Get directions" button is hidden.
    mapsUrl: '',
  },

  // TODO: confirm opening hours.
  hours: { full: 'Mon–Fri 8am–6pm · Sat 9am–2pm', weekdays: 'Mon–Fri 8am–6pm' },

  // Where PRIMEO works: the contact page's "Areas" row and areaServed in the structured data.
  // TODO: confirm.
  areas: { headline: 'Brisbane & South East QLD', primary: 'Brisbane', others: ['Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Moreton Bay'] },

  /**
   * The Google Business listing behind the rating badge and the reviews page.
   *
   * The listing is Queensland Fundings, the mortgage business Prim Ahuja also runs; PRIMEO has no
   * Google listing of its own yet. Wherever the rating or the reviews are shown, the site names
   * Queensland Fundings as their source (`listingName`, `sourceNote`), and they are kept out of
   * PRIMEO's structured data (lib/seo.ts): a rating has to belong to the business it describes.
   * While `url` is empty, every "on Google" link falls back to the site's own reviews page and the
   * "Read Queensland Fundings reviews on Google" button is hidden.
   */
  google: {
    // The business the listing, the rating and the reviews belong to.
    listingName: 'Queensland Fundings',
    // Printed with the reviews on the homepage, the review strips and the reviews page.
    sourceNote: 'PRIMEO is founded by Prim Ahuja, who also runs Queensland Fundings. These reviews are from Queensland Fundings clients.',
    // The Queensland Fundings listing on Google Maps.
    url: 'https://maps.app.goo.gl/m97WQLdhyjrNPZvd6',
    // TODO: PRIMEO's own "write a review" link, once it has a listing:
    // https://search.google.com/local/writereview?placeid=<place id>. While empty, "Write a review" is hidden.
    writeReviewUrl: '',
    // Captured from the Queensland Fundings listing on 2026-09-29.
    rating: '5.0',
    reviewCount: 107,
    fiveStarCount: 106,
    // "More than 100 five-star reviews": the round number used in headlines and stat cells.
    fiveStarRounded: 100,
    asAt: '2026-09-29',
    // Number of reviews at each star rating across the whole listing, five first.
    distribution: [{ stars: 5, n: 106 }, { stars: 4, n: 1 }, { stars: 3, n: 0 }, { stars: 2, n: 0 }, { stars: 1, n: 0 }],
  },

  /**
   * Headline figures. Each is printed in several places (homepage hero band, track-record section,
   * the Buyer Agency page, metadata).
   * TODO: verify every figure here against the business's own records.
   */
  stats: {
    foundedYear: 2020,
    yearsInMarket: 6,
    // Total value of property secured: `short` for figures ("$200M+"), `long` for sentences.
    securedValue: { amount: 200, short: '$200M', long: '$200 million' },
    purchases: 350,
    offMarketShare: '1 in 3',
    averageSaving: '$60k',
    suburbsServed: 60,
  },

  // TODO: the remaining profile URLs. An icon is shown in the footer only for a profile that has one.
  social: { instagram: 'https://www.instagram.com/primeobuyersagency/', linkedin: '', facebook: 'https://www.facebook.com/primeopropertygroup', youtube: '' },

  links: {
    // TODO: careers page or job board URL. While empty, "Careers" is left out of the footer.
    careers: '',
    // TODO: index page of the market insights articles. While empty, "Market insights" is left out
    // of the footer and the homepage section has no "All insights" link.
    insights: '',
  },

  features: {
    // Homepage "Market insights" section. Off until real article pages exist: the three cards in
    // ARTICLES (lib/data.ts) are sample headlines that link to sections of the Buyer Agency page.
    marketInsights: false,
    // Homepage hero film on phones. On: phones play the portrait cut, a 2.2 MB download that starts
    // after the page has loaded. Off keeps the still poster. Tablets and desktops play the film either way.
    heroVideoOnMobile: true,
  },
};

/** "0439 860 639" -> "tel:0439860639". */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** The address as display lines; the street line is dropped while it is unknown. */
export function addressLines() {
  const a = SITE.address;
  return [a.street, `${a.locality} ${a.region} ${a.postcode}`].filter(Boolean);
}
