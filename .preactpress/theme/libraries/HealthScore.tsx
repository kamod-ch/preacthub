import { Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import type { HealthScoreResult } from "../../../src/lib/libraries";

export function HealthScore({ value }: { value: HealthScoreResult }) {
  return (
    <Card>
      <CardHeader>
        <div class="ph-section-eyebrow ph-section-eyebrow-muted">Score</div>
        <CardTitle class="ph-card-title-row">
          <span>Directory score</span>
          <span class="ph-score-value">{value.score}/100</span>
        </CardTitle>
      </CardHeader>
      <CardContent class="ph-meta-list">
        <p class="ph-muted">
          A transparent editorial score based on compatibility, maintenance status, TypeScript, SSR, islands, ESM and verification freshness.
        </p>
        <details class="ph-score-details">
          <summary class="ph-inline-button">How this score is calculated</summary>
          <p class="ph-muted">
            Compatibility max 35, status max 20, TypeScript 10, SSR 10, islands 10, ESM 5 and verification freshness 10 points.
          </p>
        </details>
      </CardContent>
    </Card>
  );
}
