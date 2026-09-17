import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="That page has moved or never existed." lead="Head back home or get in touch and we’ll point you the right way." />
      <section data-sec="1" className="sec" style={{ background: '#F7F3EC' }}>
        <div data-pad="1" className="container" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-navy">Back home</Link>
          <Link href="/contact" className="btn btn-outline-dark">Contact us</Link>
        </div>
      </section>
    </>
  );
}
