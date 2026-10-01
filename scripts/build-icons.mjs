// Renders the browser icon (app/icon.png, 192x192) and the home-screen icon (app/apple-icon.png,
// 180x180) from the official symbol artwork in scripts/assets. Run by hand if the artwork changes:
//
//   node scripts/build-icons.mjs
//
// The artwork has a wide navy margin, so the symbol is re-cropped around its own centre. Google
// and Android show icons inside a circle; FILL keeps the symbol's corners inside that circle.
import sharp from 'sharp';
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

console.log('wrote app/icon.png and app/apple-icon.png');
