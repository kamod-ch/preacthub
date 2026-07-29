export interface EditorialSection {
  title: string;
  body: string;
}

export interface EditorialGroup {
  id: string;
  title: string;
  sections: EditorialSection[];
}

export type DetailTabId = "overview" | "setup" | "compatibility" | "alternatives";

export interface DetailTab {
  id: DetailTabId;
  label: string;
}

export const LIBRARY_DETAIL_TABS: DetailTab[] = [
  { id: "overview", label: "Overview" },
  { id: "setup", label: "Setup" },
  { id: "compatibility", label: "Compatibility" },
  { id: "alternatives", label: "Alternatives" },
];

export const AI_DETAIL_TABS: DetailTab[] = [
  { id: "overview", label: "Overview" },
  { id: "setup", label: "Integration" },
  { id: "compatibility", label: "Details" },
  { id: "alternatives", label: "Similar" },
];

const RUNTIME_PATTERNS = [/ssr/i, /islands/i, /deployment/i, /runtime/i];
const INTEGRATION_PATTERNS = [/preact configuration/i, /preact config/i, /vite/i, /configuration/i];
const OVERVIEW_PATTERNS = [/introduction/i, /overview/i, /about/i];

function matchesAny(title: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(title));
}

function groupIdForTitle(title: string): string {
  if (matchesAny(title, OVERVIEW_PATTERNS)) return "overview";
  if (matchesAny(title, RUNTIME_PATTERNS)) return "runtime";
  if (matchesAny(title, INTEGRATION_PATTERNS)) return "integration";
  return "other";
}

const GROUP_LABELS: Record<string, string> = {
  overview: "Overview",
  runtime: "Runtime & deployment",
  integration: "Preact integration",
  other: "More details",
};

const GROUP_ORDER = ["overview", "runtime", "integration", "other"];

export function groupEditorialSections(sections: EditorialSection[]): EditorialGroup[] {
  const buckets = new Map<string, EditorialSection[]>();

  for (const section of sections) {
    const id = groupIdForTitle(section.title);
    const existing = buckets.get(id) ?? [];
    existing.push(section);
    buckets.set(id, existing);
  }

  return GROUP_ORDER.filter((id) => buckets.has(id)).map((id) => ({
    id,
    title: GROUP_LABELS[id] ?? id,
    sections: buckets.get(id) ?? [],
  }));
}

export interface TocEntry {
  id: string;
  label: string;
}

export function buildDetailTocEntries(
  tabs: DetailTab[],
  hasSetup: boolean,
  hasCompatibilityContent: boolean,
  hasAlternatives: boolean,
): DetailTab[] {
  return tabs.filter((tab) => {
    if (tab.id === "setup") return hasSetup;
    if (tab.id === "compatibility") return hasCompatibilityContent;
    if (tab.id === "alternatives") return hasAlternatives;
    return true;
  });
}
