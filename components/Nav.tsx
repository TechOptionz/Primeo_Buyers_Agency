'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { NAV } from '@/lib/nav';
import { SITE, telHref } from '@/config/site';

const MENU = [{ key: 'home', label: 'Home', href: '/' }, ...NAV, { key: 'contact', label: 'Contact', href: '/contact' }];

export default function Nav() {
  const [on, setOn] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));
  const close = () => setOpen(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const f = () => setOn(window.scrollY > 60);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Keyboard: focus moves into the menu when it opens and back to the button when it closes,
  // Escape closes it, and Tab cycles within it while it is open.
  useEffect(() => {
    const el = menu.current;
    if (!open) {
      if (wasOpen.current) trigger.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    if (!el) return;
    const items = () => Array.from(el.querySelectorAll<HTMLElement>('a[href], button'));
    items()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const list = items(), first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <nav data-nav="1" className={`nav${on ? ' on' : ''}`}>
        <div data-pad="1" data-nav-pad="1" className="nav-inner">
          <Link href="/" aria-label="PRIMEO: Right Property | Right Price. Home" style={{ display: 'flex', color: 'inherit' }}>
            <Logo flightTarget />
          </Link>
          <div data-desk="1" className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV.map((i) => <Link key={i.key} href={i.href} className={`nav-link${isActive(i.href) ? ' active' : ''}`} aria-current={isActive(i.href) ? 'page' : undefined}>{i.label}</Link>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/contact" data-desk="1" className="btn btn-gold nav-cta">Book a call</Link>
            <a data-mob="1" href={telHref(SITE.phone)} aria-label={`Call PRIMEO on ${SITE.phone}`} className="nav-round" style={{ background: '#C6A15B', color: '#0B1D3A' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
            </a>
            <button ref={trigger} type="button" data-mob="1" onClick={() => setOpen(true)} aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" className="nav-round" style={{ border: '1px solid currentColor', background: 'transparent', color: 'inherit' }}>
              <svg width="18" height="12" viewBox="0 0 20 14" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={{ transition: 'transform .4s ease', transform: open ? 'rotate(90deg)' : 'none' }}><path d="M0 1h20M0 7h14M0 13h20" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <div ref={menu} id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu" inert={!open} className={`menu${open ? ' open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 52 }}>
          <Logo variant="sm" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" style={{ width: 44, height: 44, border: '1px solid rgba(247,243,236,.35)', borderRadius: '50%', background: 'transparent', color: '#F7F3EC', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', alignContent: 'center', padding: '24px 0' }}>
          {MENU.map((m, i) => (
            <Link key={m.key} href={m.href} onClick={close} className={`menu-item${isActive(m.href) ? ' active' : ''}`} aria-current={isActive(m.href) ? 'page' : undefined} style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : '0s' }}>
              <span style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span className="eyebrow eyebrow-gold eyebrow-sm">{String(i).padStart(2, '0')}</span>
                <span className="serif" style={{ fontSize: 32, lineHeight: 1.05 }}>{m.label}</span>
              </span>
              <span aria-hidden="true" style={{ color: '#C6A15B' }}>→</span>
            </Link>
          ))}
        </div>
        <div className="menu-foot" style={{ transitionDelay: open ? `${0.12 + MENU.length * 0.05}s` : '0s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, color: 'rgba(247,243,236,.75)' }}>
            <a href={telHref(SITE.phone)} style={{ color: 'rgba(247,243,236,.85)' }}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} style={{ color: 'rgba(247,243,236,.85)' }}>{SITE.email}</a>
          </div>
          <Link href="/contact" onClick={close} className="btn btn-gold" style={{ height: 56 }}>Book a strategy call</Link>
        </div>
      </div>
    </>
  );
}
