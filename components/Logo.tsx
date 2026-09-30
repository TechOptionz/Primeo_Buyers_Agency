export const TAGLINE = ['Right Property', 'Right Price'] as const;

/**
 * The tagline with its divider drawn rather than typed: a "|" glyph hangs below the baseline and
 * sits off-centre in its gap. The bar keeps a hidden " | " so the text still reads and copies whole.
 */
export function Tagline() {
  return (
    <>
      {TAGLINE[0]}
      <span className="tag-bar"><span>{' | '}</span></span>
      {TAGLINE[1]}
    </>
  );
}

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12V4h32v32H4V24" />
      <path d="M4 30 18 20l8 4L34 14" />
      <circle cx="34" cy="14" r="3.5" fill="#C6A15B" stroke="none" />
    </svg>
  );
}

/**
 * Full lockup: mark + wordmark, a hairline, then the tagline set as live text (it is not
 * part of the logo artwork). Sizes come from the .logo / .logo-sm / .logo-lg rules in globals.css.
 * `flightTarget` marks the mark as the landing spot for the intro animation (see Intro.tsx).
 */
export function Logo({ variant, flightTarget }: { variant?: 'sm' | 'lg'; flightTarget?: boolean }) {
  return (
    <span className={`logo${variant ? ` logo-${variant}` : ''}`}>
      <span className="logo-row">
        <span data-nav-logo={flightTarget ? '1' : undefined} style={{ display: 'flex' }}><LogoMark /></span>
        <span className="logo-word">PRIMEO</span>
      </span>
      <span className="logo-rule" />
      <span className="logo-tag"><Tagline /></span>
    </span>
  );
}
