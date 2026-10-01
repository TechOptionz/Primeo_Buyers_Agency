import Link from 'next/link';
import { SERVICE_ITEMS } from '@/lib/data';
import { SITE, telHref, addressLines } from '@/config/site';
import { Logo } from '@/components/Logo';
import RatingBadge from '@/components/RatingBadge';

// Market insights and Careers are listed only once config/site.ts has a URL for them.
const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Client reviews', href: '/reviews' },
  { label: 'Market insights', href: SITE.links.insights },
  { label: 'Careers', href: SITE.links.careers },
  { label: 'Contact', href: '/contact' },
].filter((i) => i.href);

// One icon per profile that has a URL in config/site.ts; with none set, the row is not rendered.
const SOCIAL = [
  { label: 'Instagram', href: SITE.social.instagram, d: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></> },
  { label: 'LinkedIn', href: SITE.social.linkedin, d: <path d="M6 9v12M6 5v.5M11 21v-7a3 3 0 0 1 6 0v7M11 9v12" /> },
  { label: 'Facebook', href: SITE.social.facebook, d: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /> },
  { label: 'YouTube', href: SITE.social.youtube, d: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></> },
].filter((s) => s.href);

const ADDRESS = addressLines();
const address = ADDRESS.map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>);

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
            <Link href="/" data-reveal="0" className="flogo" aria-label="PRIMEO, home">
              <Logo variant="lg" />
            </Link>
            <p data-reveal="1" style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(247,243,236,.65)', maxWidth: 360 }}>Independent buyer agency, property investment, off-market sourcing and property advisory.</p>
            <div data-reveal="2"><RatingBadge tone="dark" size="sm" to="google" /></div>
            {SOCIAL.length > 0 && (
              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIAL.map((s, i) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`PRIMEO on ${s.label}`} className="social" data-reveal={i + 2}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{s.d}</svg>
                  </a>
                ))}
              </div>
            )}
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
                <a href={telHref(SITE.phone)} style={mobLink}>{SITE.phone}</a>
                <a href={`mailto:${SITE.email}`} style={mobLink}>{SITE.email}</a>
                <span style={{ lineHeight: 1.5 }}>{address}</span>
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
              <span style={{ color: 'rgba(247,243,236,.8)', lineHeight: 1.55 }}>{address}</span>
              <a href={telHref(SITE.phone)} className="footer-link">{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="footer-link">{SITE.email}</a>
              <span style={{ color: 'rgba(247,243,236,.5)', fontSize: 13 }}>{SITE.hours.full}</span>
            </div>
          </div>
        </div>
        <div data-reveal="3" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid rgba(247,243,236,.15)', fontSize: 12, color: 'rgba(247,243,236,.5)' }}>
          <span>© {new Date().getFullYear()} {SITE.legalName} · {SITE.licenceLabel}{SITE.licenceNumber && ` · Licence ${SITE.licenceNumber}`}</span>
          <div style={{ display: 'flex', gap: 24 }}><Link href="/privacy" className="footer-link" style={{ color: 'rgba(247,243,236,.5)' }}>Privacy</Link><Link href="/terms" className="footer-link" style={{ color: 'rgba(247,243,236,.5)' }}>Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
