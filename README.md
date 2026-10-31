# Voltix — Gadget Store Demo

A polished, **frontend-only** e-commerce demo for a fictional gadget store. Built with
Next.js 15 (App Router, static export), TypeScript, Tailwind CSS v4 and Framer Motion.

> **Demo notice** — Voltix is a portfolio/demo project. There is no backend, database,
> auth or payment integration. Cart, wishlist and newsletter state live entirely in
> `localStorage`, and checkout is a simulated preview.

**Live site:** https://voltix-gadget-store-demo.pages.dev
**Repo:** https://github.com/r-akib-77/voltix-gadget-store-demo

---

## Features

- **Home** — compact hero, category cards with live counts, featured rail, trust bar,
  sale banner and a frontend-only newsletter form with local validation.
- **Shop** (`/shop`) — 36-product catalogue with:
  - filter sidebar on desktop, draft-state filter drawer on mobile;
  - multi-select categories & brands, min/max price (with quick ranges), rating
    thresholds, in-stock-only and discounted-only toggles;
  - sorting: featured, newest, price ↑/↓, rating, discount;
  - removable active-filter chips + "Clear all", empty states, live result counts;
  - filter/sort state **synced to the URL** (shareable, back-button friendly) via
    pure, typed functions in `src/lib/product-filters.ts`.
- **Product details** (`/product/[slug]`) — gallery card, pricing with discount badges,
  quantity stepper, add-to-cart, wishlist toggle, delivery/warranty perks and related
  products. All 36 product pages are prerendered statically.
- **Cart & wishlist** — slide-in drawers plus full pages; every line searchable,
  editable and persisted to `localStorage` (`voltix:cart:v1`, `voltix:wishlist:v1`).
- **Demo checkout** (`/checkout`) — simulated, clearly labeled; validates contact
  fields locally and collects nothing.
- **Extras** — toast notifications, global product search with keyboard-navigable
  suggestions, sticky header with live wish/cart counts, 404 page, `robots.txt`,
  `sitemap.xml`, skip-to-content link.

## Tech stack

| Layer     | Choice                                              |
| --------- | --------------------------------------------------- |
| Framework | Next.js 15 (App Router, `output: "export"`)         |
| Language  | TypeScript (strict)                                |
| Styling   | Tailwind CSS v4 (CSS-first `@theme` tokens)         |
| Motion    | Framer Motion (150–250 ms, `prefers-reduced-motion` aware) |
| Icons     | Lucide React                                       |
| Fonts     | Inter + Space Grotesk (`next/font`, self-hosted)   |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run lint
npx tsc --noEmit   # type-check
```

### Configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your canonical
deploy URL. Everything else runs without configuration.

### Currency

Prices are formatted in `src/lib/format-price.ts` (BDT ৳ by default). Adjust the
currency symbol/locale there and it propagates across the entire UI.

## Architecture notes

- `src/data/products.ts` — typed, static catalogue (brands, categories, prices in BDT).
- `src/lib/product-filters.ts` — the single source of truth for filtering, sorting and
  URL serialization (`filterProducts`, `sortProducts`, `filtersFromParams`,
  `paramsFromFilters`, …), reused by shop and search suggestions.
- `src/components/providers/StoreProvider.tsx` — one context for cart, wishlist,
  drawers and toasts; hydration-safe so SSR markup always matches.
- `src/components/ui/ProductImage.tsx` — lazy images with a built-in SVG fallback for
  any URL that fails to load (no broken images ship).

## Performance & accessibility

- Server components for all static content; client islands only where interactivity needs them.
- Self-hosted fonts, `sizes` hints on every responsive image, priority loading above the fold only.
- Semantic landmarks, visible focus rings, ARIA labelling on filters/dialogs/pickers,
  Escape-to-close and scroll locking in drawers, keyboard-navigable search.
- Motion durations between 150–250 ms, disabled under `prefers-reduced-motion`.

## Deployment

The site is a fully static export (Next.js `output: "export"`), built to `./out` and
published on **Cloudflare Pages** via direct upload.

## Image credits

Product photography uses freely licensed photos from [Unsplash](https://unsplash.com)
(hot-linked from the official CDN, verified reachable at build time). Unsplash license:
https://unsplash.com/license. No endorsement claimed.

## Limitations (by design)

- No backend, database, real auth, payments or order fulfillment.
- Newsletter/checkout forms validate locally and submit nothing.
- Prices/stock are fictional; stock state exists to exercise availability filters.
