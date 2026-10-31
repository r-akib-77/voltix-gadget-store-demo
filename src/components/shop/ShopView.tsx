"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  filterProducts,
  filtersFromParams,
  paramsFromFilters,
  type ShopFilters,
  type SortKey,
} from "@/lib/product-filters";
import { ActiveFilterChips } from "@/components/shop/ActiveFilterChips";
import { MobileFilterDrawer } from "@/components/shop/MobileFilterDrawer";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SortSelect } from "@/components/shop/SortSelect";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { CATEGORY_LABELS } from "@/types/product";

/** Price preset chips that match this catalogue's banding. Taka formatted in FilterSections. */
const QUICK_RANGES = [
  { label: "Under ৳5,000", min: 0, max: 4999 },
  { label: "৳5k – ৳15k", min: 5000, max: 15000 },
  { label: "৳15k – ৳30k", min: 15000, max: 30000 },
  { label: "৳30k – ৳80k", min: 30000, max: 80000 },
  { label: "৳80k+", min: 80000, max: null },
];

/**
 * Full shop experience: synced URL params, live filtering, sidebar (desktop) and
 * drawer (mobile), removable chips and every sort mode.
 */
export function ShopView() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ShopFilters>(() =>
    filtersFromParams(searchParams)
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selfSyncRef = useRef<string | null>(null);

  /* ------------------------------------------------------------------ */
  /* URL synchronisation (shareable, back-button friendly)               */
  /* ------------------------------------------------------------------ */

  // Push filter changes to the URL without re-render churn.
  useEffect(() => {
    const qs = paramsFromFilters(filters);
    const url = `${window.location.pathname}${qs}`;
    selfSyncRef.current = qs;
    window.history.replaceState(null, "", url);
  }, [filters]);

  // React to soft navigation (e.g. header links) that lands here with new params.
  const paramsString = searchParams.toString();
  useEffect(() => {
    if (selfSyncRef.current === null) return;
    const normalized = paramsFromFilters(filtersFromParams(searchParams));
    if (normalized !== selfSyncRef.current) {
      setFilters(filtersFromParams(searchParams));
    }
  }, [paramsString, searchParams]);

  /* ------------------------------------------------------------------ */
  /* Derived data                                                        */
  /* ------------------------------------------------------------------ */

  const results = useMemo(() => filterProducts(ALL_PRODUCTS, filters), [filters]);
  const activeCount = countActiveFilters(filters);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const product of ALL_PRODUCTS) {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const brands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of ALL_PRODUCTS) {
      counts.set(product.brand, (counts.get(product.brand) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  /* ------------------------------------------------------------------ */
  /* Handlers                                                            */
  /* ------------------------------------------------------------------ */

  const updatePartial = (updates: Partial<ShopFilters>) => {
    setFilters((current) => ({ ...current, ...updates }));
  };

  const clearAll = () => setFilters({ ...DEFAULT_FILTERS });

  const setSort = (sort: SortKey) => updatePartial({ sort });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 pb-20 lg:grid-cols-4 lg:gap-10">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block" aria-label="Product filters sidebar">
          <div className="sticky top-32">
            <p className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Filters
            </p>
            <ProductFilters
              filters={filters}
              onChange={updatePartial}
              categoryCounts={categoryCounts}
              brands={brands}
              quickRanges={QUICK_RANGES}
            />
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-3">
          <ActiveFilterChips filters={filters} onChange={updatePartial} onClearAll={clearAll} />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <p role="status" aria-live="polite" className="text-sm text-zinc-500">
              <strong className="font-semibold text-zinc-950 tabular-nums">
                {results.length}
              </strong>{" "}
              of {ALL_PRODUCTS.length} products
              {activeCount > 0 || filters.query ? " match" : ""}
            </p>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="btn btn-sm btn-outline lg:hidden"
                aria-haspopup="dialog"
                aria-expanded={drawerOpen}
              >
                <SlidersHorizontal aria-hidden="true" className="size-4" />
                Filters
                {activeCount > 0 && (
                  <span className="ml-0.5 inline-flex size-5 items-center justify-center rounded-full bg-accent-600 px-1 text-[11px] font-semibold text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <SortSelect value={filters.sort} onChange={setSort} />
            </div>
          </div>

          <div className="mt-6">
            <ProductGrid
              products={results}
              queryActive={Boolean(filters.query.trim())}
              onClearFilters={clearAll}
            />
          </div>

          <p className="mt-10 text-center text-xs text-zinc-400">
            {Object.keys(CATEGORY_LABELS).length} categories ·{" "}
            {brands.length} brands · demo catalogue refreshed {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        committed={filters}
        onApply={setFilters}
        categoryCounts={categoryCounts}
        brands={brands}
        quickRanges={QUICK_RANGES}
      />
    </div>
  );
}
