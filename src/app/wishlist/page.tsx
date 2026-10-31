import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved gadgets, synced to this browser via local storage.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
