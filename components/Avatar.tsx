import { ImageSlot } from './ImageSlot';
import { initials, type Review } from '@/lib/reviews';

/**
 * Reviewer avatar: the Google profile photo where the reviewer has one (public/images/reviewers, set as
 * `avatar` in lib/reviews.ts), otherwise a monogram in the site's colours, like Google's own letter avatar.
 */
export default function Avatar({ review: r, tone = 'light', size = 44 }: { review: Review; tone?: 'light' | 'dark'; size?: number }) {
  if (r.avatar) {
    return (
      <span className="mono media" data-tone={tone} style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }} aria-hidden="true">
        <ImageSlot src={r.avatar} alt="" sizes={`${size}px`} />
      </span>
    );
  }
  return <span className="mono" data-tone={tone} style={{ width: size, height: size }} aria-hidden="true">{initials(r.name)}</span>;
}
