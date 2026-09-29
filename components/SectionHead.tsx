import type { CSSProperties } from 'react';

/**
 * Chapter heading for the Buyer Agency page. A number, a gold rule that draws across the section as it
 * enters the viewport (data-rule, see Motion.tsx) and the label, then the headline and lead beneath.
 *  layout "row"    – headline left, lead right (default)
 *  layout "stack"  – headline over lead, for narrow or sticky columns
 *  layout "center" – centred headline and lead, for cinematic bands
 */
export default function SectionHead({ n, label, title, text, dark, layout = 'row', max = 720 }: {
  n: string; label: string; title: string; text?: string; dark?: boolean; layout?: 'row' | 'stack' | 'center'; max?: number;
}) {
  const center = layout === 'center';
  const lead: CSSProperties = { fontSize: 17, lineHeight: 1.65, color: dark ? 'rgba(247,243,236,.78)' : '#3A3F4C', maxWidth: center ? 640 : 440 };
  const headline = (
    <h2 data-h2="1" className="h2" style={{ maxWidth: max, ...(center ? { fontSize: 58, textWrap: 'balance' } : {}) }}>
      <span data-line="1" className="lines"><span>{title}</span></span>
    </h2>
  );
  return (
    <div style={{ display: 'grid', gap: center ? 40 : 32 }}>
      {/* the section's name is the client's headline for it, so it is set large beside the numbered badge */}
      <div data-reveal="0" className={`sec-mark${dark ? ' light' : ''}${center ? ' center' : ''}`}>
        {center && <span className="sec-rule" aria-hidden="true" />}
        <span className="chap-n">{n}</span>
        <span className="chap-label">{label}</span>
        <span data-rule="1" className="sec-rule" aria-hidden="true" />
      </div>
      {layout === 'row' ? (
        <div className="head-row">
          {headline}
          {text && <p data-reveal="1" style={lead}>{text}</p>}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 20, ...(center ? { justifyItems: 'center', textAlign: 'center', maxWidth: 900, margin: '0 auto' } : {}) }}>
          {headline}
          {text && <p data-reveal="1" style={lead}>{text}</p>}
        </div>
      )}
    </div>
  );
}
