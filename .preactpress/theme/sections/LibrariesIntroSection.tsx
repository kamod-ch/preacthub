import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import type { LibraryDirectoryMeta } from "../types";
import { DirectorySearchBar } from "../libraries/DirectorySearchBar";

export const LibrariesIntroSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => (
  <section class="ph-page-intro ph-libraries-intro">
    <div class="ph-section-eyebrow">Directory</div>
    <h1>Find Preact libraries that actually work</h1>
    <p class="ph-muted">
      Search {directory.stats.total} curated entries by compatibility, maintenance, TypeScript and SSR support.
    </p>
    <DirectorySearchBar
      mode="directory"
      libraries={directory.libraries}
      showPopularTags
    />
    <div class="ph-hero-actions">
      <Button href="/submit" variant="outline">Submit a library</Button>
      <Button href="/methodology" variant="ghost">Methodology</Button>
    </div>
  </section>
);
