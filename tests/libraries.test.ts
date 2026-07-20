import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  attachLegacyLibraryView,
  compareUrl,
  computeHealthScore,
  filterLibraries,
  healthScoreInputFromLibrary,
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
  validateLibraryCatalog,
  validateLibraryCollection,
} from "../src/lib/library-node";
import {
  normalizeLibraryFrontmatter,
  parseLibraryFrontmatterInput,
} from "../src/lib/library-schema";

function sample(overrides: Partial<PreactLibrary> = {}): PreactLibrary {
  const entry = normalizeLibraryFrontmatter({
    name: "Preact Signals",
    slug: "preact-signals",
    shortDescription: "State primitives for Preact applications.",
    category: "state-management",
    compatibilityStatus: "native",
    typescriptSupport: "native",
    ssrSupport: "supported",
    maintenanceStatus: "active",
    tags: ["signals"],
    islands: true,
    esm: true,
    qualityBadges: [],
  });
  const slug = overrides.slug ?? entry.slug;
  return attachLegacyLibraryView(
    { ...entry, ...overrides },
    overrides.route ?? libraryUrl(slug),
    overrides.file ?? "preact-signals.md",
  );
}

describe("library parser", () => {
  it("parses canonical frontmatter", () => {
    const parsed = parseLibraryFrontmatter({
      name: "Preact Signals",
      slug: "preact-signals",
      shortDescription: "State primitives for Preact applications.",
      category: "state-management",
      compatibilityStatus: "native",
      typescriptSupport: "native",
      ssrSupport: "supported",
      maintenanceStatus: "active",
      tags: ["signals"],
      islands: true,
      esm: true,
    }, "entries/preact-signals.md");

    expect(parsed.route).toBe("/libraries/preact-signals");
    expect(parsed.compatibilityStatus).toBe("native");
    expect(parsed.qualityBadges).toEqual([]);
  });

  it("accepts legacy frontmatter aliases", () => {
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
    }, "entries/htm.md");

    expect(parsed.shortDescription).toBe("JSX alternative.");
    expect(parsed.compatibilityStatus).toBe("native");
    expect(parsed.typescriptSupport).toBe("none");
    expect(parsed.ssrSupport).toBe("supported");
    expect(parsed.lastVerifiedAt).toBeUndefined();
  });

  it("rejects unknown categories", () => {
    expect(() =>
      parseLibraryFrontmatter({
        name: "Foo",
        slug: "foo",
        shortDescription: "Bar",
        category: "unknown-category",
        compatibilityStatus: "unverified",
        maintenanceStatus: "unknown",
        typescriptSupport: "unknown",
        ssrSupport: "unknown",
        tags: [],
      }),
    ).toThrow(/Unknown category/);
  });

  it("requires verificationSource when lastVerifiedAt is set", () => {
    expect(() =>
      parseLibraryFrontmatterInput({
        name: "Example",
        slug: "example",
        shortDescription: "Example library.",
        category: "ui",
        compatibilityStatus: "native",
        maintenanceStatus: "active",
        typescriptSupport: "native",
        ssrSupport: "supported",
        lastVerifiedAt: "2026-01-01",
        tags: [],
      }),
    ).toThrow(/verificationSource/);
  });

  it("rejects invalid compatibilityStatus values", () => {
    expect(() =>
      parseLibraryFrontmatter({
        name: "Invalid",
        slug: "invalid",
        shortDescription: "Invalid",
        category: "ui",
        compatibilityStatus: "maybe",
        maintenanceStatus: "active",
        typescriptSupport: "native",
        ssrSupport: "supported",
        tags: [],
      }),
    ).toThrow();
  });

  it("requires audit evidence for ai-ready badge", () => {
    expect(() =>
      parseLibraryFrontmatter({
        name: "Example",
        slug: "example",
        shortDescription: "Example library.",
        category: "ui",
        compatibilityStatus: "native",
        maintenanceStatus: "active",
        typescriptSupport: "native",
        ssrSupport: "supported",
        qualityBadges: ["ai-ready"],
        tags: [],
      }),
    ).toThrow(/auditDate|auditScore/);
  });
});

describe("filter and sorting", () => {
  const libraries = [
    sample(),
    sample({
      name: "TanStack Query",
      slug: "tanstack-query",
      category: "data-fetching",
      compatibilityStatus: "unverified",
      maintenanceStatus: "active",
      route: "/libraries/tanstack-query",
      file: "tanstack-query.md",
      tags: ["data-fetching"],
      lastVerifiedAt: "2025-01-01",
      verificationSource: "Manual smoke test in docs example",
    }),
    sample({
      name: "preact-router",
      slug: "preact-router",
      category: "routing",
      maintenanceStatus: "active",
      route: "/libraries/preact-router",
      file: "preact-router.md",
      tags: ["routing"],
      lastVerifiedAt: "2024-01-01",
      verificationSource: "Manual smoke test in docs example",
    }),
  ];

  it("filters by category and query", () => {
    const result = filterLibraries(libraries, { category: "routing", q: "router" });
    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("preact-router");
  });

  it("filters by compatibilityStatus", () => {
    const result = filterLibraries(libraries, { compatibilityStatus: "unverified" });
    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("tanstack-query");
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
    const library = sample({
      lastVerifiedAt: "2026-06-01",
      verificationSource: "Manual verification notes",
    });
    const result = computeHealthScore(healthScoreInputFromLibrary(library));
    expect(result.score).toBeGreaterThan(80);
    expect(result.breakdown.compatibility).toBe(35);
  });
});

describe("routing and linking", () => {
  it("builds library URLs", () => {
    expect(libraryUrl("preact-signals")).toBe("/libraries/preact-signals");
    expect(compareUrl("tanstack-query", "swr")).toBe("/compare/tanstack-query-vs-swr");
  });

  it("detects duplicate slugs", () => {
    expect(() => validateLibraryCollection([sample(), sample({ file: "duplicate.md" })])).toThrow(/Duplicate/);
  });

  it("detects invalid alternative references", () => {
    expect(() =>
      validateLibraryCollection([
        sample({ alternatives: ["missing-slug"] }),
        sample({ slug: "other", name: "Other", route: "/libraries/other", file: "other.md" }),
      ]),
    ).toThrow(/unknown alternative/i);
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
      `---\nentryType: library\nname: Demo\nslug: demo\nshortDescription: Demo library.\ncategory: ui\ncompatibilityStatus: native\nmaintenanceStatus: active\ntypescriptSupport: native\nssrSupport: supported\ntags:\n  - demo\n---\n`,
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

  it("validates the repository catalog", () => {
    const libraries = validateLibraryCatalog(process.cwd());
    expect(libraries.length).toBeGreaterThan(100);
    expect(new Set(libraries.map((library) => library.slug)).size).toBe(libraries.length);
  });
});

describe("compare paths", () => {
  it("builds compare paths from alternatives", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "preacthub-compare-"));
    fs.mkdirSync(path.join(root, "content", "libraries", "entries"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "content", "libraries", "entries", "alpha.md"),
      `---\nentryType: library\nname: Alpha\nslug: alpha\nshortDescription: Alpha.\ncategory: ui\ncompatibilityStatus: native\nmaintenanceStatus: active\ntypescriptSupport: native\nssrSupport: supported\nalternatives:\n  - beta\ntags: []\n---\n`,
    );
    fs.writeFileSync(
      path.join(root, "content", "libraries", "entries", "beta.md"),
      `---\nentryType: library\nname: Beta\nslug: beta\nshortDescription: Beta.\ncategory: ui\ncompatibilityStatus: native\nmaintenanceStatus: active\ntypescriptSupport: native\nssrSupport: supported\ntags: []\n---\n`,
    );
    const paths = getComparePaths(root);
    expect(paths).toEqual([{ params: { pair: "alpha-vs-beta" } }]);
  });

  it("humanizes sort labels", () => {
    expect(sortLabel("recently-verified")).toBe("Recently verified");
  });

  it("parses compare slugs", () => {
    expect(parseCompareSlug("preact-signals-vs-nanostores")).toEqual(["preact-signals", "nanostores"]);
  });

  it("resolves alternative links", () => {
    const libraries = [
      sample(),
      sample({
        name: "Nanostores",
        slug: "nanostores",
        route: "/libraries/nanostores",
        file: "nanostores.md",
        category: "state-management",
        compatibilityStatus: "unverified",
        maintenanceStatus: "active",
      }),
    ];
    const bySlug = new Map(libraries.map((item) => [item.slug, item]));
    const links = resolveAlternatives(sample({ alternatives: ["nanostores"] }), bySlug);
    expect(links).toEqual([{ slug: "nanostores", name: "Nanostores", route: "/libraries/nanostores" }]);
  });
});
