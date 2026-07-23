import { Badge } from "@kamod-ch/ui";
import {
  compatibilityStatusLabel,
  maintenanceStatusLabel,
  qualityBadgeLabel,
  type CompatibilityStatus,
  type LibraryQualityBadge,
  type MaintenanceStatus,
} from "../../../src/lib/libraries";
import { compatibilityBadgeClass } from "./compatibility-colors";

const compatibilityVariant: Record<CompatibilityStatus, "secondary" | "outline" | "warning" | "destructive"> = {
  native: "secondary",
  compat: "outline",
  "community-tested": "secondary",
  experimental: "warning",
  unverified: "outline",
  inactive: "destructive",
};

const compatibilityGlyph: Record<CompatibilityStatus, string> = {
  native: "◆",
  compat: "◇",
  "community-tested": "◇",
  experimental: "◈",
  unverified: "?",
  inactive: "✕",
};

const maintenanceVariant: Record<MaintenanceStatus, "secondary" | "outline" | "warning" | "destructive"> = {
  active: "secondary",
  maintenance: "outline",
  inactive: "warning",
  archived: "destructive",
  unknown: "outline",
};

export function CompatibilityBadge({
  value,
  size = "sm",
}: {
  value: CompatibilityStatus;
  size?: "sm" | "md";
}) {
  return (
    <Badge
      size="sm"
      variant={compatibilityVariant[value]}
      class={compatibilityBadgeClass(value, size)}
    >
      <span class="ph-badge-glyph" aria-hidden="true">
        {compatibilityGlyph[value]}
      </span>
      <span>{compatibilityStatusLabel(value)}</span>
    </Badge>
  );
}

const qualityBadgeGlyph: Record<LibraryQualityBadge, string> = {
  "verified-for-preact": "✓",
  "ssr-ready": "⚡",
  "signals-compatible": "◈",
  "tree-shakeable": "▴",
  "docs-complete": "📚",
  "ai-ready": "✦",
};

export function MaintenanceBadge({ value }: { value: MaintenanceStatus }) {
  return (
    <Badge size="sm" variant={maintenanceVariant[value]} class={`ph-badge ph-status-badge ph-status-${value}`}>
      <span class="ph-status-dot" aria-hidden="true">●</span>
      <span>{maintenanceStatusLabel(value)}</span>
    </Badge>
  );
}

/** @deprecated Use MaintenanceBadge */
export const StatusBadge = MaintenanceBadge;

export function QualityBadge({ value }: { value: LibraryQualityBadge }) {
  return (
    <Badge size="sm" variant="outline" class={`ph-badge ph-quality-badge ph-quality-${value}`}>
      <span class="ph-badge-glyph" aria-hidden="true">{qualityBadgeGlyph[value]}</span>
      <span>{qualityBadgeLabel(value)}</span>
    </Badge>
  );
}
