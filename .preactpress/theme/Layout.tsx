import type { FunctionalComponent } from "preact";
import { useEffect, useMemo } from "preact/hooks";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@kamod-ch/ui";
import { type LayoutProps } from "@kamod-ch/preactpress/client";
import { getCategory } from "../../src/lib/categories";
import { compareUrl, formatAuditSummary, formatDate } from "../../src/lib/libraries";
import { SiteBreadcrumbs } from "./libraries/Breadcrumbs";
import { CodeBlock } from "./libraries/CodeBlock";
import { HealthScore } from "./libraries/HealthScore";
import { CompatibilityBadge, QualityBadge, StatusBadge } from "./libraries/LibraryBadge";
import { LibraryCompare } from "./libraries/LibraryCompare";
import { LibraryFilters } from "./libraries/LibraryFilters";
import { SubmitForm } from "./libraries/SubmitForm";
import { CategoriesSection } from "./sections/CategoriesSection";
import { FeaturedSection } from "./sections/FeaturedSection";
import { HeroSection } from "./sections/HeroSection";
import { HomeCtaSection } from "./sections/HomeCtaSection";
import { LibrariesIntroSection } from "./sections/LibrariesIntroSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { StatsSection } from "./sections/StatsSection";
import type { ThemeMetaRecord } from "./types";
import { libraryLinks, tagUrl } from "./utils";
import { renderPageContent } from "./page-content";
import { startThemeSync } from "./theme-sync";
import "./theme.css";

const Layout: FunctionalComponent<LayoutProps> = ({ site, themeConfig, routePath, page }) => {
  useEffect(() => startThemeSync(), []);
  const meta = (page?.meta ?? {}) as ThemeMetaRecord;
  const directory = meta.libraryDirectory;
  const currentLibrary = meta.library;
  const compareLibraries = meta.compareLibraries;
  const currentCategory = meta.libraryCategory ?? directory?.currentCategory;
  const isLibrariesLanding = routePath === "/libraries";
  const isHome = routePath === "/";
  const isSubmit = routePath === "/libraries/submit";
  const isCompare = Boolean(compareLibraries);
  const isLibraryDetail = Boolean(currentLibrary);
  const isCategoryPage = Boolean(!currentLibrary && !isCompare && currentCategory);
  const showHomeLanding = Boolean(directory && isHome);
  const showLibrariesDirectory = Boolean(directory && (isLibrariesLanding || isCategoryPage));

  const renderedPage = renderPageContent(page);
  const alternatives = meta.libraryAlternatives ?? [];
  const score = meta.libraryHealthScore;
  const category = currentLibrary ? getCategory(currentLibrary.category) : currentCategory;
  const installCommand = currentLibrary?.packageName ? `npm install ${currentLibrary.packageName}` : undefined;
  const aliasSnippet = `resolve: {\n  alias: {\n    react: "preact/compat",\n    "react-dom/test-utils": "preact/test-utils",\n    "react-dom": "preact/compat",\n    "react/jsx-runtime": "preact/jsx-runtime"\n  }\n}`;

  const breadcrumbItems = useMemo(() => {
    if (isCompare && compareLibraries) {
      return [
        { label: "Home", href: "/" },
        { label: "Libraries", href: "/libraries" },
        { label: `${compareLibraries[0].name} vs ${compareLibraries[1].name}` },
      ];
    }
    if (!isLibraryDetail && !isCategoryPage) return [];
    return [
      { label: "Home", href: "/" },
      { label: "Libraries", href: "/libraries" },
      ...(category ? [{ label: category.name, href: `/libraries/${category.slug}` }] : []),
      ...(currentLibrary ? [{ label: currentLibrary.name }] : []),
    ];
  }, [category, compareLibraries, currentLibrary, isCategoryPage, isCompare, isLibraryDetail]);

  return (
    <div class="ph-site">
      <a class="ph-skip-link" href="#content">Skip to content</a>
      <SiteHeader site={site} themeConfig={themeConfig} routePath={routePath} />

      <main id="content" class="ph-shell ph-main">
        {breadcrumbItems.length > 0 ? <SiteBreadcrumbs items={breadcrumbItems} /> : null}

        {showHomeLanding && directory ? (
          <>
            <HeroSection directory={directory} isHome inlineDirectorySearch={false} />
            <StatsSection directory={directory} />
            <FeaturedSection directory={directory} />
            <CategoriesSection directory={directory} />
            <HomeCtaSection directory={directory} />
            <article class="ph-home-about ph-prose">{renderedPage}</article>
          </>
        ) : null}

        {isLibrariesLanding && directory ? <LibrariesIntroSection directory={directory} /> : null}

        {isCategoryPage && directory && currentCategory ? (
          <section class="ph-page-intro">
            <div class="ph-section-eyebrow">Category</div>
            <h1>{currentCategory.name}</h1>
            <p>{currentCategory.description}</p>
          </section>
        ) : null}

        {showLibrariesDirectory && directory ? <LibraryFilters directory={directory} /> : null}

        {isCompare && compareLibraries ? <LibraryCompare libraries={compareLibraries} /> : null}

        {isLibraryDetail && currentLibrary && score ? (
          <article class="ph-library-page">
            <section class="ph-library-header-grid">
              <div class="ph-library-header-main">
                <div class="ph-section-eyebrow">Library profile</div>
                <div class="ph-card-badges">
                  <CompatibilityBadge value={currentLibrary.compatibilityStatus} />
                  <StatusBadge value={currentLibrary.maintenanceStatus} />
                  <Badge variant="outline">{category?.name ?? currentLibrary.category}</Badge>
                </div>
                <h1>{currentLibrary.name}</h1>
                <p class="ph-library-lead">{currentLibrary.description}</p>
                {currentLibrary.packageName ? <p class="ph-package-name">{currentLibrary.packageName}</p> : null}
                <div class="ph-link-row">
                  {libraryLinks(currentLibrary).map((link) => (
                    <Button key={link.href} href={link.href} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">{link.label}</Button>
                  ))}
                  <Button href="/libraries" size="sm" class="ph-button-primary">Start browsing libraries</Button>
                </div>
                {currentLibrary.qualityBadges.length ? (
                  <div class="ph-quality-badge-list" aria-label="Quality badges">
                    {currentLibrary.qualityBadges.map((badge) => <QualityBadge key={badge} value={badge} />)}
                  </div>
                ) : null}
                {formatAuditSummary(currentLibrary) ? (
                  <p class="ph-audit-summary">
                    AI audit: <strong>{formatAuditSummary(currentLibrary)}</strong>
                    {currentLibrary.auditUrl ? (
                      <> · <a href={currentLibrary.auditUrl} target="_blank" rel="noopener noreferrer">View report</a></>
                    ) : null}
                  </p>
                ) : null}
                <div class="ph-library-meta-inline">
                  <span>Last verified: {formatDate(currentLibrary.lastVerifiedAt)}</span>
                  {currentLibrary.testedPreactVersions.length ? (
                    <span>Tested: Preact {currentLibrary.testedPreactVersions.join(", ")}</span>
                  ) : null}
                </div>
              </div>
              <HealthScore value={score} />
            </section>

            <section class="ph-detail-grid">
              <div class="ph-detail-main">
                {installCommand ? <CodeBlock title="Installation" code={installCommand} /> : null}
                {currentLibrary.compatibilityStatus === "compat" ? <CodeBlock title="Vite configuration" code={aliasSnippet} language="ts" /> : null}

                <section class="ph-detail-section-intro">
                  <div class="ph-section-eyebrow ph-section-eyebrow-muted">Implementation</div>
                  <h2>Setup and usage guide</h2>
                  <p class="ph-muted">Practical installation notes, compatibility guidance and content-specific implementation details.</p>
                </section>

                <section class="ph-library-article-shell">{renderedPage}</section>
              </div>

              <aside class="ph-detail-sidebar">
                <Card>
                  <CardHeader>
                    <div class="ph-section-eyebrow ph-section-eyebrow-muted">Metadata</div>
                    <CardTitle>Technical metadata</CardTitle>
                  </CardHeader>
                  <CardContent class="ph-meta-list">
                    <p><strong>Package:</strong> {currentLibrary.packageName ?? currentLibrary.slug}</p>
                    <p><strong>License:</strong> {currentLibrary.license ?? "Unknown"}</p>
                    <p><strong>Bundle size:</strong> {currentLibrary.bundleSize ?? "Not documented"}</p>
                    <p><strong>Repository:</strong> {currentLibrary.repositoryUrl ? <a href={currentLibrary.repositoryUrl} target="_blank" rel="noopener noreferrer">{currentLibrary.repositoryUrl}</a> : "—"}</p>
                    <p><strong>Documentation:</strong> {currentLibrary.documentationUrl ? <a href={currentLibrary.documentationUrl} target="_blank" rel="noopener noreferrer">{currentLibrary.documentationUrl}</a> : "—"}</p>
                  </CardContent>
                </Card>
                {currentLibrary.tags.length ? (
                  <Card>
                    <CardHeader>
                      <div class="ph-section-eyebrow ph-section-eyebrow-muted">Topics</div>
                      <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent class="ph-tag-list">
                      {currentLibrary.tags.map((tag) => (
                        <a key={tag} href={tagUrl(tag, false)}>{tag}</a>
                      ))}
                    </CardContent>
                  </Card>
                ) : null}
                {currentLibrary.limitations?.length ? (
                  <Alert variant="warning">
                    <strong>Known limitations</strong>
                    <ul>
                      {currentLibrary.limitations.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </Alert>
                ) : null}
                {alternatives.length ? (
                  <Card>
                    <CardHeader>
                      <div class="ph-section-eyebrow ph-section-eyebrow-muted">Related</div>
                      <CardTitle>Alternatives</CardTitle>
                    </CardHeader>
                    <CardContent class="ph-alt-list">
                      {alternatives.map((entry) => (
                        <div class="ph-alt-item" key={entry.route}>
                          <a href={entry.route}>{entry.name}</a>
                          <a class="ph-alt-compare" href={compareUrl(currentLibrary.slug, entry.slug)}>Compare</a>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : null}
              </aside>
            </section>
          </article>
        ) : null}

        {isSubmit && meta.librarySubmission ? (
          <section class="ph-submit-page">
            <div class="ph-page-intro">
              <div class="ph-section-eyebrow">Contribute</div>
              <h1>Submit a library</h1>
              <p>
                PreactHub is curated in GitHub. Fill in the form below to generate a prefilled issue with compatibility notes, a working example and known limitations.
              </p>
              <div class="ph-submit-intro-actions">
                <Button href={meta.librarySubmission.issueUrl} class="ph-button-primary">Create GitHub submission</Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <div class="ph-section-eyebrow ph-section-eyebrow-muted">Submission</div>
                <CardTitle>What to include</CardTitle>
              </CardHeader>
              <CardContent class="ph-prose">
                <ul>
                  <li>Library name, package name and repository</li>
                  <li>Category and Preact compatibility status</li>
                  <li>Tested Preact version and tested library version</li>
                  <li>Requested quality badges with evidence</li>
                  <li>SSR and islands notes</li>
                  <li>Known limitations and example repository</li>
                </ul>
                <SubmitForm issueUrl={meta.librarySubmission.issueUrl} />
              </CardContent>
            </Card>
          </section>
        ) : null}

        {!showHomeLanding && !showLibrariesDirectory && !isCategoryPage && !isLibraryDetail && !isSubmit && !isCompare ? (
          <article class="ph-generic-page">
            <header class="ph-page-intro">
              {page?.title ? <h1>{page.title}</h1> : null}
              {page?.description ? <p>{page.description}</p> : null}
            </header>
            <Separator class="my-6" />
            {renderedPage}
          </article>
        ) : null}
      </main>

      <SiteFooter directory={directory} />
    </div>
  );
};

export default Layout;
