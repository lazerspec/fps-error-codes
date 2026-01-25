import type { MetadataRoute } from "next";
import { allErrorCodes } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fps-error-codes.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/codes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic code pages
  const codePages: MetadataRoute.Sitemap = allErrorCodes.map((code) => ({
    url: `${baseUrl}/code/${code.scheme.toLowerCase()}/${code.code}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...codePages];
}
