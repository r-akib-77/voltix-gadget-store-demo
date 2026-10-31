// Dev utility: scrape public Unsplash search pages for photo IDs, then
// HEAD-verify each URL. Writes results to scripts/image-candidates.json
import { writeFile } from "node:fs/promises";

const QUERIES = [
  "smartphone",
  "headphones",
  "earbuds",
  "smartwatch",
  "bluetooth-speaker",
  "tablet",
  "charger",
  "power-bank",
  "gadgets",
];

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "text/html",
};

async function scrape(query) {
  const url = `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
      console.error(`FAIL page ${query} -> HTTP ${res.status}`);
      return [];
    }
    const html = await res.text();
    // Photo ids look like photo-1580910051074-3eb694886505
    const matches = html.match(/photo-[0-9a-f]{13}-[0-9a-f]{12}/g) ?? [];
    const unique = [...new Set(matches)];
    console.log(`query "${query}": ${unique.length} unique photo ids`);
    return unique.map((id) => ({ query, id, url: `https://images.unsplash.com/${id}` }));
  } catch (e) {
    console.error(`ERR ${query}: ${e.message}`);
    return [];
  }
}

const all = [];
for (const q of QUERIES) {
  // be gentle, sequential
  const results = await scrape(q);
  all.push(...results);
}

// de-dup across queries
const seen = new Map();
for (const item of all) {
  if (!seen.has(item.id)) seen.set(item.id, item);
}
const unique = [...seen.values()];

// HEAD-verify
const verified = [];
for (const c of unique) {
  const checkUrl = `${c.url}?q=80&w=900&auto=format&fit=crop`;
  try {
    const res = await fetch(checkUrl, { method: "HEAD", headers: HEADERS });
    if (res.ok) verified.push(c);
    else if (res.status !== 429) console.log(`BAD ${res.status} ${c.id}`);
  } catch (e) {
    console.log(`ERR ${c.id}: ${e.message}`);
  }
}

await writeFile("scripts/image-candidates.json", JSON.stringify(verified, null, 2));
console.log(`Done. ${verified.length} verified candidates (of ${unique.length} scraped).`);
