import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PinnedSteps from '@/components/PinnedSteps';
import FactBand from '@/components/FactBand';
import { ImageSlot } from '@/components/ImageSlot';
import ReviewStrip from '@/components/ReviewStrip';
import Faq from '@/components/Faq';
import Stars from '@/components/Stars';
import GoogleMark from '@/components/GoogleMark';
import RatingBadge from '@/components/RatingBadge';
import { SERVICES } from '@/lib/data';
import { byId, monthYear } from '@/lib/reviews';
import { pageMeta } from '@/lib/seo';
import { altFromLabel } from '@/lib/alt';

type Params = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return Object.keys(SERVICES).map((service) => ({ service }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service } = await params;
  const svc = SERVICES[service];
  return svc ? pageMeta({ title: svc.seoTitle ?? svc.title, description: svc.seo ?? svc.lead, path: `/${service}` }) : {};
}

export default async function ServicePage({ params }: Params) {
  const svc = SERVICES[(await params).service];
  if (!svc) notFound();
  const story = byId(svc.quote.reviewId)!;
  // The page's FAQ as FAQPage structured data, when it has one.
  const faqLd = svc.faq && JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: svc.faq.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  }).replace(/</g, '\\u003c');

  return (
    <>
      <PageHero
        eyebrow={svc.title}
        title={svc.hero}
        lead={svc.lead}
        src={svc.src}
        band={<FactBand facts={svc.facts} />}
      />

      {/* intro: image + text */}
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 72, alignItems: 'center' }}>
          <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}><ImageSlot src={svc.introSrc ?? svc.src} alt={altFromLabel(svc.placeholder)} placeholder={svc.placeholder} sizes="(max-width: 1000px) 100vw, 50vw" /></div>
          <div style={{ display: 'grid', gap: 26 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
              <p className="eyebrow eyebrow-tan">{svc.title}</p>
              <h2 data-h2="1" className="h2">{svc.introTitle}</h2>
            </div>
            <p data-reveal="1" style={{ fontSize: 18, lineHeight: 1.65, color: '#4A4C55' }}>{svc.intro}</p>
            {svc.points.length > 0 && (
              <div style={{ display: 'grid' }}>
                {svc.points.map((pt, i) => <div key={pt} data-reveal={i} className="point"><span className="dot" /><p style={{ fontSize: 16, lineHeight: 1.55, color: '#0B1D3A' }}>{pt}</p></div>)}
              </div>
            )}
            <Link href="/contact" data-reveal="3" className="btn btn-navy btn-fit">{svc.ctaButton}</Link>
          </div>
        </div>
      </section>

      {svc.steps.length > 0 && (
        <PinnedSteps eyebrow="Step by step" title={svc.stepsTitle || ''} blurb="Scroll to follow each stage of the process." steps={svc.steps} />
      )}

      {svc.cards.length > 0 && (
        <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
          <div data-pad="1" className="container" style={{ display: 'grid', gap: 44 }}>
            <div data-reveal="0" style={{ display: 'grid', gap: 14, maxWidth: 720 }}>
              <p className="eyebrow eyebrow-tan">{svc.cardsEyebrow}</p>
              <h2 data-h2="1" className="h2">{svc.cardsTitle}</h2>
            </div>
            <div data-seq="1" data-g3="1" data-scroll-row="1" tabIndex={0} role="group" aria-label={svc.cardsTitle} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {svc.cards.map((c, i) => (
                <div key={c.title} data-card="1" data-reveal={i} className="card card-hover">
                  <div className="media" style={{ aspectRatio: '16/10', background: '#E6E0D4' }}>
                    <div data-card-img="1" className="fill"><ImageSlot src={c.src} alt={altFromLabel(c.ph)} placeholder={c.ph} sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 33vw" /></div>
                    <span className="tag">{c.tag}</span>
                  </div>
                  <div style={{ display: 'grid', gap: 10, padding: '26px 26px 28px' }}>
                    <h3 className="serif" style={{ fontSize: 25, lineHeight: 1.2 }}>{c.title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A4C55' }}>{c.text}</p>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#0B1D3A', paddingTop: 10, borderTop: '1px solid #E6E0D4', marginTop: 6 }}>{c.foot}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {svc.columns.length > 0 && (
        <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
          <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {svc.columns.map((col, i) => (
              <div key={col.title} data-card="1" data-reveal={i} className="card">
                <div className="media" style={{ aspectRatio: '16/9', background: '#E6E0D4' }}><div data-card-img="1" className="fill"><ImageSlot src={col.src} alt={altFromLabel(col.ph)} placeholder={col.ph} sizes="(max-width: 1000px) 100vw, 50vw" /></div></div>
                <div style={{ display: 'grid', gap: 22, padding: '36px 40px 40px' }}>
                  <div style={{ display: 'grid', gap: 10 }}>
                    <p className="eyebrow eyebrow-tan">{col.eyebrow}</p>
                    <h3 className="serif" style={{ fontSize: 32, lineHeight: 1.15 }}>{col.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A4C55' }}>{col.text}</p>
                  </div>
                  <div style={{ display: 'grid' }}>
                    {col.points.map((pt) => <div key={pt} className="point" style={{ padding: '12px 0' }}><span className="dot" /><p style={{ fontSize: 15, lineHeight: 1.55 }}>{pt}</p></div>)}
                  </div>
                  <Link href="/contact" className="btn btn-navy btn-fit">{col.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* editorial quote band: a Google review beside a photo */}
      <section data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4' }}>
        <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'center' }}>
          <div data-reveal="0" style={{ display: 'grid', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Stars n={story.rating} size={16} label={`${story.rating} out of 5 stars`} /><span className="rev-date">{monthYear(story.date)}</span></div>
            <p className="serif" style={{ fontSize: 30, lineHeight: 1.32, textWrap: 'pretty' }}>“{story.quote ?? story.text}”</p>
            <div style={{ display: 'grid', gap: 3 }}><span style={{ fontWeight: 600, fontSize: 15 }}>{story.name}</span><span className="rev-src"><GoogleMark size={12} /> Google review</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', paddingTop: 22, borderTop: '1px solid #E6E0D4' }}>
              <RatingBadge to="google" size="md" label="full" />
              <Link href="/reviews" className="link-u">Read more reviews →</Link>
            </div>
          </div>
          <div data-mask="1" data-img-tall="1" className="media" style={{ aspectRatio: '4/5', borderRadius: 8, background: '#E6E0D4' }}><ImageSlot src={svc.quote.src} alt="Clients at their new home handover" placeholder={svc.quote.ph} sizes="(max-width: 1000px) 100vw, 45vw" /></div>
        </div>
      </section>

      {svc.reviewStrip && <ReviewStrip ids={svc.reviewStrip.ids} title={svc.reviewStrip.title} text={svc.reviewStrip.text} background="#F7F3EC" />}

      {/* FAQ: sticky heading beside the accordion, as on the Buyer Agency page */}
      {svc.faq && (
        <section id="faq" data-sec="1" className="sec" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', scrollMarginTop: 72 }}>
          <div data-pad="1" data-g2="1" className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }}>
            <div data-sticky="1" className="stick stick-low" style={{ display: 'grid', gap: 28 }}>
              <div data-reveal="0" style={{ display: 'grid', gap: 14 }}>
                <p className="eyebrow eyebrow-tan">{svc.faq.eyebrow}</p>
                <h2 data-h2="1" className="h2" style={{ maxWidth: 420 }}><span data-line="1" className="lines"><span>{svc.faq.title}</span></span></h2>
                <p className="lead" style={{ maxWidth: 400 }}>{svc.faq.text}</p>
              </div>
              <Link href="/contact" data-reveal="2" className="btn btn-navy btn-fit">{svc.ctaButton}</Link>
            </div>
            <Faq items={svc.faq.items} />
          </div>
          {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />}
        </section>
      )}
    </>
  );
}
