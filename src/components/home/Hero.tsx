"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1200&auto=format&fit=crop";
const HERO_IMAGE_ALT =
  "Flat lay of premium audio gear — over-ear headphones and true wireless earbuds beside their charging cases";

/** Compact promotional hero — headline, two CTAs and one strong image. */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
  };
  const transition = { duration: reduceMotion ? 0 : 0.35, ease: "easeOut" as const };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pt-10 lg:px-8">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:gap-12">
        {/* Copy */}
        <motion.div
          initial="initial"
          animate="animate"
          transition={transition}
          variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p {...fadeUp} className="mb-4 inline-flex">
            <Link
              href="/shop?sort=featured"
              className="badge border border-accent-200 bg-accent-50 text-accent-700 hover:bg-accent-100"
            >
              <Sparkles aria-hidden="true" className="size-3" />
              New Season Collection — 2026 drop
            </Link>
          </motion.p>
          <motion.h1
            {...fadeUp}
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl"
          >
            Upgrade your everyday&nbsp;tech.
          </motion.h1>
          <motion.p {...fadeUp} className="mt-4 max-w-md text-base leading-relaxed text-zinc-600">
            Flagship smartphones, immersive audio and the accessories that keep them charged —
            curated by gear nerds, delivered in 24 hours.
          </motion.p>
          <motion.div {...fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn btn-primary">
              Shop gadgets
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/shop?sort=rating" className="btn btn-outline">
              Explore bestsellers
            </Link>
          </motion.div>
          <motion.ul {...fadeUp} className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck aria-hidden="true" className="size-3.5 text-accent-600" />
              2-year warranty on every device
            </li>
            <li className="inline-flex items-center gap-1.5">
              <PackageCheck aria-hidden="true" className="size-3.5 text-accent-600" />
              Free delivery over ৳5,000
            </li>
            <li><span aria-hidden="true">★</span> 4.6 average rating</li>
          </motion.ul>
        </motion.div>

        {/* Image */}
        <motion.figure
          {...fadeUp}
          className="relative"
          aria-hidden={false}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
            <ProductImage
              src={HERO_IMAGE}
              alt={HERO_IMAGE_ALT}
              sizes="(min-width: 1024px) 46vw, 92vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 py-1.5 pl-1.5 pr-3.5 shadow-card backdrop-blur">
            <span className="flex size-6 items-center justify-center rounded-full bg-amber-400">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 fill-white">
                <path d="M12 2l2.9 6.26L21.5 9.3l-4.75 4.63L17.8 20.5 12 17.27 6.2 20.5l1.05-6.57L2.5 9.3l6.6-1.04L12 2z" />
              </svg>
            </span>
            <span className="text-xs font-medium text-zinc-800">
              Rated 4.8 by 1,800+ customers
            </span>
          </div>
          <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 py-1.5 pl-1.5 pr-3.5 shadow-card backdrop-blur">
            <span className="flex size-6 items-center justify-center rounded-full bg-accent-600">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>
            <span className="text-xs font-medium text-zinc-800">Free next-day delivery</span>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
