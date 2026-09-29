'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Slot } from './Slot';
import type { Chapter } from '@/lib/data';

/**
 * "What we do": the four services as chapters that scroll beside one sticky frame. The frame
 * crossfades to the photo of whichever chapter is nearest the upper half of the screen, and its
 * caption and progress marks follow. Below 1000px the frame is hidden and each chapter shows its
 * own photo inline (see .chap-* in globals.css). Each chapter carries an id so the old service
 * URLs (/investing, /off-market, /advisory) can redirect straight to it.
 */
export default function ServiceChapters({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = list.current;
      if (!el) return;
      const rows = Array.from(el.querySelectorAll<HTMLElement>('[data-chapter]'));
      const line = window.innerHeight * 0.45;
      let best = 0, dist = Infinity;
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect();
        // measure to the top part of the chapter so a tall chapter switches in as its heading arrives
        const d = Math.abs(b.top + Math.min(b.height, 360) / 2 - line);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const cur = chapters[active];
  return (
    <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 72, alignItems: 'start' }}>
      {/* sticky wrapper is separate from the frame: [data-sticky] goes static below 1000px, and the frame must stay positioned */}
      <div data-sticky="1" className="stick chap-stack-wrap">
        <div data-reveal="1" className="chap-stack">
          {chapters.map((c, i) => (
            <div key={c.id} className={`chap-img${i === active ? ' on' : ''}`} aria-hidden={i !== active}>
              <div className="fill"><Slot id={c.slot} alt={c.alt} tone="dark" sizes="(max-width: 1000px) 100vw, 45vw" /></div>
            </div>
          ))}
          <div className="ov-pin" />
          <div className="chap-cap">
            <span className="chap-marks" aria-hidden="true">{chapters.map((c, i) => <i key={c.id} className={i === active ? 'on' : ''} />)}</span>
            <span className="chap-head light"><span className="chap-n">{cur.n}</span><span className="chap-label">{cur.label}</span></span>
            <span className="serif" style={{ fontSize: 26, lineHeight: 1.15, color: '#F7F3EC' }}>{cur.title}</span>
          </div>
        </div>
      </div>

      <div ref={list} style={{ display: 'grid' }}>
        {chapters.map((c, i) => (
          <article key={c.id} id={c.id} data-chapter={i} className="chapter sec-anchor">
            <div data-mask="1" className="media chap-mob"><Slot id={c.slot} alt={c.alt} sizes="100vw" /></div>
            <div data-reveal="0" style={{ display: 'grid', gap: 18 }}>
              <span className="chap-head"><span className="chap-n">{c.n}</span><span className="chap-label">{c.label}</span></span>
              <h3 data-h3="1" className="serif" style={{ fontSize: 38, lineHeight: 1.1, letterSpacing: '-.01em' }}>{c.title}</h3>
            </div>
            <p data-reveal="1" className="chap-text">{c.text}</p>
            <div style={{ display: 'grid' }}>
              {c.points.map((pt, k) => (
                <div key={pt} data-reveal={k} className="point chap-point"><span className="dot" /><p>{pt}</p></div>
              ))}
            </div>
            <Link href={c.cta.href} data-reveal="3" className="link-u">{c.cta.label}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
