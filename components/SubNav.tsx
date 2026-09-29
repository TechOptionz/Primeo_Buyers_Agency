'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Sticky in-page navigation that sits just under the site nav: one link per section, the active one
 * underlined in gold as the reader scrolls. Sections are found by id (items come from BUYERS.sections).
 * The highlight follows a line 40% down the screen and clears once the last section has scrolled past.
 * On phones the row scrolls sideways and keeps the active link in view.
 */
export default function SubNav({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState('');
  const row = useRef<HTMLDivElement>(null);

  // A full load on a #chapter URL (the old service pages redirect here) jumps before the web fonts have
  // settled, which leaves the target a little under the sticky bars; land on it again once they have.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    const jump = () => el.scrollIntoView({ block: 'start', behavior: 'instant' });
    document.fonts.ready.then(() => { jump(); setTimeout(jump, 600); });
  }, []);

  useEffect(() => {
    const r = row.current;
    const el = r?.querySelector<HTMLElement>('.subnav-link.on');
    if (!r || !el || r.scrollWidth <= r.clientWidth) return;
    const x = el.getBoundingClientRect().left - r.getBoundingClientRect().left + r.scrollLeft;
    r.scrollTo({ left: Math.max(0, x - 20), behavior: 'smooth' });
  }, [active]);

  useEffect(() => {
    let raf = 0;
    const top = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
    const tick = () => {
      raf = 0;
      const line = window.scrollY + window.innerHeight * 0.4;
      let cur = '';
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && top(el) <= line) cur = it.id;
      }
      const last = document.getElementById(items[items.length - 1]?.id ?? '');
      if (last && top(last) + last.offsetHeight < line) cur = '';
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [items]);

  return (
    <nav className="subnav" aria-label="On this page">
      <div data-pad="1" className="container subnav-inner">
        <span className="serif subnav-title">{title}</span>
        <div ref={row} className="subnav-links">
          <span className="subnav-hint" aria-hidden="true">On this page</span>
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} className={`subnav-link${active === it.id ? ' on' : ''}`} aria-current={active === it.id ? 'location' : undefined}>{it.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
