import { ImageSlot } from './ImageSlot';
import type { Step } from '@/lib/data';
import type { ReactNode } from 'react';

/** Pinned scroll story on desktop; stacked timeline on mobile. */
export default function PinnedSteps({ eyebrow, title, blurb, steps, footer }: {
  eyebrow: string; title: string; blurb?: string; steps: Step[]; footer?: ReactNode;
}) {
  return (
    <>
      <section data-pin="1" data-desk-block="1" style={{ position: 'relative', background: '#0B1D3A', color: '#F7F3EC', height: 'calc(100vh + 600vh)' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div data-pad="1" data-g2="1" className="container" style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 64, alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: 36 }}>
              <div style={{ display: 'grid', gap: 14 }}>
                <p className="eyebrow eyebrow-gold">{eyebrow}</p>
                <h2 data-h2="1" className="h2">{title}</h2>
                {blurb && <p data-desk="1" style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(247,243,236,.72)', maxWidth: 440 }}>{blurb}</p>}
              </div>
              <div data-desk="1" style={{ position: 'relative', display: 'grid' }}>
                <div style={{ position: 'absolute', left: 11, top: 14, bottom: 14, width: 1, background: 'rgba(247,243,236,.15)' }} />
                <div data-pin-bar="1" style={{ position: 'absolute', left: 11, top: 14, bottom: 14, width: 1, background: '#C6A15B', transformOrigin: 'top center', transform: 'scaleY(0)' }} />
                {steps.map((s, i) => (
                  <div key={s.n} data-pin-item={i} style={{ display: 'grid', gridTemplateColumns: '23px 1fr', gap: 20, padding: '12px 0', alignItems: 'center', opacity: 0.35, transition: 'opacity 1s ease', position: 'relative' }}>
                    <span style={{ width: 23, height: 23, borderRadius: '50%', background: '#0B1D3A', border: '1.5px solid #C6A15B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C6A15B' }} /></span>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}><span className="eyebrow eyebrow-gold" style={{ fontSize: 11 }}>{s.n}</span><span className="serif" style={{ fontSize: 22, lineHeight: 1.1 }}>{s.title}</span></div>
                  </div>
                ))}
              </div>
              {footer}
            </div>
            <div data-pin-media="1" style={{ position: 'relative', height: 'min(72vh,660px)' }}>
              {steps.map((s, i) => (
                <div key={s.n} data-pin-img={i} style={{ position: 'absolute', inset: 0, borderRadius: 8, overflow: 'hidden', background: '#3A4A66', opacity: 0, transform: 'scale(1.06)', transition: 'opacity 1.4s ease,transform 2.2s cubic-bezier(.16,1,.3,1)' }}>
                  <div className="fill"><ImageSlot src={s.src} alt={s.title} placeholder={s.ph} tone="dark" /></div>
                  <div className="ov-pin" />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 40, display: 'grid', gap: 12, pointerEvents: 'none' }}>
                    <span className="eyebrow eyebrow-gold">Step {s.n}</span>
                    <h3 className="serif" style={{ fontSize: 40, lineHeight: 1.05 }}>{s.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(247,243,236,.82)', maxWidth: 520 }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div data-mob-only="1" style={{ display: 'none' }}>
        <section style={{ padding: '56px 0', background: '#0B1D3A', color: '#F7F3EC' }}>
          <div style={{ padding: '0 24px', display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 10 }}>
              <p className="eyebrow eyebrow-gold">{eyebrow}</p>
              <h2 className="serif" style={{ fontSize: 30, lineHeight: 1.12, letterSpacing: '-.01em' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid' }}>
              {steps.map((s, i) => (
                <div key={s.n} data-reveal={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16, paddingBottom: 28 }}>
                  <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', justifyItems: 'center', gap: 8 }}>
                    <span className="serif" style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #C6A15B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#C6A15B' }}>{s.n}</span>
                    <span style={{ width: 1, background: 'rgba(247,243,236,.15)' }} />
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <h3 className="serif" style={{ fontSize: 24, lineHeight: 1.15, paddingTop: 4 }}>{s.title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(247,243,236,.75)' }}>{s.text}</p>
                    <div className="media" style={{ aspectRatio: '16/9', borderRadius: 6, background: '#3A4A66', marginTop: 8 }}><ImageSlot src={s.src} alt={s.title} placeholder={s.ph} tone="dark" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
