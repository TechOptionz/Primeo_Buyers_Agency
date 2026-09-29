import Stars from './Stars';
import GoogleMark from './GoogleMark';
import Avatar from './Avatar';
import { monthYear, type Review } from '@/lib/reviews';

/**
 * One Google review: stars and month, the review as written, then the reviewer's photo or monogram, name and
 * the Google mark. Long reviews can be clamped (`clamp`) with a Read more toggle supplied by the parent.
 */
export default function ReviewCard({ review: r, tone = 'light', clamp = false, expanded = false, onToggle }: {
  review: Review; tone?: 'light' | 'dark'; clamp?: boolean; expanded?: boolean; onToggle?: () => void;
}) {
  const long = r.text.length > 420;
  const clamped = clamp && long && !expanded;
  return (
    <article className="rev-card" data-tone={tone}>
      <div className="rev-head">
        <Stars n={r.rating} size={13} label={`${r.rating} out of 5 stars`} />
        <span className="rev-date">{monthYear(r.date)}</span>
      </div>
      <p className="rev-text" data-clamp={clamped ? '1' : undefined}>{r.text}</p>
      {clamp && long && onToggle && (
        <button type="button" className="rev-more" onClick={onToggle} aria-expanded={expanded}>{expanded ? 'Show less' : 'Read more'}</button>
      )}
      <div className="rev-foot">
        <Avatar review={r} tone={tone} />
        <span style={{ display: 'grid', gap: 3, minWidth: 0 }}>
          <span className="rev-name">{r.name}</span>
          <span className="rev-src"><GoogleMark size={12} /> Google review</span>
        </span>
      </div>
    </article>
  );
}
