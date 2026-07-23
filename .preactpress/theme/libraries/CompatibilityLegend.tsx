import { compatibilityStatusValues } from "../../../src/lib/libraries";
import { compatibilityStatusDescription } from "../../../src/lib/library-detail";
import { CompatibilityBadge } from "./LibraryBadge";

export function CompatibilityLegend({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div class="ph-compat-legend">
      <span class="ph-section-eyebrow ph-section-eyebrow-muted">Compatibility key</span>
      {compact ? (
        <div class="ph-card-badges">
          {compatibilityStatusValues.map((value) => (
            <CompatibilityBadge key={value} value={value} size="md" />
          ))}
        </div>
      ) : (
        <div class="ph-compat-legend-items">
          {compatibilityStatusValues.map((value) => (
            <div class="ph-compat-legend-item" key={value}>
              <CompatibilityBadge value={value} size="md" />
              <p>{compatibilityStatusDescription(value)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
