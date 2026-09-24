import Link from 'next/link';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FactBand from '@/components/FactBand';
import { Slot } from '@/components/Slot';
import { OFF_MARKET as P } from '@/lib/data';
import { SLOTS } from '@/lib/slots';

export const metadata: Metadata = { title: 'Off-Market Properties', description: P.lead };

export default function OffMarket() {
  return (
    <>
      <PageHero eyebrow={P.title} title={P.hero} lead={P.lead} src={SLOTS.OFF_MARKET_HERO} placeholder="OFF_MARKET_HERO" band={<FactBand facts={P.facts} />} />

      {/* 1 WHAT IS OFF-MARKET: statement and portrait beside three definitions */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{P.what.eyebrow}</p>
              <h2 data-h2="1" className="h2" style={{ fontSize: 54 }}><span data-line="1" className="lines"><span>{P.what.title}</span></span></h2>
            </div>
            <p data-reveal="1" style={{ fontSize: 18, lineHeight: 1.65, color: '#4A4C55', maxWidth: 520 }}>{P.what.text}</p>
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', maxWidth: 440, borderRadius: 8, background: '#E6E0D4' }}><Slot id="OFF_MARKET_PROPERTY_IMAGE" alt="Private home behind a gate" sizes="440px" /></div>
          </div>
          <div data-sticky="1" className="stick" style={{ display: 'grid', alignContent: 'start', paddingTop: 12 }}>
            {P.what.defs.map((d, i) => (
              <div key={d.n} data-reveal={i} className="fac" style={{ padding: '30px 0' }}>
                <span className="fac-n">{d.n}</span>
                <div style={{ display: 'grid', gap: 10 }}><h3 className="serif" style={{ fontSize: 32 }}>{d.title}</h3><p style={{ fontSize: 16 }}>{d.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 BEYOND PUBLIC LISTINGS: wide image, then six sourcing channels in ruled cells */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-mask="1" className="media" style={{ aspectRatio: '21/9', borderRadius: 8, background: '#E6E0D4' }}>
            <Slot id="OFF_MARKET_STREETSCAPE" alt="Leafy inner-Brisbane street" />
          </div>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">{P.beyond.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.beyond.title}</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 400 }}>{P.beyond.text}</p>
          </div>
          <div data-seq="1" data-g3="1" className="cells" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {P.beyond.channels.map((c) => (
              <div key={c.n} className="cell">
                <span className="eyebrow eyebrow-gold">{c.n}</span>
                <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.15 }}>{c.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 HOW THE PROCESS WORKS: vertical timeline drawn by scroll */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 48 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">{P.process.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.process.title}</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 380 }}>Six steps, each one animating in as you scroll. The same discipline applies whether the property is public or private.</p>
          </div>
          <div data-track="1" className="tl">
            <span className="tl-line" aria-hidden="true" />
            {P.process.steps.map((s, i) => (
              <div key={s.n} data-side={i % 2 ? 'right' : 'left'} className="tl-item">
                <span data-node="1" className="tl-node" aria-hidden="true" />
                <div data-reveal="0" className="tl-text">
                  <span className="eyebrow eyebrow-gold">Step {s.n}</span>
                  <h3 className="serif" style={{ fontSize: 36, lineHeight: 1.1 }}>{s.title}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A4C55', maxWidth: 420 }}>{s.text}</p>
                </div>
                {s.slot && <div className="tl-media"><div data-mask="1" className="media"><Slot id={s.slot} alt={s.title} sizes="(max-width: 1000px) 100vw, 50vw" /></div></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 NOT EVERY OFF-MARKET PROPERTY IS A GOOD PROPERTY: full-height, large type over a drifting image */}
      <section data-full="1" style={{ position: 'relative', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 0' }}>
        <div data-mask="1" data-drift="48" style={{ position: 'absolute', inset: '-64px 0' }}>
          <div className="fill"><Slot id="OFF_MARKET_DUE_DILIGENCE" alt="" tone="dark" pos="corner" /></div>
        </div>
        <div className="ov-hero" />
        <div data-pad="1" className="container" style={{ position: 'relative', width: '100%', display: 'grid', gap: 44 }}>
          <div data-reveal="0" style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold" style={{ letterSpacing: '.2em' }}>{P.caution.eyebrow}</p></div>
          <h2 data-hero-h="1" className="serif" style={{ fontSize: 68, lineHeight: 1.04, letterSpacing: '-.02em', maxWidth: 900 }}>
            <span data-line="1" className="lines"><span>{P.caution.title}</span></span>
          </h2>
          <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'end' }}>
            <div style={{ display: 'grid', borderBottom: '1px solid rgba(247,243,236,.15)' }}>
              {P.caution.lines.map((l, i) => (
                <div key={l} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, alignItems: 'baseline', padding: '14px 0', borderTop: '1px solid rgba(247,243,236,.15)' }}>
                  <span className="eyebrow eyebrow-gold">{String(i + 1).padStart(2, '0')}</span>
                  <p className="big"><span data-line={i} className="lines"><span>{l}</span></span></p>
                </div>
              ))}
            </div>
            <p data-reveal="2" style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(247,243,236,.75)', maxWidth: 420 }}>{P.caution.text}</p>
          </div>
        </div>
      </section>

      {/* 5 PROPERTY MATCHING: portrait beside the brief */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 72, alignItems: 'center' }}>
          <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}><Slot id="PROPERTY_MATCHING_IMAGE" alt="Adviser writing a buyer brief with clients" sizes="(max-width: 1000px) 100vw, 50vw" /></div>
          <div style={{ display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{P.matching.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.matching.title}</span></span></h2>
            </div>
            <p data-reveal="1" style={{ fontSize: 17, lineHeight: 1.65, color: '#4A4C55', maxWidth: 520 }}>{P.matching.text}</p>
            <div style={{ display: 'grid' }}>
              {P.matching.criteria.map((c, i) => (
                <div key={c.label} data-reveal={i} className="brief-row">
                  <span className="eyebrow eyebrow-tan">{c.label}</span>
                  <span style={{ display: 'grid', gap: 3 }}><span className="serif" style={{ fontSize: 23, lineHeight: 1.25 }}>{c.value}</span><span style={{ fontSize: 13, lineHeight: 1.5, color: '#4A4C55' }}>{c.sub}</span></span>
                </div>
              ))}
            </div>
            <div data-reveal="3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-navy">Join our buyer network</Link>
              <Link href="/buyers" className="btn btn-outline-dark">How buyer agency works</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
