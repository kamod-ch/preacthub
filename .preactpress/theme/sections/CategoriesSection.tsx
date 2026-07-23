import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import { CategoryCard } from "../libraries/CategoryCard";
import { CompatibilityLegend } from "../libraries/CompatibilityLegend";
import type { LibraryDirectoryMeta } from "../types";

export const CategoriesSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => (
  <section id="categories" class="ph-section ph-category-section">
    <div class="ph-section-header">
      <div>
        <div class="ph-section-eyebrow">Ecosystem</div>
        <h2>Browse by category</h2>
        <p class="ph-muted">A visual overview of the main areas where Preact teams evaluate libraries.</p>
      </div>
      <Button href="/libraries#all-libraries-title" variant="ghost" size="sm">Browse directory</Button>
    </div>
    <div class="ph-category-grid">
      {directory.categories.map((categoryItem) => (
        <CategoryCard key={categoryItem.slug} category={categoryItem} />
      ))}
    </div>
    <CompatibilityLegend />
  </section>
);
