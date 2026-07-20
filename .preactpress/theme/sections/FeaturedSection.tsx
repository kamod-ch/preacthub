import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import { LibraryCard } from "../libraries/LibraryCard";
import type { LibraryDirectoryMeta } from "../types";

export const FeaturedSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => {
  const featuredLibraries = directory.featured.slice(0, 6);
  if (!featuredLibraries.length) return null;

  return (
    <section class="ph-section ph-landing-section" aria-labelledby="featured-libraries-title">
      <div class="ph-section-header">
        <div>
          <div class="ph-section-eyebrow">Featured</div>
          <h2 id="featured-libraries-title">Recommended libraries</h2>
          <p class="ph-muted">Editor picks that are especially relevant for modern Preact projects.</p>
        </div>
        <Button href="/libraries" variant="ghost" size="sm">View all</Button>
      </div>
      <div class="ph-library-grid">
        {featuredLibraries.map((library) => <LibraryCard key={library.slug} library={library} />)}
      </div>
    </section>
  );
};
