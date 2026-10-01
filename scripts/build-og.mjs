// Renders the social sharing card (public/og-image.jpg, 1200x630) and the home-screen icon
// (app/apple-icon.png, 180x180). Run by hand after changing the hero photo or the wording:
//
//   node scripts/build-og.mjs
//
// The card is the homepage hero photo under the site's navy wash, with the logo lockup set in
// system serif/sans faces (the web fonts are not available to the SVG renderer).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const W = 1200, H = 630;
const NAVY = '#0B1D3A', CREAM = '#F7F3EC', GOLD = '#C6A15B';

// Same paths as LogoMark in components/Logo.tsx.
const mark = (stroke) => `
  <g fill="none" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12V4h32v32H4V24"/><path d="M4 30 18 20l8 4L34 14"/>
  </g>
  <circle cx="34" cy="14" r="3.5" fill="${GOLD}"/>`;

const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${NAVY}" stop-opacity=".94"/>
      <stop offset=".55" stop-color="${NAVY}" stop-opacity=".78"/>
      <stop offset="1" stop-color="${NAVY}" stop-opacity=".35"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wash)"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${GOLD}"/>
  <g transform="translate(80 150) scale(1.9)">${mark(CREAM)}</g>
  <text x="178" y="212" font-family="Georgia, 'Times New Roman', serif" font-size="74" letter-spacing="10" fill="${CREAM}">PRIMEO</text>
  <text x="82" y="282" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="7" fill="${GOLD}">PROPERTY GROUP</text>
  <rect x="82" y="322" width="64" height="2" fill="${GOLD}"/>
  <text font-family="Georgia, 'Times New Roman', serif" font-size="50" fill="${CREAM}">
    <tspan x="80" y="408">Independent advice for</tspan>
    <tspan x="80" y="470">every property decision.</tspan>
  </text>
  <text x="82" y="548" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="${CREAM}" fill-opacity=".8">Buyer's agents · Brisbane &amp; South East Queensland</text>
</svg>`;

await sharp(path.join(root, 'public/images/hero_brisbane_luxury.jpg'))
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'));

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${NAVY}"/>
  <g transform="translate(34 34) scale(2.8)">${mark(CREAM)}</g>
</svg>`;
await sharp(Buffer.from(icon)).png().toFile(path.join(root, 'app/apple-icon.png'));

console.log('wrote public/og-image.jpg and app/apple-icon.png');
