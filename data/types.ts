export type ErrorCodeType = "REJ" | "RET";
export type Scheme = "FPS" | "ISO20022";
export type Severity = "fatal" | "retryable";
export type Category =
  | "Account"
  | "Agency"
  | "System"
  | "Limits"
  | "Format"
  | "Security"
  | "Other";

export interface ErrorCode {
  /** The error code (e.g., "1114" or "00000001") */
  code: string;

  /** REJ = Scheme Rejection, RET = Bank Return */
  type: ErrorCodeType;

  /** Payment scheme identifier */
  scheme: Scheme;

  /** Category for filtering */
  category: Category;

  /** Brief description (e.g., "Beneficiary account unknown") */
  shortDescription: string;

  /** Plain English explanation, 2-3 sentences */
  detailedExplanation: string;

  /** Common causes from a developer/ops perspective */
  commonCauses: string[];

  /** What to tell the end user - polite, actionable, not technical */
  customerMessage: string;

  /** Actionable steps to fix, in order of likelihood */
  remediationSteps: string[];

  /** Whether the payment can be retried */
  severity: Severity;

  /** Related error codes for cross-reference */
  relatedCodes?: string[];
}

export interface SearchableCode {
  code: string;
  type: ErrorCodeType;
  scheme: Scheme;
  category: Category;
  shortDescription: string;
  detailedExplanation: string;
}

/** Payment rails/schemes that use ISO 20022 */
export type PaymentRail =
  | "SEPA"      // EU Single Euro Payments Area
  | "CHAPS"     // UK high-value (Bank of England)
  | "SWIFT"     // Cross-border (CBPR+)
  | "FedNow"    // US real-time
  | "TARGET2"   // EU high-value
  | "FPS-Future"; // UK Faster Payments (when migrated)

/** ISO 20022 External Code - future standard for UK payments */
export interface ISO20022Code {
  /** 4-character code (e.g., "AC04", "MD07") */
  code: string;

  /** Official ISO 20022 description */
  description: string;

  /** Category for grouping (derived from code prefix) */
  category: ISO20022Category;

  /** Which payment rails commonly use this code */
  rails: PaymentRail[];

  /** Maps to current FPS 8-digit code if applicable */
  legacyFpsCode?: string;

  /** Scheme-specific usage notes (e.g., privacy restrictions) */
  railNotes?: string;
}

export type ISO20022Category =
  | "Account" // AC codes
  | "Agent" // AG codes
  | "Amount" // AM codes
  | "Beneficiary" // BE codes
  | "Mandate" // MD codes
  | "Message" // MS codes
  | "Regulatory" // RR codes
  | "Service" // SL codes
  | "Technical" // RC, RF, FF, DT, ED, DS codes
  | "Other"; // Everything else
