/** Minimal static file server for smoke-testing the exported site. */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const OUT_DIR = resolve("out");
const PORT = Number(process.env.PORT ?? 4273);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    // Try exact file, then +.html (Pages-style resolution), then directory index.
    const candidates = [
      join(OUT_DIR, pathname),
      join(OUT_DIR, `${pathname}.html`),
      join(OUT_DIR, pathname, "index.html"),
    ];
    let body = null;
    for (const file of candidates) {
      try {
        body = await readFile(file);
        break;
      } catch {
        /* next candidate */
      }
    }
    if (!body) {
      const notFound = await readFile(join(OUT_DIR, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(notFound);
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[extname(pathname)] ?? "application/octet-stream" });
    res.end(body);
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
});

server.listen(PORT, () => {
  console.log(`preview server on http://localhost:${PORT}`);
});
