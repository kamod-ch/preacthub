import {
  Button,
  Card,
  CardContent,
  Input,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@kamod-ch/ui";
import { useEffect, useMemo, useState } from "preact/hooks";
import { categories } from "../../../src/lib/categories";
import {
  compatibilityLabel,
  compatibilityValues,
  filterLibraries,
  librarySortOptions,
  sortLibraries,
  statusValues,
  type LibraryCompatibility,
  type LibraryFilterState,
  type PreactLibrary,
} from "../../../src/lib/libraries";
import { LibraryCard } from "./LibraryCard";
import { CompatibilityBadge, StatusBadge } from "./LibraryBadge";
import { DIRECTORY_SEARCH_EVENT } from "../utils";
import { readFilters, writeFilters } from "./filter-url-state";

const compatPillOptions: Array<{ value: LibraryFilterState["compatibility"]; label: string }> = [
  { value: "all", label: "All" },
  ...compatibilityValues.map((value) => ({ value, label: compatibilityLabel(value) })),
];

function CompatPills({
  filters,
  setFilters,
}: {
  filters: LibraryFilterState;
  setFilters: (updater: (value: LibraryFilterState) => LibraryFilterState) => void;
}) {
  const active = filters.compatibility ?? "all";
  return (
    <div class="ph-compat-pills" role="group" aria-label="Filter by compatibility">
      {compatPillOptions.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={active === option.value ? "default" : "outline"}
          class="ph-compat-pill"
          onClick={() => setFilters((value) => ({ ...value, compatibility: option.value }))}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

function FilterFields({
  filters,
  setFilters,
}: {
  filters: LibraryFilterState;
  setFilters: (updater: (value: LibraryFilterState) => LibraryFilterState) => void;
}) {
  return (
    <div class="ph-filter-grid">
      <label class="ph-filter-field">
        <span>Search</span>
        <Input
          type="search"
          value={filters.q ?? ""}
          placeholder="Search libraries, packages or tags"
          onInput={(event) => setFilters((value) => ({ ...value, q: event.currentTarget.value }))}
        />
      </label>
      <label class="ph-filter-field">
        <span>Category</span>
        <NativeSelect value={filters.category ?? "all"} onChange={(event) => setFilters((value) => ({ ...value, category: event.currentTarget.value }))}>
          <option value="all">All categories</option>
          {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
        </NativeSelect>
      </label>
      <label class="ph-filter-field">
        <span>Compatibility</span>
        <NativeSelect value={filters.compatibility ?? "all"} onChange={(event) => setFilters((value) => ({ ...value, compatibility: event.currentTarget.value as LibraryCompatibility | "all" }))}>
          <option value="all">All compatibility</option>
          {compatibilityValues.map((value) => <option key={value} value={value}>{value}</option>)}
        </NativeSelect>
      </label>
      <label class="ph-filter-field">
        <span>Status</span>
        <NativeSelect value={filters.status ?? "all"} onChange={(event) => setFilters((value) => ({ ...value, status: event.currentTarget.value as LibraryFilterState["status"] }))}>
          <option value="all">All statuses</option>
          {statusValues.map((value) => <option key={value} value={value}>{value}</option>)}
        </NativeSelect>
      </label>
      <label class="ph-filter-field">
        <span>Sort</span>
        <NativeSelect value={filters.sort ?? "recommended"} onChange={(event) => setFilters((value) => ({ ...value, sort: event.currentTarget.value as LibraryFilterState["sort"] }))}>
          {librarySortOptions.map((value) => <option key={value} value={value}>{value}</option>)}
        </NativeSelect>
      </label>
      <div class="ph-filter-toggles">
        <label>
          <input
            type="checkbox"
            checked={filters.typescript ?? false}
            onChange={(event) => setFilters((value) => ({ ...value, typescript: event.currentTarget.checked }))}
          />
          TypeScript
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.ssr ?? false}
            onChange={(event) => setFilters((value) => ({ ...value, ssr: event.currentTarget.checked }))}
          />
          SSR
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.islands ?? false}
            onChange={(event) => setFilters((value) => ({ ...value, islands: event.currentTarget.checked }))}
          />
          Islands
        </label>
      </div>
    </div>
  );
}

function clearFilters(): LibraryFilterState {
  return { sort: "recommended", compatibility: "all", status: "all" };
}

export function LibraryFilters({ directory }: { directory: { libraries: PreactLibrary[] } }) {
  const [filters, setFilters] = useState<LibraryFilterState>({ sort: "recommended" });

  useEffect(() => {
    setFilters(readFilters());
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("q") || params.get("compatibility") || params.get("category")) {
      window.setTimeout(() => {
        document.getElementById("all-libraries-title")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }

    function onDirectorySearch(event: Event): void {
      const detail = (event as CustomEvent<{ q: string }>).detail;
      setFilters((current) => ({ ...current, q: detail.q || undefined }));
    }

    function onPopState(): void {
      setFilters(readFilters());
    }

    window.addEventListener(DIRECTORY_SEARCH_EVENT, onDirectorySearch);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener(DIRECTORY_SEARCH_EVENT, onDirectorySearch);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") writeFilters(filters);
  }, [filters]);

  const items = useMemo(() => {
    const filtered = filterLibraries(directory.libraries, filters);
    return sortLibraries(filtered, filters.sort ?? "recommended");
  }, [directory.libraries, filters]);

  const hasActiveFilters = Boolean(
    filters.q ||
    (filters.compatibility && filters.compatibility !== "all") ||
    (filters.category && filters.category !== "all") ||
    (filters.status && filters.status !== "all") ||
    filters.typescript ||
    filters.ssr ||
    filters.islands,
  );

  return (
    <section class="ph-all-libraries" aria-labelledby="all-libraries-title">
      <div class="ph-section-header ph-filter-header">
        <div>
          <div class="ph-section-eyebrow">Directory</div>
          <h2 id="all-libraries-title">All libraries</h2>
          <p class="ph-muted">Filter by compatibility, runtime support and implementation constraints.</p>
        </div>
        <details class="ph-mobile-filter-details">
          <summary class="ph-mobile-filter-summary">Filters</summary>
          <div class="ph-mobile-filter-panel">
            <FilterFields filters={filters} setFilters={setFilters} />
          </div>
        </details>
      </div>
      <CompatPills filters={filters} setFilters={setFilters} />
      <Card class="ph-filters-card">
        <CardContent>
          <FilterFields filters={filters} setFilters={setFilters} />
        </CardContent>
      </Card>
      <p class="ph-results-summary">Showing {items.length} of {directory.libraries.length} libraries</p>
      {items.length === 0 ? (
        <div class="ph-empty-state">
          <p>
            {filters.q
              ? `No libraries found for "${filters.q}"`
              : "No libraries match the current filters"}
          </p>
          {hasActiveFilters ? (
            <Button type="button" variant="outline" size="sm" onClick={() => setFilters(() => clearFilters())}>
              Clear filters
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          <div class="ph-table-toolbar" aria-hidden="true">
            <span>Dense desktop directory view</span>
            <span>Compatibility, status and runtime support at a glance</span>
          </div>
          <div class="ph-directory-mobile-grid">
            {items.map((library) => <LibraryCard key={library.slug} library={library} />)}
          </div>
          <div class="ph-directory-table-wrap">
            <Table class="ph-directory-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Library</TableHead>
                  <TableHead>Compatibility</TableHead>
                  <TableHead>Runtime</TableHead>
                  <TableHead>Verified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((library) => (
                  <TableRow key={library.slug}>
                    <TableCell>
                      <a class="ph-directory-link" href={library.route}>
                        <span class="ph-directory-name">{library.name}</span>
                        <span class="ph-directory-description">{library.description}</span>
                        <span class="ph-directory-package">{library.packageName ?? library.slug}</span>
                      </a>
                    </TableCell>
                    <TableCell>
                      <div class="ph-directory-compat">
                        <CompatibilityBadge value={library.compatibility} />
                        <StatusBadge value={library.status} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div class="ph-directory-runtime">
                        <span>{library.typescript ? "TS" : "No TS"}</span>
                        <span>{library.ssr ? "SSR" : "No SSR"}</span>
                        <span>{library.islands ? "Islands" : "No islands"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{library.lastVerified ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </section>
  );
}
