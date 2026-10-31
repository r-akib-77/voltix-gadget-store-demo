"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Heart,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useCart, useWishlist } from "@/hooks/use-cart";
import { getDiscountPercent } from "@/lib/product-filters";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/cn-utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

interface ProductDetailsProps {
  product: import("@/types/product").Product;
}

/** Product details: gallery image, pricing, actions and spec bullets. */
export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const reduceMotion = useReducedMotion();

  const discount = getDiscountPercent(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = !product.inStock;

  return (
    <section
      aria-labelledby="product-title"
      className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16"
    >
      {/* Image */}
      <figure className="md:sticky md:top-32 md:self-start">
        <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            sizes="(min-width: 768px) 46vw, 92vw"
            priority
            className="object-cover"
          />
          {discount != null && (
            <figcaption className="badge absolute left-4 top-4 bg-rose-600 text-white shadow-sm">
              −{discount}% today
            </figcaption>
          )}
          {outOfStock && (
            <figcaption className="badge absolute bottom-4 left-4 bg-zinc-900/85 text-white backdrop-blur">
              Sold out — check back soon
            </figcaption>
          )}
        </div>
      </figure>

      {/* Info */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {product.brand}
        </p>
        <h1
          id="product-title"
          className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.5rem] sm:leading-[1.1]"
        >
          {product.name}
        </h1>

        {/* Rating + stock */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-base" aria-hidden="true">
              ★
            </span>
            <span className="font-semibold tabular-nums text-zinc-950">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-zinc-500">
              ({product.reviews.toLocaleString()} reviews)
            </span>
          </span>
          <span className="text-zinc-300" aria-hidden="true">
            |
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 font-medium",
              product.inStock ? "text-emerald-700" : "text-zinc-500"
            )}
          >
            <PackageCheck aria-hidden="true" className="size-4" />
            {product.inStock ? "In stock — ships today" : "Out of stock"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex flex-wrap items-baseline gap-3">
          <p className="font-display text-3xl font-semibold tabular-nums text-zinc-950">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice != null && (
            <p className="text-lg tabular-nums text-zinc-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>

        <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-zinc-600">
          {product.description}
        </p>

        {/* Features */}
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-700">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-600" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <QuantityStepper
            value={qty}
            onChange={setQty}
            label={`Quantity for ${product.name}`}
            disabled={outOfStock}
          />
          <motion.button
            type="button"
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            disabled={outOfStock}
            onClick={() => {
              addToCart(product.id, qty);
            }}
            className={cn(
              "btn btn-primary flex-1 sm:flex-none sm:px-8",
              outOfStock && "bg-zinc-300 hover:bg-zinc-300"
            )}
            aria-disabled={outOfStock}
          >
            <ShoppingBag aria-hidden="true" className="size-4" />
            {outOfStock ? "Out of stock" : `Add ${qty} to cart`}
          </motion.button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={wishlisted}
            aria-label={
              wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} for later`
            }
            className="btn btn-outline"
          >
            <Heart
              aria-hidden="true"
              className={cn("size-4", wishlisted && "fill-rose-600 text-rose-600")}
            />
            {wishlisted ? "Saved" : "Save for later"}
          </button>
        </div>

        {/* Perks */}
        <ul className="mt-8 grid gap-3 border-t border-neutral-100 pt-6 text-sm text-zinc-600 sm:grid-cols-3">
          <li className="flex items-center gap-2.5">
            <Truck aria-hidden="true" className="size-4 shrink-0 text-accent-600" />
            Free delivery over ৳5,000
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-accent-600" />
            2-year local warranty
          </li>
          <li className="flex items-center gap-2.5">
            <RotateCcw aria-hidden="true" className="size-4 shrink-0 text-accent-600" />
            7-day easy returns
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
