import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

/** Dark sale band with a single clear CTA. */
export function PromoBanner() {
  return (
    <section aria-labelledby="promo-heading" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-9 sm:px-10">
        {/* Subtle accent geometry — one element, no gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 size-44 rounded-full border-[28px] border-accent-600/30"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300">
              <Zap aria-hidden="true" className="size-3.5 fill-accent-300" />
              Season sale
            </p>
            <h2
              id="promo-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Up to 30% off headphones &amp; charging kit.
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-zinc-400">
              Selected ANC headphones, earbuds and fast chargers — while stock lasts.
            </p>
          </div>
          <Link href="/shop?sale=1" className="btn bg-white text-zinc-950 hover:bg-zinc-100">
            Shop the sale
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
