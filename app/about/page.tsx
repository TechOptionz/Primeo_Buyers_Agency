import Link from 'next/link';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FactBand from '@/components/FactBand';
import { Slot } from '@/components/Slot';
import { ABOUT as P, IMAGES } from '@/lib/data';

export const metadata: Metadata = { title: `About ${P.name}`, description: P.seo };

// Value-card glyphs in the site's line-icon style (same stroke as the nav and footer icons), keyed by ABOUT.values[].icon.
const ICONS: Record<string, React.ReactNode> = {
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>,
};

export default function About() {
  return (
    <>
      <PageHero eyebrow={`Meet ${P.name}`} title={P.hero} lead={P.lead} src={IMAGES.aboutHero} band={<FactBand facts={P.facts} />} />

      {/* 1 INTRO: portrait beside who Prim is, with the at-a-glance rows */}
      <section data-sec="1" className="sec" style={{ background: '#fff' }}>
        <div data-pad="1" data-g2="1" className="container founder" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 80, alignItems: 'center' }}>
          <div className="founder-frame">
            <div data-mask="1" className="media founder-photo" style={{ aspectRatio: '3/4', borderRadius: 8, background: '#E6E0D4' }}>
              <Slot id="PRIM_AHUJA_PORTRAIT" alt={`${P.name}, ${P.role}`} sizes="(max-width: 640px) 100vw, 460px" />
            </div>
          </div>
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

      {/* 2 HIS STORY: vertical timeline drawn by scroll; on desktop the start year sits beside the line */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC', borderTop: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 48 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">{P.journey.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.journey.title}</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 400 }}>{P.journey.text}</p>
          </div>
          <div data-track="1" className="tl tl-story">
            <span className="tl-line" aria-hidden="true" />
            {P.journey.milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <div key={m.year} data-inview="1" data-side={left ? 'left' : 'right'} className="tl-item">
                  <span data-node="1" className="tl-node" aria-hidden="true" />
                  <div className="tl-text">
                    <span className="eyebrow eyebrow-gold">{m.year}</span>
                    <h3 className="serif" style={{ fontSize: 34, lineHeight: 1.1 }}>{m.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A4C55', maxWidth: 440 }}>{m.text}</p>
                  </div>
                  {/* decorative: the year is already in the eyebrow, so this is hidden below 1000px where the columns stack */}
                  <div data-desk="1" data-mask="1" data-drift="36" className="tl-media" aria-hidden="true" style={{ justifySelf: left ? 'start' : 'end' }}>
                    <span className="serif tl-year">{m.mark}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 HOW PRIM BRINGS IT ALL TOGETHER: sticky statement beside four numbered strengths, then the numbers */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 64 }}>
          <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}>
            <div data-sticky="1" className="stick" style={{ display: 'grid', gap: 24 }}>
              <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
                <p className="eyebrow eyebrow-tan">{P.together.eyebrow}</p>
                <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.together.title}</span></span></h2>
              </div>
              <p data-reveal="1" style={{ fontSize: 17, lineHeight: 1.65, color: '#4A4C55', maxWidth: 460 }}>{P.together.text}</p>
              <Link href="/contact" data-reveal="2" className="btn btn-navy btn-fit">{P.closing.button}</Link>
            </div>
            <div style={{ display: 'grid', borderBottom: '1px solid #E6E0D4' }}>
              {P.together.pillars.map((t, i) => (
                <div key={t.n} data-reveal={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, padding: '22px 0', borderTop: '1px solid #E6E0D4' }}>
                  <span className="num-ring">{t.n}</span>
                  <div style={{ display: 'grid', gap: 6 }}><h3 style={{ fontSize: 18, fontWeight: 600 }}>{t.title}</h3><p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55', maxWidth: 520 }}>{t.text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div data-seq="1" data-g4="1" className="cells" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            {P.together.stats.map((s) => (
              <div key={s.label} className="cell">
                <span data-count={s.v} data-prefix={s.pre} data-suffix={s.suf} className="serif" style={{ fontSize: 56, lineHeight: 0.95, color: '#0B1D3A', letterSpacing: '-.02em' }}>0</span>
                <div style={{ display: 'grid', gap: 4 }}><span style={{ fontSize: 15, fontWeight: 600, color: '#0B1D3A' }}>{s.label}</span><span style={{ fontSize: 13, lineHeight: 1.5, color: '#4A4C55' }}>{s.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 HOW PRIM HELPS: ruled cells, three across, each linking to the matching service chapter */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 48 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">{P.helps.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.helps.title}</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 400 }}>{P.helps.text}</p>
          </div>
          <div data-seq="1" data-g3="1" className="cells" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {P.helps.items.map((h) => (
              <div key={h.title} className="cell" style={{ background: '#fff', gridTemplateRows: 'auto auto 1fr auto' }}>
                <span className="eyebrow eyebrow-gold">{h.kind}</span>
                <h3 className="serif" style={{ fontSize: 25, lineHeight: 1.15 }}>{h.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{h.text}</p>
                <Link href={h.href} className="link-arrow" style={{ fontSize: 13, fontWeight: 600, color: '#0B1D3A' }}>{h.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 VALUES: four cards with line icons */}
      <section data-sec="1" className="sec" style={{ background: '#0B1D3A', color: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-reveal="0" style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
            <p className="eyebrow eyebrow-gold">{P.values.eyebrow}</p>
            <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.values.title}</span></span></h2>
          </div>
          <div data-seq="1" data-g4="1" data-scroll-row="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {P.values.items.map((v, i) => (
              <div key={v.title} data-reveal={i} className="value-card">
                <span className="num-ring" style={{ borderColor: 'rgba(247,243,236,.3)' }} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[v.icon]}</svg>
                </span>
                <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}><h3 className="serif" style={{ fontSize: 26, lineHeight: 1.15 }}>{v.title}</h3><p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(247,243,236,.72)' }}>{v.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 A NOTE FROM PRIM: first-person close and the booking button (the site-wide enquiry form follows via app/template.tsx) */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'end' }}>
          <div style={{ display: 'grid', gap: 28 }}>
            <p data-reveal="0" className="eyebrow eyebrow-tan">{P.closing.eyebrow}</p>
            <blockquote data-reveal="1" className="founder-quote">
              <span className="founder-mark serif" aria-hidden="true">&ldquo;</span>
              <p className="serif" style={{ fontSize: 32, lineHeight: 1.3, textWrap: 'pretty', color: '#0B1D3A' }}>{P.closing.quote}</p>
            </blockquote>
            <div data-reveal="2" style={{ display: 'grid', gap: 6 }}>
              <span className="rule" />
              <span className="serif" style={{ fontSize: 24, lineHeight: 1.15, marginTop: 14 }}>{P.name}</span>
              <span className="eyebrow eyebrow-gold" style={{ fontSize: 11, letterSpacing: '.16em' }}>{P.closing.signature}</span>
            </div>
          </div>
          <div data-reveal="3" style={{ display: 'grid', gap: 18, justifyItems: 'start' }}>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: '#4A4C55', maxWidth: 380 }}>{P.closing.text}</p>
            <Link href="/contact" className="btn btn-navy">{P.closing.button}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
