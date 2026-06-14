import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — FPS Error Codes",
  description:
    "Common questions about UK Faster Payments (FPS) error codes: rejects vs returns, retrying failed payments, Confirmation of Payee, and the move to ISO 20022.",
};

interface QA {
  question: string;
  /** Plain-text answer used for the FAQPage JSON-LD (kept in sync with the rendered answer). */
  answerText: string;
  /** Rendered answer, may contain internal links. Visible content matches answerText. */
  answer: React.ReactNode;
}

const faqs: QA[] = [
  {
    question: "What is an FPS error code?",
    answerText:
      "An FPS error code is a short code returned when a UK Faster Payment cannot be completed as expected. It tells the sending bank or payment service provider why a payment was rejected before it was accepted, or returned after it had been accepted. They fall into two groups based on stage: rejects (REJ) before a payment is accepted, and returns (RET) after it has been accepted.",
    answer: (
      <p>
        An FPS error code is a short code returned when a UK Faster Payment
        cannot be completed as expected. It tells the sending bank or payment
        service provider why a payment was rejected before it was accepted, or
        returned after it had been accepted. They fall into two groups based on
        stage: rejects (REJ) before a payment is accepted, and returns (RET)
        after it has been accepted.
      </p>
    ),
  },
  {
    question: "What's the difference between a REJ (reject) and a RET (return) code?",
    answerText:
      "A REJ (reject) happens before the payment is accepted: the receiving bank or the scheme refuses the message up front, so no money moves. A RET (return) happens after a payment has been accepted and settled, when the receiving bank later sends the funds back. In short, rejects are pre-acceptance and returns are post-acceptance.",
    answer: (
      <p>
        A <strong>REJ</strong> (reject) happens before the payment is accepted:
        the receiving bank or the scheme refuses the message up front, so no
        money moves. A <strong>RET</strong> (return) happens after a payment has
        been accepted and settled, when the receiving bank later sends the funds
        back. In short, rejects are pre-acceptance and returns are
        post-acceptance. You can browse both types on the{" "}
        <Link href="/codes" className="text-primary hover:underline">
          codes page
        </Link>
        .
      </p>
    ),
  },
  {
    question: "Can I retry a failed Faster Payment?",
    answerText:
      "It depends on the code's severity. Codes marked retryable usually reflect a temporary condition (such as a system timeout or a limit), so resubmitting later may succeed. Codes marked fatal indicate a problem that won't resolve on its own (such as wrong account details), so you need to fix the underlying issue before resubmitting. Each code page on this site shows whether it is fatal or retryable.",
    answer: (
      <p>
        It depends on the code&apos;s severity. Codes marked{" "}
        <strong>retryable</strong> usually reflect a temporary condition (such as
        a system timeout or a limit), so resubmitting later may succeed. Codes
        marked <strong>fatal</strong> indicate a problem that won&apos;t resolve
        on its own (such as wrong account details), so you need to fix the
        underlying issue before resubmitting. Each{" "}
        <Link href="/codes" className="text-primary hover:underline">
          code page
        </Link>{" "}
        shows whether it is fatal or retryable.
      </p>
    ),
  },
  {
    question: "Why was my payment rejected when the details look correct?",
    answerText:
      "A rejection can happen even when details look right at a glance. Common causes include a transposed digit in the account number or sort code, an account that has been closed or restricted, a beneficiary name that doesn't match the account, or a limit or fraud check at the receiving bank. The specific code returned narrows down which of these applies.",
    answer: (
      <p>
        A rejection can happen even when details look right at a glance. Common
        causes include a transposed digit in the account number or sort code, an
        account that has been closed or restricted, a beneficiary name that
        doesn&apos;t match the account, or a limit or fraud check at the
        receiving bank. The specific code returned narrows down which of these
        applies — look it up on the{" "}
        <Link href="/codes" className="text-primary hover:underline">
          codes page
        </Link>
        .
      </p>
    ),
  },
  {
    question: "Why was a payment returned days after it succeeded?",
    answerText:
      "A return can arrive after a payment has settled because some checks happen at the receiving bank only once the funds have landed. For example, the destination account may be closed, blocked, or unable to accept the credit, so the receiving bank sends the money back. The exact timing varies by bank and PSP, and is governed by scheme rules rather than a fixed deadline you can rely on.",
    answer: (
      <p>
        A return can arrive after a payment has settled because some checks
        happen at the receiving bank only once the funds have landed. For
        example, the destination account may be closed, blocked, or unable to
        accept the credit, so the receiving bank sends the money back. The exact
        timing varies by bank and PSP, and is governed by scheme rules rather
        than a fixed deadline you can rely on.
      </p>
    ),
  },
  {
    question: "How do I look up what a specific code means?",
    answerText:
      "Use the search on this site (press Cmd/Ctrl+K from anywhere) and type the code or a keyword, or browse the full list on the codes page. Each code has its own page with a plain-English explanation, common causes, a suggested customer message, and remediation steps.",
    answer: (
      <p>
        Use the search on this site (press <kbd>Cmd/Ctrl+K</kbd> from anywhere)
        and type the code or a keyword, or browse the full list on the{" "}
        <Link href="/codes" className="text-primary hover:underline">
          codes page
        </Link>
        . Each code has its own page with a plain-English explanation, common
        causes, a suggested customer message, and remediation steps.
      </p>
    ),
  },
  {
    question: "Are these codes official?",
    answerText:
      "This is an unofficial, community reference. The official FPS technical specification is restricted to scheme participants, so this site aggregates codes from publicly available bank and technology-partner documentation. See the references page for the sources behind the data.",
    answer: (
      <p>
        This is an unofficial, community reference. The official FPS technical
        specification is restricted to scheme participants, so this site
        aggregates codes from publicly available bank and technology-partner
        documentation. See the{" "}
        <Link href="/references" className="text-primary hover:underline">
          references page
        </Link>{" "}
        for the sources behind the data.
      </p>
    ),
  },
  {
    question: "How does Confirmation of Payee relate to name-mismatch codes?",
    answerText:
      "Confirmation of Payee (CoP) checks whether the beneficiary name you entered matches the name registered on the destination account before the payment is sent. When the name doesn't match, you may see a name-mismatch rejection such as code 1162. The aim is to reduce misdirected payments and certain types of fraud.",
    answer: (
      <p>
        Confirmation of Payee (CoP) checks whether the beneficiary name you
        entered matches the name registered on the destination account before
        the payment is sent. When the name doesn&apos;t match, you may see a
        name-mismatch rejection such as{" "}
        <Link
          href="/code/fps/1162"
          className="text-primary hover:underline font-mono"
        >
          1162
        </Link>
        . The aim is to reduce misdirected payments and certain types of fraud.
      </p>
    ),
  },
  {
    question: "Will these codes change under ISO 20022?",
    answerText:
      "Yes, over time. The UK is moving towards the New Payments Architecture (NPA), which uses the ISO 20022 messaging standard and its external return reason codes. The current numeric FPS codes will map to ISO 20022 codes, though exact codes and timelines vary and are still evolving. See the FPS to ISO 20022 mapping and the future codes reference for details.",
    answer: (
      <p>
        Yes, over time. The UK is moving towards the New Payments Architecture
        (NPA), which uses the ISO 20022 messaging standard and its external
        return reason codes. The current numeric FPS codes will map to ISO 20022
        codes, though exact codes and timelines vary and are still evolving. See
        the{" "}
        <Link href="/codes/mapping" className="text-primary hover:underline">
          FPS to ISO 20022 mapping
        </Link>{" "}
        and the{" "}
        <Link href="/codes/future" className="text-primary hover:underline">
          future codes reference
        </Link>{" "}
        for details.
      </p>
    ),
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerText,
      },
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
        name: "FAQ",
        item: "https://fpserrorcodes.co.uk/faq",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Common questions about UK Faster Payments error codes — what they mean,
          when you can retry, and where the standard is heading.
        </p>
      </header>

      <div className="divide-y divide-border border-t border-border">
        {faqs.map((faq) => (
          <section key={faq.question} className="py-6">
            <h2 className="text-lg font-medium mb-2">{faq.question}</h2>
            <div className="text-muted-foreground leading-relaxed [&_kbd]:rounded [&_kbd]:border [&_kbd]:border-border [&_kbd]:bg-muted [&_kbd]:px-1.5 [&_kbd]:py-0.5 [&_kbd]:text-xs [&_kbd]:font-mono">
              {faq.answer}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
