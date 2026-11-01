/** Builds the multipart body for the Pages Direct Upload deployment creation. */
import { readFile, writeFile } from "node:fs/promises";

const raw = JSON.parse(await readFile("scripts/pages-manifest.json", "utf8"));
/* Manifest keys are URL paths with a leading slash (same shape as wrangler). */
const manifest = { ...raw };

const BOUNDARY = "----VoltixPagesUpload7f3a9c";
const parts = [];
function field(name, value) {
  parts.push(
    `--${BOUNDARY}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
  );
}
field("branch", "main");
field("commit_message", "Deploy Voltix static export (direct upload)");
field("commit_hash", "d536867");
field("commit_dirty", "false");
field("manifest", JSON.stringify(manifest));
parts.push(`--${BOUNDARY}--\r\n`);

const body = parts.join("");
await writeFile("scripts/deploy-body.txt", body);
console.log(
  `deploy body written: ${body.length} bytes, manifest entries: ${Object.keys(manifest).length}`
);
