import type { PageView } from "@kamod-ch/preactpress/client";

type HeadTag =
  | ["meta", Record<string, string | boolean | undefined>]
  | ["link", Record<string, string | boolean | undefined>]
  | ["script", Record<string, string | boolean | undefined>, string?];
import { categories, getCategory } from "./categories";
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
  type LibraryDirectory,
  type PreactLibrary,
} from "./libraries";
import { loadLibraryDirectory } from "./library-node";
import { buildBlankSubmissionIssueUrl } from "./library-submission";
import { canonicalAbsoluteUrl, isNoindexRoute, normalizeLibraryRoute } from "./seo";

export interface RouteLibraryData {
  directory: LibraryDirectory;
  currentLibrary?: PreactLibrary;
  currentCategory?: ReturnType<typeof getCategory>;
  categoryLibraries?: PreactLibrary[];
  compareLibraries?: [PreactLibrary, PreactLibrary];
  unknownLibrarySlug?: string;
  libraryEditorial?: LibraryEditorialContent;
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
  const currentCategory = categories.find((category) => normalizedRoute === `/libraries/${category.slug}`);
  const currentLibrary = librarySlug && !currentCategory
    ? directory.bySlug.get(librarySlug)
    : undefined;
  const categoryLibraries = currentCategory
    ? directory.libraries.filter((library) => library.category === currentCategory.slug)
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
  return {
    directory,
    currentLibrary,
    currentCategory,
    categoryLibraries,
    unknownLibrarySlug,
    libraryEditorial,
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
        ? "PreactHub – Find Preact libraries that actually work"
        : "Browse Preact Libraries – Search, Filter and Compare",
      description: route === "/"
        ? "Discover maintained Preact libraries, tools and starters with compatibility notes for native Preact and preact/compat."
        : "Search and filter curated Preact libraries by compatibility, maintenance, TypeScript and SSR support.",
    };
  }

  if (data.currentCategory) {
    nextMeta.libraryDirectory = {
      libraries: data.categoryLibraries ?? [],
      featured: [],
      categories: data.directory.categories,
      stats: data.directory.stats,
      currentCategory: data.currentCategory,
    };
    page = {
      ...page,
      title: `Best ${data.currentCategory.name} Libraries for Preact`,
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
    return [
      ...noindexTags,
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${currentCategory.name} for Preact`,
          description: currentCategory.description,
          url: canonicalAbsoluteUrl(normalizedRoute, PREACTHUB_SITE_URL),
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
