import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductCard } from "@/components/shop/ProductCard";
import { CATEGORY_LABELS } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ id: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.brand}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Voltix`,
      description: product.description.slice(0, 180),
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="rounded-sm hover:text-zinc-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/shop"
              className="rounded-sm hover:text-zinc-800"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/shop?category=${product.category}`}
              className="rounded-sm hover:text-zinc-800"
            >
              {CATEGORY_LABELS[product.category]}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-zinc-800">
            {product.name}
          </li>
        </ol>
      </nav>

      <ProductDetails product={product} />

      {/* Related products */}
      <section aria-labelledby="related-heading" className="mt-16 border-t border-neutral-100 pt-10">
        <h2 id="related-heading" className="section-title text-xl sm:text-2xl">
          You may also like
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-4 md:gap-x-5">
          {related.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}
