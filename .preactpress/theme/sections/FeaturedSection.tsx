import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import { LibraryCard } from "../libraries/LibraryCard";
import type { LibraryDirectoryMeta } from "../types";

export const FeaturedSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => {
  const featuredLibraries = directory.featured.slice(0, 6);
  const viewAllHref = directory.libraries.length ? "#all-libraries-title" : "/libraries";

  return (
    <section class="ph-section ph-landing-section">
      <div class="ph-section-header">
        <div>
          <div class="ph-section-eyebrow">Featured</div>
          <h2>Editor picks</h2>
          <p class="ph-muted">Battle-tested libraries that are especially relevant for modern Preact projects.</p>
        </div>
        <Button href={viewAllHref} variant="ghost" size="sm">View all</Button>
      </div>
      <div class="ph-library-grid">
        {featuredLibraries.map((library) => <LibraryCard key={library.slug} library={library} />)}
      </div>
    </section>
  );
};
