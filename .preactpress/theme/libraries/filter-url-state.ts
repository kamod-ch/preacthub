import type { LibraryFilterState } from "../../../src/lib/libraries";
import {
  createDefaultDirectoryFilters,
  parseDirectoryFilters,
  serializeDirectoryFilters,
} from "../../../src/lib/directory-filters";

export type FilterHistoryMode = "push" | "replace";

export function readFilters(defaultCategory?: string): LibraryFilterState {
  if (typeof window === "undefined") {
    return createDefaultDirectoryFilters(defaultCategory);
  }
  return parseDirectoryFilters(new URLSearchParams(window.location.search), defaultCategory);
}

export function writeFilters(filters: LibraryFilterState, mode: FilterHistoryMode = "replace"): void {
  const params = serializeDirectoryFilters(filters);
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
  if (mode === "push") {
    window.history.pushState({}, "", url);
  } else {
    window.history.replaceState({}, "", url);
  }
}
