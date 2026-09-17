'use client';
import { useEffect, useRef, useState } from 'react';

// Portrait-cropped encode for phones and any portrait viewport; 16:9 otherwise.
const PORTRAIT = '(max-width: 760px), (orientation: portrait)';
const SOURCES = {
  desktop: { video: '/video/hero-desktop.mp4', poster: '/video/hero-desktop-poster.jpg' },
  mobile: { video: '/video/hero-mobile.mp4', poster: '/video/hero-mobile-poster.jpg' },
};

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
        <source media={PORTRAIT} srcSet={SOURCES.mobile.poster} />
        <img className="hero-media" src={SOURCES.desktop.poster} alt={alt} fetchPriority="high" decoding="async" />
      </picture>
      <video ref={ref} className={`hero-media hero-video${on ? ' on' : ''}`} muted loop playsInline preload="none" disablePictureInPicture tabIndex={-1} aria-hidden="true" />
    </>
  );
}
