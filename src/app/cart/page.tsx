import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Shopping cart",
  description: "Review your cart, adjust quantities and proceed to demo checkout.",
};

export default function CartPage() {
  return <CartView />;
}
