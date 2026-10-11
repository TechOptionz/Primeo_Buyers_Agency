'use client';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * "View floor plan" on a package card: opens the brochure's floor plan in a native <dialog>
 * (styled as .plan-dialog in globals.css). The picture itself is rendered on the server and
 * passed in as `children`, so this component ships no image manifest to the browser.
 * Closes on the close button, a click on the backdrop or Escape; the page stops scrolling while it is open.
 */
export default function FloorPlan({ title, meta, aspect, note, children }: {
  /** the package address */
  title: string;
  /** dwelling type, rooms and area, e.g. "Rooming house · 5 bed · 5 bath · 3 car · 200 m²" */
  meta: string;
  /** the plan image's width / height, so the frame is sized before the picture arrives */
  aspect: number;
  note?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => { ref.current?.showModal(); document.body.style.overflow = 'hidden'; };
  const close = () => ref.current?.close();
  useEffect(() => () => { document.body.style.overflow = ''; }, []);
  return (
    <>
      <button type="button" className="link-u plan-open" onClick={open} aria-haspopup="dialog">View floor plan</button>
      <dialog ref={ref} className="plan-dialog" aria-label={`Floor plan, ${title}`} onClose={() => { document.body.style.overflow = ''; }} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="plan-body">
          <div className="plan-head">
            <div style={{ display: 'grid', gap: 6 }}>
              <p className="eyebrow eyebrow-tan eyebrow-sm">Floor plan</p>
              <p className="serif" style={{ fontSize: 24, lineHeight: 1.2 }}>{title}</p>
              <p style={{ fontSize: 13, color: '#4A4C55' }}>{meta}</p>
            </div>
            <button type="button" className="plan-close" onClick={close} aria-label="Close floor plan">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div className="plan-frame" style={{ '--ar': aspect } as CSSProperties}>{children}</div>
          {note && <p className="plan-note">{note}</p>}
        </div>
      </dialog>
    </>
  );
}
