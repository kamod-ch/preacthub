import { Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import type { HealthScoreResult } from "../../../src/lib/libraries";

const breakdownLabels: Array<{ key: keyof HealthScoreResult["breakdown"]; label: string; max: number }> = [
  { key: "compatibility", label: "Compatibility", max: 35 },
  { key: "status", label: "Status", max: 20 },
  { key: "typescript", label: "TypeScript", max: 10 },
  { key: "ssr", label: "SSR", max: 10 },
  { key: "islands", label: "Islands", max: 10 },
  { key: "esm", label: "ESM", max: 5 },
  { key: "freshness", label: "Verification", max: 10 },
];

export function HealthScore({ value, compact = false }: { value: HealthScoreResult; compact?: boolean }) {
  return (
    <Card class={compact ? "ph-health-score-compact" : undefined}>
      <CardHeader>
        <div class="ph-section-eyebrow ph-section-eyebrow-muted">Score</div>
        <CardTitle class="ph-card-title-row">
          <span>Directory score</span>
          <span class="ph-score-value">{value.score}/100</span>
        </CardTitle>
      </CardHeader>
      <CardContent class="ph-meta-list">
        {!compact ? (
          <p class="ph-muted">
            A transparent editorial score based on compatibility, maintenance status, TypeScript, SSR, islands, ESM and verification freshness.
          </p>
        ) : null}
        <div class="ph-score-breakdown" aria-label="Score breakdown">
          {breakdownLabels.map(({ key, label, max }) => {
            const points = value.breakdown[key];
            const pct = max > 0 ? Math.round((points / max) * 100) : 0;
            return (
              <div class="ph-score-bar-row" key={key}>
                <div class="ph-score-bar-head">
                  <span>{label}</span>
                  <span>{points}/{max}</span>
                </div>
                <div class="ph-score-bar-track" role="presentation">
                  <div class="ph-score-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
