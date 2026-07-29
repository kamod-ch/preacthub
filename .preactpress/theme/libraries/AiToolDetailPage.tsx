import { Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import { useMemo, useState } from "preact/hooks";
import {
  AI_DETAIL_TABS,
  buildDetailTocEntries,
  groupEditorialSections,
  type DetailTabId,
} from "../../../src/lib/detail-sections";
import {
  buildLibraryExternalLinks,
  type LibraryEditorialContent,
} from "../../../src/lib/library-detail";
import { categoryRoute, type LibraryCategory } from "../../../src/lib/categories";
import {
  buildMaintenanceSignals,
  computedMaintenanceLabel,
} from "../../../src/lib/maintenance-computed";
import {
  hostingTypeLabel,
  pricingModelLabel,
  projectTypeLabel,
} from "../../../src/lib/project-types";
import type { PreactLibrary, ResolvedAlternative } from "../../../src/lib/libraries";
import { DetailAlternativesList, DetailEditorialGroups } from "./DetailEditorialGroups";
import { DetailHero } from "./DetailHero";
import { DetailCorrectionAlert } from "./DetailSidebar";
import { compareUrl } from "../../../src/lib/libraries";
import { DetailStickyNav, DetailTabPanel } from "./DetailStickyNav";

function FeatureChip({ label }: { label: string }) {
  return <span class="ph-feature-chip">{label}</span>;
}

function AiDetailSidebar({
  library,
  alternatives,
  maintenance,
}: {
  library: PreactLibrary;
  alternatives: ResolvedAlternative[];
  maintenance: ReturnType<typeof buildMaintenanceSignals>;
}) {
  return (
    <aside class="ph-detail-sidebar ph-detail-sidebar-sticky">
      <Card>
        <CardHeader>
          <CardTitle>Tool profile</CardTitle>
        </CardHeader>
        <CardContent class="ph-ai-profile">
          {library.projectType ? (
            <div><span>Type</span><strong>{projectTypeLabel(library.projectType)}</strong></div>
          ) : null}
          {library.hostingType ? (
            <div><span>Hosting</span><strong>{hostingTypeLabel(library.hostingType)}</strong></div>
          ) : null}
          {library.pricing?.model ? (
            <div><span>Pricing</span><strong>{pricingModelLabel(library.pricing.model)}</strong></div>
          ) : null}
          <div><span>Status</span><strong>{computedMaintenanceLabel(maintenance.computedStatus)}</strong></div>
          {library.languages?.length ? (
            <div><span>Languages</span><strong>{library.languages.join(", ")}</strong></div>
          ) : null}
          {library.openSource !== undefined ? (
            <div><span>Open source</span><strong>{library.openSource ? "Yes" : "No"}</strong></div>
          ) : null}
        </CardContent>
      </Card>

      {library.supportedProviders?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Providers</CardTitle>
          </CardHeader>
          <CardContent class="ph-tag-list">
            {library.supportedProviders.map((provider) => (
              <FeatureChip key={provider} label={provider} />
            ))}
          </CardContent>
        </Card>
      ) : null}

      {library.tags.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Topics</CardTitle>
          </CardHeader>
          <CardContent class="ph-tag-list">
            {library.tags.map((tag) => (
              <a key={tag} href={`/libraries?q=${encodeURIComponent(tag)}`}>{tag}</a>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {alternatives.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Similar tools</CardTitle>
          </CardHeader>
          <CardContent class="ph-detail-sidebar-alts">
            {alternatives.slice(0, 4).map((entry) => (
              <div class="ph-detail-sidebar-alt" key={entry.route}>
                <a href={entry.route}>{entry.name}</a>
                <a class="ph-alt-compare" href={compareUrl(library.slug, entry.slug)}>Compare</a>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <DetailCorrectionAlert library={library} />
    </aside>
  );
}

export function AiToolDetailPage({
  library,
  category,
  alternatives,
  relatedProjects = [],
  editorial,
}: {
  library: PreactLibrary;
  category?: LibraryCategory;
  alternatives: ResolvedAlternative[];
  relatedProjects?: PreactLibrary[];
  editorial: LibraryEditorialContent;
}) {
  const links = buildLibraryExternalLinks(library);
  const maintenance = buildMaintenanceSignals(library);

  const overviewGroups = useMemo(
    () => groupEditorialSections(
      editorial.supplementalSections.filter((section) =>
        /introduction|overview|about/i.test(section.title),
      ),
    ),
    [editorial.supplementalSections],
  );

  const detailGroups = useMemo(
    () => groupEditorialSections(
      editorial.supplementalSections.filter((section) =>
        !/introduction|overview|about/i.test(section.title),
      ),
    ),
    [editorial.supplementalSections],
  );

  const hasIntegration = Boolean(
    library.languages?.length ||
    library.runtimes?.length ||
    library.mcpSupport ||
    editorial.example,
  );

  const hasDetails = Boolean(
    detailGroups.length ||
    library.useCases?.length ||
    library.keyFeatures?.length ||
    library.pricing?.model,
  );

  const hasAlternatives = alternatives.length > 0 || relatedProjects.length > 0;

  const tabs = useMemo(
    () => buildDetailTocEntries(AI_DETAIL_TABS, hasIntegration, hasDetails, hasAlternatives),
    [hasIntegration, hasDetails, hasAlternatives],
  );

  const [activeTab, setActiveTab] = useState<DetailTabId>(tabs[0]?.id ?? "overview");

  return (
    <article class="ph-library-page ph-ai-detail-page">
      <DetailHero
        library={library}
        category={category}
        links={links}
        alternatives={alternatives}
        isAi
        verdictLabel={computedMaintenanceLabel(maintenance.computedStatus)}
        verdictDescription={
          library.pricing?.model
            ? `${pricingModelLabel(library.pricing.model)} · ${projectTypeLabel(library.projectType ?? "api")}`
            : undefined
        }
      />

      <DetailStickyNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <section class="ph-detail-grid">
        <div class="ph-detail-main">
          <DetailTabPanel id="overview" activeTab={activeTab}>
            {editorial.whenToUse ? (
              <section class="ph-detail-section ph-detail-section-intro" aria-labelledby={`${library.slug}-when-to-use`}>
                <h2 id={`${library.slug}-when-to-use`}>When to use it</h2>
                <p>{editorial.whenToUse}</p>
              </section>
            ) : null}
            <DetailEditorialGroups groups={overviewGroups} />

            {library.useCases?.length ? (
              <section class="ph-detail-section" aria-labelledby={`${library.slug}-use-cases`}>
                <h2 id={`${library.slug}-use-cases`}>Use cases</h2>
                <div class="ph-feature-grid">
                  {library.useCases.map((item) => <FeatureChip key={item} label={item} />)}
                </div>
              </section>
            ) : null}
          </DetailTabPanel>

          <DetailTabPanel id="setup" activeTab={activeTab} hidden={!hasIntegration}>
            <Card>
              <CardHeader>
                <CardTitle>Integration</CardTitle>
              </CardHeader>
              <CardContent class="ph-ai-integration">
                {library.languages?.length ? (
                  <div><span>Languages</span><strong>{library.languages.join(", ")}</strong></div>
                ) : null}
                {library.runtimes?.length ? (
                  <div><span>Runtimes</span><strong>{library.runtimes.join(", ")}</strong></div>
                ) : null}
                {library.mcpSupport ? (
                  <div><span>MCP support</span><strong>Available</strong></div>
                ) : null}
                {editorial.example ? (
                  <p class="ph-muted">See official documentation for current SDK examples and authentication flows.</p>
                ) : null}
              </CardContent>
            </Card>
          </DetailTabPanel>

          <DetailTabPanel id="compatibility" activeTab={activeTab} hidden={!hasDetails}>
            {library.keyFeatures?.length ? (
              <section class="ph-detail-section" aria-labelledby={`${library.slug}-key-features`}>
                <h2 id={`${library.slug}-key-features`}>Key features</h2>
                <div class="ph-feature-grid">
                  {library.keyFeatures.map((item) => <FeatureChip key={item} label={item} />)}
                </div>
              </section>
            ) : null}

            {library.pricing?.model ? (
              <section class="ph-detail-section" aria-labelledby={`${library.slug}-pricing`}>
                <h2 id={`${library.slug}-pricing`}>Pricing</h2>
                <p>{pricingModelLabel(library.pricing.model)}</p>
              </section>
            ) : null}

            <DetailEditorialGroups groups={detailGroups} />

            <section class="ph-detail-section" aria-labelledby={`${library.slug}-maintenance`}>
              <h2 id={`${library.slug}-maintenance`}>Maintenance signals</h2>
              <ul class="ph-limitations-list">
                <li>License: {maintenance.hasLicense ? "Available" : "Not recorded"}</li>
                <li>Documentation: {maintenance.hasDocumentation ? "Available" : "Not recorded"}</li>
                <li>TypeScript support: {maintenance.typescriptSupport ? "Yes" : "No or unknown"}</li>
                {maintenance.openSource !== undefined ? (
                  <li>Open source: {maintenance.openSource ? "Yes" : "No"}</li>
                ) : null}
              </ul>
            </section>
          </DetailTabPanel>

          <DetailTabPanel id="alternatives" activeTab={activeTab} hidden={!hasAlternatives}>
            <DetailAlternativesList
              librarySlug={library.slug}
              alternatives={alternatives}
              categoryLink={category ? { href: categoryRoute(category.slug), label: category.name } : undefined}
              browseMoreSuffix={<> or explore <a href="/ai">AI tools</a>.</>}
            />
            {relatedProjects.length ? (
              <section class="ph-detail-section" aria-labelledby={`${library.slug}-related`}>
                <h2 id={`${library.slug}-related`}>Related projects</h2>
                <ul class="ph-alt-list ph-alt-list-detail">
                  {relatedProjects.map((entry) => (
                    <li class="ph-alt-item" key={entry.route}>
                      <a href={entry.route}>{entry.name}</a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </DetailTabPanel>
        </div>

        <AiDetailSidebar library={library} alternatives={alternatives} maintenance={maintenance} />
      </section>
    </article>
  );
}
