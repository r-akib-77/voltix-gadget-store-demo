"use client";

import Link from "next/link";
import { FilterX, SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  /** True when a query removed everything (bare-bones message copy). */
  queryActive: boolean;
  onClearFilters: () => void;
}

/** Responsive catalogue grid with a helpful empty state. */
export function ProductGrid({ products, queryActive, onClearFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-card">
        <EmptyState
          icon={SearchX}
          title="No products match these filters"
          description={
            queryActive
              ? "Nothing found for that search. Check the spelling or try a broader term."
              : "Try widening the price range or removing a filter or two."
          }
          action={
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button type="button" onClick={onClearFilters} className="btn btn-primary">
                <FilterX aria-hidden="true" className="size-4" />
                Clear all filters
              </button>
              <Link href="/shop" className="btn btn-outline">
                Reset to full catalogue
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 md:gap-x-5"
      aria-busy={false}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 3} />
      ))}
    </div>
  );
}
