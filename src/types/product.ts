export type Category =
  | "smartphones"
  | "headphones"
  | "earbuds"
  | "smartwatches"
  | "speakers"
  | "tablets"
  | "accessories";

export const CATEGORIES: Category[] = [
  "smartphones",
  "headphones",
  "earbuds",
  "smartwatches",
  "speakers",
  "tablets",
  "accessories",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  smartphones: "Smartphones",
  headphones: "Headphones",
  earbuds: "Earbuds",
  smartwatches: "Smartwatches",
  speakers: "Speakers",
  tablets: "Tablets",
  accessories: "Accessories",
};

export interface Product {
  /** Stable unique identifier, e.g. "aurora-neo-12-pro". */
  id: string;
  /** URL slug used for the product details route /product/[id]. */
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  /** Original price when the product is discounted. */
  originalPrice?: number;
  /** Mean customer rating, 1–5. */
  rating: number;
  reviews: number;
  image: string;
  imageAlt: string;
  description: string;
  features: string[];
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
  /** ISO date string used for the "Newest" sort. */
  addedAt: string;
}
