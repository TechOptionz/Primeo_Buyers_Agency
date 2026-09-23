'use client';
import { usePathname } from 'next/navigation';
import { ImageSlot } from './ImageSlot';
import { CtaForm } from './Forms';
import { CONTACT, IMAGES, CTA_DEFAULT, CTA_COPY } from '@/lib/data';

/** Closing call to action, appended to every page by app/template.tsx. Copy varies per route (CTA_COPY in lib/data.ts). */
export default function FinalCta() {
  const pathname = usePathname();
  const c = { ...CTA_DEFAULT, ...(CTA_COPY[pathname] ?? {}) };
  return (
    <section data-sec="1" className="sec" style={{ background: '#F7F3EC', borderTop: '1px solid #E6E0D4' }}>
      <div data-pad="1" className="container">
        <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 40px 80px rgba(11,29,58,.14)' }}>
          <div data-mask="1" data-cta-img="1" className="media" style={{ minHeight: 560, background: '#3A4A66' }}>
            <ImageSlot src={IMAGES.cta} alt="Agent and clients at a front gate, evening light" placeholder="Photo: agent and clients at a front gate, evening light" tone="dark" />
          </div>
          <div data-cta-panel="1" style={{ background: '#0B1D3A', color: '#F7F3EC', padding: '64px 56px', display: 'grid', gap: 28, alignContent: 'center' }}>
            <div data-reveal="0" style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold">{c.eyebrow}</p></div>
            <h2 data-reveal="1" data-h2="1" className="h2" style={{ lineHeight: 1.06, letterSpacing: '-.015em' }}>
              <span data-line="1" className="lines"><span>{c.title}</span></span>
            </h2>
            <p data-reveal="2" style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(247,243,236,.75)', maxWidth: 460 }}>{c.text}</p>
            <CtaForm label={c.button} />
            <p data-reveal="4" style={{ fontSize: 13, color: 'rgba(247,243,236,.55)' }}>Prefer to talk now? <a href={CONTACT.phoneHref} style={{ color: '#C6A15B', borderBottom: '1px solid rgba(198,161,91,.5)' }}>{CONTACT.phone}</a> · Mon–Fri 8am–6pm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
