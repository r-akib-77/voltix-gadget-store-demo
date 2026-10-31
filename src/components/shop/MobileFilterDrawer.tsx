"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterSections, type QuickRange } from "@/components/shop/FilterSections";
import { countActiveFilters, DEFAULT_FILTERS, type ShopFilters } from "@/lib/product-filters";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Currently active (committed) filters — the drawer works on a draft copy. */
  committed: ShopFilters;
  /** Called with the draft when Apply is pressed. */
  onApply: (draft: ShopFilters) => void;
  categoryCounts: Record<string, number>;
  brands: Array<{ name: string; count: number }>;
  quickRanges: QuickRange[];
}

/**
 * Mobile filter drawer with explicit Apply / Reset controls.
 * Edits stay local until "Apply" commits them to the shop state.
 */
export function MobileFilterDrawer({
  open,
  onClose,
  committed,
  onApply,
  categoryCounts,
  brands,
  quickRanges,
}: MobileFilterDrawerProps) {
  const [draft, setDraft] = useState<ShopFilters>(committed);
  const draftCount = countActiveFilters(draft);
  const reduceMotion = useReducedMotion();

  /* Refresh the draft each time the drawer opens. */
  useEffect(() => {
    if (open) setDraft(committed);
  }, [open, committed]);

  /* Escape + scroll lock while open. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <>
      {/* Trigger lives inside the shop toolbar; this component renders the panel. */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="absolute inset-0 bg-zinc-950/40"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filter products"
              tabIndex={-1}
              initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              className="absolute inset-y-0 right-0 flex w-[88vw] max-w-sm flex-col bg-white shadow-lift outline-none"
            >
              <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                <h2 className="font-display text-base font-semibold text-zinc-950">
                  Filters
                  {draftCount > 0 && (
                    <span className="ml-2 rounded-full bg-accent-50 px-2 py-0.5 text-[11px] font-semibold text-accent-700">
                      {draftCount} active
                    </span>
                  )}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close filters"
                  className="icon-btn"
                  autoFocus
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5">
                <FilterSections
                  filters={draft}
                  onChange={(updates) => setDraft((current) => ({ ...current, ...updates }))}
                  categoryCounts={categoryCounts}
                  brands={brands}
                  quickRanges={quickRanges}
                />
              </div>

              <footer className="grid grid-cols-2 gap-2.5 border-t border-neutral-200 bg-white px-5 py-4">
                <button
                  type="button"
                  onClick={() => setDraft({ ...DEFAULT_FILTERS, sort: draft.sort, query: draft.query })}
                  className="btn btn-outline"
                >
                  Reset filters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onApply(draft);
                    onClose();
                  }}
                  className="btn btn-primary"
                >
                  Apply filters
                  {draftCount > 0 && <span aria-hidden="true"> ({draftCount})</span>}
                </button>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Re-exported for the toolbar's filter trigger button. */
export { SlidersHorizontal };
