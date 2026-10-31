// Dev utility: assign subject to each unsplash URL by scoring keyword context
// inside code-search text-match fragments.
// Usage: node scripts/assign-images.mjs
import { readFile, writeFile } from "node:fs/promises";

const harvested = JSON.parse(await readFile("scripts/harvested-urls.json", "utf8"));
const ids = new Set(harvested.map((h) => h.url.replace("https://images.unsplash.com/", "")));

const KEYWORDS = {
  headphones: ["headphone", "headset", "over-ear", "over ear", "on-ear", "anc "],
  earbuds: ["earbud", "airpod", "earphone", " tws"],
  smartwatch: ["smartwatch", "smart-watch", "apple watch", "wearable", "smart watch"],
  speakers: ["speaker", "boombox", "soundbar", "subwoofer"],
  smartphones: ["smartphone", "iphone", "galaxy s", "pixel", "mobile phone", "5g"],
  tablets: ["tablet", "ipad"],
  accessories: [
    "charger",
    "charging",
    "cable",
    "usb",
    "adapter",
    "powerbank",
    "power bank",
    "battery",
    "dock",
    "type-c",
    "mount",
  ],
};

const PAUSE = 2500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const QUERIES_LIST = [
  "images.unsplash.com headphones",
  "images.unsplash.com earbuds OR airpods",
  "images.unsplash.com smartwatch",
  "images.unsplash.com speaker",
  "images.unsplash.com smartphone",
  "images.unsplash.com tablet OR ipad",
  "images.unsplash.com charger OR powerbank",
];

async function ghSearch(query) {
  const url = `https://api.github.com/search/code?q=${encodeURIComponent(query)}&per_page=50`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.text-match+json",
    },
  });
  if (!res.ok) {
    console.error(`search FAIL ${res.status} ${query}`);
    return [];
  }
  const json = await res.json();
  const results = [];
  for (const item of json.items ?? []) {
    for (const m of item.text_matches ?? []) {
      results.push({ fragment: m.fragment ?? "" });
    }
  }
  return results;
}

const found = new Map();

async function harvestQuery(q) {
  const results = await ghSearch(q);
  console.log(`query "${q}": ${results.length} fragments`);
  let matched = 0;
  for (const { fragment } of results) {
    const idMatches = (fragment.match(/photo-[0-9a-f]{13}-[0-9a-f]{12}/g) ?? []).filter((id) =>
      ids.has(id)
    );
    const context = fragment.toLowerCase();
    for (const id of idMatches) {
      // Score keywords ONLY in the ±240 chars around each id match to avoid cross-assigning.
      const at = fragment.indexOf(id);
      const windowText = context.slice(
        Math.max(0, at - 240),
        Math.min(context.length, at + id.length + 240)
      );
      const scores = {};
      for (const [cat, kws] of Object.entries(KEYWORDS)) {
        scores[cat] = kws.reduce((n, kw) => n + (windowText.includes(kw) ? 1 : 0), 0);
      }
      const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
      if (best) {
        matched++;
        const existing = found.get(id);
        if (!existing || existing.score < best[1]) {
          found.set(id, { category: best[0], score: best[1], fragment: windowText.slice(0, 120) });
        }
      }
    }
  }
  console.log(`  -> ${matched} context-assigned ids`);
}

for (const q of QUERIES_LIST) {
  await harvestQuery(q);
  await sleep(PAUSE);
}

const table = {};
for (const [id, meta] of found) {
  (table[meta.category] ||= []).push({ url: `https://images.unsplash.com/${id}`, score: meta.score, fragment: meta.fragment });
}
for (const cat of Object.keys(table)) {
  table[cat].sort((a, b) => b.score - a.score);
}

await writeFile("scripts/image-assignments.json", JSON.stringify(table, null, 2));
console.log("assigned:", Object.fromEntries(Object.entries(table).map(([k, v]) => [k, v.length])));
