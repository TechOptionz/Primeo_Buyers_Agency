// Pre-renders every size next/image can put in a srcset, as AVIF and WebP, so photos are served
// as plain static files instead of being resized and encoded on first request (which stalled
// cold pages for up to two seconds). Runs automatically before `npm run dev` and `npm run build`;
// only new or changed photos are encoded, so re-runs take about a second.
//
//   node scripts/build-images.mjs
//
// Reads the photos under public/images and public/video, and writes (all gitignored):
//   public/_img/<dir>/<name>.<hash>.<width>.{avif,webp}   hash = source bytes + encoder settings,
//                                                        so the files can be cached as immutable
//   lib/generated/image-variants.json   { widths, images: { src: { hash, width } } }, for lib/image-loader.ts
//   lib/generated/image-blur.json       { src: 8px WebP data URL }, ImageSlot's blurred placeholder
// Encoded files are also kept in .next/cache/img-variants, which Vercel and most CI setups carry
// between builds, so a fresh checkout only re-encodes photos that changed.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const SOURCE_DIRS = ['images', 'video'];
const OUT = join(PUBLIC, '_img');
const CACHE = join(ROOT, '.next', 'cache', 'img-variants');
const GEN = join(ROOT, 'lib', 'generated');
// Every width next/image asks for: images.imageSizes + images.deviceSizes in next.config.ts. If the
// two lists drift apart nothing breaks; the loader serves the nearest generated width instead.
const WIDTHS = [64, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920];
// WebP q75 matches what the runtime optimiser served. AVIF q47 is Next's own WebP-equivalent
// mapping (75 * 50/80) and comes out ~40% smaller. Effort 3 (Next's choice too) is 2% larger than
// effort 4 but four times faster to encode. Changing these renames every output file.
const FORMATS = { avif: { quality: 47, effort: 3 }, webp: { quality: 75, effort: 4 } };
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const started = Date.now();
const settings = JSON.stringify(FORMATS);
const prevVariants = await readJson(join(GEN, 'image-variants.json'));
const prevBlur = await readJson(join(GEN, 'image-blur.json'));

// 1. Fingerprint each photo and work out which files it needs.
const files = (await Promise.all(SOURCE_DIRS.map((d) => walk(join(PUBLIC, d))))).flat()
  .filter((f) => EXT.has(extname(f).toLowerCase())).sort();
const images = {}, blur = {}, jobs = [], keep = new Set();
let upToDate = 0;
await pool(files, async (file) => {
  const buf = await readFile(file);
  const src = '/' + relative(PUBLIC, file).split(sep).join('/'); // as written in the code: /images/foo.jpg
  const hash = createHash('sha1').update(buf).update(settings).digest('hex').slice(0, 10);
  const { width: w0, height: h0, orientation = 1 } = await sharp(buf).metadata();
  const max = Math.min(orientation >= 5 ? h0 : w0, WIDTHS.at(-1)); // no upscaling
  images[src] = { hash, width: max };
  blur[src] = prevVariants?.images?.[src]?.hash === hash && prevBlur?.[src]
    ? prevBlur[src]
    : `data:image/webp;base64,${(await sharp(buf).rotate().resize(8, 8, { fit: 'inside' }).webp({ quality: 70 }).toBuffer()).toString('base64')}`;
  const stem = src.slice(1, -extname(src).length);
  for (const width of [...WIDTHS.filter((x) => x < max), max]) {
    for (const format of Object.keys(FORMATS)) {
      const name = `${stem}.${hash}.${width}.${format}`;
      keep.add(name);
      if (existsSync(join(OUT, name))) upToDate++;
      else jobs.push({ buf, name, width, format });
    }
  }
});

// 2. Produce the missing files: copy from the build cache, or encode.
let encoded = 0, restored = 0;
if (jobs.length) console.log(`images: rendering ${jobs.length} variant(s)...`);
await pool(jobs, async ({ buf, name, width, format }) => {
  const out = join(OUT, name), cached = join(CACHE, name);
  await mkdir(dirname(out), { recursive: true });
  if (existsSync(cached)) { await copyFile(cached, out); restored++; return; }
  const data = await sharp(buf).rotate().resize({ width, withoutEnlargement: true })[format](FORMATS[format]).toBuffer();
  await mkdir(dirname(cached), { recursive: true });
  await writeFile(cached, data);
  await writeFile(out, data);
  encoded++;
});

// 3. Drop variants of photos that were replaced or removed, then write the manifests.
let removed = 0;
for (const dir of [OUT, CACHE]) {
  for (const f of await walk(dir)) {
    if (!keep.has(relative(dir, f).split(sep).join('/'))) { await rm(f); if (dir === OUT) removed++; }
  }
}
await mkdir(GEN, { recursive: true });
await writeIfChanged(join(GEN, 'image-variants.json'), { widths: WIDTHS, images: sorted(images) });
await writeIfChanged(join(GEN, 'image-blur.json'), sorted(blur));

console.log(`images: ${files.length} photos, ${keep.size} variants (${encoded} encoded, ${restored} from cache, ${upToDate} up to date${removed ? `, ${removed} stale removed` : ''}) in ${((Date.now() - started) / 1000).toFixed(1)}s`);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  return (await Promise.all(entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])))).flat();
}
// Runs fn over items with bounded concurrency.
async function pool(items, fn, size = availableParallelism()) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => { while (i < items.length) await fn(items[i++]); }));
}
async function readJson(file) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch { return undefined; }
}
// Leaves the file (and its mtime) alone when nothing changed, so a running `next dev` doesn't reload.
async function writeIfChanged(file, data) {
  const text = JSON.stringify(data, null, 1) + '\n';
  if ((await readFile(file, 'utf8').catch(() => '')) !== text) await writeFile(file, text);
}
function sorted(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}
