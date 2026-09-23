import Link from 'next/link';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FactBand from '@/components/FactBand';
import AdvisoryServices from '@/components/AdvisoryServices';
import { Slot } from '@/components/Slot';
import { ADVISORY as P } from '@/lib/data';
import { SLOTS } from '@/lib/slots';

export const metadata: Metadata = { title: P.title, description: P.lead };

export default function Advisory() {
  return (
    <>
      <PageHero eyebrow={P.title} title={P.hero} lead={P.lead} src={SLOTS.PROPERTY_ADVISORY_HERO} placeholder="PROPERTY_ADVISORY_HERO" band={<FactBand facts={P.facts} />} />

      {/* 1 PROPERTY DECISIONS NEED CONTEXT: portrait beside six numbered needs */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 72, alignItems: 'center' }}>
          <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '3/4', borderRadius: 8, background: '#E6E0D4' }}><Slot id="PROPERTY_ADVISORY_MEETING" alt="Advisory meeting" /></div>
          <div style={{ display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{P.context.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.context.title}</span></span></h2>
            </div>
            <p data-reveal="1" style={{ fontSize: 17, lineHeight: 1.65, color: '#4A4C55' }}>{P.context.text}</p>
            <div style={{ display: 'grid' }}>
              {P.context.needs.map((n, i) => (
                <div key={n.n} data-reveal={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, padding: '18px 0', borderTop: '1px solid #E6E0D4' }}>
                  <span className="num-ring">{n.n}</span>
                  <div style={{ display: 'grid', gap: 4 }}><h3 style={{ fontSize: 17, fontWeight: 600 }}>{n.title}</h3><p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{n.text}</p></div>
                </div>
              ))}
            </div>
            <Link href="/contact" data-reveal="4" className="btn btn-navy btn-fit">Book a consultation</Link>
          </div>
        </div>
      </section>

      {/* 2 ADVISORY SERVICES: interactive index with sticky image stack */}
      <AdvisoryServices />

      {/* 3 PROPERTY ASSESSMENT: factor rows beside a sticky portrait */}
      <section id="assessment" data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', borderBottom: '1px solid #E6E0D4', scrollMarginTop: 72 }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 32 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{P.assessment.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.assessment.title}</span></span></h2>
            </div>
            <p data-reveal="1" style={{ fontSize: 17, lineHeight: 1.65, color: '#4A4C55', maxWidth: 520 }}>{P.assessment.text}</p>
            <div style={{ display: 'grid' }}>
              {P.assessment.factors.map((f, i) => (
                <div key={f.n} data-reveal={i % 4} className="fac">
                  <span className="fac-n">{f.n}</span>
                  <div style={{ display: 'grid', gap: 6 }}><h3 className="serif">{f.title}</h3><p>{f.text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div data-sticky="1" className="stick">
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}><Slot id="PROPERTY_ASSESSMENT_IMAGE" alt="Walking through a property with a clipboard" /></div>
          </div>
        </div>
      </section>

      {/* 4 NEGOTIATION: cinematic full-height statement over a drifting image */}
      <section data-full="1" style={{ position: 'relative', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 0' }}>
        <div data-mask="1" data-drift="48" style={{ position: 'absolute', inset: '-64px 0' }}>
          <div className="fill"><Slot id="NEGOTIATION_TABLE" alt="" tone="dark" pos="corner" /></div>
        </div>
        <div className="ov-hero" />
        <div data-pad="1" className="container" style={{ position: 'relative', width: '100%', display: 'grid', gap: 56 }}>
          <div style={{ display: 'grid', gap: 26, justifyItems: 'center', textAlign: 'center', maxWidth: 980, margin: '0 auto' }}>
            <div data-reveal="0" style={{ display: 'grid', justifyItems: 'center', gap: 18 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold" style={{ letterSpacing: '.2em' }}>{P.negotiation.eyebrow}</p></div>
            <h2 data-hero-h="1" className="serif" style={{ fontSize: 68, lineHeight: 1.04, letterSpacing: '-.02em', textWrap: 'balance' }}>
              <span data-line="1" className="lines"><span>{P.negotiation.title}</span></span>
            </h2>
            <p data-reveal="2" style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(247,243,236,.82)', maxWidth: 620 }}>{P.negotiation.text}</p>
          </div>
          <div data-seq="1" data-g3="1" className="cells dark" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {P.negotiation.points.map((pt) => (
              <div key={pt.n} className="cell">
                <span className="eyebrow eyebrow-gold">{pt.n}</span>
                <h3 className="serif" style={{ fontSize: 28, lineHeight: 1.15 }}>{pt.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(247,243,236,.72)' }}>{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 FROM STRATEGY TO SETTLEMENT: horizontal timeline drawn by scroll, then a wide image */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 64 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">{P.timeline.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.timeline.title}</span></span></h2>
            </div>
            <Link href="/contact" className="link-u">Book a consultation →</Link>
          </div>
          <div data-track="1" className="htl">
            <span className="htl-line" aria-hidden="true" />
            {P.timeline.steps.map((s, i) => (
              <div key={s.n} data-reveal={i} className="htl-step">
                <span data-node="1" className="htl-node" aria-hidden="true" />
                <span className="eyebrow eyebrow-gold">{s.n}</span>
                <h3 className="serif" style={{ fontSize: 28, lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{s.text}</p>
              </div>
            ))}
          </div>
          <div data-mask="1" className="media" style={{ aspectRatio: '21/9', borderRadius: 8, background: '#E6E0D4' }}>
            <Slot id="SETTLEMENT_KEYS_IMAGE" alt="Keys handed over at the front door" />
            <span className="tag" style={{ top: 'auto', bottom: 16, left: 16 }}>Settlement day</span>
          </div>
        </div>
      </section>
    </>
  );
}
