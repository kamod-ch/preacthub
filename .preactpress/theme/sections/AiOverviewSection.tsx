import type { FunctionalComponent } from "preact";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import { aiCategories } from "../../../src/lib/categories";
import type { LibraryDirectoryMeta } from "../types";
import { CategoryCard } from "../libraries/CategoryCard";
import { LibraryCard } from "../libraries/LibraryCard";
import { DirectorySearchBar } from "../libraries/DirectorySearchBar";

function ToolSection({
  title,
  description,
  libraries,
  id,
}: {
  title: string;
  description?: string;
  libraries: LibraryDirectoryMeta["libraries"];
  id: string;
}) {
  if (!libraries.length) return null;
  return (
    <section class="ph-ai-section" aria-labelledby={id}>
      <div class="ph-section-header">
        <h2 id={id}>{title}</h2>
        {description ? <p class="ph-muted">{description}</p> : null}
      </div>
      <div class="ph-library-grid">
        {libraries.slice(0, 6).map((library) => (
          <LibraryCard key={library.slug} library={library} />
        ))}
      </div>
    </section>
  );
}

export const AiOverviewSection: FunctionalComponent<{
  directory: LibraryDirectoryMeta;
}> = ({ directory }) => {
  const aiLibraries = directory.libraries;
  const featured = aiLibraries.filter((l) => l.featured);
  const openSource = aiLibraries.filter((l) => l.openSource || l.hostingType === "open-source");
  const typescript = aiLibraries.filter(
    (l) =>
      l.typescriptSupport === "native" ||
      l.typescriptSupport === "bundled-types" ||
      l.typescriptSupport === "external-types",
  );
  const mcp = aiLibraries.filter((l) => l.mcpSupport);
  const recentlyUpdated = [...aiLibraries]
    .filter((l) => l.lastCommitAt || l.lastReleaseAt)
    .sort((a, b) => {
      const dateA = [a.lastCommitAt, a.lastReleaseAt].filter(Boolean).sort().reverse()[0] ?? "";
      const dateB = [b.lastCommitAt, b.lastReleaseAt].filter(Boolean).sort().reverse()[0] ?? "";
      return dateB.localeCompare(dateA);
    });

  const aiCategorySummaries = directory.categories.filter((c) =>
    aiCategories.some((ac) => ac.slug === c.slug),
  );

  return (
    <>
      <section class="ph-hero ph-ai-hero" aria-labelledby="ai-hero-title">
        <div class="ph-section-eyebrow">AI Developer Tools</div>
        <h1 id="ai-hero-title">
          Discover curated <span class="ph-hero-accent">AI developer tools</span>
        </h1>
        <p class="ph-hero-lead">
          Browse AI infrastructure, agent frameworks, browser automation and developer APIs — curated alongside PreactHub&apos;s Preact library directory.
        </p>
        <DirectorySearchBar mode="directory" libraries={aiLibraries} />
        <div class="ph-hero-actions">
          <Button href="/submit" variant="outline">Submit a tool</Button>
        </div>
      </section>

      <section class="ph-ai-categories" aria-labelledby="ai-categories-title">
        <h2 id="ai-categories-title">AI categories</h2>
        <div class="ph-category-grid">
          {aiCategorySummaries.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <ToolSection
        id="ai-featured"
        title="Featured AI tools"
        libraries={featured.length ? featured : aiLibraries.slice(0, 6)}
      />

      <ToolSection
        id="ai-recent"
        title="Recently updated"
        description="Tools with recorded release or commit activity."
        libraries={recentlyUpdated}
      />

      <ToolSection
        id="ai-open-source"
        title="Open source AI tools"
        libraries={openSource}
      />

      <ToolSection
        id="ai-typescript"
        title="TypeScript AI tools"
        libraries={typescript}
      />

      {mcp.length ? (
        <ToolSection
          id="ai-mcp"
          title="MCP-compatible tools"
          libraries={mcp}
        />
      ) : null}

      <section class="ph-ai-submit-cta" aria-labelledby="ai-submit-title">
        <Card>
          <CardHeader>
            <CardTitle id="ai-submit-title">Missing a tool?</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="ph-muted">
              Suggest AI infrastructure, frameworks, APIs or automation tools for the PreactHub catalog.
            </p>
            <Button href="/submit" class="ph-button-primary">Submit a tool</Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
