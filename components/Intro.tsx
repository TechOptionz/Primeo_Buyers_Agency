'use client';
import { useEffect, useRef } from 'react';
import { intro } from '@/lib/intro';

// Skyline bar heights (px) along the bottom edge, and gold specks that drift upward.
const BARS = [38, 64, 52, 96, 70, 128, 84, 150, 110, 172, 96, 134, 78, 112, 60, 92, 48, 70, 36];
const SPECKS = [
  { x: 18, y: 72, d: 0.3, s: 3 }, { x: 27, y: 58, d: 0.9, s: 2 }, { x: 36, y: 80, d: 0.6, s: 2 },
  { x: 62, y: 76, d: 0.2, s: 2 }, { x: 71, y: 62, d: 1.0, s: 3 }, { x: 80, y: 82, d: 0.5, s: 2 },
  { x: 44, y: 88, d: 1.2, s: 2 }, { x: 56, y: 90, d: 0.8, s: 3 },
];

/**
 * Opening cover: logo mark draws itself, wordmark settles in, gold rule extends.
 * At the end the mark flies to the nav's logo position and shrinks to its size
 * while the navy panel wipes upward, so the nav logo appears to be the same object.
 * Motion is CSS keyframes (.intro-* in globals.css); JS only measures the flight.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hold hero reveals until the cover lifts.
    intro.pending = true;
    const t1 = setTimeout(() => { intro.pending = false; }, 400);

    // Flight to the nav logo. The CSS intro is timed from first paint, but this effect
    // runs after hydration, so the flight is scheduled on the cover's own animation
    // clock (its introWipe animation) rather than on a JS timer.
    const TAKEOFF = 2000, DURATION = 1050;
    let flight: Animation | undefined;
    const schedule = () => {
      const el = ref.current;
      const wrap = el?.querySelector<HTMLElement>('.intro-mark-wrap');
      const mark = el?.querySelector<HTMLElement>('.intro-mark');
      const target = document.querySelector<HTMLElement>('[data-nav-logo]');
      if (!el || !wrap || !mark || !target) return;
      const clock = el.getAnimations()[0];
      const elapsed = Number(clock?.currentTime ?? 0);
      if (elapsed >= TAKEOFF && flight) return; // already airborne; don't re-measure mid-flight
      const m = mark.getBoundingClientRect(), t = target.getBoundingClientRect();
      if (!m.width || !t.width) return;
      const dx = (t.left + t.width / 2) - (m.left + m.width / 2);
      const dy = (t.top + t.height / 2) - (m.top + m.height / 2);
      const s = t.width / m.width;
      flight?.cancel();
      flight = wrap.animate(
        [{ transform: 'none' }, { transform: `translate(${dx}px, ${dy}px) scale(${s})` }],
        { delay: Math.max(0, TAKEOFF - elapsed), duration: DURATION, easing: 'cubic-bezier(.7,0,.25,1)', fill: 'forwards' },
      );
      el.classList.add('fly');
    };
    schedule();
    // Re-measure once web fonts settle, since the wordmark's height positions the mark.
    document.fonts?.ready.then(schedule);

    return () => { clearTimeout(t1); flight?.cancel(); };
  }, []);

  return (
    <div ref={ref} className="intro" aria-hidden="true">
      <div className="intro-glow" />
      <div className="intro-skyline">
        {BARS.map((h, i) => <span key={i} style={{ height: h, animationDelay: `${0.3 + i * 0.045}s` }} />)}
      </div>
      {SPECKS.map((p, i) => (
        <span key={i} className="intro-speck" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }} />
      ))}

      <div className="intro-inner">
        <span className="intro-corner tl" /><span className="intro-corner tr" /><span className="intro-corner bl" /><span className="intro-corner br" />
        <div className="intro-mark-wrap">
          <span className="intro-ring" /><span className="intro-ring r2" />
          <svg className="intro-mark" width="124" height="124" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path className="intro-frame" pathLength={1} d="M4 12V4h32v32H4V24" />
            <path className="intro-line" pathLength={1} d="M4 30 18 20l8 4L34 14" />
            <circle className="intro-dot" cx="34" cy="14" r="3.5" fill="#C6A15B" stroke="none" />
          </svg>
        </div>
        <div className="intro-word"><span>PRIMEO</span></div>
        <span className="intro-rule" />
        <div className="intro-tag">Property Group · Brisbane &amp; Queensland</div>
      </div>
    </div>
  );
}
