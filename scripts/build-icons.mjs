// Renders the browser icon (app/icon.png, 192x192), the home-screen icon (app/apple-icon.png,
// 180x180), the classic favicon (app/favicon.ico: 16, 32 and 48 px) and the square logo for the
// structured data (public/logo.png, 512x512) from the official symbol artwork in scripts/assets.
// Run by hand if the artwork changes:
//
//   node scripts/build-icons.mjs
//
// The artwork has a wide navy margin, so the symbol is re-cropped around its own centre. Google
// and Android show icons inside a circle; FILL keeps the symbol's corners inside that circle.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(root, 'scripts/assets/primeo-symbol-on-navy.png');
// Share of the circle's radius that the symbol's furthest point reaches.
const FILL = 0.86;

const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const bg = [data[0], data[1], data[2]];
const isSymbol = (i) => Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]) > 40;

let x0 = width, y0 = height, x1 = -1, y1 = -1;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (!isSymbol((y * width + x) * channels)) continue;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
}
const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;

let reach = 0;
for (let y = y0; y <= y1; y++) {
  for (let x = x0; x <= x1; x++) {
    if (isSymbol((y * width + x) * channels)) reach = Math.max(reach, Math.hypot(x - cx, y - cy));
  }
}

const side = Math.round((2 * reach) / FILL);
const left = Math.round(cx - side / 2), top = Math.round(cy - side / 2);
if (left < 0 || top < 0 || left + side > width || top + side > height) {
  throw new Error('The crop runs past the edge of the artwork; lower FILL or use artwork with more margin.');
}

const crop = () => sharp(SOURCE).removeAlpha().extract({ left, top, width: side, height: side });
await crop().resize(192, 192).png().toFile(path.join(root, 'app/icon.png'));
await crop().resize(180, 180).png().toFile(path.join(root, 'app/apple-icon.png'));
await crop().resize(512, 512).png().toFile(path.join(root, 'public/logo.png'));

// favicon.ico: an ICO container holding PNG-compressed images (read by every current browser and
// by Google's crawler). Header: reserved, type 1, count; then one 16-byte directory entry per image.
const ICO_SIZES = [16, 32, 48];
// Turbopack decodes the entries while building and accepts only RGBA PNGs, hence ensureAlpha().
const pngs = await Promise.all(ICO_SIZES.map((s) => crop().resize(s, s).ensureAlpha().png({ compressionLevel: 9 }).toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
const entries = Buffer.alloc(16 * pngs.length);
let offset = header.length + entries.length;
pngs.forEach((png, i) => {
  const e = i * 16, s = ICO_SIZES[i];
  entries.writeUInt8(s, e);          // width  (0 would mean 256)
  entries.writeUInt8(s, e + 1);      // height
  entries.writeUInt8(0, e + 2);      // colour palette: none
  entries.writeUInt8(0, e + 3);      // reserved
  entries.writeUInt16LE(1, e + 4);   // colour planes
  entries.writeUInt16LE(32, e + 6);  // bits per pixel
  entries.writeUInt32LE(png.length, e + 8);
  entries.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
await fs.writeFile(path.join(root, 'app/favicon.ico'), Buffer.concat([header, entries, ...pngs]));

console.log('wrote app/icon.png, app/apple-icon.png, app/favicon.ico and public/logo.png');
