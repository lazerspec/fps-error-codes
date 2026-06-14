import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossary — UK Payments Terms",
  description:
    "Plain-English definitions of UK Faster Payments terminology: sort code, BIC, IBAN, Confirmation of Payee, REJ/RET, ISO 20022, PSP, NPA and more.",
};

interface Term {
  term: string;
  /** Plain-text definition used for JSON-LD (kept in sync with the rendered definition). */
  definitionText: string;
  /** Rendered definition, may contain internal links. Visible content matches definitionText. */
  definition: React.ReactNode;
}

const terms: Term[] = [
  {
    term: "FPS (Faster Payments Scheme)",
    definitionText:
      "The UK scheme for near-instant, low-value sterling payments between bank accounts, available around the clock. It underpins most everyday push payments such as standing orders and single immediate transfers.",
    definition: (
      <>
        The UK scheme for near-instant, low-value sterling payments between bank
        accounts, available around the clock. It underpins most everyday push
        payments such as standing orders and single immediate transfers.
      </>
    ),
  },
  {
    term: "Pay.UK",
    definitionText:
      "The operator responsible for the UK's retail interbank payment systems, including Faster Payments. Pay.UK also leads the move to the New Payments Architecture.",
    definition: (
      <>
        The operator responsible for the UK&apos;s retail interbank payment
        systems, including Faster Payments. Pay.UK also leads the move to the New
        Payments Architecture.
      </>
    ),
  },
  {
    term: "Sort code",
    definitionText:
      "A six-digit number that identifies the bank and branch holding a UK account. Combined with the account number, it routes a payment to the correct institution.",
    definition: (
      <>
        A six-digit number that identifies the bank and branch holding a UK
        account. Combined with the account number, it routes a payment to the
        correct institution.
      </>
    ),
  },
  {
    term: "Account number",
    definitionText:
      "The (usually eight-digit) number identifying a specific account within a bank. Shorter numbers are sometimes padded with leading zeros to reach eight digits.",
    definition: (
      <>
        The (usually eight-digit) number identifying a specific account within a
        bank. Shorter numbers are sometimes padded with leading zeros to reach
        eight digits.
      </>
    ),
  },
  {
    term: "Beneficiary",
    definitionText:
      "The party receiving a payment — the account being credited. Many error codes describe a problem with the beneficiary's details or account.",
    definition: (
      <>
        The party receiving a payment — the account being credited. Many error
        codes describe a problem with the beneficiary&apos;s details or account.
      </>
    ),
  },
  {
    term: "Remitter",
    definitionText:
      "The party sending a payment — the account being debited. Also referred to as the originator or payer.",
    definition: (
      <>
        The party sending a payment — the account being debited. Also referred to
        as the originator or payer.
      </>
    ),
  },
  {
    term: "BIC",
    definitionText:
      "Bank Identifier Code (or SWIFT code), an internationally recognised code that identifies a financial institution. It is used mainly for cross-border payments rather than domestic UK transfers.",
    definition: (
      <>
        Bank Identifier Code (or SWIFT code), an internationally recognised code
        that identifies a financial institution. It is used mainly for
        cross-border payments rather than domestic UK transfers.
      </>
    ),
  },
  {
    term: "IBAN",
    definitionText:
      "International Bank Account Number, a standardised format for identifying an account across borders. UK domestic Faster Payments typically use a sort code and account number instead.",
    definition: (
      <>
        International Bank Account Number, a standardised format for identifying
        an account across borders. UK domestic Faster Payments typically use a
        sort code and account number instead.
      </>
    ),
  },
  {
    term: "REJ (reject)",
    definitionText:
      "A payment refused before it is accepted, so no funds move. Rejects happen up front, at the receiving bank or the scheme, before settlement.",
    definition: (
      <>
        A payment refused before it is accepted, so no funds move. Rejects happen
        up front, at the receiving bank or the scheme, before settlement. Browse
        reject codes on the{" "}
        <Link href="/codes" className="text-primary hover:underline">
          codes page
        </Link>
        .
      </>
    ),
  },
  {
    term: "RET (return)",
    definitionText:
      "A payment sent back after it has been accepted and settled. Returns are post-acceptance, typically because the receiving account cannot keep the credit.",
    definition: (
      <>
        A payment sent back after it has been accepted and settled. Returns are
        post-acceptance, typically because the receiving account cannot keep the
        credit. Browse return codes on the{" "}
        <Link href="/codes" className="text-primary hover:underline">
          codes page
        </Link>
        .
      </>
    ),
  },
  {
    term: "Confirmation of Payee (CoP)",
    definitionText:
      "A name-checking service that verifies whether the beneficiary name matches the name on the destination account before a payment is sent. It helps reduce misdirected payments and certain types of fraud.",
    definition: (
      <>
        A name-checking service that verifies whether the beneficiary name matches
        the name on the destination account before a payment is sent. It helps
        reduce misdirected payments and certain types of fraud, and is linked to
        name-mismatch codes such as{" "}
        <Link
          href="/code/fps/1162"
          className="text-primary hover:underline font-mono"
        >
          1162
        </Link>
        .
      </>
    ),
  },
  {
    term: "New Payments Architecture (NPA)",
    definitionText:
      "The UK's programme to modernise its retail interbank payments infrastructure, led by Pay.UK. It adopts the ISO 20022 messaging standard for richer, structured payment data.",
    definition: (
      <>
        The UK&apos;s programme to modernise its retail interbank payments
        infrastructure, led by Pay.UK. It adopts the ISO 20022 messaging standard
        for richer, structured payment data. See where codes are heading on the{" "}
        <Link href="/codes/future" className="text-primary hover:underline">
          future codes page
        </Link>
        .
      </>
    ),
  },
  {
    term: "ISO 20022",
    definitionText:
      "A global standard for electronic financial messaging that carries richer, structured data than older formats. UK payments are gradually adopting it, including a standardised set of external return reason codes.",
    definition: (
      <>
        A global standard for electronic financial messaging that carries richer,
        structured data than older formats. UK payments are gradually adopting it,
        including a standardised set of external return reason codes — see the{" "}
        <Link href="/codes/future" className="text-primary hover:underline">
          future codes page
        </Link>
        .
      </>
    ),
  },
  {
    term: "Settlement",
    definitionText:
      "The point at which the funds actually move between the banks involved, completing the obligation created by a payment. A reject occurs before settlement; a return occurs after it.",
    definition: (
      <>
        The point at which the funds actually move between the banks involved,
        completing the obligation created by a payment. A reject occurs before
        settlement; a return occurs after it.
      </>
    ),
  },
  {
    term: "Return reason code",
    definitionText:
      "A code that explains why a previously accepted payment was sent back. Under ISO 20022 these are drawn from a standardised external code list.",
    definition: (
      <>
        A code that explains why a previously accepted payment was sent back.
        Under ISO 20022 these are drawn from a standardised external code list.
      </>
    ),
  },
  {
    term: "Fatal vs retryable",
    definitionText:
      "A way of classifying error codes by whether resubmitting can help. Fatal codes need the underlying problem fixed first; retryable codes reflect a temporary condition that may clear on a later attempt.",
    definition: (
      <>
        A way of classifying error codes by whether resubmitting can help. Fatal
        codes need the underlying problem fixed first; retryable codes reflect a
        temporary condition that may clear on a later attempt. Each{" "}
        <Link href="/codes" className="text-primary hover:underline">
          code page
        </Link>{" "}
        states which it is.
      </>
    ),
  },
  {
    term: "PSP (payment service provider)",
    definitionText:
      "An organisation that provides payment services, such as a bank, building society, or fintech. PSPs send and receive Faster Payments on behalf of their customers.",
    definition: (
      <>
        An organisation that provides payment services, such as a bank, building
        society, or fintech. PSPs send and receive Faster Payments on behalf of
        their customers.
      </>
    ),
  },
  {
    term: "Agency / indirect access",
    definitionText:
      "An arrangement where a PSP reaches Faster Payments through another directly-connected institution (a sponsor or agency bank) rather than connecting to the scheme itself. Some error codes relate specifically to agency routing.",
    definition: (
      <>
        An arrangement where a PSP reaches Faster Payments through another
        directly-connected institution (a sponsor or agency bank) rather than
        connecting to the scheme itself. Some error codes relate specifically to
        agency routing.
      </>
    ),
  },
];

export default function GlossaryPage() {
  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "UK Faster Payments Glossary",
    description:
      "Plain-English definitions of UK Faster Payments terminology and error-code concepts.",
    url: "https://fpserrorcodes.co.uk/glossary",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definitionText,
    })),
  };

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
        name: "Glossary",
        item: "https://fpserrorcodes.co.uk/glossary",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          Glossary
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A quick reference for the UK payments terms you&apos;ll meet across this
          site.
        </p>
      </header>

      <dl className="divide-y divide-border border-t border-border">
        {terms.map((t) => (
          <div key={t.term} className="py-5 sm:grid sm:grid-cols-3 sm:gap-6">
            <dt className="font-medium mb-1 sm:mb-0">{t.term}</dt>
            <dd className="text-muted-foreground leading-relaxed sm:col-span-2">
              {t.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
