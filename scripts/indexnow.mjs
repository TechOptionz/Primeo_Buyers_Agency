// Tells Bing (and through it ChatGPT search, Copilot, DuckDuckGo and Yandex) that the site's pages have
// changed, using IndexNow. Run after each production deploy:
//
//   npm run indexnow
//
// The key is the file name of public/<key>.txt, which IndexNow fetches from the site root to prove
// ownership. Bing Webmaster Tools shows the submissions under "IndexNow". Google does not use IndexNow;
// for Google, request indexing in Search Console or rely on the sitemap.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = fs.readFileSync(path.join(root, 'config/site.ts'), 'utf8');
const url = /url: '([^']+)'/.exec(site)[1];
const seo = fs.readFileSync(path.join(root, 'lib/seo.ts'), 'utf8');
const routes = JSON.parse(/ROUTES = (\[[^\]]+\])/.exec(seo)[1].replace(/'/g, '"'));
const key = fs.readdirSync(path.join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace('.txt', '');
if (!key) throw new Error('No IndexNow key file in public/ (expected <32 hex chars>.txt).');

const host = new URL(url).host;
const urlList = [...routes.map((r) => url + (r === '/' ? '' : r)), `${url}/llms.txt`, `${url}/llms-full.txt`];
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${url}/${key}.txt`, urlList }),
});
console.log(`IndexNow ${res.status} ${res.statusText} for ${urlList.length} URLs on ${host}`);
if (!res.ok) { console.log(await res.text()); process.exit(1); }
