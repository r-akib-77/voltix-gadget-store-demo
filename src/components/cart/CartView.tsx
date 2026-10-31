"use client";

import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { EmptyState } from "@/components/ui/EmptyState";

const FREE_DELIVERY_THRESHOLD = 5000;
/** Demo shipping rule: free over the threshold, flat otherwise. */
function shippingFor(subtotal: number): number {
  return subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 99;
}

/** Full cart page — mirrors the drawer with delivery and total rows. */
export function CartView() {
  const { items, count, subtotal, setQty, removeFromCart, clearCart, pushToast, hydrated } =
    useCart();

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="rounded-sm hover:text-zinc-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-zinc-800">
            Cart
          </li>
        </ol>
      </nav>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950">
        Shopping cart
      </h1>

      {!hydrated ? (
        <div className="mt-10 h-64 animate-pulse rounded-2xl bg-neutral-100" aria-label="Loading cart" />
      ) : count === 0 ? (
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white shadow-card">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Head to the shop and start building your setup — phones, audio and accessories await."
            action={
              <Link href="/shop" className="btn btn-primary">
                Start shopping
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr,1fr] lg:items-start">
          {/* Lines */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-card">
            <ul className="divide-y divide-neutral-100">
              {items.map((line) => (
                <li key={line.productId} className="flex gap-4 p-4 sm:p-5">
                  <Link
                    href={`/product/${line.product.slug}`}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 sm:size-24"
                    aria-label={`View ${line.product.name}`}
                  >
                    <Image
                      src={line.product.image}
                      alt={line.product.imageAlt}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                          {line.product.brand}
                        </p>
                        <Link
                          href={`/product/${line.product.slug}`}
                          className="mt-0.5 block truncate text-[15px] font-medium text-zinc-950 hover:text-accent-700"
                        >
                          {line.product.name}
                        </Link>
                        <p className="mt-0.5 text-xs tabular-nums text-zinc-500">
                          {formatPrice(line.product.price)} each
                        </p>
                      </div>
                      <p className="text-base font-semibold tabular-nums text-zinc-950">
                        {formatPrice(line.product.price * line.qty)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <QuantityStepper
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
                        aria-label={`Remove ${line.product.name} from cart`}
                        className="icon-btn"
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-3.5 sm:px-5">
              <Link
                href="/shop"
                className="text-sm font-medium text-accent-700 hover:text-accent-800"
              >
                ← Continue shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="text-sm font-medium text-zinc-500 underline-offset-2 hover:text-rose-600 hover:underline"
              >
                Clear cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6">
            <h2 className="font-display text-lg font-semibold text-zinc-950">Order summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-zinc-500">
                  Subtotal <span className="tabular-nums">({count} items)</span>
                </dt>
                <dd className="font-medium tabular-nums text-zinc-950">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-zinc-500">Delivery</dt>
                <dd className="font-medium tabular-nums text-zinc-950">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3">
                <dt className="font-semibold text-zinc-950">Total</dt>
                <dd className="font-display text-xl font-semibold tabular-nums text-zinc-950">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
            {shipping > 0 && (
              <p className="mt-3 text-xs text-zinc-500">
                Free delivery unlocks at {formatPrice(FREE_DELIVERY_THRESHOLD)}.
              </p>
            )}
            <Link href="/checkout" className="btn btn-primary mt-5 w-full">
              Proceed to demo checkout
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-zinc-400">
              Frontend demo — checkout is a preview, no payment is processed.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
