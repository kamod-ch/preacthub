import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@kamod-ch/preactpress/config";
import type { PageView } from "@kamod-ch/preactpress/client";
import { getLibraryContentRewrites } from "../src/lib/library-node";
import { attachLibraryPageMeta, structuredDataHead } from "../src/lib/theme-data";

export default defineConfig({
  srcDir: "content",
  rewrites: getLibraryContentRewrites(process.cwd()),
  site: {
    title: "PreactHub",
    description: "Curated Preact libraries with compatibility notes, SSR guidance, and practical examples.",
  },
  theme: "./theme/Layout.tsx",
  markdown: {
    html: false,
    emoji: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  themeConfig: {
    footer: "PreactHub — curated for real Preact projects.",
    nav: [
      { text: "Browse", link: "/libraries" },
      { text: "Categories", link: "/libraries#categories" },
      { text: "Submit", link: "/libraries/submit" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/kamod-ch/preacthub",
        ariaLabel: "PreactHub on GitHub",
      },
    ],
  },
  async transformPageData(page: PageView, { route, site }) {
    return attachLibraryPageMeta(site.base === "/" ? process.cwd() : process.cwd(), route, page);
  },
  async transformHead({ route }) {
    return structuredDataHead(process.cwd(), route);
  },
});
