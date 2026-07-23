import type { FunctionalComponent } from "preact";
import { Button } from "@kamod-ch/ui";
import { LibraryCard } from "../libraries/LibraryCard";
import { TrustMarker } from "../libraries/TrustMarker";
import type { LibraryDirectoryMeta } from "../types";

export const NativeLibrariesSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => {
  const nativeLibraries = directory.home?.nativeLibraries ?? [];
  if (!nativeLibraries.length) return null;

  return (
    <section class="ph-section ph-landing-section" aria-labelledby="native-libraries-title">
      <div class="ph-section-header">
        <div>
          <div class="ph-section-header-title-row">
            <TrustMarker kind="native" size="lg" />
          </div>
          <h2 id="native-libraries-title">Built for Preact</h2>
          <p class="ph-muted">Libraries designed for Preact without relying on preact/compat.</p>
        </div>
        <Button href="/libraries?compatibilityStatus=native" variant="ghost" size="sm">Browse native</Button>
      </div>
      <div class="ph-library-grid">
        {nativeLibraries.map((library) => (
          <LibraryCard key={library.slug} library={library} trustMarker="native" />
        ))}
      </div>
    </section>
  );
};
