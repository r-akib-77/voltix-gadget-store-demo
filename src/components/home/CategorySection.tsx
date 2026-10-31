import {
  AudioLines,
  Cable,
  Headphones,
  Smartphone,
  Speaker,
  Tablet,
  Watch,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { getCategoryCounts } from "@/data/products";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/types/product";

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  smartphones: Smartphone,
  headphones: Headphones,
  earbuds: AudioLines,
  smartwatches: Watch,
  speakers: Speaker,
  tablets: Tablet,
  accessories: Cable,
};

/** Horizontally scrollable category chips; selection filters the shop listing. */
export function CategorySection() {
  const counts = getCategoryCounts();

  return (
    <section aria-labelledby="categories-heading" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="categories-heading" className="section-title">
            Shop by category
          </h2>
          <p className="mt-1 text-sm text-zinc-500">Tap a category to filter the full catalogue.</p>
        </div>
        <Link
          href="/shop"
          className="hidden shrink-0 text-sm font-medium text-accent-700 hover:text-accent-800 sm:inline-block"
        >
          Browse all →
        </Link>
      </div>

      <ul className="scroll-x-thin mt-6 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-7">
        {CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category];
          return (
            <li key={category} className="shrink-0 sm:shrink">
              <Link
                href={`/shop?category=${category}`}
                className="group flex w-28 flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-4 text-center shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-lift sm:w-full"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-neutral-100 text-zinc-700 transition-colors duration-200 group-hover:bg-accent-50 group-hover:text-accent-700">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-sm font-medium leading-tight text-zinc-900">
                  {CATEGORY_LABELS[category]}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {counts[category] ?? 0} items
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
