"use client";

import { Menu, Search, ShoppingBag, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart, useWishlist } from "@/hooks/use-cart";
import { SearchBar, NAV_LINKS, type NavLink } from "@/components/layout/SearchBar";
import { cn } from "@/lib/cn-utils";

/** Store name/logo and the primary navigation shell for every page. */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");
  const cart = useCart();
  const wishlist = useWishlist();
  const menuPanelRef = useRef<HTMLDivElement>(null);

  /* Track the current querystring client-side so nav links can highlight
     category destinations without pulling useSearchParams (keeps the header SSR-able). */
  useEffect(() => {
    setActiveQuery(window.location.search);
  }, [pathname]);

  /* Close overlays whenever the route changes. */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, activeQuery]);

  /* Escape + focus + scroll lock for the mobile menu. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    menuPanelRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = (link: NavLink) => {
    if (link.href === "/") return pathname === "/";
    if (link.href === "/shop") return pathname === "/shop" && !activeQuery.includes("category=");
    if (link.categories) {
      if (pathname !== "/shop") return false;
      const current = extractCategoryParam(activeQuery);
      return current.length > 0 && link.categories.join(",") === current.join(",");
    }
    return pathname === link.href;
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        {/* Promo strip */}
        <div className="hidden border-b border-zinc-800/40 bg-zinc-950 sm:block">
          <p className="mx-auto flex h-8 w-full max-w-7xl items-center justify-center gap-2 px-4 text-xs text-zinc-300">
            <Zap aria-hidden="true" className="size-3 fill-accent-400 text-accent-400" />
            <span>
              Season sale — up to 30% off headphones &amp; chargers.{" "}
              <Link
                href="/shop?sale=1"
                className="font-medium text-white underline decoration-zinc-500 underline-offset-2 hover:decoration-accent-400"
              >
                Shop the sale
              </Link>
            </span>
          </p>
        </div>

        {/* Main bar */}
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
            aria-label="Voltix — home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent-600">
              <Zap aria-hidden="true" className="size-5 fill-white text-white" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-zinc-950">
              Voltix
            </span>
          </Link>

          <nav aria-label="Main navigation" className="ml-4 hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-zinc-950",
                  isActive(link) ? "text-zinc-950" : "text-zinc-600"
                )}
              >
                {link.label}
                {isActive(link) && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent-600"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop search */}
          <div className="ml-auto hidden w-full max-w-sm md:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-0.5 md:ml-0">
            {/* Mobile search toggle */}
            <button
              type="button"
              className="icon-btn md:hidden"
              onClick={() => setSearchOpen((open) => !open)}
              aria-expanded={searchOpen}
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              {searchOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Search aria-hidden="true" className="size-5" />
              )}
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={wishlist.openWishlist}
              aria-label={`Open wishlist${wishlist.count ? `, ${wishlist.count} items` : ""}`}
            >
              <span className="relative">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
                </svg>
                {wishlist.hydrated && wishlist.count > 0 && <CountBadge count={wishlist.count} />}
              </span>
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={cart.openCart}
              aria-label={`Open shopping cart${cart.count ? `, ${cart.count} items` : ""}`}
            >
              <span className="relative">
                <ShoppingBag aria-hidden="true" className="size-5" />
                {cart.hydrated && cart.count > 0 && <CountBadge count={cart.count} />}
              </span>
            </button>

            <button
              type="button"
              className="icon-btn lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile search panel */}
        {searchOpen && (
          <div className="border-t border-neutral-200 bg-white px-4 py-3 md:hidden">
            <SearchBar autoFocus />
          </div>
        )}
      </header>

      {/* Mobile navigation overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <div
            className="absolute inset-0 bg-zinc-950/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            ref={menuPanelRef}
            tabIndex={-1}
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
            className="absolute inset-y-0 left-0 w-[86vw] max-w-xs overflow-y-auto bg-white p-6 shadow-lift outline-none"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold tracking-tight text-zinc-950">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="icon-btn"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <ul className="mt-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-base font-medium transition-colors hover:bg-neutral-100",
                      isActive(link) ? "bg-accent-50 text-accent-700" : "text-zinc-800"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Categories
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-1">
              {MOBILE_CATEGORIES.map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/shop?category=${slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-neutral-100 hover:text-zinc-950"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/cart" className="btn btn-outline mt-8 w-full">
              View cart
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-semibold leading-none text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

const MOBILE_CATEGORIES: Array<[string, string]> = [
  ["smartphones", "Smartphones"],
  ["headphones", "Headphones"],
  ["earbuds", "Earbuds"],
  ["smartwatches", "Smartwatches"],
  ["speakers", "Speakers"],
  ["tablets", "Tablets"],
  ["accessories", "Accessories"],
];

function extractCategoryParam(search: string): string[] {
  const params = new URLSearchParams(search);
  return (params.get("category") ?? "").split(",").filter(Boolean).sort();
}
