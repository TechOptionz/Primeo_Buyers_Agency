import { ImageSlot } from './ImageSlot';
import { SLOTS } from '@/lib/slots';

/** Placeholder-backed image: prints the identifier until a path is set for it in lib/slots.ts. */
export function Slot({ id, alt = '', tone = 'light', priority, pos }: {
  id: string; alt?: string; tone?: 'light' | 'dark'; priority?: boolean; pos?: 'top' | 'corner';
}) {
  return <ImageSlot src={SLOTS[id]} alt={alt} placeholder={id} tone={tone} priority={priority} pos={pos} />;
}
