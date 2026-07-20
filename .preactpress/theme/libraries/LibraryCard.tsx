import { Card, CardHeader, CardTitle } from "@kamod-ch/ui";
import { formatDate, type PreactLibrary } from "../../../src/lib/libraries";
import { getCategory } from "../../../src/lib/categories";
import { CompatibilityBadge, StatusBadge } from "./LibraryBadge";

function RuntimeSignal({ supported, label }: { supported: boolean; label: string }) {
  return (
    <span class={supported ? "ph-runtime-signal ph-runtime-signal-yes" : "ph-runtime-signal ph-runtime-signal-no"}>
      {supported ? label : `No ${label}`}
    </span>
  );
}

export function LibraryCard({ library }: { library: PreactLibrary }) {
  const category = getCategory(library.category);

  return (
    <a href={library.route} class="ph-library-card-link">
      <Card class="ph-library-card">
        <CardHeader class="ph-library-card-header">
          <div class="ph-library-card-head-row">
            <CardTitle>{library.name}</CardTitle>
            <span class="ph-library-external" aria-hidden="true">↗</span>
          </div>
          <p class="ph-library-description">{library.description}</p>
          <div class="ph-card-topline">
            <span class="ph-category-chip">{category?.name ?? library.category}</span>
            <CompatibilityBadge value={library.compatibilityStatus} />
            <StatusBadge value={library.maintenanceStatus} />
          </div>
          <div class="ph-runtime-signals" aria-label="Runtime support">
            <RuntimeSignal supported={library.typescript} label="TS" />
            <RuntimeSignal supported={library.ssr} label="SSR" />
          </div>
          <p class="ph-library-card-footer-meta">
            <span>Last verified: {formatDate(library.lastVerifiedAt)}</span>
          </p>
        </CardHeader>
      </Card>
    </a>
  );
}
