import { getDiscountPercent } from "@/lib/product-filters";
import type { Product } from "@/types/product";

/** Small "−15%" pill shown next to prices in lists. */
export function DiscountBadge({ product }: { product: Product }) {
  const discount = getDiscountPercent(product);
  if (discount == null) return null;
  return (
    <span className="font-medium text-rose-600" aria-hidden="true">
      −{discount}%
    </span>
  );
}
