'use client';
import { useEffect } from 'react';
import { intro } from '@/lib/intro';

// Skyline bar heights (px) along the bottom edge, and gold specks that drift upward.
const BARS = [38, 64, 52, 96, 70, 128, 84, 150, 110, 172, 96, 134, 78, 112, 60, 92, 48, 70, 36];
const SPECKS = [
  { x: 18, y: 72, d: 0.3, s: 3 }, { x: 27, y: 58, d: 0.9, s: 2 }, { x: 36, y: 80, d: 0.6, s: 2 },
  { x: 62, y: 76, d: 0.2, s: 2 }, { x: 71, y: 62, d: 1.0, s: 3 }, { x: 80, y: 82, d: 0.5, s: 2 },
  { x: 44, y: 88, d: 1.2, s: 2 }, { x: 56, y: 90, d: 0.8, s: 3 },
];

/**
 * Opening cover: logo mark draws itself, wordmark settles in, gold rule extends,
 * then the navy panel wipes upward to reveal the page. All motion is CSS keyframes
 * (see .intro-* in globals.css), so it is immune to effect re-runs.
 */
export default function Intro() {
  useEffect(() => {
    // Tell the motion system to hold hero reveals until the cover lifts.
    intro.pending = true;
    const t = setTimeout(() => { intro.pending = false; }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="intro" aria-hidden="true">
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
          <svg className="intro-mark" width="124" height="124" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
