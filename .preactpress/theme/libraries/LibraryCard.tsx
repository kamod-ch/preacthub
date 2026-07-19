import { Card, CardHeader, CardTitle } from "@kamod-ch/ui";
import { formatDate, type PreactLibrary } from "../../../src/lib/libraries";
import { getCategory } from "../../../src/lib/categories";
import { CompatibilityBadge, QualityBadge, StatusBadge } from "./LibraryBadge";

const MAX_VISIBLE_BADGES = 3;

export function LibraryCard({ library }: { library: PreactLibrary }) {
  const category = getCategory(library.category);
  const hiddenBadgeCount = Math.max(0, library.qualityBadges.length - MAX_VISIBLE_BADGES);

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
                <StatusBadge value={library.maintenanceStatus} />
              </div>
            </div>
            <span class="ph-library-external" aria-hidden="true">↗</span>
          </div>
          <p class="ph-library-description">{library.description}</p>
          <div class="ph-card-topline">
            <span class="ph-category-chip">{category?.name ?? library.category}</span>
            <CompatibilityBadge value={library.compatibilityStatus} />
          </div>
          {library.qualityBadges.length ? (
            <div class="ph-quality-badge-list ph-quality-badge-list-card" aria-label="Quality badges">
              {library.qualityBadges.slice(0, MAX_VISIBLE_BADGES).map((badge) => <QualityBadge key={badge} value={badge} />)}
              {hiddenBadgeCount > 0 ? (
                <span class="ph-badge ph-quality-more" title={library.qualityBadges.slice(MAX_VISIBLE_BADGES).join(", ")}>
                  +{hiddenBadgeCount} more
                </span>
              ) : null}
            </div>
          ) : null}
          <div class="ph-library-card-footer-meta">
            <span>{library.packageName ?? library.slug}</span>
            <span>{formatDate(library.lastVerifiedAt)}</span>
          </div>
        </CardHeader>
      </Card>
    </a>
  );
}
