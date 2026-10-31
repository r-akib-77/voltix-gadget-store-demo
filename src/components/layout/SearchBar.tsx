"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_PRODUCTS } from "@/data/products";
import { searchSuggestions } from "@/lib/product-filters";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/cn-utils";

export interface NavLink {
  label: string;
  href: string;
  /** Category slugs represented by this nav destination (for active-link logic). */
  categories?: string[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Smartphones", href: "/shop?category=smartphones", categories: ["smartphones"] },
  { label: "Audio", href: "/shop?category=headphones,earbuds,speakers", categories: ["headphones", "earbuds", "speakers"] },
  { label: "Accessories", href: "/shop?category=accessories", categories: ["accessories"] },
];

interface SearchBarProps {
  /** Focus the input on mount (mobile search panel). */
  autoFocus?: boolean;
  placeholder?: string;
}

const NO_RESULTS = "No matches — try “earbuds”, “Aurora”, or “charger”.";

/**
 * Global product search with instant suggestions across names, brands and
 * categories. Arrow keys navigate, Enter opens a product or the shop page.
 */
export function SearchBar({ autoFocus = false, placeholder = "Search gadgets, brands…" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(
    () => (query.trim() ? searchSuggestions(ALL_PRODUCTS, query, 5) : []),
    [query]
  );

  const listOpen = focused && query.trim().length > 0;

  /* Close on outside pointer. */
  useEffect(() => {
    if (!listOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setFocused(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [listOpen]);

  function goShop(q: string) {
    setFocused(false);
    setActiveIndex(-1);
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  function goProduct(slug: string) {
    setFocused(false);
    setActiveIndex(-1);
    setQuery("");
    router.push(`/product/${slug}`);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setFocused(false);
      setActiveIndex(-1);
      return;
    }
    if (!suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        goProduct(suggestions[activeIndex].slug);
      } else {
        goShop(query.trim());
      }
    }
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        />
        <label htmlFor={autoFocus ? "site-search-mobile" : "site-search"} className="sr-only">
          Search products
        </label>
        <input
          id={autoFocus ? "site-search-mobile" : "site-search"}
          type="search"
          role="combobox"
          aria-expanded={listOpen}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          enterKeyHint="search"
          className="input h-10 pl-10"
        />
      </div>

      {listOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute inset-x-0 top-12 z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lift"
        >
          {suggestions.length === 0 ? (
            <p className="px-4 py-3.5 text-sm text-zinc-500">{NO_RESULTS}</p>
          ) : (
            <ul>
              {suggestions.map((product, index) => (
                <li key={product.id} role="option" aria-selected={index === activeIndex}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => goProduct(product.slug)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                      index === activeIndex ? "bg-neutral-100" : "bg-white"
                    )}
                  >
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                        unoptimized
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-zinc-900">
                        {product.name}
                      </span>
                      <span className="block text-xs capitalize text-zinc-500">
                        {product.brand} · {product.category}
                      </span>
                    </span>
                    <span className="text-sm font-medium tabular-nums text-zinc-900">
                      {formatPrice(product.price)}
                    </span>
                  </button>
                </li>
              ))}
              <li className="border-t border-neutral-200">
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => goShop(query.trim())}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-accent-700 transition-colors hover:bg-accent-50"
                >
                  Search shop for “{query.trim().slice(0, 32)}{query.trim().length > 32 ? "…" : ""}”
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
