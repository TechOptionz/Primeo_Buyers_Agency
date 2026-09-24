'use client';
import { useEffect, useRef, useState } from 'react';
import { ImageSlot } from './ImageSlot';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const paused = useRef(false);

  const go = (to: number, manual = false) => {
    if (manual) paused.current = true;
    setFade(true);
    setTimeout(() => { setI(((to % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length); setFade(false); }, 400);
  };

  useEffect(() => {
    const t = setInterval(() => { if (!document.hidden && !paused.current) go(i + 1); }, 7000);
    return () => clearInterval(t);
  });

  const cur = TESTIMONIALS[i];
  return (
    <div style={{ display: 'grid', gap: 36 }}>
      <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
        <p className="eyebrow eyebrow-gold">Client stories</p>
        <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Calm, clear and two steps ahead.</span></span></h2>
      </div>
      <div style={{ display: 'grid', gap: 28, transition: 'opacity .4s ease,transform .4s ease', opacity: fade ? 0 : 1, transform: fade ? 'translateY(12px)' : 'none' }}>
        <p data-quote="1" className="serif" style={{ fontSize: 32, lineHeight: 1.3, textWrap: 'pretty' }}>“{cur.quote}”</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="media" style={{ width: 56, height: 56, borderRadius: '50%', background: '#3A4A66', flex: 'none', position: 'relative', overflow: 'hidden' }}><ImageSlot src={cur.src} alt={cur.name} tone="dark" sizes="56px" /></div>
          <div style={{ display: 'grid', gap: 2 }}><span style={{ fontWeight: 600, fontSize: 15 }}>{cur.name}</span><span style={{ fontSize: 13, color: 'rgba(247,243,236,.6)' }}>{cur.meta}</span></div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: '1px solid rgba(247,243,236,.15)' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {TESTIMONIALS.map((t, k) => (
            <button key={t.id} onClick={() => go(k, true)} aria-label={`Story ${k + 1}`} style={{ width: 32, height: 3, border: 'none', borderRadius: 2, background: k === i ? '#C6A15B' : 'rgba(247,243,236,.3)', padding: 0, transition: 'background .4s ease' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="t-btn" onClick={() => go(i - 1, true)} aria-label="Previous">←</button>
          <button className="t-btn" onClick={() => go(i + 1, true)} aria-label="Next">→</button>
        </div>
      </div>
    </div>
  );
}
