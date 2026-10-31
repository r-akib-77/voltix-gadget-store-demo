"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ShoppingBag } from "lucide-react";

const FREE_DELIVERY_THRESHOLD = 5000;

/** Slide-in cart with quantity editing, free-delivery progress and checkout links. */
export function CartDrawer() {
  const { items, count, subtotal, setQty, removeFromCart, isOpen, closeCart, pushToast } =
    useCart();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  function goTo(path: string) {
    closeCart();
    router.push(path);
  }

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title={`Your cart${count ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
      description="Prices include VAT"
      footer={
        count > 0 ? (
          <div className="space-y-3">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-display text-lg font-semibold tabular-nums text-zinc-950">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button type="button" onClick={() => goTo("/cart")} className="btn btn-outline">
                View cart
              </button>
              <button type="button" onClick={() => goTo("/checkout")} className="btn btn-primary">
                Demo checkout
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        ) : undefined
      }
    >
      {count === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Bestsellers are waiting — speakers, buds and flagship phones to start your setup."
          action={
            <button
              type="button"
              onClick={() => goTo("/shop?sort=featured")}
              className="btn btn-primary"
            >
              Browse bestsellers
            </button>
          }
        />
      ) : (
        <div className="space-y-6 py-5">
          {/* Free delivery progress */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5">
            <p className="text-xs text-zinc-600">
              {remainingForFree > 0 ? (
                <>
                  Add <strong className="tabular-nums text-zinc-900">{formatPrice(remainingForFree)}</strong>{" "}
                  more for free delivery.
                </>
              ) : (
                <strong className="text-emerald-700">You&apos;ve unlocked free delivery!</strong>
              )}
            </p>
            <div
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress toward free delivery"
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200"
            >
              <motion.div
                className={remainingForFree > 0 ? "h-full rounded-full bg-accent-600" : "h-full rounded-full bg-emerald-500"}
                initial={reduceMotion ? { width: `${progress}%` } : false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Lines */}
          <ul className="divide-y divide-neutral-100">
            <AnimatePresence initial={false}>
              {items.map((line) => (
                <motion.li
                  key={line.productId}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3.5 py-4 first:pt-0"
                >
                  <Link
                    href={`/product/${line.product.slug}`}
                    onClick={closeCart}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                    aria-label={`View ${line.product.name}`}
                  >
                    <Image
                      src={line.product.image}
                      alt={line.product.imageAlt}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-950">
                          {line.product.name}
                        </p>
                        <p className="text-xs text-zinc-500">{line.product.brand}</p>
                      </div>
                      <p className="text-sm font-semibold tabular-nums text-zinc-950">
                        {formatPrice(line.product.price * line.qty)}
                      </p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <QuantityStepper
                        size="sm"
                        value={line.qty}
                        label={`Quantity for ${line.product.name}`}
                        onChange={(qty) => setQty(line.productId, qty)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          removeFromCart(line.productId);
                          pushToast(`Removed ${line.product.name}`, "info");
                        }}
                        className="text-xs font-medium text-zinc-400 underline-offset-2 transition-colors hover:text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </Drawer>
  );
}
