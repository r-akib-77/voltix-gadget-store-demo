"use client";

import { ArrowRight, Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/hooks/use-wishlist";
import { ProductCard } from "@/components/shop/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

/** Saved-items grid, synced with the header drawer. */
export function WishlistView() {
  const { products, count, toggleWishlist, hydrated } = useWishlist();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="rounded-sm hover:text-zinc-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-zinc-800">
            Wishlist
          </li>
        </ol>
      </nav>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950">
          Your wishlist
        </h1>
        {hydrated && count > 0 && (
          <button
            type="button"
            onClick={() => products.forEach((p) => toggleWishlist(p.id))}
            className="btn btn-sm btn-outline"
          >
            <Trash2 aria-hidden="true" className="size-4" />
            Clear wishlist ({count})
          </button>
        )}
      </div>

      {!hydrated ? (
        <div className="mt-8 grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-2xl bg-neutral-100" aria-hidden="true" />
          ))}
        </div>
      ) : count === 0 ? (
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white shadow-card">
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save gadgets you love by tapping the heart on any product card."
            action={
              <Link href="/shop" className="btn btn-primary">
                Browse products
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
