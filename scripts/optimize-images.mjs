// Re-encodes the photos in public/images (and the hero video posters) in place so the
// files shipped to the browser are web-sized. Idempotent: a file is only rewritten when
// the re-encode is at least 10% smaller, so re-running after adding new photos is safe.
//
//   node scripts/optimize-images.mjs            # everything
//   node scripts/optimize-images.mjs foo.jpg    # just the named files (basename or path)
//
// What it does per file: auto-orient from EXIF, cap the long edge at MAX_EDGE, strip
// metadata, and re-encode (JPEG via mozjpeg at Q80 progressive; PNG/WebP/AVIF at sane
// defaults). next/image then resizes and converts these to AVIF/WebP per device on request.
import sharp from 'sharp';
import { readdir, stat, rename, writeFile, unlink } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const DIRS = ['public/images', 'public/video'];
const MAX_EDGE = 1920;
const MIN_SAVING = 0.1;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const only = new Set(process.argv.slice(2).map((a) => basename(a).toLowerCase()));

async function encode(file) {
  const ext = extname(file).toLowerCase();
  let img = sharp(file).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  if (ext === '.jpg' || ext === '.jpeg') img = img.jpeg({ quality: 80, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' });
  else if (ext === '.png') img = img.png({ compressionLevel: 9, palette: true });
  else if (ext === '.webp') img = img.webp({ quality: 80, effort: 6 });
  else if (ext === '.avif') img = img.avif({ quality: 60, effort: 6 });
  return img.toBuffer();
}

let before = 0, after = 0, changed = 0;
for (const dir of DIRS) {
  const abs = join(ROOT, dir);
  for (const name of (await readdir(abs)).sort()) {
    if (!EXT.has(extname(name).toLowerCase())) continue;
    if (only.size && !only.has(name.toLowerCase())) continue;
    const file = join(abs, name);
    const size = (await stat(file)).size;
    before += size;
    const out = await encode(file);
    if (out.length < size * (1 - MIN_SAVING)) {
      const tmp = file + '.tmp';
      await writeFile(tmp, out);
      await unlink(file);
      await rename(tmp, file);
      after += out.length;
      changed++;
      console.log(`${dir}/${name}: ${kb(size)} -> ${kb(out.length)}`);
    } else {
      after += size;
    }
  }
}
console.log(`\n${changed} file(s) rewritten, ${kb(before)} -> ${kb(after)} total`);
function kb(n) { return `${Math.round(n / 1024)}K`; }
