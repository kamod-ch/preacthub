import type { LibraryFilterState, LibrarySort } from "./libraries";
import { legacyCompatibilityToStatus } from "./libraries";

export const DIRECTORY_SORT_OPTIONS: LibrarySort[] = ["recommended", "recently-verified", "name"];

export function createDefaultDirectoryFilters(lockedCategory?: string): LibraryFilterState {
  return {
    sort: "recommended",
    compatibilityStatus: "all",
    maintenanceStatus: "all",
    category: lockedCategory,
  };
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
    typescript: params.get("typescript") === "true",
    ssr: params.get("ssr") === "true",
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
  if (query) return `No libraries found for "${query}"`;
  return "No libraries match the current filters";
}
