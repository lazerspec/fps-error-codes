import Link from "next/link";

export default function ReferencesPage() {
  const sources = [
    {
      name: "LHV Connect - Faster Payments Reject & Return Codes",
      description: "The most comprehensive public list of FPS numeric (REJ) and string (RET) codes, updated for 2025/2026.",
      url: "https://lhv.com/en/connect/faster-payments-rejection-codes",
    },
    {
      name: "ClearBank Developer Portal",
      description: "Detailed webhook and status documentation for UK Faster Payments, mapping scheme responses to actionable states.",
      url: "https://clearbank.github.io/docs/faster-payments",
    },
    {
      name: "Starling Bank API Reference",
      description: "Provides numeric scheme codes used in their sandbox environment to simulate payment rejections.",
      url: "https://developer.starlingbank.com/docs#domestic-payments",
    },
    {
      name: "Form3 Technical Documentation",
      description: "Outlines the implementation of UK Faster Payments returns and rejections following Pay.UK / ISO 20022 standards.",
      url: "https://www.api-docs.form3.tech/api/schemes/fps-direct/",
    },
    {
      name: "Pay.UK - Faster Payments Service Principles",
      description: "The official high-level governing document for the Faster Payments Service in the UK.",
      url: "https://www.wearepay.uk/what-we-do/payment-systems/faster-payment-system/",
    },
  ];

  return (
    <div className="container py-12 px-4 max-w-4xl mx-auto">
      <header className="mb-12">
        <Link 
          href="/" 
          className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
        >
          ← Back to Search
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Authoritative Sources</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Since the official &quot;FPS Procedures and Technical Specifications&quot; document is restricted to scheme participants,
          this project aggregates data from publicly available documentation provided by directly-connected settlement banks
          and technology partners.
        </p>
      </header>

      <div className="grid gap-8">
        {sources.map((source) => (
          <section 
            key={source.url} 
            className="p-6 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                {source.name}
                <svg 
                  className="w-4 h-4 text-muted-foreground" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {source.description}
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <code className="text-xs text-muted-foreground break-all">
                {source.url}
              </code>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 p-8 rounded-lg bg-muted/50 border border-border">
        <h3 className="text-lg font-semibold mb-2">Data Integrity Notice</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This project aims to be the most reliable third-party reference for UK Faster Payments error codes. 
          If you find a discrepancy or a newer code from an official source, please contribute to the project repository.
        </p>
      </footer>
    </div>
  );
}
