import { describe, expect, it } from "vitest";
import {
  countActiveDirectoryFilters,
  directoryEmptyStateMessage,
  parseDirectoryFilters,
} from "../src/lib/directory-filters";
import { filterLibraries, sortLibraries, type PreactLibrary } from "../src/lib/libraries";
import { attachLegacyLibraryView, libraryUrl } from "../src/lib/libraries";
import { normalizeLibraryFrontmatter } from "../src/lib/library-schema";

function library(overrides: Record<string, unknown> = {}): PreactLibrary {
  const entry = normalizeLibraryFrontmatter({
    name: "Router",
    slug: "router",
    shortDescription: "Client-side routing for Preact apps.",
    category: "routing",
    compatibilityStatus: "native",
    maintenanceStatus: "active",
    typescriptSupport: "native",
    ssrSupport: "supported",
    tags: ["router", "navigation"],
    packageName: "@example/router",
    qualityBadges: [],
    ...overrides,
  });
  const slug = String(overrides.slug ?? entry.slug);
  return attachLegacyLibraryView({ ...entry, ...overrides, slug }, libraryUrl(slug), `${slug}.md`);
}

describe("directory UI filtering", () => {
  const catalog = [
    library(),
    library({
      name: "State Kit",
      slug: "state-kit",
      shortDescription: "Signals and stores for Preact.",
      category: "state-management",
      compatibilityStatus: "compat",
      maintenanceStatus: "maintenance",
      typescriptSupport: "external-types",
      ssrSupport: "limited",
      tags: ["state"],
      packageName: "@example/state-kit",
    }),
    library({
      name: "Legacy UI",
      slug: "legacy-ui",
      shortDescription: "Older React UI bindings.",
      category: "ui",
      compatibilityStatus: "experimental",
      maintenanceStatus: "inactive",
      typescriptSupport: "unknown",
      ssrSupport: "unsupported",
      tags: ["ui"],
      packageName: "legacy-ui",
    }),
  ];

  it("searches by name, description, package and tags", () => {
    const byTag = filterLibraries(catalog, { q: "navigation" });
    expect(byTag.map((entry) => entry.slug)).toEqual(["router"]);

    const byPackage = filterLibraries(catalog, { q: "@example/state-kit" });
    expect(byPackage.map((entry) => entry.slug)).toEqual(["state-kit"]);
  });

  it("combines compatibility, maintenance, TypeScript and SSR filters", () => {
    const filtered = filterLibraries(catalog, {
      compatibilityStatus: "native",
      maintenanceStatus: "active",
      typescript: true,
      ssr: true,
    });
    expect(filtered.map((entry) => entry.slug)).toEqual(["router"]);
  });

  it("supports URL query params for combined filters", () => {
    const filters = parseDirectoryFilters(
      new URLSearchParams("q=state&compatibilityStatus=compat&maintenanceStatus=maintenance&typescript=true"),
    );
    const filtered = sortLibraries(filterLibraries(catalog, filters), filters.sort ?? "recommended");
    expect(filtered.map((entry) => entry.slug)).toEqual(["state-kit"]);
    expect(countActiveDirectoryFilters(filters)).toBe(4);
  });

  it("returns an empty state message when no results match", () => {
    const filters = parseDirectoryFilters(new URLSearchParams("q=nonexistent-package"));
    const filtered = filterLibraries(catalog, filters);
    expect(filtered).toEqual([]);
    expect(directoryEmptyStateMessage(filters)).toBe('No tools found for "nonexistent-package"');
  });
});
