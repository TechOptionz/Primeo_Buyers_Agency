import { ImageSlot } from './ImageSlot';
import CtaPanel from './CtaPanel';
import RatingBadge from './RatingBadge';
import { IMAGES } from '@/lib/data';

/** Closing call to action, appended to every page by app/template.tsx. The copy and the form are in CtaPanel. */
export default function FinalCta() {
  return (
    <section data-sec="1" className="sec" style={{ background: '#F7F3EC', borderTop: '1px solid #E6E0D4' }}>
      <div data-pad="1" className="container">
        <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 40px 80px rgba(11,29,58,.14)' }}>
          <div data-mask="1" data-cta-img="1" className="media" style={{ minHeight: 560, background: '#3A4A66' }}>
            <ImageSlot src={IMAGES.cta} alt="Agent and clients at a front gate, evening light" placeholder="Photo: agent and clients at a front gate, evening light" tone="dark" sizes="(max-width: 1000px) 100vw, 50vw" />
          </div>
          <div data-cta-panel="1" style={{ background: '#0B1D3A', color: '#F7F3EC', padding: '64px 56px', display: 'grid', gap: 28, alignContent: 'center' }}>
            <CtaPanel badge={<RatingBadge tone="dark" size="sm" />} />
          </div>
        </div>
      </div>
    </section>
  );
}
