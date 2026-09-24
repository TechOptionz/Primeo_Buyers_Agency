'use client';
import { useEffect, useRef, useState } from 'react';
import { Slot } from './Slot';
import { ADVISORY } from '@/lib/data';

/**
 * Advisory services index: ruled rows in the pinned-steps style beside a sticky image stack.
 * The active row follows the scroll (row nearest the middle of the screen) and, on desktop,
 * hover, focus and click. The open row's description expands; the image crossfades to match.
 */
export default function AdvisoryServices() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const hover = useRef(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = list.current;
      if (hover.current || !el) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < vh * 0.25 || r.top > vh * 0.75) return; // list is not around the middle of the screen
      const rows = Array.from(el.querySelectorAll<HTMLElement>('[data-row]'));
      const mid = vh * 0.5;
      const dist = rows.map((row) => { const b = row.getBoundingClientRect(); return Math.abs(b.top + b.height / 2 - mid); });
      let best = 0;
      dist.forEach((d, i) => { if (d < dist[best]) best = i; });
      // hysteresis: the open row grows, so only switch once the new row is clearly nearer
      setActive((a) => (best !== a && dist[best] < dist[a] - 28 ? best : a));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const cur = ADVISORY.services[active];
  return (
    <section data-sec="1" className="sec" style={{ background: '#0B1D3A', color: '#F7F3EC' }}>
      <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
        <div data-reveal="0" className="head-row">
          <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
            <p className="eyebrow eyebrow-gold">Advisory services</p>
            <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Eight ways we advise. One standard of evidence.</span></span></h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(247,243,236,.72)', maxWidth: 400 }}>Engage us for a single question or the whole purchase. Each service is delivered by the same team and rests on the same evidence.</p>
        </div>

        <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 72, alignItems: 'start' }}>
          {/* sticky wrapper is separate from the frame: [data-sticky] goes static below 1000px, and the frame must stay positioned */}
          <div data-sticky="1" className="stick">
            <div data-reveal="1" className="svc-media">
              {ADVISORY.services.map((s, i) => (
                <div key={s.n} className={`svc-img${i === active ? ' on' : ''}`} aria-hidden={i !== active}>
                  <div className="fill"><Slot id={s.slot} alt={s.title} tone="dark" sizes="(max-width: 1000px) 100vw, 55vw" /></div>
                </div>
              ))}
              <div className="ov-pin" />
              <div className="svc-cap">
                <span className="eyebrow eyebrow-gold">Service {cur.n}</span>
                <span className="serif" style={{ fontSize: 30, lineHeight: 1.1 }}>{cur.title}</span>
              </div>
            </div>
          </div>

          <div ref={list} className="pin-list" onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}>
            {ADVISORY.services.map((s, i) => (
              <button
                key={s.n}
                type="button"
                data-row={i}
                data-state={i === active ? 'on' : 'todo'}
                className="pin-step as-btn"
                aria-expanded={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="pin-num">{s.n}</span>
                <span style={{ display: 'block' }}>
                  <span className="serif pin-title" style={{ display: 'block' }}>{s.title}</span>
                  <span className="pin-body"><span>{s.text}</span></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
