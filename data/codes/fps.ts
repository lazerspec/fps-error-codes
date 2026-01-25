import type { ErrorCode } from "../types";

export const fpsErrorCodes: ErrorCode[] = [
  // ============================================
  // REJ CODES - Scheme Rejection Codes
  // ============================================

  // Account Category
  {
    code: "1100",
    type: "REJ",
    scheme: "FPS",
    category: "Other",
    shortDescription: "Rejected for business reasons",
    detailedExplanation:
      "The payment was rejected for unspecified business reasons. This generic code is used when the receiving bank declines the payment but doesn't provide specific details about why.",
    commonCauses: [
      "Receiving bank's internal policies blocked the payment",
      "Account restrictions or flags on the beneficiary account",
      "Compliance or fraud prevention measures triggered",
      "Bank-specific business rules not met",
    ],
    customerMessage:
      "Your payment was declined by the recipient's bank. Please contact the recipient to verify their account can receive payments.",
    remediationSteps: [
      "Verify the recipient's account details are correct",
      "Ask the recipient to contact their bank about any account restrictions",
      "Try the payment again after confirming details",
      "Consider using an alternative payment method if the issue persists",
    ],
    severity: "retryable",
    relatedCodes: ["1161", "1178"],
  },
  {
    code: "1114",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary sort code/account number unknown",
    detailedExplanation:
      "The receiving bank couldn't find an account matching the sort code and account number provided. This is the most common FPS rejection, typically caused by typos when entering payment details.",
    commonCauses: [
      "Typo in account number or sort code",
      "Customer provided old or closed account details",
      "Sort code doesn't belong to the bank expected",
      "Account number has wrong number of digits",
    ],
    customerMessage:
      "We couldn't find the account you're trying to pay. Please double-check the sort code and account number with the recipient.",
    remediationSteps: [
      "Ask the beneficiary to confirm their current account details",
      "Verify the sort code matches the bank (use a sort code checker)",
      "Ensure account number is 8 digits (pad with leading zeros if needed)",
      "Retry the payment with corrected details",
    ],
    severity: "fatal",
    relatedCodes: ["1176", "00000001"],
  },
  {
    code: "1160",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary account closed",
    detailedExplanation:
      "The account you're trying to pay has been closed by the account holder or their bank. The sort code and account number are valid, but the account no longer exists.",
    commonCauses: [
      "Recipient has closed their account",
      "Account was closed due to inactivity",
      "Bank closed the account for policy reasons",
      "Account holder switched banks",
    ],
    customerMessage:
      "The account you're trying to pay has been closed. Please contact the recipient for their new account details.",
    remediationSteps: [
      "Contact the beneficiary to obtain their new account details",
      "Verify you have the most recent payment information",
      "Update your saved payee details before retrying",
      "Confirm the new details before sending the payment",
    ],
    severity: "fatal",
    relatedCodes: ["1177", "00000002"],
  },
  {
    code: "1161",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary account stopped",
    detailedExplanation:
      "The beneficiary's account has been stopped or suspended by their bank. The account exists but cannot currently receive payments, possibly due to fraud concerns or account review.",
    commonCauses: [
      "Account suspended due to suspected fraud",
      "Account under review by the bank",
      "Temporary block placed by account holder",
      "Regulatory or compliance hold on the account",
    ],
    customerMessage:
      "The recipient's account is temporarily unable to receive payments. Please ask them to contact their bank.",
    remediationSteps: [
      "Inform the beneficiary their account may be blocked",
      "Ask them to contact their bank to resolve any account issues",
      "Wait for confirmation that the account is active before retrying",
      "Consider an alternative payment method in the meantime",
    ],
    severity: "retryable",
    relatedCodes: ["1160", "1175", "1178"],
  },
  {
    code: "1162",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary name does not match account number",
    detailedExplanation:
      "The name provided for the beneficiary doesn't match the name registered to the account. This is a Confirmation of Payee (CoP) related rejection that helps prevent misdirected payments.",
    commonCauses: [
      "Typo or variation in the beneficiary name",
      "Using a nickname instead of legal name",
      "Business name vs. trading name mismatch",
      "Name change not updated with the bank",
    ],
    customerMessage:
      "The name you entered doesn't match the account holder's name. Please verify the exact name on the recipient's account.",
    remediationSteps: [
      "Confirm the exact account holder name with the recipient",
      "Use the legal name as registered with their bank",
      "For businesses, verify whether to use registered or trading name",
      "Retry with the corrected beneficiary name",
    ],
    severity: "fatal",
    relatedCodes: ["1171", "00000006"],
  },
  {
    code: "1163",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account cannot be identified without reference",
    detailedExplanation:
      "The receiving account requires a specific reference number to identify where to credit the funds. Without this reference, the bank cannot process the payment. Common with loan repayments, utility bills, and corporate accounts.",
    commonCauses: [
      "Missing mandatory payment reference",
      "Payment to a collection account without customer reference",
      "Corporate account requires specific reference format",
      "Reference field left blank or contains invalid characters",
    ],
    customerMessage:
      "This payment requires a reference number. Please check with the recipient for the correct reference to use.",
    remediationSteps: [
      "Obtain the correct payment reference from the beneficiary",
      "Ensure the reference is entered in the correct field",
      "Check for any specific format requirements (numbers only, etc.)",
      "Retry the payment with the reference included",
    ],
    severity: "fatal",
    relatedCodes: ["1164", "00000005"],
  },
  {
    code: "1164",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Reference information is incorrect",
    detailedExplanation:
      "A payment reference was provided but it doesn't match the expected format or value. The receiving bank validated the reference and found it to be invalid for this account.",
    commonCauses: [
      "Typo in the payment reference",
      "Outdated reference number",
      "Wrong reference format (e.g., missing prefix)",
      "Reference belongs to a different account or service",
    ],
    customerMessage:
      "The payment reference you entered is incorrect. Please check the reference number and try again.",
    remediationSteps: [
      "Verify the reference number with the recipient or invoice",
      "Check for any typos or missing characters",
      "Confirm the reference format (may need specific prefixes)",
      "Retry with the correct reference",
    ],
    severity: "fatal",
    relatedCodes: ["1163", "00000005"],
  },
  {
    code: "1165",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account not in quoted currency",
    detailedExplanation:
      "The receiving account doesn't support the currency of the payment. FPS only processes GBP payments, so this typically indicates a mismatch in currency designation or an account that cannot receive sterling.",
    commonCauses: [
      "Attempting to pay a foreign currency account via FPS",
      "Account only accepts specific currencies",
      "Currency mismatch in payment instruction",
      "Account designated for non-GBP transactions only",
    ],
    customerMessage:
      "The recipient's account cannot receive payments in this currency. Please verify the account accepts GBP payments.",
    remediationSteps: [
      "Confirm the account can receive GBP payments",
      "Check if the recipient has a sterling-denominated account",
      "Use the appropriate payment channel for the currency",
      "Ask the recipient for alternative account details",
    ],
    severity: "fatal",
    relatedCodes: ["00000008"],
  },
  {
    code: "1166",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account transferred",
    detailedExplanation:
      "The account has been transferred to another bank or institution. The account number may still be valid in format but the receiving bank no longer services it.",
    commonCauses: [
      "Account holder switched banks using Current Account Switch Service",
      "Business account moved to different provider",
      "Account migrated due to bank merger or acquisition",
      "Account transferred to a different branch or entity",
    ],
    customerMessage:
      "This account has been transferred to another bank. Please contact the recipient for their updated account details.",
    remediationSteps: [
      "Contact the beneficiary for their new account details",
      "Check if the payment was automatically redirected",
      "Update your saved payee information",
      "Retry the payment to the new account",
    ],
    severity: "fatal",
    relatedCodes: ["1180", "1160"],
  },
  {
    code: "1167",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary deceased",
    detailedExplanation:
      "The account holder has been reported as deceased and the account can no longer receive payments. The account is likely frozen pending estate administration.",
    commonCauses: [
      "Account holder has passed away",
      "Account frozen by the bank for estate purposes",
      "Death notification received by the bank",
      "Account in probate process",
    ],
    customerMessage:
      "We were unable to complete this payment. Please contact the appropriate parties regarding alternative payment arrangements.",
    remediationSteps: [
      "Verify the status with relevant parties",
      "Contact the estate executor for alternative payment details",
      "If this is a recurring payment, cancel the standing instruction",
      "Seek guidance on appropriate next steps for the situation",
    ],
    severity: "fatal",
    relatedCodes: ["1160", "1161"],
  },
  {
    code: "1168",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Sending institution action required",
    detailedExplanation:
      "The receiving bank requires some action from the sending institution before the payment can be processed. This is typically a compliance or verification requirement.",
    commonCauses: [
      "Additional verification required by receiving bank",
      "Compliance check pending",
      "Inter-bank agreement issue",
      "Payment flagged for manual review",
    ],
    customerMessage:
      "There's an issue processing this payment that requires bank action. Please contact your bank for assistance.",
    remediationSteps: [
      "Contact your bank's support team",
      "Provide any additional information requested",
      "Wait for confirmation from your bank before retrying",
      "Consider alternative payment methods if urgent",
    ],
    severity: "retryable",
    relatedCodes: ["1100", "1169"],
  },
  {
    code: "1169",
    type: "REJ",
    scheme: "FPS",
    category: "Security",
    shortDescription: "Payment blocked due to beneficiary sensitivities",
    detailedExplanation:
      "The payment was blocked due to compliance, sanctions, or other sensitivity flags on the beneficiary account. This is a protective measure to prevent prohibited transactions.",
    commonCauses: [
      "Beneficiary on sanctions or watchlist",
      "Compliance flags on the receiving account",
      "Payment blocked by fraud prevention systems",
      "Regulatory restrictions on the account",
    ],
    customerMessage:
      "This payment could not be processed. Please contact your bank for more information.",
    remediationSteps: [
      "Contact your bank for more information about the block",
      "Verify the beneficiary details are correct",
      "Provide any documentation requested by your bank",
      "Consider if an alternative payment arrangement is needed",
    ],
    severity: "fatal",
    relatedCodes: ["1161", "1170"],
  },
  {
    code: "1170",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account terms do not permit credit",
    detailedExplanation:
      "The receiving account's terms and conditions prevent it from receiving this type of payment. This could be due to account type restrictions or specific rules set by the bank.",
    commonCauses: [
      "Account type doesn't accept FPS credits",
      "Savings account with credit restrictions",
      "Account set to receive only from specific sources",
      "Business account policy restrictions",
    ],
    customerMessage:
      "The recipient's account cannot receive this type of payment. Please ask them to check their account settings or provide alternative details.",
    remediationSteps: [
      "Ask the beneficiary to check their account restrictions",
      "Request alternative account details that accept payments",
      "Contact the receiving bank about account limitations",
      "Try a different payment method if FPS is not accepted",
    ],
    severity: "fatal",
    relatedCodes: ["00000010", "1161"],
  },
  {
    code: "1171",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary account name not present",
    detailedExplanation:
      "The payment was submitted without a beneficiary name, which is required by the receiving bank. All FPS payments should include the account holder's name.",
    commonCauses: [
      "Beneficiary name field left blank",
      "Integration error omitting the name field",
      "API submission without required name parameter",
      "Data mapping issue in payment processing",
    ],
    customerMessage:
      "The payment was missing the recipient's name. Please ensure you include the account holder's name and try again.",
    remediationSteps: [
      "Add the beneficiary name to the payment details",
      "Verify all required fields are populated",
      "Check your payment integration for missing fields",
      "Resubmit with complete beneficiary information",
    ],
    severity: "fatal",
    relatedCodes: ["1162"],
  },
  {
    code: "1172",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Insufficient funds available",
    detailedExplanation:
      "The sending account doesn't have sufficient available funds to complete this payment. This includes any pending transactions and overdraft limits.",
    commonCauses: [
      "Account balance is too low",
      "Pending transactions reducing available balance",
      "Overdraft limit reached",
      "Funds held for other commitments",
    ],
    customerMessage:
      "There are insufficient funds in your account for this payment. Please check your balance and try again.",
    remediationSteps: [
      "Check your current available balance",
      "Wait for pending deposits to clear",
      "Transfer funds from another account",
      "Retry after ensuring sufficient funds are available",
    ],
    severity: "retryable",
    relatedCodes: ["9940"],
  },
  {
    code: "1173",
    type: "REJ",
    scheme: "FPS",
    category: "Agency",
    shortDescription: "Sending agency sort code/account unknown",
    detailedExplanation:
      "The sending bank or agency account cannot be identified. This typically indicates an issue with the originating account details in agency banking arrangements.",
    commonCauses: [
      "Invalid sending agency details",
      "Agency banking relationship not configured",
      "Incorrect sponsor bank routing",
      "Agency account not registered with FPS",
    ],
    customerMessage:
      "There's an issue with the payment origination. Please contact your bank for assistance.",
    remediationSteps: [
      "Verify sending account configuration with your bank",
      "Check agency banking setup is correct",
      "Contact your bank's technical support",
      "Ensure FPS connectivity is properly established",
    ],
    severity: "fatal",
    relatedCodes: ["1174", "1175"],
  },
  {
    code: "1174",
    type: "REJ",
    scheme: "FPS",
    category: "Agency",
    shortDescription: "Sending agency account closed",
    detailedExplanation:
      "The sending agency account has been closed and can no longer originate payments. This affects agency banking arrangements where payments are sent on behalf of clients.",
    commonCauses: [
      "Agency banking account closed",
      "Sponsor bank relationship terminated",
      "Account decommissioned",
      "Migration to new agency account incomplete",
    ],
    customerMessage:
      "There's an issue with the payment account configuration. Please contact your bank to resolve this.",
    remediationSteps: [
      "Contact your bank about the account status",
      "Verify agency banking arrangements are active",
      "Update to new account details if migrated",
      "Ensure replacement account is properly configured",
    ],
    severity: "fatal",
    relatedCodes: ["1173", "1175"],
  },
  {
    code: "1175",
    type: "REJ",
    scheme: "FPS",
    category: "Agency",
    shortDescription: "Sending agency account stopped",
    detailedExplanation:
      "The sending agency account has been stopped or suspended. Payments cannot be originated from this account until the issue is resolved.",
    commonCauses: [
      "Agency account suspended",
      "Compliance hold on the sending account",
      "Fraud prevention measures activated",
      "Account under review",
    ],
    customerMessage:
      "Your payment account is temporarily unavailable. Please contact your bank for assistance.",
    remediationSteps: [
      "Contact your bank immediately",
      "Resolve any compliance or security issues",
      "Wait for account reinstatement",
      "Use an alternative account if available",
    ],
    severity: "retryable",
    relatedCodes: ["1173", "1174"],
  },
  {
    code: "1176",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Receiving agency sort code/account unknown",
    detailedExplanation:
      "The receiving agency bank account cannot be identified. Similar to 1114, but specifically for agency banking scenarios where the beneficiary bank routes through an intermediary.",
    commonCauses: [
      "Invalid receiving agency details",
      "Agency bank not registered for FPS",
      "Routing configuration error",
      "Sort code not associated with the expected agency",
    ],
    customerMessage:
      "We couldn't find the recipient's account. Please verify the sort code and account number.",
    remediationSteps: [
      "Verify the beneficiary account details",
      "Confirm the sort code is correct for the bank",
      "Check if the receiving bank supports FPS",
      "Contact the beneficiary for updated details",
    ],
    severity: "fatal",
    relatedCodes: ["1114", "1177"],
  },
  {
    code: "1177",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Receiving agency account closed",
    detailedExplanation:
      "The receiving agency bank account has been closed. The beneficiary may need to provide updated account details from their new banking arrangement.",
    commonCauses: [
      "Agency banking account closed",
      "Bank migrated to different infrastructure",
      "Account decommissioned",
      "Beneficiary changed banks",
    ],
    customerMessage:
      "The recipient's account has been closed. Please contact them for updated account details.",
    remediationSteps: [
      "Contact the beneficiary for new account details",
      "Verify the updated information before sending",
      "Update your saved payee details",
      "Retry with the new account information",
    ],
    severity: "fatal",
    relatedCodes: ["1160", "1176", "1178"],
  },
  {
    code: "1178",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Receiving agency account stopped",
    detailedExplanation:
      "The receiving agency account has been stopped or suspended. This may be temporary while the bank resolves an issue with the account.",
    commonCauses: [
      "Account temporarily suspended",
      "Compliance or regulatory hold",
      "Fraud investigation in progress",
      "Account under review",
    ],
    customerMessage:
      "The recipient's account is temporarily unable to receive payments. Please try again later or contact the recipient.",
    remediationSteps: [
      "Inform the beneficiary of the payment issue",
      "Ask them to contact their bank",
      "Wait for confirmation the account is active",
      "Retry the payment after the issue is resolved",
    ],
    severity: "retryable",
    relatedCodes: ["1161", "1177"],
  },
  {
    code: "1179",
    type: "REJ",
    scheme: "FPS",
    category: "Agency",
    shortDescription: "Sending agency account transferred",
    detailedExplanation:
      "The sending agency account has been transferred to another institution. Payments need to be originated from the new account or banking arrangement.",
    commonCauses: [
      "Agency bank changed sponsor",
      "Account migrated to different provider",
      "Banking infrastructure change",
      "Corporate restructuring",
    ],
    customerMessage:
      "There's been a change to your payment account. Please contact your bank to update your payment settings.",
    remediationSteps: [
      "Contact your bank about the account transfer",
      "Obtain new account details for payment origination",
      "Update your payment configuration",
      "Retry from the correct account",
    ],
    severity: "fatal",
    relatedCodes: ["1174", "1180"],
  },
  {
    code: "1180",
    type: "REJ",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Receiving account transferred",
    detailedExplanation:
      "The receiving account has been transferred to another bank. The account details may have changed or payments are being redirected to a new institution.",
    commonCauses: [
      "Beneficiary switched banks",
      "Account migrated during bank merger",
      "Current Account Switch Service used",
      "Corporate account restructuring",
    ],
    customerMessage:
      "The recipient's account has been transferred. Please contact them for their current account details.",
    remediationSteps: [
      "Contact the beneficiary for updated details",
      "Check if the payment was automatically redirected",
      "Update your saved payee information",
      "Verify new details before retrying",
    ],
    severity: "fatal",
    relatedCodes: ["1166", "1177"],
  },
  {
    code: "1181",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Duplicate FPID",
    detailedExplanation:
      "The FPS Payment ID (FPID) has already been used for another payment. Each payment must have a unique identifier. This usually indicates a system or integration issue.",
    commonCauses: [
      "Payment resubmitted with the same ID",
      "Integration generating duplicate IDs",
      "Retry logic not generating new FPID",
      "System clock or sequence number issue",
    ],
    customerMessage:
      "There was a technical issue processing your payment. Please wait a moment and try again.",
    remediationSteps: [
      "Check if the original payment was successful",
      "Ensure your system generates unique FPIDs",
      "Review payment integration logic",
      "Retry with a newly generated payment ID",
    ],
    severity: "retryable",
    relatedCodes: ["9913"],
  },

  // System Category
  {
    code: "1909",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "System malfunction - cannot qualify response",
    detailedExplanation:
      "The receiving system experienced a malfunction and cannot provide a qualified response. This is a temporary technical issue that typically resolves itself.",
    commonCauses: [
      "Receiving bank system outage",
      "Database connectivity issue",
      "Internal processing error",
      "System overload or timeout",
    ],
    customerMessage:
      "The recipient's bank is experiencing technical difficulties. Please try again in a few minutes.",
    remediationSteps: [
      "Wait a few minutes before retrying",
      "Check for any reported bank outages",
      "Retry the payment",
      "Contact support if the issue persists",
    ],
    severity: "retryable",
    relatedCodes: ["9909", "9912"],
  },
  {
    code: "1930",
    type: "REJ",
    scheme: "FPS",
    category: "Format",
    shortDescription: "Syntax error in message",
    detailedExplanation:
      "The payment message contains a syntax error and cannot be processed. This is typically a technical issue with how the payment was formatted or transmitted.",
    commonCauses: [
      "Invalid characters in payment fields",
      "Incorrect message format",
      "Missing required data elements",
      "Integration formatting error",
    ],
    customerMessage:
      "There was a technical issue with your payment. Please try again or contact support.",
    remediationSteps: [
      "Check payment details for invalid characters",
      "Verify all required fields are populated correctly",
      "Review API integration message formatting",
      "Contact technical support if the issue persists",
    ],
    severity: "fatal",
    relatedCodes: ["9930"],
  },
  {
    code: "4021",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Request timed out",
    detailedExplanation:
      "The payment request timed out before receiving a response. The payment may or may not have been processed - further investigation is needed.",
    commonCauses: [
      "Network connectivity issues",
      "Receiving bank system slow to respond",
      "High transaction volumes causing delays",
      "Infrastructure performance issues",
    ],
    customerMessage:
      "Your payment request timed out. Please check your transaction history before trying again to avoid duplicate payments.",
    remediationSteps: [
      "Check if the payment was actually processed",
      "Review transaction history for the payment",
      "Wait before retrying to avoid duplicates",
      "Contact your bank if status is unclear",
    ],
    severity: "retryable",
    relatedCodes: ["9911", "9935"],
  },
  {
    code: "4400",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Unable to accept payment",
    detailedExplanation:
      "The receiving institution is unable to accept the payment at this time. This is a general rejection that may be temporary or require further investigation.",
    commonCauses: [
      "Receiving bank not accepting FPS payments",
      "Account type not supported",
      "Technical connectivity issue",
      "Bank-specific restriction in place",
    ],
    customerMessage:
      "The recipient's bank cannot accept this payment right now. Please try again later or use an alternative method.",
    remediationSteps: [
      "Verify the receiving bank supports FPS",
      "Check for any reported issues with the bank",
      "Try again after a short wait",
      "Consider using an alternative payment method",
    ],
    severity: "retryable",
    relatedCodes: ["1100", "9912"],
  },
  {
    code: "9902",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Transaction invalid",
    detailedExplanation:
      "The transaction is invalid and cannot be processed by the FPS central infrastructure. This may be due to message format issues or invalid data.",
    commonCauses: [
      "Invalid payment data structure",
      "Message validation failed",
      "Required fields missing or malformed",
      "Business rule validation failure",
    ],
    customerMessage:
      "There was an error with your payment details. Please check and try again.",
    remediationSteps: [
      "Review all payment details for errors",
      "Check message formatting if using API",
      "Verify all required fields are present",
      "Contact technical support for detailed error",
    ],
    severity: "fatal",
    relatedCodes: ["1930", "9930"],
  },
  {
    code: "9905",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Switch does not support direct sender",
    detailedExplanation:
      "The FPS central switch doesn't have a direct connection to the sending institution. This is a configuration or connectivity issue.",
    commonCauses: [
      "Sending bank not directly connected to FPS",
      "Routing configuration error",
      "New bank not yet fully integrated",
      "Infrastructure connectivity issue",
    ],
    customerMessage:
      "There's a technical issue with the payment routing. Please contact your bank for assistance.",
    remediationSteps: [
      "Contact your bank's technical support",
      "Verify FPS connectivity status",
      "Check if alternative routing is available",
      "Wait for connectivity to be restored",
    ],
    severity: "fatal",
    relatedCodes: ["9908", "9934"],
  },
  {
    code: "9908",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Cannot determine payment routing",
    detailedExplanation:
      "The FPS infrastructure cannot determine how to route this payment. The sort code may be invalid or not registered in the FPS directory.",
    commonCauses: [
      "Sort code not in FPS directory",
      "Invalid sort code format",
      "Bank not participating in FPS",
      "Routing table configuration error",
    ],
    customerMessage:
      "We cannot route this payment. Please verify the sort code is correct and the bank accepts Faster Payments.",
    remediationSteps: [
      "Verify the sort code is correct",
      "Check if the receiving bank supports FPS",
      "Use the sort code checker to validate",
      "Consider an alternative payment method",
    ],
    severity: "fatal",
    relatedCodes: ["1114", "9905"],
  },
  {
    code: "9909",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Central infrastructure system malfunction",
    detailedExplanation:
      "The FPS central infrastructure experienced a system malfunction. This is a temporary issue with the payment scheme itself, not the sending or receiving banks.",
    commonCauses: [
      "FPS central switch outage",
      "Infrastructure maintenance",
      "System overload",
      "Technical fault at Pay.UK",
    ],
    customerMessage:
      "The Faster Payments system is temporarily unavailable. Please try again in a few minutes.",
    remediationSteps: [
      "Wait a few minutes before retrying",
      "Check for FPS service status updates",
      "Retry the payment",
      "Use an alternative payment method if urgent",
    ],
    severity: "retryable",
    relatedCodes: ["1909", "9910"],
  },
  {
    code: "9910",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Direct receiver system not logged on",
    detailedExplanation:
      "The receiving bank's system is not logged on to the FPS network. They cannot receive payments until their connection is restored.",
    commonCauses: [
      "Receiving bank system offline",
      "Scheduled maintenance window",
      "Connection failure",
      "System restart in progress",
    ],
    customerMessage:
      "The recipient's bank is temporarily offline. Please try again in a few minutes.",
    remediationSteps: [
      "Wait and retry the payment",
      "Check if the bank has reported any outages",
      "Try again during normal business hours",
      "Contact the recipient if the issue persists",
    ],
    severity: "retryable",
    relatedCodes: ["9911", "9912"],
  },
  {
    code: "9911",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Direct receiver system timed out",
    detailedExplanation:
      "The receiving bank's system didn't respond in time. The payment wasn't confirmed but may still be processing - check before retrying.",
    commonCauses: [
      "Receiving bank system slow to respond",
      "Network latency issues",
      "High transaction volume at receiver",
      "System performance degradation",
    ],
    customerMessage:
      "The recipient's bank didn't respond in time. Please check if the payment went through before trying again.",
    remediationSteps: [
      "Check your transaction history",
      "Wait before retrying to avoid duplicates",
      "Verify with the recipient if funds arrived",
      "Retry if confirmed the payment didn't process",
    ],
    severity: "retryable",
    relatedCodes: ["4021", "9910", "9912"],
  },
  {
    code: "9912",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Direct receiver system unavailable",
    detailedExplanation:
      "The receiving bank's FPS system is currently unavailable. This is typically a temporary outage that will be resolved by the receiving bank.",
    commonCauses: [
      "Receiving bank system outage",
      "Planned maintenance",
      "Infrastructure failure",
      "Connectivity issues",
    ],
    customerMessage:
      "The recipient's bank is currently unavailable. Please try again later.",
    remediationSteps: [
      "Wait and retry the payment later",
      "Check for reported bank outages",
      "Try during normal business hours",
      "Consider an alternative payment method if urgent",
    ],
    severity: "retryable",
    relatedCodes: ["9910", "9911"],
  },
  {
    code: "9913",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Duplicate FPID at central infrastructure",
    detailedExplanation:
      "The FPS Payment ID has already been used. The central infrastructure detected this as a duplicate submission. The original payment may have been processed.",
    commonCauses: [
      "Payment accidentally resubmitted",
      "System retry with same ID",
      "Integration generating duplicate IDs",
      "Recovery process resubmitting payments",
    ],
    customerMessage:
      "This appears to be a duplicate payment. Please check your transaction history before trying again.",
    remediationSteps: [
      "Check if the original payment succeeded",
      "Review transaction history",
      "Ensure unique FPID generation",
      "Retry with a new payment ID if needed",
    ],
    severity: "retryable",
    relatedCodes: ["1181"],
  },
  {
    code: "9930",
    type: "REJ",
    scheme: "FPS",
    category: "Format",
    shortDescription: "Syntax error at central infrastructure",
    detailedExplanation:
      "The FPS central infrastructure detected a syntax error in the payment message. The message format doesn't comply with FPS specifications.",
    commonCauses: [
      "Invalid message structure",
      "Unsupported characters in fields",
      "Missing mandatory elements",
      "Incorrect field lengths",
    ],
    customerMessage:
      "There was a technical error processing your payment. Please try again.",
    remediationSteps: [
      "Review payment data for invalid characters",
      "Check field lengths and formats",
      "Validate message against FPS specs",
      "Contact technical support for details",
    ],
    severity: "fatal",
    relatedCodes: ["1930", "9902"],
  },
  {
    code: "9931",
    type: "REJ",
    scheme: "FPS",
    category: "Security",
    shortDescription: "Receiving member cannot authorize credit",
    detailedExplanation:
      "The receiving bank is not authorized to receive credits via FPS. This may be due to regulatory restrictions or the bank's FPS participation status.",
    commonCauses: [
      "Receiving bank suspended from FPS",
      "Credit authorization revoked",
      "Regulatory restriction",
      "Bank not fully participating in FPS",
    ],
    customerMessage:
      "The recipient's bank cannot receive Faster Payments at this time. Please use an alternative payment method.",
    remediationSteps: [
      "Verify the bank participates in FPS",
      "Check for any reported issues",
      "Use an alternative payment method",
      "Contact the recipient for other account details",
    ],
    severity: "fatal",
    relatedCodes: ["9932", "9943"],
  },
  {
    code: "9932",
    type: "REJ",
    scheme: "FPS",
    category: "Security",
    shortDescription: "Sending member cannot authorize debit",
    detailedExplanation:
      "Your bank is not currently authorized to send payments via FPS. This is a restriction on the sending institution, not the payment details.",
    commonCauses: [
      "Sending bank FPS authorization issue",
      "Debit authorization suspended",
      "Regulatory restriction on sender",
      "Bank's FPS participation limited",
    ],
    customerMessage:
      "Your bank cannot send Faster Payments at this time. Please contact your bank or use an alternative method.",
    remediationSteps: [
      "Contact your bank for information",
      "Check if there are any restrictions on your account",
      "Use an alternative payment method",
      "Wait for the issue to be resolved",
    ],
    severity: "fatal",
    relatedCodes: ["9931", "9933"],
  },
  {
    code: "9933",
    type: "REJ",
    scheme: "FPS",
    category: "Security",
    shortDescription: "Submitting member suspended for debits",
    detailedExplanation:
      "The sending bank has been suspended from submitting debit payments to FPS. This is a scheme-level restriction affecting all payments from this institution.",
    commonCauses: [
      "Bank suspended from FPS",
      "Regulatory action against the bank",
      "Compliance issue being resolved",
      "Technical suspension during maintenance",
    ],
    customerMessage:
      "Your bank is temporarily unable to send Faster Payments. Please contact your bank or try another payment method.",
    remediationSteps: [
      "Contact your bank for more information",
      "Check for any bank communications",
      "Use an alternative payment method",
      "Wait for service to be restored",
    ],
    severity: "fatal",
    relatedCodes: ["9932", "9934"],
  },
  {
    code: "9934",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Submitting member system not logged on",
    detailedExplanation:
      "Your bank's system is not logged on to the FPS network. They cannot send payments until their connection is restored.",
    commonCauses: [
      "Sending bank system offline",
      "Scheduled maintenance",
      "Connection failure",
      "System restart in progress",
    ],
    customerMessage:
      "Your bank is temporarily offline for Faster Payments. Please try again in a few minutes.",
    remediationSteps: [
      "Wait a few minutes and retry",
      "Check for any bank communications about outages",
      "Try again during normal business hours",
      "Use an alternative payment method if urgent",
    ],
    severity: "retryable",
    relatedCodes: ["9935", "9936"],
  },
  {
    code: "9935",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Submitting member system timed out",
    detailedExplanation:
      "Your bank's system timed out during payment submission. The payment status is uncertain - check before retrying to avoid duplicates.",
    commonCauses: [
      "Bank system slow to respond",
      "Network latency",
      "High transaction volume",
      "System performance issues",
    ],
    customerMessage:
      "Your payment request timed out. Please check your transactions before trying again.",
    remediationSteps: [
      "Check your transaction history first",
      "Verify if the payment was sent",
      "Wait before retrying",
      "Contact your bank if status is unclear",
    ],
    severity: "retryable",
    relatedCodes: ["4021", "9934", "9936"],
  },
  {
    code: "9936",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Submitting member system unavailable",
    detailedExplanation:
      "Your bank's FPS system is currently unavailable. Payments cannot be sent until the service is restored.",
    commonCauses: [
      "Bank system outage",
      "Planned maintenance",
      "Infrastructure failure",
      "Connectivity issues",
    ],
    customerMessage:
      "Your bank's Faster Payments service is temporarily unavailable. Please try again later.",
    remediationSteps: [
      "Wait and try again later",
      "Check for bank service announcements",
      "Try during normal business hours",
      "Use an alternative payment method if urgent",
    ],
    severity: "retryable",
    relatedCodes: ["9934", "9935"],
  },

  // Limits Category
  {
    code: "9940",
    type: "REJ",
    scheme: "FPS",
    category: "Limits",
    shortDescription: "Payment exceeds settlement transaction limit",
    detailedExplanation:
      "The payment amount exceeds the settlement transaction limit set by FPS or the participating banks. The standard FPS limit is generally £1 million per transaction.",
    commonCauses: [
      "Payment exceeds £1 million FPS limit",
      "Bank has set lower transaction limits",
      "Account-specific limits applied",
      "Time-based limits exceeded",
    ],
    customerMessage:
      "This payment exceeds the maximum amount allowed for Faster Payments. Please use CHAPS for large value payments.",
    remediationSteps: [
      "Check the FPS transaction limit (typically £1m)",
      "Verify your bank's specific limits",
      "Use CHAPS for payments over the limit",
      "Split into multiple smaller payments if appropriate",
    ],
    severity: "fatal",
    relatedCodes: ["9941", "9942"],
  },
  {
    code: "9941",
    type: "REJ",
    scheme: "FPS",
    category: "Limits",
    shortDescription: "Payment exceeds security transaction limit",
    detailedExplanation:
      "The payment exceeds security limits set for fraud prevention. This could be your bank's security limit or a scheme-wide security threshold.",
    commonCauses: [
      "Payment triggers fraud prevention limits",
      "Unusual payment pattern detected",
      "Security limit set on account",
      "New payee with high first payment",
    ],
    customerMessage:
      "This payment exceeds your security limit. Please contact your bank to authorize larger payments.",
    remediationSteps: [
      "Contact your bank to discuss the limit",
      "Complete additional security verification",
      "Request a temporary limit increase",
      "Split into smaller transactions if permitted",
    ],
    severity: "retryable",
    relatedCodes: ["9940", "9942"],
  },
  {
    code: "9942",
    type: "REJ",
    scheme: "FPS",
    category: "Limits",
    shortDescription: "Payment breaches settlement risk position cap",
    detailedExplanation:
      "The payment would cause the bank to exceed its settlement risk position cap with FPS. This is a bank-level limit, not specific to your account.",
    commonCauses: [
      "Bank approaching daily settlement limit",
      "High volume of outbound payments",
      "Risk management threshold reached",
      "End of day settlement position issue",
    ],
    customerMessage:
      "Your bank cannot process this payment right now due to system limits. Please try again later.",
    remediationSteps: [
      "Wait and try again later",
      "Try early in the banking day",
      "Contact your bank if urgent",
      "Use an alternative payment method",
    ],
    severity: "retryable",
    relatedCodes: ["9940", "9943"],
  },
  {
    code: "9943",
    type: "REJ",
    scheme: "FPS",
    category: "Security",
    shortDescription: "Receiving member suspended for credits",
    detailedExplanation:
      "The receiving bank has been suspended from receiving credit payments via FPS. This is a scheme-level restriction affecting all payments to accounts at this bank.",
    commonCauses: [
      "Receiving bank suspended",
      "Regulatory action",
      "Compliance issue",
      "Settlement issues",
    ],
    customerMessage:
      "The recipient's bank cannot receive Faster Payments at this time. Please use an alternative payment method.",
    remediationSteps: [
      "Check for news about the receiving bank",
      "Use an alternative payment method",
      "Contact the recipient for other account details",
      "Wait for the suspension to be lifted",
    ],
    severity: "fatal",
    relatedCodes: ["9931", "9933"],
  },
  {
    code: "9944",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Service suspended (soft failure)",
    detailedExplanation:
      "The Faster Payments Service is temporarily suspended. This is a 'soft failure' indicating a temporary condition rather than a permanent error.",
    commonCauses: [
      "Scheduled maintenance",
      "Temporary service suspension",
      "System throttle active",
    ],
    customerMessage:
      "The service is temporarily unavailable. Please try again later.",
    remediationSteps: [
      "Wait and retry the payment",
      "Check for service status updates",
    ],
    severity: "retryable",
    relatedCodes: ["9945", "9909"],
  },
  {
    code: "9945",
    type: "REJ",
    scheme: "FPS",
    category: "System",
    shortDescription: "Service suspended (soft failure)",
    detailedExplanation:
      "The Faster Payments Service is temporarily suspended. Similar to 9944, this indicates a temporary availability issue.",
    commonCauses: [
      "Scheduled maintenance",
      "Temporary service suspension",
      "System throttle active",
    ],
    customerMessage:
      "The service is temporarily unavailable. Please try again later.",
    remediationSteps: [
      "Wait and retry the payment",
      "Check for service status updates",
    ],
    severity: "retryable",
    relatedCodes: ["9944", "9909"],
  },
  {
    code: "9950",
    type: "REJ",
    scheme: "FPS",
    category: "Format",
    shortDescription: "Illegal sort code for sender",
    detailedExplanation:
      "The sending sort code is not valid for FPS transactions. The sort code may be reserved, inactive, or not registered for Faster Payments.",
    commonCauses: [
      "Invalid sending sort code",
      "Sort code not registered for FPS",
      "Using test/reserved sort code",
      "Configuration error",
    ],
    customerMessage:
      "There's an issue with your account configuration. Please contact your bank.",
    remediationSteps: [
      "Verify your account is FPS-enabled",
      "Contact your bank about the sort code",
      "Check if using the correct account",
      "Request technical support investigate",
    ],
    severity: "fatal",
    relatedCodes: ["9905", "9932"],
  },

  // ============================================
  // RET CODES - Bank Return Codes
  // ============================================
  {
    code: "00000001",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Invalid sort code/account number combination",
    detailedExplanation:
      "The payment was initially accepted but later returned because the sort code and account number combination is invalid. This differs from REJ code 1114 as the payment was processed before being returned.",
    commonCauses: [
      "Account details were valid format but don't exist",
      "Delayed validation by receiving bank",
      "Account number recently changed",
      "Sort code reassignment",
    ],
    customerMessage:
      "Your payment was returned because the account details are invalid. Please verify the sort code and account number with the recipient.",
    remediationSteps: [
      "Confirm account details with the recipient",
      "Verify sort code matches the bank",
      "Ensure account number is 8 digits",
      "Resend with verified details",
    ],
    severity: "fatal",
    relatedCodes: ["1114", "1176"],
  },
  {
    code: "00000002",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary account closed",
    detailedExplanation:
      "The payment was accepted but returned because the beneficiary account has been closed. The account existed when the payment was sent but is no longer active.",
    commonCauses: [
      "Account closed after payment sent",
      "Account recently closed by holder",
      "Bank closed the account",
      "Account migration incomplete",
    ],
    customerMessage:
      "Your payment was returned because the recipient's account has been closed. Please contact them for current account details.",
    remediationSteps: [
      "Contact the beneficiary for new details",
      "Update your saved payee information",
      "Verify new account before resending",
      "Check if any redirect is in place",
    ],
    severity: "fatal",
    relatedCodes: ["1160", "1177"],
  },
  {
    code: "00000003",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Creditor account stopped",
    detailedExplanation:
      "The payment was returned because the beneficiary's account has been stopped or frozen. This typically occurs when the bank has placed restrictions on the account preventing it from receiving funds.",
    commonCauses: [
      "Account frozen due to suspicious activity",
      "Court order or legal hold on account",
      "Account holder requested account stop",
      "Bank-initiated account restriction",
    ],
    customerMessage:
      "Your payment was returned because the recipient's account has been stopped. Please contact the recipient to resolve any issues with their account.",
    remediationSteps: [
      "Contact the recipient about their account status",
      "Ask if they have an alternative account",
      "Wait for account restrictions to be lifted",
      "Retry once recipient confirms account is active",
    ],
    severity: "fatal",
    relatedCodes: ["00000002", "1160"],
  },
  {
    code: "00000004",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Creditor deceased",
    detailedExplanation:
      "The payment was returned because the beneficiary (account holder) is deceased. The receiving bank has flagged the account as belonging to a deceased person and cannot accept further credits.",
    commonCauses: [
      "Account holder has passed away",
      "Estate administration in progress",
      "Account flagged by deceased notification",
      "Probate proceedings ongoing",
    ],
    customerMessage:
      "Your payment was returned because the account holder is deceased. Please contact the recipient's estate or next of kin for alternative payment arrangements.",
    remediationSteps: [
      "Verify the intended recipient's status",
      "Contact executor or estate administrator",
      "Obtain details of estate account if applicable",
      "Redirect payment to appropriate party",
    ],
    severity: "fatal",
    relatedCodes: ["00000002", "00000003"],
  },
  {
    code: "00000005",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account unidentifiable without reference",
    detailedExplanation:
      "The payment was returned because the receiving bank couldn't identify which account to credit without a specific payment reference. Some accounts require references to route funds correctly.",
    commonCauses: [
      "Missing payment reference",
      "Collection account requires reference",
      "Corporate account needs customer ID",
      "Reference-dependent routing",
    ],
    customerMessage:
      "Your payment was returned because a reference is required. Please get the correct reference from the recipient and try again.",
    remediationSteps: [
      "Obtain the required reference from the recipient",
      "Ensure reference is in the correct format",
      "Enter reference in the correct field",
      "Resend with the reference included",
    ],
    severity: "fatal",
    relatedCodes: ["1163", "1164"],
  },
  {
    code: "00000006",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Beneficiary name does not match account",
    detailedExplanation:
      "The payment was returned because the beneficiary name provided doesn't match the name on the account. This is a Confirmation of Payee related return.",
    commonCauses: [
      "Name mismatch with account holder",
      "Business vs personal name used",
      "Spelling variation or typo",
      "Name change not updated",
    ],
    customerMessage:
      "Your payment was returned because the name didn't match the account. Please confirm the exact account holder name with the recipient.",
    remediationSteps: [
      "Get the exact account holder name",
      "Use the legal name on the account",
      "For businesses, verify registered name",
      "Resend with the correct name",
    ],
    severity: "fatal",
    relatedCodes: ["1162", "1171"],
  },
  {
    code: "00000007",
    type: "RET",
    scheme: "FPS",
    category: "Other",
    shortDescription: "Returned at sender's request",
    detailedExplanation:
      "The payment was returned at the request of the original sender. This occurs when a recall request was submitted and the receiving bank agreed to return the funds.",
    commonCauses: [
      "Sender requested recall",
      "Payment sent in error",
      "Duplicate payment identified",
      "Fraud investigation recall",
    ],
    customerMessage:
      "Your payment was returned as requested. The funds will be credited back to your account.",
    remediationSteps: [
      "Verify the return was expected",
      "Check funds have been credited back",
      "If unexpected, contact your bank",
      "Resend payment if still needed",
    ],
    severity: "fatal",
    relatedCodes: ["00000009"],
  },
  {
    code: "00000008",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account not in quoted currency",
    detailedExplanation:
      "The payment was returned because the receiving account doesn't accept payments in the currency sent. FPS only processes GBP, but the account may not accept sterling.",
    commonCauses: [
      "Account only accepts foreign currency",
      "GBP payments not enabled",
      "Multi-currency account configuration",
      "Account currency mismatch",
    ],
    customerMessage:
      "Your payment was returned because the account doesn't accept GBP. Please check with the recipient for a sterling account.",
    remediationSteps: [
      "Confirm the account accepts GBP",
      "Request alternative sterling account details",
      "Check if currency conversion is needed",
      "Use appropriate payment method for currency",
    ],
    severity: "fatal",
    relatedCodes: ["1165"],
  },
  {
    code: "00000009",
    type: "RET",
    scheme: "FPS",
    category: "Other",
    shortDescription: "Recipient requested payment return",
    detailedExplanation:
      "The payment was returned because the recipient instructed their bank to return it. This is a voluntary return initiated by the beneficiary.",
    commonCauses: [
      "Recipient refused the payment",
      "Payment received in error",
      "Dispute about the payment",
      "Recipient requested refund",
    ],
    customerMessage:
      "The recipient has returned your payment. Please contact them if you need to understand why.",
    remediationSteps: [
      "Contact the recipient to understand the return",
      "Resolve any disputes or issues",
      "Verify the payment was intended for them",
      "Arrange alternative payment if agreed",
    ],
    severity: "fatal",
    relatedCodes: ["00000007"],
  },
  {
    code: "00000010",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account terms prohibit crediting these funds",
    detailedExplanation:
      "The payment was returned because the receiving account's terms and conditions don't allow this type of credit. The account exists but has restrictions on incoming payments.",
    commonCauses: [
      "Account type restrictions",
      "Only accepts payments from specific sources",
      "Business account policy",
      "Savings account limitations",
    ],
    customerMessage:
      "Your payment was returned because the account cannot receive this type of payment. Please ask the recipient for alternative account details.",
    remediationSteps: [
      "Ask recipient about account restrictions",
      "Request alternative account for payments",
      "Check if payment method needs to change",
      "Resend to a different account if provided",
    ],
    severity: "fatal",
    relatedCodes: ["1170"],
  },
  {
    code: "00000011",
    type: "RET",
    scheme: "FPS",
    category: "Other",
    shortDescription: "Sending institution action required",
    detailedExplanation:
      "The payment was returned because action is required from the sending institution (your bank). This typically indicates a problem that needs to be resolved by the originating bank before the payment can be processed.",
    commonCauses: [
      "Technical issue at sending bank",
      "Compliance verification needed",
      "Additional authentication required",
      "Sending bank needs to update payment details",
    ],
    customerMessage:
      "Your payment was returned and requires action from your bank. Please contact your bank for assistance.",
    remediationSteps: [
      "Contact your bank's support team",
      "Ask what action is required to complete the payment",
      "Provide any additional information requested",
      "Retry the payment once resolved",
    ],
    severity: "retryable",
    relatedCodes: ["1100", "1161"],
  },
  {
    code: "00000012",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Account transferred to another bank",
    detailedExplanation:
      "The payment was returned because the account has been transferred to another financial institution. The recipient may have switched banks.",
    commonCauses: [
      "Account holder switched banks",
      "Current Account Switch Service used",
      "Bank merger or acquisition",
      "Account migrated to new provider",
    ],
    customerMessage:
      "Your payment was returned because the account has moved to another bank. Please get the recipient's new account details.",
    remediationSteps: [
      "Contact recipient for new details",
      "Check if redirect should have applied",
      "Update saved payee information",
      "Resend to the new account",
    ],
    severity: "fatal",
    relatedCodes: ["1166", "1180"],
  },
  {
    code: "00000013",
    type: "RET",
    scheme: "FPS",
    category: "Account",
    shortDescription: "Creditor sensitivities - possible bankruptcy",
    detailedExplanation:
      "The payment was returned because it cannot be applied due to creditor sensitivities, such as possible bankruptcy or insolvency proceedings. The receiving bank has restrictions on credits to this account.",
    commonCauses: [
      "Bankruptcy proceedings in progress",
      "Individual Voluntary Arrangement (IVA) in place",
      "Debt Relief Order active",
      "Insolvency administration",
    ],
    customerMessage:
      "Your payment was returned due to restrictions on the recipient's account. Please contact the recipient or their appointed administrator.",
    remediationSteps: [
      "Contact the recipient about their account status",
      "Check if an insolvency practitioner is appointed",
      "Redirect payment to administrator if required",
      "Seek alternative payment arrangements",
    ],
    severity: "fatal",
    relatedCodes: ["00000003", "00000004"],
  },
  {
    code: "00000014",
    type: "RET",
    scheme: "FPS",
    category: "Other",
    shortDescription: "Reason not given",
    detailedExplanation:
      "The payment was returned by the receiving bank but no specific reason was provided. This is a generic return code used when the bank does not disclose the reason for the return.",
    commonCauses: [
      "Bank policy not to disclose reason",
      "Internal bank decision",
      "Reason code not captured",
      "Manual return without specific code",
    ],
    customerMessage:
      "Your payment was returned by the recipient's bank. No specific reason was provided. Please contact the recipient to verify their account status.",
    remediationSteps: [
      "Contact the recipient about the return",
      "Ask recipient to check with their bank",
      "Verify all payment details are correct",
      "Retry after confirming account status",
    ],
    severity: "retryable",
    relatedCodes: ["1100", "00000011"],
  },
];
