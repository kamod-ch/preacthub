import { describe, expect, it } from "vitest";
import { aiCategories, categoryRoute, getCategory, isAiCategory } from "../src/lib/categories";
import { parseDirectoryFilters, serializeDirectoryFilters } from "../src/lib/directory-filters";
import {
  attachLegacyLibraryView,
  filterLibraries,
  libraryBelongsToCategory,
  libraryUrl,
  sortLibraries,
  type PreactLibrary,
} from "../src/lib/libraries";
import { computeMaintenanceStatus } from "../src/lib/maintenance-computed";
import { normalizeLibraryFrontmatter } from "../src/lib/library-schema";
import { findRelatedProjects } from "../src/lib/related-projects";

function aiTool(overrides: Record<string, unknown> = {}): PreactLibrary {
  const entry = normalizeLibraryFrontmatter({
    name: "Test Tool",
    slug: "test-tool",
    shortDescription: "A test AI tool.",
    category: "ai-infrastructure",
    catalogDomain: "ai",
    projectType: "platform",
    hostingType: "open-source",
    maintenanceStatus: "active",
    tags: ["rest-api"],
    subcategories: ["vector-databases"],
    runtimes: ["python"],
    openSource: true,
    mcpSupport: false,
    qualityBadges: [],
    ...overrides,
  });
  return attachLegacyLibraryView(entry, libraryUrl(entry.slug), "test-tool.md");
}

describe("AI categories", () => {
  it("registers four AI categories", () => {
    expect(aiCategories).toHaveLength(4);
    expect(aiCategories.map((c) => c.slug)).toEqual([
      "ai-infrastructure",
      "agent-frameworks",
      "browser-automation",
      "ai-developer-apis",
    ]);
  });

  it("uses /categories/ routes for AI categories", () => {
    expect(categoryRoute("ai-infrastructure")).toBe("/categories/ai-infrastructure");
    expect(categoryRoute("ui")).toBe("/libraries/ui");
    expect(isAiCategory("agent-frameworks")).toBe(true);
    expect(isAiCategory("ui")).toBe(false);
  });

  it("resolves category metadata", () => {
    const cat = getCategory("ai-developer-apis");
    expect(cat?.seoTitle).toBe("Best AI Developer APIs and SDKs");
  });
});

describe("multi-category membership", () => {
  it("matches secondary categories", () => {
    const tool = aiTool({
      slug: "playwright-ai",
      categories: ["testing"],
    });
    expect(libraryBelongsToCategory(tool, "ai-infrastructure")).toBe(true);
    expect(libraryBelongsToCategory(tool, "testing")).toBe(true);
  });
});

describe("AI filters", () => {
  const tools = [
    aiTool({ slug: "a", openSource: true, mcpSupport: true, typescriptSupport: "native", typescript: true }),
    aiTool({ slug: "b", openSource: false, hostingType: "hosted", pricing: { model: "usage-based" } }),
  ];

  it("filters by open source and MCP", () => {
    const filtered = filterLibraries(tools, { openSource: true, mcp: true });
    expect(filtered.map((t) => t.slug)).toEqual(["a"]);
  });

  it("round-trips URL query parameters", () => {
    const params = new URLSearchParams("language=typescript&openSource=true&mcp=true");
    const parsed = parseDirectoryFilters(params, "agent-frameworks");
    expect(parsed.language).toBe("typescript");
    expect(parsed.openSource).toBe(true);
    expect(parsed.mcp).toBe(true);
    expect(parsed.category).toBe("agent-frameworks");

    const serialized = serializeDirectoryFilters(parsed);
    expect(serialized.get("language")).toBe("typescript");
    expect(serialized.get("openSource")).toBe("true");
    expect(serialized.get("mcp")).toBe("true");
  });

  it("sorts by name", () => {
    const sorted = sortLibraries(tools, "name");
    expect(sorted.map((t) => t.slug)).toEqual(["a", "b"]);
  });

  it("finds related projects without duplicates", () => {
    const source = aiTool({ slug: "source", tags: ["rest-api", "streaming"] });
    const related = aiTool({ slug: "related", tags: ["rest-api"], subcategories: ["vector-databases"] });
    const unrelated = aiTool({ slug: "other", category: "ai-developer-apis", subcategories: ["llm-apis"], tags: [] });
    const all = [source, related, unrelated];
    const map = new Map(all.map((t) => [t.slug, t]));
    const results = findRelatedProjects(source, all, map);
    expect(results.map((t) => t.slug)).toContain("related");
    expect(results.map((t) => t.slug)).not.toContain("source");
    expect(new Set(results.map((t) => t.slug)).size).toBe(results.length);
    expect(results.length).toBeLessThanOrEqual(6);
  });
});

describe("maintenance status", () => {
  it("returns archived for archived entries", () => {
    const tool = aiTool({ maintenanceStatus: "archived" });
    expect(computeMaintenanceStatus(tool)).toBe("archived");
  });

  it("returns unknown without activity signals", () => {
    const tool = aiTool({ maintenanceStatus: "unknown" });
    expect(computeMaintenanceStatus(tool)).toBe("unknown");
  });
});

describe("legacy single-category entries", () => {
  it("still normalizes preact libraries with single category", () => {
    const entry = normalizeLibraryFrontmatter({
      name: "Preact Signals",
      slug: "preact-signals-test",
      shortDescription: "Signals.",
      category: "state-management",
      compatibilityStatus: "native",
      typescriptSupport: "native",
      ssrSupport: "supported",
      maintenanceStatus: "active",
      tags: [],
      qualityBadges: [],
    });
    expect(entry.categories).toEqual(["state-management"]);
    expect(entry.catalogDomain).toBe("preact");
  });
});
