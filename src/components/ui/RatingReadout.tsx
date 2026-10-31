import { Star } from "lucide-react";
import { cn } from "@/lib/cn-utils";

interface RatingProps {
  rating: number;
  reviews: number;
  className?: string;
}

/** Compact star + rating + review count readout used on cards and detail pages. */
export function RatingReadout({ rating, reviews, className }: RatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-zinc-600", className)}>
      <Star aria-hidden="true" className="size-3.5 fill-amber-400 text-amber-400" />
      <span aria-hidden="true" className="font-semibold text-zinc-900 tabular-nums">
        {rating.toFixed(1)}
      </span>
      <span aria-hidden="true">
        ({reviews.toLocaleString()})
      </span>
      <span className="sr-only">
        Rated {rating.toFixed(1)} out of 5 by {reviews.toLocaleString()} reviewers
      </span>
    </span>
  );
}
