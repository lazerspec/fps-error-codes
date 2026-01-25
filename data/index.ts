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
import type { ErrorCode, SearchableCode } from "./types";

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

export function getSearchableData(): SearchableCode[] {
  return allErrorCodes.map((c) => ({
    code: c.code,
    type: c.type,
    scheme: c.scheme,
    category: c.category,
    shortDescription: c.shortDescription,
    detailedExplanation: c.detailedExplanation,
  }));
}
