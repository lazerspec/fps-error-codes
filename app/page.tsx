import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";

const popularCodes = [
  { code: "1114", description: "Account unknown" },
  { code: "1160", description: "Account closed" },
  { code: "1162", description: "Name mismatch" },
  { code: "9909", description: "System malfunction" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          FPS Error Code Reference
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Decode Faster Payments Scheme rejection and return codes with plain
          English explanations and fixes.
        </p>

        <HeroSearch
          placeholder="Search error codes..."
          className="w-full max-w-xl mx-auto mb-8"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Popular:</span>
          {popularCodes.map((item) => (
            <Link
              key={item.code}
              href={`/code/fps/${item.code}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
            >
              <code className="font-mono font-medium">{item.code}</code>
              <span className="text-muted-foreground hidden sm:inline">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl mt-16 sm:mt-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <h2 className="font-semibold mb-2">REJ Codes</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Scheme rejection codes returned instantly when a payment cannot be
              processed.
            </p>
            <Link
              href="/codes?type=REJ"
              className="text-sm text-indigo hover:underline"
            >
              View all REJ codes
            </Link>
          </div>

          <div className="p-6 rounded-lg border border-border">
            <h2 className="font-semibold mb-2">RET Codes</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Bank return codes for payments returned after initial acceptance.
            </p>
            <Link
              href="/codes?type=RET"
              className="text-sm text-indigo hover:underline"
            >
              View all RET codes
            </Link>
          </div>

          <div className="p-6 rounded-lg border border-border sm:col-span-2 lg:col-span-1">
            <h2 className="font-semibold mb-2">Browse All</h2>
            <p className="text-sm text-muted-foreground mb-3">
              View all FPS error codes organized by category with filters.
            </p>
            <Link
              href="/codes"
              className="text-sm text-indigo hover:underline"
            >
              Browse all codes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
