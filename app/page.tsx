import Link from 'next/link';
import { ImageSlot } from '@/components/ImageSlot';
import PinnedSteps from '@/components/PinnedSteps';
import Testimonials from '@/components/Testimonials';
import { SERVICE_ITEMS, SERVICES, PROPERTIES, JOURNEY, TRUST, ARTICLES, IMAGES } from '@/lib/data';

const STATS = [
  { v: 350, suf: '+', label: 'Properties secured', sub: 'For buyers and investors, on and off market' },
  { v: 14, suf: '', label: 'Years of experience', sub: 'Brisbane market, every cycle since 2012' },
  { v: 60, suf: '+', label: 'Suburbs served', sub: 'From New Farm to the Moreton Bay corridor' },
  { v: 98, suf: '%', label: 'Client satisfaction', sub: 'Would recommend PRIMEO to family' },
];

const SERVICE_CARDS = [
  { key: 'buyers', n: '01', title: 'Buyer Agency', text: 'Independent search, due diligence and negotiation on your side of the table.', ph: 'Photo: agent and buyers at a Queenslander front gate, golden hour', span: 4 },
  { key: 'selling', n: '02', title: 'Selling', text: 'Campaigns that reach the right buyers and protect your price.', ph: 'Photo: styled living room, wide', span: 2 },
  { key: 'rentals', n: '03', title: 'Rentals', text: 'Management that keeps landlords informed and tenants looked after.', ph: 'Photo: modern apartment interior', span: 2 },
  { key: 'commercial', n: '04', title: 'Commercial', text: 'Acquisition, leasing and sales for offices, retail and industrial.', ph: 'Photo: Brisbane office tower facade', span: 2 },
  { key: 'land', n: '05', title: 'House & Land', text: 'New developments and packages in growth corridors.', ph: 'Photo: new estate streetscape', span: 2 },
];

export default function Home() {
  const [lead, ...more] = ARTICLES;
  return (
    <>
      {/* 1 HERO */}
      <section data-hero="1" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', padding: '160px 0 0' }}>
        <div data-parallax="1" style={{ position: 'absolute', inset: '-10% 0', willChange: 'transform' }}>
          <div data-zoom="1" data-bg-slot="1" style={{ position: 'absolute', inset: 0, background: '#1C2F52' }}><ImageSlot src={IMAGES.hero} alt="Premium Queensland home at dusk" tone="dark" /></div>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,29,58,.5) 0%,rgba(11,29,58,.2) 40%,rgba(11,29,58,.92) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', width: '100%', display: 'grid', gap: 64 }}>
          <div data-pad="1" className="container" style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end', pointerEvents: 'none' }}>
            <div data-hero-content="1" style={{ maxWidth: 860, display: 'grid', gap: 26, pointerEvents: 'auto' }}>
              <div data-reveal="0" style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold" style={{ letterSpacing: '.2em' }}>Property Group · Brisbane &amp; Queensland</p></div>
              <h1 data-hero-h="1" className="serif" style={{ fontSize: 84, lineHeight: 1, letterSpacing: '-.02em' }}>
                <span data-line="1" className="lines" style={{ paddingBottom: '.06em' }}><span>Property, handled</span></span>
                <span data-line="2" className="lines" style={{ paddingBottom: '.06em' }}><span>with <em style={{ fontStyle: 'italic', color: '#C6A15B' }}>strategy.</em></span></span>
              </h1>
              <p data-reveal="3" data-hero-lead="1" style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(247,243,236,.82)', maxWidth: 540 }}>Buying, selling, leasing and commercial advisory for people who expect clear advice and better outcomes.</p>
              <div data-reveal="4" data-hero-cta="1" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6 }}>
                <Link href="/contact" className="btn btn-gold">Book a strategy call</Link>
                <Link href="/buyers" className="btn btn-outline-light">Explore services</Link>
              </div>
            </div>
            <div data-desk="1" data-reveal="6" style={{ display: 'grid', gap: 8, justifyItems: 'end', textAlign: 'right', color: 'rgba(247,243,236,.75)', fontSize: 13, lineHeight: 1.6, pointerEvents: 'auto' }}>
              <span className="serif" style={{ fontSize: 22, color: '#F7F3EC' }}>Licensed · Independent</span>
              <span>Buyer agency · Sales · Rentals<br />Commercial · House &amp; Land</span>
            </div>
          </div>
          <div data-reveal="5" data-desk-block="1" className="hero-band">
            <div data-pad="1" data-scroll-row="1" className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
              {SERVICE_ITEMS.map((s, i) => (
                <Link key={s.key} href={s.href} className="hero-band-link">
                  <span className="eyebrow eyebrow-gold eyebrow-sm">{String(i + 1).padStart(2, '0')}</span>
                  <span className="serif" style={{ fontSize: 19 }}>{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2 TRUST & STATS */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-reveal="0" data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'end' }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Trusted across South East Queensland</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Fourteen years of results, one recommendation at a time.</span></span></h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: '#4A4C55', maxWidth: 440, justifySelf: 'end' }}>Licensed, independent and accountable to one party only: the client in front of us. The numbers below are drawn from settled transactions since 2012.</p>
          </div>
          <div data-seq="1" data-g4="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, borderTop: '1px solid #E6E0D4', borderRight: '1px solid #E6E0D4' }}>
            {STATS.map((s, i) => (
              <div key={s.label} data-reveal={i} style={{ display: 'grid', gap: 14, padding: '32px 28px 28px', borderLeft: '1px solid #E6E0D4', position: 'relative' }}>
                <span style={{ position: 'absolute', top: -1, left: -1, width: 56, height: 2, background: '#C6A15B' }} />
                <span data-count={s.v} data-suffix={s.suf} className="serif" style={{ fontSize: 64, lineHeight: 0.95, color: '#0B1D3A', letterSpacing: '-.02em' }}>0</span>
                <div style={{ display: 'grid', gap: 4 }}><span style={{ fontSize: 15, fontWeight: 600, color: '#0B1D3A' }}>{s.label}</span><span style={{ fontSize: 13, lineHeight: 1.5, color: '#4A4C55' }}>{s.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 SERVICES SHOWCASE */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 620 }}>
              <p className="eyebrow eyebrow-tan">What we do</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Five services. One team in your corner.</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 380 }}>Choose the service you need today; we bring the rest of the group when it helps.</p>
          </div>
          <div data-seq="1" data-scroll-row="1" data-svc-grid="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 }}>
            {SERVICE_CARDS.map((c, i) => (
              <Link key={c.key} href={`/${c.key}`} data-card="1" data-reveal={i} data-span="1" style={{ gridColumn: `span ${c.span}`, position: 'relative', display: 'block', height: 420, borderRadius: 8, overflow: 'hidden', background: '#3A4A66', color: '#F7F3EC' }}>
                <div data-card-img="1" className="fill"><ImageSlot src={SERVICES[c.key]?.src} alt={c.title} placeholder={c.ph} tone="dark" /></div>
                <div className="ov-card" />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 30, display: 'grid', gap: 10, pointerEvents: 'none' }}>
                  <span className="eyebrow eyebrow-gold">{c.n}</span>
                  <h3 className="serif" style={{ fontSize: 30, lineHeight: 1.1 }}>{c.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(247,243,236,.8)', maxWidth: 420 }}>{c.text}</p>
                  <div className="grow"><span data-card-overlay="1" className="eyebrow eyebrow-gold" style={{ display: 'block', opacity: 0, transform: 'translateY(8px)', letterSpacing: '.14em', paddingTop: 6 }}>Explore →</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 BUYER JOURNEY */}
      <PinnedSteps
        eyebrow="The buyer journey"
        title="From first conversation to keys in hand."
        blurb="Five calm steps. Scroll to follow the journey; you make one decision, with all the evidence in front of you."
        steps={JOURNEY}
       
        footer={<Link href="/buyers" className="link-u light">How buyer agency works →</Link>}
      />

      {/* 5 FEATURED PROPERTIES */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Featured properties</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Recently listed and secured.</span></span></h2>
            </div>
            <Link href="/buyers" className="link-u">View all properties →</Link>
          </div>
          <div data-seq="1" data-g3="1" data-scroll-row="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {PROPERTIES.map((p, i) => (
              <div key={p.id} data-card="1" data-reveal={i} className="card card-hover" style={{ cursor: 'pointer' }}>
                <div className="media" style={{ aspectRatio: '4/3', background: '#E6E0D4' }}>
                  <div data-card-img="1" className="fill"><ImageSlot src={p.src} alt={p.address} placeholder={p.placeholder} /></div>
                  <span className="tag">{p.status}</span>
                  <div data-card-overlay="1" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 20px', background: 'linear-gradient(180deg,rgba(11,29,58,0),rgba(11,29,58,.85))', color: '#F7F3EC', opacity: 0, transform: 'translateY(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
                    <span style={{ fontSize: 13 }}>{p.agent}</span><span className="eyebrow eyebrow-gold" style={{ fontSize: 11, letterSpacing: '.14em' }}>View →</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 8, padding: '22px 24px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                    <p className="serif" style={{ fontSize: 26, lineHeight: 1.1 }}>{p.price}</p>
                    <span className="eyebrow eyebrow-tan eyebrow-sm">{p.type}</span>
                  </div>
                  <p style={{ fontSize: 15, color: '#4A4C55' }}>{p.address}</p>
                  <div style={{ display: 'flex', gap: 18, fontSize: 13, color: '#3A4A66', paddingTop: 12, borderTop: '1px solid #E6E0D4', marginTop: 6 }}><span>{p.beds} bed</span><span>{p.baths} bath</span><span>{p.cars} car</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 WHY PRIMEO */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}><ImageSlot src={IMAGES.why} alt="Consultant and clients reviewing a property report" placeholder="Photo: consultant and clients reviewing a property report" /></div>
            <div data-reveal="2" data-overlap="1" className="callout"><span className="serif" style={{ fontSize: 38, lineHeight: 1 }}>1 in 3</span><span style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(247,243,236,.75)' }}>properties we secure for buyers never reach a public portal.</span></div>
          </div>
          <div style={{ display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Why PRIMEO</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Advice you can act on, from people who work every side of the deal.</span></span></h2>
            </div>
            <div style={{ display: 'grid' }}>
              {TRUST.map((t, i) => (
                <div key={t.n} data-reveal={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, padding: '20px 0', borderTop: '1px solid #E6E0D4' }}>
                  <span className="num-ring">{t.n}</span>
                  <div style={{ display: 'grid', gap: 5 }}><h3 style={{ fontSize: 17, fontWeight: 600 }}>{t.title}</h3><p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{t.text}</p></div>
                </div>
              ))}
            </div>
            <Link href="/about" data-reveal="4" className="btn btn-navy btn-fit">About PRIMEO</Link>
          </div>
        </div>
      </section>

      {/* 7 MARKET INSIGHTS */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Market insights</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>What we&apos;re watching in Brisbane.</span></span></h2>
            </div>
            <a href="#" className="link-u">All insights →</a>
          </div>
          <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
            <a href="#" data-card="1" data-reveal="0" data-lead-card="1" style={{ position: 'relative', display: 'block', minHeight: 520, borderRadius: 8, overflow: 'hidden', background: '#3A4A66', color: '#F7F3EC' }}>
              <div data-card-img="1" className="fill"><ImageSlot src={lead.src} alt={lead.title} placeholder={lead.placeholder} tone="dark" /></div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,29,58,0) 30%,rgba(11,29,58,.92) 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 36, display: 'grid', gap: 12, pointerEvents: 'none' }}>
                <div className="eyebrow eyebrow-gold" style={{ display: 'flex', gap: 12, fontSize: 11 }}><span>{lead.cat}</span><span>·</span><span>{lead.date}</span></div>
                <h3 className="serif" style={{ fontSize: 34, lineHeight: 1.15, maxWidth: 560 }}>{lead.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(247,243,236,.8)', maxWidth: 520 }}>{lead.excerpt}</p>
              </div>
            </a>
            <div style={{ display: 'grid', gap: 24 }}>
              {more.map((a, i) => (
                <a key={a.id} href="#" data-card="1" data-reveal={i} data-mini-card="1" className="card card-hover soft" style={{ gridTemplateColumns: '1fr 1.2fr', gap: 0, color: '#0B1D3A' }}>
                  <div className="media" style={{ minHeight: 220, background: '#E6E0D4' }}><div data-card-img="1" className="fill"><ImageSlot src={a.src} alt={a.title} placeholder={a.placeholder} /></div></div>
                  <div style={{ padding: 26, display: 'grid', gap: 10, alignContent: 'center' }}>
                    <div className="eyebrow eyebrow-tan eyebrow-sm" style={{ display: 'flex', gap: 10 }}><span>{a.cat}</span><span>·</span><span>{a.date}</span></div>
                    <h3 className="serif" style={{ fontSize: 22, lineHeight: 1.2 }}>{a.title}</h3>
                    <span className="link-u sm">Read →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 TESTIMONIALS */}
      <section data-sec="1" className="sec" style={{ background: '#0B1D3A', color: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'center' }}>
          <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#3A4A66' }}><ImageSlot src={IMAGES.clients} alt="Clients on the verandah of their new home" placeholder="Photo: clients on the verandah of their new home" tone="dark" /></div>
          <Testimonials />
        </div>
      </section>
    </>
  );
}
