import type { LibraryCategorySlug } from "./categories";

export const compatibilityValues = ["native", "compat", "partial", "incompatible", "unknown"] as const;
export type LibraryCompatibility = (typeof compatibilityValues)[number];

export const statusValues = ["recommended", "stable", "experimental", "deprecated"] as const;
export type LibraryStatus = (typeof statusValues)[number];

export interface TestedWith {
  preact: string;
  library: string;
}

export interface PreactLibrary {
  name: string;
  slug: string;
  description: string;
  category: LibraryCategorySlug;
  packageName?: string;
  repository?: string;
  documentation?: string;
  homepage?: string;
  compatibility: LibraryCompatibility;
  status: LibraryStatus;
  testedWith?: TestedWith;
  typescript: boolean;
  ssr: boolean;
  islands: boolean;
  esm: boolean;
  license?: string;
  bundleSize?: string;
  lastVerified?: string;
  tags: string[];
  notes?: string[];
  limitations?: string[];
  alternatives?: string[];
  featured?: boolean;
  route: string;
  file: string;
}

export interface ResolvedAlternative {
  slug: string;
  name: string;
  route: string;
}

export interface CategorySummary {
  slug: LibraryCategorySlug;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface LibraryStats {
  total: number;
  categories: number;
  verified: number;
  native: number;
}

export interface HealthScoreInput {
  compatibility: LibraryCompatibility;
  status: LibraryStatus;
  typescript: boolean;
  ssr: boolean;
  islands: boolean;
  esm: boolean;
  lastVerified?: string;
}

export interface HealthScoreResult {
  score: number;
  breakdown: {
    compatibility: number;
    status: number;
    typescript: number;
    ssr: number;
    islands: number;
    esm: number;
    freshness: number;
  };
}

export interface LibraryDirectory {
  libraries: PreactLibrary[];
  featured: PreactLibrary[];
  categories: CategorySummary[];
  stats: LibraryStats;
  bySlug: Map<string, PreactLibrary>;
}

export interface LibraryFilterState {
  q?: string;
  category?: string;
  compatibility?: LibraryCompatibility | "all";
  typescript?: boolean;
  ssr?: boolean;
  islands?: boolean;
  status?: LibraryStatus | "all";
  sort?: LibrarySort;
}

export type LibrarySort = "recommended" | "name" | "recently-verified" | "native-first";

export const librarySortOptions: LibrarySort[] = [
  "recommended",
  "name",
  "recently-verified",
  "native-first",
];

export function libraryUrl(slug: string): string {
  return `/libraries/${slug}`;
}

export function compareUrl(a: string, b: string): string {
  return `/compare/${a}-vs-${b}`;
}

export function resolveAlternatives(
  library: Pick<PreactLibrary, "alternatives">,
  bySlug: Map<string, PreactLibrary>,
): ResolvedAlternative[] {
  return (library.alternatives ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((value): value is PreactLibrary => Boolean(value))
    .map((entry) => ({ slug: entry.slug, name: entry.name, route: entry.route }));
}

export function filterLibraries(libraries: PreactLibrary[], filters: LibraryFilterState): PreactLibrary[] {
  const query = filters.q?.trim().toLowerCase();
  return libraries.filter((library) => {
    if (filters.category && filters.category !== "all" && library.category !== filters.category) return false;
    if (
      filters.compatibility &&
      filters.compatibility !== "all" &&
      library.compatibility !== filters.compatibility
    ) return false;
    if (filters.status && filters.status !== "all" && library.status !== filters.status) return false;
    if (filters.typescript && !library.typescript) return false;
    if (filters.ssr && !library.ssr) return false;
    if (filters.islands && !library.islands) return false;
    if (!query) return true;

    const haystack = [library.name, library.description, library.packageName, library.category, ...library.tags]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

function statusWeight(status: LibraryStatus): number {
  switch (status) {
    case "recommended":
      return 4;
    case "stable":
      return 3;
    case "experimental":
      return 2;
    case "deprecated":
      return 1;
  }
}

function compatibilityWeight(value: LibraryCompatibility): number {
  switch (value) {
    case "native":
      return 5;
    case "compat":
      return 4;
    case "partial":
      return 2;
    case "unknown":
      return 1;
    case "incompatible":
      return 0;
  }
}

export function sortLibraries(libraries: PreactLibrary[], sort: LibrarySort): PreactLibrary[] {
  const copy = [...libraries];
  switch (sort) {
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "recently-verified":
      return copy.sort(
        (a, b) => (b.lastVerified ?? "").localeCompare(a.lastVerified ?? "") || a.name.localeCompare(b.name),
      );
    case "native-first":
      return copy.sort(
        (a, b) => compatibilityWeight(b.compatibility) - compatibilityWeight(a.compatibility) || a.name.localeCompare(b.name),
      );
    case "recommended":
    default:
      return copy.sort(
        (a, b) =>
          statusWeight(b.status) - statusWeight(a.status) ||
          compatibilityWeight(b.compatibility) - compatibilityWeight(a.compatibility) ||
          (b.lastVerified ?? "").localeCompare(a.lastVerified ?? "") ||
          a.name.localeCompare(b.name),
      );
  }
}

export function computeHealthScore(input: HealthScoreInput): HealthScoreResult {
  const compatibility =
    input.compatibility === "native"
      ? 35
      : input.compatibility === "compat"
        ? 28
        : input.compatibility === "partial"
          ? 14
          : input.compatibility === "unknown"
            ? 7
            : 0;
  const status =
    input.status === "recommended"
      ? 20
      : input.status === "stable"
        ? 16
        : input.status === "experimental"
          ? 8
          : 2;
  const typescript = input.typescript ? 10 : 0;
  const ssr = input.ssr ? 10 : 0;
  const islands = input.islands ? 10 : 0;
  const esm = input.esm ? 5 : 0;
  const freshness = computeFreshnessScore(input.lastVerified);
  const score = compatibility + status + typescript + ssr + islands + esm + freshness;
  return { score, breakdown: { compatibility, status, typescript, ssr, islands, esm, freshness } };
}

export function computeFreshnessScore(lastVerified?: string): number {
  if (!lastVerified) return 0;
  const then = new Date(`${lastVerified}T00:00:00Z`).getTime();
  if (Number.isNaN(then)) return 0;
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 60) return 10;
  if (days <= 180) return 8;
  if (days <= 365) return 5;
  if (days <= 730) return 2;
  return 1;
}

export function formatDate(date?: string, locale = "en-US"): string {
  if (!date) return "Not yet verified";
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function compatibilityLabel(value: LibraryCompatibility): string {
  switch (value) {
    case "native":
      return "Native Preact";
    case "compat":
      return "Works with preact/compat";
    case "partial":
      return "Partially compatible";
    case "incompatible":
      return "Not compatible";
    case "unknown":
      return "Not verified";
  }
}

export function statusLabel(value: LibraryStatus): string {
  switch (value) {
    case "recommended":
      return "Recommended";
    case "stable":
      return "Stable";
    case "experimental":
      return "Experimental";
    case "deprecated":
      return "Deprecated";
  }
}
