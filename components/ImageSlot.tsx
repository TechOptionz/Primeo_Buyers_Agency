import { getImageProps, type ImageProps } from 'next/image';
import { avifLoader } from '@/lib/image-loader';
import { ImagePreload } from './ImagePreload';
import blurs from '@/lib/generated/image-blur.json';

const BLUR: Record<string, string | undefined> = blurs;

/**
 * Photo placeholder. Pass `src` to render a real image (object-fit: cover);
 * without it, a labelled slot is shown, matching the design mock.
 * The parent must be position:relative with a size (aspect-ratio or fixed height).
 *
 * Real images are static files pre-rendered by scripts/build-images.mjs: a <picture> with an
 * AVIF source and a WebP fallback, in the widths `sizes` calls for. `sizes` is the rendered
 * width of the slot (CSS media-query list, e.g. "(max-width: 1000px) 100vw, 50vw"); leaving it
 * at the default 100vw still works but fetches a bigger file than a narrow slot needs.
 * A blurred 8px preview of the photo shows until it arrives.
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
  focus,
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
  /** which part of the photo survives the crop, as a CSS object-position (default: the centre) */
  focus?: string;
}) {
  if (src) {
    const blurDataURL = BLUR[src];
    const common: ImageProps = {
      src,
      alt,
      sizes,
      fill: true,
      // Painted as the img's background. It is never removed: the opaque photo covers it.
      placeholder: blurDataURL ? 'blur' : 'empty',
      blurDataURL,
      // Same as .slot-img; set inline too so the blurred preview is cropped like the photo.
      style: { objectFit: 'cover', objectPosition: focus },
      ...(priority ? { loading: 'eager', fetchPriority: 'high' } : {}),
    };
    const { props: img } = getImageProps(common);
    const { props: avif } = getImageProps({ ...common, loader: avifLoader });
    return (
      // .slot-pic is a block filling the slot, so [data-mask] reveals, which clip and scale their
      // first child, animate the photo as they did when the <img> was that child.
      <picture className="slot-pic">
        <source type="image/avif" srcSet={avif.srcSet} sizes={avif.sizes} />
        <img {...img} alt={alt} className="slot-img" />
        {/* AVIF only: browsers without it skip a typed preload instead of fetching both formats. */}
        {priority && <ImagePreload href={avif.src} as="image" type="image/avif" imageSrcSet={avif.srcSet} imageSizes={avif.sizes} fetchPriority="high" />}
      </picture>
    );
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
