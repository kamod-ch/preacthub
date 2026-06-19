import { Button, Card, CardHeader, CardTitle } from "@kamod-ch/ui";
import { formatDate, type PreactLibrary } from "../../../src/lib/libraries";
import { getCategory } from "../../../src/lib/categories";
import { CompatibilityBadge, StatusBadge } from "./LibraryBadge";

export function LibraryCard({ library }: { library: PreactLibrary }) {
  const category = getCategory(library.category);
  return (
    <a href={library.route} class="ph-library-card-link">
      <Card class="ph-library-card">
        <CardHeader class="ph-library-card-header">
          <div class="ph-library-card-head-row">
            <div>
              <div class="ph-library-title-row">
                <CardTitle>{library.name}</CardTitle>
                {library.testedWith?.library ? <span class="ph-library-version">v{library.testedWith.library}</span> : null}
              </div>
              <div class="ph-library-status-row">
                <StatusBadge value={library.status} />
              </div>
            </div>
            <span class="ph-library-external" aria-hidden="true">↗</span>
          </div>
          <p class="ph-library-description">{library.description}</p>
          <div class="ph-card-topline">
            <span class="ph-category-chip">{category?.name ?? library.category}</span>
            <CompatibilityBadge value={library.compatibility} />
          </div>
          <div class="ph-library-card-footer-meta">
            <span>{library.packageName ?? library.slug}</span>
            <span>{formatDate(library.lastVerified)}</span>
          </div>
        </CardHeader>
      </Card>
    </a>
  );
}
