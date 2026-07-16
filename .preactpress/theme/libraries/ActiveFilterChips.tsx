import { useMemo } from "preact/hooks";
import { Button } from "@kamod-ch/ui";
import { categories } from "../../../src/lib/categories";
import {
  compatibilityLabel,
  statusLabel,
  type LibraryFilterState,
} from "../../../src/lib/libraries";
import type { FilterHistoryMode } from "./filter-url-state";

export function countActiveFilters(filters: LibraryFilterState, lockedCategory?: string): number {
  let count = 0;
  if (filters.q?.trim()) count += 1;
  if (filters.compatibility && filters.compatibility !== "all") count += 1;
  if (filters.category && filters.category !== "all" && filters.category !== lockedCategory) count += 1;
  if (filters.status && filters.status !== "all") count += 1;
  if (filters.typescript) count += 1;
  if (filters.ssr) count += 1;
  if (filters.islands) count += 1;
  return count;
}

export function ActiveFilterChips({
  filters,
  lockedCategory,
  onClear,
  onUpdate,
}: {
  filters: LibraryFilterState;
  lockedCategory?: string;
  onClear: () => void;
  onUpdate: (updater: (value: LibraryFilterState) => LibraryFilterState, mode?: FilterHistoryMode) => void;
}) {
  const chips = useMemo(() => {
    const items: Array<{ key: string; label: string; remove: () => void }> = [];
    if (filters.q?.trim()) {
      items.push({
        key: "q",
        label: `Search: ${filters.q.trim()}`,
        remove: () => onUpdate((value) => ({ ...value, q: undefined, page: 1 }), "push"),
      });
    }
    if (filters.compatibility && filters.compatibility !== "all") {
      items.push({
        key: "compatibility",
        label: compatibilityLabel(filters.compatibility),
        remove: () => onUpdate((value) => ({ ...value, compatibility: "all", page: 1 }), "push"),
      });
    }
    if (filters.category && filters.category !== "all" && filters.category !== lockedCategory) {
      const category = categories.find((entry) => entry.slug === filters.category);
      items.push({
        key: "category",
        label: category?.name ?? filters.category,
        remove: () => onUpdate((value) => ({ ...value, category: lockedCategory, page: 1 }), "push"),
      });
    }
    if (filters.status && filters.status !== "all") {
      items.push({
        key: "status",
        label: statusLabel(filters.status),
        remove: () => onUpdate((value) => ({ ...value, status: "all", page: 1 }), "push"),
      });
    }
    if (filters.typescript) {
      items.push({
        key: "typescript",
        label: "TypeScript",
        remove: () => onUpdate((value) => ({ ...value, typescript: false, page: 1 }), "push"),
      });
    }
    if (filters.ssr) {
      items.push({
        key: "ssr",
        label: "SSR",
        remove: () => onUpdate((value) => ({ ...value, ssr: false, page: 1 }), "push"),
      });
    }
    if (filters.islands) {
      items.push({
        key: "islands",
        label: "Islands",
        remove: () => onUpdate((value) => ({ ...value, islands: false, page: 1 }), "push"),
      });
    }
    return items;
  }, [filters, lockedCategory, onUpdate]);

  if (!chips.length) return null;

  return (
    <div class="ph-active-filters" aria-label="Active filters">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          class="ph-active-filter-chip"
          onClick={chip.remove}
          aria-label={`Remove filter ${chip.label}`}
        >
          <span>{chip.label}</span>
          <span aria-hidden="true">×</span>
        </button>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={onClear}>Clear all</Button>
    </div>
  );
}

export function CategoryContextBanner({
  categoryName,
  count,
}: {
  categoryName: string;
  count: number;
}) {
  return (
    <div class="ph-category-context" role="status">
      <span>Showing {count} libraries in <strong>{categoryName}</strong>.</span>
      <a href="/libraries">Browse all categories</a>
    </div>
  );
}
