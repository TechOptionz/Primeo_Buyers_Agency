const STAR = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

/** Row of five stars, `n` of them filled, in the site's gold. */
export default function Stars({ n = 5, size = 14, color = '#C6A15B', gap = 3, label }: {
  n?: number; size?: number; color?: string; gap?: number; label?: string;
}) {
  return (
    <span role="img" aria-label={label ?? `Rated ${n} out of 5`} style={{ display: 'inline-flex', gap, lineHeight: 0, flex: 'none' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d={STAR} fill={i < n ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}
