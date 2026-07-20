import type { LibraryCategory } from "./categories";
import type { PreactLibrary, ResolvedAlternative } from "./libraries";
import {
  compatibilityStatusLabel,
  formatDate,
  maintenanceStatusLabel,
  ssrSupportLabel,
  typescriptSupportLabel,
  type CompatibilityStatus,
} from "./libraries";
import type { LibraryEditorialContent } from "./library-editorial";
import { buildCorrectionIssueUrl } from "./library-submission";

import { PREACTHUB_PRODUCTION_URL } from "./site-config";

export const PREACTHUB_SITE_URL = PREACTHUB_PRODUCTION_URL;

export function libraryCanonicalUrl(slug: string, siteUrl = PREACTHUB_SITE_URL): string {
  return `${siteUrl.replace(/\/$/, "")}/libraries/${slug}`;
}

export function libraryDetailTitle(library: Pick<PreactLibrary, "name">): string {
  return `${library.name} for Preact – Compatibility, Setup and Alternatives`;
}

export function libraryDetailDescription(library: Pick<PreactLibrary, "name" | "shortDescription" | "compatibilityStatus">): string {
  return `${library.shortDescription} Review ${library.name} compatibility with Preact, TypeScript and SSR support on PreactHub.`;
}

export function compatibilityStatusDescription(value: CompatibilityStatus): string {
  switch (value) {
    case "native":
      return "Built for Preact and does not require a React compatibility layer.";
    case "compat":
      return "Works with Preact through preact/compat and the standard Vite alias configuration.";
    case "community-tested":
      return "Community-maintained compatibility notes are available for Preact projects.";
    case "experimental":
      return "Compatibility is possible but still being validated for production Preact use.";
    case "unverified":
      return "Compatibility has not been verified yet in the PreactHub catalog.";
    case "inactive":
      return "Not recommended for new Preact projects because compatibility is limited or unmaintained.";
  }
}

export function resolveInstallCommand(library: Pick<PreactLibrary, "installCommand" | "packageName">): string | undefined {
  if (library.installCommand?.trim()) return library.installCommand.trim();
  if (library.packageName?.trim()) return `npm install ${library.packageName}`;
  return undefined;
}

export function libraryCorrectionUrl(library: Pick<PreactLibrary, "slug" | "name">): string {
  return buildCorrectionIssueUrl(library);
}

export interface LibraryFactRow {
  label: string;
  value: string;
}

export function buildLibraryFacts(library: PreactLibrary): LibraryFactRow[] {
  return [
    { label: "Preact compatibility", value: compatibilityStatusLabel(library.compatibilityStatus) },
    {
      label: "Tested Preact versions",
      value: library.testedPreactVersions.length
        ? library.testedPreactVersions.join(", ")
        : "Not documented",
    },
    { label: "TypeScript", value: typescriptSupportLabel(library.typescriptSupport) },
    { label: "SSR", value: ssrSupportLabel(library.ssrSupport) },
    { label: "Maintenance", value: maintenanceStatusLabel(library.maintenanceStatus) },
    { label: "License", value: library.license ?? "Not documented" },
    { label: "Last verified", value: formatDate(library.lastVerifiedAt) },
  ];
}

export interface LibraryLinkItem {
  label: string;
  href: string;
  external: boolean;
}

export function buildLibraryExternalLinks(library: PreactLibrary): LibraryLinkItem[] {
  const links: LibraryLinkItem[] = [];
  if (library.repositoryUrl ?? library.repository) {
    links.push({
      label: "GitHub",
      href: library.repositoryUrl ?? library.repository!,
      external: true,
    });
  }
  if (library.packageName) {
    links.push({
      label: "npm",
      href: library.npmUrl ?? `https://www.npmjs.com/package/${encodeURIComponent(library.packageName)}`,
      external: true,
    });
  }
  if (library.documentationUrl ?? library.documentation) {
    links.push({
      label: "Documentation",
      href: library.documentationUrl ?? library.documentation!,
      external: true,
    });
  }
  if (library.homepageUrl ?? library.homepage) {
    links.push({
      label: "Homepage",
      href: library.homepageUrl ?? library.homepage!,
      external: true,
    });
  }
  return links;
}

export function buildLibraryStructuredData(
  library: PreactLibrary,
  category: LibraryCategory | undefined,
  alternatives: ResolvedAlternative[],
  siteUrl = PREACTHUB_SITE_URL,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: library.name,
    description: library.shortDescription,
    applicationCategory: category?.name ?? library.category,
    operatingSystem: "Web",
    softwareVersion: library.testedPreactVersions[0],
    license: library.license,
    url: libraryCanonicalUrl(library.slug, siteUrl),
    sameAs: [
      library.repositoryUrl,
      library.documentationUrl,
      library.homepageUrl,
      library.npmUrl,
    ].filter(Boolean),
    isPartOf: {
      "@type": "CollectionPage",
      name: "PreactHub library directory",
      url: `${siteUrl.replace(/\/$/, "")}/libraries`,
    },
  };
}

export function isUnknownLibraryRoute(
  route: string,
  slug: string | undefined,
  knownSlugs: Set<string>,
  categorySlugs: Set<string>,
): boolean {
  if (!slug || slug === "submit") return false;
  if (knownSlugs.has(slug) || categorySlugs.has(slug)) return false;
  return route.startsWith("/libraries/");
}

export type { LibraryEditorialContent };
