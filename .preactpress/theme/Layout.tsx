import type { FunctionalComponent } from "preact";
import { useEffect, useMemo } from "preact/hooks";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@kamod-ch/ui";
import { type LayoutProps } from "@kamod-ch/preactpress/client";
import { getCategory, categoryRoute, isAiCategory } from "../../src/lib/categories";
import { SiteBreadcrumbs } from "./libraries/Breadcrumbs";
import { LibraryDetailPage, LibraryNotFound } from "./libraries/LibraryDetailPage";
import { LibraryCompare } from "./libraries/LibraryCompare";
import { LibraryFilters } from "./libraries/LibraryFilters";
import { SubmitForm } from "./libraries/SubmitForm";
import { AiOverviewSection } from "./sections/AiOverviewSection";
import { CategoriesSection } from "./sections/CategoriesSection";
import { CommunityCtaSection } from "./sections/CommunityCtaSection";
import { CuratedStacksSection } from "./sections/CuratedStacksSection";
import { FeaturedSection } from "./sections/FeaturedSection";
import { HeroSection } from "./sections/HeroSection";
import { LibrariesIntroSection } from "./sections/LibrariesIntroSection";
import { NativeLibrariesSection } from "./sections/NativeLibrariesSection";
import { RecentlyVerifiedSection } from "./sections/RecentlyVerifiedSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { StatsSection } from "./sections/StatsSection";
import type { ThemeMetaRecord } from "./types";
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
  const isSubmit = routePath === "/submit" || routePath === "/libraries/submit";
  const isCompare = Boolean(compareLibraries);
  const isLibraryDetail = Boolean(currentLibrary);
  const isUnknownLibrary = Boolean(meta.unknownLibrarySlug);
  const isAiOverview = routePath === "/ai" || Boolean(meta.libraryDirectory?.isAiOverview);
  const isCategoryPage = Boolean(!currentLibrary && !isCompare && !isUnknownLibrary && currentCategory);
  const showHomeLanding = Boolean(directory && isHome);
  const showLibrariesDirectory = Boolean(directory && (isLibrariesLanding || isCategoryPage));
  const showAiOverview = Boolean(directory && isAiOverview);
  const isAiCategoryPage = Boolean(currentCategory && isAiCategory(currentCategory.slug));

  const renderedPage = renderPageContent(page);
  const alternatives = meta.libraryAlternatives ?? [];
  const editorial = meta.libraryEditorial;
  const category = currentLibrary ? getCategory(currentLibrary.category) : currentCategory;

  const breadcrumbItems = useMemo(() => {
    if (isCompare && compareLibraries) {
      return [
        { label: "Home", href: "/" },
        { label: "Libraries", href: "/libraries" },
        { label: `${compareLibraries[0].name} vs ${compareLibraries[1].name}` },
      ];
    }
    if (isUnknownLibrary) {
      return [
        { label: "Home", href: "/" },
        { label: "Libraries", href: "/libraries" },
        { label: "Not found" },
      ];
    }
    if (isAiOverview) {
      return [
        { label: "Home", href: "/" },
        { label: "AI Developer Tools" },
      ];
    }
    if (isCategoryPage && currentCategory) {
      return [
        { label: "Home", href: "/" },
        ...(currentCategory.section === "ai"
          ? [{ label: "AI", href: "/ai" }]
          : [{ label: "Libraries", href: "/libraries" }]),
        { label: currentCategory.name },
      ];
    }
    if (!isLibraryDetail) return [];
    return [
      { label: "Home", href: "/" },
      ...(currentLibrary?.catalogDomain === "ai"
        ? [{ label: "AI", href: "/ai" }]
        : [{ label: "Libraries", href: "/libraries" }]),
      ...(category ? [{ label: category.name, href: categoryRoute(category.slug) }] : []),
      ...(currentLibrary ? [{ label: currentLibrary.name }] : []),
    ];
  }, [category, compareLibraries, currentCategory, currentLibrary, isAiOverview, isCategoryPage, isCompare, isLibraryDetail, isUnknownLibrary]);

  return (
    <div class="ph-site">
      <a class="ph-skip-link" href="#content">Skip to content</a>
      <SiteHeader
        site={site}
        themeConfig={themeConfig}
        routePath={routePath}
        categoryCounts={
          directory
            ? Object.fromEntries(directory.categories.map((category) => [category.slug, category.count]))
            : undefined
        }
      />

      <main id="content" class="ph-shell ph-main">
        {breadcrumbItems.length > 0 ? <SiteBreadcrumbs items={breadcrumbItems} /> : null}

        {showHomeLanding && directory ? (
          <>
            <HeroSection directory={directory} />
            <StatsSection directory={directory} />
            <FeaturedSection directory={directory} />
            <CategoriesSection directory={directory} />
            <RecentlyVerifiedSection directory={directory} />
            <NativeLibrariesSection directory={directory} />
            <CuratedStacksSection directory={directory} />
            <CommunityCtaSection />
            <article class="ph-home-about ph-prose">{renderedPage}</article>
          </>
        ) : null}

        {isLibrariesLanding && directory ? <LibrariesIntroSection directory={directory} /> : null}

        {isCategoryPage && directory && currentCategory ? (
          <section class="ph-page-intro ph-category-page-intro">
            <div class="ph-section-eyebrow">{isAiCategoryPage ? "AI Category" : "Category"}</div>
            <h1>{currentCategory.name}</h1>
            <p class="ph-muted">{currentCategory.description}</p>
            <p class="ph-category-count ph-muted" aria-live="polite">
              {directory.libraries.length} {directory.libraries.length === 1 ? "tool" : "tools"} available
            </p>
          </section>
        ) : null}

        {showAiOverview && directory ? <AiOverviewSection directory={directory} /> : null}

        {showLibrariesDirectory && directory ? (
          <LibraryFilters directory={directory} isAiCategory={isAiCategoryPage} />
        ) : null}

        {isCompare && compareLibraries ? <LibraryCompare libraries={compareLibraries} /> : null}

        {isLibraryDetail && currentLibrary && editorial ? (
          <LibraryDetailPage
            library={currentLibrary}
            category={category}
            alternatives={alternatives}
            relatedProjects={meta.relatedProjects ?? []}
            editorial={editorial}
          />
        ) : null}

        {isUnknownLibrary && meta.unknownLibrarySlug ? (
          <LibraryNotFound slug={meta.unknownLibrarySlug} />
        ) : null}

        {isSubmit && meta.librarySubmission ? (
          <section class="ph-submit-page">
            <div class="ph-page-intro">
              <div class="ph-section-eyebrow">Contribute</div>
              <h1>Submit a library</h1>
              <article class="ph-prose ph-submit-intro-copy">{renderedPage}</article>
              <div class="ph-submit-intro-actions">
                <Button href="/methodology" variant="outline">Read methodology</Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <div class="ph-section-eyebrow ph-section-eyebrow-muted">Submission</div>
                <CardTitle>Library submission form</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="ph-muted ph-submit-lead">
                  No PreactHub account is required. The form validates your input locally, shows a preview and opens a prefilled GitHub issue for maintainer review.
                </p>
                <SubmitForm issueUrl={meta.librarySubmission.issueUrl} />
              </CardContent>
            </Card>
          </section>
        ) : null}

        {!showHomeLanding && !showAiOverview && !showLibrariesDirectory && !isCategoryPage && !isLibraryDetail && !isSubmit && !isCompare && !isUnknownLibrary ? (
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
