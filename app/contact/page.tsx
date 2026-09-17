import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { ImageSlot } from '@/components/ImageSlot';
import { ContactForm } from '@/components/Forms';
import { CONTACT } from '@/lib/data';

export const metadata: Metadata = { title: 'Contact', description: 'Call, email or visit. Every enquiry is answered by a PRIMEO agent.' };

const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16, padding: '20px 0', borderTop: '1px solid #E6E0D4', color: '#0B1D3A', alignItems: 'baseline' };
const big: React.CSSProperties = { fontSize: 24 };
const small: React.CSSProperties = { fontSize: 13, color: '#4A4C55', lineHeight: 1.5 };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk about your next move." lead="Call, email or visit. Every enquiry is answered by a PRIMEO agent, not a call centre." />

      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 64, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 36 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Enquiry</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Tell us what you&apos;re trying to achieve.</span></span></h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: '#4A4C55' }}>We reply within one business day and every enquiry is read by an agent.</p>
            </div>
            <div style={{ display: 'grid' }}>
              <a href={CONTACT.phoneHref} data-reveal="1" style={row}><span className="eyebrow eyebrow-tan">Phone</span><span style={{ display: 'grid', gap: 2 }}><span className="serif" style={big}>{CONTACT.phone}</span><span style={small}>{CONTACT.hours}</span></span></a>
              <a href={`mailto:${CONTACT.email}`} data-reveal="2" style={row}><span className="eyebrow eyebrow-tan">Email</span><span style={{ display: 'grid', gap: 2 }}><span className="serif" style={{ ...big, wordBreak: 'break-word' }}>{CONTACT.email}</span><span style={small}>Replies within one business day</span></span></a>
              <div data-reveal="3" style={row}><span className="eyebrow eyebrow-tan">Office</span><span style={{ display: 'grid', gap: 2 }}><span className="serif" style={big}>Brisbane CBD</span><span style={small}>{CONTACT.address1}, {CONTACT.address2}</span></span></div>
              <div data-reveal="4" style={{ ...row, borderBottom: '1px solid #E6E0D4' }}><span className="eyebrow eyebrow-tan">Areas</span><span style={{ display: 'grid', gap: 2 }}><span className="serif" style={big}>Brisbane &amp; South East QLD</span><span style={small}>Gold Coast · Sunshine Coast · Ipswich · Logan · Moreton Bay</span></span></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section data-sec="1" style={{ padding: '0 0 96px', background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
          <div data-mask="1" className="media" style={{ aspectRatio: '16/9', borderRadius: 8, background: '#E6E0D4' }}><ImageSlot placeholder="Map or office exterior" /></div>
          <div data-reveal="1" style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', padding: 36, display: 'grid', alignContent: 'end', gap: 12, minHeight: 320 }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}><ImageSlot tone="dark" /></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,29,58,0),rgba(11,29,58,.95))', pointerEvents: 'none' }} />
            <p className="eyebrow eyebrow-gold" style={{ position: 'relative' }}>Visit us</p>
            <p className="serif" style={{ position: 'relative', fontSize: 26, lineHeight: 1.2 }}>Coffee is on us. Drop in for a no-obligation chat about your brief.</p>
            <a href="#" className="btn btn-outline-light btn-fit" style={{ position: 'relative' }}>Get directions</a>
          </div>
        </div>
      </section>
    </>
  );
}
