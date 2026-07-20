import type { LibraryCategorySlug } from "./categories";
import type {
  CompatibilityStatus,
  LibraryEntry,
  LibraryQualityBadge,
  MaintenanceStatus,
  SsrSupport,
  TypeScriptSupport,
} from "./library-schema";

export {
  AI_READY_MIN_AUDIT_SCORE,
  compatibilityStatusValues,
  maintenanceStatusValues,
  qualityBadgeValues,
  ssrSupportValues,
  typescriptSupportValues,
  type CompatibilityStatus,
  type LibraryEntry,
  type LibraryQualityBadge,
  type MaintenanceStatus,
  type SsrSupport,
  type TypeScriptSupport,
} from "./library-schema";

/** @deprecated Use compatibilityStatusValues — kept for URL filter migration. */
export const compatibilityValues = ["native", "compat", "partial", "incompatible", "unknown"] as const;
export type LibraryCompatibility = (typeof compatibilityValues)[number];

/** @deprecated Use maintenanceStatusValues — kept for editorial recommendation weighting. */
export const statusValues = ["recommended", "stable", "experimental", "deprecated"] as const;
export type LibraryStatus = (typeof statusValues)[number];

export interface TestedWith {
  preact: string;
  library: string;
}

export interface PreactLibrary extends LibraryEntry {
  route: string;
  file: string;
  /** Alias for shortDescription — used by search/filter UI. */
  description: string;
  /** Derived for legacy filters and health score. */
  compatibility: LibraryCompatibility;
  status: LibraryStatus;
  typescript: boolean;
  ssr: boolean;
  lastVerified?: string;
  repository?: string;
  documentation?: string;
  homepage?: string;
  testedWith?: TestedWith;
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
  communityTested: number;
  unverified: number;
  lastUpdatedAt?: string;
}

export interface HealthScoreInput {
  compatibilityStatus: CompatibilityStatus;
  maintenanceStatus: MaintenanceStatus;
  typescriptSupport: TypeScriptSupport;
  ssrSupport: SsrSupport;
  islands: boolean;
  esm: boolean;
  lastVerifiedAt?: string;
}

export interface HealthScoreResult {
  score: number;
  breakdown: {
    compatibility: number;
    maintenance: number;
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
  compatibilityStatus?: CompatibilityStatus | "all";
  /** @deprecated legacy URL param — mapped to compatibilityStatus in filter-url-state */
  compatibility?: LibraryCompatibility | "all";
  maintenanceStatus?: MaintenanceStatus | "all";
  /** @deprecated legacy URL param */
  status?: LibraryStatus | "all";
  typescriptSupport?: TypeScriptSupport | "all";
  typescript?: boolean;
  ssrSupport?: SsrSupport | "all";
  ssr?: boolean;
  islands?: boolean;
  aiReady?: boolean;
  sort?: LibrarySort;
  page?: number;
}

export type LibrarySort = "recommended" | "name" | "recently-verified" | "native-first";

export const librarySortOptions: LibrarySort[] = [
  "recommended",
  "name",
  "recently-verified",
  "native-first",
];

export function attachLegacyLibraryView(entry: LibraryEntry, route: string, file: string): PreactLibrary {
  return {
    ...entry,
    route,
    file,
    description: entry.shortDescription,
    compatibility: compatibilityStatusToLegacy(entry.compatibilityStatus),
    status: maintenanceStatusToLegacy(entry.maintenanceStatus, entry.compatibilityStatus),
    typescript: typescriptSupportToLegacyBoolean(entry.typescriptSupport),
    ssr: ssrSupportToLegacyBoolean(entry.ssrSupport),
    lastVerified: entry.lastVerifiedAt,
    repository: entry.repositoryUrl,
    documentation: entry.documentationUrl,
    homepage: entry.homepageUrl,
    testedWith: entry.testedPreactVersions[0]
      ? { preact: entry.testedPreactVersions[0], library: entry.packageName ?? entry.slug }
      : undefined,
  };
}

export function compatibilityStatusToLegacy(value: CompatibilityStatus): LibraryCompatibility {
  switch (value) {
    case "native":
      return "native";
    case "compat":
    case "community-tested":
      return "compat";
    case "experimental":
      return "partial";
    case "inactive":
      return "incompatible";
    case "unverified":
      return "unknown";
  }
}

export function maintenanceStatusToLegacy(
  maintenance: MaintenanceStatus,
  compatibility: CompatibilityStatus,
): LibraryStatus {
  if (maintenance === "archived" || maintenance === "inactive") return "deprecated";
  if (compatibility === "experimental") return "experimental";
  if (compatibility === "community-tested" || compatibility === "native") return "recommended";
  return "stable";
}

export function typescriptSupportToLegacyBoolean(value: TypeScriptSupport): boolean {
  return value === "native" || value === "bundled-types" || value === "external-types";
}

export function ssrSupportToLegacyBoolean(value: SsrSupport): boolean {
  return value === "supported" || value === "limited";
}

export function libraryUrl(slug: string): string {
  return `/libraries/${slug}`;
}

export function compareUrl(a: string, b: string): string {
  return `/compare/${a}-vs-${b}`;
}

export function parseCompareSlug(value: string): [string, string] | undefined {
  const marker = "-vs-";
  const idx = value.indexOf(marker);
  if (idx <= 0) return undefined;
  const a = value.slice(0, idx);
  const b = value.slice(idx + marker.length);
  if (!a || !b || a === b) return undefined;
  return [a, b];
}

export function sortLabel(value: LibrarySort): string {
  switch (value) {
    case "recommended":
      return "Recommended";
    case "name":
      return "Name (A–Z)";
    case "recently-verified":
      return "Recently verified";
    case "native-first":
      return "Native Preact first";
  }
}

export const DIRECTORY_PAGE_SIZE = 24;

export function paginateItems<T>(items: T[], page: number, pageSize = DIRECTORY_PAGE_SIZE): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function totalPages(count: number, pageSize = DIRECTORY_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(count / pageSize));
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

function matchesCompatibilityFilter(library: PreactLibrary, filter: CompatibilityStatus | "all" | undefined): boolean {
  if (!filter || filter === "all") return true;
  return library.compatibilityStatus === filter;
}

function matchesMaintenanceFilter(library: PreactLibrary, filter: MaintenanceStatus | "all" | undefined): boolean {
  if (!filter || filter === "all") return true;
  return library.maintenanceStatus === filter;
}

export function filterLibraries(libraries: PreactLibrary[], filters: LibraryFilterState): PreactLibrary[] {
  const query = filters.q?.trim().toLowerCase();
  const compatibilityStatus =
    filters.compatibilityStatus ??
    (filters.compatibility && filters.compatibility !== "all"
      ? legacyCompatibilityToStatus(filters.compatibility)
      : "all");

  return libraries.filter((library) => {
    if (filters.category && filters.category !== "all" && library.category !== filters.category) return false;
    if (!matchesCompatibilityFilter(library, compatibilityStatus)) return false;
    if (!matchesMaintenanceFilter(library, filters.maintenanceStatus ?? "all")) return false;
    if (filters.status && filters.status !== "all" && library.status !== filters.status) return false;
    if (filters.typescriptSupport && filters.typescriptSupport !== "all" && library.typescriptSupport !== filters.typescriptSupport) return false;
    if (filters.typescript && !library.typescript) return false;
    if (filters.ssrSupport && filters.ssrSupport !== "all" && library.ssrSupport !== filters.ssrSupport) return false;
    if (filters.ssr && !library.ssr) return false;
    if (filters.islands && !library.islands) return false;
    if (filters.aiReady && !library.qualityBadges.includes("ai-ready")) return false;
    if (!query) return true;

    const haystack = [
      library.name,
      library.shortDescription,
      library.longDescription,
      library.packageName,
      library.category,
      ...library.categories,
      ...library.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function legacyCompatibilityToStatus(value: LibraryCompatibility): CompatibilityStatus | "all" {
  switch (value) {
    case "native":
      return "native";
    case "compat":
      return "compat";
    case "partial":
      return "experimental";
    case "incompatible":
      return "inactive";
    case "unknown":
      return "unverified";
  }
}

function maintenanceWeight(status: MaintenanceStatus): number {
  switch (status) {
    case "active":
      return 4;
    case "maintenance":
      return 3;
    case "unknown":
      return 2;
    case "inactive":
      return 1;
    case "archived":
      return 0;
  }
}

function compatibilityWeight(value: CompatibilityStatus): number {
  switch (value) {
    case "native":
      return 6;
    case "community-tested":
      return 5;
    case "compat":
      return 4;
    case "experimental":
      return 2;
    case "unverified":
      return 1;
    case "inactive":
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
        (a, b) =>
          (b.lastVerifiedAt ?? "").localeCompare(a.lastVerifiedAt ?? "") || a.name.localeCompare(b.name),
      );
    case "native-first":
      return copy.sort(
        (a, b) =>
          compatibilityWeight(b.compatibilityStatus) - compatibilityWeight(a.compatibilityStatus) ||
          a.name.localeCompare(b.name),
      );
    case "recommended":
    default:
      return copy.sort(
        (a, b) =>
          maintenanceWeight(b.maintenanceStatus) - maintenanceWeight(a.maintenanceStatus) ||
          compatibilityWeight(b.compatibilityStatus) - compatibilityWeight(a.compatibilityStatus) ||
          (b.lastVerifiedAt ?? "").localeCompare(a.lastVerifiedAt ?? "") ||
          a.name.localeCompare(b.name),
      );
  }
}

export function healthScoreInputFromLibrary(library: PreactLibrary): HealthScoreInput {
  return {
    compatibilityStatus: library.compatibilityStatus,
    maintenanceStatus: library.maintenanceStatus,
    typescriptSupport: library.typescriptSupport,
    ssrSupport: library.ssrSupport,
    islands: library.islands,
    esm: library.esm,
    lastVerifiedAt: library.lastVerifiedAt,
  };
}

export function computeHealthScore(input: HealthScoreInput): HealthScoreResult {
  const compatibility =
    input.compatibilityStatus === "native"
      ? 35
      : input.compatibilityStatus === "community-tested"
        ? 32
        : input.compatibilityStatus === "compat"
          ? 28
          : input.compatibilityStatus === "experimental"
            ? 14
            : input.compatibilityStatus === "unverified"
              ? 7
              : 0;
  const maintenance =
    input.maintenanceStatus === "active"
      ? 20
      : input.maintenanceStatus === "maintenance"
        ? 16
        : input.maintenanceStatus === "unknown"
          ? 8
          : input.maintenanceStatus === "inactive"
            ? 4
            : 2;
  const typescript =
    input.typescriptSupport === "native"
      ? 10
      : input.typescriptSupport === "bundled-types" || input.typescriptSupport === "external-types"
        ? 8
        : input.typescriptSupport === "unknown"
          ? 4
          : 0;
  const ssr =
    input.ssrSupport === "supported"
      ? 10
      : input.ssrSupport === "limited"
        ? 6
        : input.ssrSupport === "unknown"
          ? 3
          : 0;
  const islands = input.islands ? 10 : 0;
  const esm = input.esm ? 5 : 0;
  const freshness = computeFreshnessScore(input.lastVerifiedAt);
  const score = compatibility + maintenance + typescript + ssr + islands + esm + freshness;
  return { score, breakdown: { compatibility, maintenance, typescript, ssr, islands, esm, freshness } };
}

export function computeFreshnessScore(lastVerifiedAt?: string): number {
  if (!lastVerifiedAt) return 0;
  const then = new Date(`${lastVerifiedAt}T00:00:00Z`).getTime();
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

export function formatAuditSummary(library: Pick<PreactLibrary, "auditScore" | "auditDate">): string | undefined {
  if (library.auditScore === undefined) return undefined;
  const date = library.auditDate ? formatDate(library.auditDate) : "date not recorded";
  return `${library.auditScore}/100 (${date})`;
}

export function compatibilityStatusLabel(value: CompatibilityStatus): string {
  switch (value) {
    case "native":
      return "Native Preact";
    case "compat":
      return "Works with preact/compat";
    case "community-tested":
      return "Community tested";
    case "experimental":
      return "Experimental";
    case "unverified":
      return "Unverified";
    case "inactive":
      return "Inactive";
  }
}

/** @deprecated Use compatibilityStatusLabel */
export function compatibilityLabel(value: LibraryCompatibility): string {
  return compatibilityStatusLabel(legacyCompatibilityToStatus(value) as CompatibilityStatus);
}

export function maintenanceStatusLabel(value: MaintenanceStatus): string {
  switch (value) {
    case "active":
      return "Active";
    case "maintenance":
      return "Maintenance mode";
    case "inactive":
      return "Inactive";
    case "archived":
      return "Archived";
    case "unknown":
      return "Unknown";
  }
}

/** @deprecated Use maintenanceStatusLabel */
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

export function typescriptSupportLabel(value: TypeScriptSupport): string {
  switch (value) {
    case "native":
      return "Native TypeScript";
    case "bundled-types":
      return "Bundled types";
    case "external-types":
      return "External types";
    case "none":
      return "No TypeScript";
    case "unknown":
      return "Unknown";
  }
}

export function ssrSupportLabel(value: SsrSupport): string {
  switch (value) {
    case "supported":
      return "SSR supported";
    case "limited":
      return "Limited SSR";
    case "unsupported":
      return "SSR unsupported";
    case "unknown":
      return "SSR unknown";
  }
}

export function qualityBadgeLabel(value: LibraryQualityBadge): string {
  switch (value) {
    case "verified-for-preact":
      return "Verified for Preact";
    case "ssr-ready":
      return "SSR Ready";
    case "signals-compatible":
      return "Signals Compatible";
    case "tree-shakeable":
      return "Tree-shakeable";
    case "docs-complete":
      return "Documentation Complete";
    case "ai-ready":
      return "AI Ready";
    default:
      return value;
  }
}
