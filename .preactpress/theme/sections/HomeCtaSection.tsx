import type { FunctionalComponent } from "preact";
import { Button, Card, CardContent } from "@kamod-ch/ui";
import type { LibraryDirectoryMeta } from "../types";

export const HomeCtaSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => (
  <section class="ph-section ph-home-cta">
    <Card class="ph-home-cta-card">
      <CardContent class="ph-home-cta-content">
        <div>
          <div class="ph-section-eyebrow">Directory</div>
          <h2>Browse all {directory.stats.total} libraries</h2>
          <p class="ph-muted">
            Filter by compatibility, SSR support, TypeScript and category. Every entry includes setup notes and verified integration guidance.
          </p>
        </div>
        <Button href="/libraries" class="ph-button-primary">Start browsing libraries</Button>
      </CardContent>
    </Card>
  </section>
);
