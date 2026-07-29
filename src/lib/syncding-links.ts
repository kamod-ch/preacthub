/** Matomo campaign params for outbound Syncding links from PreactHub. */
const SYNCDING_BASE = "https://www.syncding.com";
const SYNCDING_CAMPAIGN = "syncding_pricing_relaunch_2026_07";
const SYNCDING_SOURCE = "preacthub";
const SYNCDING_MEDIUM = "referral";

export type SyncdingLinkPlacement = "ecosystem-cta" | "ecosystem-pricing" | "footer";

export function buildSyncdingUrl(path = "/", content: SyncdingLinkPlacement): string {
  const url = new URL(path, SYNCDING_BASE);
  url.searchParams.set("utm_source", SYNCDING_SOURCE);
  url.searchParams.set("utm_medium", SYNCDING_MEDIUM);
  url.searchParams.set("utm_campaign", SYNCDING_CAMPAIGN);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export const syncdingLinks = {
  ecosystemCta: buildSyncdingUrl("/", "ecosystem-cta"),
  ecosystemPricing: buildSyncdingUrl("/pricing", "ecosystem-pricing"),
  footer: buildSyncdingUrl("/", "footer"),
} as const;
