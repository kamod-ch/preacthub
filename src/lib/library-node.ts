import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { categories, getCategory, type LibraryCategorySlug } from "./categories";
import { libraryUrl, sortLibraries, type LibraryDirectory, type LibraryStats, type PreactLibrary } from "./libraries";

const testedWithSchema = z.object({
  preact: z.string().min(1),
  library: z.string().min(1),
});

const frontmatterSchema = z.object({
  entryType: z.literal("library").optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  packageName: z.string().min(1).optional(),
  repository: z.string().url().optional(),
  documentation: z.string().url().optional(),
  homepage: z.string().url().optional(),
  compatibility: z.enum(["native", "compat", "partial", "incompatible", "unknown"]),
  status: z.enum(["recommended", "stable", "experimental", "deprecated"]),
  testedWith: testedWithSchema.optional(),
  typescript: z.boolean().default(false),
  ssr: z.boolean().default(false),
  islands: z.boolean().default(false),
  esm: z.boolean().default(false),
  license: z.string().min(1).optional(),
  bundleSize: z.string().min(1).optional(),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  tags: z.array(z.string().min(1)).default([]),
  notes: z.array(z.string().min(1)).optional(),
  limitations: z.array(z.string().min(1)).optional(),
  alternatives: z.array(z.string().min(1)).optional(),
  featured: z.boolean().optional(),
});

export function parseLibraryFrontmatter(frontmatter: unknown, file = "library.md"): PreactLibrary {
  const parsed = frontmatterSchema.parse(frontmatter);
  const category = getCategory(parsed.category);
  if (!category) {
    throw new Error(`Unknown category "${parsed.category}" in ${file}`);
  }
  return {
    ...parsed,
    category: category.slug as LibraryCategorySlug,
    route: libraryUrl(parsed.slug),
    file,
  };
}

export function validateLibraryCollection(libraries: PreactLibrary[]): void {
  const seen = new Map<string, string>();
  for (const library of libraries) {
    const duplicate = seen.get(library.slug);
    if (duplicate) {
      throw new Error(`Duplicate library slug "${library.slug}" in ${duplicate} and ${library.file}`);
    }
    seen.set(library.slug, library.file);
  }
}

export function loadLibraryDirectory(root: string): LibraryDirectory {
  const contentDir = path.join(root, "content", "libraries");
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md") && !["index.md", "submit.md"].includes(file));

  const libraries: PreactLibrary[] = [];
  for (const file of files) {
    const absolute = path.join(contentDir, file);
    const raw = fs.readFileSync(absolute, "utf8");
    const parsed = matter(raw);
    if (parsed.data.entryType !== "library") continue;
    libraries.push(parseLibraryFrontmatter(parsed.data, file));
  }

  validateLibraryCollection(libraries);

  const sorted = sortLibraries(libraries, "recommended");
  const bySlug = new Map(sorted.map((library) => [library.slug, library]));
  const featured = sorted.filter((library) => library.featured);
  const categorySummaries = categories.map((category) => ({
    ...category,
    count: sorted.filter((library) => library.category === category.slug).length,
  }));
  const stats = {
    total: sorted.length,
    categories: categorySummaries.filter((category) => category.count > 0).length,
    verified: sorted.filter((library) => Boolean(library.lastVerified)).length,
    native: sorted.filter((library) => library.compatibility === "native").length,
  } satisfies LibraryStats;

  return { libraries: sorted, featured, categories: categorySummaries, stats, bySlug };
}
