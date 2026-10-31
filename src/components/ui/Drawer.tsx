"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn-utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Side of the viewport the panel slides in from. */
  side?: "right" | "left";
  maxWidth?: string;
}

/**
 * Accessible slide-in drawer shared by the cart, wishlist and
 * mobile filter panels. Handles Escape, focus and body scroll lock.
 */
export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
  maxWidth = "max-w-md",
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /* Escape to close + focus the panel when it opens. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /* Body scroll lock while any drawer is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" aria-hidden={false}>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="absolute inset-0 bg-zinc-950/40"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            aria-describedby={description ? "drawer-description" : undefined}
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { x: side === "right" ? "100%" : "-100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className={cn(
              "absolute inset-y-0 flex w-full flex-col bg-white shadow-lift outline-none",
              side === "right" ? "right-0" : "left-0",
              maxWidth
            )}
          >
            <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <div>
                <h2 className="font-display text-base font-semibold text-zinc-950">{title}</h2>
                {description && (
                  <p className="text-xs text-zinc-500" id="drawer-description">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${title.toLowerCase()}`}
                className="icon-btn"
                autoFocus
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-5">{children}</div>
            {footer && (
              <footer className="border-t border-neutral-200 bg-white px-5 py-4">{footer}</footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
