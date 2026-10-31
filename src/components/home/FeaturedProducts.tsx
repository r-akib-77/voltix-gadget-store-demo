import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

/** Homepage curated rail with 8 featured products and a view-all link. */
export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section aria-labelledby="featured-heading" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="featured-heading" className="section-title">
            Featured gadgets
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Hand-picked gear our editors are using right now.
          </p>
        </div>
        <Link
          href="/shop"
          className="shrink-0 text-sm font-medium text-accent-700 hover:text-accent-800"
        >
          View all products →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </section>
  );
}
