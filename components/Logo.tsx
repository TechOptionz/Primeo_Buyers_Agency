export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12V4h32v32H4V24" />
      <path d="M4 30 18 20l8 4L34 14" />
      <circle cx="34" cy="14" r="3.5" fill="#C6A15B" stroke="none" />
    </svg>
  );
}
