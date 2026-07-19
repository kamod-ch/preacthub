import type { LibraryFilterState } from "../../../src/lib/libraries";
import { legacyCompatibilityToStatus } from "../../../src/lib/libraries";

export type FilterHistoryMode = "push" | "replace";

export function readFilters(defaultCategory?: string): LibraryFilterState {
  if (typeof window === "undefined") {
    return {
      sort: "recommended",
      compatibilityStatus: "all",
      maintenanceStatus: "all",
      category: defaultCategory && defaultCategory !== "all" ? defaultCategory : undefined,
    };
  }
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") ?? defaultCategory;
  const legacyCompatibility = params.get("compatibility");
  const compatibilityStatusParam = params.get("compatibilityStatus");
  return {
    q: params.get("q") ?? undefined,
    category: category && category !== "all" ? category : undefined,
    compatibilityStatus:
      (compatibilityStatusParam as LibraryFilterState["compatibilityStatus"]) ??
      (legacyCompatibility && legacyCompatibility !== "all"
        ? legacyCompatibilityToStatus(legacyCompatibility as never)
        : "all"),
    maintenanceStatus: (params.get("maintenanceStatus") as LibraryFilterState["maintenanceStatus"]) ?? "all",
    sort: (params.get("sort") as LibraryFilterState["sort"]) ?? "recommended",
    typescript: params.get("typescript") === "true",
    ssr: params.get("ssr") === "true",
    islands: params.get("islands") === "true",
    aiReady: params.get("aiReady") === "true",
    page: params.get("page") ? Number(params.get("page")) : undefined,
  };
}

export function writeFilters(filters: LibraryFilterState, mode: FilterHistoryMode = "replace"): void {
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
  if (filters.islands) params.set("islands", "true");
  if (filters.aiReady) params.set("aiReady", "true");
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
  if (mode === "push") {
    window.history.pushState({}, "", url);
  } else {
    window.history.replaceState({}, "", url);
  }
}
