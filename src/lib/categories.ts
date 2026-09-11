export type CatalogSection = "preact" | "ai";

export interface LibraryCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  section: CatalogSection;
  seoTitle?: string;
}

export const categories = [
  {
    slug: "ui",
    name: "UI Components",
    description: "Component libraries and accessible UI primitives.",
    icon: "◧",
    section: "preact",
  },
  {
    slug: "state-management",
    name: "State Management",
    description: "Signals, stores and state management solutions.",
    icon: "◍",
    section: "preact",
  },
  {
    slug: "data-fetching",
    name: "Data Fetching",
    description: "Server state, caching and async data management.",
    icon: "⇄",
    section: "preact",
  },
  {
    slug: "routing",
    name: "Routing",
    description: "Client-side and universal routing libraries.",
    icon: "↗",
    section: "preact",
  },
  {
    slug: "forms",
    name: "Forms",
    description: "Form state, validation and form utilities.",
    icon: "☑",
    section: "preact",
  },
  {
    slug: "testing",
    name: "Testing",
    description: "Testing tools for Preact applications and components.",
    icon: "🧪",
    section: "preact",
  },
  {
    slug: "ssr",
    name: "SSR and Rendering",
    description: "Server rendering and static generation utilities.",
    icon: "☰",
    section: "preact",
  },
  {
    slug: "animation",
    name: "Animation",
    description: "Animation and transition libraries.",
    icon: "✦",
    section: "preact",
  },
  {
    slug: "i18n",
    name: "Internationalization",
    description: "Translation and localization tools.",
    icon: "🌐",
    section: "preact",
  },
  {
    slug: "charts",
    name: "Charts",
    description: "Charts, graphs and data visualization.",
    icon: "▥",
    section: "preact",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Build tools, integrations and development utilities.",
    icon: "⌘",
    section: "preact",
  },
  {
    slug: "build-tools",
    name: "Build Tools",
    description: "Bundlers, compilers, plugins and toolchain integrations for Preact projects.",
    icon: "⚙",
    section: "preact",
  },
  {
    slug: "editors",
    name: "Editors",
    description: "Code and rich-text editor components with Preact bindings.",
    icon: "✎",
    section: "preact",
  },
  {
    slug: "ai-infrastructure",
    name: "AI Infrastructure",
    description:
      "Infrastructure and developer tools for building, running, monitoring and evaluating AI applications.",
    icon: "⬡",
    section: "ai",
    seoTitle: "Best AI Infrastructure Tools for Developers",
  },
  {
    slug: "agent-frameworks",
    name: "Agent Frameworks",
    description:
      "Frameworks and libraries for building AI agents, tool-calling workflows and multi-agent systems.",
    icon: "◎",
    section: "ai",
    seoTitle: "Best AI Agent Frameworks for TypeScript and JavaScript",
  },
  {
    slug: "browser-automation",
    name: "Browser Automation",
    description:
      "Tools for browser testing, scraping, browser agents and headless browser automation.",
    icon: "⬚",
    section: "ai",
    seoTitle: "Best Browser Automation Tools and Frameworks",
  },
  {
    slug: "ai-developer-apis",
    name: "AI Developer APIs",
    description:
      "APIs and SDKs for integrating language models, speech, image generation, search and document intelligence.",
    icon: "◈",
    section: "ai",
    seoTitle: "Best AI Developer APIs and SDKs",
  },
] as const satisfies readonly LibraryCategory[];

export type LibraryCategorySlug = (typeof categories)[number]["slug"];

export const categoryMap = new Map<string, LibraryCategory>(
  categories.map((category) => [category.slug, category]),
);

export const preactCategories = categories.filter((c) => c.section === "preact");
export const aiCategories = categories.filter((c) => c.section === "ai");

export const AI_CATEGORY_SLUGS = new Set(aiCategories.map((c) => c.slug));

export function getCategory(slug: string): LibraryCategory | undefined {
  return categoryMap.get(slug);
}

export function isAiCategory(slug: string): boolean {
  return (AI_CATEGORY_SLUGS as Set<string>).has(slug);
}

export function categoryRoute(slug: string): string {
  return isAiCategory(slug) ? `/categories/${slug}` : `/libraries/${slug}`;
}

export function categorySeoTitle(category: LibraryCategory): string {
  return category.seoTitle ?? `Best ${category.name} Libraries for Preact`;
}
