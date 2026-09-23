'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoMark } from './Logo';
import { NAV, CONTACT } from '@/lib/data';

const MENU = [{ key: 'home', label: 'Home', href: '/' }, ...NAV, { key: 'contact', label: 'Contact', href: '/contact' }];

export default function Nav() {
  const [on, setOn] = useState(false);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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

  return (
    <>
      <nav data-nav="1" className={`nav${on ? ' on' : ''}`}>
        <div data-pad="1" data-nav-pad="1" className="nav-inner">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
            <span data-nav-logo="1" style={{ display: 'flex' }}><LogoMark /></span>
            <span data-logo-text="1" style={{ fontWeight: 700, fontSize: 19, letterSpacing: '.14em', lineHeight: 1 }}>PRIMEO</span>
          </Link>
          <div data-desk="1" className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV.map((i) => <Link key={i.key} href={i.href} className="nav-link">{i.label}</Link>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/contact" data-desk="1" className="btn btn-gold nav-cta">Book a call</Link>
            <a data-mob="1" href={CONTACT.phoneHref} aria-label="Call PRIMEO" className="nav-round" style={{ background: '#C6A15B', color: '#0B1D3A' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
            </a>
            <button data-mob="1" onClick={() => setOpen(true)} aria-label="Menu" className="nav-round" style={{ border: '1px solid currentColor', background: 'transparent', color: 'inherit' }}>
              <svg width="18" height="12" viewBox="0 0 20 14" stroke="currentColor" strokeWidth="1.6" style={{ transition: 'transform .4s ease', transform: open ? 'rotate(90deg)' : 'none' }}><path d="M0 1h20M0 7h14M0 13h20" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={`menu${open ? ' open' : ''}`} aria-hidden={!open}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 52 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LogoMark size={28} /><span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '.14em' }}>PRIMEO</span></span>
          <button onClick={() => setOpen(false)} aria-label="Close" style={{ width: 44, height: 44, border: '1px solid rgba(247,243,236,.35)', borderRadius: '50%', background: 'transparent', color: '#F7F3EC', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', alignContent: 'center', padding: '24px 0' }}>
          {MENU.map((m, i) => (
            <Link key={m.key} href={m.href} onClick={close} className="menu-item" style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : '0s' }}>
              <span style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span className="eyebrow eyebrow-gold eyebrow-sm">{String(i).padStart(2, '0')}</span>
                <span className="serif" style={{ fontSize: 32, lineHeight: 1.05 }}>{m.label}</span>
              </span>
              <span style={{ color: '#C6A15B' }}>→</span>
            </Link>
          ))}
        </div>
        <div className="menu-foot" style={{ transitionDelay: open ? `${0.12 + MENU.length * 0.05}s` : '0s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, color: 'rgba(247,243,236,.75)' }}>
            <a href={CONTACT.phoneHref} style={{ color: 'rgba(247,243,236,.85)' }}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} style={{ color: 'rgba(247,243,236,.85)' }}>{CONTACT.email}</a>
          </div>
          <Link href="/contact" onClick={close} className="btn btn-gold" style={{ height: 56 }}>Book a strategy call</Link>
        </div>
      </div>
    </>
  );
}
