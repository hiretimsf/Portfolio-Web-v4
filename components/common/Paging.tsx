"use client";

import { cn } from "@/lib/utils";
import { useQueryState, parseAsInteger } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CornerDecorations from "@/components/common/CornerDecorations";

interface PagingProps {
  totalItems: number;
  pageSize?: number;
  paramName?: string;
}

export default function Paging({
  totalItems,
  pageSize = 6,
  paramName = "page",
}: PagingProps) {
  const [page, setPage] = useQueryState(
    paramName,
    parseAsInteger.withDefault(1),
  );

  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full items-center justify-center gap-2 px-6 py-8 md:py-4 lg:px-8",
      )}
    >
      <CornerDecorations />
      <button
        type="button"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex h-8 w-8 border-dashed border-black/10 dark:border-white/10 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPage(p)}
          className={cn(
            "inline-flex h-8 w-8 items-center border-dashed border-black/10 dark:border-white/10 justify-center rounded-md font-mono text-sm transition-colors",
            p === currentPage
              ? "bg-foreground text-background"
              : "border border-edge text-muted-foreground hover:bg-accent",
          )}
          aria-label={`Page ${p}`}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex h-8 w-8 items-center justify-center border border-dashed border-black/10 dark:border-white/10 text-muted-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-30 rounded-xl corner-squircle"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function usePaging(paramName = "page", pageSize = 6) {
  const [page] = useQueryState(paramName, parseAsInteger.withDefault(1));

  return {
    page: Math.max(page, 1),
    pageSize,
    startIndex: (Math.max(page, 1) - 1) * pageSize,
    endIndex: Math.max(page, 1) * pageSize,
  };
}
