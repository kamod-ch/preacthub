import type { PreactLibrary } from "./libraries";

export type ComputedMaintenanceStatus =
  | "active"
  | "stable"
  | "low-activity"
  | "archived"
  | "unknown";

/**
 * Computes a simple maintenance status from objective signals.
 *
 * Rules:
 * - Archived: maintenanceStatus is "archived"
 * - Active: maintenanceStatus is "active" AND (lastCommitAt or lastReleaseAt within 180 days, OR lastVerifiedAt within 180 days)
 * - Stable: maintenanceStatus is "active" or "maintenance" without recent activity signals
 * - Low Activity: maintenanceStatus is "inactive" or "maintenance" with stale signals
 * - Unknown: insufficient data (no dates and maintenanceStatus is "unknown")
 */
export function computeMaintenanceStatus(
  library: Pick<
    PreactLibrary,
    "maintenanceStatus" | "lastCommitAt" | "lastReleaseAt" | "lastVerifiedAt"
  >,
): ComputedMaintenanceStatus {
  if (library.maintenanceStatus === "archived") return "archived";

  const recentDate = mostRecentDate([
    library.lastCommitAt,
    library.lastReleaseAt,
    library.lastVerifiedAt,
  ]);

  if (library.maintenanceStatus === "active") {
    if (recentDate && daysSince(recentDate) <= 180) return "active";
    if (recentDate) return "stable";
    return "stable";
  }

  if (library.maintenanceStatus === "maintenance") {
    if (recentDate && daysSince(recentDate) <= 365) return "stable";
    return "low-activity";
  }

  if (library.maintenanceStatus === "inactive") return "low-activity";

  if (!recentDate) return "unknown";

  if (daysSince(recentDate) <= 180) return "active";
  if (daysSince(recentDate) <= 365) return "stable";
  return "low-activity";
}

export function computedMaintenanceLabel(status: ComputedMaintenanceStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "stable":
      return "Stable";
    case "low-activity":
      return "Low Activity";
    case "archived":
      return "Archived";
    case "unknown":
      return "Unknown";
  }
}

function mostRecentDate(dates: (string | undefined)[]): string | undefined {
  const valid = dates.filter(Boolean) as string[];
  if (!valid.length) return undefined;
  return valid.sort((a, b) => b.localeCompare(a))[0];
}

function daysSince(isoDate: string): number {
  const then = new Date(`${isoDate}T00:00:00Z`).getTime();
  if (Number.isNaN(then)) return Infinity;
  return Math.floor((Date.now() - then) / 86_400_000);
}

export interface MaintenanceSignals {
  lastCommit?: string;
  lastRelease?: string;
  hasLicense: boolean;
  hasDocumentation: boolean;
  typescriptSupport: boolean;
  openSource?: boolean;
  computedStatus: ComputedMaintenanceStatus;
}

export function buildMaintenanceSignals(
  library: PreactLibrary,
): MaintenanceSignals {
  return {
    lastCommit: library.lastCommitAt,
    lastRelease: library.lastReleaseAt,
    hasLicense: Boolean(library.license),
    hasDocumentation: Boolean(library.documentationUrl),
    typescriptSupport:
      library.typescriptSupport === "native" ||
      library.typescriptSupport === "bundled-types" ||
      library.typescriptSupport === "external-types",
    openSource: library.openSource,
    computedStatus: computeMaintenanceStatus(library),
  };
}
