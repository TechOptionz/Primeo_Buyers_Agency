'use client';
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import Link from 'next/link';
import Stars from './Stars';
import GoogleMark from './GoogleMark';
import type { Review } from '@/lib/review-meta';

/**
 * Homepage carousel of featured Google reviews (FEATURED in lib/reviews.ts, in that order), under the
 * rating summary, with a link to the reviews page. Advances every 8s until the reader takes over.
 * The page passes the reviews in (with `when`, the month already formatted) and the rating badge as
 * `badge`, so neither the review data nor the badge's code ships in this client component.
 */
export type Slide = Pick<Review, 'id' | 'name' | 'rating'> & { quote: string; when: string };

export default function Testimonials({ items, badge }: { items: Slide[]; badge: ReactNode }) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  // Autoplay stops for good once the reader picks a review, and holds while the pointer or keyboard
  // focus is inside the carousel. It never starts for visitors who ask for reduced motion.
  const paused = useRef(false);
  const held = useRef(false);
  const [manual, setManual] = useState(false);

  const go = (to: number, manual = false) => {
    if (manual) { paused.current = true; setManual(true); }
    setFade(true);
    setTimeout(() => { setI(((to % items.length) + items.length) % items.length); setFade(false); }, 400);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => { if (!document.hidden && !paused.current && !held.current) go(i + 1); }, 8000);
    return () => clearInterval(t);
  });

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, true); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, true); }
  };

  const cur = items[i];
  return (
    <div
      role="group" aria-roledescription="carousel" aria-label="Featured Google reviews"
      onMouseEnter={() => { held.current = true; }} onMouseLeave={() => { held.current = false; }}
      onFocus={() => { held.current = true; }} onBlur={() => { held.current = false; }}
      style={{ display: 'grid', gap: 36 }}
    >
      <div data-reveal="0" style={{ display: 'grid', gap: 18 }}>
        <p className="eyebrow eyebrow-gold">Google reviews</p>
        <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Trusted by clients across Queensland, in their own words.</span></span></h2>
        {badge}
      </div>
      <div role="group" aria-roledescription="slide" aria-label={`Review ${i + 1} of ${items.length}`} aria-live={manual ? 'polite' : 'off'} style={{ display: 'grid', gap: 24, transition: 'opacity .4s ease,transform .4s ease', opacity: fade ? 0 : 1, transform: fade ? 'translateY(12px)' : 'none' }}>
        <Stars n={cur.rating} size={16} label={cur.rating + ' out of 5 stars'} />
        <p data-quote="1" className="serif" style={{ fontSize: 30, lineHeight: 1.32, textWrap: 'pretty' }}>“{cur.quote}”</p>
        <div style={{ display: 'grid', gap: 3 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>{cur.name}</span>
          <span style={{ fontSize: 13, color: 'rgba(247,243,236,.6)', display: 'inline-flex', alignItems: 'center', gap: 6 }}><GoogleMark size={12} /> Google review · {cur.when}</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid rgba(247,243,236,.15)' }}>
        <div onKeyDown={onKey} style={{ display: 'flex', gap: 10 }}>
          {/* a 3px bar inside a 27px-tall button: the padding is the tap target */}
          {items.map((t, k) => (
            <button key={t.id} type="button" onClick={() => go(k, true)} aria-label={`Show review ${k + 1} of ${items.length}`} aria-current={k === i ? 'true' : undefined} style={{ boxSizing: 'content-box', width: 32, height: 3, border: 'none', borderRadius: 2, background: k === i ? '#C6A15B' : 'rgba(247,243,236,.3)', backgroundClip: 'content-box', padding: '12px 0', transition: 'background-color .4s ease' }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
          <Link href="/reviews" className="link-u light">More reviews →</Link>
          <div onKeyDown={onKey} style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="t-btn" onClick={() => go(i - 1, true)} aria-label="Previous review"><span aria-hidden="true">←</span></button>
            <button type="button" className="t-btn" onClick={() => go(i + 1, true)} aria-label="Next review"><span aria-hidden="true">→</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
