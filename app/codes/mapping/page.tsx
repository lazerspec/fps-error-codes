import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, AlertTriangle, HelpCircle } from "lucide-react";
import { codeMappings } from "@/data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "FPS to ISO 20022 Code Mapping",
  description:
    "Mapping between current FPS error codes and future ISO 20022 return reason codes for the UK payments migration.",
};

function ConfidenceBadge({
  confidence,
}: {
  confidence: "exact" | "approximate" | "none";
}) {
  switch (confidence) {
    case "exact":
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-600">
          <Check className="w-3 h-3 mr-1" />
          Exact
        </Badge>
      );
    case "approximate":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Approximate
        </Badge>
      );
    case "none":
      return (
        <Badge variant="outline">
          <HelpCircle className="w-3 h-3 mr-1" />
          No mapping
        </Badge>
      );
  }
}

export default function MappingPage() {
  const exactCount = codeMappings.filter((m) => m.confidence === "exact").length;
  const approxCount = codeMappings.filter((m) => m.confidence === "approximate").length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          FPS → ISO 20022 Code Mapping
        </h1>
        <p className="text-muted-foreground mb-6">
          This table shows how current FPS error codes will map to the new ISO
          20022 standard when the UK migrates to the New Payments Architecture
          (NPA).
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="default" className="bg-green-600">
              <Check className="w-3 h-3 mr-1" />
              Exact
            </Badge>
            <span className="text-muted-foreground">{exactCount} codes</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Approximate
            </Badge>
            <span className="text-muted-foreground">{approxCount} codes</span>
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <Link
            href="/codes"
            className="text-primary hover:underline"
          >
            View current FPS codes →
          </Link>
          <Link
            href="/codes/future"
            className="text-primary hover:underline"
          >
            View ISO 20022 codes →
          </Link>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">FPS Code</TableHead>
              <TableHead>FPS Description</TableHead>
              <TableHead className="w-[100px] text-center">
                <ArrowRight className="w-4 h-4 mx-auto" />
              </TableHead>
              <TableHead className="w-[120px]">ISO 20022</TableHead>
              <TableHead>ISO 20022 Description</TableHead>
              <TableHead className="w-[120px]">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {codeMappings.map((mapping) => (
              <TableRow key={mapping.fpsCode}>
                <TableCell>
                  <Link
                    href={`/code/fps/${mapping.fpsCode}`}
                    className="font-mono text-sm font-medium hover:text-primary"
                  >
                    {mapping.fpsCode}
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {mapping.fpsDescription}
                </TableCell>
                <TableCell className="text-center">
                  <ArrowRight className="w-4 h-4 mx-auto text-muted-foreground" />
                </TableCell>
                <TableCell>
                  <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
                    {Array.isArray(mapping.iso20022Code)
                      ? mapping.iso20022Code.join(", ")
                      : mapping.iso20022Code}
                  </code>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {mapping.iso20022Description}
                  {mapping.notes && (
                    <p className="text-xs text-muted-foreground/70 mt-1 italic">
                      {mapping.notes}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <ConfidenceBadge confidence={mapping.confidence} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <h2 className="font-medium mb-2">About this mapping</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            • <strong>Exact</strong> mappings have a direct 1:1 correspondence
          </li>
          <li>
            • <strong>Approximate</strong> mappings are the closest equivalent
            but may differ in scope
          </li>
          <li>
            • Some FPS codes map to multiple ISO 20022 codes depending on context
          </li>
          <li>
            • This mapping is based on analysis of official ISO 20022 external
            code sets and FPS documentation
          </li>
        </ul>
      </div>
    </div>
  );
}
