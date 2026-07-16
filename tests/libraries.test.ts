import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  compareUrl,
  computeHealthScore,
  filterLibraries,
  libraryUrl,
  parseCompareSlug,
  resolveAlternatives,
  sortLabel,
  sortLibraries,
  type PreactLibrary,
} from "../src/lib/libraries";
import {
  getComparePaths,
  getLibraryContentRewrites,
  loadLibraryDirectory,
  parseLibraryFrontmatter,
  validateLibraryCollection,
} from "../src/lib/library-node";

function sample(overrides: Partial<PreactLibrary> = {}): PreactLibrary {
  return {
    name: "Preact Signals",
    slug: "preact-signals",
    description: "State primitives for Preact applications.",
    category: "state-management",
    compatibility: "native",
    status: "recommended",
    typescript: true,
    ssr: true,
    islands: true,
    esm: true,
    qualityBadges: [],
    tags: ["signals"],
    route: "/libraries/preact-signals",
    file: "preact-signals.md",
    ...overrides,
  };
}

describe("library parser", () => {
  it("parses valid frontmatter", () => {
    const parsed = parseLibraryFrontmatter({
      name: "Preact Signals",
      slug: "preact-signals",
      description: "State primitives for Preact applications.",
      category: "state-management",
      compatibility: "native",
      status: "recommended",
      typescript: true,
      ssr: true,
      islands: true,
      esm: true,
      tags: ["signals"],
    });

    expect(parsed.route).toBe("/libraries/preact-signals");
    expect(parsed.category).toBe("state-management");
    expect(parsed.qualityBadges).toEqual([]);
  });

  it("rejects unknown categories", () => {
    expect(() =>
      parseLibraryFrontmatter({
        name: "Foo",
        slug: "foo",
        description: "Bar",
        category: "unknown-category",
        compatibility: "unknown",
        status: "stable",
        typescript: false,
        ssr: false,
        islands: false,
        esm: true,
        tags: [],
      }),
    ).toThrow(/Unknown category/);
  });

  it("accepts missing optional fields", () => {
    const parsed = parseLibraryFrontmatter({
      name: "HTM",
      slug: "htm",
      description: "JSX alternative.",
      category: "developer-tools",
      compatibility: "native",
      status: "stable",
      typescript: false,
      ssr: true,
      islands: true,
      esm: true,
      tags: [],
    });

    expect(parsed.packageName).toBeUndefined();
    expect(parsed.lastVerified).toBeUndefined();
  });

  it("parses quality badges", () => {
    const parsed = parseLibraryFrontmatter({
      name: "Preact Signals",
      slug: "preact-signals",
      description: "State primitives for Preact applications.",
      category: "state-management",
      compatibility: "native",
      status: "recommended",
      typescript: true,
      ssr: true,
      islands: true,
      esm: true,
      qualityBadges: ["ssr-ready", "signals-compatible", "tree-shakeable"],
      tags: ["signals"],
    });

    expect(parsed.qualityBadges).toEqual(["ssr-ready", "signals-compatible", "tree-shakeable"]);
  });

  it("rejects invalid compatibility values", () => {
    expect(() =>
      parseLibraryFrontmatter({
        name: "Invalid",
        slug: "invalid",
        description: "Invalid",
        category: "ui",
        compatibility: "maybe",
        status: "stable",
        typescript: true,
        ssr: false,
        islands: false,
        esm: true,
        tags: [],
      }),
    ).toThrow();
  });
});

describe("filter and sorting", () => {
  const libraries = [
    sample(),
    sample({
      name: "TanStack Query",
      slug: "tanstack-query",
      category: "data-fetching",
      compatibility: "unknown",
      status: "stable",
      route: "/libraries/tanstack-query",
      file: "tanstack-query.md",
      tags: ["data-fetching"],
      lastVerified: "2025-01-01",
    }),
    sample({
      name: "preact-router",
      slug: "preact-router",
      category: "routing",
      status: "stable",
      route: "/libraries/preact-router",
      file: "preact-router.md",
      tags: ["routing"],
      lastVerified: "2024-01-01",
    }),
  ];

  it("filters by category and query", () => {
    const result = filterLibraries(libraries, { category: "routing", q: "router" });
    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("preact-router");
  });

  it("sorts by name", () => {
    const result = sortLibraries(libraries, "name");
    expect(result.map((item) => item.slug)).toEqual([
      "preact-signals",
      "preact-router",
      "tanstack-query",
    ]);
  });
});

describe("health score", () => {
  it("computes weighted scores", () => {
    const result = computeHealthScore(sample({ lastVerified: "2026-06-01" }));
    expect(result.score).toBeGreaterThan(80);
    expect(result.breakdown.compatibility).toBe(35);
  });
});

describe("routing and linking", () => {
  it("builds library URLs", () => {
    expect(libraryUrl("preact-signals")).toBe("/libraries/preact-signals");
    expect(compareUrl("tanstack-query", "swr")).toBe("/compare/tanstack-query-vs-swr");
  });

  it("parses compare slugs", () => {
    expect(parseCompareSlug("preact-signals-vs-nanostores")).toEqual(["preact-signals", "nanostores"]);
    expect(parseCompareSlug("invalid")).toBeUndefined();
    expect(parseCompareSlug("same-vs-same")).toBeUndefined();
  });

  it("humanizes sort labels", () => {
    expect(sortLabel("recently-verified")).toBe("Recently verified");
  });

  it("resolves alternative links", () => {
    const libraries = [sample(), sample({ name: "Nanostores", slug: "nanostores", route: "/libraries/nanostores", file: "nanostores.md", category: "state-management", compatibility: "unknown", status: "stable" })];
    const bySlug = new Map(libraries.map((item) => [item.slug, item]));
    const links = resolveAlternatives(sample({ alternatives: ["nanostores"] }), bySlug);
    expect(links).toEqual([{ slug: "nanostores", name: "Nanostores", route: "/libraries/nanostores" }]);
  });

  it("detects duplicate slugs", () => {
    expect(() => validateLibraryCollection([sample(), sample({ file: "duplicate.md" })])).toThrow(/Duplicate/);
  });

  it("detects category slug collisions", () => {
    expect(() =>
      validateLibraryCollection([
        sample({ slug: "ui", category: "ui", route: "/libraries/ui", file: "entries/ui.md" }),
      ]),
    ).toThrow(/collides with category/i);
  });
});

describe("directory loading", () => {
  it("loads nested entries and builds rewrites", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "preacthub-"));
    fs.mkdirSync(path.join(root, "content", "libraries", "entries"), { recursive: true });
    fs.mkdirSync(path.join(root, "content", "libraries", "categories"), { recursive: true });
    fs.writeFileSync(path.join(root, "content", "libraries", "index.md"), "# Libraries\n");
    fs.writeFileSync(path.join(root, "content", "libraries", "submit.md"), "# Submit\n");
    fs.writeFileSync(
      path.join(root, "content", "libraries", "entries", "demo.md"),
      `---\nentryType: library\nname: Demo\nslug: demo\ndescription: Demo library.\ncategory: ui\ncompatibility: native\nstatus: stable\ntypescript: true\nssr: true\nislands: true\nesm: true\ntags:\n  - demo\n---\n`,
    );
    fs.writeFileSync(
      path.join(root, "content", "libraries", "categories", "ui.md"),
      `---\nentryType: category\ntitle: UI\ndescription: UI category.\n---\n`,
    );

    const directory = loadLibraryDirectory(root);
    const rewrites = getLibraryContentRewrites(root);

    expect(directory.libraries.map((item) => item.slug)).toEqual(["demo"]);
    expect(rewrites["/libraries/demo"]).toBe("/libraries/entries/demo");
    expect(rewrites["/libraries/ui"]).toBe("/libraries/categories/ui");
  });

  it("builds compare paths from alternatives", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "preacthub-compare-"));
    fs.mkdirSync(path.join(root, "content", "libraries", "entries"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "content", "libraries", "entries", "alpha.md"),
      `---\nentryType: library\nname: Alpha\nslug: alpha\ndescription: Alpha.\ncategory: ui\ncompatibility: native\nstatus: stable\ntypescript: true\nssr: true\nislands: true\nesm: true\nalternatives:\n  - beta\ntags: []\n---\n`,
    );
    fs.writeFileSync(
      path.join(root, "content", "libraries", "entries", "beta.md"),
      `---\nentryType: library\nname: Beta\nslug: beta\ndescription: Beta.\ncategory: ui\ncompatibility: native\nstatus: stable\ntypescript: true\nssr: true\nislands: true\nesm: true\ntags: []\n---\n`,
    );
    const paths = getComparePaths(root);
    expect(paths).toEqual([{ params: { pair: "alpha-vs-beta" } }]);
  });
});
