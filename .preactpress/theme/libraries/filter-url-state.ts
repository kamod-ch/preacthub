import type { LibraryFilterState } from "../../../src/lib/libraries";

export type FilterHistoryMode = "push" | "replace";

export function readFilters(defaultCategory?: string): LibraryFilterState {
  if (typeof window === "undefined") {
    return {
      sort: "recommended",
      compatibility: "all",
      status: "all",
      category: defaultCategory && defaultCategory !== "all" ? defaultCategory : undefined,
    };
  }
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") ?? defaultCategory;
  return {
    q: params.get("q") ?? undefined,
    category: category && category !== "all" ? category : undefined,
    compatibility: (params.get("compatibility") as LibraryFilterState["compatibility"]) ?? "all",
    status: (params.get("status") as LibraryFilterState["status"]) ?? "all",
    sort: (params.get("sort") as LibraryFilterState["sort"]) ?? "recommended",
    typescript: params.get("typescript") === "true",
    ssr: params.get("ssr") === "true",
    islands: params.get("islands") === "true",
    page: params.get("page") ? Number(params.get("page")) : undefined,
  };
}

export function writeFilters(filters: LibraryFilterState, mode: FilterHistoryMode = "replace"): void {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category && filters.category !== "all") params.set("category", filters.category);
  if (filters.compatibility && filters.compatibility !== "all") params.set("compatibility", filters.compatibility);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.sort && filters.sort !== "recommended") params.set("sort", filters.sort);
  if (filters.typescript) params.set("typescript", "true");
  if (filters.ssr) params.set("ssr", "true");
  if (filters.islands) params.set("islands", "true");
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
  if (mode === "push") {
    window.history.pushState({}, "", url);
  } else {
    window.history.replaceState({}, "", url);
  }
}
