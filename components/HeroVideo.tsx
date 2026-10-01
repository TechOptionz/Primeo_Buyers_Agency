'use client';
import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import { getImageProps } from 'next/image';
import { avifLoader } from '@/lib/image-loader';
import { SITE } from '@/config/site';

// Portrait-cropped encode for phones and any portrait viewport; 16:9 otherwise.
const PORTRAIT = '(max-width: 760px), (orientation: portrait)';
const LANDSCAPE = '(min-width: 761px) and (orientation: landscape)';
const PHONE = '(max-width: 760px)';
const SOURCES = {
  desktop: { video: '/video/hero-desktop', poster: '/video/hero-desktop-poster.jpg', width: 1920, height: 1080 },
  mobile: { video: '/video/hero-mobile', poster: '/video/hero-mobile-poster.jpg', width: 720, height: 1280 },
};
// Each cut is encoded twice (scripts/build-hero-video.sh): AV1 in WebM, about 60% of the size at the
// same quality, and H.264 in MP4 for browsers that cannot play AV1.
const AV1 = 'video/webm; codecs="av01.0.08M.08"';

// Poster srcsets for each crop, AVIF with a WebP fallback, from the sizes pre-rendered by
// scripts/build-images.mjs.
function posterProps(alt: string) {
  const common = { alt, sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const };
  const crop = ({ poster, width, height }: typeof SOURCES.desktop) => {
    const { props: { srcSet: avif, src: avifSrc } } = getImageProps({ ...common, src: poster, width, height, loader: avifLoader });
    const { props: { srcSet: webp, ...img } } = getImageProps({ ...common, src: poster, width, height });
    return { avif: avif!, avifSrc, webp: webp!, img };
  };
  const desktop = crop(SOURCES.desktop), mobile = crop(SOURCES.mobile);
  return { desktop, mobile, img: mobile.img };
}

type Connection = { saveData?: boolean; effectiveType?: string };

/**
 * Homepage hero background. The poster (frame 0 of the loop) paints first and is the
 * LCP image; the video has no src in the markup, so nothing downloads until the page
 * has loaded. It then fades in over the poster once it is actually playing.
 * Stays on the poster for reduced-motion, Save-Data and 2g/3g visitors, on phones (unless
 * SITE.features.heroVideoOnMobile is on in config/site.ts), or if the browser refuses
 * autoplay (e.g. iOS Low Power Mode).
 * The parent must be position:relative with a size.
 */
export default function HeroVideo({ alt }: { alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const poster = posterProps(alt);
  // The poster is the LCP: ask for it from <head>, before the parser reaches the <picture>.
  // AVIF only: browsers without it skip a typed preload rather than download both formats.
  preload(poster.desktop.avifSrc, { as: 'image', type: 'image/avif', imageSrcSet: poster.desktop.avif, imageSizes: '100vw', media: LANDSCAPE, fetchPriority: 'high' });
  preload(poster.mobile.avifSrc, { as: 'image', type: 'image/avif', imageSrcSet: poster.mobile.avif, imageSizes: '100vw', media: PORTRAIT, fetchPriority: 'high' });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: Connection }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (conn?.saveData || /(^|-)[23]g$/.test(conn?.effectiveType || '')) return;
    if (!SITE.features.heroVideoOnMobile && window.matchMedia(PHONE).matches) return;

    // Playback waits for three things: data buffered, the intro cover lifted, hero on screen.
    // The file downloads while the intro plays, but the film is held on frame 0 (= the poster)
    // until the cover is gone: otherwise the opening shot is spent behind it, and decoding
    // 1080p video during the logo flight and wipe makes both stutter.
    let visible = true, ready = false, lifted = false, dead = false;
    const play = () => { if (ready && lifted && visible && !dead) video.play().then(() => setOn(true)).catch(() => {}); };
    const start = () => {
      video.muted = true; // React doesn't reliably reflect `muted`, and autoplay requires it
      video.preload = 'auto';
      video.src = (window.matchMedia(PORTRAIT).matches ? SOURCES.mobile : SOURCES.desktop).video + (video.canPlayType(AV1) ? '.webm' : '.mp4');
      video.addEventListener('canplay', () => { ready = true; play(); }, { once: true });
      video.load();
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    // The cover's own introWipe animation is the clock (see Intro). Already finished on
    // client-side navigations back to the homepage, so this resolves immediately there.
    const wipe = document.querySelector('.intro')?.getAnimations()[0];
    (wipe ? wipe.finished.catch(() => {}) : Promise.resolve()).then(() => { lifted = true; play(); });

    // Don't decode video nobody can see.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play(); else video.pause();
    });
    io.observe(video);

    return () => {
      dead = true;
      window.removeEventListener('load', start);
      io.disconnect();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return (
    <>
      <picture>
        <source media={PORTRAIT} type="image/avif" srcSet={poster.mobile.avif} />
        <source media={PORTRAIT} type="image/webp" srcSet={poster.mobile.webp} />
        <source type="image/avif" srcSet={poster.desktop.avif} />
        <img {...poster.img} alt={alt} srcSet={poster.desktop.webp} className="hero-media" />
      </picture>
      <video ref={ref} className={`hero-media hero-video${on ? ' on' : ''}`} muted loop playsInline preload="none" disablePictureInPicture tabIndex={-1} aria-hidden="true" />
    </>
  );
}
