import type { ErrorCode } from "@/data/types";

interface AtAGlanceProps {
  code: ErrorCode;
}

/**
 * Key-facts card shown directly under the detail-page header. Surfaces the
 * retry verdict, severity, type and category at a glance, with a left accent
 * border keyed to severity (red = fatal, emerald = retryable).
 */
export function AtAGlance({ code }: AtAGlanceProps) {
  const retryable = code.severity === "retryable";

  const rows: { label: string; value: string; valueClass?: string }[] = [
    {
      label: "Can I retry?",
      value: retryable
        ? "Yes — safe to retry later"
        : "No — fix the problem first",
      valueClass: retryable
        ? "text-emerald-600 dark:text-emerald-400 font-medium"
        : "text-red-600 dark:text-red-400 font-medium",
    },
    {
      label: "Severity",
      value: retryable ? "Retryable" : "Fatal",
    },
    {
      label: "Type",
      value:
        code.type === "REJ"
          ? "REJ · rejected before acceptance"
          : "RET · returned after acceptance",
    },
    {
      label: "Category",
      value: code.category,
    },
  ];

  return (
    <section className="mb-8">
      <div
        className={`rounded-lg border border-border border-l-4 bg-muted/50 p-4 sm:p-6 ${
          retryable
            ? "border-l-emerald-500 dark:border-l-emerald-400"
            : "border-l-red-500 dark:border-l-red-400"
        }`}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          At a glance
        </h2>
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2"
            >
              <dt className="text-sm text-muted-foreground shrink-0 sm:w-28">
                {row.label}
              </dt>
              <dd className={`text-sm ${row.valueClass ?? "text-foreground"}`}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
