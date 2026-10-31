/**
 * Price formatting for the demo store.
 *
 * BDT (৳) is the initial demo currency. To rebrand for an international
 * client, change CURRENCY below — e.g. `{ symbol: "$", locale: "en-US" }`
 * — and every price on the site updates automatically.
 */
export const CURRENCY = {
  code: "BDT",
  symbol: "৳",
  /** Number formatting locale (grouping/decimals); symbol is always prefixed. */
  locale: "en-US",
} as const;

export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat(CURRENCY.locale, {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${CURRENCY.symbol}${formatted}`;
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}
