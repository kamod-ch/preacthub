import type { FunctionalComponent } from "preact";
import { formatCatalogDate } from "../../../src/lib/directory-insights";
import type { LibraryDirectoryMeta } from "../types";

function statCell(label: string, value: string | number, detail: string) {
  return (
    <div class="ph-stat-cell">
      <p class="ph-stat-value">{value}</p>
      <p class="ph-stat-label">{label}</p>
      <p class="ph-stat-subtitle">{detail}</p>
    </div>
  );
}

export const StatsSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => (
  <section class="ph-stats-grid" aria-label="Directory statistics">
    {statCell("Libraries", directory.stats.total, "curated entries in the catalog")}
    {statCell("Categories", directory.stats.categories, "areas where Preact teams choose tooling")}
    {statCell("Native Preact", directory.stats.native, "libraries without a compat layer")}
    {statCell(
      "Last updated",
      formatCatalogDate(directory.stats.lastUpdatedAt),
      "latest catalog content revision",
    )}
  </section>
);
