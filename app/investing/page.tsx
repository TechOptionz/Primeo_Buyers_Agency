import Link from 'next/link';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PinnedSteps from '@/components/PinnedSteps';
import FactBand from '@/components/FactBand';
import { Slot } from '@/components/Slot';
import { INVESTING as P } from '@/lib/data';
import { SLOTS } from '@/lib/slots';

export const metadata: Metadata = { title: P.title, description: P.lead };

export default function Investing() {
  return (
    <>
      <PageHero eyebrow={P.title} title={P.hero} lead={P.lead} src={SLOTS.PROPERTY_INVESTMENT_HERO} placeholder="PROPERTY_INVESTMENT_HERO" band={<FactBand facts={P.facts} />} />

      {/* 1 INTRODUCTION: editorial statement, two-column copy, portrait */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-reveal="0" style={{ display: 'grid', gap: 14, maxWidth: 820 }}>
            <p className="eyebrow eyebrow-tan">{P.intro.eyebrow}</p>
            <h2 data-h2="1" className="h2" style={{ fontSize: 58 }}><span data-line="1" className="lines"><span>{P.intro.title}</span></span></h2>
          </div>
          <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 72, alignItems: 'start' }}>
            <div style={{ display: 'grid', gap: 26 }}>
              <p data-reveal="1" style={{ fontSize: 19, lineHeight: 1.6, color: '#0B1D3A' }}>{P.intro.p1}</p>
              <p data-reveal="2" style={{ fontSize: 16, lineHeight: 1.65, color: '#4A4C55' }}>{P.intro.p2}</p>
              <div style={{ display: 'grid' }}>
                {P.intro.points.map((pt, i) => <div key={pt} data-reveal={i} className="point"><span className="dot" /><p style={{ fontSize: 16, lineHeight: 1.55, color: '#0B1D3A' }}>{pt}</p></div>)}
              </div>
              <Link href="/contact" data-reveal="3" className="btn btn-navy btn-fit">Book a property consultation</Link>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}><Slot id="INVESTMENT_INTRO_PORTRAIT" alt="Adviser and investor reviewing property figures" sizes="(max-width: 1000px) 100vw, 45vw" /></div>
              <p data-reveal="1" style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 13, lineHeight: 1.5, color: '#8A7A57' }}><span className="eyebrow eyebrow-tan eyebrow-sm" style={{ flex: 'none' }}>Independent</span><span>Our only client is the buyer. No listings to push, no developer commissions.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 RESEARCH BEFORE PURCHASE: sticky copy beside a tall image and eight factors */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}>
          <div data-sticky="1" className="stick" style={{ display: 'grid', gap: 24 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{P.research.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.research.title}</span></span></h2>
            </div>
            <p data-reveal="1" style={{ fontSize: 17, lineHeight: 1.65, color: '#4A4C55', maxWidth: 460 }}>{P.research.text}</p>
            <Link href="/advisory" data-reveal="2" className="link-u">How we assess a property →</Link>
          </div>
          <div style={{ display: 'grid', gap: 40 }}>
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '16/11', borderRadius: 8, background: '#E6E0D4' }}><Slot id="PROPERTY_RESEARCH_IMAGE" alt="Research desk with suburb data and plans" sizes="(max-width: 1000px) 100vw, 55vw" /></div>
            <div style={{ display: 'grid' }}>
              {P.research.factors.map((f, i) => (
                <div key={f.n} data-reveal={i % 4} className="fac">
                  <span className="fac-n">{f.n}</span>
                  <div style={{ display: 'grid', gap: 6 }}><h3 className="serif">{f.title}</h3><p>{f.text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 INVESTMENT PROCESS: pinned scroll story */}
      <PinnedSteps
        eyebrow="The investment process"
        title={P.stepsTitle}
        blurb="Scroll to follow each stage, from the first strategy session to settlement."
        steps={P.steps}
        footer={<Link href="/contact" className="link-u light">Start with a strategy session →</Link>}
      />

      {/* 4 ESTABLISHED VS NEW: editorial comparison */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 700 }}>
              <p className="eyebrow eyebrow-tan">{P.compare.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.compare.title}</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 400 }}>{P.compare.text}</p>
          </div>
          <div className="cmp">
            {P.compare.cols.map((c, i) => (
              <div key={c.title}>
                <div data-mask="1" className="media" style={{ aspectRatio: '16/10', borderRadius: 8, background: '#E6E0D4' }}><Slot id={c.slot} alt={c.title} sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 33vw" /></div>
                <div data-reveal={i} style={{ display: 'grid', gap: 12 }}>
                  <p className="eyebrow eyebrow-tan">{c.eyebrow}</p>
                  <h3 className="serif" style={{ fontSize: 32, lineHeight: 1.15 }}>{c.title}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A4C55' }}>{c.text}</p>
                </div>
                <div style={{ display: 'grid' }}>
                  {c.points.map((pt, k) => <div key={pt} data-reveal={k} className="point" style={{ padding: '12px 0' }}><span className="dot" /><p style={{ fontSize: 15, lineHeight: 1.55 }}>{pt}</p></div>)}
                </div>
                <Link href={c.link.href} data-reveal="3" className="link-u">{c.link.label}</Link>
              </div>
            ))}
          </div>
          <p data-reveal="0" className="serif" style={{ fontSize: 24, lineHeight: 1.4, color: '#0B1D3A', maxWidth: 760, paddingTop: 32, borderTop: '1px solid #E6E0D4', textWrap: 'pretty' }}>{P.compare.note}</p>
        </div>
      </section>

      {/* 5 GROWTH AREAS: corridor map, then four research lenses beside a portrait */}
      <section data-sec="1" className="sec" style={{ background: '#0B1D3A', color: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 660 }}>
              <p className="eyebrow eyebrow-gold">{P.growth.eyebrow}</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>{P.growth.title}</span></span></h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(247,243,236,.72)', maxWidth: 420 }}>{P.growth.text}</p>
          </div>
          <div data-mask="1" data-map="1" className="media" style={{ aspectRatio: '21/9', borderRadius: 8, background: '#3A4A66' }}>
            <div className="fill"><Slot id="BRISBANE_GROWTH_MAP" alt="Map of South East Queensland growth corridors" tone="dark" /></div>
            <div className="fill" style={{ background: 'linear-gradient(180deg, rgba(11,29,58,.08), rgba(11,29,58,.6))', pointerEvents: 'none' }} />
            <div data-seq="1" className="fill">
              {P.growth.markers.map((m) => <span key={m.label} className="mark-at" style={{ left: `${m.x}%`, top: `${m.y}%` }}><span className="mark">{m.label}</span></span>)}
            </div>
            <span className="tag" style={{ top: 'auto', bottom: 16, left: 16 }}>Corridors we research</span>
          </div>
          <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'center' }}>
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#3A4A66' }}><Slot id="BRISBANE_PROPERTY_IMAGE" alt="Brisbane home" tone="dark" sizes="(max-width: 1000px) 100vw, 45vw" /></div>
            <div style={{ display: 'grid', gap: 28 }}>
              <div data-reveal="0" style={{ display: 'grid', gap: 12 }}>
                <p className="eyebrow eyebrow-gold">Four lenses on every corridor</p>
                <h3 className="serif" style={{ fontSize: 34, lineHeight: 1.15 }}>What we look at before we look at a property.</h3>
              </div>
              <div style={{ display: 'grid' }}>
                {P.growth.lenses.map((l, i) => (
                  <div key={l.n} data-reveal={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, padding: '20px 0', borderTop: '1px solid rgba(247,243,236,.15)' }}>
                    <span className="num-ring" style={{ borderColor: 'rgba(247,243,236,.3)' }}>{l.n}</span>
                    <div style={{ display: 'grid', gap: 5 }}><h4 style={{ fontSize: 17, fontWeight: 600 }}>{l.title}</h4><p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(247,243,236,.72)' }}>{l.text}</p></div>
                  </div>
                ))}
              </div>
              <p data-reveal="4" style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(247,243,236,.5)', paddingTop: 20, borderTop: '1px solid rgba(247,243,236,.15)' }}>{P.growth.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
