import { Card, CardHeader, CardTitle } from "@kamod-ch/ui";
import {
  formatDate,
  type PreactLibrary,
} from "../../../src/lib/libraries";
import { resolveInstallCommand } from "../../../src/lib/library-detail";
import { getCategory } from "../../../src/lib/categories";
import {
  hostingTypeLabel,
  pricingModelLabel,
  projectTypeLabel,
} from "../../../src/lib/project-types";
import { CompatibilityBadge, StatusBadge } from "./LibraryBadge";
import { PackageNameChip } from "./PackageNameChip";
import { TrustMarker, type TrustMarkerKind } from "./TrustMarker";

function RuntimeSignal({ supported, label }: { supported: boolean; label: string }) {
  return (
    <span class={supported ? "ph-runtime-signal ph-runtime-signal-yes" : "ph-runtime-signal ph-runtime-signal-no"}>
      {supported ? label : `No ${label}`}
    </span>
  );
}

function TagChip({ tag }: { tag: string }) {
  return <span class="ph-tag-chip">{tag}</span>;
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
  const isAi = library.catalogDomain === "ai";
  const visibleTags = library.tags.slice(0, 3);
  const primaryLanguage = library.languages?.[0];
  const updatedAt = library.lastCommitAt ?? library.lastReleaseAt ?? library.lastVerifiedAt;

  return (
    <a href={library.route} class="ph-library-card-link">
      <Card class="ph-library-card">
        <CardHeader class="ph-library-card-header">
          <div class="ph-library-card-head-row">
            <CardTitle>{library.name}</CardTitle>
            {trustMarker ? <TrustMarker kind={trustMarker} /> : <span class="ph-library-external" aria-hidden="true">↗</span>}
          </div>
          {library.packageName ? (
            <PackageNameChip packageName={library.packageName} variant="compact" />
          ) : null}
          {!isAi && installCommand ? (
            <code class="ph-install-snippet">{installCommand}</code>
          ) : null}
          <p class="ph-library-description">{library.description}</p>
          <div class="ph-library-card-badges">
            <span class="ph-category-chip">{category?.name ?? library.category}</span>
            {library.projectType ? (
              <span class="ph-meta-chip">{projectTypeLabel(library.projectType)}</span>
            ) : null}
            {library.hostingType ? (
              <span class="ph-meta-chip">{hostingTypeLabel(library.hostingType)}</span>
            ) : null}
            {primaryLanguage ? (
              <span class="ph-meta-chip">{primaryLanguage}</span>
            ) : null}
            {library.openSource ? (
              <span class="ph-meta-chip ph-meta-chip-positive">Open Source</span>
            ) : null}
            {library.typescript ? (
              <RuntimeSignal supported={library.typescript} label="TS" />
            ) : null}
            {library.mcpSupport ? (
              <span class="ph-meta-chip">MCP</span>
            ) : null}
            {!isAi ? (
              <>
                <CompatibilityBadge value={library.compatibilityStatus} />
                <StatusBadge value={library.maintenanceStatus} />
                <RuntimeSignal supported={library.ssr} label="SSR" />
              </>
            ) : null}
          </div>
          {visibleTags.length ? (
            <div class="ph-library-card-tags" aria-label="Tags">
              {visibleTags.map((tag) => <TagChip key={tag} tag={tag} />)}
            </div>
          ) : null}
          <div class="ph-library-card-footer-meta">
            {library.stars !== undefined ? (
              <span>{library.stars.toLocaleString()} stars</span>
            ) : null}
            {updatedAt ? (
              <span>Updated {formatDate(updatedAt)}</span>
            ) : library.lastVerifiedAt ? (
              <span>Last verified: {formatDate(library.lastVerifiedAt)}</span>
            ) : null}
            {library.pricing?.model ? (
              <span>{pricingModelLabel(library.pricing.model)}</span>
            ) : null}
          </div>
        </CardHeader>
      </Card>
    </a>
  );
}
