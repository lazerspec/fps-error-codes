import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ErrorCode } from "@/data/types";

interface CodeCardProps {
  code: ErrorCode;
}

export function CodeCard({ code }: CodeCardProps) {
  return (
    <Link
      href={`/code/${code.scheme.toLowerCase()}/${code.code}`}
      className="block p-4 rounded-lg border border-border hover:border-muted-foreground/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <code className="font-mono text-lg font-medium">{code.code}</code>
        <Badge
          variant={code.severity === "fatal" ? "destructive" : "secondary"}
          className="shrink-0 text-xs"
        >
          {code.severity === "fatal" ? "Fatal" : "Retryable"}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {code.shortDescription}
      </p>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {code.type}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {code.category}
        </Badge>
      </div>
    </Link>
  );
}
