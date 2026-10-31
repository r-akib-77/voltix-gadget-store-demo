// Dev utility: HEAD-verify every product/hero image URL used by the catalogue.
import { readFile } from "node:fs/promises";

const sources = [
  await readFile("src/data/products.ts", "utf8"),
  await readFile("src/components/home/Hero.tsx", "utf8"),
];
const ids = new Set();
for (const src of sources) {
  for (const m of src.matchAll(/(?:photo-|img\(")([0-9]{6,13}-[0-9a-f]{12})/g)) ids.add(m[1]);
}

let ok = 0;
const bad = [];
for (const id of ids) {
  const res = await fetch(
    `https://images.unsplash.com/photo-${id}?q=80&w=900&auto=format&fit=crop`,
    { method: "HEAD" }
  );
  if (res.ok) ok++;
  else bad.push(`${id} -> HTTP ${res.status}`);
}
console.log(`image urls verified: ${ok}/${ids.size}`);
if (bad.length) console.log("BAD:\n" + bad.join("\n"));
