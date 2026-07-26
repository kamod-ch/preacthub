import type { LibraryFilterState, LibrarySort } from "./libraries";
import { legacyCompatibilityToStatus } from "./libraries";

export const DIRECTORY_SORT_OPTIONS: LibrarySort[] = [
  "recommended",
  "most-popular",
  "recently-updated",
  "recently-verified",
  "name",
];

export const AI_DIRECTORY_SORT_OPTIONS: LibrarySort[] = [
  "recommended",
  "most-popular",
  "recently-updated",
  "name",
];

export function createDefaultDirectoryFilters(lockedCategory?: string): LibraryFilterState {
  return {
    sort: "recommended",
    compatibilityStatus: "all",
    maintenanceStatus: "all",
    category: lockedCategory,
  };
}

function readBoolParam(params: URLSearchParams, key: string): boolean {
  return params.get(key) === "true";
}

export function parseDirectoryFilters(
  params: URLSearchParams,
  lockedCategory?: string,
): LibraryFilterState {
  const category = params.get("category") ?? lockedCategory;
  const legacyCompatibility = params.get("compatibility");
  const compatibilityStatusParam = params.get("compatibilityStatus");

  return {
    q: params.get("q") ?? undefined,
    category: category && category !== "all" ? category : lockedCategory,
    compatibilityStatus:
      (compatibilityStatusParam as LibraryFilterState["compatibilityStatus"]) ??
      (legacyCompatibility && legacyCompatibility !== "all"
        ? legacyCompatibilityToStatus(legacyCompatibility as never)
        : "all"),
    maintenanceStatus: (params.get("maintenanceStatus") as LibraryFilterState["maintenanceStatus"]) ?? "all",
    sort: (params.get("sort") as LibraryFilterState["sort"]) ?? "recommended",
    typescript: readBoolParam(params, "typescript"),
    ssr: readBoolParam(params, "ssr"),
    openSource: readBoolParam(params, "openSource"),
    selfHosted: readBoolParam(params, "selfHosted"),
    hosted: readBoolParam(params, "hosted"),
    free: readBoolParam(params, "free"),
    freemium: readBoolParam(params, "freemium"),
    paid: readBoolParam(params, "paid"),
    language: params.get("language") ?? undefined,
    runtime: params.get("runtime") ?? undefined,
    mcp: readBoolParam(params, "mcp"),
    recentlyUpdated: readBoolParam(params, "recentlyUpdated"),
    tag: params.get("tag") ?? undefined,
    catalogDomain: (params.get("catalogDomain") as LibraryFilterState["catalogDomain"]) ?? undefined,
    page: params.get("page") ? Number(params.get("page")) : undefined,
  };
}

export function serializeDirectoryFilters(filters: LibraryFilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category && filters.category !== "all") params.set("category", filters.category);
  if (filters.compatibilityStatus && filters.compatibilityStatus !== "all") {
    params.set("compatibilityStatus", filters.compatibilityStatus);
  }
  if (filters.maintenanceStatus && filters.maintenanceStatus !== "all") {
    params.set("maintenanceStatus", filters.maintenanceStatus);
  }
  if (filters.sort && filters.sort !== "recommended") params.set("sort", filters.sort);
  if (filters.typescript) params.set("typescript", "true");
  if (filters.ssr) params.set("ssr", "true");
  if (filters.openSource) params.set("openSource", "true");
  if (filters.selfHosted) params.set("selfHosted", "true");
  if (filters.hosted) params.set("hosted", "true");
  if (filters.free) params.set("free", "true");
  if (filters.freemium) params.set("freemium", "true");
  if (filters.paid) params.set("paid", "true");
  if (filters.language) params.set("language", filters.language);
  if (filters.runtime) params.set("runtime", filters.runtime);
  if (filters.mcp) params.set("mcp", "true");
  if (filters.recentlyUpdated) params.set("recentlyUpdated", "true");
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.catalogDomain && filters.catalogDomain !== "all") {
    params.set("catalogDomain", filters.catalogDomain);
  }
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  return params;
}

export function countActiveDirectoryFilters(
  filters: LibraryFilterState,
  lockedCategory?: string,
): number {
  let count = 0;
  if (filters.q?.trim()) count += 1;
  if (filters.compatibilityStatus && filters.compatibilityStatus !== "all") count += 1;
  if (filters.category && filters.category !== "all" && filters.category !== lockedCategory) count += 1;
  if (filters.maintenanceStatus && filters.maintenanceStatus !== "all") count += 1;
  if (filters.typescript) count += 1;
  if (filters.ssr) count += 1;
  if (filters.openSource) count += 1;
  if (filters.selfHosted) count += 1;
  if (filters.hosted) count += 1;
  if (filters.free) count += 1;
  if (filters.freemium) count += 1;
  if (filters.paid) count += 1;
  if (filters.language) count += 1;
  if (filters.runtime) count += 1;
  if (filters.mcp) count += 1;
  if (filters.recentlyUpdated) count += 1;
  if (filters.tag) count += 1;
  return count;
}

export function hasActiveDirectoryFilters(
  filters: LibraryFilterState,
  lockedCategory?: string,
): boolean {
  return countActiveDirectoryFilters(filters, lockedCategory) > 0;
}

export function directoryEmptyStateMessage(filters: LibraryFilterState): string {
  const query = filters.q?.trim();
  if (query) return `No tools found for "${query}"`;
  return "No tools match the current filters";
}
