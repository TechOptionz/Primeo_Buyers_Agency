import Link from 'next/link';
import { ImageSlot } from './ImageSlot';
import FloorPlan from './FloorPlan';
import type { Package } from '@/lib/data';
import { altFromLabel } from '@/lib/alt';

const aud = (n: number) => `$${n.toLocaleString('en-AU')}`;
const sqm = (n: number) => `${n.toLocaleString('en-AU', { maximumFractionDigits: 2 })} m²`;
const KIND = { house: 'House & land', rooming: 'Rooming house' } as const;
// The brochures' own caveat, shown under each floor plan.
const PLAN_NOTE = 'Floor plan, facade and measurements are approximate and subject to change. Supplied by the builder for illustration only; the finished home may differ.';

const label: React.CSSProperties = { fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#796A47' };
const value: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: '#0B1D3A', lineHeight: 1.3, fontVariantNumeric: 'tabular-nums' };

/**
 * One house and land package on the House & Land page: the brochure's photo, the turnkey price,
 * the land and build split, sizes, registration and estimated rent, and an enquiry link that
 * opens the contact form with the package already named (components/Forms.tsx reads `?package=`).
 */
export default function PackageCard({ p, index }: { p: Package; index: number }) {
  const where = p.estate ? `${p.estate} · ${p.suburb}` : p.suburb;
  const facts = [
    { l: 'Land', v: aud(p.land) },
    { l: 'Build', v: aud(p.build) },
    { l: 'Land registration', v: p.registration },
    { l: 'Est. rent', v: p.rent ? `${aud(p.rent)} / week` : 'On request' },
  ];
  return (
    <article data-card="1" data-reveal={index} className="card card-hover" style={{ gridTemplateRows: 'auto 1fr' }}>
      <div className="media" style={{ aspectRatio: '16/10', background: '#E6E0D4' }}>
        <div data-card-img="1" className="fill"><ImageSlot src={p.src} alt={altFromLabel(p.ph)} placeholder={p.ph} sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 33vw" /></div>
        <span className="tag">{KIND[p.kind]}</span>
        <span style={{ position: 'absolute', right: 14, bottom: 12, padding: '4px 8px', borderRadius: 2, background: 'rgba(11,29,58,.6)', color: 'rgba(247,243,236,.85)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', pointerEvents: 'none' }}>Indicative image</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 24px 26px' }}>
        <div style={{ display: 'grid', gap: 6 }}>
          <p className="eyebrow eyebrow-tan eyebrow-sm">{where}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <p className="serif" style={{ fontSize: 30, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>{aud(p.price)}</p>
            <span style={{ fontSize: 12, color: '#796A47' }}>Fixed price · Full turnkey</span>
          </div>
          <p style={{ fontSize: 15, color: '#4A4C55', lineHeight: 1.5 }}>{p.address}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 13, color: '#3A4A66', paddingTop: 12, borderTop: '1px solid #E6E0D4' }}>
          <span style={{ display: 'flex', gap: 14 }}><span>{p.beds} bed</span><span>{p.baths} bath</span><span>{p.cars} car</span></span>
          <span style={{ display: 'flex', gap: 14 }}><span>{sqm(p.buildSize)} home</span><span>{sqm(p.landSize)} land</span></span>
        </div>
        <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px', margin: 0, paddingTop: 14, borderTop: '1px solid #E6E0D4' }}>
          {facts.map((f) => <div key={f.l} style={{ display: 'grid', gap: 3, alignContent: 'end' }}><dt style={label}>{f.l}</dt><dd style={{ ...value, margin: 0 }}>{f.v}</dd></div>)}
        </dl>
        {p.note && <p style={{ fontSize: 13, lineHeight: 1.55, color: '#4A4C55', paddingTop: 12, borderTop: '1px solid #E6E0D4' }}>{p.note}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginTop: 'auto', paddingTop: 4 }}>
          <Link href={`/contact?package=${encodeURIComponent(p.address)}`} className="link-u" aria-label={`Enquire about ${p.address}`}>Enquire about this package →</Link>
          {p.plan && (
            <FloorPlan title={p.address} meta={`${KIND[p.kind]} · ${p.beds} bed · ${p.baths} bath · ${p.cars} car · ${sqm(p.buildSize)}`} aspect={p.plan.w / p.plan.h} note={PLAN_NOTE}>
              <ImageSlot src={p.plan.src} alt={`Floor plan of ${p.address}`} placeholder="Floor plan" sizes="(max-width: 760px) 100vw, 640px" />
            </FloorPlan>
          )}
        </div>
      </div>
    </article>
  );
}
