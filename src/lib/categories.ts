export interface LibraryCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const categories = [
  {
    slug: "ui",
    name: "UI Components",
    description: "Component libraries and accessible UI primitives.",
    icon: "◧",
  },
  {
    slug: "state-management",
    name: "State Management",
    description: "Signals, stores and state management solutions.",
    icon: "◍",
  },
  {
    slug: "data-fetching",
    name: "Data Fetching",
    description: "Server state, caching and async data management.",
    icon: "⇄",
  },
  {
    slug: "routing",
    name: "Routing",
    description: "Client-side and universal routing libraries.",
    icon: "↗",
  },
  {
    slug: "forms",
    name: "Forms",
    description: "Form state, validation and form utilities.",
    icon: "☑",
  },
  {
    slug: "testing",
    name: "Testing",
    description: "Testing tools for Preact applications and components.",
    icon: "🧪",
  },
  {
    slug: "ssr",
    name: "SSR and Rendering",
    description: "Server rendering and static generation utilities.",
    icon: "☰",
  },
  {
    slug: "animation",
    name: "Animation",
    description: "Animation and transition libraries.",
    icon: "✦",
  },
  {
    slug: "i18n",
    name: "Internationalization",
    description: "Translation and localization tools.",
    icon: "🌐",
  },
  {
    slug: "charts",
    name: "Charts",
    description: "Charts, graphs and data visualization.",
    icon: "▥",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Build tools, integrations and development utilities.",
    icon: "⌘",
  },
] as const satisfies readonly LibraryCategory[];

export type LibraryCategorySlug = (typeof categories)[number]["slug"];

export const categoryMap = new Map<string, LibraryCategory>(
  categories.map((category) => [category.slug, category]),
);

export function getCategory(slug: string): LibraryCategory | undefined {
  return categoryMap.get(slug);
}
