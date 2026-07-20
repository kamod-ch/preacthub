/**
 * Single source of truth for production domain and SEO defaults.
 * PreactPress `site.url` in `.preactpress/config.ts` should stay in sync with this value.
 */
export const PREACTHUB_PRODUCTION_URL = "https://preacthub.com";

/** Public social preview asset copied from `content/public/` to `dist/`. */
export const PREACTHUB_DEFAULT_OG_IMAGE = "/og-image.svg";

export const PREACTHUB_SITE_NAME = "PreactHub";

export function normalizeSiteUrl(url: string | undefined, fallback = PREACTHUB_PRODUCTION_URL): string {
  return (url ?? fallback).replace(/\/$/, "");
}

export function absoluteSiteUrl(siteUrl: string, route: string): string {
  const base = normalizeSiteUrl(siteUrl);
  if (route === "/") return `${base}/`;
  const path = route.startsWith("/") ? route : `/${route}`;
  return `${base}${path.endsWith("/") ? path : `${path}/`}`;
}

export function absoluteAssetUrl(siteUrl: string, assetPath: string): string {
  const base = normalizeSiteUrl(siteUrl);
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${base}${path}`;
}

export interface AnalyticsConfig {
  enabled: boolean;
  provider?: "plausible";
  domain?: string;
  scriptSrc?: string;
}

/** Privacy-friendly analytics: disabled in local dev unless explicitly enabled. */
export function resolveAnalyticsConfig(env: NodeJS.ProcessEnv = process.env): AnalyticsConfig {
  const provider = env.PREACTHUB_ANALYTICS?.trim();
  if (!provider || provider === "off" || provider === "false") {
    return { enabled: false };
  }

  if (provider === "plausible") {
    const domain = env.PREACTHUB_PLAUSIBLE_DOMAIN?.trim() || "preacthub.com";
    const scriptSrc = env.PREACTHUB_PLAUSIBLE_SCRIPT?.trim() || "https://plausible.io/js/script.js";
    return { enabled: true, provider: "plausible", domain, scriptSrc };
  }

  return { enabled: false };
}

export function analyticsHeadTags(config: AnalyticsConfig): Array<
  ["script", Record<string, string | boolean | undefined>]
> {
  if (!config.enabled || config.provider !== "plausible" || !config.domain || !config.scriptSrc) {
    return [];
  }

  return [
    [
      "script",
      {
        defer: true,
        "data-domain": config.domain,
        src: config.scriptSrc,
      },
    ],
  ];
}
