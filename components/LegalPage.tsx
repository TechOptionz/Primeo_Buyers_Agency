import Link from 'next/link';
import { LEGAL_CONTACT, type LegalDoc } from '@/lib/legal';

const num = (i: number) => String(i + 1).padStart(2, '0');

/**
 * Privacy policy and terms of use: a compact navy hero with no photo, then a sticky contents list
 * beside the numbered sections (copy in lib/legal.ts). `other` links to the sister document at the foot.
 */
export default function LegalPage({ doc, other }: { doc: LegalDoc; other: { text: string; label: string; href: string } }) {
  const toc = [...doc.sections.map((s) => ({ id: s.id, title: s.title })), { id: 'contact', title: 'Contact us' }];
  return (
    <>
      <section data-hero="1" className="legal-hero">
        <svg className="legal-rings" viewBox="0 0 240 240" fill="none" aria-hidden="true"><circle cx="240" cy="240" r="80" /><circle cx="240" cy="240" r="150" /><circle cx="240" cy="240" r="220" /></svg>
        <div data-pad="1" data-hero-content="1" className="container" style={{ position: 'relative', display: 'grid', gap: 22 }}>
          <div data-reveal="0" style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold" style={{ letterSpacing: '.2em' }}>Legal</p></div>
          <h1 data-hero-h="1" className="serif" style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: '-.02em' }}>
            <span data-line="1" className="lines"><span>{doc.title}</span></span>
          </h1>
          <p data-reveal="2" data-hero-lead="1" style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(247,243,236,.82)', maxWidth: 600 }}>{doc.lead}</p>
          <p data-reveal="3" className="eyebrow" style={{ fontSize: 11, color: 'rgba(247,243,236,.55)' }}>Last updated {doc.updated}</p>
        </div>
      </section>

      <section data-sec="1" className="sec" style={{ background: '#fff' }}>
        <div data-pad="1" data-g2="1" className="container legal" style={{ display: 'grid', gridTemplateColumns: '280px minmax(0,1fr)', gap: 96, alignItems: 'start' }}>
          <nav data-sticky="1" data-reveal="0" className="stick legal-toc" aria-label="On this page">
            <span className="eyebrow eyebrow-tan">On this page</span>
            <ol>
              {toc.map((s, i) => (
                <li key={s.id}><a href={`#${s.id}`}><span>{num(i)}</span>{s.title}</a></li>
              ))}
            </ol>
          </nav>

          <div className="legal-body">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} data-reveal="0" className="legal-sec">
                <h2 className="serif legal-h"><span className="legal-n">{num(i)}</span>{s.title}</h2>
                {s.body.map((b, j) => (typeof b === 'string'
                  ? <p key={j}>{b}</p>
                  : <ul key={j}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>))}
              </section>
            ))}

            <section id="contact" data-reveal="0" className="legal-sec">
              <h2 className="serif legal-h"><span className="legal-n">{num(doc.sections.length)}</span>Contact us</h2>
              <p>{doc.contact}</p>
              <div style={{ display: 'grid', marginTop: 8 }}>
                {LEGAL_CONTACT.map((c) => (
                  <div key={c.label} className="brief-row">
                    <span className="eyebrow eyebrow-tan">{c.label}</span>
                    {c.href
                      ? <a href={c.href} className="serif legal-contact">{c.value}</a>
                      : <span style={{ fontSize: 16, lineHeight: 1.6, color: '#4A4C55' }}>{c.value}</span>}
                  </div>
                ))}
              </div>
            </section>

            <div data-reveal="0" className="legal-foot">
              <p>{other.text}</p>
              <Link href={other.href} className="link-u">{other.label} →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
