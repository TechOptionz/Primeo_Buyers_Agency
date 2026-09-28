'use client';
import { preload, type PreloadOptions } from 'react-dom';

/**
 * Adds <link rel="preload"> for an image to <head>, but only when this is actually rendered.
 * ImageSlot can't call preload() itself: as a server component it also runs for element trees
 * that are only serialized, such as app/not-found.tsx's hero, which is sent with every page.
 */
export function ImagePreload({ href, ...options }: PreloadOptions & { href: string }) {
  preload(href, options);
  return null;
}
