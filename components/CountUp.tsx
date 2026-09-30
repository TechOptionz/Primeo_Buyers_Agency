import type { CSSProperties } from 'react';

/**
 * A figure that counts up when it scrolls into view (Motion animates any [data-count]).
 * Takes the display string ("350+", "$60k", "1 in 3", "20+ years") and splits it around its first
 * number; a value with no digits ("CPA") renders as plain text. The full value is the server-rendered
 * text, so it is correct without JavaScript and for reduced-motion visitors.
 * `.fig-inline` keeps the figure at its parent's type size (see the [data-count] rule in globals.css).
 */
export default function CountUp({ value, className, style }: { value: string; className?: string; style?: CSSProperties }) {
  const m = /^(\D*)(\d[\d,]*)(.*)$/.exec(value);
  if (!m) return <span className={className} style={style}>{value}</span>;
  return (
    <span data-count={m[2].replace(/,/g, '')} data-prefix={m[1] || undefined} data-suffix={m[3] || undefined} className={`fig-inline${className ? ` ${className}` : ''}`} style={style}>{value}</span>
  );
}
