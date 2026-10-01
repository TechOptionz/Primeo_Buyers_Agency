import Link from 'next/link';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FactBand from '@/components/FactBand';
import ReviewStrip from '@/components/ReviewStrip';
import { Slot } from '@/components/Slot';
import { ABOUT as P, IMAGES } from '@/lib/data';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({ title: `About ${P.name}`, description: P.seo, path: '/about' });

// Value-card glyphs in the site's line-icon style (same stroke as the nav and footer icons), keyed by ABOUT.helps.items[].icon.
const ICONS: Record<string, React.ReactNode> = {
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  home: <><path d="M4 11 12 4l8 7v9H4z" /><path d="M10 20v-6h4v6" /></>,
};

export default function About() {
  return (
    <>
      <PageHero eyebrow={`Meet ${P.name}`} title={P.hero} lead={P.lead} src={IMAGES.aboutHero} band={<FactBand facts={P.facts} />} />

      {/* 1 INTRO: framed portrait with a name plate beside who Prim is, with the at-a-glance rows */}
      <section data-sec="1" className="sec" style={{ background: '#fff' }}>
        <div data-pad="1" data-g2="1" className="container founder" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 88, alignItems: 'center' }}>
          <figure className="founder-frame">
            <div className="founder-card">
              <div data-mask="1" className="media founder-photo" style={{ aspectRatio: '3/4' }}>
                <Slot id="PRIM_AHUJA_PORTRAIT" alt={`${P.name}, ${P.role}`} sizes="(max-width: 640px) 100vw, 420px" />
              </div>
              <figcaption className="founder-plate">
                <span className="serif founder-name">{P.name}</span>
                <span className="eyebrow eyebrow-gold" style={{ fontSize: 11 }}>{P.closing.signature}</span>
              </figcaption>
            </div>
          </figure>
          <div style={{ display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{P.intro.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.intro.title}</span></span></h2>
            </div>
            <div data-reveal="1" style={{ display: 'grid', gap: 18, fontSize: 17, lineHeight: 1.65, color: '#4A4C55' }}>
              <p>{P.intro.p1}</p>
              <p>{P.intro.p2}</p>
            </div>
            <div style={{ display: 'grid' }}>
              {P.intro.glance.map((g, i) => (
                <div key={g.label} data-reveal={i} className="brief-row">
                  <span className="eyebrow eyebrow-tan">{g.label}</span>
                  <span style={{ display: 'grid', gap: 3 }}>
                    <span className="serif" style={{ fontSize: 23, lineHeight: 1.25 }}>{g.value}</span>
                    {g.sub && <span style={{ fontSize: 13, lineHeight: 1.5, color: '#4A4C55' }}>{g.sub}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2 HIS BACKGROUND: four disciplines along one gold line drawn by scroll (the same track as the buyer agency process) */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC', borderTop: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 64 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">{P.background.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.background.title}</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 400 }}>{P.background.text}</p>
          </div>
          <div data-track="1" className="htl htl-4">
            <span className="htl-line" aria-hidden="true" />
            {P.background.disciplines.map((d, i) => (
              <div key={d.kind} data-reveal={i} className="htl-step">
                <span data-node="1" className="htl-node" aria-hidden="true" />
                <span className="eyebrow eyebrow-gold">{d.kind}</span>
                <h3 className="serif" style={{ fontSize: 28, lineHeight: 1.1 }}>{d.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 HOW PRIM BRINGS IT ALL TOGETHER: navy statement panel beside four numbered strengths, then the numbers */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 64 }}>
          <div data-g2="1" className="tog" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 64 }}>
            <div data-reveal="0" className="tog-panel">
              <svg className="tog-rings" viewBox="0 0 240 240" fill="none" aria-hidden="true"><circle cx="240" cy="240" r="80" /><circle cx="240" cy="240" r="150" /><circle cx="240" cy="240" r="220" /></svg>
              <div style={{ display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gap: 14 }}>
                  <p className="eyebrow eyebrow-gold">{P.together.eyebrow}</p>
                  <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.together.title}</span></span></h2>
                </div>
                <span className="rule" />
                <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(247,243,236,.74)', maxWidth: 460 }}>{P.together.text}</p>
              </div>
              <Link href="/contact" className="btn btn-gold btn-fit">{P.closing.button}</Link>
            </div>
            <div className="tog-list">
              {P.together.pillars.map((t) => (
                <div key={t.n} data-inview="1" className="tog-item">
                  <span className="serif tog-n" aria-hidden="true">{t.n}</span>
                  <div style={{ display: 'grid', gap: 10 }}><h3 className="serif tog-t">{t.title}</h3><p style={{ fontSize: 16, lineHeight: 1.65, color: '#4A4C55', maxWidth: 560 }}>{t.text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div data-seq="1" data-g3="1" className="cells" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {P.together.stats.map((s) => (
              <div key={s.label} className="cell">
                {/* the suffix sits outside the count-up so it can take the gold */}
                <span className="serif stat-fig"><span data-count={s.v} data-prefix={s.pre}>0</span>{s.suf && <em>{s.suf}</em>}</span>
                <div style={{ display: 'grid', gap: 4 }}><span style={{ fontSize: 15, fontWeight: 600, color: '#0B1D3A' }}>{s.label}</span><span style={{ fontSize: 13, lineHeight: 1.5, color: '#4A4C55' }}>{s.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 WORKING WITH PRIM: what he does for clients and how he works, three icon cards linking to the service pages */}
      <section data-sec="1" className="sec" style={{ background: '#0B1D3A', color: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-gold">{P.helps.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.helps.title}</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 400, color: 'rgba(247,243,236,.72)' }}>{P.helps.text}</p>
          </div>
          <div data-seq="1" data-g3="1" data-scroll-row="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {P.helps.items.map((h, i) => (
              <div key={h.title} data-reveal={i} className="value-card" style={{ gridTemplateRows: 'auto 1fr auto' }}>
                <span className="num-ring" style={{ borderColor: 'rgba(247,243,236,.3)' }} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[h.icon]}</svg>
                </span>
                <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
                  <span className="eyebrow eyebrow-gold" style={{ fontSize: 11, letterSpacing: '.16em' }}>{h.kind}</span>
                  <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.15 }}>{h.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(247,243,236,.72)' }}>{h.text}</p>
                </div>
                <Link href={h.href} className="eyebrow eyebrow-gold" style={{ fontSize: 11, letterSpacing: '.16em', paddingTop: 16, borderTop: '1px solid rgba(247,243,236,.15)' }}>{h.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 GOOGLE REVIEWS: three of the selection, with the rating summary and a link to the reviews page */}
      <ReviewStrip ids={['milan-verma', 'pramuk-shyam-pathy', 'manbeena-sethi']} title="What clients say about working with Prim." text="Written on Google by clients Prim and the team have helped. There are more on the reviews page." background="#F7F3EC" border={false} />

      {/* 6 A NOTE FROM PRIM: centred first-person quote and signature over a ruled booking bar (the site-wide enquiry form follows via app/template.tsx) */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container note">
          <p data-reveal="0" className="eyebrow eyebrow-tan">{P.closing.eyebrow}</p>
          <blockquote data-reveal="1" className="note-quote">
            <span className="note-mark serif" aria-hidden="true">&ldquo;</span>
            <p className="serif">{P.closing.quote}</p>
          </blockquote>
          <div data-reveal="2" className="note-sign">
            <span className="rule" />
            <span className="serif" style={{ fontSize: 26, lineHeight: 1.15, marginTop: 16 }}>{P.name}</span>
            <span className="eyebrow eyebrow-gold" style={{ fontSize: 11, letterSpacing: '.16em' }}>{P.closing.signature}</span>
          </div>
          <div data-reveal="3" className="note-cta">
            <p>{P.closing.text}</p>
            <Link href="/contact" className="btn btn-navy">{P.closing.button}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
