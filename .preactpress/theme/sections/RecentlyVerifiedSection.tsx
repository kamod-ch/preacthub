import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import { LibraryCard } from "../libraries/LibraryCard";
import type { LibraryDirectoryMeta } from "../types";

export const RecentlyVerifiedSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => {
  const recentlyVerified = directory.home?.recentlyVerified ?? [];
  if (!recentlyVerified.length) return null;

  return (
    <section class="ph-section ph-landing-section" aria-labelledby="recently-verified-title">
      <div class="ph-section-header">
        <div>
          <div class="ph-section-eyebrow">Fresh checks</div>
          <h2 id="recently-verified-title">Recently verified</h2>
          <p class="ph-muted">Libraries with the most recent compatibility review in the catalog.</p>
        </div>
        <Button href="/libraries?sort=recently-verified" variant="ghost" size="sm">View all</Button>
      </div>
      <div class="ph-library-grid">
        {recentlyVerified.map((library) => <LibraryCard key={library.slug} library={library} />)}
      </div>
    </section>
  );
};
