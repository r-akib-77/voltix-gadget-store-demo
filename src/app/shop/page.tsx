import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/ShopView";
import { countProducts, getBrands } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop all gadgets",
  description:
    "Browse the full Voltix catalogue — smartphones, headphones, earbuds, smartwatches, speakers, tablets and accessories with filters for brand, price, rating and availability.",
};

function ShopHeader() {
  return (
    <header className="mx-auto w-full max-w-7xl px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="rounded-sm hover:text-zinc-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-zinc-800">
            Shop
          </li>
        </ol>
      </nav>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        All gadgets
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
        {countProducts()} products from {getBrands().length} brands — filter by category, brand,
        price, rating, stock and discounts. Your selected filters stay synced with the URL.
      </p>
    </header>
  );
}

function ShopFallback() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading products">
      <div className="grid gap-8 lg:grid-cols-4 lg:gap-10">
        <div className="hidden h-96 animate-pulse rounded-2xl bg-neutral-100 lg:block" />
        <div className="grid flex-1 grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 md:gap-x-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl bg-neutral-100"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <ShopHeader />
      <Suspense fallback={<ShopFallback />}>
        <ShopView />
      </Suspense>
    </>
  );
}
