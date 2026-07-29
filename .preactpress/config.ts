import fs from "node:fs/promises";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@kamod-ch/preactpress/config";
import type { UserConfig } from "@kamod-ch/preactpress/config";
import type { PageView } from "@kamod-ch/preactpress/client";
import { getLibraryContentRewrites } from "../src/lib/library-node";
import {
  absoluteAssetUrl,
  analyticsHeadTags,
  normalizeSiteUrl,
  PREACTHUB_DEFAULT_OG_IMAGE,
  PREACTHUB_PRODUCTION_URL,
  PREACTHUB_SITE_NAME,
  resolveAnalyticsConfig,
} from "../src/lib/site-config";
import {
  buildRobotsTxt,
  buildSitemapXml,
  patchProductionHtmlHead,
} from "../src/lib/seo";
import { attachLibraryPageMeta, structuredDataHead } from "../src/lib/theme-data";

type HeadTag =
  | ["meta", Record<string, string | boolean | undefined>]
  | ["link", Record<string, string | boolean | undefined>]
  | ["script", Record<string, string | boolean | undefined>, string?];

type PreactPressAiConfig = {
  llmsTxt?: boolean;
  llmsFullTxt?: boolean;
  copyMarkdown?: boolean;
  contextIndex?: boolean;
};

type PreactHubConfig = UserConfig & {
  ai?: PreactPressAiConfig;
};

const matomoImageTracker =
  '<!-- Matomo Image Tracker--><img referrerpolicy="no-referrer-when-downgrade" src="https://matomo.kamod.ch/matomo.php?idsite=10&amp;rec=1" style="border:0" alt="" /><!-- End Matomo -->';

const includeMatomoImageTracker = process.env.PREACTPRESS_INCLUDE_MATOMO === "true";

const libraryRewrites = getLibraryContentRewrites(process.cwd());
const SITE_URL = normalizeSiteUrl(process.env.PREACTHUB_SITE_URL, PREACTHUB_PRODUCTION_URL);
const OG_IMAGE_URL = absoluteAssetUrl(SITE_URL, PREACTHUB_DEFAULT_OG_IMAGE);
const analytics = resolveAnalyticsConfig();

function sharedSeoHeadTags(): HeadTag[] {
  return [
    ["meta", { property: "og:site_name", content: PREACTHUB_SITE_NAME }],
    ["meta", { property: "og:image", content: OG_IMAGE_URL }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: OG_IMAGE_URL }],
    ...analyticsHeadTags(analytics),
  ];
}

const config = {
  srcDir: "content",
  rewrites: {
    ...libraryRewrites,
    "/libraries/submit": "/submit",
  },
  site: {
    title: PREACTHUB_SITE_NAME,
    url: SITE_URL,
    description: "Discover the best Preact, frontend and AI developer tools with compatibility notes and curated categories.",
  },
  theme: "./theme/Layout.tsx",
  markdown: {
    html: false,
    emoji: true,
  },
  build: {
    sitemap: true,
    robots: true,
  },
  ai: {
    llmsTxt: true,
    llmsFullTxt: true,
    copyMarkdown: true,
    contextIndex: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  themeConfig: {
    footer: "PreactHub — curated for real Preact projects.",
    nav: [
      { text: "Browse", link: "/libraries" },
      { text: "Categories", link: "/libraries#categories" },
      { text: "Methodology", link: "/methodology" },
      { text: "Submit", link: "/submit" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/kamod-ch/preacthub",
        ariaLabel: "PreactHub on GitHub",
      },
    ],
  },
  async transformPageData(page: PageView, { route }) {
    return attachLibraryPageMeta(process.cwd(), route, page);
  },
  async transformHead({ route }) {
    return [...structuredDataHead(process.cwd(), route), ...sharedSeoHeadTags()];
  },
  async transformHtml(html, { route }) {
    let patched = patchProductionHtmlHead(html, route, SITE_URL);
    if (includeMatomoImageTracker) {
      patched = patched.replace("</body>", `  ${matomoImageTracker}\n  </body>`);
    }
    return patched;
  },
  async buildEnd({ pages }) {
    const routes = pages.map((entry) => entry.route);
    const outDir = path.join(process.cwd(), "dist");

    await fs.writeFile(path.join(outDir, "sitemap.xml"), buildSitemapXml(routes, SITE_URL), "utf8");
    await fs.writeFile(path.join(outDir, "robots.txt"), buildRobotsTxt(SITE_URL), "utf8");
  },
} satisfies PreactHubConfig;

export default defineConfig(config);
