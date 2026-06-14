"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCommandPalette } from "@/components/CommandPaletteProvider";

interface HeroSearchProps {
  placeholder?: string;
  className?: string;
}

export function HeroSearch({
  placeholder = "Search error codes...",
  className = "",
}: HeroSearchProps) {
  const { setOpen, setQuery } = useCommandPalette();

  const openPalette = (seed?: string) => {
    if (seed !== undefined) setQuery(seed);
    setOpen(true);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        readOnly
        placeholder={placeholder}
        onFocus={() => openPalette()}
        onClick={() => openPalette()}
        onKeyDown={(e) => {
          // Open and seed the palette with the first printable keystroke
          if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            openPalette(e.key);
          }
        }}
        className="h-12 pl-11 pr-16 text-base cursor-pointer"
        aria-label="Search error codes"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground pointer-events-none">
        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border font-mono">
          ⌘
        </kbd>
        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border font-mono">
          K
        </kbd>
      </div>
    </div>
  );
}
