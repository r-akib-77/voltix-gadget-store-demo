"use client";

import { FilterX } from "lucide-react";
import { CATEGORY_LABELS, type Category } from "@/types/product";
import { DEFAULT_FILTERS, countActiveFilters, type ShopFilters } from "@/lib/product-filters";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/cn-utils";

interface ActiveFilterChipsProps {
  filters: ShopFilters;
  onChange: (updates: Partial<ShopFilters>) => void;
  onClearAll: () => void;
}

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

/** Individual removable chips for every active facet + a Clear all action. */
export function ActiveFilterChips({ filters, onChange, onClearAll }: ActiveFilterChipsProps) {
  if (countActiveFilters(filters) === 0 && !filters.query) return null;

  const chips: Chip[] = [];

  if (filters.query) {
    chips.push({
      key: "q",
      label: `Search: “${filters.query.slice(0, 28)}${filters.query.length > 28 ? "…" : ""}”`,
      onRemove: () => onChange({ query: "" }),
    });
  }

  filters.categories.forEach((category: Category) => {
    chips.push({
      key: `cat-${category}`,
      label: CATEGORY_LABELS[category],
      onRemove: () =>
        onChange({ categories: filters.categories.filter((c) => c !== category) }),
    });
  });

  filters.brands.forEach((brand) => {
    chips.push({
      key: `brand-${brand}`,
      label: brand,
      onRemove: () => onChange({ brands: filters.brands.filter((b) => b !== brand) }),
    });
  });

  if (filters.minPrice != null || filters.maxPrice != null) {
    const from = filters.minPrice != null ? formatPrice(filters.minPrice) : "৳0";
    const to = filters.maxPrice != null ? formatPrice(filters.maxPrice) : "∞";
    chips.push({
      key: "price",
      label: `${from} – ${to}`,
      onRemove: () => onChange({ minPrice: null, maxPrice: null }),
    });
  }

  if (filters.minRating != null) {
    chips.push({
      key: "rating",
      label: `★ ${filters.minRating} & up`,
      onRemove: () => onChange({ minRating: null }),
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: "stock",
      label: "In stock",
      onRemove: () => onChange({ inStockOnly: false }),
    });
  }

  if (filters.discountedOnly) {
    chips.push({
      key: "sale",
      label: "Discounted",
      onRemove: () => onChange({ discountedOnly: false }),
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Active filters">
      <span className="sr-only">Active filters:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white py-1.5 pl-3.5 pr-2.5 text-[13px] font-medium text-zinc-700 shadow-card transition-colors hover:border-zinc-400 hover:text-zinc-950"
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label}
          <span
            aria-hidden="true"
            className="text-zinc-400 transition-colors group-hover:text-zinc-800"
          >
            ×
          </span>
        </button>
      ))}

      {(chips.length > 1 || countActiveFilters(filters) > 0) && (
        <button
          type="button"
          onClick={onClearAll}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 py-1.5 pl-3.5 pr-3 text-[13px] font-semibold transition-colors hover:bg-accent-100",
            "text-accent-700"
          )}
        >
          <FilterX aria-hidden="true" className="size-3.5" />
          Clear all
        </button>
      )}
    </div>
  );
}

export { DEFAULT_FILTERS };
