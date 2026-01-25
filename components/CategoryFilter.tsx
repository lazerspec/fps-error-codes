"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  types: string[];
}

export function CategoryFilter({ categories, types }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "";
  const currentCategory = searchParams.get("category") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/codes?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Type filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Type</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={currentType === "" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("type", "")}
          >
            All
          </Button>
          {types.map((type) => (
            <Button
              key={type}
              variant={currentType === type ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("type", type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={currentCategory === "" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("category", "")}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("category", category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
