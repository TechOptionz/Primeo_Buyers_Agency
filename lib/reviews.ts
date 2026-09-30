/**
 * A selection of the Google reviews for Prim Ahuja's business (Queensland Fundings on Google Maps). The
 * listing had 107 reviews at a 5.0 average when it was captured on 2026-09-29 (GOOGLE below); REVIEWS is
 * a hand-picked 24 of them, newest first: clearly written, signed with a real name, and specific about
 * what the client was helped with. Each review's text is exactly as written on Google, never edited.
 * Reviews that call Prim a broker or mortgage broker are left out (the client does not want that title
 * on the site); because the wording is never edited, such a review is dropped rather than reworded.
 * Reviewers' profile photos are not shown anywhere on the site: a review is signed with the name only.
 *
 * FEATURED (below) is the homepage carousel, in order. `quote` is a verbatim excerpt for the places that
 * fit one or two sentences; the reviews page always shows the full text.
 *
 * To add a review: copy its wording from Google unchanged, give it an id, and add it to REVIEWS in date
 * order. Keep the ids of any review a page names (see pick() calls and lib/data.ts). GOOGLE and
 * DISTRIBUTION describe the whole listing, so update them from Google, not from this list.
 */
export type ReviewTag = 'first-home' | 'refinance' | 'investment' | 'construction' | 'business';
export type Review = { id: string; name: string; date: string; rating: number; tags: ReviewTag[]; quote?: string; text: string };

export const GOOGLE = {
  business: 'Queensland Fundings',
  rating: '5.0',
  count: 107,
  fiveStar: 106,
  fetched: '2026-09-29',
  placeId: 'ChIJVVo4ONwcp2MRaQR2tObo6s0',
  /** The listing on Google Maps, opened on its Reviews tab (the `!9m1!1b1` part of the data string). */
  url: 'https://www.google.com/maps/place/Queensland+Fundings/@-32.205415,136.1073692,4z/data=!4m18!1m9!3m8!1s0x63a71cdc38385a55:0xcdeae8e6b4760469!2sQueensland+Fundings!8m2!3d-32.205415!4d136.1073692!9m1!1b1!16s%2Fg%2F11sqhg342l!3m7!1s0x63a71cdc38385a55:0xcdeae8e6b4760469!8m2!3d-32.205415!4d136.1073692!9m1!1b1!16s%2Fg%2F11sqhg342l',
  /** Opens Google's write-a-review form for the listing. */
  writeUrl: 'https://search.google.com/local/writereview?placeid=ChIJVVo4ONwcp2MRaQR2tObo6s0',
};

/** Topic chips on the reviews page, matched from each review's wording. */
export const TAGS: { key: ReviewTag; label: string }[] = [
  { key: 'first-home', label: 'First home' },
  { key: 'refinance', label: 'Refinance' },
  { key: 'investment', label: 'Investment' },
  { key: 'construction', label: 'Land & construction' },
  { key: 'business', label: 'Business & other loans' },
];

export const REVIEWS: Review[] = [
  { id: 'anumeha-jain', name: 'Anumeha Jain', date: '2026-04-22', rating: 5, tags: [], quote: 'He made the whole mortgage process feel simple and stress‑free, always taking the time to explain things clearly and check in along the way.', text: 'Prim is fantastic to work with, and I’d highly recommend him. He made the whole mortgage process feel simple and stress‑free, always taking the time to explain things clearly and check in along the way. He and his team are super responsive, genuinely helpful, and really professional throughout the entire process.' },
  { id: 'pawan-pandher', name: 'Pawan Pandher', date: '2026-03-06', rating: 5, tags: [], text: 'I recently made a purchase with help of QLD Funding Group and had an amazing experience. The service was excellent, and the team was very helpful and professional throughout the process. I would highly recommend them to anyone looking\nfor great service and support.' },
  { id: 'pramuk-shyam-pathy', name: 'Pramuk Shyam Pathy', date: '2026-02-16', rating: 5, tags: [], quote: 'They took the time to understand our long term goals and advised us accordingly.', text: 'Prim and team have been wonderful. They took the time to understand our long term goals and advised us accordingly. Helped us get a great rate and we couldnt be happier. When it came time to make the switch, the team were on top of things and communicated every change to help us stay on top of things. Will definitely be reusing their services when required.' },
  { id: 'dinesh-rabari', name: 'Dinesh Rabari', date: '2025-12-29', rating: 5, tags: ['construction'], text: 'We recently worked with QLD Funding for our home and construction loan, and the experience was absolutely outstanding!\n\nA big thank you to Prime, Varshini, and Valentina — they were professional, knowledgeable, and incredibly supportive throughout the entire process. From initial discussions to final approval, they guided us step by step, answered every question with patience, and made what could have been a stressful experience feel smooth and easy.\n\nWe’re very grateful for their efforts and highly recommend QLD Funding to anyone looking for trustworthy and professional finance support.' },
  { id: 'narendra-rabari', name: 'Narendra Rabari', date: '2025-12-16', rating: 5, tags: [], text: 'Prim and his team were very supportive throughout the finance approval process. Apart from that, Prim’s excellent knowledge helped me clearly understand the settlement process. He always responded on time and was available whenever I had questions.\n\nOn many occasions, they went the extra mile to complete work within tight deadlines. His expertise is truly commendable. Varshini consistently provided timely updates, which played a big role in keeping everything smooth and stress-free.\n\nA big thank you to Prim, Varshini, and the entire team for their professionalism, support, and dedication. Highly recommended!' },
  { id: 'david-smith', name: 'David Smith', date: '2025-11-12', rating: 5, tags: ['refinance', 'business'], text: 'I recently refinanced my home and arranged a new equity loan through Queensland Funding, and the experience was absolutely seamless from start to finish. The team was professional, efficient, and genuinely cared about finding the best outcome for me.\n\nThey explained everything clearly, kept me updated throughout the process, and worked hard to ensure settlement happened smoothly and on time. It’s rare to find a finance team that combines such great communication with real expertise.\n\nHighly recommend Queensland Funding for anyone looking for reliable and stress-free finance assistance' },
  { id: 'vk-sood', name: 'VK Sood', date: '2025-10-03', rating: 5, tags: [], text: 'Prim and the team at Queensland Fundings were professional, reliable, and supportive throughout the process. Their expertise made everything smooth and stress-free—I’d highly recommend them for trustworthy and efficient service. Thanks and keep up the good work.' },
  { id: 'amrit-sandhu', name: 'Amrit Sandhu', date: '2025-09-20', rating: 5, tags: [], quote: 'Their professionalism, transparency, and deep understanding of the market made the entire process smooth and stress-free.', text: 'We had an outstanding experience with Prim and team. Their professionalism, transparency, and deep understanding of the market made the entire process smooth and stress-free. They were always available to answer questions, explain details clearly, and advocate for my best interests. It’s rare to find such a trustworthy and dedicated team — they genuinely go the extra mile. Highly recommend them to anyone looking for a seamless and positive brokerage experience!' },
  { id: 'milan-verma', name: 'Milan Verma', date: '2025-09-11', rating: 5, tags: [], text: 'I had an excellent experience working with Prim & team. From the very beginning, they were professional, reliable, and extremely knowledgeable. They took the time to understand my needs, explained everything clearly, and guided me through the process with patience. Communication was always prompt, and I felt well-supported at every stage. Their expertise and dedication made what could have been a stressful experience very smooth and stress-free. I would highly recommend Queensland Fundings to anyone looking for trustworthy and efficient service' },
  { id: 'bhupinder-bawa', name: 'Bhupinder Bawa', date: '2025-09-08', rating: 5, tags: ['first-home'], text: 'Prim and his team made my first home purchase a smooth and stress free experience. They were patient, knowledgeable, and always kept my best interests in mind. Their professionalism and clear communication gave me complete confidence throughout the process. I am truly grateful for their support and highly recommend them to anyone looking for a reliable and trustworthy team. Thank you again!' },
  { id: 'neharika-basnet', name: 'Neharika Basnet', date: '2025-08-29', rating: 5, tags: ['first-home', 'construction'], quote: 'Their professionalism, responsiveness, and attention to detail made what could have been a stressful experience feel smooth and even enjoyable.', text: 'Prim and his team has guide us through the process of buying our first land & home. From start to finish, they were incredibly knowledgeable, patient, and supportive. They took the time to explain everything clearly, answered all our questions, and always had our best interests at heart.\nTheir professionalism, responsiveness, and attention to detail made what could have been a stressful experience feel smooth and even enjoyable. Thanks to\nPrim and his team , we couldn’t be more grateful. Highly recommend to anyone looking for a dedicated and trustworthy team to help them!' },
  { id: 'ruchika-mittal', name: 'Ruchika Mittal', date: '2025-05-17', rating: 5, tags: ['refinance', 'investment', 'business'], quote: 'We’ve already referred many of our friends to Prim, and it’s been wonderful to hear that their experiences have been just as positive.', text: 'We’ve had the pleasure of working with Prim Ahuja from Queensland Fundings for the past 3 years, and the experience has been nothing short of exceptional. From helping us buy our dream home and investment properties to securing a car loan and handling timely reviews and refinancing — Prim has been with us every step of the way.\n\nHe and his team are always professional, approachable, and incredibly efficient in their communication. No matter how complex the situation, they’ve made the process smooth and stress-free.\n\nWe’ve already referred many of our friends to Prim, and it’s been wonderful to hear that their experiences have been just as positive. We truly appreciate the support and guidance, and wouldn’t hesitate to recommend Queensland Fundings to anyone looking for honest, reliable, and expert mortgage advice.' },
  { id: 'mike-elms', name: 'Mike Elms', date: '2024-12-09', rating: 5, tags: [], text: 'Prim has been such a help to us. We\'ve appreciated all his efforts and guidance during our loan process. We can\'t recommend him highly enough.' },
  { id: 'rohit-kamboj', name: 'Rohit Kamboj', date: '2024-11-26', rating: 5, tags: [], text: 'Prim has been amazing to work with—this is the second home they’ve helped us buy, and the process was smooth and stress-free. Their expertise, dedication, and attention to detail are unmatched. Highly recommend!' },
  { id: 'jessica-monaghan', name: 'Jessica Monaghan', date: '2024-11-26', rating: 5, tags: ['first-home'], text: 'Prim was immensely knowledgeable and very helpful in answering all the questions we had and helping my brother find the best way into his first home. Thank you.' },
  { id: 'ishima-arora', name: 'Ishima Arora', date: '2024-09-10', rating: 5, tags: [], text: 'A big thank you to Prim and his team. Getting into my new home was a seamless journey and Prim made it really easy with complete transparency. I highly recommend Queensland fundings for all the financial services.' },
  { id: 'rohtash-salyan', name: 'Rohtash Salyan', date: '2024-03-13', rating: 5, tags: [], text: 'Thank you for the great services. Always available to have extensive discussions and explain everything in details. Highly recommended and would love to work with him again in future.' },
  { id: 'karan-bhatia', name: 'Karan Bhatia', date: '2023-12-07', rating: 5, tags: ['first-home'], quote: 'I never felt overwhelmed through the journey and we had all the relevant approvals before the due dates.', text: 'Prim assisted me with the purchase of my first property. I had no idea regarding the process of home buying, but Prim guided me the whole way though and made the process seamless. I never felt overwhelmed through the journey and we had all the relevant approvals before the due dates. I have already recommended Prim to all my associates looking into purchasing a property and will continue to do so.' },
  { id: 'manish-mittal', name: 'Manish Mittal', date: '2023-06-27', rating: 5, tags: ['investment'], text: 'Thank you Prim and team for helping us over the years in providing best and trustworthy advice thus enabling us to make better decisions. We loved your professionalism and honesty even if it was not something we didn’t want to hear as you always had our best interest in mind.\nI would highly recommend your services to new and experienced investors.' },
  { id: 'prashant-mistry', name: 'Prashant Mistry', date: '2022-12-27', rating: 5, tags: ['refinance'], text: 'Prim and the Queensland Fundings Team was fantastic, they made the whole process of refinancing feel easy and effortless. They provided us with multiple options and gave us advice based on financial goals. Would highly recommend and will continue to use Queensland Fundings in the future.' },
  { id: 'manbeena-sethi', name: 'Manbeena Sethi', date: '2022-05-12', rating: 5, tags: [], text: 'Prim Ahuja of Queensland fundings made sure that I have a smooth journey of getting the loan for my second property within the span of 9 months of the first purchase.\nI honestly had my doubts but he was confident to provide me with the best possible solution for my requirements.\nI highly recommend him for various reasons - promptness , solution provider , readiness and exceptional customer service.\nLooking forward to continued long journey of this business relationship.' },
  { id: 'arunmozhi-govindan', name: 'Arunmozhi Govindan', date: '2022-05-07', rating: 5, tags: ['refinance'], text: 'Prim helped us immensely to get my home loan refinanced. We had a bit of a complex situation with several obstacles. At one stage I even lost my hope as I felt it was impossible to get it done. But Prim helped me organize things, sort every obstacle on the way, gave us hope and made things easy for us. I am really thankful to Prim for helping us with our loan.' },
  { id: 'valeska-bezuidenhout', name: 'Valeska Bezuidenhout', date: '2022-04-25', rating: 5, tags: [], quote: 'We cannot recommend Prim enough, this is the second time that Prim has assisted us to buy our dream property.', text: 'We cannot recommend Prim enough, this is the second time that Prim has assisted us to buy our dream property. He is professional, goes out of his way to get things done on time, thorough and he has lots of experience. By far the BEST mortgage consultant that we have dealt with.' },
  { id: 'devika-nevoori-reddy', name: 'Devika Nevoori Reddy', date: '2022-03-31', rating: 5, tags: [], text: 'Prompt response, nothing in the grey and value-added service. Highly recommended.' },
];

export const byId = (id: string) => REVIEWS.find((r) => r.id === id);
/** Reviews by id, in the order given; unknown ids are skipped. */
export const pick = (ids: string[]) => ids.map(byId).filter((r): r is Review => !!r);

export const FEATURED: Review[] = pick(['anumeha-jain', 'amrit-sandhu', 'ruchika-mittal', 'pramuk-shyam-pathy', 'valeska-bezuidenhout', 'karan-bhatia']);

/** Count of reviews at each star rating across the whole Google listing (all 107, not this selection), five first. */
export const DISTRIBUTION = [{ stars: 5, n: 106 }, { stars: 4, n: 1 }, { stars: 3, n: 0 }, { stars: 2, n: 0 }, { stars: 1, n: 0 }];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "Apr 2026" from "2026-04-22". */
export function monthYear(date: string) {
  const [y, m] = date.split('-');
  return `${MONTHS[Number(m) - 1] ?? ''} ${y}`;
}
