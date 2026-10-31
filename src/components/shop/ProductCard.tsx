"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart, useWishlist } from "@/hooks/use-cart";
import { getDiscountPercent } from "@/lib/product-filters";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/cn-utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { RatingReadout } from "@/components/ui/RatingReadout";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  /** Prioritized image loading (first fold only). */
  priority?: boolean;
  className?: string;
}

/** Reusable catalogue card: image, brand, name, rating, price, wishlist + cart actions. */
export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const reduceMotion = useReducedMotion();

  const discount = getDiscountPercent(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = !product.inStock;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card transition-all duration-200 hover:shadow-lift focus-within:border-neutral-300",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-t-2xl bg-neutral-100"
        aria-label={`View ${product.name} details`}
      >
        <ProductImage
          src={product.image}
          alt={product.imageAlt}
          priority={priority}
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 31vw, 46vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {discount != null && (
            <span className="badge bg-rose-600 text-white shadow-sm">−{discount}%</span>
          )}
          {product.bestseller && discount == null && (
            <span className="badge border border-amber-200 bg-amber-50 text-amber-800 shadow-sm">
              Bestseller
            </span>
          )}
          {outOfStock && (
            <span className="badge bg-zinc-900/85 text-white shadow-sm backdrop-blur">Sold out</span>
          )}
        </div>
      </Link>

      {/* Wishlist toggle */}
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={
          wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
        }
        aria-pressed={wishlisted}
        className="absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-zinc-600 shadow-sm backdrop-blur transition-colors duration-200 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
      >
        <Heart
          aria-hidden="true"
          className={cn(
            "size-4 transition-colors duration-150",
            wishlisted && "fill-rose-600 text-rose-600"
          )}
        />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {product.brand}
        </p>
        <h3 className="mt-1 text-[15px] font-medium leading-snug text-zinc-950">
          <Link
            href={`/product/${product.slug}`}
            className="rounded-sm transition-colors hover:text-accent-700"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5">
          <RatingReadout rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="leading-tight">
            <p className="text-base font-semibold tabular-nums text-zinc-950">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice != null && (
              <p className="text-xs tabular-nums text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          <motion.button
            type="button"
            whileTap={reduceMotion ? undefined : { scale: 0.88 }}
            transition={{ duration: 0.15 }}
            disabled={outOfStock}
            onClick={() => addToCart(product.id, 1)}
            aria-label={outOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
            className={cn(
              "flex size-9 items-center justify-center rounded-full text-white shadow-sm transition-colors duration-200",
              outOfStock
                ? "cursor-not-allowed bg-zinc-300"
                : "bg-zinc-950 hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
            )}
          >
            <ShoppingBag aria-hidden="true" className="size-4" />
          </motion.button>
        </div>
      </div>
    </article>
  );
}
