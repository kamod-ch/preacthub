import type { CompatibilityStatus } from "../../../src/lib/libraries";

export function compatibilityBadgeClass(value: CompatibilityStatus, size: "sm" | "md" = "sm"): string {
  const sizeClass = size === "md" ? " ph-compat-badge-md" : "";
  return `ph-badge ph-compat-badge ph-badge-${value}${sizeClass}`;
}

export function compatibilityCalloutClass(value: CompatibilityStatus): string {
  return `ph-compatibility-callout ph-compatibility-callout--${value}`;
}

export function compatibilityPillClass(value: CompatibilityStatus | "all"): string {
  if (value === "all") return "ph-compat-pill";
  return `ph-compat-pill ph-compat-pill--${value}`;
}

export function compatibilityFilterChipClass(value: CompatibilityStatus): string {
  return `ph-active-filter-chip ph-active-filter-chip--${value}`;
}
