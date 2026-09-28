import type { ImageLoaderProps } from 'next/image';
import manifest from './generated/image-variants.json';

/**
 * next/image loader (images.loaderFile in next.config.ts). Maps a photo and a srcset width to
 * the static file scripts/build-images.mjs rendered for it, so no image is resized or encoded
 * at request time. The default export serves WebP; ImageSlot and HeroVideo add an AVIF
 * <source> with `avifLoader`.
 *
 * Deliberately not 'use client': server components call these through getImageProps.
 */
const IMAGES: Record<string, { hash: string; width: number } | undefined> = manifest.images;
const warned = new Set<string>();

function variant(src: string, width: number, format: 'avif' | 'webp') {
  const img = IMAGES[src];
  if (!img) {
    // A photo added after the last run: serve the original until the variants exist.
    if (process.env.NODE_ENV !== 'production' && !warned.has(src)) {
      warned.add(src);
      console.warn(`[images] no generated sizes for ${src}; serving the original. Run \`npm run images\` to render them.`);
    }
    return src;
  }
  // Smallest rendered width that covers the request; the photo's own width is the largest one.
  const w = manifest.widths.find((x) => x >= width && x < img.width) ?? img.width;
  return `/_img${src.slice(0, src.lastIndexOf('.'))}.${img.hash}.${w}.${format}`;
}

export default function webpLoader({ src, width }: ImageLoaderProps) {
  return variant(src, width, 'webp');
}

export function avifLoader({ src, width }: ImageLoaderProps) {
  return variant(src, width, 'avif');
}
