import type { ReactNode } from 'react';
import { ImageSlot } from './ImageSlot';

// The backdrop is about 98vh tall (82vh hero plus the parallax overscan) and cropped to cover, so
// on a portrait phone the 16:9 photo is drawn far wider than the screen. Sizing by 100vw alone
// made phones fetch a file too small for that and stretch it soft.
const HERO_SIZES = 'max(100vw, 175vh)';

/**
 * Inner-page hero: dark backdrop, eyebrow with rule, serif headline, lead, optional fact band.
 * Pass `placeholder` to print an image identifier in the backdrop until a photo is supplied.
 * `focus` is the photo's object-position, for a subject that sits off-centre and would
 * otherwise be cropped out on a narrow screen.
 */
export default function PageHero({ eyebrow, title, lead, band, src, placeholder, focus }: {
  eyebrow: string; title: string; lead: string; band?: ReactNode; src?: string; placeholder?: string; focus?: string;
}) {
  const heroSrc = src ?? (placeholder ? undefined : '/images/hero_brisbane_luxury.jpg');
  return (
    <section data-hero="1" style={{ position: 'relative', minHeight: '82vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', padding: '160px 0 0' }}>
      <div data-parallax="1" style={{ position: 'absolute', inset: '-10% 0', willChange: 'transform' }}>
        <div data-zoom="1" {...(placeholder ? {} : { 'data-bg-slot': '1' })} style={{ position: 'absolute', inset: 0, background: '#1C2F52' }}><ImageSlot src={heroSrc} tone="dark" placeholder={placeholder} priority pos="top" sizes={HERO_SIZES} focus={focus} /></div>
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
