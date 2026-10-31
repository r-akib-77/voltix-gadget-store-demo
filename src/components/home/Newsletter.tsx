"use client";

import { CheckCircle2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Frontend-only newsletter UI — validates locally, never sends anything. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubscribed(true);
  }

  return (
    <section aria-labelledby="newsletter-heading" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-10 text-center sm:px-10">
        <h2 id="newsletter-heading" className="font-display text-2xl font-semibold tracking-tight text-zinc-950">
          Get gear drops first
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
          New arrivals, restocks and subscriber-only deals — one short email a week, no noise.
        </p>

        {subscribed ? (
          <p role="status" className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-800">
            <CheckCircle2 aria-hidden="true" className="size-4" />
            You&apos;re on the list! (Demo only — nothing was saved or sent.)
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
              />
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={error != null}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="input pl-10"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        )}

        {error && (
          <p id="newsletter-error" role="alert" className="mt-2 text-xs font-medium text-rose-600">
            {error}
          </p>
        )}

        <p className="mt-4 text-xs text-zinc-400">
          Frontend demo — no emails are collected, stored, or sent.
        </p>
      </div>
    </section>
  );
}
