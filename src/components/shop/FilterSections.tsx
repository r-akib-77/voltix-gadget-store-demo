"use client";

import { Star } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/types/product";
import type { ShopFilters } from "@/lib/product-filters";
import { formatPrice } from "@/lib/format-price";

export interface QuickRange {
  label: string;
  min: number | null;
  max: number | null;
}

export interface FilterSectionProps {
  filters: ShopFilters;
  /** Merge these partial updates into the active filter state. */
  onChange: (updates: Partial<ShopFilters>) => void;
  /** Category → count lookups for checkbox annotations. */
  categoryCounts: Record<string, number>;
  brands: Array<{ name: string; count: number }>;
  quickRanges: QuickRange[];
}

function toggleListItem<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/**
 * Filter control stack shared by the desktop sidebar and the mobile drawer.
 * The drawer passes a draft state through the same typed interface.
 */
export function FilterSections({
  filters,
  onChange,
  categoryCounts,
  brands,
  quickRanges,
}: FilterSectionProps) {
  return (
    <div className="divide-y divide-neutral-100">
      {/* Category */}
      <FilterBlock
        title="Category"
        onClear={
          filters.categories.length > 0 ? () => onChange({ categories: [] }) : undefined
        }
      >
        <ul className="space-y-2.5">
          {CATEGORIES.map((category: Category) => (
            <CheckboxRow
              key={category}
              id={`cat-${category}`}
              checked={filters.categories.includes(category)}
              onChange={() =>
                onChange({ categories: toggleListItem(filters.categories, category) })
              }
              label={CATEGORY_LABELS[category]}
              annotation={String(categoryCounts[category] ?? 0)}
            />
          ))}
        </ul>
      </FilterBlock>

      {/* Brand */}
      <FilterBlock
        title="Brand"
        onClear={filters.brands.length > 0 ? () => onChange({ brands: [] }) : undefined}
      >
        <ul className="max-h-56 space-y-2.5 overflow-y-auto pr-1 scroll-x-thin">
          {brands.map((brand) => (
            <CheckboxRow
              key={brand.name}
              id={`brand-${brand.name.toLowerCase()}`}
              checked={filters.brands.includes(brand.name)}
              onChange={() => onChange({ brands: toggleListItem(filters.brands, brand.name) })}
              label={brand.name}
              annotation={String(brand.count)}
            />
          ))}
        </ul>
      </FilterBlock>

      {/* Price */}
      <FilterBlock
        title="Price (৳)"
        onClear={
          filters.minPrice != null || filters.maxPrice != null
            ? () => onChange({ minPrice: null, maxPrice: null })
            : undefined
        }
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <PriceInput
              id="price-min"
              label="Minimum price"
              value={filters.minPrice}
              placeholder="Min"
              onChange={(minPrice) => onChange({ minPrice })}
            />
            <span aria-hidden="true" className="text-zinc-400">
              –
            </span>
            <PriceInput
              id="price-max"
              label="Maximum price"
              value={filters.maxPrice}
              placeholder="Max"
              onChange={(maxPrice) => onChange({ maxPrice })}
            />
          </div>
          <ul role="list" className="flex flex-wrap gap-1.5">
            {quickRanges.map((range) => {
              const active =
                range.min != null &&
                range.max != null &&
                filters.minPrice === range.min &&
                filters.maxPrice === range.max;
              return (
                <li key={range.label}>
                  <button
                    type="button"
                    onClick={() =>
                      onChange(
                        active
                          ? { minPrice: null, maxPrice: null }
                          : { minPrice: range.min, maxPrice: range.max }
                      )
                    }
                    aria-pressed={active}
                    className={
                      active
                        ? "badge border border-accent-200 bg-accent-50 text-accent-800"
                        : "badge border border-neutral-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                    }
                  >
                    {range.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </FilterBlock>

      {/* Rating */}
      <FilterBlock
        title="Customer rating"
        onClear={
          filters.minRating != null ? () => onChange({ minRating: null }) : undefined
        }
      >
        <ul className="space-y-2.5">
          {[4.5, 4, 3.5].map((threshold) => (
            <li key={threshold} className="list-none">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                <input
                  type="radio"
                  name="rating-filter"
                  className="checkbox"
                  checked={filters.minRating === threshold}
                  onChange={() => onChange({ minRating: threshold })}
                />
                <span className="inline-flex items-center gap-1">
                  <Star aria-hidden="true" className="size-3.5 fill-amber-400 text-amber-400" />
                  {threshold} &amp; up
                </span>
              </label>
            </li>
          ))}
          <li className="list-none">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
              <input
                type="radio"
                name="rating-filter"
                className="checkbox"
                checked={filters.minRating == null}
                onChange={() => onChange({ minRating: null })}
              />
              All ratings
            </label>
          </li>
        </ul>
      </FilterBlock>

      {/* Availability + discount */}
      <FilterBlock title="Availability">
        <div className="space-y-2.5">
          <CheckboxRow
            id="stock-filter"
            checked={filters.inStockOnly}
            onChange={() => onChange({ inStockOnly: !filters.inStockOnly })}
            label="In stock only"
          />
          <CheckboxRow
            id="discount-filter"
            checked={filters.discountedOnly}
            onChange={() => onChange({ discountedOnly: !filters.discountedOnly })}
            label="Discounted only"
          />
        </div>
      </FilterBlock>
    </div>
  );
}

function FilterBlock({
  title,
  onClear,
  children,
}: {
  title: string;
  onClear?: () => void;
  children: ReactNode;
}) {
  return (
    <section className="py-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{title}</h3>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] font-medium text-accent-700 hover:text-accent-800"
          >
            Clear
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function CheckboxRow({
  id,
  checked,
  onChange,
  label,
  annotation,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  annotation?: string;
}) {
  return (
    <li className="list-none">
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
        <input id={id} type="checkbox" className="checkbox" checked={checked} onChange={onChange} />
        <span className="flex-1">{label}</span>
        {annotation && <span className="text-xs tabular-nums text-zinc-400">({annotation})</span>}
      </label>
    </li>
  );
}

/** Number input that commits the parsed value on blur or Enter. */
function PriceInput({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: number | null;
  placeholder: string;
  onChange: (value: number | null) => void;
}) {
  const [draft, setDraft] = useState(value == null ? "" : String(value));

  useEffect(() => {
    setDraft(value == null ? "" : String(value));
  }, [value]);

  function commit() {
    const text = draft.trim();
    if (text === "" || text === "0") {
      onChange(null);
      setDraft("");
      return;
    }
    const parsed = Number(text);
    if (Number.isNaN(parsed) || parsed < 0) {
      setDraft(value == null ? "" : String(value));
      return;
    }
    if (parsed !== value) onChange(Math.round(parsed));
  }

  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="sr-only">
        {label} in BDT
      </label>
      <input
        id={id}
        type="number"
        min={0}
        inputMode="numeric"
        autoComplete="off"
        placeholder={placeholder}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit();
            (event.target as HTMLInputElement).blur();
          }
        }}
        className="input h-9 px-2.5 text-center text-xs tabular-nums"
      />
      <span className="sr-only">{formatPrice(0).slice(0, 1)} BDT</span>
    </div>
  );
}
