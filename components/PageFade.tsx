'use client';
import { useLayoutEffect, useRef } from 'react';
import { intro } from '@/lib/intro';

/**
 * Turns on the page fade (pageIn in globals.css, on [data-page][data-fade]) for client-side navigations.
 * On the first load the intro cover (components/Intro.tsx) has not mounted yet, so the attribute is not
 * set and the page paints at once underneath the cover; see app/template.tsx.
 */
export default function PageFade() {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (intro.mounted) ref.current?.parentElement?.setAttribute('data-fade', '1');
  }, []);
  return <span ref={ref} hidden />;
}
