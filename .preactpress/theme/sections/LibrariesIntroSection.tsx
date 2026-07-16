import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import type { LibraryDirectoryMeta } from "../types";

export const LibrariesIntroSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => (
  <section class="ph-page-intro ph-libraries-intro">
    <div class="ph-section-eyebrow">Directory</div>
    <h1>Preact library directory</h1>
    <p class="ph-muted">
      {directory.stats.total} curated entries with compatibility ratings, SSR guidance and practical setup notes for real Preact projects.
    </p>
    <div class="ph-hero-actions">
      <Button href="#all-libraries-title" class="ph-button-primary">Browse libraries</Button>
      <Button href="#categories" variant="outline" class="ph-button-secondary">View categories</Button>
    </div>
  </section>
);
