/**
 * Photo placeholder. Pass `src` to render a real image (object-fit: cover);
 * without it, a labelled slot is shown, matching the design mock.
 * The parent must be position:relative with a size (aspect-ratio or fixed height).
 * Images load lazily unless `priority` is set (hero / above the fold).
 */
export function ImageSlot({
  src,
  alt = '',
  placeholder,
  tone = 'light',
  priority = false,
  pos,
}: {
  src?: string;
  alt?: string;
  placeholder?: string;
  tone?: 'light' | 'dark';
  priority?: boolean;
  /** where the label sits: centred (default), high (heroes) or top-right corner (full-bleed backgrounds) */
  pos?: 'top' | 'corner';
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="slot-img" src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : undefined} />;
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
