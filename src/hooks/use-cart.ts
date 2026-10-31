"use client";

import { useStore } from "@/components/providers/StoreProvider";

/** Cart derived view — preferred API for components. */
export function useCart() {
  const store = useStore();
  return {
    items: store.cartItems,
    count: store.cartCount,
    subtotal: store.cartSubtotal,
    addToCart: store.addToCart,
    setQty: store.setQty,
    removeFromCart: store.removeFromCart,
    clearCart: store.clearCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
    isOpen: store.cartOpen,
    hydrated: store.hydrated,
    pushToast: store.pushToast,
  };
}

/** Wishlist derived view — preferred API for components. */
export function useWishlist() {
  const store = useStore();
  return {
    products: store.wishlistProducts,
    count: store.wishlistProducts.length,
    isWishlisted: store.isWishlisted,
    toggleWishlist: store.toggleWishlist,
    openWishlist: store.openWishlist,
    closeWishlist: store.closeWishlist,
    isOpen: store.wishlistOpen,
    hydrated: store.hydrated,
  };
}
