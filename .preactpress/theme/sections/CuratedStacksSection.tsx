import type { FunctionalComponent } from "preact";
import { Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import type { LibraryDirectoryMeta } from "../types";

export const CuratedStacksSection: FunctionalComponent<{ directory: LibraryDirectoryMeta }> = ({ directory }) => {
  const stacks = directory.home?.stacks ?? [];
  if (!stacks.length) return null;

  return (
    <section class="ph-section ph-landing-section" aria-labelledby="curated-stacks-title">
      <div class="ph-section-header">
        <div>
          <div class="ph-section-eyebrow">Stacks</div>
          <h2 id="curated-stacks-title">Curated stacks</h2>
          <p class="ph-muted">Starter combinations of libraries that work well together in Preact projects.</p>
        </div>
      </div>
      <div class="ph-stack-grid">
        {stacks.map((stack) => (
          <Card key={stack.slug} class="ph-stack-card">
            <CardHeader>
              <CardTitle>{stack.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="ph-muted">{stack.description}</p>
              <ul class="ph-stack-library-list">
                {stack.librarySlugs.map((slug) => {
                  const library = directory.libraries.find((entry) => entry.slug === slug);
                  if (!library) return null;
                  return (
                    <li key={slug}>
                      <a href={library.route}>{library.name}</a>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
