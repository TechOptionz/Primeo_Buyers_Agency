// The parts of the reviews module that client components need (the topic chips and the date
// formatter), without the reviews themselves. lib/reviews.ts re-exports everything here.
export type ReviewTag = 'first-home' | 'refinance' | 'investment' | 'construction' | 'business';
export type Review = { id: string; name: string; date: string; rating: number; tags: ReviewTag[]; quote?: string; text: string };

/** Topic chips on the reviews page, matched from each review's wording. */
export const TAGS: { key: ReviewTag; label: string }[] = [
  { key: 'first-home', label: 'First home' },
  { key: 'refinance', label: 'Refinance' },
  { key: 'investment', label: 'Investment' },
  { key: 'construction', label: 'Land & construction' },
  { key: 'business', label: 'Business & other loans' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "Apr 2026" from "2026-04-22". */
export function monthYear(date: string) {
  const [y, m] = date.split('-');
  return `${MONTHS[Number(m) - 1] ?? ''} ${y}`;
}
