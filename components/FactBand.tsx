import CountUp from './CountUp';

/** Fact strip for the inner-page hero band: serif figure (counted up if numeric) over a short label, ruled between. */
export default function FactBand({ facts }: { facts: { v: string; l: string }[] }) {
  return (
    <div data-pad="1" data-g3="1" className="container" style={{ display: 'grid', gridTemplateColumns: `repeat(${facts.length},1fr)` }}>
      {facts.map((f) => (
        <div key={f.l} className="fact"><CountUp value={f.v} className="serif" style={{ fontSize: 30, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }} /><span style={{ fontSize: 13, color: 'rgba(247,243,236,.7)' }}>{f.l}</span></div>
      ))}
    </div>
  );
}
