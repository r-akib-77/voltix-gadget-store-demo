// Dev utility: download verification thumbnails for candidate product images.
// Usage: node scripts/download-thumbs.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const IDS = [
  // smartphones
  "1592750475338-74b7b21085ab",
  "1511707171634-5f897ff02aa9",
  "1695048133142-1a20484d2569",
  "1598327105666-5b89351aff97",
  "1605236453806-6ff36851218e",
  "1512941937669-90a1b58e7e9c",
  "1610945265064-0e34e5519bbf",
  "1610945415295-d9bbf067e59c",
  "1592899677977-9c10ca588bbd",
  // headphones
  "1603302576837-37561b2e2302",
  "1627123424574-724758594e93",
  "1583394838336-acd977736f90",
  "1546435770-a3e426bf472b",
  "1591799264318-7e6ef8ddb7ea",
  "1606741965326-cb990ae01bb2",
  "1611186871348-b1ce696e52c9",
  "1592286927505-2fd0e3a9e75d",
  "1587829741301-dc798b83add3",
  "1608043152269-423dbba4e7e1",
  // earbuds
  "1677442136019-21780ecad995",
  "1602143407151-7111542de6e8",
  "1618366712010-f4ae9c647dcb",
  "1588872657578-7efd1f1555ed",
  // smartwatch
  "1508685096489-7aacd43bd3b1",
  "1606144042614-b2417e99c4e3",
  "1546868871-7041f2a55e12",
  "1617043786394-f977fa12eddf",
  // speakers
  "1589003077984-894e133dabab",
  "1585771724684-38269d6639fd",
  "1545454675-3531b543be5d",
  "1558537348-c0f8e733989d",
  "1596459602808-8b3f4256a40b",
  "1605460377770-2c37171a3427",
  // tablets
  "1544244015-0df4b3ffc6b0",
  "1585790050230-5dd28404ccb9",
  "1561154464-82e9adf32764",
  "1587033411391-5d9e51cce126",
  // accessories
  "1615663245857-ac93bb7c39e7",
  "1583863788434-e58a36330cf0",
  "1591291621164-2c6367723317",
  "1625842268584-8f3296236761",
  "1585386959984-a4155224a1ad",
  // hero
  "1550009158-9ebf69173e03",
];

await mkdir("scripts/thumbs", { recursive: true });
const manifest = [];
for (const id of IDS) {
  const url = `https://images.unsplash.com/photo-${id}?q=80&w=280&auto=format&fit=crop`;
  const file = `scripts/thumbs/${id}.jpg`;
  if (!existsSync(file)) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`BAD ${res.status} ${id}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(file, buf);
    } catch (e) {
      console.log(`ERR ${id}: ${e.message}`);
      continue;
    }
  }
  manifest.push({ id, file, url: `https://images.unsplash.com/photo-${id}` });
}
await writeFile("scripts/thumb-manifest.json", JSON.stringify(manifest, null, 2));
console.log(`downloaded ${manifest.length}/${IDS.length} thumbs`);
