// Dev utility: harvest previously-curated Unsplash CDN photo URLs from public
// GitHub repos via code search, then HEAD-verify each URL.
// Usage: node scripts/harvest-images.mjs
import { writeFile, readFile, mkdir } from "node:fs/promises";

const QUERIES = [
  "images.unsplash.com headphones react",
  "images.unsplash.com earbuds OR airpods component",
  "images.unsplash.com smartwatch OR watch interface",
  "images.unsplash.com speaker audio component",
  "images.unsplash.com smartphone iphone hero",
  "images.unsplash.com tablet ipad section",
  "images.unsplash.com charger OR charging OR battery component",
  "images.unsplash.com power bank OR powerbank card",
];

async function ghSearch(query) {
  const url = `https://api.github.com/search/code?q=${encodeURIComponent(
    `${query} language:TypeScript`
  )}&per_page=30`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) {
    console.error(`gh search FAIL ${res.status} for "${query}"`);
    return [];
  }
  const json = await res.json();
  return (json.items ?? []).map((item) => ({
    repo: item.repository.full_name,
    path: item.path,
  }));
}

async function fetchFile(repo, path) {
  const url = `https://raw.githubusercontent.com/${repo}/HEAD/${path}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

const seen = new Map();
let reposScanned = new Set();
for (const q of QUERIES) {
  const hits = await ghSearch(q);
  console.log(`query "${q}": ${hits.length} file hits`);
  let files = 0;
  for (const hit of hits) {
    if (reposScanned.size > 60) break;
    reposScanned.add(hit.repo);
    if (files > 8) break; // cap files per query
    files++;
    const text = await fetchFile(hit.repo, hit.path);
    const ids = text.match(/https:\/\/images\.unsplash\.com\/photo-[0-9a-z-]+/gi) ?? [];
    for (const idMatch of ids) {
      if (!seen.has(idMatch)) seen.set(idMatch, { url: idMatch, source: hit.repo });
    }
  }
}

const unique = [...seen.values()];
console.log(`total unique unsplash urls: ${unique.length}`);

// HEAD-verify
const verified = [];
let i = 0;
for (const c of unique) {
  i++;
  const checkUrl = `${c.url}?q=80&w=900&auto=format&fit=crop`;
  try {
    const res = await fetch(checkUrl, { method: "HEAD" });
    if (res.ok) verified.push(c);
  } catch (e) {
    /* ignore */
  }
  if (i % 50 === 0) console.log(`verified ${i}/${unique.length}...`);
}

await mkdir("scripts", { recursive: true });
await writeFile("scripts/harvested-urls.json", JSON.stringify(verified, null, 2));
console.log(`done — ${verified.length} verified urls written to scripts/harvested-urls.json`);
