import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Demo checkout",
  description:
    "A frontend-only checkout preview. No payment is processed and no data is collected.",
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
