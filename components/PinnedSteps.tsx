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
              <div data-desk="1" style={{ display: 'grid', gap: 22 }}>
                {/* six or more steps: tighter rows so the index still fits beside the image on a laptop screen */}
                <div className={`pin-list${steps.length > 5 ? ' compact' : ''}`}>
                  {steps.map((s, i) => (
                    <div key={s.n} data-pin-item={i} data-state={i === 0 ? 'on' : 'todo'} className="pin-step">
                      <span className="pin-num">{s.n}</span>
                      <div>
                        <h3 className="serif pin-title">{s.title}</h3>
                        <div className="pin-body"><p>{s.text}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pin-progress">
                  <span><b data-pin-count="1">01</b> / {String(steps.length).padStart(2, '0')}</span>
                  <div className="pin-track"><span data-pin-bar="1" /></div>
                </div>
              </div>
              {footer}
            </div>
            <div data-pin-media="1" style={{ position: 'relative', height: 'min(72vh,660px)' }}>
              {steps.map((s, i) => (
                <div key={s.n} data-pin-img={i} style={{ position: 'absolute', inset: 0, borderRadius: 8, overflow: 'hidden', background: '#3A4A66', opacity: 0, transform: 'scale(1.06)', transition: 'opacity 1.4s ease,transform 2.2s cubic-bezier(.16,1,.3,1)' }}>
                  <div className="fill"><ImageSlot src={s.src} alt={s.title} placeholder={s.ph} tone="dark" sizes="(max-width: 1000px) 100vw, 55vw" /></div>
                  {/* caption only below 1000px, where the index list is hidden */}
                  <div className="ov-pin pin-cap" />
                  <div className="pin-cap" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 40, gap: 12, pointerEvents: 'none' }}>
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
                <div key={s.n} data-reveal={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', padding: '22px 0 26px', borderTop: '1px solid rgba(247,243,236,.14)' }}>
                  <span className="pin-num" style={{ color: '#C6A15B', paddingTop: 7 }}>{s.n}</span>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <h3 className="serif" style={{ fontSize: 24, lineHeight: 1.15 }}>{s.title}</h3>
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
