import { useMemo } from "preact/hooks";
import { Button } from "@kamod-ch/ui";
import { categories } from "../../../src/lib/categories";
import {
  compatibilityStatusLabel,
  maintenanceStatusLabel,
  type CompatibilityStatus,
  type LibraryFilterState,
} from "../../../src/lib/libraries";
import type { FilterHistoryMode } from "./filter-url-state";
import { compatibilityFilterChipClass } from "./compatibility-colors";

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
    const items: Array<{ key: string; label: string; className?: string; remove: () => void }> = [];
    if (filters.q?.trim()) {
      items.push({
        key: "q",
        label: `Search: ${filters.q.trim()}`,
        remove: () => onUpdate((value) => ({ ...value, q: undefined, page: 1 }), "push"),
      });
    }
    if (filters.compatibilityStatus && filters.compatibilityStatus !== "all") {
      const status = filters.compatibilityStatus as CompatibilityStatus;
      items.push({
        key: "compatibilityStatus",
        label: compatibilityStatusLabel(status),
        className: compatibilityFilterChipClass(status),
        remove: () => onUpdate((value) => ({ ...value, compatibilityStatus: "all", page: 1 }), "push"),
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
    if (filters.maintenanceStatus && filters.maintenanceStatus !== "all") {
      items.push({
        key: "maintenanceStatus",
        label: maintenanceStatusLabel(filters.maintenanceStatus),
        remove: () => onUpdate((value) => ({ ...value, maintenanceStatus: "all", page: 1 }), "push"),
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
    return items;
  }, [filters, lockedCategory, onUpdate]);

  if (!chips.length) return null;

  return (
    <div class="ph-active-filters" aria-label="Active filters">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          class={chip.className ?? "ph-active-filter-chip"}
          onClick={chip.remove}
          aria-label={`Remove filter ${chip.label}`}
        >
          <span>{chip.label}</span>
          <span aria-hidden="true">×</span>
        </button>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={onClear}>Reset all filters</Button>
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
