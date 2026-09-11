import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertNoPlaceholders,
  findDuplicateCandidates,
  mapReportedCategory,
  normalizePackageName,
  normalizeRepositoryUrl,
  parseCandidatesMarkdown,
  slugify,
  stripMarkdownInlineCode,
} from "../scripts/lib/candidate-import-lib.mjs";

const sourcePath = path.join(process.cwd(), "docs", "import", "preacthub-candidates.md");

describe("candidate import helpers", () => {
  it("parses the current candidate source table", () => {
    const source = fs.readFileSync(sourcePath, "utf8");
    const { meta, candidates } = parseCandidatesMarkdown(source);
    expect(meta.expectedCandidateCount).toBe(200);
    expect(candidates).toHaveLength(40);
    expect(candidates[0]?.packageName).toBe("@gridsheet/preact-core");
  });

  it("strips markdown inline code from package names", () => {
    expect(stripMarkdownInlineCode("`@gridsheet/preact-core`")).toBe("@gridsheet/preact-core");
  });

  it("normalizes repository URLs for deduplication", () => {
    expect(normalizeRepositoryUrl("https://github.com/foo/bar.git/")).toBe("https://github.com/foo/bar");
    expect(normalizeRepositoryUrl("https://www.github.com/foo/bar#readme")).toBe("https://github.com/foo/bar");
  });

  it("slugifies scoped package names deterministically", () => {
    expect(slugify("@tanstack/charts")).toBe("tanstack-charts");
    expect(slugify("@xstate/store-preact")).toBe("xstate-store-preact");
  });

  it("maps reported categories to catalog slugs", () => {
    expect(mapReportedCategory("Build Tools / Rsbuild")).toBe("build-tools");
    expect(mapReportedCategory("Editors / Code Input")).toBe("editors");
    expect(mapReportedCategory("State Management")).toBe("state-management");
  });

  it("flags duplicate repository URLs inside the manifest", () => {
    const source = fs.readFileSync(sourcePath, "utf8");
    const { candidates } = parseCandidatesMarkdown(source);
    const duplicates = findDuplicateCandidates(candidates);
    expect(duplicates.some((entry) => entry.value.toLowerCase().includes("jovidecroock/pracht"))).toBe(true);
  });

  it("rejects placeholder editorial content", () => {
    expect(() => assertNoPlaceholders("## Example\n\nAdd any setup notes here")).toThrow(/Placeholder/);
    expect(() => assertNoPlaceholders("Verified editorial copy.")).not.toThrow();
  });

  it("normalizes npm package names", () => {
    expect(normalizePackageName("@CSS-Hooks/Preact")).toBe("@css-hooks/preact");
  });

  it("skips already-imported slugs with --skip-existing", () => {
    const result = spawnSync(
      "node",
      [
        "scripts/import-library-candidates.mjs",
        "--priority",
        "2",
        "--limit",
        "20",
        "--skip-existing",
        "--report",
        "data/import/preacthub-candidates.json",
      ],
      { cwd: process.cwd(), encoding: "utf8" },
    );

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("All matching candidates are already imported.");
  });
});
