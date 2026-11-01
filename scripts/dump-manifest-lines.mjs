/** Writes the manifest as pretty lines (one path→hash pair per line) for inlining. */
import { readFile, writeFile } from "node:fs/promises";

const m = JSON.parse(await readFile("scripts/pages-manifest.json", "utf8"));
const lines = Object.entries(m)
  .map(([path, hash]) => `    ["${path.replace(/^\//, "")}", "${hash}"],`)
  .join("\n");
await writeFile("scripts/manifest-lines.txt", lines);
console.log("entries:", Object.keys(m).length);
