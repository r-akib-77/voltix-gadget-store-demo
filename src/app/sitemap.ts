import type { MetadataRoute } from "next";
import { ALL_PRODUCTS } from "@/data/products";

/* robots/sitemap must be statically generated for `output: export`. */
export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voltix-gadget-store-demo.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/shop`, changeFrequency: "daily", priority: 0.9 },
    ...ALL_PRODUCTS.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
