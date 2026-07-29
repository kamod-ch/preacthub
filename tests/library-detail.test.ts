import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractLibraryEditorialFromMarkdown } from "../src/lib/library-editorial";
import {
  buildLibraryExternalLinks,
  buildLibraryFacts,
  buildSidebarExternalLinks,
  buildSidebarFacts,
  buildLibraryStructuredData,
  isUnknownLibraryRoute,
  libraryCanonicalUrl,
  libraryDetailDescription,
  libraryDetailTitle,
  resolveInstallCommand,
} from "../src/lib/library-detail";
import {
  attachLegacyLibraryView,
  libraryUrl,
  resolveAlternatives,
  type PreactLibrary,
} from "../src/lib/libraries";
import { getCategory } from "../src/lib/categories";
import { loadLibraryDirectory } from "../src/lib/library-node";
import { normalizeLibraryFrontmatter } from "../src/lib/library-schema";
import { attachLibraryPageMeta, getRouteLibraryData, structuredDataHead } from "../src/lib/theme-data";

function sampleLibrary(overrides: Record<string, unknown> = {}): PreactLibrary {
  const entry = normalizeLibraryFrontmatter({
    name: "Preact Signals",
    slug: "preact-signals",
    shortDescription: "Fine-grained reactive state primitives built by the Preact team.",
    category: "state-management",
    compatibilityStatus: "native",
    typescriptSupport: "native",
    ssrSupport: "supported",
    maintenanceStatus: "active",
    packageName: "@preact/signals",
    repositoryUrl: "https://github.com/preactjs/signals",
    documentationUrl: "https://preactjs.com/guide/v10/signals/",
    homepageUrl: "https://preactjs.com",
    license: "MIT",
    installCommand: "npm install @preact/signals",
    alternatives: ["nanostores"],
    tags: ["signals"],
    qualityBadges: [],
    ...overrides,
  });
  const slug = String(overrides.slug ?? entry.slug);
  return attachLegacyLibraryView({ ...entry, ...overrides, slug }, libraryUrl(slug), `${slug}.md`);
}

describe("library detail helpers", () => {
  it("builds canonical URLs and SEO copy", () => {
    const library = sampleLibrary();
    expect(libraryCanonicalUrl("preact-signals")).toBe("https://preacthub.com/libraries/preact-signals");
    expect(libraryDetailTitle(library)).toContain("Preact Signals");
    expect(libraryDetailDescription(library)).toContain("Fine-grained reactive state");
  });

  it("builds sidebar facts and links without hero/score duplication", () => {
    const library = sampleLibrary();
    const sidebarFacts = buildSidebarFacts(library);
    const sidebarLinks = buildSidebarExternalLinks(library);

    expect(sidebarFacts.map((row) => row.label)).toEqual([
      "Tested Preact versions",
      "License",
      "Last verified",
    ]);
    expect(sidebarFacts.some((row) => row.label === "Preact compatibility")).toBe(false);
    expect(sidebarLinks.some((link) => link.label === "npm")).toBe(false);
    expect(sidebarLinks.some((link) => link.label === "GitHub")).toBe(true);
  });

  it("handles optional missing fields gracefully", () => {
    const sparse = sampleLibrary({
      slug: "sparse-lib",
      packageName: undefined,
      installCommand: undefined,
      repositoryUrl: undefined,
      documentationUrl: undefined,
      homepageUrl: undefined,
      license: undefined,
      testedPreactVersions: [],
      lastVerifiedAt: undefined,
    });

    expect(resolveInstallCommand(sparse)).toBeUndefined();
    expect(buildLibraryExternalLinks(sparse)).toEqual([]);
    expect(buildLibraryFacts(sparse).find((row) => row.label === "License")?.value).toBe("Not documented");
  });

  it("detects unknown library slugs", () => {
    const known = new Set(["preact-signals"]);
    const categories = new Set(["ui"]);
    expect(isUnknownLibraryRoute("/libraries/missing-lib", "missing-lib", known, categories)).toBe(true);
    expect(isUnknownLibraryRoute("/libraries/preact-signals", "preact-signals", known, categories)).toBe(false);
    expect(isUnknownLibraryRoute("/libraries/ui", "ui", known, categories)).toBe(false);
    expect(isUnknownLibraryRoute("/libraries/submit", "submit", known, categories)).toBe(false);
  });

  it("extracts editorial sections without inventing when-to-use copy", () => {
    const markdown = `---
name: Demo
slug: demo
---

## Introduction

Use this for local state.

## Example

\`\`\`tsx
import { signal } from "@preact/signals";
\`\`\`

## Known limitations

- Not a full data layer
`;

    const editorial = extractLibraryEditorialFromMarkdown(markdown, { limitations: [] });
    expect(editorial.whenToUse).toBeUndefined();
    expect(editorial.example?.code).toContain("@preact/signals");
    expect(editorial.limitations).toEqual(["Not a full data layer"]);
    expect(editorial.supplementalSections.some((section) => section.title === "Introduction")).toBe(true);
  });

  it("resolves internal alternative links and structured data", () => {
    const directory = loadLibraryDirectory(process.cwd());
    const library = directory.bySlug.get("preact-signals");
    expect(library).toBeDefined();
    if (!library) return;

    const alternatives = resolveAlternatives(library, directory.bySlug);
    expect(alternatives.every((entry) => entry.route.startsWith("/libraries/"))).toBe(true);

    const structured = buildLibraryStructuredData(library, getCategory(library.category), alternatives);
    expect(structured["@type"]).toBe("SoftwareApplication");
    expect(structured.url).toBe("https://preacthub.com/libraries/preact-signals");
    expect(JSON.stringify(structured)).not.toContain("aggregateRating");
  });

  it("attaches library page metadata for valid slugs", () => {
    const page = attachLibraryPageMeta(process.cwd(), "/libraries/preact-signals", {
      kind: "markdown",
      html: "<p>Example</p>",
      meta: {},
      title: "Old title",
      description: "Old description",
      tags: [],
      headings: [],
    });

    expect(page.title).toContain("Preact Signals");
    expect((page.meta as Record<string, unknown>).libraryEditorial).toBeDefined();
  });

  it("marks unknown slugs in route data", () => {
    const data = getRouteLibraryData(process.cwd(), "/libraries/not-a-real-library-slug");
    expect(data.currentLibrary).toBeUndefined();
    expect(data.unknownLibrarySlug).toBe("not-a-real-library-slug");
  });

  it("emits structured data head tags for library routes", () => {
    const tags = structuredDataHead(process.cwd(), "/libraries/preact-signals");
    const jsonScript = tags.find((tag) => tag[0] === "script");
    expect(jsonScript).toBeDefined();
    const payload = JSON.parse(String(jsonScript?.[2]));
    expect(payload.name).toBe("Preact Signals");
  });
});

describe("library detail build output", () => {
  it("prerenders canonical library detail HTML with accessibility markers", () => {
    const htmlPath = path.join(process.cwd(), "dist/libraries/preact-signals/index.html");
    if (!fs.existsSync(htmlPath)) return;

    const html = fs.readFileSync(htmlPath, "utf8");
    expect(html).toContain("Overview");
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("Is this information outdated?");
    expect(html).toContain('rel="canonical"');
    expect(html).toContain("https://preacthub.com/libraries/preact-signals");
  });
});
