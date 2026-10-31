"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn-utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
  disabled?: boolean;
}

const MAX_BY_DEFAULT = 99;

/** Accessible quantity control shared by product page, cart drawer and cart page. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = MAX_BY_DEFAULT,
  size = "md",
  label = "Quantity",
  disabled = false,
}: QuantityStepperProps) {
  const dimension = size === "sm" ? "h-8" : "h-11";
  const icon = size === "sm" ? "size-3.5" : "size-4";
  const button = size === "sm" ? "w-8" : "w-9";

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-300 bg-white",
        dimension,
        "shrink-0"
      )}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label={(label ? `${label}: ` : "") + "Decrease quantity"}
        className={cn(
          "inline-flex h-full items-center justify-center rounded-l-full text-zinc-700 transition-colors hover:bg-neutral-100 hover:text-zinc-950 disabled:opacity-30 disabled:hover:bg-transparent",
          button
        )}
      >
        <Minus aria-hidden="true" className={icon} />
      </button>
      <span
        aria-live="polite"
        aria-label={label}
        className={cn(
          "flex h-full items-center justify-center text-center font-medium tabular-nums",
          size === "sm" ? "w-7 text-xs" : "w-10 text-sm"
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label={(label ? `${label}: ` : "") + "Increase quantity"}
        className={cn(
          "inline-flex h-full items-center justify-center rounded-r-full text-zinc-700 transition-colors hover:bg-neutral-100 hover:text-zinc-950 disabled:opacity-30 disabled:hover:bg-transparent",
          button
        )}
      >
        <Plus aria-hidden="true" className={icon} />
      </button>
    </div>
  );
}
