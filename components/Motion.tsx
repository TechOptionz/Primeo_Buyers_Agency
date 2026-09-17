'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { intro } from '@/lib/intro';

/**
 * Scroll-driven motion, ported from the design file. Elements opt in via data attributes:
 *  data-reveal / data-line / data-rule / data-mask  – reveal on enter
 *  data-seq                                        – stagger children on scroll
 *  data-count (+ data-prefix/-suffix)              – count-up numbers
 *  data-card (+ data-card-img / data-card-overlay) – hover zoom + overlay
 *  data-pin (+ data-pin-img / data-pin-item / -bar) – pinned scroll story
 *  data-parallax / data-zoom / data-hero-content    – hero motion
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const anim = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = 'cubic-bezier(.16,1,.3,1)';
    const $$ = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
    let io: IntersectionObserver | null = null;

    const count = (el: HTMLElement, instant?: boolean) => {
      if (el.getAttribute('data-done')) return;
      el.setAttribute('data-done', '1');
      const target = +(el.getAttribute('data-count') || 0);
      const pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
      const fmt = (v: number) => pre + Math.round(v).toLocaleString() + suf;
      if (instant) { el.textContent = fmt(target); return; }
      const t0 = performance.now(), dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(target * e);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY, vh = window.innerHeight;
      if (anim) $$('[data-parallax]').forEach((el) => { el.style.transform = `translateY(${y * (window.innerWidth <= 760 ? 0.1 : 0.18)}px)`; });
      $$('[data-hero-content]').forEach((el) => { const f = Math.max(0, 1 - y / 520); el.style.opacity = String(0.25 + f * 0.75); el.style.transform = `translateY(${y * 0.08}px)`; });
      $$('[data-seq][data-r]').forEach((c) => {
        const r = c.getBoundingClientRect(); if (r.top > vh || r.bottom < 0) return;
        const p = Math.max(0, Math.min(1, (vh * 0.96 - r.top) / (vh * 0.3)));
        const kids = Array.from(c.children) as HTMLElement[], N = kids.length;
        kids.forEach((k, i) => {
          if (k.getAttribute('data-s') === '1') return;
          if (p >= (i + 0.4) / (N + 0.4)) { k.setAttribute('data-s', '1'); k.style.opacity = '1'; k.style.transform = 'none'; }
        });
      });
      $$('[data-pin]').forEach((sec) => {
        const r = sec.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
        const imgs = Array.from(sec.querySelectorAll<HTMLElement>('[data-pin-img]')), N = imgs.length; if (!N) return;
        const p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
        const active = Math.min(N - 1, Math.floor(p * N * 0.999));
        if (sec.getAttribute('data-active') !== String(active)) {
          sec.setAttribute('data-active', String(active));
          imgs.forEach((im, i) => { const on = i === active; im.style.opacity = on ? '1' : '0'; im.style.transform = on ? 'none' : (i < active ? 'scale(1)' : 'scale(1.06)'); im.style.zIndex = on ? '2' : '1'; });
          sec.querySelectorAll<HTMLElement>('[data-pin-item]').forEach((it, i) => { it.style.opacity = i <= active ? '1' : '.35'; });
        }
        const bar = sec.querySelector<HTMLElement>('[data-pin-bar]'); if (bar) bar.style.transform = `scaleY(${p.toFixed(3)})`;
      });
      $$('[data-mask][data-drift]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        el.style.transform = `translateY(${(-c * 24).toFixed(1)}px)`;
      });
    };

    const init = () => {
      const delay0 = intro.pending ? 2.6 : 0;
      io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const inner = el.firstElementChild as HTMLElement | null;
        if (el.hasAttribute('data-inview')) { el.classList.add('in'); }
        else if (el.hasAttribute('data-line')) { if (inner) inner.style.transform = 'none'; }
        else if (el.hasAttribute('data-mask')) { if (inner) { inner.style.clipPath = 'inset(0 0 0 0)'; inner.style.transform = 'scale(1)'; } }
        else if (el.hasAttribute('data-rule')) { el.style.transform = 'scaleX(1)'; }
        else { el.style.opacity = '1'; el.style.transform = 'none'; }
        if (el.hasAttribute('data-count')) count(el);
        io?.unobserve(el);
      }), { threshold: 0 });
      const obs = io;
      const q = (s: string) => $$(s + ':not([data-r])');
      const mark = (el: HTMLElement) => el.setAttribute('data-r', '1');
      const inHero = (el: HTMLElement) => !!el.closest('[data-hero]');

      q('[data-seq]').forEach((c) => {
        mark(c);
        const kids = Array.from(c.children) as HTMLElement[];
        if (inHero(c)) { kids.forEach((k) => k.setAttribute('data-s', '1')); return; }
        kids.forEach((k) => {
          k.setAttribute('data-r', '1');
          if (anim) { k.style.opacity = '0'; k.style.transform = 'translateY(28px)'; k.style.transition = `opacity .6s ${ease}, transform .6s ${ease}`; }
          else k.setAttribute('data-s', '1');
        });
      });
      if (anim) {
        q('[data-reveal]').forEach((el) => { mark(el); const d = (inHero(el) ? delay0 : 0) + (+(el.getAttribute('data-reveal') || 0)) * 0.06; el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = `opacity .7s ${ease} ${d}s, transform .7s ${ease} ${d}s`; obs.observe(el); });
        q('[data-line]').forEach((el) => { mark(el); const d = (inHero(el) ? delay0 : 0) + (+(el.getAttribute('data-line') || 0)) * 0.08; const inner = el.firstElementChild as HTMLElement | null; if (inner) { inner.style.transform = 'translateY(112%)'; inner.style.transition = `transform .7s cubic-bezier(.22,1,.36,1) ${d}s`; } obs.observe(el); });
        q('[data-rule]').forEach((el) => { mark(el); el.style.transformOrigin = 'left center'; el.style.transform = 'scaleX(0)'; el.style.transition = `transform .9s ${ease} ${inHero(el) ? delay0 : 0}s`; obs.observe(el); });
        q('[data-mask]').forEach((el) => { mark(el); if (el.hasAttribute('data-img-tall')) { el.setAttribute('data-drift', '1'); el.style.transition = 'transform .2s linear'; } const inner = el.firstElementChild as HTMLElement | null; if (inner) { inner.style.clipPath = 'inset(100% 0 0 0)'; inner.style.transform = 'scale(1.12)'; inner.style.transformOrigin = 'center'; inner.style.transition = `clip-path 1.1s cubic-bezier(.76,0,.24,1), transform 1.8s ${ease}`; } obs.observe(el); });
        q('[data-zoom]').forEach((el) => { mark(el); el.style.transform = 'scale(1.12)'; el.style.transition = `transform 22s ${ease}`; setTimeout(() => { el.style.transform = 'scale(1)'; }, 100); });
      } else {
        q('[data-reveal],[data-mask],[data-line],[data-rule]').forEach(mark);
      }
      q('[data-count]').forEach((el) => { mark(el); if (anim) obs.observe(el); else count(el, true); });
      // Class-driven reveals: adds `.in` once the element enters the viewport (CSS does the rest).
      q('[data-inview]').forEach((el) => { mark(el); if (anim) obs.observe(el); else el.classList.add('in'); });
      // Hover handlers use their own marker: cards inside a [data-seq] grid are already
      // marked data-r by the stagger pass above, so `q` would skip them.
      $$('[data-card]:not([data-hov])').forEach((el) => {
        el.setAttribute('data-hov', '1');
        const img = el.querySelector<HTMLElement>('[data-card-img]'), ov = el.querySelector<HTMLElement>('[data-card-overlay]');
        if (img) img.style.transition = `transform 1.6s ${ease}`;
        if (ov) ov.style.transition = `opacity .7s ease, transform .7s ${ease}`;
        el.addEventListener('mouseenter', () => { if (img) img.style.transform = 'scale(1.045)'; if (ov) { ov.style.opacity = '1'; ov.style.transform = 'none'; } });
        el.addEventListener('mouseleave', () => { if (img) img.style.transform = 'scale(1)'; if (ov) { ov.style.opacity = '0'; ov.style.transform = 'translateY(10px)'; } });
      });
      q('[data-pin]').forEach((sec) => { mark(sec); const N = sec.querySelectorAll('[data-pin-img]').length || 4; sec.style.height = `calc(100vh + ${N * 120}vh)`; sec.removeAttribute('data-active'); });
      onScroll();
    };

    const t = setTimeout(init, 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
