import type { CSSProperties } from 'react';
import Link from 'next/link';
import Stars from './Stars';
import GoogleMark from './GoogleMark';
import { GOOGLE } from '@/lib/reviews';

/**
 * "G ★★★★★ 5.0 · 107 Google reviews · Queensland Fundings": the rating summary used wherever the site
 * asks for trust (hero, stats, forms, footer). The rating belongs to Queensland Fundings, so the badge
 * always names it: `label="short"` as above where space is tight, `label="full"` ("... Google reviews
 * for Queensland Fundings, our sister mortgage business", which may wrap) beside the reviews themselves.
 * Links to the reviews page by default or straight to Google (`to="google"`); while the listing's URL
 * is empty in config/site.ts, `to="google"` links to the reviews page as well.
 * The link's name is its visible text (the stars carry "Rated 5.0 out of 5"), plus a hidden note of where it goes.
 * `tone` follows the background: light (cream/white) or dark (navy). Styles: .g-badge in globals.css.
 */
export default function RatingBadge({ tone = 'light', size = 'md', to = 'reviews', label = 'short', style }: {
  tone?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg'; to?: 'reviews' | 'google'; label?: 'short' | 'full'; style?: CSSProperties;
}) {
  const px = size === 'lg' ? 18 : size === 'sm' ? 13 : 15;
  const source = label === 'full' ? ` for ${GOOGLE.business}, our sister mortgage business` : ` · ${GOOGLE.business}`;
  const inner = (
    <>
      <GoogleMark size={px + 3} />
      <Stars n={5} size={px} label={`Rated ${GOOGLE.rating} out of 5:`} />
      <span className="g-txt"><b>{GOOGLE.rating}</b><span className="g-sub"> · {GOOGLE.count} Google reviews{source}</span></span>
    </>
  );
  if (to === 'google' && GOOGLE.url) {
    return <a href={GOOGLE.url} target="_blank" rel="noopener noreferrer" className="g-badge" data-tone={tone} data-size={size} data-label={label} style={style}>{inner}<span className="sr-only">. Opens Google in a new tab</span></a>;
  }
  return <Link href="/reviews" className="g-badge" data-tone={tone} data-size={size} data-label={label} style={style}>{inner}<span className="sr-only">. Read the reviews</span></Link>;
}
