import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/Toaster";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voltix-gadget-store-demo.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Voltix — Premium Gadget Store",
    template: "%s | Voltix",
  },
  description:
    "Voltix is a demo electronics store: flagship smartphones, ANC headphones, earbuds, smartwatches, speakers and accessories with working filters, cart and wishlist.",
  keywords: [
    "gadget store",
    "electronics shop demo",
    "smartphones",
    "headphones",
    "earbuds",
    "smartwatches",
    "speakers",
    "Next.js ecommerce demo",
  ],
  openGraph: {
    type: "website",
    siteName: "Voltix",
    title: "Voltix — Premium Gadget Store",
    description:
      "Shop flagship smartphones, immersive audio and everyday tech accessories. A polished frontend store demo.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Voltix — Premium Gadget Store",
    description:
      "Shop flagship smartphones, immersive audio and everyday tech accessories.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <StoreProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
