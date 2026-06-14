import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is Faster Payments (FPS)?",
  description:
    "A plain-English primer on the UK Faster Payments Scheme: what it is, who runs it (Pay.UK), the payment lifecycle, where rejects and returns happen, and the move to ISO 20022.",
};

export default function WhatIsFpsPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is Faster Payments (FPS)?",
    description:
      "A plain-English primer on the UK Faster Payments Scheme: what it is, who runs it, the payment lifecycle, and the move to ISO 20022.",
    author: {
      "@type": "Organization",
      name: "Payment Status Decoder",
    },
    publisher: {
      "@type": "Organization",
      name: "FPS Error Code Reference",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fpserrorcodes.co.uk/what-is-fps",
    },
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
        name: "What is FPS?",
        item: "https://fpserrorcodes.co.uk/what-is-fps",
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="space-y-10">
        <header>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            What is Faster Payments (FPS)?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A short primer on the UK Faster Payments Scheme — what it is, who runs
            it, how a payment flows, and where error codes come from.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            The scheme in a sentence
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The Faster Payments Scheme (FPS) is the UK system for near-instant,
            low-value sterling payments between bank accounts, available around
            the clock. It is what sits behind most everyday transfers — single
            immediate payments, standing orders, and many app-based
            &quot;send money&quot; flows.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Who runs it</h2>
          <p className="text-muted-foreground leading-relaxed">
            Faster Payments is operated by{" "}
            <strong className="text-foreground">Pay.UK</strong>, the operator of
            the UK&apos;s retail interbank payment systems. Banks, building
            societies, and fintechs (collectively payment service providers, or
            PSPs) connect to the scheme either directly or through a
            directly-connected sponsor under an agency arrangement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            The payment lifecycle
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A payment is created by the sending PSP, passed through the scheme,
            and presented to the receiving PSP, which decides whether it can
            credit the destination account. If everything checks out the funds
            settle between the banks and the payment is complete. Problems can
            surface at two distinct points, and that distinction is exactly what
            the error codes capture.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium mb-1">Reject (pre-acceptance)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A <strong>reject</strong> happens before the payment is accepted.
                The receiving bank or the scheme refuses the message up front, so
                no money moves. These are the numeric{" "}
                <span className="font-mono">REJ</span> codes.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium mb-1">Return (post-acceptance)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A <strong>return</strong> happens after a payment has been
                accepted and settled — the receiving bank later sends the funds
                back, often because the account cannot keep the credit. These are
                the <span className="font-mono">RET</span> codes.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            Who issues these codes
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Reject and return codes are produced by the receiving PSP or the
            scheme as part of normal message processing, and relayed back to the
            sending PSP so it can act and inform its customer. The official FPS
            technical specification that defines them is restricted to scheme
            participants, so this site aggregates codes from publicly available
            bank and technology-partner documentation — see the{" "}
            <Link href="/references" className="text-primary hover:underline">
              references
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            Where this is heading: ISO 20022 and the NPA
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The UK is modernising its retail interbank payments through the New
            Payments Architecture (NPA), led by Pay.UK, which adopts the global{" "}
            <strong className="text-foreground">ISO 20022</strong> messaging
            standard and its set of external return reason codes. Over time the
            current numeric FPS codes will map onto ISO 20022 codes; exact codes
            and timelines vary and are still evolving. You can explore the{" "}
            <Link href="/codes/mapping" className="text-primary hover:underline">
              FPS to ISO 20022 mapping
            </Link>{" "}
            and the{" "}
            <Link href="/codes/future" className="text-primary hover:underline">
              future codes reference
            </Link>
            .
          </p>
        </section>

        <section className="rounded-lg border border-border bg-muted/30 p-5">
          <h2 className="text-lg font-medium mb-2">Next steps</h2>
          <p className="text-muted-foreground leading-relaxed">
            Browse every code on the{" "}
            <Link href="/codes" className="text-primary hover:underline">
              codes page
            </Link>
            , or read the{" "}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>{" "}
            for quick answers on rejects, returns, and retrying payments.
          </p>
        </section>
      </article>
    </div>
  );
}
