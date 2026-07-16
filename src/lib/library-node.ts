import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { categories, getCategory, type LibraryCategorySlug } from "./categories";
import {
  compareUrl,
  libraryUrl,
  qualityBadgeValues,
  sortLibraries,
  type LibraryDirectory,
  type LibraryStats,
  type PreactLibrary,
} from "./libraries";

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
  qualityBadges: z.array(z.enum(qualityBadgeValues)).default([]),
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
  const categorySlugs = new Set<string>(categories.map((category) => category.slug));

  for (const library of libraries) {
    if (categorySlugs.has(library.slug)) {
      throw new Error(`Library slug "${library.slug}" in ${library.file} collides with category "${library.slug}"`);
    }

    const duplicate = seen.get(library.slug);
    if (duplicate) {
      throw new Error(`Duplicate library slug "${library.slug}" in ${duplicate} and ${library.file}`);
    }
    seen.set(library.slug, library.file);
  }
}

function walkMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(absolute));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(absolute);
    }
  }

  return files;
}

function markdownFileToRoute(relativeFile: string): string {
  let rel = relativeFile.split(path.sep).join("/");
  rel = rel.replace(/\.md$/i, "");
  rel = rel.replace(/\/index$/i, "");
  return rel ? `/${rel}` : "/";
}

export function getLibraryContentRewrites(root: string): Record<string, string> {
  const contentDir = path.join(root, "content", "libraries");
  const rewrites: Record<string, string> = {};

  const categoryDir = path.join(contentDir, "categories");
  if (fs.existsSync(categoryDir)) {
    for (const file of walkMarkdownFiles(categoryDir)) {
      const slug = path.basename(file, ".md");
      rewrites[`/libraries/${slug}`] = markdownFileToRoute(path.relative(path.join(root, "content"), file));
    }
  }

  const entriesDir = path.join(contentDir, "entries");
  if (fs.existsSync(entriesDir)) {
    const entries: Array<{ library: PreactLibrary; file: string }> = [];
    for (const file of walkMarkdownFiles(entriesDir)) {
      const raw = fs.readFileSync(file, "utf8");
      const parsed = matter(raw);
      if (parsed.data.entryType !== "library") continue;
      entries.push({ library: parseLibraryFrontmatter(parsed.data, path.relative(contentDir, file)), file });
    }

    validateLibraryCollection(entries.map((entry) => entry.library));

    for (const entry of entries) {
      rewrites[entry.library.route] = markdownFileToRoute(path.relative(path.join(root, "content"), entry.file));
    }
  }

  return rewrites;
}

export function getComparePaths(root: string): Array<{ params: { pair: string } }> {
  const directory = loadLibraryDirectory(root);
  const seen = new Set<string>();
  const paths: Array<{ params: { pair: string } }> = [];

  for (const library of directory.libraries) {
    for (const altSlug of library.alternatives ?? []) {
      if (library.slug === altSlug) continue;
      if (!directory.bySlug.has(altSlug)) continue;
      const pair = compareUrl(library.slug, altSlug).replace("/compare/", "");
      if (seen.has(pair)) continue;
      seen.add(pair);
      paths.push({ params: { pair } });
    }
  }

  return paths.sort((a, b) => a.params.pair.localeCompare(b.params.pair));
}

export function loadLibraryDirectory(root: string): LibraryDirectory {
  const contentDir = path.join(root, "content", "libraries");
  const files = walkMarkdownFiles(contentDir)
    .filter((file) => !["index.md", "submit.md"].includes(path.relative(contentDir, file).split(path.sep).join("/")));

  const libraries: PreactLibrary[] = [];
  for (const absolute of files) {
    const raw = fs.readFileSync(absolute, "utf8");
    const parsed = matter(raw);
    if (parsed.data.entryType !== "library") continue;
    libraries.push(parseLibraryFrontmatter(parsed.data, path.relative(contentDir, absolute).split(path.sep).join("/")));
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
