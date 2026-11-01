/**
 * Cloudflare Pages Direct Upload — asset phase.
 * 1. Upsert-hashes all files in out/ (POST /pages/assets/upsert-hashes)
 * 2. Upload only the missing ones (POST /pages/assets/upload)
 * Requires an upload-token JWT passed as PAGES_JWT env (obtained via the
 * MCP upload-token endpoint). Deployment creation is a separate step.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep, extname } from "node:path";
import { blake3 } from "hash-wasm";

const OUT_DIR = "out";
const API = "https://api.cloudflare.com/client/v4";
const JWT = process.env.PAGES_JWT;
if (!JWT) {
  console.error("PAGES_JWT env required");
  process.exit(1);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".xml": "application/xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** vMatches wrangler's hash: blake3(base64(content) + extension).hex.slice(0, 32). */
async function pagesHash(filePath, content) {
  const extension = extname(filePath).substring(1);
  const digestHex = await blake3(content.toString("base64") + extension, 256);
  return digestHex.slice(0, 32);
}

function authHeaders(json = true) {
  return {
    Authorization: `Bearer ${JWT}`,
    ...(json ? { "Content-Type": "application/json" } : {}),
  };
}

/* Collect files + hashes. */
const files = []; // { key(hash), path, base64, contentType, size }
const manifest = {};
for await (const filePath of walk(OUT_DIR)) {
  const rel = relative(OUT_DIR, filePath).split(sep).join("/");
  const content = await readFile(filePath);
  const hash = await pagesHash(filePath, content);
  const contentType = MIME[extname(filePath).toLowerCase()] ?? "application/octet-stream";
  files.push({ key: hash, path: rel, base64: content.toString("base64"), contentType, size: content.length });
  manifest[`/${rel}`] = hash;
}
console.log(`hashed ${files.length} files`);

/* 1. Check which hashes are missing (wrangler does NOT upsert first). */
const hashes = files.map(({ key }) => key);
let missing = [];
const missingRes = await fetch(`${API}/pages/assets/check-missing`, {
  method: "POST",
  headers: authHeaders(),
  body: JSON.stringify({ hashes }),
});
if (!missingRes.ok) {
  console.error("check-missing failed", missingRes.status, (await missingRes.text()).slice(0, 500));
  process.exit(1);
}
const missingBody = await missingRes.json();
const missingKeys = new Set(missingBody.result ?? []);
missing = files.filter((f) => missingKeys.has(f.key));
console.log(`missing from store: ${missing.length}/${files.length}`);

/* 3. Upload missing in batches of 25. */
const BATCH = 25;
for (let i = 0; i < missing.length; i += BATCH) {
  const batch = missing.slice(i, i + BATCH);
  const res = await fetch(`${API}/pages/assets/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(
      batch.map(({ key, base64, contentType }) => ({
        key,
        value: base64,
        base64: true,
        metadata: { contentType },
      }))
    ),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`upload batch ${i} failed`, res.status, body.slice(0, 500));
    process.exit(1);
  }
  console.log(`uploaded batch ${i / BATCH + 1} (${batch.length} files)`);
}

/* 3. Upsert-hashes AFTER uploads (required order for persistence). */
const upsertRes = await fetch(`${API}/pages/assets/upsert-hashes`, {
  method: "POST",
  headers: authHeaders(),
  body: JSON.stringify({ hashes }),
});
if (!upsertRes.ok) {
  console.error("upsert-hashes failed", upsertRes.status, (await upsertRes.text()).slice(0, 500));
  process.exit(1);
}
console.log("upsert-hashes ok");

/* Write manifest for the deployment step (keys keep the leading slash). */
await writeFile("scripts/pages-manifest.json", JSON.stringify(manifest));
console.log("asset phase complete");
