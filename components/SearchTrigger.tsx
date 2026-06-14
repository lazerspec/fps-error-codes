"use client";

import { Search } from "lucide-react";
import { useCommandPalette } from "@/components/CommandPaletteProvider";

interface SearchTriggerProps {
  placeholder?: string;
  className?: string;
}

export function SearchTrigger({
  placeholder = "Search codes...",
  className = "",
}: SearchTriggerProps) {
  const { setOpen } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={placeholder}
      className={`flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none ${className}`}
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-left">{placeholder}</span>
      <span className="hidden sm:flex items-center gap-1 text-xs">
        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border font-mono">
          ⌘
        </kbd>
        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border font-mono">
          K
        </kbd>
      </span>
    </button>
  );
}
