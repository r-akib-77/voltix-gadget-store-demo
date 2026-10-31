"use client";

import { FilterSections, type QuickRange } from "@/components/shop/FilterSections";
import type { ShopFilters } from "@/lib/product-filters";

interface ProductFiltersProps {
  filters: ShopFilters;
  onChange: (updates: Partial<ShopFilters>) => void;
  categoryCounts: Record<string, number>;
  brands: Array<{ name: string; count: number }>;
  quickRanges: QuickRange[];
}

/** Desktop compact filter sidebar (sticky). */
export function ProductFilters({
  filters,
  onChange,
  categoryCounts,
  brands,
  quickRanges,
}: ProductFiltersProps) {
  return (
    <div aria-label="Product filters">
      <FilterSections
        filters={filters}
        onChange={onChange}
        categoryCounts={categoryCounts}
        brands={brands}
        quickRanges={quickRanges}
      />
    </div>
  );
}
