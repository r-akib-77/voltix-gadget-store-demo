/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — the demo store needs no backend, which makes it
  // trivially hostable on Cloudflare Pages / Workers static assets.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
