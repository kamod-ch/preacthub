import type { PreactLibrary } from "../../src/lib/libraries";

export function libraryLinks(library: PreactLibrary) {
  return [
    library.repository ? { label: "Repository", href: library.repository } : undefined,
    library.documentation ? { label: "Documentation", href: library.documentation } : undefined,
    library.packageName ? { label: "npm", href: `https://www.npmjs.com/package/${library.packageName}` } : undefined,
    library.homepage ? { label: "Homepage", href: library.homepage } : undefined,
  ].filter((value): value is { label: string; href: string } => Boolean(value));
}

export function topTags(libraries: PreactLibrary[]): string[] {
  const counts = new Map<string, number>();
  for (const library of libraries) {
    for (const tag of library.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([tag]) => tag);
}

export function tagUrl(tag: string, _isHome?: boolean): string {
  return `/libraries?q=${encodeURIComponent(tag)}`;
}

export function yesNoUnknown(value: boolean | undefined, unknown = "Unknown") {
  return value === undefined ? unknown : value ? "Yes" : "No";
}

export function resolveNavLink(link: string, isHome: boolean): string {
  if (link === "/libraries#categories" && isHome) return "#categories";
  return link;
}

export const DIRECTORY_SEARCH_EVENT = "ph:directory-search";

export function applyDirectorySearch(q: string, options?: { scroll?: boolean }): void {
  if (typeof window === "undefined") return;
  const trimmed = q.trim();
  window.dispatchEvent(new CustomEvent(DIRECTORY_SEARCH_EVENT, { detail: { q: trimmed } }));
  const url = new URL(window.location.href);
  if (trimmed) url.searchParams.set("q", trimmed);
  else url.searchParams.delete("q");
  window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  const heroInput = document.querySelector<HTMLInputElement>(".ph-hero-search-input");
  if (heroInput) heroInput.value = trimmed;
  if (options?.scroll !== false) {
    window.setTimeout(() => {
      document.getElementById("all-libraries-title")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }
}
