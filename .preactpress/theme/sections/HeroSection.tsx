import type { FunctionalComponent } from "preact";
import { Badge, Button } from "@kamod-ch/ui";
import type { LibraryDirectoryMeta } from "../types";
import { DirectorySearchBar } from "../libraries/DirectorySearchBar";

export const HeroSection: FunctionalComponent<{
  directory: LibraryDirectoryMeta;
}> = ({ directory }) => (
  <section class="ph-hero ph-home-hero" aria-labelledby="home-hero-title">
    <div class="ph-hero-grid-bg" aria-hidden="true" />
    <Badge variant="outline" class="ph-hero-badge">
      <span class="ph-hero-badge-inner">
        <span class="ph-hero-badge-dot" aria-hidden="true" />
        Curated Preact library directory
      </span>
    </Badge>
    <h1 id="home-hero-title">
      Find Preact libraries that <span class="ph-hero-accent">actually work</span>
    </h1>
    <p class="ph-hero-lead">
      Discover the best Preact, frontend and AI developer tools with compatibility notes and curated categories.
    </p>
    <DirectorySearchBar
      mode="home"
      libraries={directory.libraries}
      showPopularTags
    />
    <div class="ph-hero-actions">
      <Button href="/libraries" variant="outline">Browse all</Button>
      <Button href="/submit" variant="ghost">Submit a library</Button>
    </div>
    <p class="ph-hero-meta ph-muted">
      {directory.stats.total} libraries across {directory.stats.categories} categories.
    </p>
  </section>
);
