import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

/** Consistent empty/error state used by cart, wishlist, wishlist page and shop grid. */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-zinc-400">
        <Icon aria-hidden="true" className="size-6" />
      </div>
      <h2 className="mt-4 font-display text-lg font-semibold text-zinc-950">{title}</h2>
      <p className="mt-1.5 max-w-sm text-sm text-zinc-500">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
