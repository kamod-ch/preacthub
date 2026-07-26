import type { PageView } from "@kamod-ch/preactpress/client";

type HeadTag =
  | ["meta", Record<string, string | boolean | undefined>]
  | ["link", Record<string, string | boolean | undefined>]
  | ["script", Record<string, string | boolean | undefined>, string?];
import { categories, getCategory, categoryRoute, categorySeoTitle, isAiCategory, aiCategories } from "./categories";
import { buildHomeDirectoryInsights } from "./directory-insights";
import {
  buildLibraryStructuredData,
  isUnknownLibraryRoute,
  libraryDetailDescription,
  libraryDetailTitle,
  PREACTHUB_SITE_URL,
} from "./library-detail";
import { loadLibraryEditorial, type LibraryEditorialContent } from "./library-editorial";
import {
  parseCompareSlug,
  resolveAlternatives,
  libraryBelongsToCategory,
  type LibraryDirectory,
  type PreactLibrary,
} from "./libraries";
import { loadLibraryDirectory } from "./library-node";
import { buildBlankSubmissionIssueUrl } from "./library-submission";
import { findRelatedProjects } from "./related-projects";
import { canonicalAbsoluteUrl, isNoindexRoute, normalizeLibraryRoute } from "./seo";

export interface RouteLibraryData {
  directory: LibraryDirectory;
  currentLibrary?: PreactLibrary;
  currentCategory?: ReturnType<typeof getCategory>;
  categoryLibraries?: PreactLibrary[];
  compareLibraries?: [PreactLibrary, PreactLibrary];
  unknownLibrarySlug?: string;
  libraryEditorial?: LibraryEditorialContent;
  isAiOverview?: boolean;
  relatedProjects?: PreactLibrary[];
}

function isSubmitRoute(route: string): boolean {
  const normalized = normalizeLibraryRoute(route);
  return normalized === "/submit" || normalized === "/libraries/submit";
}

function parseCompareRoute(route: string): [string, string] | undefined {
  if (!route.startsWith("/compare/")) return undefined;
  return parseCompareSlug(route.slice("/compare/".length));
}

export function getRouteLibraryData(root: string, route: string): RouteLibraryData {
  const directory = loadLibraryDirectory(root);
  const normalizedRoute = normalizeLibraryRoute(route);

  const comparePair = parseCompareRoute(normalizedRoute);
  if (comparePair) {
    const [slugA, slugB] = comparePair;
    const libA = directory.bySlug.get(slugA);
    const libB = directory.bySlug.get(slugB);
    if (libA && libB) {
      return { directory, compareLibraries: [libA, libB] };
    }
    return { directory };
  }

  const librarySlug = normalizedRoute.startsWith("/libraries/")
    ? normalizedRoute.replace(/^\/libraries\//, "")
    : undefined;
  const categoryFromLibraries = categories.find(
    (category) => normalizedRoute === `/libraries/${category.slug}`,
  );
  const categoryFromCategories = categories.find(
    (category) => normalizedRoute === `/categories/${category.slug}`,
  );
  const currentCategory = categoryFromCategories ?? categoryFromLibraries;
  const currentLibrary = librarySlug && !currentCategory
    ? directory.bySlug.get(librarySlug)
    : undefined;
  const categoryLibraries = currentCategory
    ? directory.libraries.filter((library) =>
        libraryBelongsToCategory(library, currentCategory.slug),
      )
    : undefined;
  const categorySlugs = new Set(categories.map((category) => category.slug));
  const unknownLibrarySlug = isUnknownLibraryRoute(
    normalizedRoute,
    librarySlug,
    new Set(directory.bySlug.keys()),
    categorySlugs,
  )
    ? librarySlug
    : undefined;
  const libraryEditorial = currentLibrary ? loadLibraryEditorial(root, currentLibrary) : undefined;
  const isAiOverview = normalizedRoute === "/ai";
  const relatedProjects = currentLibrary
    ? findRelatedProjects(currentLibrary, directory.libraries, directory.bySlug)
    : undefined;
  return {
    directory,
    currentLibrary,
    currentCategory,
    categoryLibraries,
    unknownLibrarySlug,
    libraryEditorial,
    isAiOverview,
    relatedProjects,
  };
}

export function attachLibraryPageMeta(root: string, route: string, page: PageView): PageView {
  const data = getRouteLibraryData(root, route);
  const nextMeta = { ...page.meta } as Record<string, unknown>;

  if (route === "/" || route === "/libraries") {
    nextMeta.libraryDirectory = {
      libraries: data.directory.libraries,
      featured: data.directory.featured,
      categories: data.directory.categories,
      stats: data.directory.stats,
      home: route === "/" ? buildHomeDirectoryInsights(data.directory) : undefined,
    };
    page = {
      ...page,
      title: route === "/"
        ? "PreactHub – Discover Preact, frontend and AI developer tools"
        : "Browse Preact Libraries – Search, Filter and Compare",
      description: route === "/"
        ? "Discover the best Preact, frontend and AI developer tools with compatibility notes, curated categories and practical guidance."
        : "Search and filter curated Preact libraries by compatibility, maintenance, TypeScript and SSR support.",
    };
  }

  if (data.isAiOverview) {
    const aiLibraries = data.directory.libraries.filter((l) => l.catalogDomain === "ai");
    nextMeta.libraryDirectory = {
      libraries: aiLibraries,
      featured: aiLibraries.filter((l) => l.featured),
      categories: data.directory.categories.filter((c) => isAiCategory(c.slug)),
      stats: data.directory.stats,
      isAiOverview: true,
    };
    page = {
      ...page,
      title: "AI Developer Tools – PreactHub",
      description:
        "Discover curated AI infrastructure, agent frameworks, browser automation tools and developer APIs.",
    };
  }

  if (data.currentCategory) {
    nextMeta.libraryDirectory = {
      libraries: data.categoryLibraries ?? [],
      featured: (data.categoryLibraries ?? []).filter((l) => l.featured),
      categories: data.directory.categories,
      stats: data.directory.stats,
      currentCategory: data.currentCategory,
    };
    page = {
      ...page,
      title: categorySeoTitle(data.currentCategory),
      description: data.currentCategory.description,
    };
  }

  if (data.compareLibraries) {
    const [libA, libB] = data.compareLibraries;
    nextMeta.compareLibraries = data.compareLibraries;
    page = {
      ...page,
      title: `Compare ${libA.name} and ${libB.name} for Preact`,
      description: `Side-by-side compatibility, SSR, TypeScript and maintenance notes for ${libA.name} and ${libB.name}.`,
    };
  }

  if (data.currentLibrary) {
    nextMeta.library = data.currentLibrary;
    nextMeta.libraryAlternatives = resolveAlternatives(data.currentLibrary, data.directory.bySlug);
    nextMeta.relatedProjects = data.relatedProjects;
    nextMeta.libraryEditorial = data.libraryEditorial;
    nextMeta.libraryCategory = getCategory(data.currentLibrary.category);
    page = {
      ...page,
      title: libraryDetailTitle(data.currentLibrary),
      description: libraryDetailDescription(data.currentLibrary),
    };
  }

  if (data.unknownLibrarySlug) {
    nextMeta.unknownLibrarySlug = data.unknownLibrarySlug;
    page = {
      ...page,
      title: "Library not found",
      description: "The requested Preact library is not listed in the PreactHub catalog.",
    };
  }

  if (isSubmitRoute(route)) {
    nextMeta.librarySubmission = {
      issueTemplate: "/.github/ISSUE_TEMPLATE/library-submission.yml",
      issueUrl: buildBlankSubmissionIssueUrl(),
    };
    page = {
      ...page,
      title: "Submit a Preact Library – PreactHub",
      description: "Suggest a library for the PreactHub catalog without a PreactHub account. Generate a prefilled GitHub issue with compatibility notes.",
    };
  }

  if (route === "/methodology") {
    page = {
      ...page,
      title: "PreactHub Methodology – Compatibility and Verification",
      description: "How PreactHub labels compatibility, records Preact versions, defines last verified dates and determines maintenance status.",
    };
  }

  return { ...page, meta: nextMeta };
}

export function structuredDataHead(root: string, route: string): HeadTag[] {
  const normalizedRoute = normalizeLibraryRoute(route);
  const { directory, currentLibrary, currentCategory } = getRouteLibraryData(root, route);
  const noindexTags: HeadTag[] = isNoindexRoute(route)
    ? [["meta", { name: "robots", content: "noindex, follow" }]]
    : [];

  if (normalizedRoute === "/" || normalizedRoute === "/libraries") {
    const title = normalizedRoute === "/"
      ? "PreactHub – Curated Preact Libraries and Compatibility Guides"
      : "Best Preact Libraries – Curated and Compatibility Tested";
    const description = normalizedRoute === "/"
      ? "Explore curated Preact libraries, compatibility notes, SSR guidance and implementation recommendations for real-world Preact projects."
      : "Discover maintained libraries for Preact, including native Preact packages and React libraries verified with preact/compat.";
    return [
      ...noindexTags,
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: canonicalAbsoluteUrl(normalizedRoute, PREACTHUB_SITE_URL),
          about: directory.categories.map((category) => category.name),
          numberOfItems: directory.stats.total,
        }),
      ],
    ];
  }

  if (currentCategory) {
    const breadcrumbName = currentCategory.section === "ai"
      ? currentCategory.name
      : `${currentCategory.name} for Preact`;
    return [
      ...noindexTags,
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: categorySeoTitle(currentCategory),
          description: currentCategory.description,
          url: canonicalAbsoluteUrl(categoryRoute(currentCategory.slug), PREACTHUB_SITE_URL),
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: canonicalAbsoluteUrl("/", PREACTHUB_SITE_URL) },
              ...(currentCategory.section === "ai"
                ? [{ "@type": "ListItem", position: 2, name: "AI", item: canonicalAbsoluteUrl("/ai", PREACTHUB_SITE_URL) }]
                : [{ "@type": "ListItem", position: 2, name: "Libraries", item: canonicalAbsoluteUrl("/libraries", PREACTHUB_SITE_URL) }]),
              { "@type": "ListItem", position: currentCategory.section === "ai" ? 3 : 3, name: breadcrumbName },
            ],
          },
        }),
      ],
    ];
  }

  if (normalizedRoute === "/ai") {
    return [
      ...noindexTags,
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "AI Developer Tools",
          description: "Curated AI infrastructure, agent frameworks, browser automation and developer APIs.",
          url: canonicalAbsoluteUrl("/ai", PREACTHUB_SITE_URL),
          about: aiCategories.map((c) => c.name),
        }),
      ],
    ];
  }

  if (currentLibrary) {
    const alternatives = resolveAlternatives(currentLibrary, directory.bySlug);
    return [
      ...noindexTags,
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify(
          buildLibraryStructuredData(
            currentLibrary,
            getCategory(currentLibrary.category),
            alternatives,
            PREACTHUB_SITE_URL,
          ),
        ),
      ],
    ];
  }

  return noindexTags;
}
