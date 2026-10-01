'use client';
import { useMemo, useState } from 'react';
import ReviewCard from './ReviewCard';
import { TAGS, type Review, type ReviewTag } from '@/lib/review-meta';

const PAGE = 12;

/**
 * The selected Google reviews, newest first, with topic chips to filter, a Read more toggle per long
 * review and a Show more button so the page opens with 12 cards rather than the whole selection.
 */
export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  const [tag, setTag] = useState<'all' | ReviewTag>('all');
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  const counts = useMemo(() => Object.fromEntries(TAGS.map((t) => [t.key, reviews.filter((r) => r.tags.includes(t.key)).length])) as Record<ReviewTag, number>, [reviews]);
  const list = useMemo(() => (tag === 'all' ? reviews : reviews.filter((r) => r.tags.includes(tag))), [reviews, tag]);
  const visible = list.slice(0, shown);

  const pick = (k: 'all' | ReviewTag) => { setTag(k); setShown(PAGE); };
  const toggle = (id: string) => setOpen((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <div style={{ display: 'grid', gap: 32 }}>
      <div className="chips" role="group" aria-label="Filter reviews by topic">
        <button type="button" className={`chip${tag === 'all' ? ' on' : ''}`} aria-pressed={tag === 'all'} onClick={() => pick('all')}>All<span>{reviews.length}</span></button>
        {TAGS.filter((t) => counts[t.key] > 0).map((t) => (
          <button key={t.key} type="button" className={`chip${tag === t.key ? ' on' : ''}`} aria-pressed={tag === t.key} onClick={() => pick(t.key)}>{t.label}<span>{counts[t.key]}</span></button>
        ))}
      </div>
      <div className="rev-grid" aria-live="polite">
        {visible.map((r) => <ReviewCard key={r.id} review={r} clamp expanded={open.has(r.id)} onToggle={() => toggle(r.id)} />)}
      </div>
      {shown < list.length ? (
        <div style={{ display: 'grid', justifyItems: 'center', gap: 14 }}>
          <button type="button" className="btn btn-outline-dark" onClick={() => setShown((n) => n + PAGE)}>Show more reviews</button>
          <span style={{ fontSize: 13, color: '#796A47' }}>Showing {visible.length} of {list.length}</span>
        </div>
      ) : (
        <span style={{ fontSize: 13, color: '#796A47', textAlign: 'center' }}>Showing all {list.length} {tag === 'all' ? 'selected reviews' : 'reviews on this topic'}</span>
      )}
    </div>
  );
}
