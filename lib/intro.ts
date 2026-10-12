// Shared flags for the intro cover (components/Intro.tsx): `pending` delays the hero reveals while the
// cover plays (components/Motion.tsx); `mounted` is set once the cover has mounted, so a later page
// mount is a client-side navigation and gets the page fade (components/PageFade.tsx).
export const intro = { pending: false, mounted: false };
