import type { ReactNode } from 'react';
import { ImageSlot } from './ImageSlot';

/** Inner-page hero: dark backdrop, eyebrow with rule, serif headline, lead, optional fact band. */
export default function PageHero({ eyebrow, title, lead, band }: {
  eyebrow: string; title: string; lead: string; band?: ReactNode;
}) {
  return (
    <section data-hero="1" style={{ position: 'relative', minHeight: '82vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', padding: '160px 0 0' }}>
      <div data-parallax="1" style={{ position: 'absolute', inset: '-10% 0', willChange: 'transform' }}>
        <div data-zoom="1" data-bg-slot="1" style={{ position: 'absolute', inset: 0, background: '#1C2F52' }}><ImageSlot tone="dark" /></div>
      </div>
      <div className="ov-hero" />
      <div style={{ position: 'relative', width: '100%', display: 'grid', gap: 56 }}>
        <div data-pad="1" data-hero-content="1" className="container" style={{ width: '100%', display: 'grid', gap: 22, pointerEvents: 'none' }}>
          <div data-reveal="0" style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold" style={{ letterSpacing: '.2em' }}>{eyebrow}</p></div>
          <h1 data-hero-h="1" className="serif" style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: '-.02em', maxWidth: 960 }}>
            <span data-line="1" className="lines"><span>{title}</span></span>
          </h1>
          <p data-reveal="2" data-hero-lead="1" style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(247,243,236,.82)', maxWidth: 560 }}>{lead}</p>
        </div>
        {band && <div data-reveal="4" className="hero-band">{band}</div>}
      </div>
    </section>
  );
}
