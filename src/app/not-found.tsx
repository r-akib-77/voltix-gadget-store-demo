import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-zinc-400">
        <Compass aria-hidden="true" className="size-7" />
      </div>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-zinc-950">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
        This gadget may have sold out — or the link was mistyped. Let&apos;s point you to the
        good stuff.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn btn-primary">
          Browse the shop
        </Link>
        <Link href="/" className="btn btn-outline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
