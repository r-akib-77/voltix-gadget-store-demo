import type { MetadataRoute } from "next";

/* robots must be statically generated for `output: export`. */
export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voltix-gadget-store-demo.pages.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
