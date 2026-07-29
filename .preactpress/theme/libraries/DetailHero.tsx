import { Button } from "@kamod-ch/ui";
import { compareUrl, compatibilityStatusLabel } from "../../../src/lib/libraries";
import {
  compatibilityStatusDescription,
  type LibraryLinkItem,
} from "../../../src/lib/library-detail";
import { categoryRoute, type LibraryCategory } from "../../../src/lib/categories";
import type { PreactLibrary, ResolvedAlternative } from "../../../src/lib/libraries";
import { compatibilityCalloutClass } from "./compatibility-colors";
import { CompatibilityBadge, MaintenanceBadge } from "./LibraryBadge";
import { PackageNameChip } from "./PackageNameChip";

function ExternalLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Button href={href} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
      {label}
      <span class="ph-external-link-indicator" aria-hidden="true"> ↗</span>
    </Button>
  );
}

export function DetailHero({
  library,
  category,
  links,
  installCommand,
  alternatives,
  isAi = false,
  verdictLabel,
  verdictDescription,
}: {
  library: PreactLibrary;
  category?: LibraryCategory;
  links: LibraryLinkItem[];
  installCommand?: string;
  alternatives: ResolvedAlternative[];
  isAi?: boolean;
  verdictLabel?: string;
  verdictDescription?: string;
}) {
  const compareTarget = alternatives[0];

  return (
    <header class="ph-library-header ph-library-header-grid">
      <div class="ph-library-header-main">
        <div class="ph-library-header-top">
          <div class="ph-section-eyebrow">{isAi ? "AI Tool" : "Library"}</div>
          {category ? (
            <a class="ph-category-chip ph-category-chip-link" href={categoryRoute(category.slug)}>
              {category.name}
            </a>
          ) : null}
        </div>
        <h1>{library.name}</h1>
        {library.packageName ? (
          <PackageNameChip packageName={library.packageName} npmUrl={library.npmUrl} />
        ) : null}
        <p class="ph-library-lead">{library.description}</p>
        <div class="ph-library-hero-badges">
          {!isAi ? (
            <>
              <CompatibilityBadge value={library.compatibilityStatus} size="md" />
              <MaintenanceBadge value={library.maintenanceStatus} />
            </>
          ) : null}
        </div>
        <div class="ph-detail-action-bar" aria-label="Primary actions">
          {installCommand ? (
            <Button href={`#setup`} class="ph-button-primary" size="sm">
              Quick start
            </Button>
          ) : null}
          {links.map((link) => (
            <ExternalLinkButton key={link.href} href={link.href} label={link.label} />
          ))}
          {compareTarget ? (
            <Button href={compareUrl(library.slug, compareTarget.slug)} variant="ghost" size="sm">
              Compare with {compareTarget.name}
            </Button>
          ) : null}
        </div>
      </div>

      {!isAi ? (
        <div
          class={`ph-library-verdict ${compatibilityCalloutClass(library.compatibilityStatus)}`}
          aria-labelledby={`${library.slug}-compatibility-title`}
        >
          <div class="ph-section-eyebrow ph-section-eyebrow-muted">Verdict</div>
          <h2 id={`${library.slug}-compatibility-title`} class="ph-compatibility-callout-title">
            {verdictLabel ?? compatibilityStatusLabel(library.compatibilityStatus)}
          </h2>
          <p>{verdictDescription ?? compatibilityStatusDescription(library.compatibilityStatus)}</p>
        </div>
      ) : verdictLabel ? (
        <div class="ph-library-verdict ph-compatibility-callout ph-compatibility-callout--native">
          <div class="ph-section-eyebrow ph-section-eyebrow-muted">Status</div>
          <h2 class="ph-compatibility-callout-title">{verdictLabel}</h2>
          {verdictDescription ? <p>{verdictDescription}</p> : null}
        </div>
      ) : null}
    </header>
  );
}
