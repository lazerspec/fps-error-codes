"use client";

import { MessageSquareWarning } from "lucide-react";

interface ReportIssueProps {
  code: string;
  scheme: string;
}

export function ReportIssue({ code, scheme }: ReportIssueProps) {
  const issueTitle = encodeURIComponent(
    `Data issue: ${scheme} code ${code}`
  );
  const issueBody = encodeURIComponent(
    `## Error Code
**Code:** ${code}
**Scheme:** ${scheme}

## Issue Description
<!-- Please describe the issue with this error code's data -->

## Suggested Correction
<!-- If you know the correct information, please provide it here -->

## Source
<!-- Where did you find the correct information? Please provide a link if possible -->
`
  );

  // GitHub issues URL - update this to your actual repo
  const githubUrl = `https://github.com/lazerspec/fps-error-codes/issues/new?title=${issueTitle}&body=${issueBody}&labels=data-accuracy`;

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <MessageSquareWarning className="h-4 w-4" />
      <span>Report an issue with this data</span>
    </a>
  );
}
