'use client';
import { useState } from 'react';
import type { FaqItem } from '@/lib/data';

/**
 * FAQ accordion: one answer open at a time, the answer sliding open (grid-template-rows, see .faq-* in
 * globals.css) and the plus turning into a minus. Answers stay in the DOM when closed, so search engines
 * and screen readers see the full text.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q} data-reveal={i % 4} className={`faq-item${on ? ' on' : ''}`}>
            <button type="button" id={`faq-q-${i}`} className="faq-q" aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}>
              <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="serif faq-t">{it.q}</span>
              <span className="faq-x" aria-hidden="true" />
            </button>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a">
              <div><p>{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
