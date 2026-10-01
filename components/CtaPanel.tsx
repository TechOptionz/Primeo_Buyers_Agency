'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { CtaForm } from './Forms';
import { CTA_DEFAULT, CTA_COPY } from '@/lib/cta';
import { SITE, telHref } from '@/config/site';

/**
 * The words and the form of the closing call to action. The copy varies per route (CTA_COPY in
 * lib/cta.ts), which needs the pathname, so this part alone is a client component; FinalCta renders
 * the section and its photo on the server and passes the rating badge in as `badge`.
 */
export default function CtaPanel({ badge }: { badge: ReactNode }) {
  const pathname = usePathname();
  const c = { ...CTA_DEFAULT, ...(CTA_COPY[pathname] ?? {}) };
  return (
    <>
      <div data-reveal="0" style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold">{c.eyebrow}</p></div>
      <h2 data-reveal="1" data-h2="1" className="h2" style={{ lineHeight: 1.06, letterSpacing: '-.015em' }}>
        <span data-line="1" className="lines"><span>{c.title}</span></span>
      </h2>
      <p data-reveal="2" style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(247,243,236,.75)', maxWidth: 460 }}>{c.text}</p>
      <div data-reveal="2">{badge}</div>
      <CtaForm label={c.button} />
      <p data-reveal="4" style={{ fontSize: 13, color: 'rgba(247,243,236,.55)' }}>Prefer to talk now? <a href={telHref(SITE.phone)} style={{ color: '#C6A15B', borderBottom: '1px solid rgba(198,161,91,.5)' }}>{SITE.phone}</a> · {SITE.hours.weekdays}</p>
    </>
  );
}
