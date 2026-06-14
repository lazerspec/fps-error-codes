"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import {
  Home,
  List,
  ArrowLeftRight,
  Globe,
  BookOpen,
  Loader2,
} from "lucide-react";
import type { SearchEntry } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useCommandPalette } from "@/components/CommandPaletteProvider";

interface NavPage {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string;
}

const NAV_PAGES: NavPage[] = [
  { label: "Home", href: "/", icon: Home, keywords: "home start search" },
  {
    label: "Browse all codes",
    href: "/codes",
    icon: List,
    keywords: "browse all fps codes list",
  },
  {
    label: "FPS → ISO Mapping",
    href: "/codes/mapping",
    icon: ArrowLeftRight,
    keywords: "mapping fps iso crosswalk",
  },
  {
    label: "ISO 20022",
    href: "/codes/future",
    icon: Globe,
    keywords: "iso 20022 future return codes",
  },
  {
    label: "References",
    href: "/references",
    icon: BookOpen,
    keywords: "references sources docs",
  },
];

const MAX_RESULTS = 8;

export function CommandPalette() {
  const router = useRouter();
  const { open, setOpen, query, setQuery } = useCommandPalette();
  const [index, setIndex] = React.useState<SearchEntry[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const hasFetched = React.useRef(false);

  // Global ⌘K / Ctrl+K shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  // Lazily fetch the search index the first time the palette opens
  React.useEffect(() => {
    if (!open || hasFetched.current) return;
    hasFetched.current = true;
    setIsLoading(true);
    fetch("/api/search-data")
      .then((res) => res.json())
      .then((data: SearchEntry[]) => setIndex(data))
      .catch((err) => {
        console.error("Failed to load search index", err);
        hasFetched.current = false;
      })
      .finally(() => setIsLoading(false));
  }, [open]);

  const fuse = React.useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "code", weight: 2 },
          { name: "title", weight: 1.5 },
          { name: "category", weight: 0.5 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [index]
  );

  const trimmed = query.trim();

  const results = React.useMemo(() => {
    if (!trimmed) return [] as SearchEntry[];
    return fuse.search(trimmed, { limit: 50 }).map((r) => r.item);
  }, [fuse, trimmed]);

  const fpsResults = results.filter((r) => r.kind === "fps").slice(0, MAX_RESULTS);
  const isoResults = results.filter((r) => r.kind === "iso").slice(0, MAX_RESULTS);

  const pageResults = React.useMemo(() => {
    if (!trimmed) return NAV_PAGES;
    const q = trimmed.toLowerCase();
    return NAV_PAGES.filter(
      (p) =>
        p.label.toLowerCase().includes(q) || p.keywords.includes(q)
    );
  }, [trimmed]);

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const showEmpty =
    !isLoading &&
    trimmed.length > 0 &&
    pageResults.length === 0 &&
    fpsResults.length === 0 &&
    isoResults.length === 0;

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
      shouldFilter={false}
      title="Search FPS and ISO 20022 codes"
      description="Search error codes and navigate the site"
    >
      <CommandInput
        placeholder="Search codes, e.g. 1114, AC04, account closed…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading codes…
          </div>
        )}

        {showEmpty && (
          <CommandEmpty>No codes found for &quot;{trimmed}&quot;</CommandEmpty>
        )}

        {pageResults.length > 0 && (
          <CommandGroup heading="Pages">
            {pageResults.map((page) => {
              const Icon = page.icon;
              return (
                <CommandItem
                  key={page.href}
                  value={`page-${page.href}`}
                  onSelect={() => handleSelect(page.href)}
                >
                  <Icon className="size-4" />
                  <span>{page.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {fpsResults.length > 0 && (
          <CommandGroup heading="FPS codes">
            {fpsResults.map((entry) => (
              <CommandItem
                key={`fps-${entry.code}`}
                value={`fps-${entry.code}`}
                onSelect={() => handleSelect(entry.href)}
              >
                <code className="font-mono text-sm font-medium shrink-0">
                  {entry.code}
                </code>
                <span className="flex-1 min-w-0 truncate">{entry.title}</span>
                {entry.type && (
                  <Badge variant="secondary" className="text-xs">
                    {entry.type}
                  </Badge>
                )}
                {entry.severity && (
                  <Badge
                    variant={
                      entry.severity === "fatal" ? "destructive" : "outline"
                    }
                    className="text-xs"
                  >
                    {entry.severity}
                  </Badge>
                )}
                {entry.crossRef && (
                  <span className="text-xs text-muted-foreground font-mono shrink-0">
                    {entry.crossRef}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {isoResults.length > 0 && (
          <CommandGroup heading="ISO 20022 codes">
            {isoResults.map((entry) => (
              <CommandItem
                key={`iso-${entry.code}`}
                value={`iso-${entry.code}`}
                onSelect={() => handleSelect(entry.href)}
              >
                <code className="font-mono text-sm font-medium shrink-0">
                  {entry.code}
                </code>
                <span className="flex-1 min-w-0 truncate">{entry.title}</span>
                <Badge variant="outline" className="text-xs">
                  {entry.category}
                </Badge>
                {entry.crossRef && (
                  <span className="text-xs text-muted-foreground font-mono shrink-0">
                    {entry.crossRef}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
