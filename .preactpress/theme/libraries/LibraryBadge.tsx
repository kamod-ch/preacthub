import { Badge } from "@kamod-ch/ui";
import {
  compatibilityStatusLabel,
  maintenanceStatusLabel,
  qualityBadgeLabel,
  type CompatibilityStatus,
  type LibraryQualityBadge,
  type MaintenanceStatus,
} from "../../../src/lib/libraries";

const compatibilityVariant: Record<CompatibilityStatus, "secondary" | "outline" | "warning" | "destructive"> = {
  native: "secondary",
  compat: "outline",
  "community-tested": "secondary",
  experimental: "warning",
  unverified: "outline",
  inactive: "destructive",
};

const maintenanceVariant: Record<MaintenanceStatus, "secondary" | "outline" | "warning" | "destructive"> = {
  active: "secondary",
  maintenance: "outline",
  inactive: "warning",
  archived: "destructive",
  unknown: "outline",
};

export function CompatibilityBadge({ value }: { value: CompatibilityStatus }) {
  return (
    <Badge
      size="sm"
      variant={compatibilityVariant[value]}
      class={`ph-badge ph-badge-${value}`}
    >
      <span class="ph-badge-glyph" aria-hidden="true">
        {value === "native"
          ? "◆"
          : value === "compat" || value === "community-tested"
            ? "◇"
            : value === "experimental"
              ? "◈"
              : value === "inactive"
                ? "✕"
                : "?"}
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
