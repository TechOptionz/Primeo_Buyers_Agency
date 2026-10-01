import type { CSSProperties } from 'react';
import Link from 'next/link';
import Stars from './Stars';
import GoogleMark from './GoogleMark';
import { GOOGLE } from '@/lib/reviews';

/**
 * "G ★★★★★ 5.0 · 107 Google reviews": the rating summary used wherever the site asks for trust
 * (hero, stats, forms, footer). Links to the reviews page by default or straight to Google (`to="google"`);
 * until the listing's URL is set in config/site.ts, `to="google"` links to the reviews page as well.
 * `tone` follows the background: light (cream/white) or dark (navy). Styles: .g-badge in globals.css.
 */
export default function RatingBadge({ tone = 'light', size = 'md', to = 'reviews', style }: {
  tone?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg'; to?: 'reviews' | 'google'; style?: CSSProperties;
}) {
  const px = size === 'lg' ? 18 : size === 'sm' ? 13 : 15;
  const inner = (
    <>
      <GoogleMark size={px + 3} />
      <Stars n={5} size={px} />
      <span className="g-txt"><b>{GOOGLE.rating}</b><span className="g-sub"> · {GOOGLE.count} Google reviews</span></span>
    </>
  );
  // starts with the visible text, so voice control can target the badge by what it shows
  const label = `${GOOGLE.rating} · ${GOOGLE.count} Google reviews, rated ${GOOGLE.rating} out of 5`;
  if (to === 'google' && GOOGLE.url) {
    return <a href={GOOGLE.url} target="_blank" rel="noopener noreferrer" className="g-badge" data-tone={tone} data-size={size} aria-label={`${label}. Opens Google Maps in a new tab`} style={style}>{inner}</a>;
  }
  return <Link href="/reviews" className="g-badge" data-tone={tone} data-size={size} aria-label={`${label}. Read the reviews`} style={style}>{inner}</Link>;
}
