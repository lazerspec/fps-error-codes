import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCodeBySlug, getCodesByScheme } from "@/data";
import { CodeDetail } from "@/components/CodeDetail";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  const codes = getCodesByScheme("fps");
  return codes.map((code) => ({
    code: code.code,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code: codeParam } = await params;
  const code = getCodeBySlug("fps", codeParam);

  if (!code) {
    return {
      title: "Code Not Found",
    };
  }

  const title = `FPS Error ${code.code}: ${code.shortDescription}`;
  const description = code.detailedExplanation.slice(0, 155);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CodePage({ params }: PageProps) {
  const { code: codeParam } = await params;
  const code = getCodeBySlug("fps", codeParam);

  if (!code) {
    notFound();
  }

  const verifiedDate = new Date(code.lastVerified).toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `FPS Error ${code.code}: ${code.shortDescription}`,
    description: code.detailedExplanation,
    author: {
      "@type": "Organization",
      name: "Payment Status Decoder",
    },
    datePublished: verifiedDate,
    dateModified: verifiedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://fpserrorcodes.co.uk/code/fps/${code.code}`,
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
        name: "Codes",
        item: "https://fpserrorcodes.co.uk/codes",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "FPS",
        item: "https://fpserrorcodes.co.uk/codes?scheme=fps",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: code.code,
        item: `https://fpserrorcodes.co.uk/code/fps/${code.code}`,
      },
    ],
  };

  return (
    <div className="px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CodeDetail code={code} />
    </div>
  );
}
