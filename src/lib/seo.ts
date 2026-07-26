import { categories, isAiCategory, categoryRoute } from "./categories";
import { parseCompareSlug } from "./libraries";
import { absoluteSiteUrl, normalizeSiteUrl, PREACTHUB_PRODUCTION_URL } from "./site-config";

const categorySlugs = new Set<string>(categories.map((category) => category.slug));

export function normalizeLibraryRoute(route: string): string {
  if (route.startsWith("/libraries/entries/")) {
    return `/libraries/${route.replace(/^\/libraries\/entries\//, "")}`;
  }
  if (route.startsWith("/libraries/categories/")) {
    const slug = route.replace(/^\/libraries\/categories\//, "");
    return isAiCategory(slug) ? `/categories/${slug}` : `/libraries/${slug}`;
  }
  return route;
}

export function isLibraryAliasRoute(route: string): boolean {
  if (route.startsWith("/libraries/entries/")) return true;
  if (route.startsWith("/libraries/categories/")) return true;
  const aiLibraryAlias = route.match(/^\/libraries\/([^/]+)$/);
  if (aiLibraryAlias && isAiCategory(aiLibraryAlias[1]!)) return true;
  return false;
}

export function isLegacySubmitAlias(route: string): boolean {
  return route === "/libraries/submit";
}

export function isNoindexRoute(route: string): boolean {
  return route === "/404" || isLibraryAliasRoute(route) || isLegacySubmitAlias(route);
}

export function canonicalRoute(route: string): string {
  return normalizeLibraryRoute(route);
}

export function canonicalAbsoluteUrl(route: string, siteUrl: string = PREACTHUB_PRODUCTION_URL): string {
  return absoluteSiteUrl(normalizeSiteUrl(siteUrl), canonicalRoute(route));
}

export function isCanonicalCompareRoute(route: string): boolean {
  if (!route.startsWith("/compare/")) return true;
  const pair = parseCompareSlug(route.slice("/compare/".length));
  if (!pair) return false;
  const [left, right] = pair;
  return left.localeCompare(right) <= 0;
}

export function shouldIncludeRouteInSitemap(route: string): boolean {
  if (route === "/404") return false;
  if (isLibraryAliasRoute(route)) return false;
  if (isLegacySubmitAlias(route)) return false;
  if (route.startsWith("/tags/")) return false;
  if (!isCanonicalCompareRoute(route)) return false;
  return true;
}

export function filterSitemapRoutes(routes: string[]): string[] {
  return [...new Set(routes.filter(shouldIncludeRouteInSitemap))].sort((a, b) => a.localeCompare(b));
}

export function buildRobotsTxt(siteUrl: string): string {
  const sitemapUrl = `${normalizeSiteUrl(siteUrl)}/sitemap.xml`;
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /libraries/entries/",
    "Disallow: /libraries/categories/",
    "Disallow: /libraries/submit",
    "Disallow: /404",
    `Sitemap: ${sitemapUrl}`,
    "",
  ].join("\n");
}

export function buildSitemapXml(
  routes: string[],
  siteUrl: string,
  lastmod = new Date().toISOString().slice(0, 10),
): string {
  const urls = filterSitemapRoutes(routes)
    .map((route) => {
      const loc = canonicalAbsoluteUrl(route, siteUrl);
      return `  <url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`;
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export interface RedirectRule {
  from: string;
  to: string;
  reason: string;
}

/** Documented redirect matrix for hosting/CDN configuration. Built routes use rewrites/noindex. */
export function getRedirectMatrix(): RedirectRule[] {
  const rules: RedirectRule[] = [
    {
      from: "/libraries/submit",
      to: "/submit",
      reason: "Canonical community submission route",
    },
  ];

  for (const category of categories) {
    rules.push({
      from: `/libraries/categories/${category.slug}`,
      to: categoryRoute(category.slug),
      reason: "Canonical category route",
    });
    if (isAiCategory(category.slug)) {
      rules.push({
        from: `/libraries/${category.slug}`,
        to: `/categories/${category.slug}`,
        reason: "Canonical AI category route",
      });
    }
  }

  rules.push(
    {
      from: "/libraries/entries/:slug",
      to: "/libraries/:slug",
      reason: "Canonical library detail route",
    },
    {
      from: "https://preacthub.dev/*",
      to: "https://preacthub.com/:splat",
      reason: "Legacy .dev host — configure 301 at DNS/registrar or .htaccess",
    },
    {
      from: "https://www.preacthub.com/*",
      to: "https://preacthub.com/:splat",
      reason: "Canonical apex — configure at host or CDN",
    },
    {
      from: "https://preact.directory/*",
      to: "https://preacthub.com/:splat",
      reason: "Alternate domain — configure at DNS/host when acquired",
    },
  );

  return rules;
}

export function patchProductionHtmlHead(
  html: string,
  route: string,
  siteUrl: string = PREACTHUB_PRODUCTION_URL,
): string {
  if (!isNoindexRoute(route) && !isLibraryAliasRoute(route) && !isLegacySubmitAlias(route)) {
    return ensureAbsoluteCanonical(html, route, siteUrl);
  }

  const canonical = canonicalAbsoluteUrl(route, siteUrl);
  let next = html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, "");
  next = next.replace(/<meta[^>]+name=["']robots["'][^>]*>/gi, "");

  const injection = [
    `<link rel="canonical" href="${escapeHtmlAttr(canonical)}">`,
    `<meta name="robots" content="noindex, follow">`,
  ].join("\n    ");

  return next.replace("</head>", `    ${injection}\n  </head>`);
}

function ensureAbsoluteCanonical(html: string, route: string, siteUrl: string): string {
  const canonical = canonicalAbsoluteUrl(route, siteUrl);
  if (html.includes(`href="${canonical}"`)) return html;

  const withoutCanonical = html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, "");
  return withoutCanonical.replace(
    "</head>",
    `    <link rel="canonical" href="${escapeHtmlAttr(canonical)}">\n  </head>`,
  );
}

function escapeHtmlAttr(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

export function isKnownCategoryRoute(route: string): boolean {
  if (route.startsWith("/categories/")) {
    const slug = route.replace(/^\/categories\//, "");
    return categorySlugs.has(slug);
  }
  const slug = route.replace(/^\/libraries\//, "");
  return route.startsWith("/libraries/") && categorySlugs.has(slug);
}

export const PREACTHUB_SEARCH_INDEX = "/preactpress-search.json";
