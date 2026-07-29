import { useMemo, useState } from "preact/hooks";
import {
  buildDetailTocEntries,
  groupEditorialSections,
  LIBRARY_DETAIL_TABS,
  type DetailTabId,
} from "../../../src/lib/detail-sections";
import {
  buildLibraryExternalLinks,
  resolveInstallCommand,
  type LibraryEditorialContent,
} from "../../../src/lib/library-detail";
import { categoryRoute, type LibraryCategory } from "../../../src/lib/categories";
import type { PreactLibrary, ResolvedAlternative } from "../../../src/lib/libraries";
import { DetailAlternativesList, DetailEditorialGroups, DetailLimitations } from "./DetailEditorialGroups";
import { DetailHero } from "./DetailHero";
import { DetailQuickStart } from "./DetailQuickStart";
import { DetailSidebar } from "./DetailSidebar";
import { DetailStickyNav, DetailTabPanel } from "./DetailStickyNav";
import { AiToolDetailPage } from "./AiToolDetailPage";

export function LibraryDetailPage({
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
  if (library.catalogDomain === "ai") {
    return (
      <AiToolDetailPage
        library={library}
        category={category}
        alternatives={alternatives}
        relatedProjects={relatedProjects}
        editorial={editorial}
      />
    );
  }

  return (
    <LibraryDetailPageInner
      library={library}
      category={category}
      alternatives={alternatives}
      relatedProjects={relatedProjects}
      editorial={editorial}
    />
  );
}

function LibraryDetailPageInner({
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
  const installCommand = resolveInstallCommand(library);
  const showViteConfig = library.compatibilityStatus === "compat";
  const hasSetup = Boolean(installCommand || showViteConfig || editorial.example);

  const overviewGroups = useMemo(
    () => groupEditorialSections(
      editorial.supplementalSections.filter((section) =>
        /introduction|overview|about/i.test(section.title),
      ),
    ),
    [editorial.supplementalSections],
  );

  const compatibilityGroups = useMemo(
    () => groupEditorialSections(
      editorial.supplementalSections.filter((section) =>
        !/introduction|overview|about/i.test(section.title),
      ),
    ),
    [editorial.supplementalSections],
  );

  const hasCompatibilityContent = compatibilityGroups.length > 0 || editorial.limitations.length > 0;
  const hasAlternatives = alternatives.length > 0 || relatedProjects.length > 0;

  const tabs = useMemo(
    () => buildDetailTocEntries(LIBRARY_DETAIL_TABS, hasSetup, hasCompatibilityContent, hasAlternatives),
    [hasSetup, hasCompatibilityContent, hasAlternatives],
  );

  const [activeTab, setActiveTab] = useState<DetailTabId>(tabs[0]?.id ?? "overview");

  return (
    <article class="ph-library-page">
      <DetailHero
        library={library}
        category={category}
        links={links}
        installCommand={installCommand}
        alternatives={alternatives}
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
          </DetailTabPanel>

          <DetailTabPanel id="setup" activeTab={activeTab} hidden={!hasSetup}>
            <DetailQuickStart
              installCommand={installCommand}
              showViteConfig={showViteConfig}
              example={editorial.example}
            />
          </DetailTabPanel>

          <DetailTabPanel id="compatibility" activeTab={activeTab} hidden={!hasCompatibilityContent}>
            <DetailEditorialGroups groups={compatibilityGroups} />
            <DetailLimitations limitations={editorial.limitations} slug={library.slug} />
          </DetailTabPanel>

          <DetailTabPanel id="alternatives" activeTab={activeTab} hidden={!hasAlternatives}>
            <DetailAlternativesList
              librarySlug={library.slug}
              alternatives={alternatives}
              categoryLink={category ? { href: categoryRoute(category.slug), label: category.name } : undefined}
              browseMoreSuffix={<> or explore the full <a href="/libraries">library directory</a>.</>}
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

        <DetailSidebar library={library} alternatives={alternatives} />
      </section>
    </article>
  );
}

export { LibraryNotFound } from "./LibraryNotFound";
