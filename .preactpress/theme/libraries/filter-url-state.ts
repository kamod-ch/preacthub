import type { LibraryFilterState } from "../../../src/lib/libraries";

export function readFilters(): LibraryFilterState {
  if (typeof window === "undefined") return { sort: "recommended" };
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") ?? undefined,
    category: params.get("category") ?? undefined,
    compatibility: (params.get("compatibility") as LibraryFilterState["compatibility"]) ?? "all",
    status: (params.get("status") as LibraryFilterState["status"]) ?? "all",
    sort: (params.get("sort") as LibraryFilterState["sort"]) ?? "recommended",
    typescript: params.get("typescript") === "true",
    ssr: params.get("ssr") === "true",
    islands: params.get("islands") === "true",
  };
}

export function writeFilters(filters: LibraryFilterState): void {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category && filters.category !== "all") params.set("category", filters.category);
  if (filters.compatibility && filters.compatibility !== "all") params.set("compatibility", filters.compatibility);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.sort && filters.sort !== "recommended") params.set("sort", filters.sort);
  if (filters.typescript) params.set("typescript", "true");
  if (filters.ssr) params.set("ssr", "true");
  if (filters.islands) params.set("islands", "true");
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
  window.history.replaceState({}, "", url);
}
