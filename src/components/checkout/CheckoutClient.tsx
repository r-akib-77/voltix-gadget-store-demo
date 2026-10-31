"use client";

import { CheckCircle2, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShoppingBag } from "lucide-react";

const FREE_DELIVERY_THRESHOLD = 5000;

type PaymentMethod = "card" | "bkash" | "cod";

interface CheckoutFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  payment: PaymentMethod;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTACT_ERRORS = {
  name: "Please enter your full name.",
  email: "Please enter a valid email address.",
  phone: "Please enter a contact phone number.",
  address: "Please enter a delivery address.",
} as const;

/**
 * Frontend-only checkout preview. Collects nothing, stores nothing,
 * and says so loudly at every step.
 */
export function CheckoutClient() {
  const { items, count, subtotal, clearCart, hydrated, pushToast } = useCart();
  const [form, setForm] = useState<CheckoutFormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "card",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormState, string>>>({});
  const [completed, setCompleted] = useState(false);

  const shipping = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 99;
  const total = subtotal + shipping;

  function update<K extends keyof CheckoutFormState>(key: K, value: CheckoutFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof CheckoutFormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = CONTACT_ERRORS.name;
    if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = CONTACT_ERRORS.email;
    if (!form.phone.trim()) nextErrors.phone = CONTACT_ERRORS.phone;
    if (!form.address.trim()) nextErrors.address = CONTACT_ERRORS.address;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    /* Demo only: mark complete and clear the cart to simulate the flow. */
    setCompleted(true);
    clearCart();
    pushToast("Demo order flow completed — nothing was submitted", "info");
  }

  if (completed) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-zinc-950">
          Demo checkout complete
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
          This was a frontend preview — no payment was processed, no data was stored and no order
          exists. In production this step would hand off to your payment provider.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/shop" className="btn btn-primary">
            Continue shopping
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <div className="h-64 animate-pulse rounded-2xl bg-neutral-100" aria-label="Loading checkout" />
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pt-8 pb-20 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-card">
          <EmptyState
            icon={ShoppingBag}
            title="Nothing to check out"
            description="Your cart is empty. Add a gadget or two before starting the demo checkout."
            action={
              <Link href="/shop" className="btn btn-primary">
                Go to shop
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="rounded-sm hover:text-zinc-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/cart" className="rounded-sm hover:text-zinc-800">
              Cart
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-zinc-800">
            Checkout
          </li>
        </ol>
      </nav>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950">
        Demo checkout
      </h1>

      <div
        role="note"
        className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
      >
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <p>
          <strong>Demo only.</strong> This frontend preview collects and stores nothing; the button
          below simply walks through the ordering experience.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr,1fr] lg:items-start">
        {/* Contact / delivery form */}
        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6">
          <h2 className="font-display text-lg font-semibold text-zinc-950">Contact &amp; delivery</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" id="co-name" error={errors.name}>
              <input
                id="co-name"
                className="input"
                autoComplete="name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
            </Field>
            <Field label="Email address" id="co-email" error={errors.email}>
              <input
                id="co-email"
                type="email"
                className="input"
                autoComplete="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
            </Field>
            <Field label="Phone" id="co-phone" error={errors.phone}>
              <input
                id="co-phone"
                type="tel"
                className="input"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
              />
            </Field>
            <Field label="Delivery address" id="co-address" error={errors.address} className="sm:col-span-2">
              <input
                id="co-address"
                className="input"
                autoComplete="street-address"
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                aria-invalid={Boolean(errors.address)}
              />
            </Field>
          </div>

          <h2 className="mt-8 font-display text-lg font-semibold text-zinc-950">Payment method</h2>
          <fieldset className="mt-4">
            <legend className="sr-only">Choose a payment method</legend>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {(
                [
                  { value: "card", label: "Demo card" },
                  { value: "bkash", label: "bKash (demo)" },
                  { value: "cod", label: "Cash on delivery" },
                ] as Array<{ value: PaymentMethod; label: string }>
              ).map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-neutral-300 px-4 py-3 text-sm font-medium text-zinc-800 transition-colors has-checked:border-accent-600 has-checked:bg-accent-50 has-checked:text-accent-800"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={form.payment === option.value}
                    onChange={() => update("payment", option.value)}
                    className="checkbox"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary mt-8 w-full">
            <ShieldCheck aria-hidden="true" className="size-4" />
            Place demo order — {formatPrice(total)}
          </button>
          <p className="mt-2.5 text-center text-xs text-zinc-400">
            No card fields, no data submission — pressing this button only demonstrates the flow.
          </p>
        </form>

        {/* Order summary */}
        <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6">
          <h2 className="font-display text-lg font-semibold text-zinc-950">
            Summary <span className="text-sm font-normal text-zinc-500">({count} items)</span>
          </h2>
          <ul className="mt-4 divide-y divide-neutral-100">
            {items.map((line) => (
              <li key={line.productId} className="flex items-center gap-3 py-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                  <Image
                    src={line.product.image}
                    alt={line.product.imageAlt}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-zinc-950">
                    {line.product.name}
                  </span>
                  <span className="block text-xs tabular-nums text-zinc-500">
                    × {line.qty}
                  </span>
                </span>
                <span className="text-sm font-medium tabular-nums text-zinc-950">
                  {formatPrice(line.product.price * line.qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2.5 border-t border-neutral-100 pt-4 text-sm">
            <div className="flex items-baseline justify-between">
              <dt className="text-zinc-500">Subtotal</dt>
              <dd className="font-medium tabular-nums text-zinc-950">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-zinc-500">Delivery</dt>
              <dd className="font-medium tabular-nums text-zinc-950">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-neutral-100 pt-2.5">
              <dt className="font-semibold text-zinc-950">Total</dt>
              <dd className="font-display text-xl font-semibold tabular-nums text-zinc-950">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
  className = "",
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-zinc-700">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
