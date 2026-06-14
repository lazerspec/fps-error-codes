import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers — JSON API",
  description:
    "Read-only JSON endpoints for UK Faster Payments error codes: look up a single code or fetch the full search index. No auth, no rate limits documented, unofficial community reference.",
};

const errorCodeFields: { field: string; type: string; description: string }[] = [
  { field: "code", type: "string", description: 'The error code (e.g. "1114" or "00000001").' },
  { field: "type", type: '"REJ" | "RET"', description: "REJ = scheme rejection (pre-acceptance), RET = bank return (post-acceptance)." },
  { field: "scheme", type: '"FPS" | "ISO20022"', description: "Payment scheme identifier." },
  { field: "category", type: "string", description: "Grouping such as Account, System, Limits, Format, Security, Agency, Other." },
  { field: "shortDescription", type: "string", description: "Brief one-line description of the code." },
  { field: "detailedExplanation", type: "string", description: "Plain-English explanation, two to three sentences." },
  { field: "commonCauses", type: "string[]", description: "Likely causes from a developer or ops perspective." },
  { field: "customerMessage", type: "string", description: "A polite, non-technical message suitable for an end user." },
  { field: "remediationSteps", type: "string[]", description: "Actionable steps to resolve, ordered by likelihood." },
  { field: "severity", type: '"fatal" | "retryable"', description: "Whether the payment can sensibly be retried." },
  { field: "relatedCodes", type: "string[] (optional)", description: "Related codes for cross-reference." },
  { field: "lastVerified", type: "string (ISO 8601)", description: "Date the code was last checked against its source." },
  { field: "source", type: "string", description: "Primary source for the code's data." },
];

const searchEntryFields: { field: string; type: string; description: string }[] = [
  { field: "kind", type: '"fps" | "iso"', description: "Which dataset the entry came from." },
  { field: "code", type: "string", description: 'The code (e.g. "1114", "AC04").' },
  { field: "title", type: "string", description: "Display title (FPS short description or ISO description)." },
  { field: "category", type: "string", description: "Category for grouping." },
  { field: "type", type: '"REJ" | "RET" (optional)', description: "REJ/RET, FPS entries only." },
  { field: "severity", type: '"fatal" | "retryable" (optional)', description: "Severity, FPS entries only." },
  { field: "href", type: "string", description: "Destination URL for the entry on this site." },
  { field: "crossRef", type: "string (optional)", description: 'Short cross-reference hint, e.g. "↔ AC04".' },
];

const exampleResponse = `{
  "success": true,
  "data": {
    "code": "1114",
    "type": "REJ",
    "scheme": "FPS",
    "category": "Account",
    "shortDescription": "Beneficiary sort code/account number unknown",
    "detailedExplanation": "The receiving bank couldn't find an account matching the sort code and account number provided. This is the most common FPS rejection, typically caused by typos when entering payment details.",
    "commonCauses": [
      "Typo in account number or sort code",
      "Customer provided old or closed account details",
      "Sort code doesn't belong to the bank expected",
      "Account number has wrong number of digits"
    ],
    "customerMessage": "We couldn't find the account you're trying to pay. Please double-check the sort code and account number with the recipient.",
    "remediationSteps": [
      "Ask the beneficiary to confirm their current account details",
      "Verify the sort code matches the bank (use a sort code checker)",
      "Ensure account number is 8 digits (pad with leading zeros if needed)",
      "Retry the payment with corrected details"
    ],
    "severity": "fatal",
    "relatedCodes": ["1176", "00000001"],
    "lastVerified": "2026-01-25",
    "source": "LHV Connect"
  }
}`;

const notFoundResponse = `{
  "error": "Code not found",
  "message": "No error code found for scheme \\"fps\\" and code \\"9999\\""
}`;

const searchResponse = `[
  {
    "kind": "fps",
    "code": "1114",
    "title": "Beneficiary sort code/account number unknown",
    "category": "Account",
    "type": "REJ",
    "severity": "fatal",
    "href": "/code/fps/1114",
    "crossRef": "↔ AC01"
  }
]`;

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

export default function DevelopersPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fpserrorcodes.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Developers",
        item: "https://fpserrorcodes.co.uk/developers",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          Developers
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Two read-only JSON endpoints expose the same data that powers this
          site. They are unauthenticated and intended for lightweight,
          programmatic lookups.
        </p>
      </header>

      <div className="mb-10 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">No authentication</strong> ·{" "}
          <strong className="text-foreground">Read-only</strong> ·{" "}
          <strong className="text-foreground">Unofficial community reference.</strong>{" "}
          These endpoints return the project&apos;s aggregated data; they are not
          an official Pay.UK or bank API. See the{" "}
          <Link href="/references" className="text-primary hover:underline">
            references
          </Link>{" "}
          for sources.
        </p>
      </div>

      {/* Endpoint 1 */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          Look up a single code
        </h2>
        <p className="mb-4">
          <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
            GET /api/code/{"{scheme}"}/{"{code}"}
          </code>
        </p>

        <h3 className="font-medium mb-2">Path parameters</h3>
        <div className="mb-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Parameter</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2 font-mono">scheme</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Scheme identifier, e.g. <code className="font-mono">fps</code>{" "}
                  (case-insensitive).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">code</td>
                <td className="px-4 py-2 text-muted-foreground">
                  The exact error code, e.g.{" "}
                  <code className="font-mono">1114</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-medium mb-2">Example request</h3>
        <div className="mb-6">
          <CodeBlock>{`curl https://fpserrorcodes.co.uk/api/code/fps/1114`}</CodeBlock>
        </div>

        <h3 className="font-medium mb-2">
          Success response{" "}
          <span className="text-muted-foreground font-normal">(200)</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Returns{" "}
          <code className="font-mono">
            {"{ success: true, data: ErrorCode }"}
          </code>
          .
        </p>
        <div className="mb-6">
          <CodeBlock>{exampleResponse}</CodeBlock>
        </div>

        <h3 className="font-medium mb-2">
          Not found{" "}
          <span className="text-muted-foreground font-normal">(404)</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Returns{" "}
          <code className="font-mono">{"{ error, message }"}</code>.
        </p>
        <div className="mb-8">
          <CodeBlock>{notFoundResponse}</CodeBlock>
        </div>

        <h3 className="font-medium mb-2">
          The <code className="font-mono">ErrorCode</code> object
        </h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Field</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {errorCodeFields.map((f) => (
                <tr key={f.field}>
                  <td className="px-4 py-2 font-mono whitespace-nowrap">
                    {f.field}
                  </td>
                  <td className="px-4 py-2 font-mono text-muted-foreground whitespace-nowrap">
                    {f.type}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {f.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Endpoint 2 */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          Fetch the search index
        </h2>
        <p className="mb-4">
          <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
            GET /api/search-data
          </code>
        </p>
        <p className="text-muted-foreground mb-6">
          Returns a <code className="font-mono">SearchEntry[]</code> covering both
          FPS and ISO 20022 codes. This is the same dataset that powers search on
          this site, so it is handy for building your own lookup or autocomplete.
        </p>

        <h3 className="font-medium mb-2">Example request</h3>
        <div className="mb-6">
          <CodeBlock>{`curl https://fpserrorcodes.co.uk/api/search-data`}</CodeBlock>
        </div>

        <h3 className="font-medium mb-2">
          Response{" "}
          <span className="text-muted-foreground font-normal">(200)</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          An array of entries (truncated to one item below):
        </p>
        <div className="mb-6">
          <CodeBlock>{searchResponse}</CodeBlock>
        </div>

        <h3 className="font-medium mb-2">
          The <code className="font-mono">SearchEntry</code> object
        </h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Field</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {searchEntryFields.map((f) => (
                <tr key={f.field}>
                  <td className="px-4 py-2 font-mono whitespace-nowrap">
                    {f.field}
                  </td>
                  <td className="px-4 py-2 font-mono text-muted-foreground whitespace-nowrap">
                    {f.type}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {f.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        Prefer to browse? See all codes on the{" "}
        <Link href="/codes" className="text-primary hover:underline">
          codes page
        </Link>{" "}
        or read the{" "}
        <Link href="/faq" className="text-primary hover:underline">
          FAQ
        </Link>
        .
      </p>
    </div>
  );
}
