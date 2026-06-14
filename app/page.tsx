import Link from "next/link";
import { ArrowRight, HelpCircle, BookOpen, Code2, Info } from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";
import { HomeCategoryGrid } from "@/components/HomeCategoryGrid";
import { allErrorCodes, iso20022Codes, codeMappings } from "@/data";

const popularCodes = [
  { code: "1114", description: "Account unknown" },
  { code: "1160", description: "Account closed" },
  { code: "1162", description: "Name mismatch" },
  { code: "9909", description: "System malfunction" },
];

const quickLinks = [
  {
    href: "/faq",
    title: "FAQ",
    description: "Common questions about FPS error codes.",
    icon: HelpCircle,
  },
  {
    href: "/glossary",
    title: "Glossary",
    description: "Payments terms explained in plain English.",
    icon: BookOpen,
  },
  {
    href: "/developers",
    title: "Developers / API",
    description: "Integrate FPS code data into your tools.",
    icon: Code2,
  },
  {
    href: "/what-is-fps",
    title: "What is FPS?",
    description: "A primer on the Faster Payments Scheme.",
    icon: Info,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 py-16 sm:py-24">
      {/* Hero */}
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

      {/* Stats strip */}
      <p className="mt-10 text-center text-sm text-muted-foreground">
        {allErrorCodes.length} FPS codes
        <span className="mx-2 text-border">·</span>
        {iso20022Codes.length} ISO 20022 codes
        <span className="mx-2 text-border">·</span>
        {codeMappings.length} FPS ↔ ISO mappings
      </p>

      {/* Browse by category */}
      <section className="w-full max-w-4xl mt-16 sm:mt-20">
        <h2 className="text-lg font-semibold mb-4">Browse by category</h2>
        <HomeCategoryGrid />
      </section>

      {/* ISO 20022 migration banner */}
      <section className="w-full max-w-4xl mt-16 sm:mt-20">
        <div className="rounded-xl border border-indigo/30 bg-indigo/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-2 text-indigo">
            FPS is migrating to ISO 20022
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mb-5">
            Under the New Payments Architecture, the UK&apos;s Faster Payments
            Scheme is moving from today&apos;s numeric codes to the global ISO
            20022 messaging standard.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/codes/mapping"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo hover:underline"
            >
              FPS ↔ ISO 20022 mapping
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/codes/future"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo hover:underline"
            >
              Browse future codes
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="w-full max-w-4xl mt-16 sm:mt-20">
        <h2 className="text-lg font-semibold mb-4">Learn more</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-2 p-5 rounded-lg border border-border hover:border-indigo/60 hover:bg-muted/50 transition-colors"
              >
                <Icon className="size-5 text-indigo" />
                <span className="font-medium">{link.title}</span>
                <span className="text-sm text-muted-foreground">
                  {link.description}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
