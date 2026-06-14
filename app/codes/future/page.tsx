"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import {
  iso20022Codes,
  getAllISO20022Categories,
  getAllPaymentRails,
} from "@/data";
import type { PaymentRail } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const railColors: Record<PaymentRail, string> = {
  SEPA: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  CHAPS: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  SWIFT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  FedNow: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  TARGET2: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "FPS-Future": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
};

export default function FutureCodesPage() {
  return (
    <Suspense fallback={null}>
      <FutureCodesContent />
    </Suspense>
  );
}

function FutureCodesContent() {
  const searchParams = useSearchParams();
  const deepLinkCode = searchParams.get("code");

  // Seed the initial search + highlight from the deep-link param (lazy init,
  // so we avoid synchronous setState inside the effect on mount).
  const [search, setSearch] = useState(() => deepLinkCode ?? "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRail, setSelectedRail] = useState<PaymentRail | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(
    () => deepLinkCode
  );

  const categories = getAllISO20022Categories();
  const rails = getAllPaymentRails();

  // Deep-link: scroll to and briefly highlight the targeted code on mount.
  useEffect(() => {
    if (!deepLinkCode) return;

    const scrollTimer = window.setTimeout(() => {
      const el = document.getElementById(`iso-${deepLinkCode}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);

    const highlightTimer = window.setTimeout(() => {
      setHighlightedCode(null);
    }, 2000);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(highlightTimer);
    };
  }, [deepLinkCode]);

  const filteredCodes = useMemo(() => {
    let codes = iso20022Codes;

    if (selectedCategory) {
      codes = codes.filter((c) => c.category === selectedCategory);
    }

    if (selectedRail) {
      codes = codes.filter((c) => c.rails.includes(selectedRail));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      codes = codes.filter(
        (c) =>
          c.code.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
    }

    return codes;
  }, [search, selectedCategory, selectedRail]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <Link
        href="/codes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to current codes
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            ISO 20022 Return Codes
          </h1>
          <Badge variant="secondary">Future</Badge>
        </div>
        <p className="text-muted-foreground mb-4">
          These codes will replace the current 8-digit FPS codes when the UK
          migrates to the ISO 20022 messaging standard.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                About ISO 20022
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                ISO 20022 is the global standard for financial messaging. These
                codes are used across multiple payment rails including SEPA,
                CHAPS, SWIFT, and FedNow. The meaning is consistent, but not all
                codes are used by all schemes.
              </p>
            </div>
          </div>
        </div>

        <Input
          placeholder="Search by code or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md mb-4"
        />

        {/* Payment Rail Filter */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Filter by payment rail:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRail(null)}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                !selectedRail
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              All Rails
            </button>
            {rails.map((rail) => (
              <button
                key={rail}
                onClick={() => setSelectedRail(rail)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  selectedRail === rail
                    ? railColors[rail]
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {rail}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Filter by category:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredCodes.length} of {iso20022Codes.length} codes
        {selectedCategory && ` • Category: ${selectedCategory}`}
        {selectedRail && ` • Rail: ${selectedRail}`}
      </div>

      <div className="space-y-3">
        {filteredCodes.map((code) => (
          <Card
            key={code.code}
            id={`iso-${code.code}`}
            className={`hover:shadow-sm transition-shadow ${
              highlightedCode === code.code
                ? "ring-2 ring-primary transition-[box-shadow] duration-500"
                : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <code className="text-lg font-mono font-semibold bg-muted px-2 py-1 rounded">
                    {code.code}
                  </code>
                  <Badge variant="outline" className="text-xs">
                    {code.category}
                  </Badge>
                </div>
                {code.legacyFpsCode && (
                  <Link
                    href={`/code/fps/${code.legacyFpsCode}`}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Maps to: {code.legacyFpsCode}
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {code.description}
              </p>

              {/* Rail tags */}
              {code.rails.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {code.rails.map((rail) => (
                    <span
                      key={rail}
                      className={`text-xs px-2 py-0.5 rounded-full ${railColors[rail]}`}
                    >
                      {rail}
                    </span>
                  ))}
                </div>
              )}

              {/* Rail notes */}
              {code.railNotes && (
                <p className="text-xs text-muted-foreground/70 italic">
                  Note: {code.railNotes}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No codes found matching your filters.
          </p>
        </div>
      )}

      <div className="mt-12 pt-8 border-t">
        <p className="text-xs text-muted-foreground">
          Source: ISO 20022 External Code Sets (Q3 2025) •{" "}
          <a
            href="https://www.iso20022.org/catalogue-messages/additional-content-messages/external-code-sets"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            iso20022.org
          </a>
        </p>
      </div>
    </div>
  );
}
