import type { PageView } from "@kamod-ch/preactpress/client";

type HeadTag = ["script", Record<string, string | boolean | undefined>, string?];
import { categories, getCategory } from "./categories";
import { computeHealthScore, resolveAlternatives, type LibraryDirectory, type PreactLibrary } from "./libraries";
import { loadLibraryDirectory } from "./library-node";

export interface RouteLibraryData {
  directory: LibraryDirectory;
  currentLibrary?: PreactLibrary;
  currentCategory?: ReturnType<typeof getCategory>;
  categoryLibraries?: PreactLibrary[];
}

export function getRouteLibraryData(root: string, route: string): RouteLibraryData {
  const directory = loadLibraryDirectory(root);
  const currentLibrary = directory.bySlug.get(route.replace(/^\/libraries\//, ""));
  const currentCategory = categories.find((category) => route === `/libraries/${category.slug}`);
  const categoryLibraries = currentCategory
    ? directory.libraries.filter((library) => library.category === currentCategory.slug)
    : undefined;
  return { directory, currentLibrary, currentCategory, categoryLibraries };
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
    };
    page = {
      ...page,
      title: route === "/"
        ? "PreactHub – Curated Preact Libraries and Compatibility Guides"
        : "Best Preact Libraries – Curated and Compatibility Tested",
      description: route === "/"
        ? "Explore curated Preact libraries, compatibility notes, SSR guidance and implementation recommendations for real-world Preact projects."
        : "Discover maintained libraries for Preact, including native Preact packages and React libraries verified with preact/compat.",
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

  if (data.currentLibrary) {
    nextMeta.library = data.currentLibrary;
    nextMeta.libraryAlternatives = resolveAlternatives(data.currentLibrary, data.directory.bySlug);
    nextMeta.libraryHealthScore = computeHealthScore(data.currentLibrary);
    nextMeta.libraryCategory = getCategory(data.currentLibrary.category);
    page = {
      ...page,
      title: `${data.currentLibrary.name} with Preact – Compatibility and Setup`,
      description: data.currentLibrary.description,
    };
  }

  if (route === "/libraries/submit") {
    nextMeta.librarySubmission = {
      issueTemplate: "/.github/ISSUE_TEMPLATE/library-submission.yml",
      issueUrl: "https://github.com/kamod-ch/preacthub/issues/new?template=library-submission.yml",
    };
  }

  return { ...page, meta: nextMeta };
}

export function structuredDataHead(root: string, route: string): HeadTag[] {
  const { directory, currentLibrary, currentCategory } = getRouteLibraryData(root, route);

  if (route === "/" || route === "/libraries") {
    const title = route === "/"
      ? "PreactHub – Curated Preact Libraries and Compatibility Guides"
      : "Best Preact Libraries – Curated and Compatibility Tested";
    const description = route === "/"
      ? "Explore curated Preact libraries, compatibility notes, SSR guidance and implementation recommendations for real-world Preact projects."
      : "Discover maintained libraries for Preact, including native Preact packages and React libraries verified with preact/compat.";
    return [
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          about: directory.categories.map((category) => category.name),
          numberOfItems: directory.stats.total,
        }),
      ],
    ];
  }

  if (currentCategory) {
    return [
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${currentCategory.name} for Preact`,
          description: currentCategory.description,
        }),
      ],
    ];
  }

  if (currentLibrary) {
    return [
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: currentLibrary.name,
          applicationCategory: getCategory(currentLibrary.category)?.name,
          description: currentLibrary.description,
          softwareVersion: currentLibrary.testedWith?.library,
          license: currentLibrary.license,
          url: currentLibrary.homepage ?? currentLibrary.documentation ?? currentLibrary.repository,
          sameAs: [currentLibrary.repository, currentLibrary.documentation, currentLibrary.homepage].filter(Boolean),
        }),
      ],
    ];
  }

  return [];
}
