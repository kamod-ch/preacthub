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
import { withBase, type LayoutProps } from "@kamod-ch/preactpress/client";
import { getCategory } from "../../src/lib/categories";
import { compatibilityLabel, formatDate, statusLabel } from "../../src/lib/libraries";
import { SiteBreadcrumbs } from "./libraries/Breadcrumbs";
import { CodeBlock } from "./libraries/CodeBlock";
import { HealthScore } from "./libraries/HealthScore";
import { CompatibilityBadge, StatusBadge } from "./libraries/LibraryBadge";
import { LibraryFilters } from "./libraries/LibraryFilters";
import { CategoriesSection } from "./sections/CategoriesSection";
import { FeaturedSection } from "./sections/FeaturedSection";
import { HeroSection } from "./sections/HeroSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { StatsSection } from "./sections/StatsSection";
import type { ThemeMetaRecord } from "./types";
import { libraryLinks, tagUrl, yesNoUnknown } from "./utils";
import { renderPageContent } from "./page-content";
import { startThemeSync } from "./theme-sync";
import "./theme.css";

const Layout: FunctionalComponent<LayoutProps> = ({ site, themeConfig, routePath, page }) => {
  useEffect(() => startThemeSync(), []);
  const meta = (page?.meta ?? {}) as ThemeMetaRecord;
  const directory = meta.libraryDirectory;
  const currentLibrary = meta.library;
  const currentCategory = meta.libraryCategory ?? directory?.currentCategory;
  const isLibrariesLanding = routePath === "/libraries";
  const isHome = routePath === "/";
  const isSubmit = routePath === "/libraries/submit";
  const isLibraryDetail = Boolean(currentLibrary);
  const isCategoryPage = Boolean(!currentLibrary && currentCategory);
  const showLandingSections = Boolean(directory && (isHome || isLibrariesLanding));
  const showDirectory = Boolean(directory && (isHome || isLibrariesLanding || isCategoryPage));

  const renderedPage = renderPageContent(page);
  const alternatives = meta.libraryAlternatives ?? [];
  const score = meta.libraryHealthScore;
  const category = currentLibrary ? getCategory(currentLibrary.category) : currentCategory;
  const installCommand = currentLibrary?.packageName ? `npm install ${currentLibrary.packageName}` : undefined;
  const aliasSnippet = `resolve: {\n  alias: {\n    react: "preact/compat",\n    "react-dom/test-utils": "preact/test-utils",\n    "react-dom": "preact/compat",\n    "react/jsx-runtime": "preact/jsx-runtime"\n  }\n}`;

  const breadcrumbItems = useMemo(() => {
    if (!isLibraryDetail && !isCategoryPage) return [];
    return [
      { label: "Home", href: "/" },
      { label: "Libraries", href: "/libraries" },
      ...(category ? [{ label: category.name, href: `/libraries/${category.slug}` }] : []),
      ...(currentLibrary ? [{ label: currentLibrary.name }] : []),
    ];
  }, [category, currentLibrary, isCategoryPage, isLibraryDetail]);

  return (
    <div class="ph-site">
      <a class="ph-skip-link" href="#content">Skip to content</a>
      <SiteHeader site={site} themeConfig={themeConfig} routePath={routePath} />

      <main id="content" class="ph-shell ph-main">
        {breadcrumbItems.length > 0 ? <SiteBreadcrumbs items={breadcrumbItems} /> : null}

        {showLandingSections && directory ? (
          <>
            <HeroSection directory={directory} isHome={isHome} inlineDirectorySearch={isHome || isLibrariesLanding} />
            <StatsSection directory={directory} />
            <FeaturedSection directory={directory} />
            <CategoriesSection directory={directory} />
          </>
        ) : null}

        {isCategoryPage && directory && currentCategory ? (
          <section class="ph-page-intro">
            <div class="ph-section-eyebrow">Category</div>
            <h1>{currentCategory.name}</h1>
            <p>{currentCategory.description}</p>
          </section>
        ) : null}

        {showDirectory && directory ? <LibraryFilters directory={directory} /> : null}

        {isLibraryDetail && currentLibrary && score ? (
          <article class="ph-library-page">
            <section class="ph-library-header-grid">
              <div class="ph-library-header-main">
                <div class="ph-section-eyebrow">Library profile</div>
                <div class="ph-card-badges">
                  <CompatibilityBadge value={currentLibrary.compatibility} />
                  <StatusBadge value={currentLibrary.status} />
                  <Badge variant="outline">{category?.name ?? currentLibrary.category}</Badge>
                </div>
                <h1>{currentLibrary.name}</h1>
                <p class="ph-library-lead">{currentLibrary.description}</p>
                {currentLibrary.packageName ? <p class="ph-package-name">{currentLibrary.packageName}</p> : null}
                <div class="ph-link-row">
                  {libraryLinks(currentLibrary).map((link) => (
                    <Button key={link.href} href={link.href} variant="outline" size="sm">{link.label}</Button>
                  ))}
                </div>
                <div class="ph-library-meta-inline">
                  <span>Last verified: {formatDate(currentLibrary.lastVerified)}</span>
                  <span>ESM: {yesNoUnknown(currentLibrary.esm)}</span>
                  <span>TypeScript: {yesNoUnknown(currentLibrary.typescript)}</span>
                </div>
              </div>
              <HealthScore value={score} />
            </section>

            <section class="ph-detail-grid">
              <div class="ph-detail-main">
                <Card>
                  <CardHeader>
                    <div class="ph-section-eyebrow ph-section-eyebrow-muted">Compatibility</div>
                    <CardTitle>Compatibility summary</CardTitle>
                  </CardHeader>
                  <CardContent class="ph-compatibility-grid">
                    <div><span>Preact compatibility</span><strong>{compatibilityLabel(currentLibrary.compatibility)}</strong></div>
                    <div><span>Tested with</span><strong>{currentLibrary.testedWith ? `Preact ${currentLibrary.testedWith.preact} · ${currentLibrary.testedWith.library}` : "No version verified yet"}</strong></div>
                    <div><span>TypeScript</span><strong>{currentLibrary.typescript ? "Supported" : "Not documented"}</strong></div>
                    <div><span>SSR</span><strong>{currentLibrary.ssr ? "Supported" : "Limited or unknown"}</strong></div>
                    <div><span>Islands</span><strong>{currentLibrary.islands ? "Supported" : "Limited or unknown"}</strong></div>
                    <div><span>ES modules</span><strong>{currentLibrary.esm ? "Supported" : "Unknown"}</strong></div>
                  </CardContent>
                </Card>

                <section class="ph-detail-section-intro">
                  <div class="ph-section-eyebrow ph-section-eyebrow-muted">Implementation</div>
                  <h2>Setup and usage guide</h2>
                  <p class="ph-muted">Practical installation notes, compatibility guidance and content-specific implementation details.</p>
                </section>

                {installCommand ? <CodeBlock title="Installation" code={installCommand} /> : null}
                {currentLibrary.compatibility === "compat" ? <CodeBlock title="Vite configuration" code={aliasSnippet} language="ts" /> : null}

                <section class="ph-library-article-shell">{renderedPage}</section>
              </div>

              <aside class="ph-detail-sidebar">
                <Card>
                  <CardHeader>
                    <div class="ph-section-eyebrow ph-section-eyebrow-muted">Snapshot</div>
                    <CardTitle>Quick facts</CardTitle>
                  </CardHeader>
                  <CardContent class="ph-fact-grid">
                    <div><span>Status</span><strong>{statusLabel(currentLibrary.status)}</strong></div>
                    <div><span>Compatibility</span><strong>{compatibilityLabel(currentLibrary.compatibility)}</strong></div>
                    <div><span>Last verified</span><strong>{formatDate(currentLibrary.lastVerified)}</strong></div>
                    <div><span>Tested with</span><strong>{currentLibrary.testedWith ? `${currentLibrary.testedWith.preact} · ${currentLibrary.testedWith.library}` : "Not documented"}</strong></div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div class="ph-section-eyebrow ph-section-eyebrow-muted">Metadata</div>
                    <CardTitle>Technical metadata</CardTitle>
                  </CardHeader>
                  <CardContent class="ph-meta-list">
                    <p><strong>Package:</strong> {currentLibrary.packageName ?? currentLibrary.slug}</p>
                    <p><strong>License:</strong> {currentLibrary.license ?? "Unknown"}</p>
                    <p><strong>Bundle size:</strong> {currentLibrary.bundleSize ?? "Not documented"}</p>
                    <p><strong>Repository:</strong> {currentLibrary.repository ? <a href={currentLibrary.repository}>{currentLibrary.repository}</a> : "—"}</p>
                    <p><strong>Documentation:</strong> {currentLibrary.documentation ? <a href={currentLibrary.documentation}>{currentLibrary.documentation}</a> : "—"}</p>
                    <p><strong>Homepage:</strong> {currentLibrary.homepage ? <a href={currentLibrary.homepage}>{currentLibrary.homepage}</a> : "—"}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div class="ph-section-eyebrow ph-section-eyebrow-muted">Runtime</div>
                    <CardTitle>Environment support</CardTitle>
                  </CardHeader>
                  <CardContent class="ph-meta-list">
                    <p><strong>TypeScript:</strong> {yesNoUnknown(currentLibrary.typescript)}</p>
                    <p><strong>SSR:</strong> {yesNoUnknown(currentLibrary.ssr, "Limited or unknown")}</p>
                    <p><strong>Islands:</strong> {yesNoUnknown(currentLibrary.islands, "Limited or unknown")}</p>
                    <p><strong>ES modules:</strong> {yesNoUnknown(currentLibrary.esm)}</p>
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
                        <a key={entry.route} href={entry.route}>{entry.name}</a>
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
                PreactHub is curated in GitHub. Open an issue with compatibility notes, a working example and any known limitations so the directory stays useful.
              </p>
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
                  <li>SSR and islands notes</li>
                  <li>Known limitations and example repository</li>
                </ul>
                <p>
                  <Button href={meta.librarySubmission.issueUrl}>Submit via GitHub</Button>
                </p>
              </CardContent>
            </Card>
          </section>
        ) : null}

        {!showLandingSections && !isCategoryPage && !isLibraryDetail && !isSubmit ? (
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
