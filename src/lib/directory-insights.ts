import type { PreactLibrary } from "./libraries";
import { sortLibraries, type LibraryDirectory, type LibraryStats } from "./libraries";

export interface CuratedStack {
  slug: string;
  name: string;
  description: string;
  librarySlugs: string[];
}

export interface HomeDirectoryInsights {
  recentlyVerified: PreactLibrary[];
  nativeLibraries: PreactLibrary[];
  stacks: CuratedStack[];
}

export interface ExtendedLibraryStats extends LibraryStats {}

export function buildExtendedStats(
  directory: Pick<LibraryDirectory, "libraries" | "categories">,
  lastUpdatedAt?: string,
): ExtendedLibraryStats {
  const activeCategories = directory.categories.filter((category) => category.count > 0).length;
  return {
    total: directory.libraries.length,
    categories: activeCategories,
    verified: directory.libraries.filter((library) => Boolean(library.lastVerifiedAt)).length,
    native: directory.libraries.filter((library) => library.compatibilityStatus === "native").length,
    communityTested: directory.libraries.filter((library) => library.compatibilityStatus === "community-tested").length,
    unverified: directory.libraries.filter((library) => library.compatibilityStatus === "unverified").length,
    lastUpdatedAt,
  };
}

export function buildHomeDirectoryInsights(
  directory: LibraryDirectory,
  stacks: CuratedStack[] = [],
  limits = { recentlyVerified: 6, native: 6 },
): HomeDirectoryInsights {
  const recentlyVerified = sortLibraries(
    directory.libraries.filter((library) => Boolean(library.lastVerifiedAt)),
    "recently-verified",
  ).slice(0, limits.recentlyVerified);

  const nativeLibraries = sortLibraries(
    directory.libraries.filter((library) => library.compatibilityStatus === "native"),
    "recommended",
  ).slice(0, limits.native);

  const validStacks = stacks
    .map((stack) => ({
      ...stack,
      librarySlugs: stack.librarySlugs.filter((slug) => directory.bySlug.has(slug)),
    }))
    .filter((stack) => stack.librarySlugs.length >= 2);

  return {
    recentlyVerified,
    nativeLibraries,
    stacks: validStacks,
  };
}

export function formatCatalogDate(date?: string, locale = "en-US"): string {
  if (!date) return "Not yet recorded";
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
