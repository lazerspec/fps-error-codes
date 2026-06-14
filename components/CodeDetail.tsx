import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/CopyButton";
import { ReportIssue } from "@/components/ReportIssue";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { AtAGlance } from "@/components/AtAGlance";
import { getCodeBySlug } from "@/data";
import type { ErrorCode } from "@/data/types";
import { CalendarDays, BookOpen } from "lucide-react";

interface CodeDetailProps {
  code: ErrorCode;
}

export function CodeDetail({ code }: CodeDetailProps) {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/codes" className="hover:text-foreground transition-colors">
          Codes
        </Link>
        <span>/</span>
        <Link
          href={`/codes?scheme=${code.scheme}`}
          className="hover:text-foreground transition-colors"
        >
          {code.scheme}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{code.code}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-mono font-semibold">
              {code.code}
            </h1>
            <CopyButton text={code.code} />
          </div>
          <Badge
            variant={code.severity === "fatal" ? "destructive" : "secondary"}
            className="shrink-0"
          >
            {code.severity === "fatal" ? "Fatal" : "Retryable"}
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground">{code.shortDescription}</p>
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="outline">{code.type}</Badge>
          <Badge variant="outline">{code.category}</Badge>
        </div>
      </header>

      {/* At a glance */}
      <AtAGlance code={code} />

      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Overview */}
      <section className="mb-8">
        <div className="p-4 sm:p-6 bg-muted/50 rounded-lg border border-border">
          <p className="text-base leading-relaxed">{code.detailedExplanation}</p>
        </div>
      </section>

      {/* Common Causes */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Common Causes</h2>
        <ul className="space-y-2">
          {code.commonCauses.map((cause, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-muted-foreground mt-1">•</span>
              <span>{cause}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Customer Message */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">What to Tell the Customer</h2>
        <div className="relative p-4 sm:p-6 bg-muted/50 rounded-lg border border-border">
          <p className="text-base leading-relaxed pr-12">
            &ldquo;{code.customerMessage}&rdquo;
          </p>
          <div className="absolute top-3 right-3">
            <CopyButton text={code.customerMessage} />
          </div>
        </div>
      </section>

      {/* Remediation Steps */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">How to Fix</h2>
          <CopyButton
            text={code.remediationSteps
              .map((step, i) => `${i + 1}. ${step}`)
              .join("\n")}
            label="Copy all"
          />
        </div>
        <ol className="space-y-3">
          {code.remediationSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-sm font-medium shrink-0">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Related Codes */}
      {code.relatedCodes && code.relatedCodes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Related Codes</h2>
          <div className="flex flex-col gap-2">
            {code.relatedCodes.map((relatedCode) => {
              const related = getCodeBySlug("fps", relatedCode);
              return (
                <Link
                  key={relatedCode}
                  href={`/code/fps/${relatedCode}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:bg-muted transition-colors"
                >
                  <code className="font-mono text-sm shrink-0">
                    {relatedCode}
                  </code>
                  {related && (
                    <>
                      <span className="text-muted-foreground shrink-0">·</span>
                      <span className="text-sm text-muted-foreground">
                        {related.shortDescription}
                      </span>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Data Provenance */}
      <footer className="mt-12 pt-6 border-t border-border space-y-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Last verified: </span>
            <time dateTime={code.lastVerified} className="font-medium text-foreground">
              {new Date(code.lastVerified).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>Source: </span>
            <span className="font-medium text-foreground">{code.source}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Data compiled and cross-referenced from{" "}
          <a
            href="https://lhv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline text-foreground"
          >
            LHV Connect
          </a>
          ,{" "}
          <a
            href="https://clearbank.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline text-foreground"
          >
            ClearBank
          </a>
          , and{" "}
          <a
            href="https://developer.starlingbank.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline text-foreground"
          >
            Starling Bank
          </a>{" "}
          documentation. These codes are standard Pay.UK / Faster Payments
          Scheme (FPS) specifications.
        </p>

        <div className="pt-2">
          <ReportIssue code={code.code} scheme={code.scheme} />
        </div>
      </footer>
    </article>
  );
}
