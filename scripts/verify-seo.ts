import fs from "node:fs";
import path from "node:path";
import { PREACTHUB_PRODUCTION_URL } from "../src/lib/site-config.js";
import {
  filterSitemapRoutes,
  isLibraryAliasRoute,
  patchProductionHtmlHead,
} from "../src/lib/seo.js";

const distDir = path.join(process.cwd(), "dist");
const siteUrl = (process.env.PREACTHUB_SITE_URL ?? PREACTHUB_PRODUCTION_URL).replace(/\/$/, "");

function fail(message: string): never {
  console.error(`SEO verify failed: ${message}`);
  process.exit(1);
}

function read(file: string): string {
  const absolute = path.join(distDir, file);
  if (!fs.existsSync(absolute)) fail(`Missing ${file} in dist/ — run npm run build first`);
  return fs.readFileSync(absolute, "utf8");
}

function main(): void {
  const robots = read("robots.txt");
  const sitemap = read("sitemap.xml");
  const cname = read("CNAME").trim();

  if (cname !== "preacthub.com") fail(`Expected CNAME preacthub.com, got "${cname}"`);
  if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
    fail("robots.txt is missing the production sitemap URL");
  }
  if (robots.includes("Disallow: /libraries/entries/") === false) {
    fail("robots.txt should disallow internal library alias paths");
  }

  if (sitemap.includes("/libraries/entries/")) fail("sitemap.xml must not list /libraries/entries/ alias routes");
  if (sitemap.includes("/libraries/categories/")) fail("sitemap.xml must not list /libraries/categories/ alias routes");
  if (sitemap.includes("/tags/")) fail("sitemap.xml must not list tag index pages");
  if (sitemap.includes("/404")) fail("sitemap.xml must not list the 404 page");
  if (sitemap.includes("/libraries/submit")) fail("sitemap.xml must not list /libraries/submit alias");

  for (const required of ["/", "/libraries/", "/methodology/", "/submit/"]) {
    if (!sitemap.includes(`${siteUrl}${required}`)) {
      fail(`sitemap.xml is missing ${required}`);
    }
  }

  if (!fs.existsSync(path.join(distDir, "og-image.svg"))) fail("Missing dist/og-image.svg");
  if (!fs.existsSync(path.join(distDir, "preactpress-search.json"))) {
    fail("Missing dist/preactpress-search.json search index");
  }

  const homeHtml = read("index.html");
  if (!homeHtml.includes(`href="${siteUrl}/"`)) fail("Home page canonical must use the production domain");
  if (!homeHtml.includes("og:image")) fail("Home page is missing Open Graph image metadata");
  if (!homeHtml.includes("og-image.svg")) fail("Home page should reference the default social preview asset");

  const aliasSample = path.join(distDir, "libraries/entries/preact-signals/index.html");
  if (fs.existsSync(aliasSample)) {
    const aliasHtml = fs.readFileSync(aliasSample, "utf8");
    const patched = patchProductionHtmlHead(aliasHtml, "/libraries/entries/preact-signals", siteUrl);
    if (!patched.includes('content="noindex, follow"')) fail("Alias routes must emit noindex");
    if (!patched.includes(`${siteUrl}/libraries/preact-signals/`)) {
      fail("Alias routes must canonicalize to the clean library URL");
    }
  }

  const routeCount = (sitemap.match(/<loc>/g) ?? []).length;
  const filteredCount = filterSitemapRoutes(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
      const url = new URL(match[1]);
      return url.pathname.endsWith("/") ? url.pathname.slice(0, -1) || "/" : url.pathname;
    }),
  ).length;
  if (routeCount !== filteredCount) {
    fail("sitemap.xml contains URLs that should have been filtered");
  }

  if (isLibraryAliasRoute("/libraries/entries/demo")) {
    // sanity check above already validated alias HTML when present
  }

  console.log(`SEO verify passed for ${siteUrl} (${routeCount} sitemap URLs).`);
}

main();
