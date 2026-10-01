import Link from 'next/link';
import ReviewCard from './ReviewCard';
import RatingBadge from './RatingBadge';
import { GOOGLE, pick } from '@/lib/reviews';

/**
 * A short band of three Google reviews with the rating summary, for inner pages (About, House & Land).
 * `ids` name the reviews to show (see lib/reviews.ts); the rest of the page's tone is left alone.
 */
export default function ReviewStrip({ ids, eyebrow = 'Google reviews', title, text, background = '#fff', border = true }: {
  ids: string[]; eyebrow?: string; title: string; text?: string; background?: string; border?: boolean;
}) {
  const items = pick(ids);
  return (
    <section data-sec="1" className="sec" style={{ background, borderTop: border ? '1px solid #E6E0D4' : undefined }}>
      <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
        <div data-reveal="0" className="head-row">
          <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
            <p className="eyebrow eyebrow-tan">{eyebrow}</p>
            <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{title}</span></span></h2>
            {text && <p className="lead" style={{ maxWidth: 520 }}>{text}</p>}
            <p className="rev-note">{GOOGLE.sourceNote}</p>
          </div>
          <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
            <RatingBadge to="google" size="md" label="full" />
            <Link href="/reviews" className="link-u">Read more reviews →</Link>
          </div>
        </div>
        <div data-seq="1" data-g3="1" data-scroll-row="1" tabIndex={0} role="group" aria-label="Google reviews" className="rev-grid">
          {items.map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>
      </div>
    </section>
  );
}
