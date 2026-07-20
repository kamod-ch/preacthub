import type { FunctionalComponent } from "preact";
import { Button, Card, CardContent } from "@kamod-ch/ui";

export const CommunityCtaSection: FunctionalComponent = () => (
  <section class="ph-section ph-community-cta" aria-labelledby="community-cta-title">
    <Card class="ph-community-cta-card">
      <CardContent class="ph-community-cta-content">
        <div>
          <div class="ph-section-eyebrow">Community</div>
          <h2 id="community-cta-title">Help keep the catalog accurate</h2>
          <p class="ph-muted">
            Submit a new library, report outdated compatibility notes, or suggest corrections through GitHub.
          </p>
        </div>
        <div class="ph-hero-actions">
          <Button href="/submit" class="ph-button-primary">Submit a library</Button>
          <Button href="/methodology" variant="outline">Read methodology</Button>
          <Button href="https://github.com/kamod-ch/preacthub/issues/new?template=library-correction.yml" variant="outline" target="_blank" rel="noopener noreferrer">
            Report outdated info
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>
);
