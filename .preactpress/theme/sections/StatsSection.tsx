import type { FunctionalComponent } from "preact";
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
    {statCell("Libraries indexed", directory.stats.total, "curated entries with compatibility context")}
    {statCell("Categories", directory.stats.categories, "grouped by the choices Preact teams make")}
    {statCell("Verified entries", directory.stats.verified, "with explicit testing or documented support")}
    {statCell("Native Preact", directory.stats.native, "no compat layer required")}
  </section>
);
