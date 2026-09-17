import Link from 'next/link';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { ImageSlot } from '@/components/ImageSlot';
import { VALUES, TEAM, IMAGES } from '@/lib/data';

export const metadata: Metadata = { title: 'About', description: 'A Brisbane property group working across buying, selling, rentals, commercial and new homes.' };

const FACTS = [
  { v: 2012, label: 'Founded in Brisbane' },
  { v: 12, label: 'Licensed agents' },
  { v: 5, label: 'Services under one roof' },
  { v: 420, pre: '$', suf: 'M', label: 'Transacted for clients' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About PRIMEO"
        title="Property advice built on evidence, not hype."
        lead="A Brisbane property group working across buying, selling, rentals, commercial and new homes."
        src={IMAGES.aboutHero}
        band={
          <div data-pad="1" data-g4="1" className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {FACTS.map((f) => (
              <div key={f.label} className="fact">
                <span data-count={f.v} data-prefix={f.pre} data-suffix={f.suf} className="serif" style={{ fontSize: 30, lineHeight: 1 }}>0</span>
                <span style={{ fontSize: 13, color: 'rgba(247,243,236,.7)' }}>{f.label}</span>
              </div>
            ))}
          </div>
        }
      />

      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: 26 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">Our story</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>It started with buyers who had no one on their side.</span></span></h2>
            </div>
            <div data-reveal="1" style={{ display: 'grid', gap: 18, fontSize: 17, lineHeight: 1.65, color: '#4A4C55' }}>
              <p>PRIMEO began as a buyer&apos;s agency, representing people who had no one on their side of the negotiation. That independence still shapes everything we do: we tell clients what a property is worth and whether they should buy it, even when the answer is no.</p>
              <p>Today we work across the whole property journey in Brisbane and South East Queensland. Because we see transactions from every side, our advice is grounded in how deals are actually won, not in what a listing needs to say.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'end' }}>
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '3/4', borderRadius: 8, background: '#E6E0D4', marginTop: 56 }}><ImageSlot src={IMAGES.aboutStoryA} alt="Early PRIMEO office, 2012" placeholder="Photo: early PRIMEO office, 2012" /></div>
            <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '3/4', borderRadius: 8, background: '#E6E0D4', marginBottom: 56 }}><ImageSlot src={IMAGES.aboutStoryB} alt="Team on site today" placeholder="Photo: team on site today" /></div>
          </div>
        </div>
      </section>

      <section data-sec="1" className="sec" style={{ background: '#0B1D3A', color: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 56 }}>
          <div data-reveal="0" style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
            <p className="eyebrow eyebrow-gold">What we stand for</p>
            <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>Four principles behind every recommendation.</span></span></h2>
          </div>
          <div data-seq="1" data-g4="1" data-scroll-row="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {VALUES.map((v, i) => (
              <div key={v.n} data-reveal={i} className="value-card">
                <span className="num-ring" style={{ borderColor: 'rgba(247,243,236,.3)' }}>{v.n}</span>
                <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}><h3 className="serif" style={{ fontSize: 26, lineHeight: 1.15 }}>{v.title}</h3><p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(247,243,236,.72)' }}>{v.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
          <div data-reveal="0" className="head-row">
            <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
              <p className="eyebrow eyebrow-tan">The team</p>
              <h2 data-h2="1" className="h2"><span data-line="1" className="lines"><span>People who know the market street by street.</span></span></h2>
            </div>
            <Link href="/contact" className="btn btn-outline-dark">Meet the team</Link>
          </div>
          <div data-seq="1" data-g4="1" data-scroll-row="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {TEAM.map((m, i) => (
              <div key={m.id} data-card="1" data-reveal={i} style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', background: '#E6E0D4', color: '#F7F3EC', cursor: 'pointer' }}>
                <div data-card-img="1" className="fill"><ImageSlot placeholder="Portrait" /></div>
                <div className="ov-team" />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, display: 'grid', gap: 4, pointerEvents: 'none' }}>
                  <span className="serif" style={{ fontSize: 24, lineHeight: 1.15 }}>{m.name}</span>
                  <span className="eyebrow eyebrow-gold" style={{ fontSize: 11, letterSpacing: '.14em' }}>{m.role}</span>
                  <span data-card-overlay="1" style={{ opacity: 0, transform: 'translateY(8px)', fontSize: 13, color: 'rgba(247,243,236,.8)', paddingTop: 6 }}>{m.bio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
