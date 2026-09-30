import Link from 'next/link';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FactBand from '@/components/FactBand';
import SectionHead from '@/components/SectionHead';
import SubNav from '@/components/SubNav';
import ServiceChapters from '@/components/ServiceChapters';
import Faq from '@/components/Faq';
import { Slot } from '@/components/Slot';
import { BUYERS as P } from '@/lib/data';
import { SLOTS } from '@/lib/slots';

export const metadata: Metadata = { title: P.title, description: P.lead };

// Search engines can show the FAQ under the listing.
const FAQ_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: P.faq.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
}).replace(/</g, '\\u003c');

export default function Buyers() {
  return (
    <>
      <PageHero eyebrow={P.title} title={P.hero} lead={P.lead} src={SLOTS.BUYERS_HERO} placeholder="BUYERS_HERO" band={<FactBand facts={P.facts} />} />
      <SubNav title={P.title} items={P.sections} />

      {/* 01 WHAT WE DO: four service chapters beside a sticky, crossfading frame */}
      <section id="what-we-do" data-sec="1" className="sec sec-anchor" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 64 }}>
          <SectionHead n={P.what.n} label={P.what.eyebrow} title={P.what.title} text={P.what.text} />
          <ServiceChapters chapters={P.what.chapters} />
        </div>
      </section>

      {/* 02 WHO WE ARE: cinematic band over a drifting photo, four principles, then the numbers counting up */}
      <section id="who-we-are" data-sec="1" className="sec sec-anchor" style={{ position: 'relative', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', padding: '120px 0' }}>
        <div data-mask="1" data-drift="48" style={{ position: 'absolute', inset: '-64px 0' }}>
          <div className="fill"><Slot id="BUYERS_WHO_WE_ARE_BACKDROP" alt="" tone="dark" pos="corner" /></div>
        </div>
        <div className="fill" style={{ background: 'rgba(11,29,58,.55)', pointerEvents: 'none' }} />
        <div className="ov-hero" />
        <div data-pad="1" className="container" style={{ position: 'relative', display: 'grid', gap: 64 }}>
          <SectionHead dark layout="center" n={P.who.n} label={P.who.eyebrow} title={P.who.title} text={P.who.text} max={900} />
          <div data-seq="1" data-g4="1" className="cells dark" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            {P.who.principles.map((t) => (
              <div key={t.n} className="cell">
                <span className="eyebrow eyebrow-gold">{t.n}</span>
                <h3 className="serif" style={{ fontSize: 25, lineHeight: 1.15 }}>{t.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(247,243,236,.72)' }}>{t.text}</p>
              </div>
            ))}
          </div>
          <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end' }}>
            <div data-seq="1" data-g4="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
              {P.who.stats.map((s) => (
                <div key={s.label} style={{ display: 'grid', gap: 10, paddingTop: 22, borderTop: '1px solid rgba(247,243,236,.2)' }}>
                  <span data-count={s.v} data-prefix={s.pre} data-suffix={s.suf} className="serif" style={{ fontSize: 56, lineHeight: 0.95, letterSpacing: '-.02em' }}>0</span>
                  <div style={{ display: 'grid', gap: 3 }}><span style={{ fontSize: 15, fontWeight: 600 }}>{s.label}</span><span style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(247,243,236,.6)' }}>{s.sub}</span></div>
                </div>
              ))}
            </div>
            <Link href={P.who.link.href} data-reveal="2" className="link-u light">{P.who.link.label}</Link>
          </div>
        </div>
      </section>

      {/* 03 WHO WE HELP: six real situations in ruled cells */}
      <section id="who-we-help" data-sec="1" className="sec sec-anchor" style={{ background: '#fff', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <SectionHead n={P.help.n} label={P.help.eyebrow} title={P.help.title} text={P.help.text} />
          <div data-seq="1" data-g3="1" className="cells" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {P.help.cases.map((c) => (
              <div key={c.who} className="cell help-cell">
                <span className="who-label">{c.who}</span>
                <h3 className="serif" style={{ fontSize: 25, lineHeight: 1.2, textWrap: 'pretty' }}>“{c.problem}”</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: '#3A3F4C' }}>{c.help}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 HOW IT WORKS: horizontal timeline drawn by scroll, then a wide photo */}
      <section id="how-it-works" data-sec="1" className="sec sec-anchor" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 64 }}>
          <SectionHead n={P.process.n} label={P.process.eyebrow} title={P.process.title} text={P.process.text} />
          <div data-track="1" className="htl">
            <span className="htl-line" aria-hidden="true" />
            {P.process.steps.map((s, i) => (
              <div key={s.n} data-reveal={i} className="htl-step">
                <span data-node="1" className="htl-node" aria-hidden="true" />
                <span className="eyebrow eyebrow-gold">{s.n}</span>
                <h3 className="serif" style={{ fontSize: 28, lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{s.text}</p>
              </div>
            ))}
          </div>
          <div data-mask="1" className="media" style={{ aspectRatio: '21/9', borderRadius: 8, background: '#E6E0D4' }}>
            <Slot id={P.process.image.slot} alt={P.process.image.alt} />
            <span className="tag" style={{ top: 'auto', bottom: 16, left: 16 }}>{P.process.image.tag}</span>
            <Link href={P.process.link.href} className="btn btn-gold chap-float">{P.process.link.label}</Link>
          </div>
        </div>
      </section>

      {/* 05 FAQ: sticky heading beside the accordion */}
      <section id="faq" data-sec="1" className="sec sec-anchor" style={{ background: '#fff', borderTop: '1px solid #E6E0D4' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }}>
          <div data-sticky="1" className="stick stick-low" style={{ display: 'grid', gap: 28 }}>
            <SectionHead layout="stack" n={P.faq.n} label={P.faq.eyebrow} title={P.faq.title} text={P.faq.text} max={420} />
            <Link href="/contact" data-reveal="2" className="btn btn-navy btn-fit">{P.faq.button}</Link>
          </div>
          <Faq items={P.faq.items} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_LD }} />
      </section>
    </>
  );
}
