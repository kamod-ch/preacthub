import {
  Button,
  Input,
  NativeSelect,
} from "@kamod-ch/ui";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { categories } from "../../../src/lib/categories";
import {
  countActiveDirectoryFilters,
  createDefaultDirectoryFilters,
  directoryEmptyStateMessage,
  DIRECTORY_SORT_OPTIONS,
  hasActiveDirectoryFilters,
} from "../../../src/lib/directory-filters";
import {
  compatibilityStatusLabel,
  compatibilityStatusValues,
  DIRECTORY_PAGE_SIZE,
  filterLibraries,
  maintenanceStatusLabel,
  maintenanceStatusValues,
  paginateItems,
  sortLabel,
  sortLibraries,
  totalPages,
  type CompatibilityStatus,
  type LibraryFilterState,
  type MaintenanceStatus,
} from "../../../src/lib/libraries";
import type { LibraryDirectoryMeta } from "../types";
import { ActiveFilterChips, CategoryContextBanner } from "./ActiveFilterChips";
import { compatibilityPillClass } from "./compatibility-colors";
import { LibraryCard } from "./LibraryCard";
import { DIRECTORY_SEARCH_EVENT } from "../utils";
import { readFilters, writeFilters, type FilterHistoryMode } from "./filter-url-state";

const compatPillOptions: Array<{ value: CompatibilityStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  ...compatibilityStatusValues.map((value) => ({ value, label: compatibilityStatusLabel(value) })),
];

function FilterFields({
  filters,
  lockedCategory,
  onUpdate,
  includeSearch = true,
}: {
  filters: LibraryFilterState;
  lockedCategory?: string;
  onUpdate: (updater: (value: LibraryFilterState) => LibraryFilterState, mode?: FilterHistoryMode) => void;
  includeSearch?: boolean;
}) {
  return (
    <div class="ph-filter-grid">
      {includeSearch ? (
        <label class="ph-filter-field">
          <span>Search</span>
          <Input
            type="search"
            value={filters.q ?? ""}
            placeholder="Search libraries, packages or tags"
            onInput={(event) => onUpdate((current) => ({ ...current, q: event.currentTarget.value || undefined, page: 1 }), "replace")}
          />
        </label>
      ) : null}
      {!lockedCategory ? (
        <label class="ph-filter-field">
          <span>Category</span>
          <NativeSelect
            value={filters.category ?? "all"}
            onChange={(event) => onUpdate((value) => ({ ...value, category: event.currentTarget.value, page: 1 }), "push")}
          >
            <option value="all">All categories</option>
            {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
          </NativeSelect>
        </label>
      ) : null}
      <label class="ph-filter-field">
        <span>Maintenance</span>
        <NativeSelect
          value={filters.maintenanceStatus ?? "all"}
          onChange={(event) => onUpdate((value) => ({ ...value, maintenanceStatus: event.currentTarget.value as MaintenanceStatus | "all", page: 1 }), "push")}
        >
          <option value="all">All maintenance states</option>
          {maintenanceStatusValues.map((value) => <option key={value} value={value}>{maintenanceStatusLabel(value)}</option>)}
        </NativeSelect>
      </label>
      <label class="ph-filter-field">
        <span>Sort</span>
        <NativeSelect
          value={filters.sort ?? "recommended"}
          onChange={(event) => onUpdate((value) => ({ ...value, sort: event.currentTarget.value as LibraryFilterState["sort"], page: 1 }), "push")}
        >
          {DIRECTORY_SORT_OPTIONS.map((value) => <option key={value} value={value}>{sortLabel(value)}</option>)}
        </NativeSelect>
      </label>
      <div class="ph-filter-toggles" role="group" aria-label="Runtime filters">
        <button
          type="button"
          class={`ph-filter-toggle-chip${filters.typescript ? " is-active" : ""}`}
          aria-pressed={filters.typescript ?? false}
          onClick={() => onUpdate((value) => ({ ...value, typescript: !value.typescript, page: 1 }), "push")}
        >
          TypeScript
        </button>
        <button
          type="button"
          class={`ph-filter-toggle-chip${filters.ssr ? " is-active" : ""}`}
          aria-pressed={filters.ssr ?? false}
          onClick={() => onUpdate((value) => ({ ...value, ssr: !value.ssr, page: 1 }), "push")}
        >
          SSR
        </button>
      </div>
    </div>
  );
}

function clearFilters(lockedCategory?: string): LibraryFilterState {
  return createDefaultDirectoryFilters(lockedCategory);
}

export function LibraryFilters({ directory }: { directory: LibraryDirectoryMeta }) {
  const lockedCategory = directory.currentCategory?.slug;
  const [filters, setFilters] = useState<LibraryFilterState>(() => createDefaultDirectoryFilters(lockedCategory));

  const updateFilters = useCallback((updater: (value: LibraryFilterState) => LibraryFilterState, mode: FilterHistoryMode = "push") => {
    setFilters((current) => {
      const next = updater(current);
      if (typeof window !== "undefined") writeFilters(next, mode);
      return next;
    });
  }, []);

  useEffect(() => {
    const initial = readFilters(lockedCategory);
    setFilters(initial);
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("q") || params.get("compatibility") || params.get("category") || params.get("compatibilityStatus")) {
      window.setTimeout(() => {
        document.getElementById("all-libraries-title")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }

    function onDirectorySearch(event: Event): void {
      const detail = (event as CustomEvent<{ q: string }>).detail;
      updateFilters((current) => ({ ...current, q: detail.q || undefined, page: 1 }), "replace");
    }

    function onPopState(): void {
      setFilters(readFilters(lockedCategory));
    }

    window.addEventListener(DIRECTORY_SEARCH_EVENT, onDirectorySearch);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener(DIRECTORY_SEARCH_EVENT, onDirectorySearch);
      window.removeEventListener("popstate", onPopState);
    };
  }, [lockedCategory, updateFilters]);

  const filteredItems = useMemo(() => {
    const filtered = filterLibraries(directory.libraries, filters);
    return sortLibraries(filtered, filters.sort ?? "recommended");
  }, [directory.libraries, filters]);

  const page = Math.max(1, filters.page ?? 1);
  const pageCount = totalPages(filteredItems.length);
  const safePage = Math.min(page, pageCount);
  const items = useMemo(
    () => paginateItems(filteredItems, safePage),
    [filteredItems, safePage],
  );

  const activeFilterCount = countActiveDirectoryFilters(filters, lockedCategory);
  const showEmptyReset = hasActiveDirectoryFilters(filters, lockedCategory);

  return (
    <section class="ph-all-libraries" aria-labelledby="all-libraries-title">
      <div class="ph-section-header ph-filter-header">
        <div>
          <div class="ph-section-eyebrow">Directory</div>
          <h2 id="all-libraries-title">{lockedCategory ? `${directory.currentCategory?.name} libraries` : "All libraries"}</h2>
          <p class="ph-muted">Filter by compatibility, runtime support and implementation constraints.</p>
        </div>
        <details class="ph-mobile-filter-details">
          <summary class="ph-mobile-filter-summary">
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </summary>
          <div class="ph-mobile-filter-panel">
            <FilterFields filters={filters} lockedCategory={lockedCategory} onUpdate={updateFilters} />
          </div>
        </details>
      </div>

      {lockedCategory && directory.currentCategory ? (
        <CategoryContextBanner categoryName={directory.currentCategory.name} count={directory.libraries.length} />
      ) : null}

      <div class="ph-compat-pills" role="group" aria-label="Filter by compatibility">
        {compatPillOptions.map((option) => {
          const isActive = (filters.compatibilityStatus ?? "all") === option.value;
          return (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={isActive ? "default" : "outline"}
              class={`${compatibilityPillClass(option.value)}${isActive ? " is-active" : ""}`}
              onClick={() => updateFilters((value) => ({ ...value, compatibilityStatus: option.value, page: 1 }), "push")}
            >
              {option.label}
            </Button>
          );
        })}
      </div>

      <ActiveFilterChips
        filters={filters}
        lockedCategory={lockedCategory}
        onClear={() => updateFilters(() => clearFilters(lockedCategory), "push")}
        onUpdate={updateFilters}
      />

      <div class="ph-filter-toolbar">
        <FilterFields
          filters={filters}
          lockedCategory={lockedCategory}
          onUpdate={updateFilters}
          includeSearch={Boolean(lockedCategory)}
        />
      </div>

      <p class="ph-results-summary" aria-live="polite" aria-atomic="true">
        Showing {filteredItems.length === 0 ? 0 : (safePage - 1) * DIRECTORY_PAGE_SIZE + 1}–{Math.min(safePage * DIRECTORY_PAGE_SIZE, filteredItems.length)} of {filteredItems.length}
        {directory.libraries.length !== filteredItems.length ? ` (filtered from ${directory.libraries.length})` : ""}
      </p>

      {filteredItems.length === 0 ? (
        <div class="ph-empty-state">
          <p>{directoryEmptyStateMessage(filters)}</p>
          {showEmptyReset ? (
            <Button type="button" variant="outline" size="sm" onClick={() => updateFilters(() => clearFilters(lockedCategory), "push")}>
              Reset all filters
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          <div class="ph-directory-grid">
            {items.map((library) => <LibraryCard key={library.slug} library={library} />)}
          </div>
          {pageCount > 1 ? (
            <nav class="ph-pagination" aria-label="Library pagination">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={safePage <= 1}
                onClick={() => updateFilters((value) => ({ ...value, page: safePage - 1 }), "push")}
              >
                Previous
              </Button>
              <span class="ph-pagination-label">Page {safePage} of {pageCount}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={safePage >= pageCount}
                onClick={() => updateFilters((value) => ({ ...value, page: safePage + 1 }), "push")}
              >
                Next
              </Button>
            </nav>
          ) : null}
        </>
      )}
    </section>
  );
}
