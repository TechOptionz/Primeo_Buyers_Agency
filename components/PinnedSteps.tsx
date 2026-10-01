import { ImageSlot } from './ImageSlot';
import type { Step } from '@/lib/data';
import type { ReactNode } from 'react';
import { altFromLabel } from '@/lib/alt';

/**
 * Scroll story of numbered steps, each with a photo. One set of markup; the layout is CSS
 * (.pin-* in globals.css), so each step's text and photo are in the page once:
 *  desktop  – pinned: the step index on the left, the active step's photo on the right
 *  tablet   – pinned: the photos stacked in one frame, the active step's text as its caption
 *  phone    – not pinned: a plain timeline, each step followed by its photo
 * Motion (data-pin, data-pin-item, data-pin-img) moves the active step as the section scrolls.
 */
export default function PinnedSteps({ eyebrow, title, blurb, steps, footer }: {
  eyebrow: string; title: string; blurb?: string; steps: Step[]; footer?: ReactNode;
}) {
  return (
    <section data-pin="1" className="pin" style={{ height: `calc(100vh + ${steps.length * 120}vh)` }}>
      <div className="pin-stage">
        <div data-pad="1" className="container">
          <div className="pin-grid">
            <div className="pin-head">
              <p className="eyebrow eyebrow-gold">{eyebrow}</p>
              <h2 data-h2="1" className="h2">{title}</h2>
              {blurb && <p className="pin-blurb">{blurb}</p>}
            </div>
            {/* six or more steps: tighter rows so the index still fits beside the photo on a laptop screen */}
            <ol className={`pin-list${steps.length > 5 ? ' compact' : ''}`}>
              {steps.map((s, i) => (
                <li key={s.n} data-pin-item={i} data-state={i === 0 ? 'on' : 'todo'} className="pin-step">
                  <div data-reveal={i} className="pin-copy">
                    <span className="pin-num">{s.n}</span>
                    <h3 className="serif pin-title">{s.title}</h3>
                    <div className="pin-body"><p>{s.text}</p></div>
                  </div>
                  <div data-pin-img={i} className="pin-img">
                    <ImageSlot src={s.src} alt={altFromLabel(s.ph)} placeholder={s.ph} tone="dark" sizes="(max-width: 760px) calc(100vw - 88px), (max-width: 1000px) 100vw, 55vw" />
                  </div>
                </li>
              ))}
            </ol>
            <div className="pin-progress" aria-hidden="true">
              <span><b data-pin-count="1">01</b> / {String(steps.length).padStart(2, '0')}</span>
              <div className="pin-track"><span data-pin-bar="1" /></div>
            </div>
            {footer && <div className="pin-foot">{footer}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
