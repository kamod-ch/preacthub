import type { FunctionalComponent } from "preact";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import { syncdingLinks } from "../../../src/lib/syncding-links";

export const KamodEcosystemSection: FunctionalComponent = () => (
  <section class="ph-section ph-landing-section ph-ecosystem-section" aria-labelledby="kamod-ecosystem-title">
    <div class="ph-section-header">
      <div>
        <div class="ph-section-eyebrow">From Kamod</div>
        <h2 id="kamod-ecosystem-title">Tools from the same studio</h2>
        <p class="ph-muted">PreactHub is maintained by Kamod. These sibling projects may also be useful.</p>
      </div>
    </div>
    <div class="ph-ecosystem-grid">
      <Card class="ph-ecosystem-card ph-ecosystem-card-featured">
        <CardHeader>
          <CardTitle>Syncding</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="ph-muted">
            Keep project folders in sync across laptop, phone and desktop with a managed Syncthing hub — from €5/month.
          </p>
          <ul class="ph-ecosystem-feature-list">
            <li>Always-on hub, zero server ops</li>
            <li>ZFS snapshots for accidental deletes</li>
            <li>Built on Syncthing. Managed by Syncding.</li>
          </ul>
          <div class="ph-hero-actions ph-ecosystem-actions">
            <Button href={syncdingLinks.ecosystemCta} target="_blank" rel="noopener noreferrer" class="ph-button-primary">
              Create your Syncding server
            </Button>
            <Button href={syncdingLinks.ecosystemPricing} variant="outline" target="_blank" rel="noopener noreferrer">
              See pricing
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card class="ph-ecosystem-card">
        <CardHeader>
          <CardTitle>PreactPress</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="ph-muted">
            Static site generator for documentation, blogs and project pages — the stack PreactHub runs on.
          </p>
          <div class="ph-hero-actions ph-ecosystem-actions">
            <Button
              href="https://kamod-ch.github.io/preactpress/"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read docs
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card class="ph-ecosystem-card">
        <CardHeader>
          <CardTitle>Kamod AI Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="ph-muted">
            Audit documentation and marketing sites for AI-agent readiness, SEO and content quality.
          </p>
          <div class="ph-hero-actions ph-ecosystem-actions">
            <Button href="/libraries/kamod-ai-audit" variant="outline">
              View in catalog
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);
