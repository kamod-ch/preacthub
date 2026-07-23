import { Card, CardHeader, CardTitle } from "@kamod-ch/ui";
import { formatDate, type PreactLibrary } from "../../../src/lib/libraries";
import { resolveInstallCommand } from "../../../src/lib/library-detail";
import { getCategory } from "../../../src/lib/categories";
import { CompatibilityBadge, StatusBadge } from "./LibraryBadge";
import { TrustMarker, type TrustMarkerKind } from "./TrustMarker";

function RuntimeSignal({ supported, label }: { supported: boolean; label: string }) {
  return (
    <span class={supported ? "ph-runtime-signal ph-runtime-signal-yes" : "ph-runtime-signal ph-runtime-signal-no"}>
      {supported ? label : `No ${label}`}
    </span>
  );
}

export function LibraryCard({
  library,
  trustMarker,
}: {
  library: PreactLibrary;
  trustMarker?: TrustMarkerKind;
}) {
  const category = getCategory(library.category);
  const installCommand = resolveInstallCommand(library);

  return (
    <a href={library.route} class="ph-library-card-link">
      <Card class="ph-library-card">
        <CardHeader class="ph-library-card-header">
          <div class="ph-library-card-head-row">
            <CardTitle>{library.name}</CardTitle>
            {trustMarker ? <TrustMarker kind={trustMarker} /> : <span class="ph-library-external" aria-hidden="true">↗</span>}
          </div>
          {library.packageName ? (
            <p class="ph-package-name">{library.packageName}</p>
          ) : null}
          {installCommand ? (
            <code class="ph-install-snippet">{installCommand}</code>
          ) : null}
          <p class="ph-library-description">{library.description}</p>
          <div class="ph-library-card-badges">
            <span class="ph-category-chip">{category?.name ?? library.category}</span>
            <CompatibilityBadge value={library.compatibilityStatus} />
            <StatusBadge value={library.maintenanceStatus} />
            <RuntimeSignal supported={library.typescript} label="TS" />
            <RuntimeSignal supported={library.ssr} label="SSR" />
          </div>
          {library.lastVerifiedAt ? (
            <p class="ph-library-card-footer-meta">
              <span>Last verified: {formatDate(library.lastVerifiedAt)}</span>
            </p>
          ) : null}
        </CardHeader>
      </Card>
    </a>
  );
}
