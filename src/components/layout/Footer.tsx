import { Zap } from "lucide-react";
import Link from "next/link";
import { CATEGORIES, CATEGORY_LABELS } from "@/types/product";

const SHOP_LINKS = [
  { href: "/shop", label: "All products" },
  ...CATEGORIES.map((c) => ({
    href: `/shop?category=${c}`,
    label: CATEGORY_LABELS[c],
  })),
];

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop?sort=newest", label: "New arrivals" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
];

const SUPPORT_LINKS = [
  { href: "/checkout", label: "Demo checkout" },
  { href: "/shop?sale=1", label: "Current offers" },
  { href: "/shop?rating=4.5", label: "Top rated 4.5★+" },
  { href: "/shop", label: "Delivery & warranty" },
];

/** Site-wide footer with shop navigation and the demo disclaimer. */
export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Voltix home">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-600">
                <Zap aria-hidden="true" className="size-5 fill-white text-white" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-zinc-950">
                Voltix
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Premium smartphones, audio and tech accessories — curated, warranty-backed and
              rapidly delivered to gadget lovers everywhere.
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              Demo store built with Next.js · Prices in BDT (৳)
            </p>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS.slice(0, 6)} moreHref="/shop" moreLabel="Browse all" />
          <FooterColumn title="Stay in the loop" links={COMPANY_LINKS} />
          <FooterColumn title="Support" links={SUPPORT_LINKS} />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Voltix Demo — a frontend-only store for client demos. No real orders.</p>
          <p>
            Product photos via{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-neutral-300 underline-offset-2 hover:text-zinc-600"
            >
              Unsplash
            </a>{" "}
            (free license)
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  moreHref,
  moreLabel,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {moreHref && (
          <li>
            <Link href={moreHref} className="text-sm font-medium text-accent-700 hover:text-accent-800">
              {moreLabel} →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
