import { Badge } from "@kamod-ch/ui";
import {
  compatibilityLabel,
  qualityBadgeLabel,
  statusLabel,
  type LibraryCompatibility,
  type LibraryQualityBadge,
  type LibraryStatus,
} from "../../../src/lib/libraries";

const compatibilityVariant: Record<LibraryCompatibility, "secondary" | "outline" | "warning" | "destructive"> = {
  native: "secondary",
  compat: "outline",
  partial: "warning",
  incompatible: "destructive",
  unknown: "outline",
};

const statusVariant: Record<LibraryStatus, "secondary" | "outline" | "warning" | "destructive"> = {
  recommended: "secondary",
  stable: "outline",
  experimental: "warning",
  deprecated: "destructive",
};

export function CompatibilityBadge({ value }: { value: LibraryCompatibility }) {
  return (
    <Badge
      size="sm"
      variant={compatibilityVariant[value]}
      class={`ph-badge ph-badge-${value}`}
    >
      <span class="ph-badge-glyph" aria-hidden="true">{value === "native" ? "◆" : value === "compat" ? "◇" : value === "partial" ? "◈" : value === "incompatible" ? "✕" : "?"}</span>
      <span>{compatibilityLabel(value)}</span>
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

export function StatusBadge({ value }: { value: LibraryStatus }) {
  return (
    <Badge size="sm" variant={statusVariant[value]} class={`ph-badge ph-status-badge ph-status-${value}`}>
      <span class="ph-status-dot" aria-hidden="true">●</span>
      <span>{statusLabel(value)}</span>
    </Badge>
  );
}

export function QualityBadge({ value }: { value: LibraryQualityBadge }) {
  return (
    <Badge size="sm" variant="outline" class={`ph-badge ph-quality-badge ph-quality-${value}`}>
      <span class="ph-badge-glyph" aria-hidden="true">{qualityBadgeGlyph[value]}</span>
      <span>{qualityBadgeLabel(value)}</span>
    </Badge>
  );
}
