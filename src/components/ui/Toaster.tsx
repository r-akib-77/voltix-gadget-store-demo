"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";

/** Minimal toast stack — subtle confirmation feedback for cart/wishlist actions. */
export function Toaster() {
  const { toasts, dismissToast } = useStore();
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-full border border-neutral-200 bg-white py-2 pl-3.5 pr-2 shadow-lift"
          >
            {toast.tone === "success" ? (
              <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-accent-600" />
            ) : (
              <Info aria-hidden="true" className="size-4 shrink-0 text-zinc-500" />
            )}
            <p className="text-sm text-zinc-800">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="ml-1 inline-flex size-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-neutral-100 hover:text-zinc-700"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
