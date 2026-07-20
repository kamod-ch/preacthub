import { describe, expect, it } from "vitest";
import {
  analyticsHeadTags,
  normalizeSiteUrl,
  PREACTHUB_PRODUCTION_URL,
  resolveAnalyticsConfig,
} from "../src/lib/site-config";
import {
  buildRobotsTxt,
  buildSitemapXml,
  canonicalAbsoluteUrl,
  filterSitemapRoutes,
  getRedirectMatrix,
  isCanonicalCompareRoute,
  isNoindexRoute,
  normalizeLibraryRoute,
  patchProductionHtmlHead,
  shouldIncludeRouteInSitemap,
} from "../src/lib/seo";

describe("site config", () => {
  it("normalizes the production site URL", () => {
    expect(normalizeSiteUrl("https://preacthub.com/")).toBe("https://preacthub.com");
    expect(normalizeSiteUrl(undefined)).toBe(PREACTHUB_PRODUCTION_URL);
  });

  it("disables analytics by default", () => {
    expect(resolveAnalyticsConfig({ PREACTHUB_ANALYTICS: undefined }).enabled).toBe(false);
  });

  it("supports opt-in plausible analytics without secrets", () => {
    const config = resolveAnalyticsConfig({
      PREACTHUB_ANALYTICS: "plausible",
      PREACTHUB_PLAUSIBLE_DOMAIN: "preacthub.com",
    });
    expect(config.enabled).toBe(true);
    expect(analyticsHeadTags(config)).toHaveLength(1);
  });
});

describe("seo helpers", () => {
  it("normalizes library alias routes", () => {
    expect(normalizeLibraryRoute("/libraries/entries/preact-signals")).toBe("/libraries/preact-signals");
    expect(normalizeLibraryRoute("/libraries/categories/ui")).toBe("/libraries/ui");
  });

  it("filters sitemap routes to canonical public pages", () => {
    expect(shouldIncludeRouteInSitemap("/")).toBe(true);
    expect(shouldIncludeRouteInSitemap("/methodology")).toBe(true);
    expect(shouldIncludeRouteInSitemap("/libraries/entries/preact")).toBe(false);
    expect(shouldIncludeRouteInSitemap("/libraries/categories/ui")).toBe(false);
    expect(shouldIncludeRouteInSitemap("/404")).toBe(false);
    expect(shouldIncludeRouteInSitemap("/tags/ui")).toBe(false);
    expect(shouldIncludeRouteInSitemap("/libraries/submit")).toBe(false);
  });

  it("keeps only one compare URL per pair", () => {
    expect(isCanonicalCompareRoute("/compare/preact-vs-signals")).toBe(true);
    expect(isCanonicalCompareRoute("/compare/signals-vs-preact")).toBe(false);
  });

  it("builds production robots.txt and sitemap.xml", () => {
    const robots = buildRobotsTxt(PREACTHUB_PRODUCTION_URL);
    expect(robots).toContain("Sitemap: https://preacthub.com/sitemap.xml");
    expect(robots).toContain("Disallow: /libraries/entries/");

    const xml = buildSitemapXml(["/", "/libraries", "/libraries/entries/preact", "/methodology"], PREACTHUB_PRODUCTION_URL);
    expect(xml).toContain("https://preacthub.com/methodology/");
    expect(xml).not.toContain("/libraries/entries/");
  });

  it("marks alias routes as noindex and rewrites canonical tags", () => {
    const html = `<!doctype html><html><head><link rel="canonical" href="https://preacthub.com/libraries/entries/preact-signals/"></head><body></body></html>`;
    const patched = patchProductionHtmlHead(html, "/libraries/entries/preact-signals", PREACTHUB_PRODUCTION_URL);
    expect(isNoindexRoute("/libraries/entries/preact-signals")).toBe(true);
    expect(patched).toContain('content="noindex, follow"');
    expect(patched).toContain(`${PREACTHUB_PRODUCTION_URL}/libraries/preact-signals/`);
  });

  it("documents redirect rules for hosting", () => {
    const rules = getRedirectMatrix();
    expect(rules.some((rule) => rule.from === "/libraries/submit" && rule.to === "/submit")).toBe(true);
    expect(rules.some((rule) => rule.from.includes("preacthub.com"))).toBe(true);
  });

  it("builds absolute canonical URLs", () => {
    expect(canonicalAbsoluteUrl("/libraries/preact-signals")).toBe("https://preacthub.com/libraries/preact-signals/");
  });

  it("filters duplicate sitemap entries", () => {
    expect(filterSitemapRoutes(["/", "/404", "/libraries/entries/a", "/methodology"])).toEqual(["/", "/methodology"]);
  });
});
