'use client';
import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import { getImageProps } from 'next/image';

// Portrait-cropped encode for phones and any portrait viewport; 16:9 otherwise.
const PORTRAIT = '(max-width: 760px), (orientation: portrait)';
const LANDSCAPE = '(min-width: 761px) and (orientation: landscape)';
const SOURCES = {
  desktop: { video: '/video/hero-desktop.mp4', poster: '/video/hero-desktop-poster.jpg', width: 1920, height: 1080 },
  mobile: { video: '/video/hero-mobile.mp4', poster: '/video/hero-mobile-poster.jpg', width: 720, height: 1280 },
};

// Poster srcsets via next/image (resized + AVIF/WebP per browser), one per crop.
function posterProps(alt: string) {
  const common = { alt, sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const };
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: SOURCES.desktop.poster, width: SOURCES.desktop.width, height: SOURCES.desktop.height });
  const { props: { srcSet: mobile, ...img } } = getImageProps({ ...common, src: SOURCES.mobile.poster, width: SOURCES.mobile.width, height: SOURCES.mobile.height });
  return { desktop: desktop!, mobile: mobile!, img };
}

type Connection = { saveData?: boolean; effectiveType?: string };

/**
 * Homepage hero background. The poster (frame 0 of the loop) paints first and is the
 * LCP image; the video has no src in the markup, so nothing downloads until the page
 * has loaded. It then fades in over the poster once it is actually playing.
 * Stays on the poster for reduced-motion, Save-Data and 2g/3g visitors, or if the
 * browser refuses autoplay (e.g. iOS Low Power Mode).
 * The parent must be position:relative with a size.
 */
export default function HeroVideo({ alt }: { alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const poster = posterProps(alt);
  // The poster is the LCP: ask for it from <head>, before the parser reaches the <picture>.
  preload(SOURCES.desktop.poster, { as: 'image', imageSrcSet: poster.desktop, imageSizes: '100vw', media: LANDSCAPE, fetchPriority: 'high' });
  preload(SOURCES.mobile.poster, { as: 'image', imageSrcSet: poster.mobile, imageSizes: '100vw', media: PORTRAIT, fetchPriority: 'high' });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: Connection }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (conn?.saveData || /(^|-)[23]g$/.test(conn?.effectiveType || '')) return;

    // Playback waits for three things: data buffered, the intro cover lifted, hero on screen.
    // The file downloads while the intro plays, but the film is held on frame 0 (= the poster)
    // until the cover is gone: otherwise the opening shot is spent behind it, and decoding
    // 1080p video during the logo flight and wipe makes both stutter.
    let visible = true, ready = false, lifted = false, dead = false;
    const play = () => { if (ready && lifted && visible && !dead) video.play().then(() => setOn(true)).catch(() => {}); };
    const start = () => {
      video.muted = true; // React doesn't reliably reflect `muted`, and autoplay requires it
      video.preload = 'auto';
      video.src = (window.matchMedia(PORTRAIT).matches ? SOURCES.mobile : SOURCES.desktop).video;
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
        <source media={PORTRAIT} srcSet={poster.mobile} />
        <img {...poster.img} alt={alt} srcSet={poster.desktop} className="hero-media" />
      </picture>
      <video ref={ref} className={`hero-media hero-video${on ? ' on' : ''}`} muted loop playsInline preload="none" disablePictureInPicture tabIndex={-1} aria-hidden="true" />
    </>
  );
}
