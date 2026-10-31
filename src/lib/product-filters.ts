import { CATEGORIES, CATEGORY_LABELS, type Category, type Product } from "@/types/product";

/** Every sort mode offered by the shop toolbar. */
export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";

export interface SortOption {
  value: SortKey;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "discount", label: "Biggest Discount" },
];

export interface ShopFilters {
  query: string;
  categories: Category[];
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  /** Minimum average rating threshold, e.g. 4 means "4★ and up". */
  minRating: number | null;
  inStockOnly: boolean;
  discountedOnly: boolean;
  sort: SortKey;
}

export const DEFAULT_FILTERS: ShopFilters = {
  query: "",
  categories: [],
  brands: [],
  minPrice: null,
  maxPrice: null,
  minRating: null,
  inStockOnly: false,
  discountedOnly: false,
  sort: "featured",
};

/** Discount percentage (0–100) or null when the product isn't discounted. */
export function getDiscountPercent(product: Product): number | null {
  if (product.originalPrice == null || product.originalPrice <= product.price) {
    return null;
  }
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

export function isDiscounted(product: Product): boolean {
  return getDiscountPercent(product) != null;
}

/** Lightweight relevance match used by the header search and the shop filter. */
function matchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack =
    `${product.name} ${product.brand} ${CATEGORY_LABELS[product.category]} ${product.description}`.toLowerCase();
  // Every whitespace-separated term must be present for tighter search UX.
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

/** Suggestion list for the header search (name, brand and category matching). */
export function searchSuggestions(products: Product[], query: string, limit = 5): Product[] {
  if (!query.trim()) return [];
  return sortProducts(
    products.filter((p) => matchesQuery(p, query)),
    "featured"
  ).slice(0, limit);
}

/**
 * Apply every active filter and the active sort to a product list.
 * Kept as one pure, reusable function so all UIs (sidebar, drawer, chips)
 * behave identically.
 */
export function filterProducts(products: Product[], filters: ShopFilters): Product[] {
  const result = products.filter((product) => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    if (filters.minPrice != null && product.price < filters.minPrice) return false;
    if (filters.maxPrice != null && product.price > filters.maxPrice) return false;
    if (filters.minRating != null && product.rating < filters.minRating) return false;
    if (filters.inStockOnly && !product.inStock) return false;
    if (filters.discountedOnly && !product.originalPrice) return false;
    if (!matchesQuery(product, filters.query)) return false;
    return true;
  });
  return sortProducts(result, filters.sort);
}

/** Stable, non-mutating sort. `sort()` is stable in JS, keeping featured order deterministic. */
export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "newest":
      return list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case "discount":
      return list.sort(
        (a, b) => (getDiscountPercent(b) ?? -1) - (getDiscountPercent(a) ?? -1)
      );
    case "featured":
    default:
      return list.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.bestseller) - Number(a.bestseller) ||
          b.rating - a.rating
      );
  }
}

/** How many individual filter facets are active (used for badges / chips). */
export function countActiveFilters(filters: ShopFilters): number {
  return (
    filters.categories.length +
    filters.brands.length +
    (filters.minPrice != null || filters.maxPrice != null ? 1 : 0) +
    (filters.minRating != null ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.discountedOnly ? 1 : 0)
  );
}

export function isDefaultFilters(filters: ShopFilters): boolean {
  return countActiveFilters(filters) === 0 && filters.query === "" && filters.sort === "featured";
}

/* ------------------------------------------------------------------ */
/* URL serialisation — shop state is shareable via query params.       */
/* ------------------------------------------------------------------ */

function parseParamList(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function filtersFromParams(params: URLSearchParams): ShopFilters {
  const categories = parseParamList(params.get("category")).filter(
    (c): c is Category => CATEGORIES.includes(c as Category)
  );
  const brands = parseParamList(params.get("brand"));
  const minRatingRaw = Number(params.get("rating"));
  const minPriceRaw = Number(params.get("min"));
  const maxPriceRaw = Number(params.get("max"));
  const sortRaw = params.get("sort") as SortKey | null;

  return {
    query: params.get("q") ?? "",
    categories,
    brands,
    minPrice: params.get("min") != null && !Number.isNaN(minPriceRaw) ? minPriceRaw : null,
    maxPrice: params.get("max") != null && !Number.isNaN(maxPriceRaw) ? maxPriceRaw : null,
    minRating:
      params.get("rating") != null && !Number.isNaN(minRatingRaw) ? minRatingRaw : null,
    inStockOnly: params.get("stock") === "1",
    discountedOnly: params.get("sale") === "1",
    sort: sortRaw != null && SORT_OPTIONS.some((o) => o.value === sortRaw) ? sortRaw : "featured",
  };
}

export function paramsFromFilters(filters: ShopFilters): string {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.categories.length > 0) params.set("category", filters.categories.join(","));
  if (filters.brands.length > 0) params.set("brand", filters.brands.join(","));
  if (filters.minPrice != null) params.set("min", String(filters.minPrice));
  if (filters.maxPrice != null) params.set("max", String(filters.maxPrice));
  if (filters.minRating != null) params.set("rating", String(filters.minRating));
  if (filters.inStockOnly) params.set("stock", "1");
  if (filters.discountedOnly) params.set("sale", "1");
  if (filters.sort !== "featured") params.set("sort", filters.sort);
  const s = params.toString();
  return s ? `?${s}` : "";
}
