"use client";

import { SORT_OPTIONS, type SortKey } from "@/lib/product-filters";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

/** Styled native select — accessible by default, consistent focus states. */
export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <label htmlFor="sort-select" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        className="h-10 cursor-pointer appearance-none rounded-full border border-neutral-300 bg-white pl-4 pr-9 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-400 focus:outline-2 focus:outline-offset-2 focus:outline-accent-600"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.65rem center",
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
