import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allErrorCodes } from "@/data";

/**
 * Category tiles for the homepage. Counts are computed from `allErrorCodes`
 * grouped by `category`, sorted by count descending, with a final
 * "Browse all" tile linking to the full listing.
 */
export function HomeCategoryGrid() {
  const counts = allErrorCodes.reduce<Record<string, number>>((acc, code) => {
    acc[code.category] = (acc[code.category] ?? 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {categories.map(([category, count]) => (
        <Link
          key={category}
          href={`/codes?category=${encodeURIComponent(category)}`}
          className="group flex items-center justify-between gap-2 p-4 rounded-lg border border-border hover:border-indigo/60 hover:bg-muted/50 transition-colors"
        >
          <span className="font-medium text-sm sm:text-base group-hover:text-foreground">
            {category}
          </span>
          <span className="inline-flex items-center justify-center min-w-7 h-6 px-2 rounded-full bg-muted text-xs font-medium text-muted-foreground shrink-0">
            {count}
          </span>
        </Link>
      ))}

      <Link
        href="/codes"
        className="group flex items-center justify-between gap-2 p-4 rounded-lg border border-dashed border-border hover:border-indigo/60 hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-sm sm:text-base text-indigo">
          Browse all
        </span>
        <ArrowRight className="size-4 text-indigo transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
