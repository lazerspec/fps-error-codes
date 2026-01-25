"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { SearchableCode } from "@/data/types";

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = "Search error codes...",
  autoFocus = false,
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchableCode[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [searchData, setSearchData] = React.useState<SearchableCode[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Load search data
  React.useEffect(() => {
    fetch("/api/search-data")
      .then((res) => res.json())
      .then((data) => setSearchData(data))
      .catch(console.error);
  }, []);

  // Fuse.js instance
  const fuse = React.useMemo(() => {
    return new Fuse(searchData, {
      keys: [
        { name: "code", weight: 2 },
        { name: "shortDescription", weight: 1.5 },
        { name: "detailedExplanation", weight: 1 },
        { name: "category", weight: 0.5 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }, [searchData]);

  // Search when query changes
  React.useEffect(() => {
    if (query.trim()) {
      const searchResults = fuse.search(query).slice(0, 5);
      setResults(searchResults.map((r) => r.item));
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, fuse]);

  // Keyboard shortcut (Cmd+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + results.length) % results.length);
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateToCode(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const navigateToCode = (code: SearchableCode) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/code/${code.scheme.toLowerCase()}/${code.code}`);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="h-12 pl-4 pr-16 text-base"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border font-mono">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border font-mono">
            K
          </kbd>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
          {results.map((result, index) => (
            <button
              key={`${result.scheme}-${result.code}`}
              onClick={() => navigateToCode(result)}
              className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors ${
                index === selectedIndex
                  ? "bg-muted"
                  : "hover:bg-muted/50"
              }`}
            >
              <code className="font-mono text-sm font-medium shrink-0 mt-0.5">
                {result.code}
              </code>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{result.shortDescription}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {result.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {result.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-6 text-center text-muted-foreground">
            No codes found for &quot;{query}&quot;
          </div>
        </div>
      )}
    </div>
  );
}
