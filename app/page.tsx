import type { Metadata } from 'next';
import Link from 'next/link';
import { Newsreader } from 'next/font/google';
import CountUp from '@/components/CountUp';
import HeroVideo from '@/components/HeroVideo';
import { ImageSlot } from '@/components/ImageSlot';
import PinnedSteps from '@/components/PinnedSteps';
import Testimonials, { type Slide } from '@/components/Testimonials';
import RatingBadge from '@/components/RatingBadge';
import Faq from '@/components/Faq';
import { SERVICES, PROPERTIES, JOURNEY, TRUST, ARTICLES, IMAGES, HOME_FAQ } from '@/lib/data';
import { FEATURED, monthYear } from '@/lib/reviews';
import { SLOTS } from '@/lib/slots';
import { altFromLabel } from '@/lib/alt';
import { SITE } from '@/config/site';
import { pageMeta, HOME_TITLE, HOME_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = pageMeta({ title: HOME_TITLE, absolute: true, description: HOME_DESCRIPTION, path: '/' });

// The homepage FAQ as FAQPage structured data (search engines and answer engines quote from it).
const FAQ_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQ.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
}).replace(/</g, '\\u003c');

const { stats: S } = SITE;

// The serif italic, for the last word of the hero headline. The layout loads the upright face only.
const serifItalic = Newsreader({ subsets: ['latin'], style: ['italic'], axes: ['opsz'], variable: '--font-serif-italic', display: 'swap' });

// Headline figures for the hero band. Each counts up once the intro cover lifts; `em` is the gold
// suffix, kept outside the counter so it holds its colour.
const HERO_FACTS = [
  { v: S.securedValue.short, em: '+', l: 'Property secured' },
  { v: String(S.purchases), em: '+', l: 'Purchases completed' },
  { v: String(S.yearsInMarket), em: ' yrs', l: 'In the market' },
  { v: '100', em: '%', l: 'Independent' },
];

const STATS = [
  { v: S.purchases, suf: '+', label: 'Purchases completed', sub: 'For home buyers and investors, on and off market' },
  // "1 in 3": the leading number counts up, the rest is its suffix
  { v: parseInt(S.offMarketShare, 10), suf: S.offMarketShare.replace(/^\d+/, ''), label: 'Secured off-market', sub: 'Never advertised on a public portal' },
  { v: S.yearsInMarket, suf: '', label: 'Years in the market', sub: `Acting for buyers since ${S.foundedYear}` },
  { v: 100, suf: '%', label: 'Independent', sub: 'Engaged by the buyer, never paid by a vendor' },
];

// Investment, off-market and advisory are chapters of the Buyer Agency page, so their cards deep-link to
// those anchors. Their photos live in lib/slots.ts.
const SERVICE_CARDS = [
  { key: 'buyers', href: '/buyers', n: '01', title: 'Buyer Agency', text: 'Independent search, due diligence and negotiation, conducted solely in your interest.', ph: 'BUYERS_HERO', src: SLOTS.BUYERS_HERO, span: 4 },
  { key: 'investing', href: '/buyers#investing', n: '02', title: 'Property Investment', text: 'Research-led acquisition and analysis for investors.', ph: 'PROPERTY_INVESTMENT_HERO', src: SLOTS.PROPERTY_INVESTMENT_HERO, span: 2 },
  { key: 'off-market', href: '/buyers#off-market', n: '03', title: 'Off-Market Properties', text: 'Access to opportunities beyond the major portals through established agent networks.', ph: 'OFF_MARKET_PROPERTY_IMAGE', src: SLOTS.OFF_MARKET_PROPERTY_IMAGE, span: 2 },
  { key: 'advisory', href: '/buyers#advisory', n: '04', title: 'Property Advisory', text: 'Independent counsel on value, strategy and negotiation.', ph: 'PROPERTY_ADVISORY_MEETING', src: SLOTS.PROPERTY_ADVISORY_MEETING, span: 2 },
  { key: 'land', href: '/land', n: '05', title: 'House & Land', text: 'New developments and packages in established growth corridors.', ph: 'Photo: new estate streetscape', src: SERVICES.land.src, span: 2 },
];

const SLIDES: Slide[] = FEATURED.map((r) => ({ id: r.id, name: r.name, rating: r.rating, quote: r.quote ?? r.text, when: monthYear(r.date) }));

export default function Home() {
  const [lead, ...more] = ARTICLES;
  return (
    <>
      {/* 1 HERO */}
      <section data-hero="1" style={{ position: 'relative', minHeight: '100vh', display: 'flex', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', padding: '110px 0 0' }}>
        <div data-parallax="1" style={{ position: 'absolute', inset: '-10% 0', willChange: 'transform' }}>
          <div data-zoom="1" style={{ position: 'absolute', inset: 0, background: '#1C2F52' }}><HeroVideo alt="Aerial view of waterfront homes" /></div>
        </div>
        <div className="ov-hero-video" />
        {/* copy is centred in the space above the facts band, clear of the busy lower frame */}
        <div style={{ position: 'relative', width: '100%', display: 'grid', gridTemplateRows: '1fr auto', gap: 40 }}>
          <div data-pad="1" className="container" style={{ width: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center', pointerEvents: 'none' }}>
            <div data-hero-content="1" style={{ maxWidth: 960, display: 'grid', gap: 26, justifyItems: 'center', textAlign: 'center', pointerEvents: 'auto' }}>
              <div data-reveal="0" style={{ display: 'grid', justifyItems: 'center', gap: 18 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold" style={{ letterSpacing: '.2em' }}>Property Group</p></div>
              <h1 data-hero-h="1" className={`serif ${serifItalic.variable}`} style={{ fontSize: 72, lineHeight: 1.04, letterSpacing: '-.02em', textShadow: '0 2px 28px rgba(0,0,0,.45)' }}>
                <span data-line="1" className="lines" style={{ paddingBottom: '.06em' }}><span>Independent advice</span></span>
                {/* the lines are block-level spans, so the heading's text needs its own space between them */}
                {' '}
                <span data-line="2" className="lines" style={{ paddingBottom: '.06em' }}><span>for every property <em style={{ fontFamily: 'var(--font-serif-italic), var(--font-serif), serif', fontStyle: 'italic', color: '#C6A15B' }}>decision.</em></span></span>
              </h1>
              <p data-reveal="3" data-hero-lead="1" style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(247,243,236,.9)', maxWidth: 580, textShadow: '0 1px 16px rgba(0,0,0,.5)' }}>{SITE.name} is an independent buyer’s agency in Brisbane, founded in {S.foundedYear} by {SITE.founder.name}. We act only for buyers across South East Queensland, with over {S.securedValue.long} in property secured.</p>
              <div data-hero-cta="1" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
                <span data-reveal="5" style={{ display: 'grid' }}><Link href="/contact" className="btn btn-gold">Book a Consultation</Link></span>
                <span data-reveal="7" style={{ display: 'grid' }}><a href="#services" className="btn btn-outline-light">Explore Services</a></span>
              </div>
              <span data-reveal="9" style={{ display: 'grid', justifyItems: 'center', marginTop: 6 }}><RatingBadge tone="dark" size="md" /></span>
            </div>
          </div>
          <div data-reveal="5" data-desk-block="1" className="hero-band">
            <div data-pad="1" className="container" style={{ display: 'grid', gridTemplateColumns: `repeat(${HERO_FACTS.length},1fr)` }}>
              {HERO_FACTS.map((f) => (
                <div key={f.l} className="hero-fact">
                  <b><CountUp value={f.v} /><em>{f.em}</em></b>
                  <span>{f.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2 SERVICES SHOWCASE */}
      <section id="services" data-sec="1" className="sec" style={{ background: '#F7F3EC', scrollMarginTop: 72 }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 620 }}>
              <p className="eyebrow eyebrow-tan">What we do</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Five services. One independent team.</span></span></h2>
            </div>
            <p className="lead" style={{ maxWidth: 380 }}>From a first home to a growing portfolio, every engagement is guided by the same independent, evidence-led advice.</p>
          </div>
          <div data-seq="1" data-scroll-row="1" data-svc-grid="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 }}>
            {SERVICE_CARDS.map((c, i) => (
              <Link key={c.key} href={c.href} data-card="1" data-reveal={i} data-span="1" style={{ gridColumn: `span ${c.span}`, position: 'relative', display: 'block', height: 420, borderRadius: 8, overflow: 'hidden', background: '#3A4A66', color: '#F7F3EC' }}>
                <div data-card-img="1" className="fill"><ImageSlot src={c.src} alt="" placeholder={c.ph} tone="dark" sizes={`(max-width: 760px) 100vw, ${Math.round((c.span / 6) * 100)}vw`} /></div>
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

      {/* 3 SIGNATURE FIGURE: navy, like the buyer journey that follows, so a hairline closes the section */}
      <section data-sec="1" className="sec figure-sec" style={{ position: 'relative', overflow: 'hidden', background: '#0B1D3A', color: '#F7F3EC', borderTop: '1px solid rgba(198,161,91,.35)', borderBottom: '1px solid rgba(247,243,236,.14)' }}>
        <span className="figure-watermark" aria-hidden="true">PRIMEO</span>
        <div data-pad="1" data-g2="1" className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: 26, minWidth: 0 }}>
            <div data-reveal="0" style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span data-rule="1" className="rule" /><p className="eyebrow eyebrow-gold">Our track record since {S.foundedYear}</p></div>
            {/* the count-up sits inside the reveal wrapper: Motion skips [data-count] on elements it has already marked for reveal */}
            <div data-reveal="1"><span data-count={S.securedValue.amount} data-prefix="$" data-suffix="M+" className="serif big-figure">{S.securedValue.short}+</span></div>
            <h2 data-reveal="2" data-h2="1" className="h2" style={{ maxWidth: 560 }}><span data-line="1" className="lines"><span>in property secured for buyers and investors.</span></span></h2>
            <p data-reveal="3" style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(247,243,236,.75)', maxWidth: 520 }}>More than {S.securedValue.long} of residential property, purchased on and off market, with every acquisition negotiated on evidence rather than emotion. Licensed, independent and accountable to one party only: our client.</p>
            <Link href="/about" data-reveal="4" className="link-u light">About PRIMEO →</Link>
          </div>
          <div data-seq="1" className="cells dark" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {STATS.map((s) => (
              <div key={s.label} className="cell" style={{ gap: 14, padding: '34px 28px 30px' }}>
                <span data-count={s.v} data-suffix={s.suf} className="serif" style={{ fontSize: 56, lineHeight: 0.95, color: '#F7F3EC', letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums' }}>{s.v}{s.suf}</span>
                <div style={{ display: 'grid', gap: 4 }}><span style={{ fontSize: 15, fontWeight: 600, color: '#F7F3EC' }}>{s.label}</span><span style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(247,243,236,.6)' }}>{s.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 BUYER JOURNEY */}
      <PinnedSteps
        eyebrow="The buyer journey"
        title="From first conversation to keys in hand."
        blurb="Five structured stages, each concluding with a clear recommendation and the evidence behind it."
        steps={JOURNEY}
        footer={<Link href="/buyers" className="link-u light">How buyer agency works →</Link>}
      />

      {/* 5 FEATURED PROPERTIES: left out while PROPERTIES (lib/data.ts) is empty */}
      {PROPERTIES.length > 0 && (
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Featured properties</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Recently secured for our clients.</span></span></h2>
            </div>
            <Link href="/buyers" className="link-u">How we buy →</Link>
          </div>
          <div data-seq="1" data-g3="1" data-scroll-row="1" tabIndex={0} role="group" aria-label="Recently secured properties" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {PROPERTIES.map((p, i) => (
              <div key={p.id} data-card="1" data-reveal={i} className="card card-hover">
                <div className="media" style={{ aspectRatio: '4/3', background: '#E6E0D4' }}>
                  <div data-card-img="1" className="fill"><ImageSlot src={p.src} alt={altFromLabel(p.placeholder)} placeholder={p.placeholder} sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 33vw" /></div>
                  <span className="tag">{p.status}</span>
                  <div data-card-overlay="1" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 20px', background: 'linear-gradient(180deg,rgba(11,29,58,0),rgba(11,29,58,.85))', color: '#F7F3EC', opacity: 0, transform: 'translateY(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
                    <span style={{ fontSize: 13 }}>{p.agent}</span>
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
      )}

      {/* 6 WHY PRIMEO */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', borderBottom: '1px solid #E6E0D4' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}><ImageSlot src={IMAGES.why} alt="Consultant and clients reviewing a property report" placeholder="Photo: consultant and clients reviewing a property report" sizes="(max-width: 1000px) 100vw, 50vw" /></div>
            <div data-reveal="2" className="why-badge">
              <span className="serif"><CountUp value={S.securedValue.short} /><em>+</em></span>
              <span>Secured for clients</span>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Why PRIMEO</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Advice you can act on, informed by every side of the transaction.</span></span></h2>
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

      {/* 7 MARKET INSIGHTS: off until real article pages exist (SITE.features.marketInsights) */}
      {SITE.features.marketInsights && (
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Market insights</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>What we&apos;re watching in the market.</span></span></h2>
            </div>
            {SITE.links.insights && <Link href={SITE.links.insights} className="link-u">All insights →</Link>}
          </div>
          <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
            <Link href={lead.href} data-card="1" data-reveal="0" data-lead-card="1" style={{ position: 'relative', display: 'block', minHeight: 520, borderRadius: 8, overflow: 'hidden', background: '#3A4A66', color: '#F7F3EC' }}>
              <div data-card-img="1" className="fill"><ImageSlot src={lead.src} alt="" placeholder={lead.placeholder} tone="dark" sizes="(max-width: 1000px) 100vw, 60vw" /></div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,29,58,0) 30%,rgba(11,29,58,.92) 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 36, display: 'grid', gap: 12, pointerEvents: 'none' }}>
                <div className="eyebrow eyebrow-gold" style={{ display: 'flex', gap: 12, fontSize: 11 }}><span>{lead.cat}</span><span>·</span><span>{lead.date}</span></div>
                <h3 className="serif" style={{ fontSize: 34, lineHeight: 1.15, maxWidth: 560 }}>{lead.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(247,243,236,.8)', maxWidth: 520 }}>{lead.excerpt}</p>
              </div>
            </Link>
            <div style={{ display: 'grid', gap: 24 }}>
              {more.map((a, i) => (
                <Link key={a.id} href={a.href} data-card="1" data-reveal={i} data-mini-card="1" className="card card-hover soft" style={{ gridTemplateColumns: '1fr 1.2fr', gap: 0, color: '#0B1D3A' }}>
                  <div className="media" style={{ minHeight: 220, background: '#E6E0D4' }}><div data-card-img="1" className="fill"><ImageSlot src={a.src} alt="" placeholder={a.placeholder} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 45vw, 18vw" /></div></div>
                  <div style={{ padding: 26, display: 'grid', gap: 10, alignContent: 'center' }}>
                    <div className="eyebrow eyebrow-tan eyebrow-sm" style={{ display: 'flex', gap: 10 }}><span>{a.cat}</span><span>·</span><span>{a.date}</span></div>
                    <h3 className="serif" style={{ fontSize: 22, lineHeight: 1.2 }}>{a.title}</h3>
                    <span className="link-u sm">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 8 GOOGLE REVIEWS: featured reviews carousel (FEATURED in lib/reviews.ts) */}
      <section data-sec="1" className="sec" style={{ background: '#0B1D3A', color: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'center' }}>
          <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#3A4A66' }}><ImageSlot src={IMAGES.clients} alt="Clients on the verandah of their new home" placeholder="Photo: clients on the verandah of their new home" tone="dark" sizes="(max-width: 1000px) 100vw, 40vw" /></div>
          <Testimonials items={SLIDES} badge={<RatingBadge tone="dark" size="md" to="google" label="full" />} />
        </div>
      </section>

      {/* 9 FAQ: sticky heading beside the accordion, as on the Buyer Agency page */}
      <section id="faq" data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', scrollMarginTop: 72 }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }}>
          <div data-sticky="1" className="stick stick-low" style={{ display: 'grid', gap: 28 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{HOME_FAQ.eyebrow}</p>
              <h2 data-h2="1" className="h2" style={{ maxWidth: 420 }}><span data-line="1" className="lines"><span>{HOME_FAQ.title}</span></span></h2>
              <p className="lead" style={{ maxWidth: 400 }}>{HOME_FAQ.text}</p>
            </div>
            <Link href="/contact" data-reveal="2" className="btn btn-navy btn-fit">{HOME_FAQ.button}</Link>
          </div>
          <Faq items={HOME_FAQ.items} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_LD }} />
      </section>
    </>
  );
}
