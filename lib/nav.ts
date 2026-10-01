// Site navigation. Kept apart from lib/data.ts because the nav is a client component: importing the
// page copy from there would ship all of it to the browser.
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
