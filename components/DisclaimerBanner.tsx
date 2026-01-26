import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export function DisclaimerBanner() {
  return (
    <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p>
            <strong>Community Reference:</strong> This is an unofficial resource
            compiled from public banking documentation. Severity and behavior may
            vary by bank and payment provider.{" "}
            <Link
              href="/references"
              className="underline hover:no-underline font-medium"
            >
              View sources
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
