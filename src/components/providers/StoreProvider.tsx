"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/types/product";
import { getProductById } from "@/data/products";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface CartLine {
  productId: string;
  qty: number;
}

export interface CartItem extends CartLine {
  product: Product;
}

export interface ToastMessage {
  id: number;
  message: string;
  tone: "success" | "info";
}

interface StoreContextValue {
  /* cart */
  cart: CartLine[];
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  /* wishlist */
  wishlist: string[];
  wishlistProducts: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  /* drawers */
  cartOpen: boolean;
  wishlistOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  /* misc */
  hydrated: boolean;
  toasts: ToastMessage[];
  pushToast: (message: string, tone?: ToastMessage["tone"]) => void;
  dismissToast: (id: number) => void;
}

const CartContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "voltix:cart:v1";
const WISHLIST_KEY = "voltix:wishlist:v1";
const MAX_QTY = 99;

/* ------------------------------------------------------------------ */
/* Safe localStorage access (private-mode / quota tolerant)            */
/* ------------------------------------------------------------------ */

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — demo keeps working in-memory */
  }
}

function sanitizeCart(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).productId === "string" &&
        typeof (line as CartLine).qty === "number" &&
        getProductById((line as CartLine).productId) != null
    )
    .map((line) => ({
      productId: line.productId,
      qty: Math.min(MAX_QTY, Math.max(1, Math.round(line.qty))),
    }));
}

function sanitizeWishlist(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return [
    ...new Set(
      raw.filter((id): id is string => typeof id === "string" && getProductById(id) != null)
    ),
  ];
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastSeq = useRef(0);

  /* Load persisted state once on mount. */
  useEffect(() => {
    setCart(sanitizeCart(readJson(CART_KEY)));
    setWishlist(sanitizeWishlist(readJson(WISHLIST_KEY)));
    setHydrated(true);
  }, []);

  /* Persist after hydration only, so we never clobber saved data with []. */
  useEffect(() => {
    if (hydrated) writeJson(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) writeJson(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  const pushToast = useCallback((message: string, tone: ToastMessage["tone"] = "success") => {
    const id = ++toastSeq.current;
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (productId: string, qty = 1) => {
      setCart((current) => {
        const existing = current.find((line) => line.productId === productId);
        if (existing) {
          return current.map((line) =>
            line.productId === productId
              ? { ...line, qty: Math.min(MAX_QTY, line.qty + qty) }
              : line
          );
        }
        return [...current, { productId, qty: Math.min(MAX_QTY, Math.max(1, qty)) }];
      });
    },
    []
  );

  const setQty = useCallback((productId: string, qty: number) => {
    setCart((current) => {
      if (qty <= 0) return current.filter((line) => line.productId !== productId);
      return current.map((line) =>
        line.productId === productId ? { ...line, qty: Math.min(MAX_QTY, qty) } : line
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((current) => {
        const exists = current.includes(productId);
        const product = getProductById(productId);
        if (product) {
          pushToast(
            exists ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`,
            "info"
          );
        }
        return exists ? current.filter((id) => id !== productId) : [...current, productId];
      });
    },
    [pushToast]
  );

  /* Derived data — cheap joins over a 36-product static catalogue. */
  const cartItems = useMemo<CartItem[]>(
    () =>
      cart
        .map((line) => ({ ...line, product: getProductById(line.productId) }))
        .filter((line): line is CartItem => line.product != null),
    [cart]
  );

  const cartCount = useMemo(() => cartItems.reduce((sum, line) => sum + line.qty, 0), [cartItems]);

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, line) => sum + line.product.price * line.qty, 0),
    [cartItems]
  );

  const wishlistProducts = useMemo(
    () => wishlist.map((id) => getProductById(id)).filter((p): p is Product => p != null),
    [wishlist]
  );

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      wishlist,
      wishlistProducts,
      isWishlisted,
      toggleWishlist,
      cartOpen,
      wishlistOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openWishlist: () => setWishlistOpen(true),
      closeWishlist: () => setWishlistOpen(false),
      hydrated,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      cart,
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      wishlist,
      wishlistProducts,
      isWishlisted,
      toggleWishlist,
      cartOpen,
      wishlistOpen,
      hydrated,
      toasts,
      pushToast,
      dismissToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
