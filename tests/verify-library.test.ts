import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("verify-library script", () => {
  it("prints canonical schema fields for a known entry", () => {
    const result = spawnSync("node", ["scripts/verify-library.mjs", "--slug", "preact-signals"], {
      cwd: process.cwd(),
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("compatibilityStatus:");
    expect(result.stdout).toContain("maintenanceStatus:");
    expect(result.stdout).toContain("typescriptSupport/ssrSupport/islands/esm:");
    expect(result.stdout).toContain("lastVerifiedAt:");
    expect(result.stdout).not.toContain("- compatibility:");
    expect(result.stdout).not.toContain("- status:");
    expect(result.stdout).not.toContain("- lastVerified:");
  });
});
