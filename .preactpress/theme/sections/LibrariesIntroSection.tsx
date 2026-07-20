import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import type { LibraryDirectoryMeta } from "../types";

export const LibrariesIntroSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => (
  <section class="ph-page-intro ph-libraries-intro">
    <div class="ph-section-eyebrow">Directory</div>
    <h1>Find Preact libraries that actually work</h1>
    <p class="ph-muted">
      Search {directory.stats.total} curated entries by compatibility, maintenance, TypeScript and SSR support.
    </p>
    <div class="ph-hero-actions">
      <Button href="#all-libraries-title" class="ph-button-primary">Browse libraries</Button>
      <Button href="/submit" variant="outline">Submit a library</Button>
      <Button href="/methodology" variant="ghost">Methodology</Button>
    </div>
  </section>
);
