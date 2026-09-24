import Image from 'next/image';

/**
 * Photo placeholder. Pass `src` to render a real image (object-fit: cover);
 * without it, a labelled slot is shown, matching the design mock.
 * The parent must be position:relative with a size (aspect-ratio or fixed height).
 *
 * Real images go through next/image: the server resizes them to the widths in `sizes`
 * and converts to AVIF/WebP per browser. `sizes` is the rendered width of the slot
 * (CSS media-query list, e.g. "(max-width: 1000px) 100vw, 50vw"); leaving it at the
 * default 100vw still works but fetches a bigger file than a narrow slot needs.
 * Images load lazily unless `priority` is set (hero / above the fold), which also
 * preloads them from <head> so they are the first bytes requested.
 */
export function ImageSlot({
  src,
  alt = '',
  placeholder,
  tone = 'light',
  priority = false,
  pos,
  sizes = '100vw',
}: {
  src?: string;
  alt?: string;
  placeholder?: string;
  tone?: 'light' | 'dark';
  priority?: boolean;
  /** where the label sits: centred (default), high (heroes) or top-right corner (full-bleed backgrounds) */
  pos?: 'top' | 'corner';
  /** rendered width of the slot, as an <img sizes> value */
  sizes?: string;
}) {
  if (src) {
    return <Image className="slot-img" src={src} alt={alt} fill sizes={sizes} preload={priority} />;
  }
  const label = placeholder?.trim();
  return (
    <div className="slot" data-tone={tone} data-pos={pos} aria-hidden="true">
      {label && (
        <>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="m21 16-5-5-8 8" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </div>
  );
}
