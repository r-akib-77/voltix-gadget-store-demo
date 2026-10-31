"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCart, useWishlist } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { DiscountBadge } from "@/lib/product-badges";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Heart } from "lucide-react";

/** Slide-in wishlist with a one-tap "move to cart" affordance. */
export function WishlistDrawer() {
  const { products, isOpen, closeWishlist, toggleWishlist, count } = useWishlist();
  const { addToCart, pushToast } = useCart();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  function goTo(path: string) {
    closeWishlist();
    router.push(path);
  }

  function moveToCart(productId: string, name: string) {
    addToCart(productId, 1);
    toggleWishlist(productId);
    pushToast(`${name} moved to cart`);
  }

  return (
    <Drawer
      open={isOpen}
      onClose={closeWishlist}
      title={`Wishlist${count ? ` (${count})` : ""}`}
      description="Saved items, synced to this browser"
      footer={
        count > 0 ? (
          <button type="button" onClick={() => goTo("/wishlist")} className="btn btn-outline w-full">
            View full wishlist page
          </button>
        ) : undefined
      }
    >
      {count === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved items yet"
          description="Tap the heart on any product to keep it handy for later."
          action={
            <button
              type="button"
              onClick={() => goTo("/shop")}
              className="btn btn-primary"
            >
              Browse the shop
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          }
        />
      ) : (
        <ul className="divide-y divide-neutral-100 py-2">
          <AnimatePresence initial={false}>
            {products.map((product) => (
              <motion.li
                key={product.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3.5 py-4"
              >
                <Link
                  href={`/product/${product.slug}`}
                  onClick={closeWishlist}
                  className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                  aria-label={`View ${product.name}`}
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeWishlist}
                    className="block truncate text-sm font-medium text-zinc-950 hover:text-accent-700"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-zinc-500">
                    {product.brand} ·{" "}
                    <span className="tabular-nums">{formatPrice(product.price)}</span>{" "}
                    <DiscountBadge product={product} />
                  </p>
                  <button
                    type="button"
                    onClick={() => moveToCart(product.id, product.name)}
                    disabled={!product.inStock}
                    className="btn btn-sm btn-dark mt-2"
                  >
                    {product.inStock ? "Move to cart" : "Out of stock"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="icon-btn"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-5 items-center justify-center rounded-full font-bold leading-none text-zinc-400 hover:text-zinc-900"
                  >
                    ×
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </Drawer>
  );
}
