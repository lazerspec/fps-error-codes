import { fpsErrorCodes } from "./codes/fps";
import {
  iso20022Codes,
  getISO20022CodeByCode,
  getISO20022CodesByCategory,
  getISO20022CodesByRail,
  getAllISO20022Categories,
  getAllPaymentRails,
  getISO20022CodeByLegacyFps,
} from "./codes/iso20022";
import {
  codeMappings,
  getMappingByFpsCode,
  getMappingsByISO20022Code,
  getExactMappings,
  getApproximateMappings,
} from "./codes/mapping";
import type { ErrorCode, SearchEntry } from "./types";

export * from "./types";

// Re-export ISO 20022 codes and helpers
export {
  iso20022Codes,
  getISO20022CodeByCode,
  getISO20022CodesByCategory,
  getISO20022CodesByRail,
  getAllISO20022Categories,
  getAllPaymentRails,
  getISO20022CodeByLegacyFps,
};

// Re-export code mappings
export {
  codeMappings,
  getMappingByFpsCode,
  getMappingsByISO20022Code,
  getExactMappings,
  getApproximateMappings,
};
export type { CodeMapping } from "./codes/mapping";

export const allErrorCodes: ErrorCode[] = [...fpsErrorCodes];

export function getCodeBySlug(
  scheme: string,
  code: string
): ErrorCode | undefined {
  return allErrorCodes.find(
    (c) => c.scheme.toLowerCase() === scheme.toLowerCase() && c.code === code
  );
}

export function getCodesByScheme(scheme: string): ErrorCode[] {
  return allErrorCodes.filter(
    (c) => c.scheme.toLowerCase() === scheme.toLowerCase()
  );
}

export function getCodesByCategory(category: string): ErrorCode[] {
  return allErrorCodes.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase()
  );
}

export function getCodesByType(type: "REJ" | "RET"): ErrorCode[] {
  return allErrorCodes.filter((c) => c.type === type);
}

export function getAllCategories(): string[] {
  return [...new Set(allErrorCodes.map((c) => c.category))];
}

/**
 * Unified, searchable index across FPS codes and ISO 20022 codes.
 * FPS entries deep-link to their detail page; ISO entries deep-link to the
 * ISO 20022 table (/codes/future) with a ?code= param for scroll + highlight.
 * crossRef surfaces the first FPS<->ISO mapping for quick context.
 */
export function getSearchIndex(): SearchEntry[] {
  const isoCodeAsString = (code: string | string[]): string[] =>
    Array.isArray(code) ? code : [code];

  const fpsEntries: SearchEntry[] = fpsErrorCodes.map((c) => {
    const mapping = getMappingByFpsCode(c.code);
    const isoCodes = mapping ? isoCodeAsString(mapping.iso20022Code) : [];
    return {
      kind: "fps" as const,
      code: c.code,
      title: c.shortDescription,
      category: c.category,
      type: c.type,
      severity: c.severity,
      href: `/code/fps/${c.code}`,
      crossRef: isoCodes.length > 0 ? `↔ ${isoCodes[0]}` : undefined,
    };
  });

  const isoEntries: SearchEntry[] = iso20022Codes.map((c) => {
    const mappings = getMappingsByISO20022Code(c.code);
    const fpsCode = mappings.length > 0 ? mappings[0].fpsCode : undefined;
    return {
      kind: "iso" as const,
      code: c.code,
      title: c.description,
      category: c.category,
      href: `/codes/future?code=${c.code}`,
      crossRef: fpsCode ? `↔ FPS ${fpsCode}` : undefined,
    };
  });

  return [...fpsEntries, ...isoEntries];
}
