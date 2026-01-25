"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-semibold tracking-tight">
            FPS Codes
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/codes"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Browse
          </Link>
          <Link
            href="/codes/mapping"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Mapping
          </Link>
          <Link
            href="/codes/future"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            ISO 20022
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
            <kbd className="font-mono">⌘</kbd>
            <kbd className="font-mono">K</kbd>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
