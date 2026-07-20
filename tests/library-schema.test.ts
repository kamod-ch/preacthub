import { describe, expect, it } from "vitest";
import {
  mapLegacyCompatibility,
  mapLegacySsr,
  mapLegacyStatus,
  mapLegacyTypescript,
  normalizeLibraryFrontmatter,
  npmPackageUrl,
  parseLibraryFrontmatterInput,
} from "../src/lib/library-schema";

describe("library schema normalization", () => {
  it("maps legacy compatibility values to compatibilityStatus", () => {
    expect(mapLegacyCompatibility("native")).toBe("native");
    expect(mapLegacyCompatibility("compat")).toBe("compat");
    expect(mapLegacyCompatibility("partial")).toBe("experimental");
    expect(mapLegacyCompatibility("incompatible")).toBe("inactive");
    expect(mapLegacyCompatibility("unknown")).toBe("unverified");
  });

  it("maps legacy status values to maintenanceStatus", () => {
    expect(mapLegacyStatus("deprecated", "native")).toBe("archived");
    expect(mapLegacyStatus("stable", "native")).toBe("active");
  });

  it("maps legacy runtime booleans", () => {
    expect(mapLegacyTypescript(true)).toBe("native");
    expect(mapLegacyTypescript(false)).toBe("none");
    expect(mapLegacySsr(true)).toBe("supported");
    expect(mapLegacySsr(false)).toBe("unsupported");
  });

  it("derives npmUrl from packageName when omitted", () => {
    const entry = normalizeLibraryFrontmatter({
      name: "Signals",
      slug: "signals",
      shortDescription: "Signals for Preact.",
      category: "state-management",
      packageName: "@preact/signals",
      compatibilityStatus: "native",
      maintenanceStatus: "active",
      typescriptSupport: "native",
      ssrSupport: "supported",
      tags: [],
      qualityBadges: [],
    });
    expect(entry.npmUrl).toBe(npmPackageUrl("@preact/signals"));
  });

  it("requires paired verification fields", () => {
    expect(() =>
      parseLibraryFrontmatterInput({
        name: "Example",
        slug: "example",
        shortDescription: "Example",
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

  it("accepts canonical verification metadata together", () => {
    const entry = parseLibraryFrontmatterInput({
      name: "Example",
      slug: "example",
      shortDescription: "Example",
      category: "ui",
      compatibilityStatus: "community-tested",
      maintenanceStatus: "active",
      typescriptSupport: "native",
      ssrSupport: "supported",
      testedPreactVersions: ["10.27.0"],
      lastVerifiedAt: "2026-01-01",
      verificationSource: "Verified against docs example on 2026-01-01",
      tags: ["example"],
    });

    expect(entry.compatibilityStatus).toBe("community-tested");
    expect(entry.testedPreactVersions).toEqual(["10.27.0"]);
  });
});
