// Dev utility: supplemental code-search for missing subjects (earbuds, hubs, docks, power banks)
import { writeFile } from "node:fs/promises";

const KNOWN = new Set([
  "1592750475338-74b7b21085ab", "1511707171634-5f897ff02aa9", "1695048133142-1a20484d2569",
  "1598327105666-5b89351aff97", "1605236453806-6ff36851218e", "1512941937669-90a1b58e7e9c",
  "1610945265064-0e34e5519bbf", "1610945415295-d9bbf067e59c", "1592899677977-9c10ca588bbd",
  "1505740420928-5e560c06d30e", "1484704849700-f032a568e944", "1546435770-a3e426bf472b",
  "1583394838336-acd977736f90", "1618366712010-f4ae9c647dcb", "1585771724684-38269d6639fd",
  "1606741965326-cb990ae01bb2", "1606220945770-b5b6c2c55bf1", "1600294037681-c80b4cb5b434",
  "1546868871-7041f2a55e12", "1579586337278-3befd40fd17a", "1434493789847-2f02dc6ca35d",
  "1523275335684-37898b6baf30", "1508685096489-7aacd43bd3b1", "1617043786394-f977fa12eddf",
  "1589003077984-894e133dabab", "1608043152269-423dbba4e7e1", "1545454675-3531b543be5d",
  "1558537348-c0f8e733989d", "1544244015-0df4b3ffc6b0", "1585790050230-5dd28404ccb9",
  "1561154464-82e9adf32764", "1587033411391-5d9e51cce126", "1615663245857-ac93bb7c39e7",
  "1583863788434-e58a36330cf0", "1550009158-9ebf69173e03", "1609091839311-d5365f9ff1c5",
]);

const QUERIES = [
  "images.unsplash.com buds",
  "images.unsplash.com earbuds white",
  "images.unsplash.com usb hub",
  "images.unsplash.com power bank OR powerbank",
  "images.unsplash.com magsafe OR dock",
  "images.unsplash.com cable braided",
];

const PAUSE = 3000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const contextOfInterest = [
  "buds", "earbud", "airpod", "airpods", "hub", "dock", "power bank", "powerbank",
  "cable", "usb", "20,000", "20000", "watt", "wattage", "65w", "100w", "gina",
];

async function ghSearch(q) {
  const url = `https://api.github.com/search/code?q=${encodeURIComponent(q)}&per_page=50`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.text-match+json",
    },
  });
  if (!res.ok) {
    console.error(`search FAIL ${res.status} ${q}`);
    return [];
  }
  const json = await res.json();
  return (json.items ?? []).flatMap((item) => (item.text_matches ?? []).map((m) => m.fragment ?? ""));
}

const found = new Set();
for (const q of QUERIES) {
  const fragments = await ghSearch(q);
  console.log(`query "${q}": ${fragments.length}`);
  for (const fragment of fragments) {
    const ids = fragment.match(/photo-[0-9a-f]{13}-[0-9a-f]{12}/g) ?? [];
    const lower = fragment.toLowerCase();
    for (const id of ids) {
      if (KNOWN.has(id) || found.has(id)) continue;
      const at = fragment.indexOf(id);
      const windowText = lower.slice(Math.max(0, at - 260), at + id.length + 260);
      if (contextOfInterest.some((kw) => windowText.includes(kw))) {
        found.add(id);
      }
    }
  }
  await sleep(PAUSE);
}

// verify
const verified = [];
for (const id of found) {
  try {
    const res = await fetch(`https://images.unsplash.com/photo-${id}?q=80&w=900&auto=format&fit=crop`, { method: "HEAD" });
    if (res.ok) verified.push(id);
  } catch {}
}

console.log(`${verified.length} new verified candidates:`);
for (const id of verified) console.log(id);
await writeFile("scripts/supplemental-ids.json", JSON.stringify(verified, null, 2));
