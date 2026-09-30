import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FactBand from '@/components/FactBand';
import ReviewsGrid from '@/components/ReviewsGrid';
import RatingBadge from '@/components/RatingBadge';
import Stars from '@/components/Stars';
import GoogleMark from '@/components/GoogleMark';
import { ImageSlot } from '@/components/ImageSlot';
import { GOOGLE, REVIEWS, DISTRIBUTION, pick, monthYear } from '@/lib/reviews';
import { IMAGES } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Client reviews',
  description: `Rated ${GOOGLE.rating} on Google from ${GOOGLE.count} client reviews. Read a selection, in the words of the people Prim Ahuja and the team have helped.`,
};

const FACTS = [
  { v: GOOGLE.rating, l: 'Google rating' },
  { v: String(GOOGLE.count), l: 'Google reviews' },
  { v: '100+', l: 'Five-star reviews' },
  { v: 'Verified', l: 'Published on Google' },
];
// Two reviews shown in full beside the photo: real situations, in the client's own words.
const STORIES = ['ruchika-mittal', 'arunmozhi-govindan'];

const asAt = (d: string) => { const [y, m] = d.split('-'); return `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][Number(m) - 1]} ${y}`; };

export default function Reviews() {
  const stories = pick(STORIES);
  return (
    <>
      <PageHero
        eyebrow="Client reviews"
        title="Rated 5.0 on Google by more than a hundred clients."
        lead="A selection of the reviews clients have left on Google for Prim and the team, exactly as they wrote them. The full list is on Google."
        src={IMAGES.reviewsHero}
        focus="66% 50%"
        band={<FactBand facts={FACTS} />}
      />

      {/* 1 RATING SUMMARY: the average, the breakdown and the two Google links */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: 26 }}>
            <p data-reveal="0" className="eyebrow eyebrow-tan">Google rating</p>
            <div data-reveal="1" style={{ display: 'flex', alignItems: 'flex-end', gap: 26, flexWrap: 'wrap' }}>
              <span className="serif rating-big">{GOOGLE.rating}</span>
              <div style={{ display: 'grid', gap: 10, paddingBottom: 12 }}>
                <Stars n={5} size={26} label="5 out of 5 stars" />
                <span style={{ fontSize: 15, color: '#4A4C55' }}>Based on {GOOGLE.count} reviews on Google</span>
              </div>
            </div>
            <p data-reveal="2" style={{ fontSize: 17, lineHeight: 1.65, color: '#4A4C55', maxWidth: 500 }}>Reviews are written and published by clients on Google, not by us. We cannot edit or remove them, which is exactly why they are worth reading.</p>
            <div data-reveal="3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href={GOOGLE.url} target="_blank" rel="noopener noreferrer" className="btn btn-navy">Read on Google</a>
              <a href={GOOGLE.writeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">Write a review</a>
            </div>
          </div>
          <div data-inview="1" className="dist-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span className="eyebrow eyebrow-tan">Rating breakdown</span>
              <RatingBadge to="google" size="sm" />
            </div>
            <div className="dist">
              {DISTRIBUTION.map((d) => (
                <div key={d.stars} className="dist-row">
                  <span>{d.stars} ★</span>
                  <span className="dist-bar" aria-hidden="true"><span style={{ '--w': `${Math.max(1, Math.round((d.n / GOOGLE.count) * 100))}%` } as CSSProperties} /></span>
                  <span style={{ textAlign: 'right' }}>{d.n}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: '#8A7A57' }}>{GOOGLE.fiveStar} of {GOOGLE.count} clients gave five stars. Figures as at {asAt(GOOGLE.fetched)}; the live count is on Google.</p>
          </div>
        </div>
      </section>

      {/* 2 CLIENT STORIES: two reviews in full, beside the photo */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 72, alignItems: 'center' }}>
          <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}>
            <ImageSlot src={IMAGES.reviewsStory} alt="Adviser shaking hands with clients across a table" placeholder="Photo: adviser shaking hands with clients" sizes="(max-width: 1000px) 100vw, 40vw" />
          </div>
          <div style={{ display: 'grid', gap: 36 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Client stories</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Two reviews worth reading in full.</span></span></h2>
            </div>
            {stories.map((r, i) => (
              <blockquote key={r.id} data-reveal={i + 1} className="story">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Stars n={r.rating} size={14} label={`${r.rating} out of 5 stars`} /><span className="rev-date">{monthYear(r.date)}</span></div>
                <p className="serif story-text">{r.text}</p>
                <footer style={{ display: 'grid', gap: 3 }}><span className="rev-name">{r.name}</span><span className="rev-src"><GoogleMark size={12} /> Google review</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 3 SELECTED REVIEWS: topic chips, 12 at a time, newest first */}
      <section id="all" data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', scrollMarginTop: 72 }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">Selected reviews</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>In their own words, newest first.</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 400 }}>{REVIEWS.length} of the {GOOGLE.count} reviews on Google. Filter by what you are planning, or read them all on Google.</p>
          </div>
          <ReviewsGrid reviews={REVIEWS} />
        </div>
      </section>
    </>
  );
}
