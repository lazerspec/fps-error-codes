/**
 * FPS to ISO 20022 Code Mapping
 * Maps current FPS 8-digit/4-digit codes to future ISO 20022 4-character codes
 */

export interface CodeMapping {
  /** Current FPS code */
  fpsCode: string;
  /** FPS code description */
  fpsDescription: string;
  /** ISO 20022 equivalent code(s) */
  iso20022Code: string | string[];
  /** ISO 20022 description */
  iso20022Description: string;
  /** Mapping confidence: exact = 1:1 match, approximate = similar meaning, none = no equivalent */
  confidence: "exact" | "approximate" | "none";
  /** Notes about the mapping */
  notes?: string;
}

export const codeMappings: CodeMapping[] = [
  // Account-related mappings
  {
    fpsCode: "1114",
    fpsDescription: "Invalid sort code/account number combination",
    iso20022Code: "AC01",
    iso20022Description: "Format of the account number specified is not correct",
    confidence: "approximate",
    notes: "AC01 covers format issues; BE06 may also apply for unknown accounts",
  },
  {
    fpsCode: "1160",
    fpsDescription: "Beneficiary account closed",
    iso20022Code: ["AC04", "AC07"],
    iso20022Description: "Account closed on bank's books / Creditor account closed",
    confidence: "exact",
  },
  {
    fpsCode: "1176",
    fpsDescription: "Unknown sort code/account number",
    iso20022Code: "BE06",
    iso20022Description: "End customer not known at associated Sort/National Bank Code",
    confidence: "exact",
  },
  {
    fpsCode: "1162",
    fpsDescription: "Beneficiary name mismatch",
    iso20022Code: "BE01",
    iso20022Description: "Identification not consistent with account number",
    confidence: "exact",
  },
  {
    fpsCode: "1163",
    fpsDescription: "Account unidentifiable without reference",
    iso20022Code: "RR09",
    iso20022Description: "Structured creditor reference invalid or missing",
    confidence: "approximate",
  },
  {
    fpsCode: "1165",
    fpsDescription: "Currency mismatch",
    iso20022Code: "CURR",
    iso20022Description: "Currency of the payment is incorrect",
    confidence: "exact",
  },
  {
    fpsCode: "1166",
    fpsDescription: "Account no longer valid",
    iso20022Code: "AC15",
    iso20022Description: "Account details have changed",
    confidence: "approximate",
  },
  {
    fpsCode: "1170",
    fpsDescription: "Account terms prohibit credit",
    iso20022Code: "AG01",
    iso20022Description: "Transaction forbidden on this type of account",
    confidence: "exact",
  },

  // Return code mappings (8-digit)
  {
    fpsCode: "00000001",
    fpsDescription: "Invalid sort code/account number",
    iso20022Code: "BE06",
    iso20022Description: "End customer not known at Sort Code",
    confidence: "exact",
  },
  {
    fpsCode: "00000002",
    fpsDescription: "Beneficiary account closed",
    iso20022Code: "AC04",
    iso20022Description: "Account closed on bank's books",
    confidence: "exact",
  },
  {
    fpsCode: "00000003",
    fpsDescription: "Creditor account stopped",
    iso20022Code: ["AC06", "SP01"],
    iso20022Description: "Account blocked / Payment stopped by account holder",
    confidence: "exact",
  },
  {
    fpsCode: "00000004",
    fpsDescription: "Creditor deceased",
    iso20022Code: "MD07",
    iso20022Description: "End customer is deceased",
    confidence: "exact",
  },
  {
    fpsCode: "00000005",
    fpsDescription: "Account unidentifiable without reference",
    iso20022Code: "RR09",
    iso20022Description: "Structured creditor reference invalid or missing",
    confidence: "approximate",
  },
  {
    fpsCode: "00000006",
    fpsDescription: "Beneficiary name mismatch",
    iso20022Code: "BE01",
    iso20022Description: "Identification not consistent with account number",
    confidence: "exact",
  },
  {
    fpsCode: "00000007",
    fpsDescription: "Return requested by sender",
    iso20022Code: "FOCR",
    iso20022Description: "Return following a cancellation request",
    confidence: "exact",
  },
  {
    fpsCode: "00000008",
    fpsDescription: "Account not in quoted currency",
    iso20022Code: "CURR",
    iso20022Description: "Currency of the payment is incorrect",
    confidence: "exact",
  },
  {
    fpsCode: "00000009",
    fpsDescription: "Recipient requested return",
    iso20022Code: "MD06",
    iso20022Description: "Return of funds requested by end customer",
    confidence: "exact",
  },
  {
    fpsCode: "00000010",
    fpsDescription: "Account terms prohibit credit",
    iso20022Code: "AG01",
    iso20022Description: "Transaction forbidden on this type of account",
    confidence: "exact",
  },
  {
    fpsCode: "00000011",
    fpsDescription: "Sending institution action required",
    iso20022Code: "AGNT",
    iso20022Description: "Agent in the payment workflow is incorrect",
    confidence: "approximate",
    notes: "May require manual review; closest ISO 20022 equivalent",
  },
  {
    fpsCode: "00000012",
    fpsDescription: "Account transferred",
    iso20022Code: "AC15",
    iso20022Description: "Account details have changed",
    confidence: "exact",
  },
  {
    fpsCode: "00000013",
    fpsDescription: "Creditor sensitivities (bankruptcy)",
    iso20022Code: ["AC16", "AC17"],
    iso20022Description: "Account in sequestration / Account in liquidation",
    confidence: "exact",
  },
  {
    fpsCode: "00000014",
    fpsDescription: "Reason not given",
    iso20022Code: ["MS02", "MS03"],
    iso20022Description: "Reason not specified by end customer / agent",
    confidence: "exact",
  },

  // System/technical codes with no direct mapping
  {
    fpsCode: "1100",
    fpsDescription: "Generic rejection",
    iso20022Code: "MS03",
    iso20022Description: "Reason not specified by agent",
    confidence: "approximate",
    notes: "Generic catch-all codes map loosely",
  },
  {
    fpsCode: "1161",
    fpsDescription: "Rejected by receiving bank (unspecified)",
    iso20022Code: "MS03",
    iso20022Description: "Reason not specified by agent",
    confidence: "approximate",
  },
];

// Helper functions
export function getMappingByFpsCode(fpsCode: string): CodeMapping | undefined {
  return codeMappings.find((m) => m.fpsCode === fpsCode);
}

export function getMappingsByISO20022Code(iso20022Code: string): CodeMapping[] {
  return codeMappings.filter((m) => {
    if (Array.isArray(m.iso20022Code)) {
      return m.iso20022Code.includes(iso20022Code);
    }
    return m.iso20022Code === iso20022Code;
  });
}

export function getExactMappings(): CodeMapping[] {
  return codeMappings.filter((m) => m.confidence === "exact");
}

export function getApproximateMappings(): CodeMapping[] {
  return codeMappings.filter((m) => m.confidence === "approximate");
}
