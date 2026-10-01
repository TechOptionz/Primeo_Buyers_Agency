import { SITE } from '@/config/site';

// Copy for the closing call to action (app/template.tsx appends it to every page). Kept apart from
// lib/data.ts because the part that picks the copy by route is a client component (CtaPanel).
export const CTA_DEFAULT = {
  eyebrow: 'Start a conversation',
  title: 'Ready to make your next property move?',
  text: 'Leave your details and a PRIMEO agent will call you within one business day to set up a free 30-minute strategy session.',
  button: 'Book a strategy call',
};
export const CTA_COPY: Record<string, Partial<typeof CTA_DEFAULT>> = {
  '/buyers': { title: 'Ready to have someone in your corner?', text: 'Leave your details and a PRIMEO buyer’s agent will call you within one business day to set up a free 30-minute strategy session.', button: 'Book a strategy call' },
  '/about': { title: 'Talk to Prim about your next move.', text: 'Leave your details and Prim will be in touch to talk through your situation and what a lender will want to see.', button: 'Book a conversation' },
  '/reviews': { title: `Join more than ${SITE.google.fiveStarRounded} five-star clients.`, text: 'Leave your details and we will call you within one business day to set up a free 30-minute strategy session.', button: 'Book a strategy call' },
};
