import { describe, expect, it } from "vitest";
import { buildSyncdingUrl, syncdingLinks } from "../src/lib/syncding-links";

describe("syncding-links", () => {
  it("builds Matomo-compatible campaign URLs", () => {
    const url = new URL(buildSyncdingUrl("/pricing", "ecosystem-pricing"));

    expect(url.origin).toBe("https://www.syncding.com");
    expect(url.pathname).toBe("/pricing");
    expect(url.searchParams.get("utm_source")).toBe("preacthub");
    expect(url.searchParams.get("utm_medium")).toBe("referral");
    expect(url.searchParams.get("utm_campaign")).toBe("syncding_pricing_relaunch_2026_07");
    expect(url.searchParams.get("utm_content")).toBe("ecosystem-pricing");
  });

  it("exposes placement-specific links", () => {
    expect(syncdingLinks.ecosystemCta).toContain("utm_content=ecosystem-cta");
    expect(syncdingLinks.ecosystemPricing).toContain("utm_content=ecosystem-pricing");
    expect(syncdingLinks.footer).toContain("utm_content=footer");
  });
});
