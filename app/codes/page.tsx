import { Suspense } from "react";
import type { Metadata } from "next";
import { allErrorCodes, getAllCategories } from "@/data";
import { CodeCard } from "@/components/CodeCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchTrigger } from "@/components/SearchTrigger";

export const metadata: Metadata = {
  title: "Browse All FPS Error Codes",
  description:
    "Browse all Faster Payments Scheme (FPS) rejection and return codes. Filter by type, category, and search for specific codes.",
};

interface PageProps {
  searchParams: Promise<{ type?: string; category?: string }>;
}

export default async function CodesPage({ searchParams }: PageProps) {
  const { type, category } = await searchParams;

  let filteredCodes = allErrorCodes;

  if (type) {
    filteredCodes = filteredCodes.filter((code) => code.type === type);
  }

  if (category) {
    filteredCodes = filteredCodes.filter((code) => code.category === category);
  }

  const categories = getAllCategories();
  const types = ["REJ", "RET"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          Browse FPS Error Codes
        </h1>
        <p className="text-muted-foreground mb-6">
          View all {allErrorCodes.length} Faster Payments Scheme error codes.
          Filter by type or category to find what you need.
        </p>

        <SearchTrigger
          placeholder="Search codes..."
          className="max-w-md mb-6"
        />

        <Suspense fallback={<div>Loading filters...</div>}>
          <CategoryFilter categories={categories} types={types} />
        </Suspense>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredCodes.length} of {allErrorCodes.length} codes
        {type && ` • Type: ${type}`}
        {category && ` • Category: ${category}`}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredCodes.map((code) => (
          <CodeCard key={`${code.scheme}-${code.code}`} code={code} />
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No codes found with the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
