import { z } from "zod";
import {
  categories,
  getCategory,
  isAiCategory,
  type CatalogSection,
  type LibraryCategorySlug,
} from "./categories";
import {
  hostingTypeValues,
  packageManagerValues,
  pricingModelValues,
  projectTypeValues,
  runtimeValues,
} from "./project-types";
import { validateSubcategories } from "./subcategories";

export const AI_READY_MIN_AUDIT_SCORE = 80;

export const qualityBadgeValues = [
  "verified-for-preact",
  "ssr-ready",
  "signals-compatible",
  "tree-shakeable",
  "docs-complete",
  "ai-ready",
] as const;
export type LibraryQualityBadge = (typeof qualityBadgeValues)[number];

export const compatibilityStatusValues = [
  "native",
  "compat",
  "community-tested",
  "experimental",
  "unverified",
  "inactive",
] as const;
export type CompatibilityStatus = (typeof compatibilityStatusValues)[number];

export const typescriptSupportValues = [
  "native",
  "bundled-types",
  "external-types",
  "none",
  "unknown",
] as const;
export type TypeScriptSupport = (typeof typescriptSupportValues)[number];

export const ssrSupportValues = ["supported", "limited", "unsupported", "unknown"] as const;
export type SsrSupport = (typeof ssrSupportValues)[number];

export const maintenanceStatusValues = [
  "active",
  "maintenance",
  "inactive",
  "archived",
  "unknown",
] as const;
export type MaintenanceStatus = (typeof maintenanceStatusValues)[number];

const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected ISO date YYYY-MM-DD");

const optionalUrlSchema = z
  .string()
  .url("Expected a valid http(s) URL")
  .optional();

/** Raw frontmatter: accepts canonical fields and legacy aliases for backward compatibility. */
export const libraryFrontmatterInputSchema = z
  .object({
    entryType: z.literal("library").optional(),
    name: z.string().min(1, "name is required"),
    slug: z.string().min(1, "slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),

    shortDescription: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    longDescription: z.string().min(1).optional(),

    category: z.string().min(1, "category is required"),
    categories: z.array(z.string().min(1)).optional(),

    packageName: z.string().min(1).optional(),
    repositoryUrl: optionalUrlSchema,
    repository: optionalUrlSchema,
    npmUrl: optionalUrlSchema,
    documentationUrl: optionalUrlSchema,
    documentation: optionalUrlSchema,
    homepageUrl: optionalUrlSchema,
    homepage: optionalUrlSchema,
    license: z.string().min(1).optional(),

    compatibilityStatus: z.enum(compatibilityStatusValues).optional(),
    compatibility: z.enum(["native", "compat", "partial", "incompatible", "unknown"]).optional(),
    status: z.enum(["recommended", "stable", "experimental", "deprecated"]).optional(),
    maintenanceStatus: z.enum(maintenanceStatusValues).optional(),

    testedPreactVersions: z.array(z.string().min(1)).optional(),
    testedWith: z
      .object({
        preact: z.string().min(1),
        library: z.string().min(1),
      })
      .optional(),

    typescriptSupport: z.enum(typescriptSupportValues).optional(),
    typescript: z.boolean().optional(),
    ssrSupport: z.enum(ssrSupportValues).optional(),
    ssr: z.boolean().optional(),
    islands: z.boolean().optional(),
    esm: z.boolean().optional(),

    lastVerifiedAt: isoDateSchema.optional(),
    lastVerified: isoDateSchema.optional(),
    verificationSource: z.string().min(1).optional(),

    installCommand: z.string().min(1).optional(),
    minimalExample: z.string().min(1).optional(),

    limitations: z.array(z.string().min(1)).optional(),
    alternatives: z.array(z.string().min(1)).optional(),
    tags: z.array(z.string().min(1)).default([]),
    featured: z.boolean().optional(),

    bundleSize: z.string().min(1).optional(),
    qualityBadges: z.array(z.enum(qualityBadgeValues)).default([]),
    auditScore: z.number().int().min(0).max(100).optional(),
    auditUrl: optionalUrlSchema,
    auditDate: isoDateSchema.optional(),
    notes: z.array(z.string().min(1)).optional(),

    catalogDomain: z.enum(["preact", "ai"]).optional(),
    subcategories: z.array(z.string().min(1)).optional(),
    projectType: z.enum(projectTypeValues).optional(),
    hostingType: z.enum(hostingTypeValues).optional(),
    runtimes: z.array(z.enum(runtimeValues)).optional(),
    languages: z.array(z.string().min(1)).optional(),
    packageManager: z.enum(packageManagerValues).optional(),
    preactCompatible: z.boolean().optional(),
    mcpSupport: z.boolean().optional(),
    openSource: z.boolean().optional(),
    verified: z.boolean().optional(),
    stars: z.number().int().min(0).optional(),
    lastReleaseAt: isoDateSchema.optional(),
    lastCommitAt: isoDateSchema.optional(),
    pricing: z
      .object({
        model: z.enum(pricingModelValues),
        startingPrice: z.number().optional(),
        currency: z.string().min(1).optional(),
      })
      .optional(),
    useCases: z.array(z.string().min(1)).optional(),
    keyFeatures: z.array(z.string().min(1)).optional(),
    supportedProviders: z.array(z.string().min(1)).optional(),
    supportedModels: z.array(z.string().min(1)).optional(),
    deploymentOptions: z.array(z.string().min(1)).optional(),
    repositoryArchived: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const isAiEntry =
      data.catalogDomain === "ai" || isAiCategory(data.category);

    if (!data.shortDescription && !data.description) {
      ctx.addIssue({
        code: "custom",
        message: "shortDescription (or legacy description) is required",
        path: ["shortDescription"],
      });
    }

    if (!isAiEntry && !data.compatibilityStatus && !data.compatibility) {
      ctx.addIssue({
        code: "custom",
        message: "compatibilityStatus (or legacy compatibility) is required",
        path: ["compatibilityStatus"],
      });
    }

    if (!data.maintenanceStatus && !data.status) {
      ctx.addIssue({
        code: "custom",
        message: "maintenanceStatus (or legacy status) is required",
        path: ["maintenanceStatus"],
      });
    }

    if (
      !isAiEntry &&
      data.typescriptSupport === undefined &&
      data.typescript === undefined
    ) {
      ctx.addIssue({
        code: "custom",
        message: "typescriptSupport (or legacy typescript boolean) is required",
        path: ["typescriptSupport"],
      });
    }

    if (!isAiEntry && data.ssrSupport === undefined && data.ssr === undefined) {
      ctx.addIssue({
        code: "custom",
        message: "ssrSupport (or legacy ssr boolean) is required",
        path: ["ssrSupport"],
      });
    }

    if (isAiEntry && !data.projectType) {
      ctx.addIssue({
        code: "custom",
        message: "projectType is required for AI catalog entries",
        path: ["projectType"],
      });
    }

    const invalidSubs = validateSubcategories(data.category, data.subcategories ?? []);
    if (invalidSubs.length) {
      ctx.addIssue({
        code: "custom",
        message: `Unknown subcategories for category "${data.category}": ${invalidSubs.join(", ")}`,
        path: ["subcategories"],
      });
    }

    const verifiedAt = data.lastVerifiedAt ?? data.lastVerified;
    if (verifiedAt && !data.verificationSource) {
      ctx.addIssue({
        code: "custom",
        message: "verificationSource is required when lastVerifiedAt is set",
        path: ["verificationSource"],
      });
    }
    if (data.verificationSource && !verifiedAt) {
      ctx.addIssue({
        code: "custom",
        message: "lastVerifiedAt is required when verificationSource is set",
        path: ["lastVerifiedAt"],
      });
    }

    if (data.qualityBadges.includes("ai-ready")) {
      if (!data.auditDate) {
        ctx.addIssue({
          code: "custom",
          message: "ai-ready requires auditDate (YYYY-MM-DD)",
          path: ["auditDate"],
        });
      }
      if (data.auditScore === undefined || data.auditScore < AI_READY_MIN_AUDIT_SCORE) {
        ctx.addIssue({
          code: "custom",
          message: `ai-ready requires auditScore >= ${AI_READY_MIN_AUDIT_SCORE}`,
          path: ["auditScore"],
        });
      }
    }
  });

export type LibraryFrontmatterInput = z.infer<typeof libraryFrontmatterInputSchema>;

/** Normalized catalog entry — canonical TypeScript source of truth after parsing. */
export interface LibraryEntry {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  category: LibraryCategorySlug;
  categories: LibraryCategorySlug[];
  packageName?: string;
  repositoryUrl?: string;
  npmUrl?: string;
  documentationUrl?: string;
  homepageUrl?: string;
  license?: string;
  compatibilityStatus: CompatibilityStatus;
  testedPreactVersions: string[];
  typescriptSupport: TypeScriptSupport;
  ssrSupport: SsrSupport;
  maintenanceStatus: MaintenanceStatus;
  lastVerifiedAt?: string;
  verificationSource?: string;
  installCommand?: string;
  minimalExample?: string;
  limitations?: string[];
  alternatives?: string[];
  tags: string[];
  featured?: boolean;
  islands: boolean;
  esm: boolean;
  bundleSize?: string;
  qualityBadges: (typeof qualityBadgeValues)[number][];
  auditScore?: number;
  auditUrl?: string;
  auditDate?: string;
  notes?: string[];
  catalogDomain: CatalogSection;
  subcategories?: string[];
  projectType?: import("./project-types").ProjectType;
  hostingType?: import("./project-types").HostingType;
  runtimes?: import("./project-types").Runtime[];
  languages?: string[];
  packageManager?: import("./project-types").PackageManager;
  preactCompatible?: boolean;
  mcpSupport?: boolean;
  openSource?: boolean;
  verified?: boolean;
  stars?: number;
  lastReleaseAt?: string;
  lastCommitAt?: string;
  pricing?: {
    model: import("./project-types").PricingModel;
    startingPrice?: number;
    currency?: string;
  };
  useCases?: string[];
  keyFeatures?: string[];
  supportedProviders?: string[];
  supportedModels?: string[];
  deploymentOptions?: string[];
  repositoryArchived?: boolean;
}

export function npmPackageUrl(packageName: string): string {
  return `https://www.npmjs.com/package/${encodeURIComponent(packageName)}`;
}

export function mapLegacyCompatibility(value: NonNullable<LibraryFrontmatterInput["compatibility"]>): CompatibilityStatus {
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

export function mapLegacyStatus(
  value: NonNullable<LibraryFrontmatterInput["status"]>,
  compatibilityStatus: CompatibilityStatus,
): MaintenanceStatus {
  switch (value) {
    case "recommended":
    case "stable":
      return "active";
    case "experimental":
      return compatibilityStatus === "experimental" ? "active" : "active";
    case "deprecated":
      return "archived";
  }
}

export function mapLegacyTypescript(value: boolean): TypeScriptSupport {
  return value ? "native" : "none";
}

export function mapLegacySsr(value: boolean): SsrSupport {
  return value ? "supported" : "unsupported";
}

export function normalizeLibraryFrontmatter(input: LibraryFrontmatterInput): LibraryEntry {
  const primaryCategory = getCategory(input.category);
  if (!primaryCategory) {
    throw new Error(`Unknown category "${input.category}"`);
  }

  const extraCategories = (input.categories ?? [])
    .map((slug) => getCategory(slug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category))
    .map((category) => category.slug as LibraryCategorySlug);

  const unknownExtraCategories = (input.categories ?? []).filter((slug) => !getCategory(slug));
  if (unknownExtraCategories.length) {
    throw new Error(`Unknown categories: ${unknownExtraCategories.join(", ")}`);
  }

  const compatibilityStatus =
    input.compatibilityStatus ??
    (input.compatibility ? mapLegacyCompatibility(input.compatibility) : "unverified");

  const maintenanceStatus =
    input.maintenanceStatus ??
    (input.status ? mapLegacyStatus(input.status, compatibilityStatus) : "unknown");

  const resolvedCompatibilityStatus =
    input.status === "experimental" && !input.compatibilityStatus ? "experimental" : compatibilityStatus;

  const testedPreactVersions =
    input.testedPreactVersions ??
    (input.testedWith?.preact ? [input.testedWith.preact] : []);

  const typescriptSupport =
    input.typescriptSupport ??
    (input.typescript !== undefined ? mapLegacyTypescript(input.typescript) : "unknown");

  const ssrSupport =
    input.ssrSupport ?? (input.ssr !== undefined ? mapLegacySsr(input.ssr) : "unknown");

  const packageName = input.packageName;
  const npmUrl = input.npmUrl ?? (packageName ? npmPackageUrl(packageName) : undefined);
  const isAiEntry =
    input.catalogDomain === "ai" || primaryCategory.section === "ai";
  const catalogDomain: CatalogSection = isAiEntry ? "ai" : "preact";

  return {
    name: input.name,
    slug: input.slug,
    shortDescription: input.shortDescription ?? input.description!,
    longDescription: input.longDescription,
    category: primaryCategory.slug as LibraryCategorySlug,
    categories: [primaryCategory.slug as LibraryCategorySlug, ...extraCategories.filter((slug) => slug !== primaryCategory.slug)],
    packageName,
    repositoryUrl: input.repositoryUrl ?? input.repository,
    npmUrl,
    documentationUrl: input.documentationUrl ?? input.documentation,
    homepageUrl: input.homepageUrl ?? input.homepage,
    license: input.license,
    compatibilityStatus: resolvedCompatibilityStatus,
    testedPreactVersions,
    typescriptSupport,
    ssrSupport,
    maintenanceStatus,
    lastVerifiedAt: input.lastVerifiedAt ?? input.lastVerified,
    verificationSource: input.verificationSource,
    installCommand: input.installCommand ?? (packageName ? `npm install ${packageName}` : undefined),
    minimalExample: input.minimalExample,
    limitations: input.limitations,
    alternatives: input.alternatives,
    tags: input.tags,
    featured: input.featured,
    islands: input.islands ?? false,
    esm: input.esm ?? false,
    bundleSize: input.bundleSize,
    qualityBadges: input.qualityBadges,
    auditScore: input.auditScore,
    auditUrl: input.auditUrl,
    auditDate: input.auditDate,
    notes: input.notes,
    catalogDomain,
    subcategories: input.subcategories,
    projectType: input.projectType,
    hostingType: input.hostingType,
    runtimes: input.runtimes,
    languages: input.languages,
    packageManager: input.packageManager,
    preactCompatible: input.preactCompatible,
    mcpSupport: input.mcpSupport,
    openSource: input.openSource,
    verified: input.verified,
    stars: input.stars,
    lastReleaseAt: input.lastReleaseAt,
    lastCommitAt: input.lastCommitAt,
    pricing: input.pricing,
    useCases: input.useCases,
    keyFeatures: input.keyFeatures,
    supportedProviders: input.supportedProviders,
    supportedModels: input.supportedModels,
    deploymentOptions: input.deploymentOptions,
    repositoryArchived: input.repositoryArchived,
  };
}

export function formatLibraryValidationError(error: z.ZodError, file: string, slug?: string): string {
  const location = slug ? `${file} (slug: ${slug})` : file;
  const details = error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "root";
      return `${path}: ${issue.message}`;
    })
    .join("; ");
  return `Invalid library entry in ${location}: ${details}`;
}

export function parseLibraryFrontmatterInput(frontmatter: unknown, file = "library.md"): LibraryEntry {
  const slug = typeof frontmatter === "object" && frontmatter && "slug" in frontmatter
    ? String((frontmatter as { slug?: unknown }).slug ?? "")
    : undefined;

  const parsed = libraryFrontmatterInputSchema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new Error(formatLibraryValidationError(parsed.error, file, slug || undefined));
  }

  try {
    return normalizeLibraryFrontmatter(parsed.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid library entry in ${file}${slug ? ` (slug: ${slug})` : ""}: ${message}`);
  }
}

export function validateLibrarySlugMatchesFile(entry: LibraryEntry, file: string): void {
  const basename = file.split("/").pop()?.replace(/\.md$/i, "");
  if (basename && basename !== entry.slug) {
    throw new Error(
      `Invalid library entry in ${file} (slug: ${entry.slug}): slug must match filename "${basename}.md"`,
    );
  }
}

export function validateLibraryAlternatives(
  entry: LibraryEntry,
  knownSlugs: Set<string>,
  file: string,
): void {
  for (const alternative of entry.alternatives ?? []) {
    if (!knownSlugs.has(alternative)) {
      throw new Error(
        `Invalid library entry in ${file} (slug: ${entry.slug}): unknown alternative slug "${alternative}"`,
      );
    }
    if (alternative === entry.slug) {
      throw new Error(
        `Invalid library entry in ${file} (slug: ${entry.slug}): alternative must not reference itself`,
      );
    }
  }
}

export const categorySlugSet = new Set<string>(categories.map((category) => category.slug));
