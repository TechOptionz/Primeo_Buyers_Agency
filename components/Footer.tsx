import Link from 'next/link';
import { SERVICE_ITEMS, CONTACT } from '@/lib/data';
import { LogoMark } from '@/components/Logo';

const COMPANY = [{ label: 'About', href: '/about' }, { label: 'Market insights', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '/contact' }];

const SOCIAL = [
  { label: 'Instagram', d: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></> },
  { label: 'LinkedIn', d: <path d="M6 9v12M6 5v.5M11 21v-7a3 3 0 0 1 6 0v7M11 9v12" /> },
  { label: 'Facebook', d: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /> },
  { label: 'YouTube', d: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></> },
];

const summary: React.CSSProperties = { listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C6A15B', cursor: 'pointer' };
const mobLink: React.CSSProperties = { color: 'rgba(247,243,236,.85)' };

export default function Footer() {
  return (
    <footer data-inview="1" className="footer">
      <span data-rule="1" className="footer-topline" />
      <div className="footer-watermark"><span data-reveal="0">PRIMEO</span></div>

      <div data-pad="1" className="container" style={{ position: 'relative', display: 'grid', gap: 56 }}>
        <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: 64 }}>
          <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
            <Link href="/" data-reveal="0" className="flogo" aria-label="PRIMEO Buyer’s Agency, home">
              <LogoMark size={42} />
              <span className="flogo-text">
                <span className="flogo-word">PRIMEO</span>
                <span className="flogo-sub">Buyer&apos;s Agency</span>
              </span>
            </Link>
            <p data-reveal="1" style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(247,243,236,.65)', maxWidth: 360 }}>Independent buyer agency, property investment, off-market sourcing and property advisory across Brisbane and South East Queensland.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIAL.map((s, i) => (
                <a key={s.label} href="#" aria-label={s.label} className="social" data-reveal={i + 2}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{s.d}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* mobile accordions */}
          <div data-mob-only="1" data-reveal="2" style={{ display: 'none' }}>
            <details style={{ borderTop: '1px solid rgba(247,243,236,.15)' }}>
              <summary style={summary}>Services<span style={{ fontSize: 18, color: 'rgba(247,243,236,.6)' }}>+</span></summary>
              <div style={{ display: 'grid', gap: 14, padding: '0 0 22px', fontSize: 16 }}>{SERVICE_ITEMS.map((i) => <Link key={i.key} href={i.href} style={mobLink}>{i.full}</Link>)}</div>
            </details>
            <details style={{ borderTop: '1px solid rgba(247,243,236,.15)' }}>
              <summary style={summary}>Company<span style={{ fontSize: 18, color: 'rgba(247,243,236,.6)' }}>+</span></summary>
              <div style={{ display: 'grid', gap: 14, padding: '0 0 22px', fontSize: 16 }}>{COMPANY.map((i) => <Link key={i.label} href={i.href} style={mobLink}>{i.label}</Link>)}</div>
            </details>
            <details open style={{ borderTop: '1px solid rgba(247,243,236,.15)', borderBottom: '1px solid rgba(247,243,236,.15)' }}>
              <summary style={summary}>Contact<span style={{ fontSize: 18, color: 'rgba(247,243,236,.6)' }}>+</span></summary>
              <div style={{ display: 'grid', gap: 12, padding: '0 0 22px', fontSize: 16, color: 'rgba(247,243,236,.85)' }}>
                <a href={CONTACT.phoneHref} style={mobLink}>{CONTACT.phone}</a>
                <a href={`mailto:${CONTACT.email}`} style={mobLink}>{CONTACT.email}</a>
                <span style={{ lineHeight: 1.5 }}>{CONTACT.address1}<br />{CONTACT.address2}</span>
              </div>
            </details>
          </div>

          {/* desktop columns */}
          <div data-g3="1" data-desk-block="1" data-seq="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40 }}>
            <div style={{ display: 'grid', gap: 12, alignContent: 'start', fontSize: 15 }}>
              <span className="eyebrow eyebrow-gold" style={{ fontSize: 11, marginBottom: 6 }}>Services</span>
              {SERVICE_ITEMS.map((i) => <Link key={i.key} href={i.href} className="footer-link">{i.full}</Link>)}
            </div>
            <div style={{ display: 'grid', gap: 12, alignContent: 'start', fontSize: 15 }}>
              <span className="eyebrow eyebrow-gold" style={{ fontSize: 11, marginBottom: 6 }}>Company</span>
              {COMPANY.map((i) => <Link key={i.label} href={i.href} className="footer-link">{i.label}</Link>)}
            </div>
            <div style={{ display: 'grid', gap: 12, alignContent: 'start', fontSize: 15 }}>
              <span className="eyebrow eyebrow-gold" style={{ fontSize: 11, marginBottom: 6 }}>Visit</span>
              <span style={{ color: 'rgba(247,243,236,.8)', lineHeight: 1.55 }}>{CONTACT.address1}<br />{CONTACT.address2}</span>
              <a href={CONTACT.phoneHref} className="footer-link">{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="footer-link">{CONTACT.email}</a>
              <span style={{ color: 'rgba(247,243,236,.5)', fontSize: 13 }}>{CONTACT.hours}</span>
            </div>
          </div>
        </div>
        <div data-reveal="3" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid rgba(247,243,236,.15)', fontSize: 12, color: 'rgba(247,243,236,.5)' }}>
          <span>© 2026 Primeo Property Group Pty Ltd · Licensed Real Estate Agency QLD</span>
          <div style={{ display: 'flex', gap: 24 }}><a href="#" className="footer-link" style={{ color: 'rgba(247,243,236,.5)' }}>Privacy</a><a href="#" className="footer-link" style={{ color: 'rgba(247,243,236,.5)' }}>Terms</a></div>
        </div>
      </div>
    </footer>
  );
}
