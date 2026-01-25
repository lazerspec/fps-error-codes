import { ISO20022Code, ISO20022Category, PaymentRail } from "../types";

/**
 * ISO 20022 External Return Reason Codes
 * Source: ISO 20022 External Code Sets (Q3 2025)
 * These codes will replace the current FPS 8-digit codes when UK migrates to ISO 20022
 */

function categorizeCode(code: string): ISO20022Category {
  const prefix = code.substring(0, 2);
  switch (prefix) {
    case "AC":
      return "Account";
    case "AG":
      return "Agent";
    case "AM":
      return "Amount";
    case "BE":
      return "Beneficiary";
    case "MD":
      return "Mandate";
    case "MS":
      return "Message";
    case "RR":
      return "Regulatory";
    case "SL":
      return "Service";
    case "RC":
    case "RF":
    case "FF":
    case "DT":
    case "ED":
    case "DS":
      return "Technical";
    default:
      return "Other";
  }
}

// Common rail combinations
const ALL_RAILS: PaymentRail[] = ["SEPA", "CHAPS", "SWIFT", "FedNow", "TARGET2", "FPS-Future"];
const CORE_RAILS: PaymentRail[] = ["SEPA", "CHAPS", "SWIFT", "FPS-Future"];
const SEPA_ONLY: PaymentRail[] = ["SEPA", "TARGET2"];
const HIGH_VALUE: PaymentRail[] = ["CHAPS", "SWIFT", "TARGET2"];

interface RawCode {
  code: string;
  description: string;
  rails: PaymentRail[];
  legacyFpsCode?: string;
  railNotes?: string;
}

const iso20022CodesRaw: RawCode[] = [
  // Account codes (AC)
  { code: "AC01", description: "Format of the account number specified is not correct", rails: ALL_RAILS },
  { code: "AC02", description: "Debtor account number invalid or missing", rails: ALL_RAILS },
  { code: "AC03", description: "Wrong IBAN in SCT", rails: SEPA_ONLY, railNotes: "SEPA-specific (IBAN validation)" },
  { code: "AC04", description: "Account number specified has been closed on the bank of account's books", rails: CORE_RAILS, legacyFpsCode: "00000002", railNotes: "Some SEPA countries restrict for privacy - use MS03 instead" },
  { code: "AC06", description: "Account specified is blocked, prohibiting posting of transactions against it", rails: ALL_RAILS, legacyFpsCode: "00000003" },
  { code: "AC07", description: "Creditor account number closed", rails: ALL_RAILS, legacyFpsCode: "00000002" },
  { code: "AC13", description: "Debtor account type is missing or invalid", rails: HIGH_VALUE },
  { code: "AC14", description: "An agent in the payment chain is invalid", rails: ["SWIFT", "CHAPS"] },
  { code: "AC15", description: "Account details have changed", rails: CORE_RAILS },
  { code: "AC16", description: "Account is in sequestration", rails: ALL_RAILS },
  { code: "AC17", description: "Account is in liquidation", rails: ALL_RAILS },

  // Agent codes (AG)
  { code: "AG01", description: "Transaction forbidden on this type of account (formerly NoAgreement)", rails: ALL_RAILS },
  { code: "AG02", description: "Bank Operation code specified in the message is not valid for receiver", rails: ["SEPA", "SWIFT"] },
  { code: "AG07", description: "Debtor account cannot be debited for a generic reason. May be used as replacement for AM04 if bank does not reveal insufficient funds for privacy", rails: ALL_RAILS, railNotes: "Privacy-preserving alternative to AM04" },
  { code: "AGNT", description: "Agent in the payment workflow is incorrect", rails: ["SWIFT", "CHAPS"] },

  // Amount codes (AM)
  { code: "AM01", description: "Specified message amount is equal to zero", rails: ALL_RAILS },
  { code: "AM02", description: "Specific transaction/message amount is greater than allowed maximum", rails: ALL_RAILS },
  { code: "AM03", description: "Specified message amount is a non-processable currency outside of existing agreement", rails: ["SWIFT", "CHAPS"] },
  { code: "AM04", description: "Amount of funds available to cover specified message amount is insufficient", rails: CORE_RAILS, railNotes: "Some SEPA countries restrict for privacy - use MS03 or AG07 instead" },
  { code: "AM05", description: "Duplication", rails: ALL_RAILS },
  { code: "AM06", description: "Specified transaction amount is less than agreed minimum", rails: ALL_RAILS },
  { code: "AM07", description: "Amount specified in message has been blocked by regulatory authorities", rails: ALL_RAILS },
  { code: "AM09", description: "Amount received is not the amount agreed or expected", rails: ["SEPA"] },
  { code: "AM10", description: "Sum of instructed amounts does not equal the control sum", rails: ["SEPA", "SWIFT"] },

  // Beneficiary/Party codes (BE)
  { code: "BE01", description: "Identification of end customer is not consistent with associated account number, organisation ID or private ID", rails: ALL_RAILS },
  { code: "BE04", description: "Specification of creditor's address, which is required for payment, is missing/not correct", rails: ["SWIFT", "CHAPS"] },
  { code: "BE05", description: "Party who initiated the message is not recognised by the end customer", rails: ["SEPA"] },
  { code: "BE06", description: "End customer specified is not known at associated Sort/National Bank Code or does no longer exist in the books", rails: CORE_RAILS, legacyFpsCode: "00000001" },
  { code: "BE07", description: "Specification of debtor's address, which is required for payment, is missing/not correct", rails: ["SWIFT", "CHAPS"] },
  { code: "BE08", description: "Returned as a result of a bank error", rails: ALL_RAILS },
  { code: "BE10", description: "Debtor country code is missing or invalid", rails: ["SWIFT"] },
  { code: "BE11", description: "Creditor country code is missing or invalid", rails: ["SWIFT"] },
  { code: "BE16", description: "Debtor or Ultimate Debtor identification code missing or invalid", rails: ["SWIFT", "CHAPS"] },
  { code: "BE17", description: "Creditor or Ultimate Creditor identification code missing or invalid", rails: ["SWIFT", "CHAPS"] },

  // Cancellation/Consent codes (CN)
  { code: "CN01", description: "Authorisation is cancelled", rails: ["SEPA"] },
  { code: "CNOR", description: "Creditor bank is not registered under this BIC in the CSM", rails: ["SEPA", "SWIFT"] },
  { code: "CNPC", description: "Cash not picked up by Creditor or cash could not be delivered to Creditor", rails: ["SWIFT"] },

  // Currency code
  { code: "CURR", description: "Currency of the payment is incorrect", rails: ALL_RAILS, legacyFpsCode: "00000008" },

  // Customer initiated
  { code: "CUST", description: "Cancellation requested by the Debtor", rails: ALL_RAILS },

  // Debtor bank not registered
  { code: "DNOR", description: "Debtor bank is not registered under this BIC in the CSM", rails: ["SEPA", "SWIFT"] },

  // Technical/Data codes (DS, DT)
  { code: "DS28", description: "Return following technical problems resulting in erroneous transaction", rails: ALL_RAILS },
  { code: "DT01", description: "Invalid date (e.g., wrong settlement date)", rails: ALL_RAILS },
  { code: "DT02", description: "Cheque has been issued but not deposited and is considered expired", rails: ["CHAPS", "SWIFT"] },
  { code: "DT04", description: "Future date not supported", rails: ["FedNow", "FPS-Future"], railNotes: "Real-time payment schemes" },
  { code: "DC04", description: "Return of Covering Settlement due to underlying Credit Transfer details not being received", rails: ["SWIFT", "CHAPS"] },
  { code: "DUPL", description: "Payment is a duplicate of another payment", rails: ALL_RAILS },

  // Error/Edit codes (ED)
  { code: "ED01", description: "Correspondent bank not possible", rails: ["SWIFT"] },
  { code: "ED03", description: "Balance of payments complementary info is requested", rails: ["SWIFT"] },
  { code: "ED05", description: "Settlement of the transaction has failed", rails: HIGH_VALUE },

  // EMV/Card codes
  { code: "EMVL", description: "The card payment is fraudulent and was not processed with EMV technology for an EMV card", rails: [] as PaymentRail[], railNotes: "Card payments only" },

  // Extended Remittance
  { code: "ERIN", description: "The Extended Remittance Information (ERI) option is not supported", rails: ["SWIFT"] },

  // Format/Field codes (FF)
  { code: "FF03", description: "Payment Type Information is missing or invalid", rails: ALL_RAILS },
  { code: "FF04", description: "Service Level code is missing or invalid", rails: ALL_RAILS },
  { code: "FF05", description: "Local Instrument code is missing or invalid", rails: ["SEPA"] },
  { code: "FF06", description: "Category Purpose code is missing or invalid", rails: ALL_RAILS },
  { code: "FF07", description: "Purpose is missing or invalid", rails: ALL_RAILS },

  // Following cancellation
  { code: "FOCR", description: "Return following a cancellation request", rails: ALL_RAILS, legacyFpsCode: "00000007" },

  // Fraud
  { code: "FR01", description: "Returned as a result of fraud", rails: ALL_RAILS },

  // Tracking
  { code: "FRTR", description: "Final response/tracking is recalled as mandate is cancelled", rails: ["SEPA"] },

  // General/Status codes
  { code: "G004", description: "Credit to creditor's account is pending, status Originator is waiting for funds provided via a cover", rails: ["SWIFT"] },

  // Mandate codes (MD) - primarily SEPA Direct Debit
  { code: "MD01", description: "No Mandate", rails: ["SEPA"], railNotes: "SEPA Direct Debit specific" },
  { code: "MD02", description: "Mandate related information data required by the scheme is missing", rails: ["SEPA"], railNotes: "SEPA Direct Debit specific" },
  { code: "MD05", description: "Creditor or creditor's agent should not have collected the direct debit", rails: ["SEPA"], railNotes: "SEPA Direct Debit specific" },
  { code: "MD06", description: "Return of funds requested by end customer", rails: ALL_RAILS },
  { code: "MD07", description: "End customer is deceased", rails: ALL_RAILS, legacyFpsCode: "00000004" },

  // Message/Reason not specified codes (MS)
  { code: "MS02", description: "Reason has not been specified by end customer", rails: ALL_RAILS, legacyFpsCode: "00000014", railNotes: "Privacy-preserving code" },
  { code: "MS03", description: "Reason has not been specified by agent", rails: ALL_RAILS, legacyFpsCode: "00000014", railNotes: "Privacy-preserving code - often used instead of AC04/AM04" },

  // Narrative
  { code: "NARR", description: "Reason is provided as narrative information in the additional reason information", rails: ALL_RAILS },

  // No response/original
  { code: "NOAS", description: "No response from Beneficiary", rails: ["SWIFT"] },
  { code: "NOCM", description: "Customer account is not compliant with regulatory requirements (e.g., FICA or other regulatory requirements rendering account inactive)", rails: ALL_RAILS },
  { code: "NOOR", description: "Original SCT never received", rails: ["SEPA"] },

  // PIN/Card
  { code: "PINL", description: "The card payment is fraudulent (lost and stolen fraud) and was processed as EMV transaction without PIN verification", rails: [] as PaymentRail[], railNotes: "Card payments only" },

  // Routing/Reference codes (RC, RF)
  { code: "RC01", description: "Bank Identifier code specified in the message has an incorrect format", rails: ALL_RAILS },
  { code: "RC03", description: "Debtor bank identifier is invalid or missing", rails: ALL_RAILS },
  { code: "RC04", description: "Creditor bank identifier is invalid or missing", rails: ALL_RAILS },
  { code: "RC07", description: "Incorrect BIC of the beneficiary Bank in the SCTR", rails: ["SEPA"] },
  { code: "RC08", description: "ClearingSystemMemberIdentifier is invalid or missing", rails: HIGH_VALUE },
  { code: "RC11", description: "Intermediary Agent is invalid or missing", rails: ["SWIFT", "CHAPS"] },
  { code: "RF01", description: "Transaction reference is not unique within the message", rails: ALL_RAILS },

  // Regulatory codes (RR)
  { code: "RR01", description: "Specification of the debtor's account or unique identification needed for regulatory requirements is insufficient or missing", rails: ALL_RAILS, railNotes: "Some SEPA countries restrict for privacy" },
  { code: "RR02", description: "Specification of the debtor's name and/or address needed for regulatory requirements is insufficient or missing", rails: ALL_RAILS, railNotes: "Some SEPA countries restrict for privacy" },
  { code: "RR03", description: "Specification of the creditor's name and/or address needed for regulatory requirements is insufficient or missing", rails: ALL_RAILS, railNotes: "Some SEPA countries restrict for privacy" },
  { code: "RR04", description: "Regulatory Reason", rails: ALL_RAILS, railNotes: "Some SEPA countries restrict for privacy" },
  { code: "RR05", description: "Regulatory or Central Bank Reporting information missing, incomplete or invalid", rails: ["SWIFT", "CHAPS"] },
  { code: "RR06", description: "Tax information missing, incomplete or invalid", rails: ["SWIFT"] },
  { code: "RR07", description: "Remittance information structure does not comply with rules for payment type", rails: ALL_RAILS },
  { code: "RR08", description: "Remittance information truncated to comply with rules for payment type", rails: ALL_RAILS },
  { code: "RR09", description: "Structured creditor reference invalid or missing", rails: ALL_RAILS },
  { code: "RR11", description: "Invalid or missing identification of a bank proprietary service", rails: ["SWIFT"] },
  { code: "RR12", description: "Invalid or missing identification required within a particular country or payment type", rails: ALL_RAILS },

  // Return following investigation
  { code: "RUTA", description: "Return following investigation request and no remediation possible", rails: ["SWIFT", "CHAPS"] },

  // Service codes (SL) - primarily SEPA Direct Debit
  { code: "SL01", description: "Due to specific service offered by the Debtor Agent", rails: ["SEPA"] },
  { code: "SL02", description: "Due to specific service offered by the Creditor Agent", rails: ["SEPA"] },
  { code: "SL11", description: "Whitelisting service: Debtor has not included the Creditor on its Whitelist", rails: ["SEPA"], railNotes: "SEPA Direct Debit whitelist service" },
  { code: "SL12", description: "Blacklisting service: Debtor included the Creditor on their Blacklist", rails: ["SEPA"], railNotes: "SEPA Direct Debit blacklist service" },
  { code: "SL13", description: "Due to Maximum allowed Direct Debit Transactions per period service", rails: ["SEPA"] },
  { code: "SL14", description: "Due to Maximum allowed Direct Debit Transaction amount service", rails: ["SEPA"] },

  // Stop payment codes (SP)
  { code: "SP01", description: "Payment is stopped by account holder", rails: ALL_RAILS, legacyFpsCode: "00000003" },
  { code: "SP02", description: "Previously stopped by means of a stop payment advise", rails: ALL_RAILS },

  // Service not rendered
  { code: "SVNR", description: "Card payment returned since cash amount was not correct or goods/service was not rendered", rails: [] as PaymentRail[], railNotes: "Card payments only" },

  // Time codes (TM)
  { code: "TM01", description: "Associated message was received after agreed processing cut-off time", rails: ALL_RAILS },

  // Tracking
  { code: "TRAC", description: "Return following direct debit being removed from tracking process", rails: ["SEPA"] },

  // Unjustified payment
  { code: "UPAY", description: "Payment is not justified", rails: ALL_RAILS },

  // Already returned
  { code: "ARDT", description: "Already returned original SCT", rails: ["SEPA"] },
];

export const iso20022Codes: ISO20022Code[] = iso20022CodesRaw.map((raw) => ({
  code: raw.code,
  description: raw.description,
  category: categorizeCode(raw.code),
  rails: raw.rails,
  legacyFpsCode: raw.legacyFpsCode,
  railNotes: raw.railNotes,
}));

// Helper functions
export function getISO20022CodeByCode(code: string): ISO20022Code | undefined {
  return iso20022Codes.find((c) => c.code.toUpperCase() === code.toUpperCase());
}

export function getISO20022CodesByCategory(category: ISO20022Category): ISO20022Code[] {
  return iso20022Codes.filter((c) => c.category === category);
}

export function getISO20022CodesByRail(rail: PaymentRail): ISO20022Code[] {
  return iso20022Codes.filter((c) => c.rails.includes(rail));
}

export function getAllISO20022Categories(): ISO20022Category[] {
  return [...new Set(iso20022Codes.map((c) => c.category))];
}

export function getAllPaymentRails(): PaymentRail[] {
  return ["SEPA", "CHAPS", "SWIFT", "FedNow", "TARGET2", "FPS-Future"];
}

export function getISO20022CodeByLegacyFps(fpsCode: string): ISO20022Code | undefined {
  return iso20022Codes.find((c) => c.legacyFpsCode === fpsCode);
}
