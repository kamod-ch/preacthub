import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import { CategoryCard } from "../libraries/CategoryCard";
import { CompatibilityBadge } from "../libraries/LibraryBadge";
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
    <div class="ph-compat-legend">
      <span class="ph-section-eyebrow ph-section-eyebrow-muted">Compatibility key</span>
      <div class="ph-card-badges">
        <CompatibilityBadge value="native" />
        <CompatibilityBadge value="compat" />
        <CompatibilityBadge value="partial" />
        <CompatibilityBadge value="incompatible" />
        <CompatibilityBadge value="unknown" />
      </div>
    </div>
  </section>
);
